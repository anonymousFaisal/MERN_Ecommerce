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

// Get the list of brands, categories, and product sliders
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

// Get the list of products by brand, category, and remarks
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
exports.ProductListByCategory = async (req, res) => {
  try {
    const { CategoryID } = req.params;
    const result = await ListByCategoryService(CategoryID);
    const statusCode = result.status === "success" ? 200 : 400;
    return res.status(statusCode).json(result);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
exports.ProductListByRemark = async (req, res) => {
  try {
    const { Remark } = req.params;
    const result = await ListByRemarkService(Remark);
    const statusCode = result.status === "success" ? 200 : 400;
    return res.status(statusCode).json(result);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
// Get the list of products by similar category and search keyword
exports.ProductListBySimilar = async (req, res) => {
  try {
    const { CategoryID } = req.params;
    const result = await ListBySimilarService(CategoryID);
    const statusCode = result.status === "success" ? 200 : 400;
    return res.status(statusCode).json(result);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
exports.ProductListBySearch = async (req, res) => {
  try {
    const { Keyword } = req.params;
    const result = await ListBySearchService(Keyword);
    const statusCode = result.status === "success" ? 200 : 400;
    return res.status(statusCode).json(result);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};


// Get product details and reviews
exports.ProductDetails = async (req, res) => {
  try {
    const { ProductID } = req.params;
    const result = await DetailsService(ProductID);
    const statusCode = result.status === "success" ? 200 : 400;
    return res.status(statusCode).json(result);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
exports.ProductReviewList = async (req, res) => {
  try {
    const { ProductID } = req.params;
    const result = await ReviewListService(ProductID);
    const statusCode = result.status === "success" ? 200 : 400;
    return res.status(statusCode).json(result);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
