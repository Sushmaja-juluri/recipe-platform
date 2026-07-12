import { useEffect, useState } from 'react';
import api from '../api/axios';
import RecipeCard from '../components/RecipeCard';

const CATEGORIES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Drink'];

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError('');
      try {
        const params = {};
        if (search) params.search = search;
        if (category !== 'All') params.category = category;
        const { data } = await api.get('/recipes', { params });
        setRecipes(data);
      } catch (err) {
        setError('Could not load recipes. Is the backend running?');
      } finally {
        setLoading(false);
      }
    };
    const timeout = setTimeout(fetchRecipes, 300);
    return () => clearTimeout(timeout);
  }, [search, category]);

  return (
    <div className="page">
      <section className="hero">
        <h1 className="hero__title">Every good kitchen keeps <em>a box like this.</em></h1>
        <p className="hero__subtitle">Recipes worth writing down — shared, saved, and passed along.</p>
      </section>

      <div className="toolbar">
        <input
          type="search"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input toolbar__search"
        />
        <div className="toolbar__tabs">
          {CATEGORIES.map((c) => (
            <button key={c} className={`tab ${category === c ? 'tab--active' : ''}`} onClick={() => setCategory(c)}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="empty-state">{error}</p>}
      {!error && loading && <p className="empty-state">Loading recipes…</p>}
      {!error && !loading && recipes.length === 0 && (
        <p className="empty-state">No recipes found. Be the first to add one.</p>
      )}

      <div className="recipe-grid">
        {recipes.map((r) => <RecipeCard key={r._id} recipe={r} />)}
      </div>
    </div>
  );
}