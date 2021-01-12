const express = require("express");
const router = express.Router();
const pdfGenerator = require('../config/pdf');
const Receipt = require("../models/Receipt");
const path = require("path");
const fs = require('fs');


router.get("/getPDF/:id", async (req, res, next) => {
  try {
    console.log("dans la route pour voir les pdfs");
    const dbResult = await Receipt.find({_id: {$eq: req.params.id}});
    // fs.readFile(path.join(__dirname, `/../pdf/${dbResult[0].nameId}.pdf`) , function async (err,data){
    //    res.contentType("application/pdf");
    //    console.log("avant envoie: ", data);
    //   })
   
    res.status(200).sendFile(path.join(__dirname, `/../pdf/${dbResult[0].nameId}.pdf`));
  //res.status(201).json(JSON.stringify(path.join(__dirname, `/../pdf/${dbResult[0].nameId}.pdf`)));
 } catch(error) {
     res.status(500).json(error);
     next(error);
 }
});


// Read all
router.get("/:id", async (req, res, next) => {
  try {

   const dbResult = await Receipt.find({_id: {$eq: req.params.id}});
    pdfGenerator.createInvoice(dbResult, `${dbResult[0].nameId}`);
    res.status(201).json("youhou");
 } catch(error) {
     res.status(500).json(error);
     next(error);
 }
});



module.exports = router; 