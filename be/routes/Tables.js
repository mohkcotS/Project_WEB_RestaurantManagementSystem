const express = require('express')
const router = express.Router()
const {Tables} = require("../models")

//get all Tables
router.get("/",async (req,res,next)=>{
    try{
        const listOfTables = await Tables.findAll();
        res.json(listOfTables);
    }catch(error){
        next(error);
    }
})

//create new table
router.post("/", async (req,res,next)=>{
    try{
        const post = req.body;
        const newTable = await Tables.create(post);
        res.status(201).json({ message: "Table created successfully" });
    }catch(error){
        console.error("Server error:", error);
        next({ statusCode: 500, message: "Internal server error" });
    }
    
})



module.exports = router