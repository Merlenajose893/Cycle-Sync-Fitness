import React, { useState, useEffect } from 'react';
import { Search, Plus, ChevronLeft, ChevronRight, Calendar, SlidersHorizontal, Target, Save, BookOpen, Utensils, Eye, Info } from 'lucide-react';
import { useNutrition } from '../../hooks/nutrition/useNutrition';
import { useRecipe } from '../../hooks/recipes/useRecipe';
import type { MealType, FoodItem, LogMealPayload } from '../../types/nutrition.types';
import type { Recipe } from '../../types/recipe.types';
import Modal from '../../components/common/Modal/Modal';
import toast from 'react-hot-toast';
import '../../styles/UserPages.css';

type FoodView = 'log' | 'history' | 'goals';
type UIMealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';

const mealEmojiMap: Record<UIMealType, string> = { Breakfast: '🍳', Lunch: '🍲', Dinner: '🌙', Snack: '🍎' };

const uiToBackendMealType: Record<UIMealType, MealType> = {
  Breakfast: 'BREAKFAST',
  Lunch: 'LUNCH',
  Dinner: 'DINNER',
  Snack: 'SNACK'
};

const backendToUiMealType: Record<MealType, UIMealType> = {
  BREAKFAST: 'Breakfast',
  LUNCH: 'Lunch',
  DINNER: 'Dinner',
  SNACK: 'Snack'
};

const presets = [
  { name: 'Balanced', desc: 'Well-rounded for general health', p: 30, c: 40, f: 30 },
  { name: 'Low Carb', desc: 'Ketogenic-friendly approach', p: 35, c: 25, f: 40 },
  { name: 'High Protein', desc: 'Muscle building focus', p: 40, c: 35, f: 25 },
  { name: 'Endurance', desc: 'Optimized for cardio athletes', p: 20, c: 55, f: 25 },
];

const formatISODate = (date: Date) => date.toISOString().split('T')[0];

const Food: React.FC = () => {
  const {
    loading: nutritionLoading,
    dayLog,
    fetchDayLog,
    logMeal,
    removeMeal,
    updateDailyTarget,
  } = useNutrition();

  const {
    recipes,
    loading: recipeLoading,
    fetchRecipes,
  } = useRecipe();

  const [view, setView] = useState<FoodView>('log');
  const [activeMeal, setActiveMeal] = useState<UIMealType>('Breakfast');
  const [search, setSearch] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [stagedFoods, setStagedFoods] = useState<FoodItem[]>([]);
  const [selectedRecipeDetail, setSelectedRecipeDetail] = useState<Recipe | null>(null);

  // Goals State (Default to 0 / empty if not set in DB yet)
  const [activePreset, setActivePreset] = useState<number | null>(null);
  const [calorieGoal, setCalorieGoal] = useState<number>(0);
  const [macros, setMacros] = useState({ protein: 0, carbs: 0, fats: 0 });

  // Load day log and trainer recipes on mount/date change
  useEffect(() => {
    const isoDate = formatISODate(selectedDate);
    fetchDayLog(isoDate);
    fetchRecipes({});
  }, [selectedDate, fetchDayLog, fetchRecipes]);

  // Sync targets with backend dayLog only if set in DB
  useEffect(() => {
    if (dayLog?.target && dayLog.target.calories > 0) {
      setCalorieGoal(dayLog.target.calories);
      setMacros({
        protein: dayLog.target.protein || 0,
        carbs: dayLog.target.carbs || 0,
        fats: dayLog.target.fat || 0,
      });
    } else {
      setCalorieGoal(0);
      setMacros({ protein: 0, carbs: 0, fats: 0 });
    }
  }, [dayLog]);

  // Macro Calculations
  const totalCal = macros.protein * 4 + macros.carbs * 4 + macros.fats * 9;
  const pPct = totalCal > 0 ? Math.round((macros.protein * 4 / totalCal) * 100) : 0;
  const cPct = totalCal > 0 ? Math.round((macros.carbs * 4 / totalCal) * 100) : 0;
  const fPct = Math.max(0, 100 - pPct - cPct);

  // Date Nav Handlers
  const handlePrevDay = () => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 1);
    setSelectedDate(prev);
  };

  const handleNextDay = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 1);
    setSelectedDate(next);
  };

  // Add item to staged foods list
  const handleAddFoodItem = (food: FoodItem) => {
    setStagedFoods((prev) => [...prev, food]);
    toast.success(`Added "${food.name}" to ${activeMeal}`);
  };

  // Add trainer recipe to staged foods
  const handleAddTrainerRecipe = (recipe: Recipe) => {
    const foodItem: FoodItem = {
      name: recipe.title,
      quantity: 1,
      unit: `${recipe.servings || 1} serving`,
      calories: recipe.macrosPerServing?.calories || 0,
      proteins: recipe.macrosPerServing?.protein || 0,
      carbs: recipe.macrosPerServing?.carbs || 0,
      fats: recipe.macrosPerServing?.fat || 0,
    };
    handleAddFoodItem(foodItem);
  };

  // Remove item from staged foods list
  const handleRemoveStagedFood = (index: number) => {
    setStagedFoods((prev) => prev.filter((_, i) => i !== index));
  };

  // Save current meal to backend
  const handleSaveMeal = async () => {
    if (stagedFoods.length === 0) {
      toast.error('Please add at least one trainer recipe to log');
      return;
    }

    const backendType = uiToBackendMealType[activeMeal];
    const payload: LogMealPayload = {
      mealType: backendType,
      foods: stagedFoods,
    };

    const success = await logMeal(payload);
    if (success) {
      toast.success(`${activeMeal} logged successfully!`);
      setStagedFoods([]);
      fetchDayLog(formatISODate(selectedDate));
    } else {
      toast.error(`Failed to log ${activeMeal}`);
    }
  };

  // Remove meal from backend
  const handleRemoveBackendMeal = async (uiType: UIMealType) => {
    const backendType = uiToBackendMealType[uiType];
    const success = await removeMeal(backendType);
    if (success) {
      toast.success(`${uiType} removed`);
      fetchDayLog(formatISODate(selectedDate));
    } else {
      toast.error(`Failed to remove ${uiType}`);
    }
  };

  // Save updated Macro targets
  const handleSaveTargets = async () => {
    if (calorieGoal <= 0) {
      toast.error('Please enter a valid daily calorie goal before saving');
      return;
    }
    const success = await updateDailyTarget({
      calories: calorieGoal,
      protein: macros.protein,
      carbs: macros.carbs,
      fat: macros.fats,
    });
    if (success) {
      toast.success('Macro targets updated!');
      fetchDayLog(formatISODate(selectedDate));
    } else {
      toast.error('Failed to update macro targets');
    }
  };

  // Current day's existing meal for active meal type
  const activeBackendMealType = uiToBackendMealType[activeMeal];
  const existingMealLog = dayLog?.meals?.find((m) => m.mealType === activeBackendMealType);

  // Filter trainer recipes based on search input
  const recipeList = Array.isArray(recipes) ? recipes : [];
  const filteredTrainerRecipes = recipeList.filter((r) => {
    const matchesSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.description?.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="up-page">
      {/* ═══ SUB-TABS ═══ */}
      <div className="up-tabs">
        <button className={`up-tab ${view === 'log' ? 'active' : ''}`} onClick={() => setView('log')}>Log Food</button>
        <button className={`up-tab ${view === 'history' ? 'active' : ''}`} onClick={() => setView('history')}>Food History</button>
        <button className={`up-tab ${view === 'goals' ? 'active' : ''}`} onClick={() => setView('goals')}>Macro Goals</button>
      </div>

      {/* ═══════════ LOG FOOD VIEW ═══════════ */}
      {view === 'log' && (
        <>
          <div className="up-page-header">
            <div>
              <h1>Log Meal from Trainer Recipes</h1>
              <p>Select recipes prepared by trainers to log your {activeMeal.toLowerCase()} ({selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })})</p>
            </div>
            <button className="up-btn" onClick={() => setView('history')}>View Log History</button>
          </div>

          <div className="up-food-layout">
            <div>
              {/* Meal Type Selection Tabs */}
              <div className="up-meal-types">
                {(Object.keys(mealEmojiMap) as UIMealType[]).map((m) => (
                  <button key={m} className={`up-meal-pill ${activeMeal === m ? 'active' : ''}`} onClick={() => setActiveMeal(m)}>
                    <span className="up-meal-emoji">{mealEmojiMap[m]}</span>{m}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="up-search">
                <Search size={18} className="up-search-icon" />
                <input placeholder="Search trainer recipes by title or ingredient..." value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>

              {/* Trainer Recipes Section Header */}
              <div className="up-food-section-title" style={{ color: '#0d9488', fontSize: '0.9rem', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                <BookOpen size={16} /> TRAINER RECIPE CATALOG ({filteredTrainerRecipes.length})
              </div>

              {/* Trainer Recipes List */}
              {recipeLoading ? (
                <div className="up-card" style={{ textAlign: 'center', padding: 24, color: '#64748b' }}>
                  Loading trainer recipes...
                </div>
              ) : filteredTrainerRecipes.length === 0 ? (
                <div className="up-card" style={{ textAlign: 'center', padding: 32, background: '#f8fafc', border: '1px dashed #cbd5e1' }}>
                  <Utensils size={36} style={{ color: '#94a3b8', marginBottom: 8 }} />
                  <p style={{ fontWeight: 600, color: '#475569', margin: 0 }}>No trainer recipes found</p>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: 4 }}>
                    Recipes created by trainers will automatically appear here for you to log into your daily meals.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {filteredTrainerRecipes.map((r) => (
                    <div
                      key={r._id}
                      className="up-food-item"
                      style={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderLeft: '4px solid #0d9488',
                        borderRadius: '12px',
                        padding: '16px',
                        display: 'flex',
                        justify: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                        {r.imageUrl ? (
                          <img src={r.imageUrl} alt={r.title} style={{ width: 60, height: 60, borderRadius: 10, objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: 60, height: 60, borderRadius: 10, background: '#ccfbf1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f766e' }}>
                            <Utensils size={24} />
                          </div>
                        )}
                        <div>
                          <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
                            {r.title}
                            <span style={{ fontSize: '0.68rem', padding: '2px 8px', background: '#ccfbf1', color: '#0f766e', borderRadius: 12, fontWeight: 700 }}>
                              {r.category || 'RECIPE'}
                            </span>
                          </h4>
                          <p style={{ margin: '4px 0', fontSize: '0.78rem', color: '#64748b' }}>
                            {r.servings || 1} serving • {r.prepTime || 15} min prep
                          </p>
                          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0d9488' }}>
                            {r.macrosPerServing?.calories || 0} kcal • P: {r.macrosPerServing?.protein || 0}g • C: {r.macrosPerServing?.carbs || 0}g • F: {r.macrosPerServing?.fat || 0}g
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <button
                          onClick={() => setSelectedRecipeDetail(r)}
                          style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', color: '#475569', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.8rem' }}
                        >
                          <Eye size={14} /> View
                        </button>
                        <button
                          className="up-btn up-btn-primary"
                          style={{ padding: '8px 14px', borderRadius: '8px', background: '#0d9488', borderColor: '#0d9488', fontWeight: 600, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4 }}
                          onClick={() => handleAddTrainerRecipe(r)}
                        >
                          <Plus size={14} /> Add to {activeMeal}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Meal Panel */}
            <div className="up-meal-panel">
              <div className="up-card">
                <h3>Your {activeMeal} Log</h3>

                {/* Show existing logged meal from backend */}
                {existingMealLog && existingMealLog.foods.length > 0 && (
                  <div style={{ marginBottom: 16, paddingBottom: 12, borderBottom: '1px dashed #cbd5e1' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#166534', background: '#dcfce7', padding: '2px 8px', borderRadius: 8 }}>SAVED MEAL</span>
                      <button
                        className="up-btn up-btn-sm"
                        style={{ color: '#dc2626', borderColor: '#fca5a5' }}
                        onClick={() => handleRemoveBackendMeal(activeMeal)}
                      >
                        Delete Log
                      </button>
                    </div>
                    {existingMealLog.foods.map((food, idx) => (
                      <div key={idx} style={{ fontSize: '0.85rem', color: '#334155', margin: '4px 0' }}>
                        • {food.name} ({food.calories} kcal)
                      </div>
                    ))}
                  </div>
                )}

                {/* Staged recipes to log */}
                <h4 style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: 8 }}>STAGED RECIPES ({stagedFoods.length})</h4>
                {stagedFoods.length === 0 ? (
                  <div className="up-empty-meal">
                    <Plus size={32} style={{ color: 'var(--text-muted)', opacity: 0.4 }} />
                    <p>No recipes added yet</p>
                    <p style={{ fontSize: '0.78rem' }}>Click "+ Add to {activeMeal}" on any trainer recipe to log it</p>
                  </div>
                ) : (
                  <div>
                    {stagedFoods.map((f, i) => (
                      <div key={i} className="up-food-item" style={{ marginBottom: 6 }}>
                        <div className="up-food-info">
                          <h4>{f.name}</h4>
                          <p>{f.calories} kcal • P: {f.proteins}g • C: {f.carbs}g • F: {f.fats}g</p>
                        </div>
                        <button className="up-btn up-btn-sm" style={{ color: '#dc2626', borderColor: '#fca5a5' }} onClick={() => handleRemoveStagedFood(i)}>✕</button>
                      </div>
                    ))}
                    <button className="up-btn up-btn-primary" style={{ width: '100%', marginTop: 16 }} onClick={handleSaveMeal} disabled={nutritionLoading}>
                      <Save size={16} /> {nutritionLoading ? 'Saving...' : `Save ${activeMeal}`}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ═══════════ FOOD HISTORY VIEW ═══════════ */}
      {view === 'history' && (
        <>
          <div className="up-page-header">
            <div><h1>Food History</h1><p>Review your nutrition and logged meals</p></div>
          </div>

          <div className="up-date-nav" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 20 }}>
            <button onClick={handlePrevDay} className="up-btn"><ChevronLeft size={16} /></button>
            <div className="up-date-display" style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700 }}>
              <Calendar size={16} /> {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
            <button onClick={handleNextDay} className="up-btn"><ChevronRight size={16} /></button>
          </div>

          {nutritionLoading ? (
            <div className="up-card" style={{ textAlign: 'center', padding: 32 }}>Loading nutrition logs...</div>
          ) : (
            <div className="up-day-card">
              <div className="up-day-header">
                <h3>{selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h3>
                <span>
                  {dayLog?.summary?.totalCalories || 0} / {dayLog?.target?.calories || 0} kcal •
                  P: {dayLog?.summary?.totalProtein || 0}g • C: {dayLog?.summary?.totalCarbs || 0}g • F: {dayLog?.summary?.totalFat || 0}g
                </span>
              </div>

              {(!dayLog?.meals || dayLog.meals.length === 0) ? (
                <div style={{ textAlign: 'center', padding: 24, color: '#64748b' }}>
                  No meals logged for this date.
                </div>
              ) : (
                dayLog.meals.map((meal, mi) => {
                  const uiType = backendToUiMealType[meal.mealType] || 'Breakfast';
                  return (
                    <div key={mi} className="up-meal-row">
                      <div className="up-meal-label">
                        <span className="emoji">{mealEmojiMap[uiType]}</span>
                        <div className="up-meal-label-text">
                          <h4>{uiType}</h4>
                          <span>{meal.totalCalories || 0} kcal</span>
                        </div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div className="up-meal-tags">
                          {meal.foods.map((f, fi) => (
                            <span key={fi} className="up-meal-tag">{f.name} ({f.calories} kcal)</span>
                          ))}
                        </div>
                        <div className="up-meal-macros" style={{ fontSize: '0.8rem', color: '#64748b', marginTop: 4 }}>
                          P: {meal.totalProtein || 0}g • C: {meal.totalCarbs || 0}g • F: {meal.totalFat || 0}g
                        </div>
                      </div>
                      <button
                        className="up-btn up-btn-sm"
                        style={{ color: '#dc2626', borderColor: '#fca5a5' }}
                        onClick={() => handleRemoveBackendMeal(uiType)}
                      >
                        Delete
                      </button>
                    </div>
                  );
                })
              )}

              {/* Progress Summary Bars */}
              {dayLog?.target && dayLog.target.calories > 0 && (
                <>
                  <div className="up-progress-row" style={{ marginTop: 16 }}>
                    <span className="up-progress-label">Calories</span>
                    <div className="up-progress-bar">
                      <div
                        className="up-progress-fill blue"
                        style={{ width: `${Math.min(100, Math.round(((dayLog.summary?.totalCalories || 0) / dayLog.target.calories) * 100))}%` }}
                      />
                    </div>
                    <span className="up-progress-pct">
                      {Math.round(((dayLog.summary?.totalCalories || 0) / dayLog.target.calories) * 100)}%
                    </span>
                  </div>
                  <div className="up-progress-row">
                    <span className="up-progress-label">Protein</span>
                    <div className="up-progress-bar">
                      <div
                        className="up-progress-fill purple"
                        style={{ width: `${Math.min(100, Math.round(((dayLog.summary?.totalProtein || 0) / (dayLog.target.protein || 1)) * 100))}%` }}
                      />
                    </div>
                    <span className="up-progress-pct">
                      {Math.round(((dayLog.summary?.totalProtein || 0) / (dayLog.target.protein || 1)) * 100)}%
                    </span>
                  </div>
                </>
              )}
            </div>
          )}
        </>
      )}

      {/* ═══════════ MACRO GOALS VIEW ═══════════ */}
      {view === 'goals' && (
        <>
          <div className="up-page-header">
            <div><h1>Macro Goals</h1><p>Customize your daily nutrition targets</p></div>
            <div className="up-header-actions">
              <button className="up-btn up-btn-primary" onClick={handleSaveTargets} disabled={nutritionLoading}>
                <Save size={16} /> {nutritionLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>

          {calorieGoal === 0 && (
            <div className="up-card" style={{ marginBottom: 20, borderLeft: '4px solid #f59e0b', background: '#fffbeb' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Info size={20} style={{ color: '#d97706' }} />
                <div>
                  <h4 style={{ margin: 0, color: '#92400e', fontSize: '0.95rem' }}>No Macro Goals Set Yet</h4>
                  <p style={{ margin: 0, color: '#b45309', fontSize: '0.82rem' }}>
                    Select a preset on the left or enter your target calories below, then click "Save Changes" to set your daily goals.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="up-goals-layout">
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16 }}>Quick Presets</h3>
              <div className="up-presets-list">
                {presets.map((pr, i) => (
                  <div
                    key={i}
                    className={`up-preset-card ${activePreset === i ? 'active' : ''}`}
                    onClick={() => {
                      const targetCal = calorieGoal > 0 ? calorieGoal : 1800;
                      if (calorieGoal === 0) setCalorieGoal(1800);
                      setActivePreset(i);
                      setMacros({
                        protein: Math.round((targetCal * pr.p) / 100 / 4),
                        carbs: Math.round((targetCal * pr.c) / 100 / 4),
                        fats: Math.round((targetCal * pr.f) / 100 / 9),
                      });
                    }}
                  >
                    <h4>{pr.name}</h4>
                    <p>{pr.desc}</p>
                    <div className="up-preset-badges">
                      <span className="up-preset-badge p">P: {pr.p}%</span>
                      <span className="up-preset-badge c">C: {pr.c}%</span>
                      <span className="up-preset-badge f">F: {pr.f}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="up-card up-calorie-goal-card" style={{ marginBottom: 20 }}>
                <h3><Target size={18} style={{ color: '#22c55e' }} /> Daily Calorie Goal</h3>
                <div>
                  <input
                    type="number"
                    className="up-calorie-input"
                    placeholder="0"
                    value={calorieGoal || ''}
                    onChange={(e) => setCalorieGoal(Number(e.target.value))}
                  />
                  <span className="up-calorie-unit">kcal/day</span>
                </div>
              </div>

              <div className="up-card" style={{ marginBottom: 20 }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '1rem', fontWeight: 700, marginBottom: 16 }}>
                  <SlidersHorizontal size={18} /> Macro Distribution
                </h3>
                <div className="up-macro-dist-bar">
                  <div style={{ width: `${pPct}%`, background: '#2563eb' }}>{pPct}%</div>
                  <div style={{ width: `${cPct}%`, background: '#f59e0b' }}>{cPct}%</div>
                  <div style={{ width: `${fPct}%`, background: '#ef4444' }}>{fPct}%</div>
                </div>
                <div className="up-macro-inputs">
                  <div className="up-macro-input-card">
                    <h4><span className="dot" style={{ background: '#2563eb' }} /> Protein</h4>
                    <input type="number" placeholder="0" value={macros.protein || ''} onChange={(e) => setMacros({ ...macros, protein: Number(e.target.value) })} />
                    <span className="unit">grams</span>
                    <div className="cal-info">{macros.protein * 4} calories ({pPct}%)</div>
                  </div>
                  <div className="up-macro-input-card">
                    <h4><span className="dot" style={{ background: '#f59e0b' }} /> Carbohydrates</h4>
                    <input type="number" placeholder="0" value={macros.carbs || ''} onChange={(e) => setMacros({ ...macros, carbs: Number(e.target.value) })} />
                    <span className="unit">grams</span>
                    <div className="cal-info">{macros.carbs * 4} calories ({cPct}%)</div>
                  </div>
                  <div className="up-macro-input-card">
                    <h4><span className="dot" style={{ background: '#ef4444' }} /> Fats</h4>
                    <input type="number" placeholder="0" value={macros.fats || ''} onChange={(e) => setMacros({ ...macros, fats: Number(e.target.value) })} />
                    <span className="unit">grams</span>
                    <div className="cal-info">{macros.fats * 9} calories ({fPct}%)</div>
                  </div>
                </div>
              </div>

              <div className="up-targets-row">
                <div className="up-target-item"><label>Total Calories</label><span>{calorieGoal || 0} kcal</span></div>
                <div className="up-target-item"><label>Protein</label><span>{macros.protein || 0}g ({pPct}%)</span></div>
                <div className="up-target-item"><label>Carbs</label><span>{macros.carbs || 0}g ({cPct}%)</span></div>
                <div className="up-target-item"><label>Fats</label><span>{macros.fats || 0}g ({fPct}%)</span></div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ═══════════ RECIPE DETAILS MODAL ═══════════ */}
      {selectedRecipeDetail && (
        <Modal
          isOpen={selectedRecipeDetail !== null}
          onClose={() => setSelectedRecipeDetail(null)}
          title={selectedRecipeDetail.title}
          confirmText={`Log to ${activeMeal}`}
          onConfirm={() => {
            handleAddTrainerRecipe(selectedRecipeDetail);
            setSelectedRecipeDetail(null);
          }}
        >
          <div>
            {selectedRecipeDetail.imageUrl && (
              <img
                src={selectedRecipeDetail.imageUrl}
                alt={selectedRecipeDetail.title}
                style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px', marginBottom: '16px' }}
              />
            )}
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{selectedRecipeDetail.description}</p>

            <div style={{ display: 'flex', gap: '16px', margin: '16px 0', background: '#f8fafc', padding: '12px', borderRadius: '8px' }}>
              <div><strong>Prep Time:</strong> {selectedRecipeDetail.prepTime || 15} mins</div>
              <div><strong>Servings:</strong> {selectedRecipeDetail.servings || 1}</div>
              <div><strong>Category:</strong> {selectedRecipeDetail.category}</div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '0.95rem' }}>Macros per Serving</h4>
              <div style={{ display: 'flex', gap: '12px', fontSize: '0.85rem' }}>
                <span style={{ padding: '4px 8px', background: '#dbeafe', color: '#1e40af', borderRadius: '6px', fontWeight: 600 }}>
                  Calories: {selectedRecipeDetail.macrosPerServing?.calories || 0} kcal
                </span>
                <span style={{ padding: '4px 8px', background: '#f3e8ff', color: '#6b21a8', borderRadius: '6px', fontWeight: 600 }}>
                  Protein: {selectedRecipeDetail.macrosPerServing?.protein || 0}g
                </span>
                <span style={{ padding: '4px 8px', background: '#fef3c7', color: '#92400e', borderRadius: '6px', fontWeight: 600 }}>
                  Carbs: {selectedRecipeDetail.macrosPerServing?.carbs || 0}g
                </span>
                <span style={{ padding: '4px 8px', background: '#dcfce7', color: '#166534', borderRadius: '6px', fontWeight: 600 }}>
                  Fat: {selectedRecipeDetail.macrosPerServing?.fat || 0}g
                </span>
              </div>
            </div>

            {selectedRecipeDetail.ingredients && selectedRecipeDetail.ingredients.length > 0 && (
              <div>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.95rem' }}>Ingredients</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#334155', fontSize: '0.85rem' }}>
                  {selectedRecipeDetail.ingredients.map((ing, i) => (
                    <li key={i}>{ing.name} - {ing.quantity}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Food;
