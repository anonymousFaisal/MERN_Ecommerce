const { WishListService, SaveWishListService, RemoveWishListService } = require("../services/WishListServices");
const asyncHandler = require("../utility/asyncHandler");

exports.Wishlist = asyncHandler(async (req, res) => {
  const userID = req.user?.id;
  if (!userID) {
    return res.status(401).json({ status: "fail", message: "Unauthorized" });
  }
  const result = await WishListService(userID);
  const code = result.status === "success" ? 200 : 400;
  return res.status(code).json(result);
});

exports.SaveWishList = asyncHandler(async (req, res) => {
  const userID = req.user?.id;
  if (!userID) {
    return res.status(401).json({ status: "fail", message: "Unauthorized" });
  }
  const payload = { ...req.body, userID };
  const result = await SaveWishListService(payload);
  const code = result.status === "success" ? 200 : 400;
  return res.status(code).json(result);
});

exports.RemoveWishList = asyncHandler(async (req, res) => {
  const userID = req.user?.id;
  if (!userID) {
    return res.status(401).json({ status: "fail", message: "Unauthorized" });
  }
  const payload = { ...req.body, userID };
  const result = await RemoveWishListService(payload);
  const code = result.status === "success" ? 200 : 400;
  return res.status(code).json(result);
});
