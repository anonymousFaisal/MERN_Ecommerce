const express = require("express");
const ProductController = require("../controllers/ProductController");
const UserController = require("../controllers/UserController");
const router = express.Router();

// Product Routes
router.get("/ProductBrandList", ProductController.ProductBrandList);
router.get("/ProductCategoryList", ProductController.ProductCategoryList);
router.get("/ProductSliderList", ProductController.ProductSliderList);
router.get("/ProductListByBrand/:BrandID", ProductController.ProductListByBrand);
router.get("/ProductListByCategory/:CategoryID", ProductController.ProductListByCategory);
router.get("/ProductListBySimilar/:CategoryID", ProductController.ProductListBySimilar);
router.get("/ProductListBySearch/:Keyword", ProductController.ProductListBySearch);
router.get("/ProductListByRemark/:Remark", ProductController.ProductListByRemark);
router.get("/ProductDetails/:ProductID", ProductController.ProductDetails);
router.get("/ProductReviewList/:ProductID", ProductController.ProductReviewList);


// User Routes
router.get("/UserOTP/:email", UserController.UserOTP);
router.get("/VerifyOTP/:email/:otp", UserController.VerifyOTP);

module.exports = router;
