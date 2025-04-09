const express = require('express')
const router = express.Router()
const {Tables} = require("../models")
const {validateToken , checkRole} = require('../middlewares/AuthMiddlewares')

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

//Edit table by id
router.put("/:id", validateToken, checkRole(["Manager"]),  async(req,res,next)=>{
    try {
        const { id } = req.params;
        const { name, type , status } = req.body;

        const table = await Tables.findByPk(id);

        await table.update({ name, type ,status });

        return res.status(200).json({ message: "Table updated successfully" });

    } catch (error) {
        next({ statusCode: 500, message: "Internal server error" });
    }
})

//delete user by id
router.delete("/:id", validateToken, checkRole(["Manager"]),  async(req,res,next)=>{
    try {
        const { id } = req.params;

        const table = await Tables.findByPk(id);

        await table.destroy();

        return res.status(200).json({message: "Table deleted successfully" });

    } catch (error) {
        next({ statusCode: 500, message: "Internal server error" });
    }
})

//get user from id
router.get("/:id", validateToken, checkRole(["Manager"]), async (req, res, next) => {
    try {
        const { id } = req.params; 
        const table = await Tables.findByPk(id);

        if (!table) {
            return next({ statusCode: 404, message: "table not exists" });
        }

        return res.json(table);

    } catch (error) {
        next(error);
    }
});



module.exports = router