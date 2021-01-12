const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tenantSchema = new Schema({
  email: String,
  lastName: String,
  firstName: String,
  socialSupport: Number,
  completeName: String,
  userId: {type:Schema.Types.ObjectId, ref: "User"}
});

const Tenant = mongoose.model("Tenant", tenantSchema);

module.exports = Tenant;