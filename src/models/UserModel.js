const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    otp: { type: String },
    otpExpires: { type: Date, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
