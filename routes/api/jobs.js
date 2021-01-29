const express = require("express");
const router = express.Router();

const mongoose = require('mongoose')

router.post('/delete/:jobID', (req, res)=>{
    console.log(req.params['jobID'])
})