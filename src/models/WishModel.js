const mongoose = require("mongoose");

const wishSchema = new mongoose.Schema(
  {
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    }
  },
  {
    timestamps: true,  
    versionKey: false
  }
);

const WishModel = mongoose.model("wishes", wishSchema);

module.exports = WishModel;
