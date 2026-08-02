const mongoose = require('mongoose');

const sampleRecipes = [
  {
    title: 'Classic Creamy Carbonara',
    description: 'Authentic Roman pasta carbonara made with guanciale, pecorino cheese, and fresh eggs.',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80',
    category: 'Dinner',
    cookTime: 25,
    servings: 4,
    ingredients: [
      { name: 'Spaghetti', amount: '400g' },
      { name: 'Guanciale or Pancetta', amount: '150g' },
      { name: 'Egg Yolks', amount: '4 large' },
      { name: 'Pecorino Romano Cheese', amount: '50g' },
      { name: 'Freshly Ground Black Pepper', amount: '1 tbsp' }
    ],
    steps: [
      'Bring a large pot of salted water to boil and cook spaghetti until al dente.',
      'In a skillet, crisp the diced guanciale over medium heat until golden.',
      'Whisk egg yolks and grated Pecorino Romano together in a bowl with plenty of black pepper.',
      'Combine warm pasta, crispy guanciale, and egg mixture off heat, tossing quickly to create a creamy sauce.',
      'Serve immediately with extra cheese on top.'
    ]
  },
  {
    title: 'Fluffy Blueberry Pancakes',
    description: 'Golden, extra fluffy pancakes bursting with fresh sweet blueberries.',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80',
    category: 'Breakfast',
    cookTime: 20,
    servings: 3,
    ingredients: [
      { name: 'All-purpose flour', amount: '2 cups' },
      { name: 'Baking powder', amount: '2 tsp' },
      { name: 'Milk', amount: '1.5 cups' },
      { name: 'Melted butter', amount: '3 tbsp' },
      { name: 'Fresh blueberries', amount: '1 cup' }
    ],
    steps: [
      'Mix dry ingredients in a bowl.',
      'Whisk milk, egg, and melted butter separately, then combine with dry ingredients until just mixed.',
      'Fold in blueberries gently.',
      'Cook ladlefuls of batter on a greased griddle until bubbles form, flip and cook until golden brown.',
      'Serve warm with pure maple syrup.'
    ]
  },
  {
    title: 'Matcha Iced Latte',
    description: 'Refreshing Japanese green tea latte sweetened with honey and chilled over ice.',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    category: 'Drink',
    cookTime: 5,
    servings: 1,
    ingredients: [
      { name: 'Ceremonial grade matcha powder', amount: '1.5 tsp' },
      { name: 'Warm water (175°F)', amount: '60 ml' },
      { name: 'Oat milk or Whole milk', amount: '180 ml' },
      { name: 'Honey or Maple syrup', amount: '1 tbsp' }
    ],
    steps: [
      'Sift matcha powder into a bowl.',
      'Add warm water and whisk vigorously with a bamboo whisk until frothy.',
      'Fill a tall glass with ice and pour in cold milk sweetened with honey.',
      'Pour the whisked matcha over the milk and enjoy!'
    ]
  }
];

const connectDB = async () => {
  let connected = false;
  const uriList = [
    process.env.MONGO_URI,
    'mongodb://127.0.0.1:27017/recipe-platform'
  ].filter(Boolean);

  for (const uri of uriList) {
    try {
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 12000,
        connectTimeoutMS: 12000
      });
      console.log(`✅ MongoDB connected successfully to host: ${conn.connection.host}`);
      connected = true;
      break;
    } catch (err) {
      console.warn(`⚠️ Connection to URI failed (${err.message}). Trying fallback...`);
    }
  }

  if (!connected) {
    console.log('🔄 Launching in-memory MongoDB fallback for instant local execution...');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const memoryUri = mongod.getUri();
      await mongoose.connect(memoryUri);
      console.log('✅ Connected to In-Memory MongoDB instance successfully!');
      connected = true;
    } catch (memErr) {
      console.error('❌ Failed to launch in-memory MongoDB:', memErr.message);
    }
  }

  // Seed sample data if DB is empty
  if (connected) {
    try {
      const Recipe = require('../models/Recipe');
      const User = require('../models/User');
      const count = await Recipe.countDocuments();
      if (count === 0) {
        let adminUser = await User.findOne({ email: 'chef@recipebox.com' });
        if (!adminUser) {
          adminUser = await User.create({
            name: 'Chef Auguste',
            email: 'chef@recipebox.com',
            password: 'password123'
          });
        }
        const recipesWithAuthor = sampleRecipes.map(r => ({ ...r, author: adminUser._id }));
        await Recipe.insertMany(recipesWithAuthor);
        console.log('🌱 Seeded default delicious recipes for initial demo!');
      }
    } catch (seedErr) {
      console.warn('Could not seed recipes:', seedErr.message);
    }
  }
};

module.exports = connectDB;