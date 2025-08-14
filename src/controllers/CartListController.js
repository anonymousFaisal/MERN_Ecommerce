const { CartListService, SaveCartListService, UpdateCartListService, RemoveCartListService } = require("../services/CartListServices");

exports.CartList = async (req, res) => {
  try {
    const userID = req.user?.id;
    if (!userID) {
      return res.status(401).json({ status: "fail", message: "Unauthorized" });
    }
    const result = await CartListService(userID);
    const code = result.status === "success" ? 200 : 400;
    return res.status(code).json(result);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

exports.SaveCartList = async (req, res) => {
  try {
    const userID = req.user?.id;
    if (!userID) {
      return res.status(401).json({ status: "fail", message: "Unauthorized" });
    }
    const payload = { ...req.body, userID };
    const result = await SaveCartListService(payload);
    const code = result.status === "success" ? 200 : 400;
    return res.status(code).json(result);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

exports.UpdateCartList = async (req, res) => {
  try {
    const userID = req.user?.id;
    if (!userID) {
      return res.status(401).json({ status: "fail", message: "Unauthorized" });
    }
    const cartID = req.params.cartID;
    const payload = { ...req.body, userID, cartID };
    const result = await UpdateCartListService(payload);
    const code = result.status === "success" ? 200 : 400;
    return res.status(code).json(result);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

exports.RemoveCartList = async (req, res) => {
  try {
    const userID = req.user?.id;
    if (!userID) {
      return res.status(401).json({ status: "fail", message: "Unauthorized" });
    }
    const payload = { ...req.body, userID };
    const result = await RemoveCartListService(payload);
    const code = result.status === "success" ? 200 : 400;
    return res.status(code).json(result);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
