// Basic Imports
require("dotenv").config();
const express = require("express");
const router = require("./src/routes/api");
const app = express();

// Security Middlewares
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const path = require("path");
const { xss } = require("express-xss-sanitizer");
const cookieParser = require("cookie-parser");

// Database Import
const connectDB = require("./src/config/db");

// Security Middlewares
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3000,
});
app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(mongoSanitize());
app.use(hpp());
app.use(xss());
// Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// MongoDB Database Connection
// Connect to Database
connectDB();

// Routes
app.use("/api/v1", router);

// Serve Static Files
app.use(express.static("client/dist"));

// Catch-All Route for Single Page Application
app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

// Undefined Routes Handling
app.use((req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  error.statusCode = 404;
  next(error);
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    status: err.statusCode === 404 ? "fail" : "error",
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

module.exports = app;
