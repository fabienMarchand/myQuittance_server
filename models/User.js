const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  lastName: String,
  firstName: String,
  adress: String,
  phoneNumber: Number,
  receipts_list: [{type: Schema.Types.ObjectId, ref: "Receipt"}],
});

const User = mongoose.model("User", userSchema);

module.exports = User;