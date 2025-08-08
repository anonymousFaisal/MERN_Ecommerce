const {
  BrandListService,
  CategoryListService,
  SliderListService,
  ListByBrandService,
  ListByCategoryService,
  ListBySimilarService,
  ListBySearchService,
  ListByRemarkService,
  DetailsService,
  ReviewListService,
} = require("../services/ProductServices");

// Controller functions for product-related operations
// These functions handle incoming requests, call the appropriate service functions,
// and return structured responses to the client

// Get the list of brands
exports.ProductBrandList = async (req, res) => {
  try {
    const result = await BrandListService();
    const statusCode = result.status === "success" ? 200 : 500;
    return res.status(statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get the list of categories
exports.ProductCategoryList = async (req, res) => {
  try {
    const result = await CategoryListService();
    const statusCode = result.status === "success" ? 200 : 500;
    return res.status(statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get the list of product sliders
exports.ProductSliderList = async (req, res) => {
  try {
    const result = await SliderListService();
    const statusCode = result.status === "success" ? 200 : 500;
    return res.status(statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get the list of products by brand
exports.ProductListByBrand = async (req, res) => {
  try {
    const { BrandID } = req.params;
    const result = await ListByBrandService(BrandID);
    const statusCode = result.status === "success" ? 200 : 400;
    return res.status(statusCode).json(result);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

// Get the list of products by category
exports.ProductListByCategory = async (req, res) => {
  try {
    const categoryId = req.params.CategoryID;
    const result = await ListByCategoryService(categoryId);
    const statusCode = result.status === "success" ? 200 : 500;
    return res.status(statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.ProductListBySimilar = async (req, res) => {};

exports.ProductListBySearch = async (req, res) => {};

exports.ProductListByRemark = async (req, res) => {};

exports.ProductDetails = async (req, res) => {};

exports.ProductReviewList = async (req, res) => {};

exports.ProductReviewList = async (req, res) => {};
