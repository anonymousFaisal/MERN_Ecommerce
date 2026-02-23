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
    const EmailSubject = "Verification Code - MERN E-commerce";
    const EmailText = `Your verification code is: ${code}. This code will expire in 5 minutes.`;

    // Premium HTML Template
    const EmailHTML = `
      <div style="font-family: 'Inter', system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background-color: #ffffff; border: 1px solid #f0f0f0; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #0f172a; font-size: 24px; font-weight: 800; margin: 0; letter-spacing: -0.025em;">MERN E-COMMERCE</h1>
        </div>
        
        <div style="margin-bottom: 32px; text-align: center;">
          <h2 style="color: #334155; font-size: 18px; font-weight: 600; margin-bottom: 12px;">Verify your email</h2>
          <p style="color: #64748b; font-size: 16px; line-height: 24px; margin: 0;">Use the verification code below to complete your login. This code is valid for <strong>5 minutes</strong>.</p>
        </div>

        <div style="background-color: #f8fafc; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 32px;">
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 36px; font-weight: 700; letter-spacing: 0.25em; color: #2563eb;">${code}</span>
        </div>

        <div style="border-top: 1px solid #f1f5f9; padding-top: 24px;">
          <p style="color: #94a3b8; font-size: 14px; line-height: 20px; margin: 0; text-align: center;">
            If you didn't request this code, you can safely ignore this email. Someone probably entered your email address by mistake.
          </p>
        </div>

        <div style="margin-top: 40px; text-align: center;">
          <p style="color: #cbd5e1; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} MERN E-commerce Solution. All rights reserved.</p>
        </div>
      </div>
    `;

    // send email
    const mail = await EmailSent(email, EmailText, EmailSubject, EmailHTML);
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
