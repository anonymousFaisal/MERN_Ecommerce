const {FeatureListServices, LegalDetailService} = require("../services/FeatureServices");


exports.FeatureList = async (req, res) => {
    try {
        const featureList = await FeatureListServices();
        return res.status(200).json(featureList);
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
};

exports.LegalDetails = async (req, res) => {
    try {
        const type = (req.params.type);
        const legalDetail = await LegalDetailService( type );
        return res.status(200).json(legalDetail);
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
};