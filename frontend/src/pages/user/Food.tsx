import React, { useState } from 'react';
import { Search, Plus, Clock, Flame, ChevronLeft, ChevronRight, Calendar, Download, Filter, SlidersHorizontal, Target, RotateCcw, Save, Info, Camera, QrCode } from 'lucide-react';
import '../../styles/UserPages.css';

type FoodView = 'log' | 'history' | 'goals';
type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';

const mealEmojis: Record<MealType, string> = { Breakfast: '🍳', Lunch: '🍲', Dinner: '🌙', Snack: '🍎' };

const recentFoods = [
  { name: 'Oatmeal with Berries', macros: '220 kcal • P: 8g • C: 40g • F: 4g' },
  { name: 'Protein Shake', macros: '180 kcal • P: 25g • C: 10g • F: 3g' },
];

const popularFoods = [
  { name: 'Avocado Toast', serving: '2 slices', macros: '250 kcal • P: 8g • C: 30g • F: 12g' },
  { name: 'Greek Yogurt', serving: '1 cup', macros: '150 kcal • P: 15g • C: 12g • F: 4g' },
  { name: 'Grilled Chicken Breast', serving: '100g', macros: '165 kcal • P: 31g • C: 0g • F: 3.6g' },
  { name: 'Brown Rice', serving: '1 cup', macros: '215 kcal • P: 5g • C: 45g • F: 1.6g' },
  { name: 'Salmon Fillet', serving: '150g', macros: '280 kcal • P: 25g • C: 0g • F: 20g' },
  { name: 'Sweet Potato', serving: '1 medium', macros: '180 kcal • P: 4g • C: 41g • F: 0.3g' },
];

const historyDays = [
  {
    date: 'Tuesday, February 17', summary: '1500 / 1800 kcal  P: 110g  C: 125g  F: 61g',
    meals: [
      { type: 'Breakfast' as MealType, time: '8:30 AM', foods: ['Avocado Toast', 'Scrambled Eggs'], macros: '420 kcal • P: 18g • C: 35g • F: 22g' },
      { type: 'Lunch' as MealType, time: '1:15 PM', foods: ['Grilled Chicken Salad', 'Olive Oil Dressing'], macros: '380 kcal • P: 35g • C: 20g • F: 18g' },
      { type: 'Snack' as MealType, time: '4:30 PM', foods: ['Greek Yogurt', 'Mixed Berries'], macros: '180 kcal • P: 15g • C: 22g • F: 3g' },
      { type: 'Dinner' as MealType, time: '7:30 PM', foods: ['Baked Salmon', 'Quinoa', 'Steamed Broccoli'], macros: '520 kcal • P: 42g • C: 48g • F: 18g' },
    ],
    caloriesPct: 83, proteinPct: 92,
  },
  {
    date: 'Monday, February 16', summary: '1250 / 1800 kcal  P: 65g  C: 159g  F: 39g',
    meals: [
      { type: 'Breakfast' as MealType, time: '9:00 AM', foods: ['Oatmeal', 'Banana', 'Almonds'], macros: '350 kcal • P: 12g • C: 55g • F: 10g' },
      { type: 'Lunch' as MealType, time: '1:00 PM', foods: ['Turkey Wrap', 'Side Salad'], macros: '420 kcal • P: 28g • C: 42g • F: 15g' },
      { type: 'Dinner' as MealType, time: '7:00 PM', foods: ['Stir-fry Tofu', 'Brown Rice', 'Vegetables'], macros: '480 kcal • P: 25g • C: 62g • F: 14g' },
    ],
    caloriesPct: 69, proteinPct: 54,
  },
];

const presets = [
  { name: 'Balanced', desc: 'Well-rounded for general health', p: 30, c: 40, f: 30 },
  { name: 'Low Carb', desc: 'Ketogenic-friendly approach', p: 35, c: 25, f: 40 },
  { name: 'High Protein', desc: 'Muscle building focus', p: 40, c: 35, f: 25 },
  { name: 'Endurance', desc: 'Optimized for cardio athletes', p: 20, c: 55, f: 25 },
];

const Food: React.FC = () => {
  const [view, setView] = useState<FoodView>('log');
  const [activeMeal, setActiveMeal] = useState<MealType>('Breakfast');
  const [search, setSearch] = useState('');
  const [loggedFoods, setLoggedFoods] = useState<string[]>([]);
  const [activePreset, setActivePreset] = useState(0);
  const [calorieGoal, setCalorieGoal] = useState(1800);
  const [macros, setMacros] = useState({ protein: 120, carbs: 225, fats: 60 });

  const totalCal = macros.protein * 4 + macros.carbs * 4 + macros.fats * 9;
  const pPct = Math.round((macros.protein * 4 / totalCal) * 100);
  const cPct = Math.round((macros.carbs * 4 / totalCal) * 100);
  const fPct = 100 - pPct - cPct;

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
            <div><h1>Log Food</h1><p>Add items to your {activeMeal.toLowerCase()} log</p></div>
            <button className="up-btn" onClick={() => setView('history')}>Cancel</button>
          </div>

          <div className="up-food-layout">
            <div>
              <div className="up-meal-types">
                {(Object.keys(mealEmojis) as MealType[]).map(m => (
                  <button key={m} className={`up-meal-pill ${activeMeal === m ? 'active' : ''}`} onClick={() => setActiveMeal(m)}>
                    <span className="up-meal-emoji">{mealEmojis[m]}</span>{m}
                  </button>
                ))}
              </div>

              <div className="up-search">
                <Search size={18} className="up-search-icon" />
                <input placeholder="Search for foods..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>

              <div className="up-quick-actions">
                <button className="up-quick-action"><QrCode size={16} /> Scan Barcode</button>
                <button className="up-quick-action"><Camera size={16} /> Snap Photo</button>
                <button className="up-quick-action"><Plus size={16} /> Custom Food</button>
              </div>

              <div className="up-food-section">
                <div className="up-food-section-title"><Clock size={14} /> RECENT FOODS</div>
                {recentFoods.map((f, i) => (
                  <div key={i} className="up-food-item">
                    <div className="up-food-info"><h4>{f.name}</h4><p>{f.macros}</p></div>
                    <button className="up-food-add-btn" onClick={() => setLoggedFoods(prev => [...prev, f.name])}><Plus size={16} /></button>
                  </div>
                ))}
              </div>

              <div className="up-food-section">
                <div className="up-food-section-title"><Flame size={14} /> POPULAR FOODS</div>
                {popularFoods.filter(f => !search || f.name.toLowerCase().includes(search.toLowerCase())).map((f, i) => (
                  <div key={i} className="up-food-item">
                    <div className="up-food-info"><h4>{f.name}</h4><p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{f.serving}</p><p>{f.macros}</p></div>
                    <button className="up-food-add-btn" onClick={() => setLoggedFoods(prev => [...prev, f.name])}><Plus size={16} /></button>
                  </div>
                ))}
              </div>
            </div>

            <div className="up-meal-panel">
              <div className="up-card">
                <h3>Your {activeMeal}</h3>
                {loggedFoods.length === 0 ? (
                  <div className="up-empty-meal">
                    <Plus size={32} style={{ color: 'var(--text-muted)', opacity: 0.4 }} />
                    <p>No foods added yet</p>
                    <p style={{ fontSize: '0.78rem' }}>Search and add foods from the left</p>
                  </div>
                ) : (
                  <div>
                    {loggedFoods.map((f, i) => (
                      <div key={i} className="up-food-item" style={{ marginBottom: 6 }}>
                        <div className="up-food-info"><h4>{f}</h4></div>
                        <button className="up-btn up-btn-sm" style={{ color: '#dc2626', borderColor: '#fca5a5' }} onClick={() => setLoggedFoods(prev => prev.filter((_, idx) => idx !== i))}>✕</button>
                      </div>
                    ))}
                    <button className="up-btn up-btn-primary" style={{ width: '100%', marginTop: 16 }}>
                      <Save size={16} /> Save {activeMeal}
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
            <div><h1>Food History</h1><p>Review your nutrition over time</p></div>
            <div className="up-header-actions">
              <button className="up-btn"><Filter size={16} /> Filter</button>
              <button className="up-btn"><Download size={16} /> Export</button>
            </div>
          </div>

          <div className="up-tabs" style={{ marginBottom: 16 }}>
            <button className="up-tab active">Daily View</button>
            <button className="up-tab">Weekly Summary</button>
          </div>

          <div className="up-date-nav">
            <button><ChevronLeft size={16} /></button>
            <div className="up-date-display"><Calendar size={16} /> Mon, Apr 20</div>
            <button><ChevronRight size={16} /></button>
          </div>

          {historyDays.map((day, di) => (
            <div key={di} className="up-day-card">
              <div className="up-day-header"><h3>{day.date}</h3><span>{day.summary}</span></div>
              {day.meals.map((meal, mi) => (
                <div key={mi} className="up-meal-row">
                  <div className="up-meal-label">
                    <span className="emoji">{mealEmojis[meal.type]}</span>
                    <div className="up-meal-label-text"><h4>{meal.type}</h4><span>{meal.time}</span></div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="up-meal-tags">{meal.foods.map((f, fi) => <span key={fi} className="up-meal-tag">{f}</span>)}</div>
                    <div className="up-meal-macros">{meal.macros}</div>
                  </div>
                </div>
              ))}
              <div className="up-progress-row">
                <span className="up-progress-label">Calories</span>
                <div className="up-progress-bar"><div className="up-progress-fill blue" style={{ width: `${day.caloriesPct}%` }} /></div>
                <span className="up-progress-pct">{day.caloriesPct}%</span>
              </div>
              <div className="up-progress-row">
                <span className="up-progress-label">Protein</span>
                <div className="up-progress-bar"><div className="up-progress-fill purple" style={{ width: `${day.proteinPct}%` }} /></div>
                <span className="up-progress-pct">{day.proteinPct}%</span>
              </div>
            </div>
          ))}
        </>
      )}

      {/* ═══════════ MACRO GOALS VIEW ═══════════ */}
      {view === 'goals' && (
        <>
          <div className="up-page-header">
            <div><h1>Macro Goals</h1><p>Customize your daily nutrition targets</p></div>
            <div className="up-header-actions">
              <button className="up-btn"><RotateCcw size={16} /> Reset to Default</button>
              <button className="up-btn up-btn-primary"><Save size={16} /> Save Changes</button>
            </div>
          </div>

          <div className="up-phase-tip">
            <Info size={20} style={{ flexShrink: 0, marginTop: 2 }} />
            <div><strong>Luteal Phase • Day 22</strong>Increase complex carbs by 10-15% and add magnesium-rich foods to support hormonal balance.</div>
          </div>

          <div className="up-goals-layout">
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16 }}>Quick Presets</h3>
              <div className="up-presets-list">
                {presets.map((pr, i) => (
                  <div key={i} className={`up-preset-card ${activePreset === i ? 'active' : ''}`} onClick={() => { setActivePreset(i); setMacros({ protein: Math.round(calorieGoal * pr.p / 100 / 4), carbs: Math.round(calorieGoal * pr.c / 100 / 4), fats: Math.round(calorieGoal * pr.f / 100 / 9) }); }}>
                    <h4>{pr.name}</h4><p>{pr.desc}</p>
                    <div className="up-preset-badges">
                      <span className="up-preset-badge p">P: {pr.p}%</span>
                      <span className="up-preset-badge c">C: {pr.c}%</span>
                      <span className="up-preset-badge f">F: {pr.f}%</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="up-tips">
                <h4>💡 Tips</h4>
                <p>Protein: 0.8-1.2g per lb of body weight for muscle maintenance</p>
                <p>Carbs: Primary energy source, adjust based on activity level</p>
                <p>Fats: Essential for hormone production (20-35% of calories)</p>
              </div>
            </div>

            <div>
              <div className="up-card up-calorie-goal-card" style={{ marginBottom: 20 }}>
                <h3><Target size={18} style={{ color: '#22c55e' }} /> Daily Calorie Goal</h3>
                <div><input type="number" className="up-calorie-input" value={calorieGoal} onChange={e => setCalorieGoal(Number(e.target.value))} /><span className="up-calorie-unit">kcal/day</span></div>
              </div>

              <div className="up-card" style={{ marginBottom: 20 }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '1rem', fontWeight: 700, marginBottom: 16 }}><SlidersHorizontal size={18} /> Macro Distribution</h3>
                <div className="up-macro-dist-bar">
                  <div style={{ width: `${pPct}%`, background: '#2563eb' }}>{pPct}%</div>
                  <div style={{ width: `${cPct}%`, background: '#f59e0b' }}>{cPct}%</div>
                  <div style={{ width: `${fPct}%`, background: '#ef4444' }}>{fPct}%</div>
                </div>
                <div className="up-macro-inputs">
                  <div className="up-macro-input-card">
                    <h4><span className="dot" style={{ background: '#2563eb' }} /> Protein</h4>
                    <input type="number" value={macros.protein} onChange={e => setMacros({ ...macros, protein: Number(e.target.value) })} /><span className="unit">grams</span>
                    <div className="cal-info">{macros.protein * 4} calories ({pPct}%)</div>
                  </div>
                  <div className="up-macro-input-card">
                    <h4><span className="dot" style={{ background: '#f59e0b' }} /> Carbohydrates</h4>
                    <input type="number" value={macros.carbs} onChange={e => setMacros({ ...macros, carbs: Number(e.target.value) })} /><span className="unit">grams</span>
                    <div className="cal-info">{macros.carbs * 4} calories ({cPct}%)</div>
                  </div>
                  <div className="up-macro-input-card">
                    <h4><span className="dot" style={{ background: '#ef4444' }} /> Fats</h4>
                    <input type="number" value={macros.fats} onChange={e => setMacros({ ...macros, fats: Number(e.target.value) })} /><span className="unit">grams</span>
                    <div className="cal-info">{macros.fats * 9} calories ({fPct}%)</div>
                  </div>
                </div>
              </div>

              <div className="up-targets-row">
                <div className="up-target-item"><label>Total Calories</label><span>{calorieGoal} kcal</span></div>
                <div className="up-target-item"><label>Protein</label><span>{macros.protein}g ({pPct}%)</span></div>
                <div className="up-target-item"><label>Carbs</label><span>{macros.carbs}g ({cPct}%)</span></div>
                <div className="up-target-item"><label>Fats</label><span>{macros.fats}g ({fPct}%)</span></div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Food;
