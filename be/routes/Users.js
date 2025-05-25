const express = require('express')
const router = express.Router()
const { Users ,Rewards, Orders } = require("../models")
const bcrypt = require("bcrypt")
const {sign} = require('jsonwebtoken')
const {validateToken , checkRole} = require('../middlewares/AuthMiddlewares')
require('dotenv').config();


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

router.post("/", validateToken, checkRole(["Manager"]), async(req,res,next) => {
    try {
        const { name, role, password } = req.body;

        const existingUser = await Users.findOne({ where: { name: name } });
        if (existingUser) {
            return next({ statusCode: 409, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Users.create({
            name: name,
            role: role,
            password: hashedPassword,
        });

        
        await Rewards.create({
            UserId: newUser.id
        })

        
        
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

        const accessToken = sign({id: user.id, role : user.role},process.env.DEV_SECRETJWT)
        return res.status(200).json({ accessToken, message: "Login Successfully" });

    } catch (error) {
        next(error); 
    }
});

//register
router.post("/register", async (req, res, next) => {
    try {
        const { name, role, password } = req.body;

        const existingUser = await Users.findOne({ where: { name: name } });
        if (existingUser) {
            return next({ statusCode: 409, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Users.create({
            name: name,
            role: role,
            password: hashedPassword,
        });

        if(newUser.role === "Customer"){
            const newReward = await Rewards.create({
                UserId: newUser.id
            })

        }

        res.status(201).json({ message: "User registered successfully" });
        
    } catch (error) {
        console.error("Server error:", error); 
        next({ statusCode: 500, message: "Internal server error" });
    }
});


//Edit user inf
router.patch("/:id", validateToken, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, role, password, newPassword, phoneNumber } = req.body;
        const tokenData = req.user; 

        const user = await Users.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (name !== undefined) user.name = name;
        if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;

        if (role !== undefined) {
            if (tokenData.role === "Manager") {
                user.role = role;
            } else {
                return res.status(403).json({ message: "You are not allowed to change role" });
            }
        }

        if (password !== undefined && newPassword !== undefined) {
            if (tokenData.role === "Customer") {
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return res.status(400).json({ message: "Wrong old password" });
                }

                const hashedPassword = await bcrypt.hash(newPassword, 10);
                user.password = hashedPassword;
            } else {
                return res.status(403).json({ message: "You are not allowed to change password" });
            }
        }

        await user.save();

        let accessToken = null;
        if (role !== undefined) {
            accessToken = sign({ id: user.id, role: user.role }, process.env.DEV_SECRETJWT);
            return res.status(200).json({
                message: "User updated successfully",
                accessToken,
            });
        }

        return res.status(200).json({ message: "User updated successfully"});
       

    } catch (error) {
        next({ statusCode: 500, message: "Internal server error" });
    }
});

//delete user by id
router.delete("/:id", validateToken, checkRole(["Manager","Customer"]),  async(req,res,next)=>{
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
router.get("/:id", validateToken, checkRole(["Manager","Customer","Cashier","Chef"]), async (req, res, next) => {
    try {
        const { id } = req.params; 
        const user = await Users.findByPk(id, {
            attributes: ['id', 'name', 'role', 'phoneNumber']
        });

        if (!user) {
            return next({ statusCode: 404, message: "User not exists" });
        }

        return res.json(user);

    } catch (error) {
        next(error);
    }
});

router.get("/:id/orders", validateToken, checkRole(["Customer"]),async (req, res, next) => {
    try {
        const { id } = req.params; 
        const orders = await Orders.findAll({
            where: { UserId: id }  
        });

        return res.json(orders);

    } catch (error) {
        next(error);
    }
});



module.exports = router