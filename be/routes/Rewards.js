const express = require('express')
const router = express.Router()
const { Rewards } = require("../models")

router.get("/", async (req, res, next) => {
    try {
        const listOfRewards = await Rewards.findAll();
        res.json(listOfRewards);
    } catch (error) {
        next(error);
    }

})


router.post("/", async (req, res, next) => {
    try {
        const post = req.body;
        await Rewards.create(post);
        res.json(post);
    } catch (error) {
        next(error);
    }

})

//get reward by userId
router.get("/user/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        const reward = await Rewards.findOne({
            where: { UserId: id },
            attributes: ['tier', 'totalPoints']
        });
        res.json(reward);
    } catch (error) {
        next(error);
    }

})

// update user loyalty point
router.patch("/user/:id/totalPoints", async (req, res, next) => {
    const { id } = req.params;
    const { newPoints } = req.body;
  
    try {

      const reward = await Rewards.findOne({
        where: { UserId: id },
        attributes: ['id','totalPoints', 'tier']
      });

  
      if (!reward) {
        return res.status(404).json({ message: "Reward not found" });
      }
      
      const updatedPoints = reward.totalPoints + newPoints;
      
      console.log(updatedPoints)


      let newTier = reward.tier;
      if (updatedPoints >= 500) {
        newTier = 'Diamond';
      } else if (updatedPoints >= 300) {
        newTier = 'Platinum';
      } else if (updatedPoints >= 150) {
        newTier = 'Gold';
      } else if (updatedPoints >= 75) {
        newTier = 'Silver';
      } else {
        newTier = 'Bronze';
      }

      await reward.update({ totalPoints: updatedPoints, tier: newTier });
  
      res.status(201).json({ message: "Total points and tier updated successfully" });
    } catch (error) {
      console.error("Server error:", error);
      next({ statusCode: 500, message: "Internal server error" });
    }
  });
  

module.exports = router