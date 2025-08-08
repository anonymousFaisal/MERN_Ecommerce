const BrandModel = require("../models/BrandModel");
const CategoryModel = require("../models/CategoryModel");
const ProductSliderModel = require("../models/ProductSliderModel");
const ProductModel = require("../models/ProductModel");
const ProductDetailsModel = require("../models/ProductDetailsModel");
const ReviewModel = require("../models/ReviewModel");
const mongoose = require("mongoose");
const { Types } = mongoose;

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

const ListByBrandService = async (brandID) => {
  try {
    if (!Types.ObjectId.isValid(brandID)) {
      return { status: "error", message: "Invalid brand ID" };
    }
    const BrandID = new Types.ObjectId(brandID);

    const MatchStage = { $match: { brandID: BrandID } };
    const JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    const UnwindBrandStage = { $unwind: { path: "$brand", preserveNullAndEmptyArrays: true } };
    const JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    const UnwindCategoryStage = { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } };

    const ProjectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        brandID: 0,
        categoryID: 0,
      },
    };
    const data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      UnwindBrandStage,
      JoinWithCategoryStage,
      UnwindCategoryStage,
      ProjectionStage,
    ]);
    return { status: "success", data };
  } catch (e) {
    return { status: "error", message: e.message };
  }
};

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
