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
  CreateReviewService,
  ListByFilterService,
} = require("../services/ProductServices");
const asyncHandler = require("../utility/asyncHandler");

// Controller functions for product-related operations
// These functions handle incoming requests, call the appropriate service functions,
// and return structured responses to the client

// Get the list of brands, categories, and product sliders
exports.ProductBrandList = asyncHandler(async (req, res) => {
  const result = await BrandListService();
  const statusCode = result.status === "success" ? 200 : 500;
  return res.status(statusCode).json(result);
});

exports.ProductCategoryList = asyncHandler(async (req, res) => {
  const result = await CategoryListService();
  const statusCode = result.status === "success" ? 200 : 500;
  return res.status(statusCode).json(result);
});

exports.ProductSliderList = asyncHandler(async (req, res) => {
  const result = await SliderListService();
  const statusCode = result.status === "success" ? 200 : 500;
  return res.status(statusCode).json(result);
});

// Get the list of products by brand, category, and remarks
exports.ProductListByBrand = asyncHandler(async (req, res) => {
  const { BrandID } = req.params;
  const result = await ListByBrandService(BrandID);
  const statusCode = result.status === "success" ? 200 : 400;
  return res.status(statusCode).json(result);
});

exports.ProductListByCategory = asyncHandler(async (req, res) => {
  const { CategoryID } = req.params;
  const result = await ListByCategoryService(CategoryID);
  const statusCode = result.status === "success" ? 200 : 400;
  return res.status(statusCode).json(result);
});

exports.ProductListByRemark = asyncHandler(async (req, res) => {
  const { Remark } = req.params;
  const result = await ListByRemarkService(Remark);
  const statusCode = result.status === "success" ? 200 : 400;
  return res.status(statusCode).json(result);
});

// Get the list of products by similar category and search keyword
exports.ProductListBySimilar = asyncHandler(async (req, res) => {
  const { CategoryID } = req.params;
  const result = await ListBySimilarService(CategoryID);
  const statusCode = result.status === "success" ? 200 : 400;
  return res.status(statusCode).json(result);
});

exports.ProductListBySearch = asyncHandler(async (req, res) => {
  const { Keyword } = req.params;
  const result = await ListBySearchService(Keyword);
  const statusCode = result.status === "success" ? 200 : 400;
  return res.status(statusCode).json(result);
});

exports.ProductListByFilter = asyncHandler(async (req, res) => {
  const filter = req.body;
  const result = await ListByFilterService(filter);
  const statusCode = result.status === "success" ? 200 : 400;
  return res.status(statusCode).json(result);
});

// Get product details and reviews
exports.ProductDetails = asyncHandler(async (req, res) => {
  const { ProductID } = req.params;
  const result = await DetailsService(ProductID);
  const statusCode = result.status === "success" ? 200 : 400;
  return res.status(statusCode).json(result);
});

exports.ProductReviewList = asyncHandler(async (req, res) => {
  const { ProductID } = req.params;
  const result = await ReviewListService(ProductID);
  const statusCode = result.status === "success" ? 200 : 400;
  return res.status(statusCode).json(result);
});

exports.ProductCreateReview = asyncHandler(async (req, res) => {
  const review = req.body;
  const userID = req.user?.id;
  if (!userID) {
    return res.status(401).json({ status: "fail", message: "Unauthorized" });
  }
  const result = await CreateReviewService({ userID, ...review });
  const statusCode = result.status === "success" ? 200 : 400;
  return res.status(statusCode).json(result);
});
