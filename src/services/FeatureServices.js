const FeatureModel = require("../models/FeatureModel");
const LegalModel = require("../models/LegalModel");
const { Types } = require("mongoose");

const FeatureListServices = async () => {
  try {
    const featureList = await FeatureModel.find();
    return { status: "success", data: featureList };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

const LegalDetailService = async (type) => {
  try {
    const legalDetail = await LegalModel.findOne({ type });

    if (!legalDetail || legalDetail.length === 0) {
      return { status: "error", message: "No matching records found" };
    }

    return { status: "success", data: legalDetail };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

module.exports = { FeatureListServices, LegalDetailService };
