const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Placeholder Job Schema
const JobSchema = new Schema({});

let Job = mongoose.model("Jobs", JobSchema);
module.exports = Job;
