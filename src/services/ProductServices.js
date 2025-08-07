const BrandModel = require("../models/BrandModel");
const CategoryModel = require("../models/CategoryModel");
const ProductSliderModel = require("../models/ProductSliderModel");
const ProductModel = require("../models/ProductModel");
const ProductDetailsModel = require("../models/ProductDetailsModel");
const ReviewModel = require("../models/ReviewModel");

// Service functions for product-related operations
// These functions interact with the database models to fetch or manipulate data
// They return structured responses that can be used by controllers

// Service to get the list of brands
const BrandListService = async () => {
  try {
    const brands = await BrandModel.find({});
    return { status: "success", data: brands };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

// Service to get the list of categories
const CategoryListService = async () => {
  try {
    const categories = await CategoryModel.find({});
    return { status: "success", data: categories };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

// Service to get the list of product sliders
const SliderListService = async () => {
  try {
    const sliders = await ProductSliderModel.find({});
    return { status: "success", data: sliders };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

const ListByBrandService = async () => {};

const ListByCategoryService = async () => {};

const ListBySimilarService = async () => {};

const ListBySearchService = async () => {};

const ListByRemarkService = async () => {};

const DetailsService = async () => {};

const ReviewListService = async () => {};

module.exports = {
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
};
