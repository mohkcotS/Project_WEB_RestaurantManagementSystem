const express = require('express')
const router = express.Router()
const { Payments } = require("../models")
const { fn, col, literal, Op } = require("sequelize");
const moment = require('moment-timezone');
const {validateToken , checkRole} = require('../middlewares/AuthMiddlewares')

router.get("/", validateToken, checkRole(["Manager"]), async (req, res, next) => {
    try {
        const listOfPayments = await Payments.findAll();
        res.json(listOfPayments);
    } catch (error) {
        next(error);
    }

})

router.get("/salesToday", validateToken, checkRole(["Manager"]), async (req, res, next) => {
    try {
        const today = moment().startOf('day').toDate();

        const paymentTotal = await Payments.sum('amount', {
            where: {
                date: today,
                status: "success"
             }
        });

        res.json({ total: paymentTotal || 0 });
    } catch (error) {
        next(error);
    }
});

router.get("/salesMonth", validateToken, checkRole(["Manager"]), async (req, res, next) => {
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
                },
                status: "success"
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
router.post("/", validateToken, checkRole(["Cashier"]), async (req, res, next) => { 
    try {
        const post = req.body;
        await Payments.create(post);    
        res.status(201).json({ message: "Payment created successfully" });
    } catch (error) {
        console.error("Server error:", error);
        next({ statusCode: 500, message: "Internal server error" });
    }
});

router.patch("/:id/status", validateToken, checkRole(["Manager"]),  async(req,res,next)=>{
    try {
        const { id } = req.params;
        const { status, note } = req.body;

        const payment = await Payments.findByPk(id);

        await payment.update({ status, note });

        return res.status(200).json({ message: "Update payment status successfully" });

    } catch (error) {
        next({ statusCode: 500, message: "Internal server error" });
    }
})



module.exports = router