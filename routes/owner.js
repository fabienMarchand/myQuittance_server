const express = require("express");
const router = express.Router();
const Owner = require("../models/Owner");

// Read all
router.get("/", async (req, res, next) => {
    console.log(req.session.currentUser.id);
   try {
       const dbResult = await Owner.find();
       res.status(200).json(dbResult);
   } catch(error) {
       res.status(500).json(error);
   }
});

// Create
router.post("/", async(req, res, next) => {
    let newOwner =  { ...req.body, userId: req.session.currentUser, completeName: `${req.body.lastName} - ${req.body.firstName}`};
    try{
        const dbResult = await Owner.create(newOwner);
        res.status(201).json(dbResult);
    }catch(error) {
        res.status(500).json(error);
        next(error);
    }
});


//update
router.patch("/:id", async (req, res, next) => {
    try {
        const ownerValues = req.body;
        const dbResult = await Owner.findByIdAndUpdate(req.params.id, ownerValues, {new: true});
          res.status(201).json(dbResult);
    } catch (error){
      res.status(500).next(error);
    }
  });

// Delete 
router.delete("/:id", async(req, res, next) => {
    let ownerId = req.params.id;
    try {
        const dbResult = await Owner.findByIdAndRemove(ownerId);
        const dbRes = await Owner.find({userId: {$eq: req.session.currentUser}});
        res.status(201).json(dbRes);
    } catch(error) {
        res.status(500).json(error);
        next(error);
    }
});

module.exports = router;