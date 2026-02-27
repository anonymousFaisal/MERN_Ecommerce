const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: __dirname + "/.env" });

const featureSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

const FeatureModel = mongoose.model("features", featureSchema);

const seedFeatures = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    console.log("Connecting to MongoDB...");
    await mongoose.connect(uri);
    console.log("Connected successfully!");

    const rawData = fs.readFileSync(path.join(__dirname, "dummy-data", "features.json"), "utf8");
    const featuresData = JSON.parse(rawData);

    // Some dummy-data exports have wrappers, let's extract the array if needed
    let dataToInsert = featuresData;
    if (featuresData && typeof featuresData === "object" && !Array.isArray(featuresData)) {
      dataToInsert = Object.values(featuresData)[0];
    }

    // Clean up strict MongoDB types
    dataToInsert = dataToInsert.map((item) => {
      const cleanItem = { ...item };
      delete cleanItem._id;
      delete cleanItem.createdAt;
      delete cleanItem.updatedAt;
      return cleanItem;
    });

    // Clear existing
    await FeatureModel.deleteMany({});
    console.log("Cleared features collection.");

    await FeatureModel.insertMany(dataToInsert);
    console.log("Successfully seeded Features collection with", dataToInsert.length, "items.");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedFeatures();
