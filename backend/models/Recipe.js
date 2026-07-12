const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    amount: { type: String, required: true },
  },
  { _id: false }
);

const RecipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: { type: String, default: '' },
    category: {
      type: String,
      enum: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Drink'],
      default: 'Dinner',
    },
    cookTime: { type: Number, required: true },
    servings: { type: Number, required: true },
    ingredients: { type: [IngredientSchema], required: true },
    steps: { type: [String], required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Recipe', RecipeSchema);