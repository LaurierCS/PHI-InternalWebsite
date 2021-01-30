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
        res.status(200);
    });
});
