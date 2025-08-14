const WishModel = require("../models/WishModel");
const { Types } = require("mongoose");

const WishListService = async (user_ID) => {
  try {
    if (!Types.ObjectId.isValid(user_ID)) {
      return { status: "error", message: "Invalid user id" };
    }
    const userID = new Types.ObjectId(user_ID);
    const matchStage = { $match: { userID } };
    const joinProductStage = {
      $lookup: { from: "products", localField: "productID", foreignField: "_id", as: "product" },
    };
    const unwindProductStage = { $unwind: { path: "$product" } };

    const joinBrandStage = {
      $lookup: { from: "brands", localField: "product.brandID", foreignField: "_id", as: "brand" },
    };
    const unwindBrandStage = { $unwind: { path: "$brand" } };

    const joinCategoryStage = {
      $lookup: { from: "categories", localField: "product.categoryID", foreignField: "_id", as: "category" },
    };
    const unwindCategoryStage = { $unwind: { path: "$category" } };

    const sortStage = { $sort: { createdAt: -1 } };

    const projectionStage = {
      $project: {
        _id: 0,
        userID: 0,
        productID: 0,
        createdAt: 0,
        updatedAt: 0,
        "product._id": 0,
        "product.brandID": 0,
        "product.categoryID": 0,
        "brand._id": 0,
        "category._id": 0,
      },
    };

    const data = await WishModel.aggregate([
      matchStage,
      joinProductStage,
      unwindProductStage,
      joinBrandStage,
      unwindBrandStage,
      joinCategoryStage,
      unwindCategoryStage,
      sortStage,
      projectionStage,
    ]);

    return { status: "success", data };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

const AddWishListService = async ({ userID, productID }) => {
  try {
    const result = await WishModel.updateOne({ userID, productID }, { $setOnInsert: { userID, productID } }, { upsert: true, runValidators: true });
    let message = "No changes made";
    if (result.upsertedId) {
      message = "Added to wishlist";
    } else if (result.matchedCount > 0) {
      message = "Already in wishlist";
    }
    return { status: "success", message };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

const RemoveWishListService = async ({ userID, productID }) => {
  try {
    const result = await WishModel.deleteOne({ userID, productID });
    let message = "No changes made";
    if (result.deletedCount > 0) {
      message = "Removed from wishlist";
    }
    return { status: "success", message };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

module.exports = {
  WishListService,
  AddWishListService,
  RemoveWishListService,
};
