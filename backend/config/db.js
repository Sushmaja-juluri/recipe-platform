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
  },
  {
    title: 'Aloo Paratha',
    description: 'Whole wheat flatbread stuffed with spiced mashed potatoes, pan-fried until golden.',
    image: 'https://images.unsplash.com/photo-1580064003296-29deb3521370?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Breakfast',
    cookTime: 25,
    servings: 4,
    ingredients: [
      { name: 'Whole wheat flour', amount: '2 cups' },
      { name: 'Potatoes, boiled and mashed', amount: '3' },
      { name: 'Green chili, finely chopped', amount: '1' },
      { name: 'Cumin seeds', amount: '1 tsp' },
      { name: 'Ghee', amount: '2 tbsp' }
    ],
    steps: [
      'Knead dough with flour and water, rest 15 minutes.',
      'Mix mashed potatoes with chili, cumin, and salt.',
      'Stuff dough balls with potato mixture and roll flat.',
      'Cook on a hot tawa with ghee until golden on both sides.'
    ]
  },
  {
    title: 'Margherita Pizza',
    description: 'Classic Italian pizza with fresh mozzarella, tomatoes, and basil.',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Dinner',
    cookTime: 35,
    servings: 4,
    ingredients: [
      { name: 'Pizza dough ball', amount: '1' },
      { name: 'Tomato sauce', amount: '0.5 cup' },
      { name: 'Fresh mozzarella', amount: '200g' },
      { name: 'Fresh basil', amount: '6 leaves' },
      { name: 'Olive oil', amount: '2 tbsp' }
    ],
    steps: [
      'Roll out dough on a floured surface.',
      'Spread tomato sauce evenly.',
      'Add torn mozzarella pieces.',
      'Bake at 475°F for 12-15 minutes.',
      'Top with fresh basil and a drizzle of olive oil before serving.'
    ]
  },
  {
    title: 'Boba Tea',
    description: 'Sweet milk tea with chewy tapioca pearls, served ice cold.',
    image: 'https://images.unsplash.com/photo-1745883949374-baeba0ed57c3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Drink',
    cookTime: 20,
    servings: 2,
    ingredients: [
      { name: 'Tapioca pearls', amount: '0.5 cup' },
      { name: 'Black tea bags', amount: '2' },
      { name: 'Milk', amount: '1 cup' },
      { name: 'Brown sugar', amount: '3 tbsp' },
      { name: 'Ice', amount: '1 cup' }
    ],
    steps: [
      'Boil tapioca pearls according to package instructions.',
      'Brew tea and let cool.',
      'Combine tea, milk, and sugar, stir well.',
      'Add pearls and ice to glasses, pour tea mixture over.'
    ]
  },
  {
    title: 'Iced Latte',
    description: 'Smooth espresso poured over cold milk and ice.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Drink',
    cookTime: 5,
    servings: 1,
    ingredients: [
      { name: 'Espresso', amount: '2 shots' },
      { name: 'Milk', amount: '1 cup' },
      { name: 'Ice', amount: '1 cup' },
      { name: 'Simple syrup (optional)', amount: '1 tbsp' }
    ],
    steps: [
      'Fill a glass with ice.',
      'Pour milk over ice.',
      'Top with espresso shots and syrup if using.',
      'Stir gently and serve.'
    ]
  },
  {
    title: 'Hyderabadi Dum Biryani',
    description: 'Fragrant layered rice and marinated meat, slow-cooked to perfection.',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Dinner',
    cookTime: 90,
    servings: 6,
    ingredients: [
      { name: 'Basmati rice, soaked', amount: '500g' },
      { name: 'Chicken or mutton', amount: '750g' },
      { name: 'Yogurt', amount: '1 cup' },
      { name: 'Onions, fried crisp', amount: '2' },
      { name: 'Saffron, soaked in milk', amount: '1 tsp' },
      { name: 'Biryani masala', amount: '2 tbsp' }
    ],
    steps: [
      'Marinate meat in yogurt, masala, and half the fried onions for 2 hours.',
      'Par-boil rice with whole spices until 70% cooked.',
      'Layer marinated meat and rice alternately in a heavy pot.',
      'Top with saffron milk and remaining onions.',
      'Cover tightly and cook on dum (low heat) for 45 minutes.'
    ]
  },
  {
    title: 'Tteokbokki',
    description: 'Chewy Korean rice cakes simmered in a spicy-sweet gochujang sauce.',
    image: 'https://images.unsplash.com/photo-1730900737734-f159ca5640c3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Snack',
    cookTime: 20,
    servings: 3,
    ingredients: [
      { name: 'Rice cakes (tteok)', amount: '500g' },
      { name: 'Gochujang', amount: '3 tbsp' },
      { name: 'Soy sauce', amount: '1 tbsp' },
      { name: 'Sugar', amount: '1 tbsp' },
      { name: 'Anchovy or vegetable broth', amount: '2 cups' },
      { name: 'Boiled eggs (optional)', amount: '2' }
    ],
    steps: [
      'Soak rice cakes in warm water if hardened.',
      'Bring broth to a simmer, whisk in gochujang, soy sauce, and sugar.',
      'Add rice cakes and simmer until sauce thickens, about 10 minutes.',
      'Add boiled eggs and serve hot.'
    ]
  },
  {
    title: 'Sambar Idli',
    description: 'Steamed rice cakes served with a tangy, spiced lentil-vegetable stew.',
    image: 'https://images.unsplash.com/photo-1632104667384-06f58cb7ad44?q=80&w=860&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Breakfast',
    cookTime: 30,
    servings: 4,
    ingredients: [
      { name: 'Idlis, steamed', amount: '8' },
      { name: 'Toor dal, cooked', amount: '1 cup' },
      { name: 'Mixed vegetables (carrot, drumstick, tomato)', amount: '1 cup' },
      { name: 'Sambar powder', amount: '2 tbsp' },
      { name: 'Tamarind paste', amount: '1 tbsp' }
    ],
    steps: [
      'Cook vegetables with tamarind and sambar powder in water until soft.',
      'Add cooked dal, simmer 10 minutes.',
      'Temper with mustard seeds and curry leaves in oil, add to sambar.',
      'Serve hot over or alongside steamed idlis.'
    ]
  },
  {
    title: 'Mango Lassi',
    description: 'Refreshing Indian yogurt drink blended with sweet ripe mango.',
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Drink',
    cookTime: 5,
    servings: 2,
    ingredients: [
      { name: 'Ripe mango, chopped', amount: '1 cup' },
      { name: 'Plain yogurt', amount: '1 cup' },
      { name: 'Milk', amount: '0.5 cup' },
      { name: 'Sugar', amount: '2 tbsp' },
      { name: 'Cardamom powder', amount: '0.25 tsp' }
    ],
    steps: [
      'Blend all ingredients until smooth.',
      'Chill for 10 minutes.',
      'Serve cold, garnished with mint.'
    ]
  },
  {
    title: 'Samosa',
    description: 'Crispy fried pastry filled with spiced potatoes and peas.',
    image: 'https://plus.unsplash.com/premium_photo-1695297516676-04a259917c03?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Snack',
    cookTime: 40,
    servings: 6,
    ingredients: [
      { name: 'All-purpose flour', amount: '2 cups' },
      { name: 'Potatoes, boiled and cubed', amount: '3' },
      { name: 'Green peas', amount: '0.5 cup' },
      { name: 'Garam masala', amount: '1 tsp' },
      { name: 'Oil for deep frying', amount: 'as needed' }
    ],
    steps: [
      'Make a stiff dough with flour, oil, and water.',
      'Sauté potatoes and peas with garam masala and salt.',
      'Roll dough into circles, cut in half, and shape into cones.',
      'Fill with potato mixture, seal edges, and deep fry until golden.'
    ]
  },
  {
    title: 'Classic Burger',
    description: 'Juicy grilled beef patty with cheese, lettuce, and all the fixings.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=999&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Lunch',
    cookTime: 20,
    servings: 2,
    ingredients: [
      { name: 'Beef patties', amount: '2' },
      { name: 'Burger buns', amount: '2' },
      { name: 'Cheddar cheese', amount: '2 slices' },
      { name: 'Lettuce', amount: '2 leaves' },
      { name: 'Tomato, sliced', amount: '1' },
      { name: 'Burger sauce', amount: '2 tbsp' }
    ],
    steps: [
      'Season and grill patties until desired doneness.',
      'Top patties with cheese to melt slightly.',
      'Toast buns lightly.',
      'Assemble with sauce, lettuce, tomato, and patty.'
    ]
  },
  {
    title: 'Pav Bhaji',
    description: 'Spiced mashed vegetable curry served with buttered soft rolls.',
    image: 'https://images.unsplash.com/photo-1753357303396-704b5abe8945?q=80&w=884&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Dinner',
    cookTime: 35,
    servings: 4,
    ingredients: [
      { name: 'Potatoes, boiled', amount: '4' },
      { name: 'Mixed vegetables (peas, carrots, cauliflower)', amount: '1 cup' },
      { name: 'Onions, chopped', amount: '2' },
      { name: 'Pav bhaji masala', amount: '3 tbsp' },
      { name: 'Pav (soft rolls)', amount: '8' },
      { name: 'Butter', amount: '3 tbsp' }
    ],
    steps: [
      'Sauté onions until soft, add masala.',
      'Add boiled vegetables, mash roughly while cooking.',
      'Simmer with a little water until thick.',
      'Toast pav with butter, serve alongside bhaji.'
    ]
  },
  {
    title: 'Butter Chicken',
    description: 'Tender chicken simmered in a rich, creamy tomato-butter sauce.',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Dinner',
    cookTime: 45,
    servings: 4,
    ingredients: [
      { name: 'Chicken, boneless', amount: '500g' },
      { name: 'Tomato puree', amount: '1 cup' },
      { name: 'Cream', amount: '0.5 cup' },
      { name: 'Butter', amount: '2 tbsp' },
      { name: 'Garam masala', amount: '1 tsp' },
      { name: 'Ginger garlic paste', amount: '1 tbsp' }
    ],
    steps: [
      'Marinate chicken in yogurt and spices, grill or pan-sear until cooked.',
      'Sauté ginger garlic paste in butter, add tomato puree.',
      'Simmer sauce until thickened, add garam masala.',
      'Stir in cream and cooked chicken, simmer 10 minutes.'
    ]
  },
  {
    title: 'Ramen',
    description: 'Rich Japanese noodle soup with soft-boiled egg and savory broth.',
    image: 'https://plus.unsplash.com/premium_photo-1694547926001-f2151e4a476b?q=80&w=711&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Dinner',
    cookTime: 40,
    servings: 2,
    ingredients: [
      { name: 'Ramen noodles', amount: '2 packs' },
      { name: 'Chicken or pork broth', amount: '4 cups' },
      { name: 'Soy sauce', amount: '2 tbsp' },
      { name: 'Soft-boiled eggs', amount: '2' },
      { name: 'Green onion, sliced', amount: '1' }
    ],
    steps: [
      'Heat broth with soy sauce until simmering.',
      'Cook noodles separately according to package instructions.',
      'Divide noodles into bowls, pour hot broth over.',
      'Top with halved eggs and green onion.'
    ]
  },
  {
    title: 'Pad Thai',
    description: 'Stir-fried rice noodles with shrimp, egg, and tangy tamarind sauce.',
    image: 'https://images.unsplash.com/photo-1637806930600-37fa8892069d?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Dinner',
    cookTime: 25,
    servings: 2,
    ingredients: [
      { name: 'Rice noodles', amount: '200g' },
      { name: 'Shrimp', amount: '150g' },
      { name: 'Eggs', amount: '2' },
      { name: 'Tamarind paste', amount: '3 tbsp' },
      { name: 'Fish sauce', amount: '2 tbsp' },
      { name: 'Crushed peanuts', amount: '0.25 cup' }
    ],
    steps: [
      'Soak noodles in warm water until soft.',
      'Stir fry shrimp until pink, push aside, scramble eggs in the same pan.',
      'Add noodles, tamarind paste, and fish sauce, tossing to combine.',
      'Top with crushed peanuts and serve immediately.'
    ]
  },
  {
    title: 'Cheese Loaded Fries',
    description: 'Crispy golden fries piled high with melted cheese, bacon bits, and green onions.',
    image: 'https://images.unsplash.com/photo-1666304752980-678d5c35c911?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Snack',
    cookTime: 30,
    servings: 4,
    ingredients: [
      { name: 'Frozen fries', amount: '4 cups' },
      { name: 'Shredded cheddar cheese', amount: '1.5 cups' },
      { name: 'Bacon, cooked and crumbled', amount: '4 strips' },
      { name: 'Green onions, chopped', amount: '2 tbsp' },
      { name: 'Sour cream', amount: '0.25 cup' }
    ],
    steps: [
      'Bake fries according to package instructions until crispy.',
      'Spread fries evenly on a baking tray.',
      'Sprinkle shredded cheese and bacon bits over the fries.',
      'Return to oven for 3-5 minutes until cheese is fully melted.',
      'Top with green onions and a dollop of sour cream before serving.'
    ]
  },
  {
    title: 'Kimbap',
    description: 'Korean seaweed rice rolls filled with vegetables, egg, and savory beef, sliced into bite-sized pieces.',
    image: 'https://images.unsplash.com/photo-1656428254987-45d97432714b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Lunch',
    cookTime: 40,
    servings: 3,
    ingredients: [
      { name: 'Dried seaweed (gim)', amount: '4 sheets' },
      { name: 'Cooked short-grain rice', amount: '3 cups' },
      { name: 'Sesame oil', amount: '1 tbsp' },
      { name: 'Eggs, beaten and fried into a thin sheet', amount: '2' },
      { name: 'Carrot, julienned and sautéed', amount: '1' },
      { name: 'Cucumber, julienned', amount: '1' },
      { name: 'Beef bulgogi, cooked', amount: '150g' },
      { name: 'Pickled radish strips (danmuji)', amount: '2' }
    ],
    steps: [
      'Season warm rice with sesame oil and a pinch of salt, let cool slightly.',
      'Lay a seaweed sheet on a bamboo mat, shiny side down.',
      'Spread a thin layer of rice evenly over the seaweed, leaving a small border at the top.',
      'Arrange egg, carrot, cucumber, beef, and pickled radish in a line across the center.',
      'Roll tightly using the bamboo mat, sealing the edge with a little water.',
      'Slice into bite-sized pieces with a sharp knife and serve.'
    ]
  },
  {
    title: 'Chocolate Chip Cookies',
    description: 'Classic soft-baked cookies with crispy edges and melty chocolate chips.',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Dessert',
    cookTime: 25,
    servings: 12,
    ingredients: [
      { name: 'All-purpose flour', amount: '2 cups' },
      { name: 'Butter, softened', amount: '1 cup' },
      { name: 'Brown sugar', amount: '0.75 cup' },
      { name: 'White sugar', amount: '0.5 cup' },
      { name: 'Large eggs', amount: '2' },
      { name: 'Chocolate chips', amount: '2 cups' }
    ],
    steps: [
      'Cream butter and sugars together until fluffy.',
      'Beat in eggs one at a time.',
      'Mix in flour and baking soda until combined.',
      'Fold in chocolate chips.',
      'Scoop onto tray and bake at 350°F for 10-12 minutes.'
    ]
  },
  {
    title: 'Vegetable Stir Fry',
    description: 'Quick, colorful stir-fried vegetables in a savory garlic-soy sauce.',
    image: 'https://images.unsplash.com/photo-1722290680497-389e0f684e05?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Dinner',
    cookTime: 15,
    servings: 3,
    ingredients: [
      { name: 'Broccoli florets', amount: '2 cups' },
      { name: 'Red bell pepper, sliced', amount: '1' },
      { name: 'Carrots, sliced', amount: '1 cup' },
      { name: 'Soy sauce', amount: '3 tbsp' },
      { name: 'Garlic, minced', amount: '2 cloves' }
    ],
    steps: [
      'Heat oil in a wok over high heat.',
      'Sauté garlic until fragrant.',
      'Add vegetables and stir fry for 5-6 minutes.',
      'Add soy sauce, toss well, and serve over rice.'
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