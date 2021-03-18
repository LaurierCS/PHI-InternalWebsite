const express = require("express");
const mongodb = require("./db-script/db-connect");

const app = express();
// Bodyparser middleware
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use((req, res, next) => {
  console.log(req.method + " " + req.path);
  next();
});

app.use(express.json());
mongodb.connectToServer((response, err) => {
  if (err) {
    console.log(response);
    console.log(err);
    return;
  }
  console.log(response);

  const hiring = require("./routes/hiring");
  app.use("/api/jobs", hiring);

  const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
  app.listen(port, () =>
    console.log(`Server up and running on port ${port} !`)
  );
});
