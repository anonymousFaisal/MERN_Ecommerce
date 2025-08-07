const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true },
    description: { type: String, required: true },
    img:         { type: String, required: true }
  },
  {
    timestamps: true,  
    versionKey: false
  }
);

const FeatureModel = mongoose.model("features", featureSchema);

module.exports = FeatureModel;
