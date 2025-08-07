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

exports.ProductCategoryList = async (req, res) => {};

exports.ProductSliderList = async (req, res) => {};

exports.ProductListByBrand = async (req, res) => {};

exports.ProductListByCategory = async (req, res) => {};

exports.ProductListBySimilar = async (req, res) => {};

exports.ProductListBySearch = async (req, res) => {};

exports.ProductListByRemark = async (req, res) => {};

exports.ProductDetails = async (req, res) => {};

exports.ProductReviewList = async (req, res) => {};

exports.ProductReviewList = async (req, res) => {};
