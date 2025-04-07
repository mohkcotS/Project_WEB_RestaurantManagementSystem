const express = require('express')
const router = express.Router()
const { Orders } = require("../models")

router.get("/", async (req, res, next) => {
    try {
        const listOfOrders = await Orders.findAll();
        res.json(listOfOrders);
    } catch (error) {
        next(error);
    }

})

router.post("/", async (req, res, next) => {
    try {
        const post = req.body;
        await Orders.create(post);
        res.json(post);
    } catch (error) {
        next(error);
    }

})

router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const oldOrder = await Orders.findByPk(id);
        if (!oldOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        for (const key in updateData) {
            if (updateData[key] !== null && updateData[key] !== undefined) {
                oldOrder[key] = updateData[key];
            }
        }
        await oldOrder.save();
        res.json(oldOrder);
    } catch (error) {
        next(error);
    }


});



module.exports = router