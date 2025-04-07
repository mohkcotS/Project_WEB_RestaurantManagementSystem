const express = require("express")
const app = express()
const cors = require("cors")
const errorHandler = require('./middlewares/ErrorHandler')


app.use(express.json());
app.use(cors());

const db = require('./models')

//Routers
const userRouter = require('./routes/Users')
app.use("/users", userRouter)

const dishRouter = require('./routes/Dishes')
app.use("/dishes", dishRouter)

const tableRouter = require('./routes/Tables')
app.use("/tables", tableRouter)

const orderRouter = require('./routes/Orders')
app.use("/orders", orderRouter)

const order_detailRouter = require('./routes/Order_Details')
app.use("/order_details", order_detailRouter)

const paymentRouter = require('./routes/Payments')
app.use("/payments", paymentRouter)

const rewardRouter = require('./routes/Rewards')
app.use("/rewards", rewardRouter)

const authRouter = require('./routes/Users');
app.use("/auth", authRouter)



// Error handling
app.use(errorHandler);

//Database connection
db.sequelize.sync().then(() => {
    const PORT = 3001;
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error("Unable to connect to the database:", error);
});




