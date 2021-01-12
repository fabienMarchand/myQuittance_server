const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
  email: String,
  lastName: String,
  futherInfo: String,
  firstName: String,
  completeName: String,
  gender: {type:String, enum:["Masculin", "Feminin"]},
  city: String,
  esignature: String,
  userId: {type:Schema.Types.ObjectId, ref: "User"}
});

const Owner = mongoose.model("Owner", ownerSchema);

module.exports = Owner;