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

//get reward by userId
router.get("/user/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        const reward = await Rewards.findOne({
            where: { UserId: id },
            attributes: ['tier', 'currentPoints']
        });
        res.json(reward);
    } catch (error) {
        next(error);
    }

})

module.exports = router