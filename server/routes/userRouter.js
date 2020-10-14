const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/useModel');
const auth = require('../middleware/auth')

router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;

    //Validate data for sign up
    if (!email || !password || !passwordCheck)
      return res.status(400).json({ msg: "Not all fields have been entered" });

    if (password.length < 5)
      return res.status(400).json({ msg: "Password needs to be at least 5 characters long" });

    if (password !== passwordCheck)
      return res.status(400).json({ msg: "Enter the same password twice for verification" });

    const existingUser = await User.findOne({ email: email });

    if (existingUser)
      return res.status(400).json({ msg: "Account with this email already exists" });

    if (!displayName) displayName = email;

    //Apply hashing function to protect password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    //Create new user
    const newUser = new User({
      email,
      password: passwordHash,
      displayName
    });

    //Save user
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message() });
  }

});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered" });

    const user = await User.findOne({ email: email });

    if (!user)
      return res.status(400).json({ msg: "No account with this username exists" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
        email: user.email
      }
    })
  } catch (err) {
    res.status(500).json({ error: err.message() });
  }
});

//Delete user
router.delete("/delete", auth, async (req, res) => {
  try {

    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);

  } catch (err) {
    res.status(500).json({ error: err.message() });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified)
      return res.json(false);

    const user = await User.findById(verified.id);
    if (!user)
      return res.json(false);

    //After all checks the user exists and is valid
    return res.json(true);

  } catch (err) {
    res.status(500).json({ error: err.message() });
  }
})
module.exports = router;