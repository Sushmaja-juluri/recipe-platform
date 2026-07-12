import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipes/${recipe._id}`} className="recipe-card">
      <div className="recipe-card__pin" aria-hidden="true" />
      <div className="recipe-card__image-wrap">
        {recipe.image ? (
          <img src={recipe.image} alt={recipe.title} className="recipe-card__image" />
        ) : (
          <div className="recipe-card__image recipe-card__image--placeholder">
            {recipe.title.charAt(0)}
          </div>
        )}
      </div>
      <div className="recipe-card__body">
        <span className="recipe-card__category">{recipe.category}</span>
        <h3 className="recipe-card__title">{recipe.title}</h3>
        <p className="recipe-card__desc">{recipe.description}</p>
        <div className="recipe-card__meta">
          <span className="mono">{recipe.cookTime} min</span>
          <span className="mono">{recipe.servings} servings</span>
        </div>
      </div>
    </Link>
  );
}