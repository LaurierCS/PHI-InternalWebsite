var dotenv = require('dotenv').config()

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const jobsRouter = require("./routes/api/hiring");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// get db uri from dotenv and define options
const dbURI = require("./config/keys").mongoURI;
var dbOption =  {
  keepAlive: 1,
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
};
// Connect to MongoDB
mongoose
  .connect(dbURI, dbOption)
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// connect subrouters to main router
app.use("/api/jobs", jobsRouter)

//start server
const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
