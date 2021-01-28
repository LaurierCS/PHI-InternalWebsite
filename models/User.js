const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Do we want start dates required?

//Create education schema for use in ResumeSchema
const EducationSchema = new Schema({
  name:{
    type: String,
    required: true,
  },
  program:{
    type: String,
    required: true,
  },
  grade:{
    type: Number,
  },
  start_date:{
    type: Date,
  },
  end_date:{
    type: Date,
  }
});

//paid/volunteer experience schema for use in ResumeSchema
const ExperienceSchema = new Schema({
  title:{
    type: String,
    required: true,
  },
  company:{
    type: String,
    required: true,
  },
  start_date:{
    type: Date,
  },
  end_date:{
    type: Date,
  },
  description:{
    type: String
  }
});

//Project Schema for use in ResumeSchema
const ProjectSchema = new Schema({
  name:{
    type: String,
    required: true,
  },
  tech_stack:{
    type: String,
  },
  description:{
    type: String,
  },
  links:[{text: String, uri: String}]
});

const AwardSchema = new Schema({
  name:{
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  date:{
    type: Date,
    required: true
  }
});

//Create Resume Schema
const ResumeSchema = new Schema({
  name:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
  },
  phone_num:{
    type: String,
    required: true,
  },
  education:[EducationSchema],
  skills:[String],
  paid_experience:[ExperienceSchema],
  volunteer_experience:[ExperienceSchema],
  projects:[ProjectSchema],
  awards:[AwardSchema],
  links:[{text: String, uri: String}]
});

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  resumes:[ResumeSchema],
});
let User = mongoose.model("users", UserSchema);
module.exports = User;
