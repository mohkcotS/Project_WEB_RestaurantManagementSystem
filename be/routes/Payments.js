const express = require('express')
const router = express.Router()
const { Payments } = require("../models")

router.get("/", async (req, res, next) => {
    try {
        const listOfPayments = await Payments.findAll();
        res.json(listOfPayments);
    } catch (error) {
        next(error);
    }

})

router.post("/", async (req, res) => {
    try {
        const post = req.body;
        await Payments.create(post);
        res.json(post);
    } catch (error) {
        next(error);
    }

})



module.exports = router