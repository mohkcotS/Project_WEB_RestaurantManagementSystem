const express = require('express')
const router = express.Router()
const { Order_Details } = require('../models')

router.get("/", async (req, res, next) => {
    try {
        const listOfOD = await Order_Details.findAll();
        res.json(listOfOD);
    } catch (error) {
        next(error)
    }

})

router.post("/", async (req, res, next) => {
    try {
        const post = req.body;
        await Order_Details.create(post);
        res.json(post);
    } catch (error) {
        next(error);
    }

})

module.exports = router