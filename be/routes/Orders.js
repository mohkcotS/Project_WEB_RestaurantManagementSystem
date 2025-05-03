const express = require('express')
const router = express.Router()
const { Orders, Order_Details } = require("../models")
const {validateToken , checkRole} = require('../middlewares/AuthMiddlewares')
const moment = require('moment');

router.get("/", async (req, res, next) => {
    try {
        const listOfOrders = await Orders.findAll();
        res.json(listOfOrders);
    } catch (error) {
        next(error);
    }

})

router.get("/pending", async (req, res, next) => {
    try {
        const orders = await Orders.findAll({
            where: { status: "pending" },
            include: [{ model: Order_Details }],
        });

        // Chỉ giữ lại đơn hàng còn món chưa completed
        const filtered = orders.filter(order =>
            order.Order_Details.some(d => d.status !== "completed")
        );

        // Gắn thêm trường updatedAt sớm nhất của các món chưa completed để sort
        const sorted = filtered
            .map(order => {
                const pendingDetails = order.Order_Details.filter(d => d.status !== "completed");
                const earliestUpdate = pendingDetails.reduce((min, d) => {
                    return new Date(d.updatedAt) < new Date(min) ? d.updatedAt : min;
                }, pendingDetails[0]?.updatedAt);

                return {
                    order: order.toJSON(),
                    sortTime: earliestUpdate
                };
            })
            .sort((a, b) => new Date(a.sortTime) - new Date(b.sortTime)) // sắp xếp tăng dần theo thời gian
            .map(entry => {
                const { Order_Details, ...rest } = entry.order;
                return rest;
            });

        res.json(sorted);
    } catch (error) {
        next(error);
    }
});


router.get("/today", async (req, res, next) => {
    try {

        const today = moment().startOf('day').toDate();

        const orderCount = await Orders.count({
            where: {
                date: today
            }
        });

        res.json({ count: orderCount });
    } catch (error) {
        next(error);
    }
});

router.get("/table/:tableId", async (req, res, next) => {
    const { tableId } = req.params;
    try {
        const order = await Orders.findOne({
            where: {
                tableId: tableId,
                status: "pending" 
            },
            order: [["createdAt", "DESC"]]
        });
        res.json(order);
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

router.patch("/:id/status", validateToken, checkRole(["Manager","Cashier"]),  async(req,res,next)=>{
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