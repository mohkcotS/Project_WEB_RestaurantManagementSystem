const express = require('express')
const router = express.Router()
const { Users } = require("../models")
const bcrypt = require("bcrypt")
const {sign} = require('jsonwebtoken')
const {validateToken , checkRole} = require('../middlewares/AuthMiddlewares')

// Get post put delete get:id


//Get all user
router.get("/", validateToken, checkRole(["Manager"]) , async (req, res, next) => {
    try {
        const listOfUsers = await Users.findAll();
        res.json(listOfUsers);
    } catch (error) {
        next(error);
    }

})


//Count each type of user
router.get("/count", validateToken, checkRole(["Manager"]), async(req, res,next) => {
    try {
        const customer = await Users.count({
            where: { role: 'Customer' }
        })
        const manager = await Users.count({
            where: { role: 'Manager' }
        })
        const chef = await Users.count({
            where: { role: 'Chef' }
        })
        const cashier = await Users.count({
            where: { role: 'Cashier' }
        })

        res.json({
            customer: customer,
            manager: manager,
            chef: chef,
            cashier: cashier
        })
    } catch (error) {
        next(error)
    }
})

//Create user

router.post("/", async(req,res,next) => {
    try {
        const { name, role, password } = req.body;

        const existingUser = await Users.findOne({ where: { name: name } });
        if (existingUser) {
            return next({ statusCode: 404, message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo user mới
        const newUser = await Users.create({
            name: name,
            role: role,
            password: hashedPassword,
        });

        res.status(201).json({ message: "User created successfully" });
        
    } catch (error) {
        console.error("Server error:", error);
        next({ statusCode: 500, message: "Internal server error" });
    }



})

//Login
router.post("/login", async (req, res, next) => {
    try {
        const { name, password } = req.body;

        const user = await Users.findOne({ where: { name: name } });

        if (!user) {
            return next({ statusCode: 404, message: "User not found" }); 
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return next({ statusCode: 401, message: "Wrong password" }); 
        }

        const accessToken = sign({name: user.name, id: user.id, role : user.role},"importantsecret")
        return res.status(200).json({ accessToken, message: "Login successful" });

    } catch (error) {
        next(error); 
    }
});

//register
router.post("/register", async (req, res, next) => {
    try {
        const { name, role, password } = req.body;

        // Kiểm tra user đã tồn tại chưa
        const existingUser = await Users.findOne({ where: { name: name } });
        if (existingUser) {
            return next({ statusCode: 404, message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo user mới
        const newUser = await Users.create({
            name: name,
            role: role,
            password: hashedPassword,
        });

        res.status(201).json({ message: "User registered successfully" });
        
    } catch (error) {
        console.error("Server error:", error); 
        next({ statusCode: 500, message: "Internal server error" });
    }
});


//Edit user inf
router.put("/:id", validateToken, checkRole(["Manager"]),  async(req,res,next)=>{
    try {
        const { id } = req.params;
        const { name, role } = req.body;

        const user = await Users.findByPk(id);

        await user.update({ name, role });

        const accessToken = sign({name: user.name, id: user.id, role : user.role},"importantsecret")
        return res.status(200).json({ accessToken, message: "User updated successfully" });

    } catch (error) {
        next({ statusCode: 500, message: "Internal server error" });
    }
})

//delete user by id
router.delete("/:id", validateToken, checkRole(["Manager"]),  async(req,res,next)=>{
    try {
        const { id } = req.params;

        const user = await Users.findByPk(id);

        await user.destroy();

        return res.status(200).json({message: "User deleted successfully" });

    } catch (error) {
        next({ statusCode: 500, message: "Internal server error" });
    }
})

//get user from id
router.get("/:id", validateToken, checkRole(["Manager"]), async (req, res, next) => {
    try {
        const { id } = req.params; 
        const user = await Users.findByPk(id);

        if (!user) {
            return next({ statusCode: 404, message: "User not exists" });
        }

        return res.json(user);

    } catch (error) {
        next(error);
    }
});




module.exports = router