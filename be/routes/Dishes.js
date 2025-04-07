const express = require('express')
const router = express.Router()
const { Dishes } = require("../models")

router.get("/", async (req, res, next) => {
    try {
        const listOfDishes = await Dishes.findAll();
        res.json(listOfDishes);
    } catch (error) {
        next(error);
    }

})

router.post("/", async (req, res, next) => {
    try {
        const post = req.body;
        await Dishes.create(post);
        res.json(post);

    } catch (error) {
        next(error);
    }

})

module.exports = router