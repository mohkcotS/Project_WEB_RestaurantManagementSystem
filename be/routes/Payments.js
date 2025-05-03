const express = require('express')
const router = express.Router()
const { Payments } = require("../models")
const { fn, col, literal, Op } = require("sequelize");
const moment = require('moment-timezone');

router.get("/", async (req, res, next) => {
    try {
        const listOfPayments = await Payments.findAll();
        res.json(listOfPayments);
    } catch (error) {
        next(error);
    }

})

router.get("/salesToday", async (req, res, next) => {
    try {
        const today = moment().startOf('day').toDate();

        const paymentTotal = await Payments.sum('amount', {
            where: {
                date: today }
        });

        res.json({ total: paymentTotal || 0 });
    } catch (error) {
        next(error);
    }
});

router.get("/salesMonth", async (req, res, next) => {
    try {
        const { yearMonth } = req.query;

        if (!yearMonth) {
            return res.status(400).json({ message: "yearMonth is required" });
        }

        const startOfMonth = moment(yearMonth, "YYYY-MM").startOf('month').toDate();
        const endOfMonth = moment(yearMonth, "YYYY-MM").endOf('month').toDate();

        const sales = await Payments.findAll({
            attributes: [
                [fn('DATE', col('Date')), 'date'],  
                [fn('SUM', col('amount')), 'total']
            ],
            where: {
                Date: {  
                    [Op.gte]: startOfMonth,
                    [Op.lte]: endOfMonth
                }
            },
            group: [literal('DATE(Date)')],  
            order: [[literal('DATE(Date)'), 'ASC']]  
        });

        res.json(sales);
    } catch (error) {
        next(error);
    }
});



// Create payment
router.post("/", async (req, res, next) => { 
    try {
        const post = req.body;
        await Payments.create(post);    
        res.status(201).json({ message: "Payment created successfully" });
    } catch (error) {
        console.error("Server error:", error);
        next({ statusCode: 500, message: "Internal server error" });
    }
});




module.exports = router