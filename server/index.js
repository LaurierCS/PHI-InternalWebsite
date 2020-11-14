//Required variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

//Set up express app
const app = express();
app.use(express.json());
app.use(cors());

//Set up external port so that when we publish
//the project the server can connnect with external
//hosting service
//If the environment port doesn't exist it will use port 5000
const PORT = process.env.PORT || 5000;
//Start up server
app.listen(PORT, () => {
  console.log(`The server has started on port ${PORT}`);
});

//Set up mongoose
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}, (err) => {
  if (err) throw err;
  console.log("MongoDB connection established");
});

//Set up routes
app.use("/users", require("./routes/userRouter"));
