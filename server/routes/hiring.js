const express = require("express");
const router = express.Router();
const db = require("../db-script/db-connect").getDB();
const collection = db.collection("Jobs");
const ObjectId = require("mongodb").ObjectID

function validate(entry){
  entry.last_modified = Date.now()
  entry.created = Date.now()

  if(!entry.published) entry.published = false;

  //TODO: Complete Method
  let valid = true

  return valid
}
// // @route POST api/jobs/delete
// // @desc delete a job posting from db
// // @access Public
// router.post("/delete/:jobID", (req, res) => {
//   //get id from params
//   let id = req.params["jobID"];
//   //find and delete from db
//   Jobs.findByIdAndDelete(id, (err, docs) => {
//     //if err, return status 500
//     if (err) res.status(500);
//     //on successful completion, return status 200
//     else res.status(200);
//   });
// });

// // @route POST api/jobs/delete
// // @desc delete a job posting from db
// // @access Public
router.post("/delete/:jobID", (req, res)=>{
  //get id from params
  let id = ObjectId(req.params["jobID"]);

  //delete one with query of id
  collection.deleteOne({_id:id}, (err, obj)=>{
    //check if error, else send err
    if (err) res.status(500).send(err);
    //send ok response
    else res.status(200).send("OK");
  });
});

// @route POST api/jobs/create
// @desc  create a new job posting in the db 
//   request.body should be the json for a Job document
// @access Public
router.post("/create", (req,res)=>{
  //get entry from body
  let entry = req.body;
  //validate data
  if(validate(entry)){
    //insert into collection
    collection.insertOne(entry).then(result => {
      //send ok response
      res.status(200).send("OK")
    }).catch(err=>{
      //catch then send error to client
      res.status(500).send(err);
    })
  }
});

// // @route POST api/jobs/update
// // @desc edit a job posting within the db \
// //   request.body should be the json job document \
// //   including the properties to update
// // @access Public
router.post("/update/:jobID", (req, res)=>{
  //get id from params
  let id = ObjectId(req.params["jobID"]);
  //get entry from body
  let update = req.body
  //check if valid
  if(validate(update)){
    //update with id query and replace fields in update
    collection.updateOne({ _id:id }, {$set: update}).then(result=>{
      //send ok response
      res.status(200).send("OK")
    }).catch(err=>{
      //catch then send err to client
      res.status(500).send(err);
    })
  }
});

// @route GET api/jobs/published
// @desc  gets all published jobs and returns array sorted by modified date.
// @access Public
router.get("/published", (req, res)=>{
  //get collection where query is true
  collection.find({ published:true }).toArray((err, docs)=>{
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

// @route POST api/jobs/publish/:jobID
// @desc  publishes the posted job.
// @access Public
router.post("/publish/:jobID", (req, res)=>{
  //get id from params
  let id = ObjectId(req.params["jobID"]);
  
  updateObj = {
    last_modified: Date.now(),
    created: Date.now(),
    published: true
  }

  //update one with query id and replace updateObjs.
  collection.updateOne({_id:id}, {$set:updateObj}, (err, result)=>{
    //check if error, else send err
    if (err) res.status(500).send(err);
    else res.status(200).send("OK")
  });
})

// @route POST api/jobs/unpublish/:jobID
// @desc  unpublishes the posted job.
// @access Public
router.post("/unpublish/:jobID", (req, res)=>{
  //get id from params
  let id = ObjectId(req.params["jobID"]);
  
  updateObj = {
    last_modified: Date.now(),
    created: Date.now(),
    published: false
  }

  //update one with query id and replace updateObjs.
  collection.updateOne({_id:id}, {$set:updateObj}, (err, result)=>{
    //check if error, else send err
    if (err) res.status(500).send(err);
    else res.status(200).send("OK")
  });
})


// @route GET api/jobs/
// @desc  gets all jobs and returns array sorted by modified date.
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

module.exports = router;