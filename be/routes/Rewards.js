const express = require('express')
const router = express.Router()
const { Rewards } = require("../models")

router.get("/", async (req, res, next) => {
    try {
        const listOfRewards = await Rewards.findAll();
        res.json(listOfRewards);
    } catch (error) {
        next(error);
    }

})

router.post("/", async (req, res, next) => {
    try {
        const post = req.body;
        await Rewards.create(post);
        res.json(post);
    } catch (error) {
        next(error);
    }

})



module.exports = router