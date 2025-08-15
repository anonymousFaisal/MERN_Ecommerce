const FeatureModel = require("../models/FeatureModel");
const { Types } = require("mongoose");

const FeatureListServices = async () => {
  try {
    const featureList = await FeatureModel.find();
    return { status: "success", data: featureList };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

module.exports = { FeatureListServices };
