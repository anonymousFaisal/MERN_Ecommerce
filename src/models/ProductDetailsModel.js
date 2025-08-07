const mongoose = require("mongoose");

const productDetailsSchema = new mongoose.Schema(
  {
    img1: { type: String, required: true },
    img2: { type: String, required: true },
    img3: { type: String, required: true },
    img4: { type: String, required: true },
    img5: { type: String }, // optional
    img6: { type: String }, // optional
    img7: { type: String }, // optional
    img8: { type: String }, // optional
    des: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ProductDetailsModel = mongoose.model("productdetails", productDetailsSchema);

module.exports = ProductDetailsModel;
