const mongoose = require("mongoose");
const { EmailSent } = require("../utility/EmailHelper");
const UserModel = require("../models/UserModel");
const ProfileModel = require("../models/ProfileModel");
const { EncodeToken } = require("../utility/TokenHelper");
const { Types } = mongoose;

const UserOTPService = async (req) => {
  try {
    // accept email from route param OR body
    const email = (req.params?.email || req.body?.email || "").trim().toLowerCase();
    if (!email) {
      return { status: "fail", message: "Email is required" };
    }
    // 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const EmailSubject = "E-mail Verification";
    const EmailText = `Your verification code is: ${code}`;
    // send email first
    const mail = await EmailSent(email, EmailText, EmailSubject);
    if (!mail || mail.status !== "success") {
      return { status: "fail", message: "Failed to send OTP email" };
    }
    // save OTP with 5 min expiration
    const expires = Date.now() + 5 * 60 * 1000; // 5 minutes
    await UserModel.updateOne({ email }, { $set: { otp: code, otpExpires: expires } }, { upsert: true });

    return { status: "success", message: "OTP sent successfully" };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

const VerifyOTPService = async ({ email, otp }) => {
  try {
    const user = await UserModel.findOne({ email, otp });

    if (!user) {
      return { status: "fail", message: "Invalid OTP" };
    }

    if (user.otpExpires && user.otpExpires < Date.now()) {
      return { status: "fail", message: "OTP has expired" };
    }

    // Clear OTP and Expiry
    await UserModel.updateOne({ _id: user._id }, { $unset: { otp: "", otpExpires: "" } });

    const token = EncodeToken(user.email, user._id.toString());
    return { status: "success", message: "OTP verified", token };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

const SaveProfileService = async ({ userID, ...editable }) => {
  try {
    const result = await ProfileModel.updateOne({ userID }, { $set: editable, $setOnInsert: { userID } }, { upsert: true, runValidators: true });

    let message = "No changes made";
    if (result.upsertedId) message = "Profile created successfully";
    else if (result.modifiedCount > 0) message = "Profile updated successfully";

    return { status: "success", message };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

const ReadProfileService = async (userID) => {
  try {
    const profile = await ProfileModel.findOne({ userID }).lean().exec();
    return { status: "success", profile };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

module.exports = {
  UserOTPService,
  VerifyOTPService,
  SaveProfileService,
  ReadProfileService,
};
