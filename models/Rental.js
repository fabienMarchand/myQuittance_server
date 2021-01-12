const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
  name: String,
  adress: String,
  rent: Number,
  provision: Number,
  fixedCost: Number,
  TVArate: Number,
  owner:String,
  tenant:String,
  socialSupport: Number,
  //ownerlink: {type: Schema.Types.ObjectId, ref:"Owner"},
  tenantLink: {type: Schema.Types.ObjectId, ref:"Tenant"},
  userId: {type:Schema.Types.ObjectId, ref: "User"}
});

const Rental = mongoose.model("Rental", rentalSchema);

module.exports = Rental;
