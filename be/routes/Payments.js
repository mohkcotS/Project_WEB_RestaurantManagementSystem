const express = require('express')
const router = express.Router()
const { Payments } = require("../models")
const { fn, col, literal } = require("sequelize");

router.get("/", async (req, res, next) => {
    try {
        const listOfPayments = await Payments.findAll();
        res.json(listOfPayments);
    } catch (error) {
        next(error);
    }

})

// get sales today
router.get("/salesToday", async (req, res, next) => {
    const {date} = req.query
    try {
        const payment = await Payments.findAll({
            where: { date: date }
        });

        const total = payment.reduce((sum, { amount }) => sum + parseFloat(amount), 0);

        res.json(total);
    } catch (error) {
        next(error);
    }

})

router.get("/salesMonth", async (req, res, next) => {
    const { yearMonth } = req.query; // Ví dụ: "2025-04"
  
    try {
      const paymentByDay = await Payments.findAll({
        attributes: [
          [fn('DATE', col('date')), 'date'],
          [fn('SUM', col('amount')), 'total']
        ],
        where: literal(`DATE_FORMAT(date, '%Y-%m') = '${yearMonth}'`),
        group: [fn('DATE', col('date'))],
        order: [[fn('DATE', col('date')), 'ASC']]
      });
  
      res.json(paymentByDay);
    } catch (error) {
      next(error);
    }
  });


// Create payment
router.post("/", async (req, res) => {
    try {
        const post = req.body;
        await Payments.create(post);
        res.status(201).json({ message: "Payment created successfully" });
    } catch (error) {
        console.error("Server error:", error);
        next({ statusCode: 500, message: "Internal server error" });
    }

})



module.exports = router