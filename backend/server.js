require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Recipe platform API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));