const { MongoClient } = require("mongodb");
require("dotenv").config({path:'PHI-Internal\.env'});
// name of database
const dbName = "phi-internal";
// name of collection
const collectionName = "jobs";

// ***WORKS PROPERLY BUT PRINTS AN ERROR WHEN JOBS COLLECTION DIDN'T ALREADY EXIST***
// creates the "jobs" collection that job postings are stored in
async function createJobsCollection(client, collectionName) {
    var db = client.db(dbName);
    // listCollections is used to check if the collection already exists
    await db.listCollections({name: collectionName})
    .next(function(err, collinfo) {
        if (err) {
            console.log("error");
            // return err;
        }
        else {
            if (!collinfo) {
                // if the collection doesn't exist, createCollection is used to create it
                db.createCollection( collectionName,
                {
                    validator: {$jsonSchema: {
                        bsonType: "object",
                        additionalProperties: true,
                        // all objects in the collection must contain title and status properties
                        required: ["title", "status", "lastModified"],
                        properties: {
                        _id: {
                            bsonType: "objectId"
                        },
                        title: {
                            bsonType: "string",
                            description: "must be a string and is required"
                        },
                        company: {
                            bsonType: "string",
                            description: "must be a string if the field exists"
                        },
                        locaton: {
                            bsonType: "string",
                            description: "must be a string if the field exists"
                        },
                        url: {
                            bsonType: "string",
                            description: "must be a string if the field exists"
                        },
                        position: {
                            enum: ["Full-time", "Internship", "Part-time", "Contractor"],
                            description: "can only be one of the enum values if the field exists"
                        },
                        jobDescript: {
                            bsonType: "string",
                            description: "must be a string if the field exists"
                        },
                        jobReqs: {
                            bsonType: "string",
                            description: "must be a string if the field exists"
                        },
                        deadline: {
                            bsonType: "date",
                            description: "must be a date if the field exists"
                        },
                        status: {
                            bsonType: "bool",
                            description: "true if published and false if not published, is required"
                        },
                        lastModified: {
                            bsonType: "timestamp",
                            description: "must be a timestamp and is required"
                        }
                        }
                    }
                    },
                    validationLevel: "moderate",
                    validationAction: "warn"
                },
                function(err, res) {
                    if (err) {
                        console.log(err);
                        return err;
                    }
                    else {
                        console.log("Created 'jobs' collection");
                    }
                })
                }   
            else {
              console.log("'jobs' collection already exists");
            }
        }
    });
};

// insert object into collection
async function insertOne(client, collectionName, obj) {
    var db = client.db(dbName);
    db.collection(collectionName).insertOne(obj, function(err, res) {
      if (err) {
        console.log(err);
        return err;
      }
      else {
        console.log("1 object inserted into collection");
        return res;
      }
    });
}

async function main(){

    // manually write username, password, and database name
    const uri = "mongodb+srv://rachel:testpassword@cluster0.9iuop.mongodb.net/phi-internal";

    // ***ENV FILE NOT WORKING PROPERLY***
    // use .env file instead of manually writing username, password, and database name
    //const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.9iuop.mongodb.net/${process.env.DB_NAME}`;
    //const uri = `mongodb+srv://${process.env.mongodbUsername}:${process.env.mongodbPassword}@cluster0.cthkj.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority`; 
    //const dbName = process.env.dbName;   

    // create a MongoClient instance
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
 
    try {
        // connect to the MongoDB cluster
        await client.connect();
        var db = client.db(dbName);

        // CRUD operations
        // create "jobs" collection if not already created
        await createJobsCollection(client, collectionName)

        // initialize an object variable to insert into the collection
        var obj = { title: "Cardiology Technologist", company: "The Heart Care Diagnostic Centre", location: "Richmond Hill", 
        url: "https://www.learn4good.com/jobs/richmond-hill/canada/doctor_of_medicine/256135050/e/", position: "Cardiology Technologist", 
        jobReqs: "Check, calibrate and perform routine maintenance to equipmentArea of SpecializationPacemaker analysis; Exercise stress testing; Electrocardiography tests; Ambulatory monitoring; Holter monitoring/scanningWork Conditions and Physical CapabilitiesFast-paced environment; Work under pressure; Repetitive tasks; Attention to detail; Hand-eye co-ordination; Ability to distinguish between colours; Combination of sitting, standing, walking; WalkingAbility to Supervise1 to 2 peopleCardiology Technologists Specific SkillsPrepare reports for interpretation by cardiologists; Perform cardiovascular procedures and tests; Monitor cardiac activity and record resultsElectrophysiological Technologists Specific SkillsPrepare recordings and reports of findings for physicians; Review patient's case history and assess nature of problem to determine procedures and tests required; Take notes on the recorded graph to identify interferencePersonal SuitabilityEffective interpersonal skills; Flexibility; Team player; Excellent oral communication; Excellent written communication; Judgement; Reliability; Organized", 
        deadline: new Date("2021-04-25"), status: false, lastModified: new Date()};

        // insert obj into the collection
        await insertOne(client, collectionName, obj);

        // initialize multiple object variables and insert all into collection
        await db.collection(collectionName).insertMany( [
            { title: "job1", company: "company", location: "location", 
            url: "url", position: "position", 
            jobReqs: "job requirements",
            deadline: new Date("2021-07-18"), status: false, lastModified: new Date() },
            { title: "job2", company: "company2", location: "location2", 
            url: "url2", position: "position2", 
            jobReqs: "job requirements2",
            deadline: new Date("2021-10-10"), status: false, lastModified: new Date() },
            { title: "job3", company: "company3", location: "location3", 
            url: "url3", position: "position3", 
            jobReqs: "job requirements3",
            deadline: new Date("2021-03-19"), status: false, lastModified: new Date() }
        ] )            
            .then(result => console.log(`Inserted ${result.insertedCount} objects`))
            .catch(err => console.error(`Failed to add review: ${err}`))

        // query an object by id (ObjectId)
        var ObjectId = require('mongodb').ObjectID;
        const query = { _id : ObjectId("6060d7764356985c902e71ce") };
        // update objects by setting status to true
        const update = {
            "$set": {
                "status": true
            }
        };
        // upsert is false, so if the object is not found, object is not updated or inserted into collection
        const options = { "upsert": false };
        // update first object that matches query
        var updateResult = await db.collection(collectionName).updateOne(query, update, options)
            .then(result => {
                const { matchedCount, modifiedCount } = result;
                if(matchedCount && modifiedCount) {
                    console.log(`Successfully updated 1 object`)
                }
                else {
                    console.log("Could not find object to update")
                }
            })
            .catch(err => console.error(`Failed to add review: ${err}`))
        
        // update all objects that match query
        var updateResults = await db.collection(collectionName).updateMany(query, update, options)
            .then(result => {
                const { matchedCount, modifiedCount } = result;
                if(matchedCount && modifiedCount) {
                    console.log(`Successfully updated ${result.modifiedCount} objects`)
                }
                else {
                    console.log("Could not find object to update")
                }
            })
            .catch(err => console.error(`Failed to add review: ${err}`))

        const jobs = db.collection(collectionName);
        var myQuery = {url:'url2'};

        // find and print all objects in collection
        const allResults = await jobs.find().toArray(function(err, docs) {
            console.log("All objects:")
            console.log(JSON.stringify(docs));
        });
    
        // find objects in collection by query and print results
        const queryResults = await jobs.find(myQuery).exec().toArray(function(err, docs) {
            console.log("Objects by query search:")
            console.log(JSON.stringify(docs));
        });

        // delete first object that matches query
        const result = await jobs.deleteOne(myQuery)
            .then(result => {
                if (result.deletedCount == 0) {
                    console.log("Could not find object to delete")
                }
                else {
                    console.log(`Deleted ${result.deletedCount} item.`)
                }})
            .catch(err => console.error(`Delete failed with error: ${err}`))

        myQuery = {url:'url3'};
        // delete all objects that match query
        var results = await jobs.deleteMany(myQuery)
            .then(result => {
                if (result.deletedCount == 0) {
                    console.log("Could not find object to delete")
                }
                else {
                    console.log(`Deleted ${result.deletedCount} item.`)
                }})
            .catch(err => console.error(`Delete failed with error: ${err}`))

    } catch (e) {
        console.error(e);
    } finally {
        // close connection when done executing
        await client.close();
    }
}

// run main()
main().catch(console.error);
