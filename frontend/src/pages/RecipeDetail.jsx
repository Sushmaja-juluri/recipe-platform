import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const { data } = await api.get(`/recipes/${id}`);
        setRecipe(data);
      } catch (err) {
        setError('Recipe not found.');
      }
    };
    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this recipe? This cannot be undone.')) return;
    try {
      await api.delete(`/recipes/${id}`);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete recipe');
    }
  };

  if (error) return <p className="empty-state">{error}</p>;
  if (!recipe) return <p className="empty-state">Loading…</p>;

  const isOwner = user && ((recipe.author?._id || recipe.author)?.toString() === user.id);

  return (
    <div className="page page--narrow">
      <Link to="/" className="back-link">← Back to the box</Link>
      <article className="recipe-detail">
        {recipe.image && <img src={recipe.image} alt={recipe.title} className="recipe-detail__image" />}
        <span className="recipe-card__category">{recipe.category}</span>
        <h1 className="recipe-detail__title">{recipe.title}</h1>
        <p className="recipe-detail__desc">{recipe.description}</p>
        <div className="recipe-detail__meta">
          <span className="mono">{recipe.cookTime} min</span>
          <span className="mono">{recipe.servings} servings</span>
          <span>by {recipe.author?.name || 'Unknown'}</span>
        </div>
        {isOwner && <button className="btn btn--ghost btn--danger" onClick={handleDelete}>Delete recipe</button>}
        <div className="recipe-detail__columns">
          <section>
            <h2 className="recipe-detail__heading">Ingredients</h2>
            <ul className="ingredient-list">
              {recipe.ingredients.map((ing, i) => (
                <li key={i}>
                  <span className="mono ingredient-list__amount">{ing.amount}</span>
                  <span>{ing.name}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="recipe-detail__heading">Steps</h2>
            <ol className="step-list">
              {recipe.steps.map((step, i) => <li key={i}>{step}</li>)}
            </ol>
          </section>
        </div>
      </article>
    </div>
  );
}