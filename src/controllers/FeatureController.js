const { FeatureListServices, LegalDetailService } = require("../services/FeatureServices");
const asyncHandler = require("../utility/asyncHandler");

exports.FeatureList = asyncHandler(async (req, res) => {
  const featureList = await FeatureListServices();
  return res.status(200).json(featureList);
});

exports.LegalDetails = asyncHandler(async (req, res) => {
  const type = req.params.type;
  const legalDetail = await LegalDetailService(type);
  return res.status(200).json(legalDetail);
});
