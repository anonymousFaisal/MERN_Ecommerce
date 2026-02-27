const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: __dirname + "/.env" });

// Import Models
const FeatureModel = require("./src/models/FeatureModel");
const CategoryModel = require("./src/models/CategoryModel");
const BrandModel = require("./src/models/BrandModel");
const ProductModel = require("./src/models/ProductModel");
const ProductDetailsModel = require("./src/models/ProductDetailsModel");
const ProductSliderModel = require("./src/models/ProductSliderModel");

// Helpers
const loadData = (filename) => {
  const rawData = fs.readFileSync(path.join(__dirname, "dummy-data", filename), "utf8");
  const parsed = JSON.parse(rawData);
  if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
    return Object.values(parsed)[0];
  }
  return parsed;
};

const cleanItem = (item) => {
  const clean = { ...item };
  if (clean._id && clean._id.$oid) {
    clean._id = new mongoose.Types.ObjectId(clean._id.$oid);
  }
  delete clean.createdAt;
  delete clean.updatedAt;
  return clean;
};

// Image mappings
const categoryImages = {
  Laptop: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop",
  Mobile: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2080&auto=format&fit=crop",
  Headphone: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
  Smartwatch: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
  Television: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=2070&auto=format&fit=crop",
  Camera: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop",
  Printer: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=2070&auto=format&fit=crop",
  Keyboard: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=2071&auto=format&fit=crop",
  Mouse: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=2067&auto=format&fit=crop",
  Speaker: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=2070&auto=format&fit=crop",
};

const brandImages = {
  Dell: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=2000&auto=format&fit=crop", // Dell laptop
  Microsoft: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2000&auto=format&fit=crop",
  MSI: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?q=80&w=2000&auto=format&fit=crop",
  Apple: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2000&auto=format&fit=crop", // Apple laptop
  HP: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=2000&auto=format&fit=crop",
  Asus: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=2000&auto=format&fit=crop",
  Samsung: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=2000&auto=format&fit=crop", // Samsung phone
  Acer: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=2000&auto=format&fit=crop",
  Lenovo: "https://images.unsplash.com/photo-1588702545922-e300f80bb116?q=80&w=2000&auto=format&fit=crop",
  Razer: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2000&auto=format&fit=crop", // Razer setup
};

// Generic product images based on category ID mappings (will resolve later during processing)
const fallbackProductImage = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop";

const featureImages = [
  "https://cdn-icons-png.flaticon.com/512/3249/3249033.png", // 24/7 Support
  "https://cdn-icons-png.flaticon.com/512/272/272340.png", // Secure Payment
  "https://cdn-icons-png.flaticon.com/512/2769/2769930.png", // Free Delivery
  "https://cdn-icons-png.flaticon.com/512/1008/1008061.png", // 90 Days Return
];

const seedData = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    console.log("Connecting to MongoDB...");
    await mongoose.connect(uri);
    console.log("Connected successfully!");

    // --- 1. Features ---
    const featuresData = loadData("features.json").map((item, index) => {
      const clean = cleanItem(item);
      clean.img = featureImages[index] || featureImages[0];
      return clean;
    });
    await FeatureModel.deleteMany({});
    await FeatureModel.insertMany(featuresData);
    console.log(`Seeded Features: ${featuresData.length} items`);

    // --- 2. Categories ---
    // Make a map of old string ID to category name to easily assign product images later
    const categoryIdToName = {};

    const categoriesData = loadData("categories.json").map((item) => {
      const clean = cleanItem(item);
      categoryIdToName[clean._id.toString()] = clean.categoryName;
      clean.categoryImg = categoryImages[clean.categoryName] || fallbackProductImage;
      return clean;
    });
    await CategoryModel.deleteMany({});
    await CategoryModel.insertMany(categoriesData);
    console.log(`Seeded Categories: ${categoriesData.length} items`);

    // --- 3. Brands ---
    const brandsData = loadData("brands.json").map((item) => {
      const clean = cleanItem(item);
      clean.brandImg = brandImages[clean.brandName] || fallbackProductImage;
      return clean;
    });
    await BrandModel.deleteMany({});
    await BrandModel.insertMany(brandsData);
    console.log(`Seeded Brands: ${brandsData.length} items`);

    // --- 4. Dynamic Products Generation ---
    const generatedProducts = [];
    const generatedProductDetails = [];

    // Helper to generate a random integer
    const rndInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
    // Helpers for dynamic arrays
    const remarksOptions = ["new", "trending", "popular", "top", "special", "flash"];

    const productTemplates = [
      { cat: "Laptop", brands: ["Apple", "Dell", "HP", "Asus", "Acer", "Lenovo", "MSI", "Microsoft"], titleSuffix: "Gen Laptop" },
      { cat: "Mobile", brands: ["Apple", "Samsung", "Asus"], titleSuffix: "Smartphone 5G" },
      { cat: "Headphone", brands: ["Apple", "Samsung", "Lenovo", "Razer", "Sony"], titleSuffix: "Wireless Headset" },
      { cat: "Smartwatch", brands: ["Apple", "Samsung", "Lenovo"], titleSuffix: "Smart Fitness Watch" },
      { cat: "Television", brands: ["Samsung", "Acer"], titleSuffix: "4K Cinema Smart TV" },
      { cat: "Camera", brands: ["Samsung", "Sony", "Nikon"], titleSuffix: "DSLR HD Vlog Camera" },
      { cat: "Printer", brands: ["HP", "Dell", "Lenovo"], titleSuffix: "LaserJet Printer" },
      { cat: "Keyboard", brands: ["Razer", "Dell", "HP", "Asus", "MSI"], titleSuffix: "Mechanical Gaming Keyboard" },
      { cat: "Mouse", brands: ["Razer", "Dell", "Lenovo", "Asus", "MSI", "Acer"], titleSuffix: "RGB Optical Mouse" },
      { cat: "Speaker", brands: ["Samsung", "Apple", "Dell", "Lenovo"], titleSuffix: "Bluetooth Surround Speaker" },
    ];

    let sliderProducts = [];

    for (let template of productTemplates) {
      const targetCategoryData = categoriesData.find((c) => c.categoryName === template.cat);
      if (!targetCategoryData) continue;

      const catID = targetCategoryData._id;

      let categoryProductCount = 0;

      for (let i = 0; i < 6; i++) {
        const brandName = template.brands[rndInt(0, template.brands.length - 1)];
        const targetBrandData = brandsData.find((b) => b.brandName === brandName) || brandsData[0];
        const brandID = targetBrandData._id;

        const pID = new mongoose.Types.ObjectId();

        const price = rndInt(100, 3000) * 10;
        const discountPrice = price - rndInt(1, 4) * 10;

        // Use realistic matching Unsplash image based on the category of this product
        const productImage = categoryImages[template.cat] || fallbackProductImage;

        const newProduct = {
          _id: pID,
          title: `${brandName} ${template.titleSuffix} V${rndInt(1, 9)}`,
          shortDes: `Experience the best of ${template.cat} technology with this modern ${brandName} device. A must-have for enthusiasts.`,
          price: price.toString(),
          discount: Math.random() > 0.5,
          discountPrice: discountPrice.toString(),
          image: productImage,
          star: rndInt(3, 5).toString(),
          stock: true,
          remark: remarksOptions[rndInt(0, remarksOptions.length - 1)],
          categoryID: catID,
          brandID: brandID,
        };

        generatedProducts.push(newProduct);

        // --- 5. Dynamic Product Details Generation ---
        const genericDetailImg = "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=2000&auto=format&fit=crop";

        const newProductDetail = {
          img1: productImage,
          img2: genericDetailImg,
          img3: genericDetailImg,
          img4: genericDetailImg,
          img5: genericDetailImg,
          img6: genericDetailImg,
          img7: genericDetailImg,
          img8: genericDetailImg,
          des: `<h3>Product Specification</h3><p>An amazing ${template.cat} from ${brandName}. Features cutting edge tech.</p><ul><li>High Quality</li><li>Reliable</li><li>Long Lasting</li></ul>`,
          color: "Red,Black,Silver",
          size: "Regular,Large",
          productID: pID,
        };

        generatedProductDetails.push(newProductDetail);

        categoryProductCount++;

        // Add 3 cool products to sliders
        if (sliderProducts.length < 3 && newProduct.discount && newProduct.star === "5") {
          sliderProducts.push(newProduct);
        }
      }
    }

    await ProductModel.deleteMany({});
    await ProductModel.insertMany(generatedProducts);
    console.log(`Seeded Products: ${generatedProducts.length} diverse dynamic items`);

    await ProductDetailsModel.deleteMany({});
    await ProductDetailsModel.insertMany(generatedProductDetails);
    console.log(`Seeded ProductDetails: ${generatedProductDetails.length} items`);

    // --- 6. Product Sliders ---
    if (sliderProducts.length < 3) {
      sliderProducts = generatedProducts.slice(0, 3);
    }

    const productSlidersData = sliderProducts.map((prod) => {
      return {
        title: prod.title,
        des: "Special Promotional Offer! Check out our new stock right now and grab the discounts.",
        price: `Discount Price: ${prod.discountPrice} BDT`,
        image: prod.image, // use corresponding product image for slider
        productID: prod._id,
      };
    });

    await ProductSliderModel.deleteMany({});
    await ProductSliderModel.insertMany(productSlidersData);
    console.log(`Seeded ProductSliders: ${productSlidersData.length} items`);

    console.log("All dummy data dynamically seeded successfully with new variations!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
