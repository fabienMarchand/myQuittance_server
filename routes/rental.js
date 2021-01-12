const express = require("express");
const router = express.Router();
const Rental = require("../models/Rental");

// Read all
router.get("/", async (req, res, next) => {
   try {
       const dbResult = await Rental.find();
       res.status(200).json(dbResult);
   } catch(error) {
       res.status(500).json(error);
   }
});

// Create
router.post("/", async(req, res, next) => {
    let newRental = { ...req.body, userId: req.session.currentUser};   
    try{
        const dbResult = await Rental.create(newRental);
        res.status(201).json(dbResult);
    }catch(error) {
        res.status(500).json(error);
        next(error);
    }
});

//update
router.patch("/:id", async(req, res, next) => {
    try {
        const rentalValues = req.body;
        const dbResult = await Rental.findByIdAndUpdate(req.params.id, rentalValues, {new: true});
          res.status(201).json(dbResult);
    } catch(error) {
        res.status(500).json(error);
        next(error);
    }
});

// Delete 
router.delete("/:id", async(req, res, next) => {
    let rentalId = req.params.id; 
    try {
        const dbResult = await Rental.findByIdAndRemove(rentalId);
        const dbRes = await Rental.find({userId: {$eq: req.session.currentUser}});
        res.status(201).json(dbRes);
    } catch(error) {
        res.status(500).json(error);
        next(error);
    }
});

module.exports = router;
