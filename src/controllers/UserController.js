const { UserOTPService, VerifyOTPService } = require("../services/UserServices");

exports.UserOTP = async (req, res) => {
  try {
    const result = await UserOTPService(req);
    const code = result.status === "success" ? 200 : 400;
    return res.status(code).json(result);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
exports.VerifyOTP = async (req, res) => {
  try {
    const email = (req.params.email || req.body.email || "").trim().toLowerCase();
    const otp = String(req.params.otp || req.body.otp || "").trim();

    if (!email || !otp) {
      return res.status(400).json({ status: "fail", message: "Email and OTP are required" });
    }

    const result = await VerifyOTPService({ email, otp });

    if (result.status === "success") {
      // Cookies Option
      let cookieOption = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
        httpOnly: false // set true for security
      };

      // Set Cookie with token
      res.cookie("token", result.token, cookieOption);
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};


exports.UserLogout = async (req, res) => {};

exports.CreateProfile = async (req, res) => {};

exports.UpdateProfile = async (req, res) => {};

exports.ReadProfile = async (req, res) => {};
