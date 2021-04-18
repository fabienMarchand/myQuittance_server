const express = require("express");
const router = express.Router();
const Receipt = require("../models/Receipt");

// Read all
router.get("/", async (req, res, next) => {
    try {
       const dbResult = await Receipt.find({userId: {$eq: req.session.currentUser}});
       res.status(200).json(dbResult);
   } catch(error) {
       res.status(500).json(error);
       next(error);
   }
});

// Create
router.post("/", async(req, res, next) => {
    const {rent, provision,  fixedCost, socialSupport} = req.body;
    const golbalCost = (rent + provision + fixedCost - socialSupport);
    if (!golbalCost) golbalCost = 0;
    if (!socialSupport) socialSupport = 0;
    let newReceipt =  { ...req.body, golbalCost,userId: req.session.currentUser};
    try{
        
        const dbResult = await Receipt.create(newReceipt);
        res.status(201).json(dbResult);
    }catch(error) {
        res.status(500).json(error);
        next(error);
    }
});

//update
router.patch("/:id", async (req, res, next) => {
    try {
        const receiptValues = req.body;
        const dbResult = await Receipt.findByIdAndUpdate(req.params.id, receiptValues, {new: true});
          res.status(201).json(dbResult);
    } catch (error){
      res.status(500).json(error);
      next(error);
    }
  });

// Delete 
router.delete("/:id", async(req, res, next) => {
    let receiptId = req.params.id;
    try {
        const dbResult = await Receipt.findByIdAndRemove(receiptId);
        const dbRes = await Receipt.find({userId: {$eq: req.session.currentUser}});
        res.status(201).json(dbRes);
    } catch(error) {
        res.status(500).json(error);
        next(error);
    }
});

module.exports = router;