const Recipe = require("../models/Recipe");

exports.getRecipes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const sort = req.query.sort || "";
    const cuisine = req.query.cuisine || "";

    const skip = (page - 1) * limit;

    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { ingredients: { $regex: search, $options: "i" } }
      ];
    }

    if (cuisine) {
      query.cuisine = cuisine;
    }

    let sortOption = {};
    if (sort) {
      sortOption[sort] = -1;
    }

    const total = await Recipe.countDocuments(query);

    const recipes = await Recipe.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: recipes
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};