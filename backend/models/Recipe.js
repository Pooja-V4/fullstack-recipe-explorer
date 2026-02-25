const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  Contient: String,
  Country_State: String,
  cuisine: String,
  title: String,
  URL: String,
  rating: Number,
  total_time: Number,
  prep_time: Number,
  cook_time: Number,
  description: String,
  ingredients: [String],
  instructions: [String],
  nutrients: Object,
  serves: String
});

module.exports = mongoose.model("Recipe", recipeSchema);