const {FeatureListServices} = require("../services/FeatureServices");


exports.FeatureList = async (req, res) => {
    try {
        const featureList = await FeatureListServices();
        return res.status(200).json(featureList);
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
};