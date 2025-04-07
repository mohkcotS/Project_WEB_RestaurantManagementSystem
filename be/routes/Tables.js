const express = require('express')
const router = express.Router()
const {Tables} = require("../models")

router.get("/",async (req,res,next)=>{
    try{
        const listOfTables = await Tables.findAll();
        res.json(listOfTables);
    }catch(error){
        next(error);
    }
})

router.post("/", async (req,res,next)=>{
    try{
        const post = req.body;
        const newTable = await Tables.create(post);
        res.status(201).json(newTable);
    }catch(error){
        next(error);
    }
    
})



module.exports = router