const express = require('express')
const router = express.Router()
const { Dishes } = require("../models")
const {validateToken , checkRole} = require('../middlewares/AuthMiddlewares')


router.get("/", validateToken, checkRole(["Manager","Customer"]), async (req, res, next) => {
    try {
        const listOfDishes = await Dishes.findAll();
        res.json(listOfDishes);
    } catch (error) {
        next(error);
    }

})


//Create new dish
router.post("/", validateToken, checkRole(["Manager"]), async (req,res,next)=>{
    try{
        const post = req.body;
        const newDish = await Dishes.create(post);
        res.status(201).json({ message: "Dish created successfully" });
    }catch(error){
        console.error("Server error:", error);
        next({ statusCode: 500, message: "Internal server error" });
    }
    
})

//Edit dish by id
router.put("/:id", validateToken, checkRole(["Manager"]),  async(req,res,next)=>{
    try {
        const { id } = req.params;
        const { name, type , price, status , imageUrl } = req.body;

        const dish = await Dishes.findByPk(id);

        await dish.update({ name, type , price, status , imageUrl });

        return res.status(200).json({ message: "Dish updated successfully" });

    } catch (error) {
        next({ statusCode: 500, message: "Internal server error" });
    }
})

//delete dish by id
router.delete("/:id", validateToken, checkRole(["Manager"]),  async(req,res,next)=>{
    try {
        const { id } = req.params;

        const dish = await Dishes.findByPk(id);

        await dish.destroy();

        return res.status(200).json({message: "Dish deleted successfully" });

    } catch (error) {
        next({ statusCode: 500, message: "Internal server error" });
    }
})

//get dish from id
router.get("/:id", validateToken, checkRole(["Manager"]), async (req, res, next) => {
    try {
        const { id } = req.params; 
        const dish = await Dishes.findByPk(id);

        if (!dish) {
            return next({ statusCode: 404, message: "Dish not exists" });
        }

        return res.json(dish);

    } catch (error) {
        next(error);
    }
});


module.exports = router