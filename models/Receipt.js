const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const receiptSchema = new Schema({
  nameId: String,
  name: String,
  startPeriod: Date,
  endPeriod: Date,
  rentalLink: {type: Schema.Types.ObjectId, ref:"Rental"},
  paymentDate: Date,
  adress: String,
  rent: Number,
  provision: Number,
  fixedCost: Number,
  socialSupport: Number,
  TVArate: Number,
  actualTenant: String,
  owner: String,
  golbalCost: Number,
  locationName: String,
  tenant: String,
  userId: {type:Schema.Types.ObjectId, ref: "User"},

 // ownerlink: {type: Schema.Types.ObjectId, ref:"Owner"},
 // tenantLink: {type: Schema.Types.ObjectId, ref:"Tenant"},
});

const Receipt = mongoose.model("Receipt", receiptSchema);

module.exports = Receipt;