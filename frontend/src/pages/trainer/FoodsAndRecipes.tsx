import React, { useState } from 'react';
import {
  Search, Plus, Pin, Pencil, Trash2, X, UtensilsCrossed, Save,
} from 'lucide-react';
import '../../styles/TrainerPanel.css';

/* ── Types ── */
interface FoodPlan {
  id: string;
  title: string;
  assignedTo: string;
  status: 'Active' | 'Draft';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meals: string[];
  imageUrl: string;
}

interface Recipe {
  id: string;
  title: string;
  ingredientCount: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  instructions: string;
  imageUrl: string;
}

/* ── Sample Data ── */
const samplePlans: FoodPlan[] = [
  {
    id: '1', title: 'Clean Bulk Meal Plan', assignedTo: 'Michael Chen', status: 'Active',
    calories: 2800, protein: 180, carbs: 320, fat: 80,
    meals: ['Oatmeal + Egg Whites', 'Chicken & Rice Bowl', 'Protein Shake + Banana', 'Salmon & Sweet Potato', 'Greek Yogurt + Berries'],
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop',
  },
  {
    id: '2', title: 'Keto Diet Plan - Phase 2', assignedTo: 'James Wilson', status: 'Active',
    calories: 1900, protein: 120, carbs: 30, fat: 140,
    meals: ['Avocado Eggs Benedict', 'Grilled Chicken Caesar (no croutons)', 'Almond Butter Fat Bombs', 'Steak with Butter Veggies'],
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop',
  },
  {
    id: '3', title: 'Weight Loss Starter', assignedTo: '', status: 'Draft',
    calories: 1600, protein: 130, carbs: 160, fat: 50,
    meals: ['Smoothie Bowl', 'Turkey Wrap', 'Apple + Almond Butter', 'Grilled Fish & Veggies'],
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop',
  },
];

const sampleRecipes: Recipe[] = [
  {
    id: '1', title: 'High Protein Overnight Oats', ingredientCount: 6,
    calories: 450, protein: 35, carbs: 52, fat: 12,
    ingredients: ['Oats', 'Greek Yogurt', 'Protein Powder', 'Almond Milk', 'Chia Seeds', 'Blueberries'],
    instructions: 'Mix oats, yogurt, protein powder, and milk. Refrigerate overnight. Top with chia seeds and blueberries before serving.',
    imageUrl: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=600&h=400&fit=crop',
  },
  {
    id: '2', title: 'Grilled Chicken Power Bowl', ingredientCount: 6,
    calories: 620, protein: 52, carbs: 58, fat: 18,
    ingredients: ['Chicken Breast', 'Brown Rice', 'Broccoli', 'Sweet Corn', 'Avocado', 'Teriyaki Sauce'],
    instructions: 'Grill chicken with seasoning. Cook rice. Steam broccoli and corn. Assemble bowl with sliced avocado and drizzle teriyaki sauce.',
    imageUrl: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=600&h=400&fit=crop',
  },
  {
    id: '3', title: 'Salmon Avocado Toast', ingredientCount: 6,
    calories: 380, protein: 28, carbs: 30, fat: 16,
    ingredients: ['Whole Grain Bread', 'Smoked Salmon', 'Avocado', 'Cherry Tomatoes', 'Lemon Juice', 'Everything Seasoning'],
    instructions: 'Toast bread. Mash avocado with lemon juice. Spread on toast, layer salmon and tomatoes. Sprinkle seasoning.',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&h=400&fit=crop',
  },
];

const emptyPlanForm = { title: '', calories: 0, protein: 0, carbs: 0, fat: 0, imageUrl: '', meals: '' };
const emptyRecipeForm = { title: '', calories: 0, protein: 0, carbs: 0, fat: 0, imageUrl: '', ingredients: '', instructions: '' };

const FoodsAndRecipes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'plans' | 'recipes'>('plans');
  const [searchQuery, setSearchQuery] = useState('');

  /* Food Plans state */
  const [plans, setPlans] = useState<FoodPlan[]>(samplePlans);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<FoodPlan | null>(null);
  const [planForm, setPlanForm] = useState(emptyPlanForm);

  /* Recipes state */
  const [recipes, setRecipes] = useState<Recipe[]>(sampleRecipes);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [recipeForm, setRecipeForm] = useState(emptyRecipeForm);

  /* ── Plan CRUD ── */
  const openCreatePlan = () => {
    setEditingPlan(null);
    setPlanForm(emptyPlanForm);
    setShowPlanModal(true);
  };

  const openEditPlan = (plan: FoodPlan) => {
    setEditingPlan(plan);
    setPlanForm({
      title: plan.title, calories: plan.calories, protein: plan.protein,
      carbs: plan.carbs, fat: plan.fat, imageUrl: plan.imageUrl,
      meals: plan.meals.join('\n'),
    });
    setShowPlanModal(true);
  };

  const handleSavePlan = () => {
    const mealsArr = planForm.meals.split('\n').map(m => m.trim()).filter(Boolean);
    if (editingPlan) {
      setPlans(prev => prev.map(p => p.id === editingPlan.id ? {
        ...p, title: planForm.title, calories: Number(planForm.calories),
        protein: Number(planForm.protein), carbs: Number(planForm.carbs),
        fat: Number(planForm.fat), imageUrl: planForm.imageUrl, meals: mealsArr,
      } : p));
    } else {
      const newPlan: FoodPlan = {
        id: Date.now().toString(), title: planForm.title, assignedTo: '', status: 'Draft',
        calories: Number(planForm.calories), protein: Number(planForm.protein),
        carbs: Number(planForm.carbs), fat: Number(planForm.fat),
        imageUrl: planForm.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop',
        meals: mealsArr,
      };
      setPlans(prev => [...prev, newPlan]);
    }
    setShowPlanModal(false);
  };

  const deletePlan = (id: string) => setPlans(prev => prev.filter(p => p.id !== id));

  /* ── Recipe CRUD ── */
  const openCreateRecipe = () => {
    setEditingRecipe(null);
    setRecipeForm(emptyRecipeForm);
    setShowRecipeModal(true);
  };

  const openEditRecipe = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setRecipeForm({
      title: recipe.title, calories: recipe.calories, protein: recipe.protein,
      carbs: recipe.carbs, fat: recipe.fat, imageUrl: recipe.imageUrl,
      ingredients: recipe.ingredients.join('\n'), instructions: recipe.instructions,
    });
    setShowRecipeModal(true);
  };

  const handleSaveRecipe = () => {
    const ingredientsArr = recipeForm.ingredients.split('\n').map(i => i.trim()).filter(Boolean);
    if (editingRecipe) {
      setRecipes(prev => prev.map(r => r.id === editingRecipe.id ? {
        ...r, title: recipeForm.title, calories: Number(recipeForm.calories),
        protein: Number(recipeForm.protein), carbs: Number(recipeForm.carbs),
        fat: Number(recipeForm.fat), imageUrl: recipeForm.imageUrl,
        ingredients: ingredientsArr, ingredientCount: ingredientsArr.length,
        instructions: recipeForm.instructions,
      } : r));
    } else {
      const newRecipe: Recipe = {
        id: Date.now().toString(), title: recipeForm.title, ingredientCount: ingredientsArr.length,
        calories: Number(recipeForm.calories), protein: Number(recipeForm.protein),
        carbs: Number(recipeForm.carbs), fat: Number(recipeForm.fat),
        imageUrl: recipeForm.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop',
        ingredients: ingredientsArr, instructions: recipeForm.instructions,
      };
      setRecipes(prev => [...prev, newRecipe]);
    }
    setShowRecipeModal(false);
  };

  const deleteRecipe = (id: string) => setRecipes(prev => prev.filter(r => r.id !== id));

  /* ── Filtering ── */
  const filteredPlans = plans.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredRecipes = recipes.filter(r => r.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="trainer-content">
      {/* Page Header */}
      <div style={{ marginBottom: '8px' }}>
        <h1 style={{ fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>Foods & Recipes</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '2px 0 0' }}>Welcome back, Coach!</p>
      </div>

      {/* Tabs */}
      <div className="tp-tabs">
        <button className={`tp-tab ${activeTab === 'plans' ? 'active' : ''}`} onClick={() => { setActiveTab('plans'); setSearchQuery(''); }}>
          <UtensilsCrossed size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
          Food Plans
        </button>
        <button className={`tp-tab ${activeTab === 'recipes' ? 'active' : ''}`} onClick={() => { setActiveTab('recipes'); setSearchQuery(''); }}>
          <UtensilsCrossed size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
          Recipes
        </button>
      </div>

      {/* Controls */}
      <div className="tp-controls">
        <div className="tp-search-bar">
          <Search size={18} className="tp-search-icon" />
          <input
            type="text"
            placeholder={activeTab === 'plans' ? 'Search food plans...' : 'Search recipes...'}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="tp-btn tp-btn-primary" onClick={activeTab === 'plans' ? openCreatePlan : openCreateRecipe}>
          <Plus size={18} />
          {activeTab === 'plans' ? 'Create Food Plan' : 'Add Recipe'}
        </button>
      </div>

      {/* ═══ FOOD PLANS TAB ═══ */}
      {activeTab === 'plans' && (
        <div className="tp-food-grid">
          {filteredPlans.map((plan) => (
            <div key={plan.id} className="tp-food-card animate-fadeIn">
              <div className="tp-card-image">
                <img src={plan.imageUrl} alt={plan.title} />
              </div>
              <div className="tp-food-card-header">
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3>{plan.title}</h3>
                  <p>{plan.assignedTo ? `Assigned to ${plan.assignedTo}` : 'Unassigned'}</p>
                </div>
                <span className={`tp-badge ${plan.status === 'Active' ? 'success' : 'neutral'}`}>
                  {plan.status}
                </span>
              </div>

              <div className="tp-macros-row">
                <div className="tp-macro-item">
                  <span className="tp-macro-value">{plan.calories}</span>
                  <span className="tp-macro-label">CALORIES</span>
                </div>
                <div className="tp-macro-item">
                  <span className="tp-macro-value">{plan.protein}g</span>
                  <span className="tp-macro-label">PROTEIN</span>
                </div>
                <div className="tp-macro-item">
                  <span className="tp-macro-value">{plan.carbs}g</span>
                  <span className="tp-macro-label">CARBS</span>
                </div>
                <div className="tp-macro-item">
                  <span className="tp-macro-value">{plan.fat}g</span>
                  <span className="tp-macro-label">FAT</span>
                </div>
              </div>

              <div className="tp-meals-list">
                {plan.meals.map((meal, i) => (
                  <div key={i} className="tp-meal-item">
                    <div className="tp-meal-icon" style={{ background: '#f0fdfa', color: '#0d9488' }}>
                      <UtensilsCrossed size={14} />
                    </div>
                    <span>{meal}</span>
                  </div>
                ))}
              </div>

              <div className="tp-food-actions">
                <button className="tp-btn-icon" title="Pin"><Pin size={16} /></button>
                <button className="tp-btn-icon" title="Edit" onClick={() => openEditPlan(plan)}><Pencil size={16} /></button>
                <button className="tp-btn-icon" style={{ color: '#dc2626' }} title="Delete" onClick={() => deletePlan(plan.id)}><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ═══ RECIPES TAB ═══ */}
      {activeTab === 'recipes' && (
        <div className="tp-food-grid">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="tp-food-card animate-fadeIn">
              <div className="tp-card-image">
                <img src={recipe.imageUrl} alt={recipe.title} />
              </div>
              <div className="tp-food-card-header">
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3>{recipe.title}</h3>
                  <p>{recipe.ingredientCount} ingredients</p>
                </div>
                <span className="tp-badge teal">Recipe</span>
              </div>

              <div className="tp-macros-row">
                <div className="tp-macro-item">
                  <span className="tp-macro-value">{recipe.calories}</span>
                  <span className="tp-macro-label">CAL</span>
                </div>
                <div className="tp-macro-item">
                  <span className="tp-macro-value">{recipe.protein}g</span>
                  <span className="tp-macro-label">PROTEIN</span>
                </div>
                <div className="tp-macro-item">
                  <span className="tp-macro-value">{recipe.carbs}g</span>
                  <span className="tp-macro-label">CARBS</span>
                </div>
                <div className="tp-macro-item">
                  <span className="tp-macro-value">{recipe.fat}g</span>
                  <span className="tp-macro-label">FAT</span>
                </div>
              </div>

              <div className="tp-recipe-content" style={{ marginBottom: 12 }}>
                <div style={{ marginBottom: 12 }}>
                  <h4 style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>INGREDIENTS</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {recipe.ingredients.map((ing, i) => (
                      <span key={i} style={{ padding: '4px 10px', background: '#f0fdfa', color: '#0d9488', borderRadius: 'var(--radius-full)', fontSize: '0.78rem', fontWeight: 600, border: '1px solid #ccfbf1' }}>
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>INSTRUCTIONS</h4>
                  <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{recipe.instructions}</p>
                </div>
              </div>

              <div className="tp-food-actions">
                <button className="tp-btn-icon" title="Edit" onClick={() => openEditRecipe(recipe)}><Pencil size={16} /></button>
                <button className="tp-btn-icon" style={{ color: '#dc2626' }} title="Delete" onClick={() => deleteRecipe(recipe.id)}><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ═══ CREATE/EDIT FOOD PLAN MODAL ═══ */}
      {showPlanModal && (
        <div className="tp-modal-overlay" onClick={() => setShowPlanModal(false)}>
          <div className="tp-modal" onClick={e => e.stopPropagation()}>
            <div className="tp-modal-header">
              <h2>{editingPlan ? 'Edit Food Plan' : 'Create Food Plan'}</h2>
              <button className="tp-modal-close" onClick={() => setShowPlanModal(false)}><X size={18} /></button>
            </div>
            <div className="tp-modal-body">
              <div className="tp-form-group">
                <label>Plan Title</label>
                <input type="text" placeholder="e.g. Clean Bulk Meal Plan" value={planForm.title} onChange={e => setPlanForm({ ...planForm, title: e.target.value })} />
              </div>
              <div className="tp-form-row">
                <div className="tp-form-group"><label>Calories</label><input type="number" value={planForm.calories} onChange={e => setPlanForm({ ...planForm, calories: Number(e.target.value) })} /></div>
                <div className="tp-form-group"><label>Protein (g)</label><input type="number" value={planForm.protein} onChange={e => setPlanForm({ ...planForm, protein: Number(e.target.value) })} /></div>
              </div>
              <div className="tp-form-row">
                <div className="tp-form-group"><label>Carbs (g)</label><input type="number" value={planForm.carbs} onChange={e => setPlanForm({ ...planForm, carbs: Number(e.target.value) })} /></div>
                <div className="tp-form-group"><label>Fat (g)</label><input type="number" value={planForm.fat} onChange={e => setPlanForm({ ...planForm, fat: Number(e.target.value) })} /></div>
              </div>
              <div className="tp-form-group">
                <label>Image URL</label>
                <input type="text" placeholder="https://images.unsplash.com/..." value={planForm.imageUrl} onChange={e => setPlanForm({ ...planForm, imageUrl: e.target.value })} />
              </div>
              <div className="tp-form-group">
                <label>Meals (one per line)</label>
                <textarea placeholder={'Oatmeal + Egg Whites\nChicken & Rice Bowl\nProtein Shake'} value={planForm.meals} onChange={e => setPlanForm({ ...planForm, meals: e.target.value })} rows={4} />
              </div>
            </div>
            <div className="tp-modal-footer">
              <button className="tp-btn tp-btn-secondary" onClick={() => setShowPlanModal(false)}>Cancel</button>
              <button className="tp-btn tp-btn-primary" onClick={handleSavePlan}>
                <Save size={16} />
                {editingPlan ? 'Save Changes' : 'Create Plan'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ CREATE/EDIT RECIPE MODAL ═══ */}
      {showRecipeModal && (
        <div className="tp-modal-overlay" onClick={() => setShowRecipeModal(false)}>
          <div className="tp-modal" onClick={e => e.stopPropagation()}>
            <div className="tp-modal-header">
              <h2>{editingRecipe ? 'Edit Recipe' : 'Create Recipe'}</h2>
              <button className="tp-modal-close" onClick={() => setShowRecipeModal(false)}><X size={18} /></button>
            </div>
            <div className="tp-modal-body">
              <div className="tp-form-group">
                <label>Recipe Title</label>
                <input type="text" placeholder="e.g. Protein Pancakes" value={recipeForm.title} onChange={e => setRecipeForm({ ...recipeForm, title: e.target.value })} />
              </div>
              <div className="tp-form-row">
                <div className="tp-form-group"><label>Calories</label><input type="number" value={recipeForm.calories} onChange={e => setRecipeForm({ ...recipeForm, calories: Number(e.target.value) })} /></div>
                <div className="tp-form-group"><label>Protein (g)</label><input type="number" value={recipeForm.protein} onChange={e => setRecipeForm({ ...recipeForm, protein: Number(e.target.value) })} /></div>
              </div>
              <div className="tp-form-row">
                <div className="tp-form-group"><label>Carbs (g)</label><input type="number" value={recipeForm.carbs} onChange={e => setRecipeForm({ ...recipeForm, carbs: Number(e.target.value) })} /></div>
                <div className="tp-form-group"><label>Fat (g)</label><input type="number" value={recipeForm.fat} onChange={e => setRecipeForm({ ...recipeForm, fat: Number(e.target.value) })} /></div>
              </div>
              <div className="tp-form-group">
                <label>Image URL</label>
                <input type="text" placeholder="https://images.unsplash.com/..." value={recipeForm.imageUrl} onChange={e => setRecipeForm({ ...recipeForm, imageUrl: e.target.value })} />
              </div>
              <div className="tp-form-group">
                <label>Ingredients (one per line)</label>
                <textarea placeholder={'Oats\nGreek Yogurt\nProtein Powder'} value={recipeForm.ingredients} onChange={e => setRecipeForm({ ...recipeForm, ingredients: e.target.value })} rows={4} />
              </div>
              <div className="tp-form-group">
                <label>Instructions</label>
                <textarea placeholder="Step-by-step instructions..." value={recipeForm.instructions} onChange={e => setRecipeForm({ ...recipeForm, instructions: e.target.value })} rows={3} />
              </div>
            </div>
            <div className="tp-modal-footer">
              <button className="tp-btn tp-btn-secondary" onClick={() => setShowRecipeModal(false)}>Cancel</button>
              <button className="tp-btn tp-btn-primary" onClick={handleSaveRecipe}>
                <Save size={16} />
                {editingRecipe ? 'Save Changes' : 'Add Recipe'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodsAndRecipes;
