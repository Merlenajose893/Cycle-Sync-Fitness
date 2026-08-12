import React, { useEffect, useState } from 'react';
import {
  Search, Plus, Pin, Pencil, Trash2, X, UtensilsCrossed, Save, Loader2, AlertCircle
} from 'lucide-react';
import '../../styles/TrainerPanel.css';
import { useRecipe } from '../../hooks/recipes/useRecipe';
import { useTrainerClients } from '../../hooks/trainer/useTrainerClients';
import Modal from '../../components/common/Modal/Modal';

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

interface PlanFormState {
  title: string;
  assignedTo: string;
  status: 'Active' | 'Draft';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  imageUrl: string;
  meals: string;
}

interface RecipeFormState {
  title: string;
  description: string;
  category: RecipeCategory;
  dietType: DietType;
  difficulty: Difficulty;
  prepTime: number;
  cookTime: number;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  imageUrl: string;
  ingredients: string;
  instructions: string;
  isPublished: boolean;
}

const emptyPlanForm: PlanFormState = {
  title: '',
  assignedTo: '',
  status: 'Draft',
  calories: 2000,
  protein: 150,
  carbs: 200,
  fat: 65,
  imageUrl: '',
  meals: '',
};

const emptyRecipeForm: RecipeFormState = {
  title: '',
  description: '',
  category: 'BREAKFAST',
  dietType: 'NO_RESTRICTION',
  difficulty: 'EASY',
  prepTime: 15,
  cookTime: 15,
  servings: 2,
  calories: 400,
  protein: 30,
  carbs: 45,
  fat: 10,
  imageUrl: '',
  ingredients: '',
  instructions: '',
  isPublished: true,
};

const initialSamplePlans: FoodPlan[] = [
  {
    id: '1',
    title: 'High Protein Cutting Plan',
    assignedTo: 'Sarah Jenkins',
    status: 'Active',
    calories: 1800,
    protein: 160,
    carbs: 140,
    fat: 50,
    meals: ['Oatmeal & Egg Whites', 'Grilled Chicken Salad', 'Greek Yogurt & Berries'],
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '2',
    title: 'Clean Bulk Meal Plan',
    assignedTo: 'Mike Ross',
    status: 'Active',
    calories: 2800,
    protein: 200,
    carbs: 320,
    fat: 80,
    meals: ['Overnight Oats + Peanut Butter', 'Steak & Sweet Potato Bowl', 'Salmon & Brown Rice'],
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
  },
];

const FoodsAndRecipes: React.FC = () => {
  const { recipes, loading, error, fetchRecipes, createRecipe, updateRecipe, deleteRecipe } = useRecipe();
  const { clients, fetchClients } = useTrainerClients();

  const [activeTab, setActiveTab] = useState<'plans' | 'recipes'>('plans');
  const [searchQuery, setSearchQuery] = useState('');

  /* Food Plans state */
  const [plans, setPlans] = useState<FoodPlan[]>(initialSamplePlans);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<FoodPlan | null>(null);
  const [planForm, setPlanForm] = useState<PlanFormState>(emptyPlanForm);

  /* Recipes state */
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [recipeForm, setRecipeForm] = useState<RecipeFormState>(emptyRecipeForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recipeFile, setRecipeFile] = useState<File | null>(null);
  const [recipeFilePreview, setRecipeFilePreview] = useState<string | null>(null);

  const handleRecipeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setRecipeFile(file);
      setRecipeFilePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    fetchRecipes({}, 1, 50);
    fetchClients();
  }, [fetchRecipes, fetchClients]);

  /* Filtering */
  const filteredPlans = plans.filter((plan) =>
    plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plan.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recipeList = Array.isArray(recipes) ? recipes : [];
  const filteredRecipes = recipeList.filter((recipe) =>
    recipe.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.dietType?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* Delete Confirmation Modals state */
  const [deletePlanId, setDeletePlanId] = useState<string | null>(null);
  const [deleteRecipeTarget, setDeleteRecipeTarget] = useState<Recipe | null>(null);

  /* Plan Handlers */
  const openCreatePlan = () => {
    setEditingPlan(null);
    setPlanForm(emptyPlanForm);
    setShowPlanModal(true);
  };

  const openEditPlan = (plan: FoodPlan) => {
    setEditingPlan(plan);
    setPlanForm({
      title: plan.title,
      assignedTo: plan.assignedTo,
      status: plan.status,
      calories: plan.calories,
      protein: plan.protein,
      carbs: plan.carbs,
      fat: plan.fat,
      imageUrl: plan.imageUrl,
      meals: plan.meals.join('\n'),
    });
    setShowPlanModal(true);
  };

  const handleSavePlan = () => {
    if (!planForm.title.trim()) return;
    const mealsList = planForm.meals.split('\n').filter((m) => m.trim().length > 0);

    if (editingPlan) {
      setPlans((prev) =>
        prev.map((p) =>
          p.id === editingPlan.id
            ? {
                ...p,
                ...planForm,
                meals: mealsList.length ? mealsList : ['Custom Meal'],
              }
            : p
        )
      );
    } else {
      const newPlan: FoodPlan = {
        id: Date.now().toString(),
        title: planForm.title,
        assignedTo: planForm.assignedTo || 'Unassigned',
        status: planForm.status,
        calories: Number(planForm.calories),
        protein: Number(planForm.protein),
        carbs: Number(planForm.carbs),
        fat: Number(planForm.fat),
        meals: mealsList.length ? mealsList : ['Custom Meal'],
        imageUrl:
          planForm.imageUrl ||
          'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80',
      };
      setPlans((prev) => [newPlan, ...prev]);
    }
    setShowPlanModal(false);
  };

  const handleDeletePlan = (id: string) => {
    setDeletePlanId(id);
  };

  const confirmDeletePlan = () => {
    if (deletePlanId) {
      setPlans((prev) => prev.filter((p) => p.id !== deletePlanId));
      setDeletePlanId(null);
    }
  };

  /* Recipe Handlers */
  const openCreateRecipe = () => {
    setEditingRecipe(null);
    setRecipeForm(emptyRecipeForm);
    setRecipeFile(null);
    setRecipeFilePreview(null);
    setShowRecipeModal(true);
  };

  const openEditRecipe = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setRecipeFile(null);
    setRecipeFilePreview(recipe.imageUrl || null);
    setRecipeForm({
      title: recipe.title || '',
      description: recipe.description || '',
      category: recipe.category || 'BREAKFAST',
      dietType: recipe.dietType || 'NO_RESTRICTION',
      difficulty: recipe.difficulty || 'EASY',
      prepTime: recipe.prepTime || 15,
      cookTime: recipe.cookTime || 15,
      servings: recipe.servings || 1,
      calories: recipe.macrosPerServing?.calories || 0,
      protein: recipe.macrosPerServing?.protein || 0,
      carbs: recipe.macrosPerServing?.carbs || 0,
      fat: recipe.macrosPerServing?.fat || 0,
      imageUrl: recipe.imageUrl || '',
      ingredients: recipe.ingredients ? recipe.ingredients.map((ing) => `${ing.quantity ? ing.quantity + ' ' : ''}${ing.name}`).join('\n') : '',
      instructions: Array.isArray(recipe.instructions) ? recipe.instructions.join('\n') : recipe.instructions || '',
      isPublished: recipe.isPublished ?? true,
    });
    setShowRecipeModal(true);
  };

  const handleSaveRecipe = async () => {
    if (!recipeForm.title.trim()) return;
    setIsSubmitting(true);

    const parsedIngredients = recipeForm.ingredients
      .split('\n')
      .filter((i) => i.trim().length > 0)
      .map((item) => {
        const parts = item.trim().split(' ');
        if (parts.length > 1 && !isNaN(parseFloat(parts[0]))) {
          return { quantity: parts[0], name: parts.slice(1).join(' ') };
        }
        return { quantity: '1 serving', name: item.trim() };
      });

    const parsedInstructions = recipeForm.instructions
      .split('\n')
      .filter((i) => i.trim().length > 0);

    const finalIngredients = parsedIngredients.length ? parsedIngredients : [{ name: 'Ingredients listed in details', quantity: '1' }];
    const finalInstructions = parsedInstructions.length ? parsedInstructions : ['Follow standard preparation steps.'];

    let success = false;

    if (recipeFile) {
      const formData = new FormData();
      formData.append('image', recipeFile);
      formData.append('title', recipeForm.title);
      formData.append('description', recipeForm.description || recipeForm.title);
      formData.append('category', recipeForm.category);
      formData.append('dietType', recipeForm.dietType);
      formData.append('difficulty', recipeForm.difficulty);
      formData.append('prepTime', String(recipeForm.prepTime));
      formData.append('cookTime', String(recipeForm.cookTime));
      formData.append('servings', String(recipeForm.servings));
      formData.append('ingredients', JSON.stringify(finalIngredients));
      formData.append('instructions', JSON.stringify(finalInstructions));
      formData.append('macrosPerServing', JSON.stringify({
        calories: Number(recipeForm.calories),
        protein: Number(recipeForm.protein),
        carbs: Number(recipeForm.carbs),
        fat: Number(recipeForm.fat),
      }));
      formData.append('isPublished', String(recipeForm.isPublished));

      if (editingRecipe && (editingRecipe._id || (editingRecipe as any).id)) {
        const id = editingRecipe._id || (editingRecipe as any).id;
        success = await updateRecipe(id, formData as any);
      } else {
        success = await createRecipe(formData as any);
      }
    } else {
      const payload = {
        title: recipeForm.title,
        description: recipeForm.description || recipeForm.title,
        category: recipeForm.category,
        dietType: recipeForm.dietType,
        difficulty: recipeForm.difficulty,
        prepTime: Number(recipeForm.prepTime),
        cookTime: Number(recipeForm.cookTime),
        servings: Number(recipeForm.servings),
        imageUrl:
          recipeForm.imageUrl ||
          'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
        ingredients: finalIngredients,
        instructions: finalInstructions,
        macrosPerServing: {
          calories: Number(recipeForm.calories),
          protein: Number(recipeForm.protein),
          carbs: Number(recipeForm.carbs),
          fat: Number(recipeForm.fat),
        },
        isPublished: recipeForm.isPublished,
      };

      if (editingRecipe && (editingRecipe._id || (editingRecipe as any).id)) {
        const id = editingRecipe._id || (editingRecipe as any).id;
        success = await updateRecipe(id, payload as any);
      } else {
        success = await createRecipe(payload as any);
      }
    }

    setIsSubmitting(false);

    if (success) {
      setShowRecipeModal(false);
      fetchRecipes({}, 1, 50);
    }
  };

  const handleDeleteRecipe = (recipe: Recipe) => {
    setDeleteRecipeTarget(recipe);
  };

  const confirmDeleteRecipe = async () => {
    if (!deleteRecipeTarget) return;
    const id = deleteRecipeTarget._id || (deleteRecipeTarget as any).id;
    if (!id) return;
    const ok = await deleteRecipe(id);
    if (ok) {
      fetchRecipes({}, 1, 50);
    }
    setDeleteRecipeTarget(null);
  };

  return (
    <div className="trainer-content">
      {/* Page Header */}
      <div style={{ marginBottom: '8px' }}>
        <h1 style={{ fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>Foods & Recipes</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '2px 0 0' }}>Manage client nutrition plans & custom recipe catalog</p>
      </div>

      {/* Error Alert */}
      {error && (
        <div style={{ padding: '10px 14px', background: '#fef2f2', color: '#dc2626', borderRadius: '8px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="tp-tabs">
        <button className={`tp-tab ${activeTab === 'plans' ? 'active' : ''}`} onClick={() => { setActiveTab('plans'); setSearchQuery(''); }}>
          <UtensilsCrossed size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
          Food Plans ({plans.length})
        </button>
        <button className={`tp-tab ${activeTab === 'recipes' ? 'active' : ''}`} onClick={() => { setActiveTab('recipes'); setSearchQuery(''); }}>
          <UtensilsCrossed size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
          Recipes ({recipes.length})
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
            onChange={(e) => setSearchQuery(e.target.value)}
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
          {filteredPlans.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', gridColumn: '1 / -1', color: 'var(--text-secondary)' }}>
              No food plans found. Click "Create Food Plan" to add one!
            </div>
          ) : (
            filteredPlans.map((plan) => (
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
                  <button className="tp-btn-icon" style={{ color: '#dc2626' }} title="Delete" onClick={() => handleDeletePlan(plan.id)}><Trash2 size={16} /></button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ═══ RECIPES TAB ═══ */}
      {activeTab === 'recipes' && (
        <>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
              <Loader2 className="animate-spin" size={28} style={{ color: 'var(--primary-color, #0d9488)' }} />
            </div>
          ) : filteredRecipes.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', gridColumn: '1 / -1', color: 'var(--text-secondary)' }}>
              No recipes found. Click "Add Recipe" to create your first recipe!
            </div>
          ) : (
            <div className="tp-food-grid">
              {filteredRecipes.map((recipe, index) => {
                const recipeId = recipe._id || (recipe as any).id;
                const cal = recipe.macrosPerServing?.calories ?? 0;
                const pro = recipe.macrosPerServing?.protein ?? 0;
                const carb = recipe.macrosPerServing?.carbs ?? 0;
                const fat = recipe.macrosPerServing?.fat ?? 0;

                return (
                  <div key={recipeId || index} className="tp-food-card animate-fadeIn">
                    <div className="tp-card-image">
                      <img
                        src={recipe.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'}
                        alt={recipe.title}
                      />
                    </div>
                    <div className="tp-food-card-header">
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3>{recipe.title}</h3>
                        <p>{recipe.ingredients?.length || 0} ingredients • {recipe.category}</p>
                      </div>
                      <span className="tp-badge teal">{recipe.dietType || 'Recipe'}</span>
                    </div>

                    <div className="tp-macros-row">
                      <div className="tp-macro-item">
                        <span className="tp-macro-value">{cal}</span>
                        <span className="tp-macro-label">CAL</span>
                      </div>
                      <div className="tp-macro-item">
                        <span className="tp-macro-value">{pro}g</span>
                        <span className="tp-macro-label">PROTEIN</span>
                      </div>
                      <div className="tp-macro-item">
                        <span className="tp-macro-value">{carb}g</span>
                        <span className="tp-macro-label">CARBS</span>
                      </div>
                      <div className="tp-macro-item">
                        <span className="tp-macro-value">{fat}g</span>
                        <span className="tp-macro-label">FAT</span>
                      </div>
                    </div>

                    <div className="tp-recipe-content" style={{ marginBottom: 12 }}>
                      {recipe.ingredients && recipe.ingredients.length > 0 && (
                        <div style={{ marginBottom: 12 }}>
                          <h4 style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>INGREDIENTS</h4>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {recipe.ingredients.map((ing, i) => (
                              <span key={i} style={{ padding: '4px 10px', background: '#f0fdfa', color: '#0d9488', borderRadius: 'var(--radius-full, 9999px)', fontSize: '0.78rem', fontWeight: 600, border: '1px solid #ccfbf1' }}>
                                {typeof ing === 'string' ? ing : `${ing.quantity ? ing.quantity + ' ' : ''}${ing.name}`}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {recipe.instructions && (
                        <div>
                          <h4 style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>INSTRUCTIONS</h4>
                          <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                            {Array.isArray(recipe.instructions) ? recipe.instructions.join(' ') : recipe.instructions}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="tp-food-actions">
                      <button className="tp-btn-icon" title="Edit" onClick={() => openEditRecipe(recipe)}><Pencil size={16} /></button>
                      <button className="tp-btn-icon" style={{ color: '#dc2626' }} title="Delete" onClick={() => handleDeleteRecipe(recipe)}><Trash2 size={16} /></button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* ═══ CREATE/EDIT FOOD PLAN MODAL ═══ */}
      {showPlanModal && (
        <div className="tp-modal-overlay" onClick={() => setShowPlanModal(false)}>
          <div className="tp-modal" onClick={(e) => e.stopPropagation()}>
            <div className="tp-modal-header">
              <h2>{editingPlan ? 'Edit Food Plan' : 'Create Food Plan'}</h2>
              <button className="tp-modal-close" onClick={() => setShowPlanModal(false)}><X size={18} /></button>
            </div>
            <div className="tp-modal-body">
              <div className="tp-form-group">
                <label>Plan Title</label>
                <input type="text" placeholder="e.g. Clean Bulk Meal Plan" value={planForm.title} onChange={(e) => setPlanForm({ ...planForm, title: e.target.value })} />
              </div>
              <div className="tp-form-group">
                <label>Assign to Client</label>
                <select
                  value={planForm.assignedTo}
                  onChange={(e) => setPlanForm({ ...planForm, assignedTo: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <option value="">-- General Template (Unassigned) --</option>
                  {clients.map((assignment: any) => {
                    const u = assignment.userId;
                    const clientName = u ? `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.email : 'Client';
                    return (
                      <option key={assignment._id || u?._id} value={clientName}>
                        {clientName} ({assignment.packageId?.packageName || 'Package'})
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="tp-form-row">
                <div className="tp-form-group"><label>Calories</label><input type="number" value={planForm.calories} onChange={(e) => setPlanForm({ ...planForm, calories: Number(e.target.value) })} /></div>
                <div className="tp-form-group"><label>Protein (g)</label><input type="number" value={planForm.protein} onChange={(e) => setPlanForm({ ...planForm, protein: Number(e.target.value) })} /></div>
              </div>
              <div className="tp-form-row">
                <div className="tp-form-group"><label>Carbs (g)</label><input type="number" value={planForm.carbs} onChange={(e) => setPlanForm({ ...planForm, carbs: Number(e.target.value) })} /></div>
                <div className="tp-form-group"><label>Fat (g)</label><input type="number" value={planForm.fat} onChange={(e) => setPlanForm({ ...planForm, fat: Number(e.target.value) })} /></div>
              </div>
              <div className="tp-form-group">
                <label>Image URL</label>
                <input type="text" placeholder="https://images.unsplash.com/..." value={planForm.imageUrl} onChange={(e) => setPlanForm({ ...planForm, imageUrl: e.target.value })} />
              </div>
              <div className="tp-form-group">
                <label>Meals (one per line)</label>
                <textarea placeholder={'Oatmeal + Egg Whites\nChicken & Rice Bowl\nProtein Shake'} value={planForm.meals} onChange={(e) => setPlanForm({ ...planForm, meals: e.target.value })} rows={4} />
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
          <div className="tp-modal" onClick={(e) => e.stopPropagation()}>
            <div className="tp-modal-header">
              <h2>{editingRecipe ? 'Edit Recipe' : 'Create Recipe'}</h2>
              <button className="tp-modal-close" onClick={() => setShowRecipeModal(false)}><X size={18} /></button>
            </div>
            <div className="tp-modal-body">
              <div className="tp-form-group">
                <label>Recipe Title</label>
                <input type="text" placeholder="e.g. Protein Pancakes" value={recipeForm.title} onChange={(e) => setRecipeForm({ ...recipeForm, title: e.target.value })} />
              </div>
              <div className="tp-form-group">
                <label>Description</label>
                <input type="text" placeholder="Short summary..." value={recipeForm.description} onChange={(e) => setRecipeForm({ ...recipeForm, description: e.target.value })} />
              </div>
              <div className="tp-form-row">
                <div className="tp-form-group">
                  <label>Category</label>
                  <select value={recipeForm.category} onChange={(e) => setRecipeForm({ ...recipeForm, category: e.target.value as RecipeCategory })}>
                    <option value="BREAKFAST">Breakfast</option>
                    <option value="LUNCH">Lunch</option>
                    <option value="DINNER">Dinner</option>
                    <option value="SNACK">Snack</option>
                    <option value="DESSERT">Dessert</option>
                    <option value="SMOOTHIE">Smoothie</option>
                  </select>
                </div>
                <div className="tp-form-group">
                  <label>Diet Type</label>
                  <select value={recipeForm.dietType} onChange={(e) => setRecipeForm({ ...recipeForm, dietType: e.target.value as DietType })}>
                    <option value="NO_RESTRICTION">No Restriction</option>
                    <option value="VEGETARIAN">Vegetarian</option>
                    <option value="VEGAN">Vegan</option>
                    <option value="KETO">Keto</option>
                    <option value="PALEO">Paleo</option>
                  </select>
                </div>
              </div>
              <div className="tp-form-row">
                <div className="tp-form-group"><label>Calories</label><input type="number" value={recipeForm.calories} onChange={(e) => setRecipeForm({ ...recipeForm, calories: Number(e.target.value) })} /></div>
                <div className="tp-form-group"><label>Protein (g)</label><input type="number" value={recipeForm.protein} onChange={(e) => setRecipeForm({ ...recipeForm, protein: Number(e.target.value) })} /></div>
              </div>
              <div className="tp-form-row">
                <div className="tp-form-group"><label>Carbs (g)</label><input type="number" value={recipeForm.carbs} onChange={(e) => setRecipeForm({ ...recipeForm, carbs: Number(e.target.value) })} /></div>
                <div className="tp-form-group"><label>Fat (g)</label><input type="number" value={recipeForm.fat} onChange={(e) => setRecipeForm({ ...recipeForm, fat: Number(e.target.value) })} /></div>
              </div>
              <div className="tp-form-group">
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Recipe Image</label>
                <div style={{ marginBottom: 8 }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Upload Image File from Device</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleRecipeFileChange}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Or Enter Image Web URL</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    value={recipeForm.imageUrl}
                    onChange={(e) => {
                      setRecipeForm({ ...recipeForm, imageUrl: e.target.value });
                      setRecipeFilePreview(e.target.value);
                    }}
                  />
                </div>
                {recipeFilePreview && (
                  <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img src={recipeFilePreview} alt="Recipe Preview" style={{ width: 64, height: 64, borderRadius: 8, objectFit: 'cover', border: '1px solid #0d9488' }} />
                    <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600 }}>Image preview ready</span>
                  </div>
                )}
              </div>
              <div className="tp-form-group">
                <label>Ingredients (one per line, e.g. "1 cup Oats")</label>
                <textarea placeholder={'1 cup Oats\n200g Greek Yogurt\n1 scoop Protein Powder'} value={recipeForm.ingredients} onChange={(e) => setRecipeForm({ ...recipeForm, ingredients: e.target.value })} rows={4} />
              </div>
              <div className="tp-form-group">
                <label>Instructions (one step per line)</label>
                <textarea placeholder="Mix all ingredients in a bowl. Cook on medium heat." value={recipeForm.instructions} onChange={(e) => setRecipeForm({ ...recipeForm, instructions: e.target.value })} rows={3} />
              </div>
            </div>
            <div className="tp-modal-footer">
              <button className="tp-btn tp-btn-secondary" onClick={() => setShowRecipeModal(false)}>Cancel</button>
              <button className="tp-btn tp-btn-primary" onClick={handleSaveRecipe} disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                {editingRecipe ? 'Save Changes' : 'Add Recipe'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ DELETE PLAN CONFIRMATION MODAL ═══ */}
      <Modal
        isOpen={!!deletePlanId}
        onClose={() => setDeletePlanId(null)}
        title="Delete Food Plan"
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onConfirm={confirmDeletePlan}
      >
        <p style={{ margin: 0 }}>
          Are you sure you want to delete this food plan? This action cannot be undone.
        </p>
      </Modal>

      {/* ═══ DELETE RECIPE CONFIRMATION MODAL ═══ */}
      <Modal
        isOpen={!!deleteRecipeTarget}
        onClose={() => setDeleteRecipeTarget(null)}
        title="Delete Recipe"
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onConfirm={confirmDeleteRecipe}
      >
        <p style={{ margin: 0 }}>
          Are you sure you want to delete <strong>"{deleteRecipeTarget?.title}"</strong>? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default FoodsAndRecipes;
