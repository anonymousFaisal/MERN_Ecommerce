const { CartListService, SaveCartListService, UpdateCartListService, RemoveCartListService } = require("../services/CartListServices");
const asyncHandler = require("../utility/asyncHandler");

exports.CartList = asyncHandler(async (req, res) => {
  const userID = req.user?.id;
  if (!userID) {
    return res.status(401).json({ status: "fail", message: "Unauthorized" });
  }
  const result = await CartListService(userID);
  const code = result.status === "success" ? 200 : 400;
  return res.status(code).json(result);
});

exports.SaveCartList = asyncHandler(async (req, res) => {
  const userID = req.user?.id;
  if (!userID) {
    return res.status(401).json({ status: "fail", message: "Unauthorized" });
  }
  const payload = { ...req.body, userID };
  const result = await SaveCartListService(payload);
  const code = result.status === "success" ? 200 : 400;
  return res.status(code).json(result);
});

exports.UpdateCartList = asyncHandler(async (req, res) => {
  const userID = req.user?.id;
  if (!userID) {
    return res.status(401).json({ status: "fail", message: "Unauthorized" });
  }
  const cartID = req.params.cartID;
  const payload = { ...req.body, userID, cartID };
  const result = await UpdateCartListService(payload);
  const code = result.status === "success" ? 200 : 400;
  return res.status(code).json(result);
});

exports.RemoveCartList = asyncHandler(async (req, res) => {
  const userID = req.user?.id;
  if (!userID) {
    return res.status(401).json({ status: "fail", message: "Unauthorized" });
  }
  const payload = { ...req.body, userID };
  const result = await RemoveCartListService(payload);
  const code = result.status === "success" ? 200 : 400;
  return res.status(code).json(result);
});
