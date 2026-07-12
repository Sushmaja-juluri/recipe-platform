const express = require('express');
const Recipe = require('../models/Recipe');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    const query = {};
    if (search) query.title = { $regex: search, $options: 'i' };
    if (category) query.category = category;

    const recipes = await Recipe.find(query).populate('author', 'name').sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch recipes', error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('author', 'name');
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch recipe', error: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { title, description, image, category, cookTime, servings, ingredients, steps } = req.body;
    if (!title || !description || !cookTime || !servings || !ingredients?.length || !steps?.length) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    const recipe = await Recipe.create({
      title, description, image, category, cookTime, servings, ingredients, steps,
      author: req.user.id,
    });
    const populated = await recipe.populate('author', 'name');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create recipe', error: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    if (recipe.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only edit your own recipes' });
    }

    Object.assign(recipe, req.body);
    await recipe.save();
    const populated = await recipe.populate('author', 'name');
    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update recipe', error: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    if (recipe.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only delete your own recipes' });
    }

    await recipe.deleteOne();
    res.json({ message: 'Recipe deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete recipe', error: err.message });
  }
});

module.exports = router;