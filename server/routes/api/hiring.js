const { response } = require("express");
const express = require("express");
const router = express.Router();

//const mongoose = require("mongoose");
const Jobs = require("../../db-script/schemas/Job");

// @route POST api/jobs/delete
// @desc  create a new job posting in the db 
//   request.body should be the json for a Job document
// @access Public
router.post("/create", (req, res) => {
  //get job from body
  let entry = req.body;

  // TODO: verify that req.body matches Job schema

  //creates job document with posted data
  Jobs.create(entry, function (err, doc) {
    //if query fails send status 500
    if (err) res.status(500).send(err);
    //on success return status 200
    else res.status(200).send("OK");
  });
});

// @route POST api/jobs/delete
// @desc delete a job posting from db
// @access Public
router.post("/delete/:jobID", (req, res) => {
  //get id from params
  let id = req.params["jobID"];
  //find and delete from db
  Jobs.findByIdAndDelete(id, (err, docs) => {
    //if err, return status 500 and send error
    if (err) res.status(500).send(err);
    //on successful completion, return status 200
    else res.status(200).send("OK");
  });
});

// @route POST api/jobs/delete
// @desc edit a job posting within the db \
//   request.body should be the json job document \
//   including the properties to update
// @access Public
router.post("/update/:jobID", (req, res) => {
  //get job id and body from request
  let id = req.params["jobID"];
  let edited = req.body;
  //updates last modified if not defined
  if(edited.last_modified === undefined) edited.last_modified = Date.now()

  // TODO: verify that req.body matches Job schema

  //query db to find the document and update with new job obj
  Jobs.findByIdAndUpdate(id, edited, function (err, doc) {
    //if query fails send status 500
    if (err) res.status(500).send(err);
    //on success return status 200
    else res.status(200).send("OK");
  });
});

// @route GET api/jobs/
// @desc  gets all published jobs and returns array sorted by modified date.
// @access Public
router.get("/published", (req, res)=>{
  //query db for published is true
  Jobs.find({published: true}, null, (err, docs)=>{
    //if query fails send status 500
    if(err) res.status(500).json(err);
    else{
      //sort with custom function that compares the last_modified dates
      docs.sort((a,b)=>{
        return b.last_modified - a.last_modified
      })
      //on success return status 200 and the json array of the queried docs
      res.status(200).json(docs);
    }
  });
});

// @route POST api/jobs/publish/:jobID
// @desc  publishes the posted job.
// @access Public
router.post("/publish/:jobID", (req, res) => {
  //get id from params
  let id = req.params["jobID"];
  //queries db by id and updates published and last modified attributes
  Jobs.findByIdAndUpdate(id, { published: true, last_modified: Date.now() }, function (err, doc) {
    //if query fails send status 500
    if (err) res.status(500).send(err);
    //on success return status 200
    else res.status(200).send("OK");
  });
});

// @route POST api/jobs/unpublish/:jobID
// @desc  unpublishes the posted job.
// @access Public
router.post("/unpublish/:jobID", (req, res) => {
  //get id from params
  let id = req.params["jobID"];
  //queries db by id and updates published and last modified attributes
  Jobs.findByIdAndUpdate(id, { published: false, last_modified: Date.now() }, function (err, doc) {
    //if query fails send status 500
    if (err) res.status(500).send(err);
    //on success return status 200
    else res.status(200).send("OK");
  });
});

// @route GET api/jobs/
// @desc  gets all jobs and returns array sorted by modified date.
// @access Public
router.get("/", (req, res) => {
  Jobs.find({}, null, (err, docs)=>{
    //if query fails send status 500
    if(err) res.status(500).json(err);
    else{
      //sort with custom function that compares the last_modified dates
      docs.sort((a,b)=>{
        return b.last_modified - a.last_modified
      })
      //on success return status 200 and the json array of the queried docs
      res.status(200).json(docs);
    }
  })
});

module.exports = router