const { UserOTPService, VerifyOTPService, SaveProfileService, ReadProfileService } = require("../services/UserServices");

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
        httpOnly: false, // set true for security
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

exports.UserLogout = async (req, res) => {
  try {
    const cookieOption = {
      expires: new Date(Date.now() - 24 * 60 * 60 * 1000), // past date
      httpOnly: false, // set true for security
    };
    res.cookie("token", "", cookieOption);

    return res.status(200).json({ status: "success", message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

exports.CreateProfile = async (req, res) => {
  try {
    const userID = req.user?.id;
    if (!userID) {
      return res.status(401).json({ status: "fail", message: "Unauthorized" });
    }

    // Put trusted fields last so they cannot be overridden
    const payload = { ...req.body, userID };

    const result = await SaveProfileService(payload);
    const code = result.status === "success" ? 200 : 400;
    return res.status(code).json(result);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

exports.UpdateProfile = exports.CreateProfile; // same behavior (upsert)

exports.ReadProfile = async (req, res) => {
  try {
    const userID = req.user?.id;
    if (!userID) {
      return res.status(401).json({ status: "fail", message: "Unauthorized" });
    }

    const result = await ReadProfileService(userID);
    const code = result.status === "success" ? 200 : 400;
    return res.status(code).json(result);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
