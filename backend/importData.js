const mongoose = require("mongoose");
require("dotenv").config();
const fs = require("fs");

const Recipe = require("./models/Recipe");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Read JSON file
const rawData = JSON.parse(
  fs.readFileSync("./us_receipt_null.json", "utf-8")
);

// Convert object → array
const recipesArray = Object.values(rawData);


const importData = async () => {
  try {
    await Recipe.insertMany(recipesArray);
    console.log("Data Imported Successfully ✅");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

importData();