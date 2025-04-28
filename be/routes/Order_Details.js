const express = require('express')
const router = express.Router()
const { Order_Details, Orders, Dishes } = require('../models')
const moment = require('moment');
const { Op, Sequelize } = require('sequelize');

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

// get best selling
router.get("/bestselling", async (req, res, next) => {
    try {
        // Lấy thời gian bắt đầu và kết thúc của ngày hôm nay
        const todayStart = moment().startOf('day').toDate(); 
        const todayEnd = moment().endOf('day').toDate(); 

        // Truy vấn Order_Details để tính tổng số lượng bán được của từng món ăn
        const bestSelling = await Order_Details.findAll({
            include: [
                {
                    model: Dishes, 
                    attributes: ['name'], // Lấy tên món ăn
                }
            ],
            where: {
                createdAt: {
                    [Op.gte]: todayStart, // >= 00:00:00
                    [Op.lte]: todayEnd,   // <= 23:59:59
                }
            },
            attributes: [
                'dishId', // Để nhóm theo món ăn
                [Sequelize.fn('SUM', Sequelize.col('quantity')), 'totalQuantity'], // Tính tổng số lượng bán được
            ],
            group: ['dishId'], // Nhóm theo dishId để tính tổng số lượng bán
            order: [[Sequelize.fn('SUM', Sequelize.col('quantity')), 'DESC']], // Sắp xếp theo tổng số lượng giảm dần
            limit: 5, // Lấy 5 món ăn bán chạy nhất
        });

        // Chuyển kết quả thành mảng các object với cấu trúc { name, quantity }
        const topSellingDishes = bestSelling.map(item => {
            const dish = item.Dish; // Kiểm tra xem Dish có tồn tại không
            if (dish) {
                return {
                    name: dish.name,
                    quantity: item.get('totalQuantity'),
                };
            } else {
                return null; // Tránh trường hợp Dish không tồn tại
            }
        }).filter(item => item !== null); // Lọc những mục không hợp lệ

        res.json(topSellingDishes); // Trả về mảng top 10 món ăn
    } catch (error) {
        console.error(error); // In lỗi ra console để kiểm tra
        next(error); // Gọi middleware xử lý lỗi tiếp theo
    }
});


router.post("/", async (req, res, next) => {
    try {
        const post = req.body;

        await Order_Details.bulkCreate(post);
        console.log(post[0]);
        const orderId = post[0].OrderId;

        const orderDetails = await Order_Details.findAll({
            where: { OrderId: orderId }
        });

        const totalArray = orderDetails.map(orderDetail => {
            const totalItem = orderDetail.price * orderDetail.quantity;
            return totalItem;
        });

        const total = totalArray.reduce((sum, currentValue) => sum + currentValue, 0);

        await Orders.update(
            { total_Price: total },
            { where: { id: orderId } }
        );

        await Orders.update(
            { total_Price: total }, 
            { where: { id: orderId } }
        );

        res.status(201).json({ message: "Order placed successfully" });
    } catch (error) {
        next(error);
    }
});


module.exports = router