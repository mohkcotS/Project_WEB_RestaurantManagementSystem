const express = require('express')
const router = express.Router()
const { Orders } = require("../models")
const {validateToken , checkRole} = require('../middlewares/AuthMiddlewares')
const { Op } = require('sequelize');
const moment = require('moment');

router.get("/", async (req, res, next) => {
    try {
        const listOfOrders = await Orders.findAll();
        res.json(listOfOrders);
    } catch (error) {
        next(error);
    }

})

router.get("/today", async (req, res, next) => {
    try {
        const todayStart = moment().startOf('day').toDate(); 
        const todayEnd = moment().endOf('day').toDate(); 
        
        const orderCount = await Orders.count({
            where: {
                createdAt: {
                    [Op.gte]: todayStart, // >= 00:00:00
                    [Op.lte]: todayEnd,   // <= 23:59:59
                }
            }
        });
        res.json({ count: orderCount }); // Trả về số lượng đơn hàng
    } catch (error) {
        next(error);
    }
});



router.post("/", async (req, res, next) => {
    try {
        const post = req.body;
        const newOrder = await Orders.create(post);
        res.status(201).json(newOrder);
    } catch (error) {
        next(error);
    }

})

router.patch("/:id/status", validateToken, checkRole(["Manager"]),  async(req,res,next)=>{
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await Orders.findByPk(id);

        await order.update({status});

        return res.status(200).json({ message: "Change order status successfully" });

    } catch (error) {
        next({ statusCode: 500, message: "Internal server error" });
    }
})



module.exports = router