const CartModel = require("../models/CartModel");
const { Types } = require("mongoose");

const CartListService = async (user_id) => {
  try {
    const userID = new Types.ObjectId(user_id);
    let matchStage = { $match: { userID } };
    let JoinWithProductStage = { $lookup: { from: "products", localField: "productID", foreignField: "_id", as: "product" } };
    let UnwindProductStage = { $unwind: { path: "$product" } };
    let JoinWithBrandStage = { $lookup: { from: "brands", localField: "product.brandID", foreignField: "_id", as: "brand" } };
    let UnwindBrandStage = { $unwind: { path: "$brand" } };
    let JoinWithCategoryStage = { $lookup: { from: "categories", localField: "product.categoryID", foreignField: "_id", as: "category" } };
    let UnwindCategoryStage = { $unwind: { path: "$category" } };
    const ProjectionStage = {
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

    let result = await CartModel.aggregate([
      matchStage,
      JoinWithProductStage,
      UnwindProductStage,
      JoinWithBrandStage,
      UnwindBrandStage,
      JoinWithCategoryStage,
      UnwindCategoryStage,
      ProjectionStage,
    ]);

    return { status: "success", data: result };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

const SaveCartListService = async (payload) => {
  try {
    const cartList = await CartModel.create(payload);
    return { status: "success", message: "Cart list created successfully" };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

const UpdateCartListService = async (payload) => {
  try {
    const { cartID, userID } = payload;
    const result = await CartModel.updateOne({ _id: cartID, userID }, { $set: payload });
    let message = "No changes made";
    if (result.modifiedCount > 0) {
      message = "Cart list updated successfully";
    }
    return { status: "success", message };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

const RemoveCartListService = async (payload) => {
  const { _id, userID, productID } = payload;
  try {
    const result = await CartModel.deleteOne({ _id, userID, productID });
    let message = "No changes made";
    if (result.deletedCount > 0) {
      message = "Removed from cart list";
    }
    return { status: "success", message };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

module.exports = {
  CartListService,
  SaveCartListService,
  UpdateCartListService,
  RemoveCartListService,
};
