require("dotenv").config();

const config = {
    port: process.env.PORT || 5000,
    mongoURI: process.env.MONGODB_URI,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS,
    environment: process.env.NODE_ENV || "development"
};

module.exports = config;
