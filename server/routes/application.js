const express = require("express");
const router = express.Router();
const db = require("../db-script/db-connect").getDB();
const collection = db.collection("Applications");
const ObjectId = require("mongodb").ObjectID

function validate(entry){
  entry.last_modified = Date.now()

  if(!entry.start_application_date) entry.start_application_date = Date.now()
  if(!entry.submitted) entry.submitted = false;

  //TODO: Complete Method
  let valid = true

  return valid
}

function validateUpdate(entry){
  entry.last_modified = Date.now()

  //TODO: Complete Method
  let valid = true

  return valid
}

// @route GET api/application/
// @desc  gets all applications and returns array sorted by modified date.
// @access Public
router.get("/", (req, res) => {
  collection.find({}).toArray((err, docs) => {
    //check if error, else send err
    if (err) res.status(500).send(err);
    else{
      //sort based on a custom function
      docs.sort((a,b)=>{
        return b.last_modified - a.last_modified
      })
      //send response documents
      res.status(200).send(docs);
    }
  });
});

// @route GET api/application/submitted/:jobID
// @desc  gets all submitted applications and returns array sorted by modified date for specified jobID
// @access Public
router.get("/submitted/:jobID", (req, res)=>{

  let id = ObjectId(req.params["jobID"]);

  //get collection where query is true
  collection.find({ submitted:true, jobID:id }).toArray((err, docs)=>{
    //check if error, else send err
    if (err) res.status(500).send(err);
    else{
      //sort based on a custom function
      docs.sort((a,b)=>{
        return b.last_modified - a.last_modified
      })
      //send response documents
      res.status(200).send(docs);
    }
  })
});

// @route POST api/application/create
// @desc  create a new application in the db 
//   request.body should be the json for a application document
// @access Public
router.post("/create", (req, res)=>{
  let entry = req.body;
  if(validate(entry)){
    collection.insertOne(entry).then(result=>{
      res.status(200).send("OK")
    }).catch(err=>{
      res.status(500).send(err)
    });
  } else {
    res.status(400).send("BAD REQUEST")
  }
});

// // @route POST api/jobs/delete
// // @desc delete a application from db
// // @access Public
router.post("/delete/:appID", (req, res)=>{
  //get id from params
  let id = ObjectId(req.params["appID"]);

  //delete one with query of id
  collection.deleteOne({_id:id}, obj=>{
    res.status(200).send("OK")
  }).catch(err=>{
    res.status(500).send(err)
  })
});

// // @route POST api/application/update
// // @desc edit a application within the db \
// //   request.body should be the json application document \
// //   including the properties to update
// // @access Public
router.post("/update/:appID", (req, res)=>{
  //get id from params
  let id = ObjectId(req.params["appID"]);
  //get entry from body
  let update = req.body
  //check if valid
  if(validateUpdate(update)){
    //update with id query and replace fields in update
    collection.updateOne({ _id:id }, {$set: update}).then(result=>{
      //send ok response
      res.status(200).send("OK")
    }).catch(err=>{
      //catch then send err to client
      res.status(500).send(err);
    })
  } else {
    res.status(400).send("BAD REQUEST")
  }
});

// @route POST api/application/submit/:appID
// @desc  sets state of application to submitted
// @access Public
router.post("/submit/:appID", (req, res)=>{
  let id = ObjectId(req.params["appID"])

  let update = {
    last_modified: Date.now(),
    submitted: true,
    draft: false
  }

  collection.updateOne({_id:id}, {$set:update}, result=>{
    res.status(200).send("OK")
  }).catch(err=>{
    res.status(500).send(err)
  });
});

// @route POST api/application/unsubmit/:appID
// @desc  sets state of application to unsubmitted (to a draft)
// @access Public
router.post("/unsubmit/:appID", (req, res)=>{
  let id = ObjectId(req.params["appID"])

  let update = {
    last_modified: Date.now(),
    submitted: false,
    draft: true
  }

  collection.updateOne({_id:id}, {$set:update}, result=>{
    res.status(200).send("OK")
  }).catch(err=>{
    res.status(500).send(err)
  });
});

