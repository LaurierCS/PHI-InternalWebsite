const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Placeholder Job Schema
const JobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  requirements: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  last_modified: {
    type: Date,
    default: Date.now
  },
  published: {
    type: Boolean,
    required: true
  }
});

let Job = mongoose.model("Jobs", JobSchema);
module.exports = Job;
