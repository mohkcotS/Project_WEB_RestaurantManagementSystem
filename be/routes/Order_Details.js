const express = require('express')
const router = express.Router()
const { Order_Details, Orders, Dishes } = require('../models')

//get All detail from orderId
router.get("/", async (req, res, next) => {
    try {
        const { orderId } = req.query;

        if (!orderId) {
            return res.status(400).json({ error: "orderId is required" });
        }

        const orderDetails = await Order_Details.findAll({
            where: { OrderId: orderId },
            include: [
                {
                    model: Dishes, 
                    attributes: ['name']
                }
            ]
        });

        const orderItems = orderDetails.reduce((acc, orderDetail) => {
            const existingItem = acc.find(item => item.name === orderDetail.Dish.name);

            if (existingItem) {
                existingItem.quantity += orderDetail.quantity;
                existingItem.totalPrice = existingItem.quantity * existingItem.price;
            } else {
                acc.push({
                    name: orderDetail.Dish.name,
                    quantity: orderDetail.quantity,
                    price: orderDetail.price,
                    totalPrice: orderDetail.quantity * orderDetail.price
                });
            }

            return acc;
        }, []);
        res.json(orderItems);

    } catch (error) {
        next(error);
    }
});



router.post("/", async (req, res, next) => {
    try {
        const post = req.body;
        console.log(post[0].OrderId)
        await Order_Details.bulkCreate(post);

        const orderId = post[0].OrderId;

        const total = await Order_Details.sum("price", {
            where: { OrderId: orderId }
        });


        await Orders.update(
            { total_Price: total },
            { where: { id: orderId } }
        );

        res.status(201).json({ message: "Order placed successfully" });
    } catch (error) {
        next(error);
    }

})

module.exports = router