const mongoose = require("mongoose");

const legalSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    type: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const LegalModel = mongoose.model("legals", legalSchema);

module.exports = LegalModel;
