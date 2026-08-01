import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';

const CATEGORIES = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Drink'];

export default function CreateRecipe() {
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('Dinner');
  const [cookTime, setCookTime] = useState('');
  const [servings, setServings] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', amount: '' }]);
  const [steps, setSteps] = useState(['']);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(isEditMode);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEditMode) return;
    const fetchRecipe = async () => {
      try {
        const { data } = await api.get(`/recipes/${id}`);
        setTitle(data.title);
        setDescription(data.description);
        setImage(data.image || '');
        setCategory(data.category);
        setCookTime(String(data.cookTime));
        setServings(String(data.servings));
        setIngredients(data.ingredients.length ? data.ingredients : [{ name: '', amount: '' }]);
        setSteps(data.steps.length ? data.steps : ['']);
      } catch (err) {
        setError('Failed to load recipe for editing.');
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id, isEditMode]);

  const updateIngredient = (index, field, value) => {
    const next = [...ingredients];
    next[index][field] = value;
    setIngredients(next);
  };

  const removeIngredient = (index) => {
    if (ingredients.length <= 1) return;
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateStep = (index, value) => {
    const next = [...steps];
    next[index] = value;
    setSteps(next);
  };

  const removeStep = (index) => {
    if (steps.length <= 1) return;
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const cleanIngredients = ingredients.filter((i) => i.name.trim() && i.amount.trim());
    const cleanSteps = steps.map((s) => s.trim()).filter(Boolean);

    if (!cleanIngredients.length || !cleanSteps.length) {
      setError('Add at least one ingredient and one step.');
      return;
    }

    const payload = {
      title, description, image, category,
      cookTime: Number(cookTime),
      servings: Number(servings),
      ingredients: cleanIngredients,
      steps: cleanSteps,
    };

    setSubmitting(true);
    try {
      if (isEditMode) {
        const { data } = await api.put(`/recipes/${id}`, payload);
        navigate(`/recipes/${data._id}`);
      } else {
        const { data } = await api.post('/recipes', payload);
        navigate(`/recipes/${data._id}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save recipe');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="empty-state">Loading…</p>;

  return (
    <div className="page page--narrow">
      <h1 className="page__title">{isEditMode ? 'Edit your card' : 'Write a new card'}</h1>
      <form onSubmit={handleSubmit} className="form">
        <label className="form__label">
          Title
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label className="form__label">
          Description
          <textarea className="input" rows={2} value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <label className="form__label">
          Image URL (optional)
          <input className="input" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://…" />
        </label>
        <div className="form__row form__row--3">
          <label className="form__label">
            Category
            <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <label className="form__label">
            Cook time (min)
            <input type="number" min="1" className="input" value={cookTime} onChange={(e) => setCookTime(e.target.value)} required />
          </label>
          <label className="form__label">
            Servings
            <input type="number" min="1" className="input" value={servings} onChange={(e) => setServings(e.target.value)} required />
          </label>
        </div>

        <fieldset className="form__fieldset">
          <legend>Ingredients</legend>
          {ingredients.map((ing, i) => (
            <div className="form__dynamic-row" key={i}>
              <input className="input" placeholder="Amount (e.g. 2 cups)" value={ing.amount} onChange={(e) => updateIngredient(i, 'amount', e.target.value)} />
              <input className="input" placeholder="Ingredient (e.g. flour)" value={ing.name} onChange={(e) => updateIngredient(i, 'name', e.target.value)} />
              {ingredients.length > 1 && (
                <button type="button" className="btn btn--icon-danger" onClick={() => removeIngredient(i)} title="Remove ingredient">✕</button>
              )}
            </div>
          ))}
          <button type="button" className="btn btn--ghost" onClick={() => setIngredients([...ingredients, { name: '', amount: '' }])}>
            + Add ingredient
          </button>
        </fieldset>

        <fieldset className="form__fieldset">
          <legend>Steps</legend>
          {steps.map((step, i) => (
            <div className="form__dynamic-row" key={i}>
              <span className="form__step-number mono">{i + 1}</span>
              <textarea className="input" rows={2} value={step} onChange={(e) => updateStep(i, e.target.value)} placeholder={`Step ${i + 1}`} />
              {steps.length > 1 && (
                <button type="button" className="btn btn--icon-danger" onClick={() => removeStep(i)} title="Remove step">✕</button>
              )}
            </div>
          ))}
          <button type="button" className="btn btn--ghost" onClick={() => setSteps([...steps, ''])}>
            + Add step
          </button>
        </fieldset>

        {error && <p className="form__error">{error}</p>}
        <button type="submit" className="btn btn--accent btn--block" disabled={submitting}>
          {submitting ? 'Saving…' : isEditMode ? 'Update recipe' : 'Save recipe'}
        </button>
      </form>
    </div>
  );
}