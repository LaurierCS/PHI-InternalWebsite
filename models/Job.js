const mongoose = require("mongoose");
require('mongoose-type-url');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    //optional include company name
    company: String,
    //optional include location
    location: String,
    //how will users apply? external link? 
    url: {
        type: mongoose.SchemaTypes.Url,
    },
    //optional include position type
    position: {
        type: String,
        enum: ['Full-time', 'Internship', 'Part-time', 'Contractor'],
    },
    jobDescript: String,
    jobReqs: String,
    //optional application deadline
    deadline: Date,
    //true - published, false - not published
    status: {
        type: Boolean,
        required: true,
        default: false
        }
}, 
//adds createdAt and updatedAt properties
{ timestamps: true });

const Job = mongoose.model('Job', JobSchema);
module.exports = Job