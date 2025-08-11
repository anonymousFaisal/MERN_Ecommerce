// middlewares/auth.js
const { DecodeToken } = require("../utility/TokenHelper");

module.exports = function auth(req, res, next) {
  let token =
    (req.get("authorization")?.startsWith("Bearer ")
      ? req.get("authorization").slice(7)
      : null) ||
    req.headers["token"] ||
    (req.cookies ? req.cookies["token"] : null);

  if (!token) {
    return res.status(401).json({ status: "fail", message: "Missing token" });
  }

  try {
    const decoded = DecodeToken(token); // throws on bad/expired

    const userId = decoded.userID ?? decoded.user_id ?? decoded.sub;
    if (!userId) {
      return res.status(401).json({ status: "fail", message: "Invalid token payload" });
    }

    // standard place to attach auth info
    req.user = { id: userId, email: decoded.email };

    // (If your controllers currently read from headers
    // req.headers.user_id = userId;
    // req.headers.email = decoded.email;

    return next();
  } catch (err) {
    const msg = err.name === "TokenExpiredError" ? "Token expired" : "Invalid token";
    return res.status(401).json({ status: "fail", message: msg });
  }
};
