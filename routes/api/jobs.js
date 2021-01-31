const express = require("express");
const router = express.Router();

//const mongoose = require("mongoose");
const Jobs = require("../../models/Job");


// @route POST api/jobs/delete
// @desc delete a job posting from db
// @access Public
router.post("/delete/:jobID", (req, res)=>{
    //get id from params
    let id = req.params["jobID"];
    //find and delete from db
    Jobs.findByIdAndDelete(id, (err, docs)=>{
        //if err, return status 500
        if(err) res.status(500);
        //on successful completion, return status 200
        else res.status(200);
    });
});

// @route POST api/jobs/delete
// @desc edit a job posting within the db \
//   request.body should be the json job document \
//   including the properties to update
// @access Public
router.post("/update/:jobID", (req, res) => {
  let id = req.params["jobID"];
  let edited = JSON.parse(req.body);

  // TODO: verify that req.body matches Job schema

  Jobs.findByIdAndUpdate({id}, edited, function(err, res) {
    if(err) res.send(err);
    else res.send(200);
  });

});

// @route POST api/jobs/delete
// @desc  create a new job posting in the db \
// request.body should be the json for a Job document
// @access Public
router.post("/create", (req, res) => {
  let entry = JSON.parse(req.body);

  // TODO: verify that req.body matches Job schema

  Jobs.create(entry, function(err, res) {
    if(err) res.send(err);
    else res.status(200);
  });
});
