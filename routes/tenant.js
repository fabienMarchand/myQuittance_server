const { response } = require("express");
const express = require("express");
const router = express.Router();
const Tenant = require("../models/Tenant");

// Read all
router.get("/", async (req, res, next) => {
  try {
    const dbResult = await Tenant.find();
    res.status(200).json(dbResult);
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});

// Read One
router.get("/:id", async (req, res, next) => {
  try {
    const dbResult = await Tenant.find(
      { completeName: {$eq: req.params.id } }
    );
    res.status(200).json(dbResult);
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});

// Create
router.post("/", async (req, res, next) => {
  let newTenant = {
    ...req.body,
    userId: req.session.currentUser,
    completeName: `${req.body.lastName} - ${req.body.firstName}`,
  };

  try {
    const dbResult = await Tenant.create(newTenant);
    res.status(201).json(dbResult);
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});

//update
router.patch("/:id", async (req, res, next) => {
  try {
      const tenantValues = req.body;
      const dbResult = await Tenant.findByIdAndUpdate(req.params.id, tenantValues, {new: true});
        res.status(201).json(dbResult);
  } catch (error){
    res.status(500).next(error);
  }
});

// Delete 
router.delete("/:id", async(req, res, next) => {
    let tenantId = req.params.id;
    try {
        const dbResult = await Tenant.findByIdAndRemove(tenantId);
        const dbRes = await Tenant.find({userId: {$eq: req.session.currentUser}});
        res.status(201).json(dbRes);
    } catch(error) {
        res.status(500).json(error);
        next(error);
    }
});

module.exports = router;
