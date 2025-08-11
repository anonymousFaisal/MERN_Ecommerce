const jwt = require("jsonwebtoken");

exports.EncodeToken = (email, userID) => {
  const Key = process.env.JWT_SECRET_KEY;
  const Expiration = process.env.JWT_EXPIRATION;
  const Payload = {
    email: email,
    userID: userID,
  };
  return jwt.sign(Payload, Key, { expiresIn: Expiration });
};

exports.DecodeToken = (token) => {
  try {
    const Key = process.env.JWT_SECRET_KEY;
    return jwt.verify(token, Key);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
