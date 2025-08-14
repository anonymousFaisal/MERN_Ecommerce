const { WishListService, SaveWishListService, RemoveWishListService } = require("../services/WishListServices");

exports.Wishlist = async (req, res) => {
  try {
    const userID = req.user?.id;
    if (!userID) {
      return res.status(401).json({ status: "fail", message: "Unauthorized" });
    }
    const result = await WishListService(userID);
    const code = result.status === "success" ? 200 : 400;
    return res.status(code).json(result);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

exports.SaveWishList = async (req, res) => {
  try {
    const userID = req.user?.id;
    if (!userID) {
      return res.status(401).json({ status: "fail", message: "Unauthorized" });
    }
    const payload = { ...req.body, userID };
    const result = await SaveWishListService(payload);
    const code = result.status === "success" ? 200 : 400;
    return res.status(code).json(result);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

exports.RemoveWishList = async (req, res) => {
  try {
    const userID = req.user?.id;
    if (!userID) {
      return res.status(401).json({ status: "fail", message: "Unauthorized" });
    }
    const payload = { ...req.body, userID };
    const result = await RemoveWishListService(payload);
    const code = result.status === "success" ? 200 : 400;
    return res.status(code).json(result);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
