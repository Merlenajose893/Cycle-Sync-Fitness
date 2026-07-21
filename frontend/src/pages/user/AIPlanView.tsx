import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/AIPlan.css';

/* ── Mock Data ── */
const mockPlan = {
    inputs: { goal: 'MUSCLE_GAIN', fitnessLevel: 'INTERMEDIATE', daysPerWeek: 6, dietPreference: 'NO_RESTRICTION' },
    dailyMacros: { calories: 2400, protein: 160, carbs: 260, fats: 70 },
    workoutPlan: [
        {
            day: 'MONDAY',
            title: 'Push Day — Chest & Shoulders',
            duration: 50,
            tags: ['Strength', 'Upper Body'],
            exercises: ['Barbell Bench Press', 'Overhead Press (OHP)', 'Incline DB Press'],
            warmup: { title: 'Light cardio + arm circles', duration: 5 },
            cooldown: { title: 'Chest & shoulder static stretches', duration: 5 },
        },
        {
            day: 'TUESDAY',
            title: 'Pull Day — Back & Biceps',
            duration: 45,
            tags: ['Strength', 'Upper Body'],
            exercises: ['Conventional Deadlift', 'Pull-ups', 'Seated Cable Row', 'Single-Arm Curls'],
            warmup: { title: 'Band pull-aparts + cat-cow', duration: 5 },
            cooldown: { title: 'Back & bicep stretches', duration: 5 },
        },
        {
            day: 'WEDNESDAY',
            title: 'Active Recovery',
            duration: 20,
            tags: ['Rest', 'Mobility'],
            exercises: ['Light Walk / Cycling', 'Hip Flexor Stretch', 'Thoracic Rotation'],
            warmup: { title: 'Dynamic stretching', duration: 3 },
            cooldown: { title: 'Deep breathing', duration: 5 },
        },
        {
            day: 'THURSDAY',
            title: 'Lower Body Power',
            duration: 55,
            tags: ['Strength', 'Legs'],
            exercises: ['Back Squat', 'Romanian Deadlift', 'Leg Press', 'Walking Lunges'],
            warmup: { title: 'Bodyweight squats + leg swings', duration: 5 },
            cooldown: { title: 'Quad & hamstring stretches', duration: 5 },
        },
    ],
    mealPlan: [
        {
            mealType: 'BREAKFAST',
            time: '7:00 - 8:00 AM',
            name: 'Oats with Banana & Protein Shake',
            ingredients: 'Rolled oats, banana, whey protein, almond milk, chia seeds',
            calories: 520,
            protein: 38,
            carbs: 62,
            fat: 9,
        },
        {
            mealType: 'LUNCH',
            time: '12:30 - 1:30 PM',
            name: 'Grilled Chicken Rice Bowl',
            ingredients: 'Chicken breast, jasmine rice, broccoli, olive oil, garlic, soy sauce',
            calories: 680,
            protein: 52,
            carbs: 74,
            fat: 12,
        },
        {
            mealType: 'SNACK',
            time: '4:00 - 4:30 PM',
            name: 'Greek Yogurt + Mixed Nuts',
            ingredients: 'Full-fat Greek yogurt, walnuts, almonds, honey, blueberries',
            calories: 280,
            protein: 18,
            carbs: 20,
            fat: 14,
        },
        {
            mealType: 'DINNER',
            time: '7:30 - 8:30 PM',
            name: 'Salmon with Quinoa & Vegetables',
            ingredients: 'Atlantic salmon, quinoa, asparagus, cherry tomatoes, lemon, dill',
            calories: 590,
            protein: 48,
            carbs: 48,
            fat: 18,
        },
    ],
    waterIntake: 3.5,
};

const DAY_ABBR: Record<string, string> = {
    MONDAY: 'MON', TUESDAY: 'TUE', WEDNESDAY: 'WED',
    THURSDAY: 'THU', FRIDAY: 'FRI', SATURDAY: 'SAT', SUNDAY: 'SUN',
};

const DAY_DATES: Record<string, number> = {
    MONDAY: 14, TUESDAY: 15, WEDNESDAY: 16,
    THURSDAY: 17, FRIDAY: 18, SATURDAY: 19, SUNDAY: 20,
};

const LABEL_MAP: Record<string, string> = {
    MUSCLE_GAIN: 'Muscle Gain',
    WEIGHT_LOSS: 'Weight Loss',
    ENDURANCE: 'Endurance',
    GENERAL_FITNESS: 'General Fitness',
    BEGINNER: 'Beginner',
    INTERMEDIATE: 'Intermediate',
    ADVANCED: 'Advanced',
};

const MEAL_TYPE_COLORS: Record<string, { bg: string; text: string }> = {
    BREAKFAST: { bg: '#FEF3C7', text: '#92400E' },
    LUNCH: { bg: '#DBEAFE', text: '#1E40AF' },
    SNACK: { bg: '#F3E8FF', text: '#6B21A8' },
    DINNER: { bg: '#DCFCE7', text: '#166534' },
};

const AIPlanView = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'workout' | 'diet'>('workout');
    const plan = mockPlan;

    const handleDayClick = (dayIndex: number) => {
        navigate(`/app/ai-plan/workout/${dayIndex}`);
    };

    return (
        <div className="aiplan-page animate-fadeIn">
            <div className="aiplan-header">
                <button className="back-btn" onClick={() => navigate('/app/ai-plan')} type="button">
                    ←
                </button>
                <h2>Your Plan</h2>
                <div className="aiplan-progress">
                    <span className="progress-dot" />
                    <span className="progress-dot" />
                    <span className="progress-dot active" />
                </div>
            </div>

            <div className="plan-view-card">
                {/* Top Bar */}
                <div className="plan-top-bar">
                    <button className="back-link" onClick={() => navigate('/app/ai-plan')} type="button">
                        ← Back
                    </button>
                </div>

                <div className="plan-meta-row">
                    <span className="ai-generated-badge">✦ AI GENERATED</span>
                    <button className="regenerate-btn" type="button">
                        <span>↻</span> Regenerate
                    </button>
                </div>

                <div className="plan-input-tags">
                    <span className="input-tag">● {LABEL_MAP[plan.inputs.goal] || plan.inputs.goal}</span>
                    <span className="input-tag">⊞ {LABEL_MAP[plan.inputs.fitnessLevel] || plan.inputs.fitnessLevel}</span>
                    <span className="input-tag">◷ {plan.inputs.daysPerWeek} days</span>
                </div>

                {/* Tabs */}
                <div className="plan-tabs">
                    <button
                        className={`plan-tab ${activeTab === 'workout' ? 'plan-tab-active' : ''}`}
                        onClick={() => setActiveTab('workout')}
                        type="button"
                    >
                        ⊞ Workout Plan
                    </button>
                    <button
                        className={`plan-tab ${activeTab === 'diet' ? 'plan-tab-active' : ''}`}
                        onClick={() => setActiveTab('diet')}
                        type="button"
                    >
                        ✎ Diet Plan
                    </button>
                </div>

                {/* Workout Tab */}
                {activeTab === 'workout' && (
                    <div className="plan-days-list">
                        {plan.workoutPlan.map((day, index) => (
                            <div
                                key={day.day}
                                className="day-card"
                                onClick={() => handleDayClick(index)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && handleDayClick(index)}
                            >
                                <div className="day-card-left">
                                    <div className="day-badge">
                                        <span className="day-abbr">{DAY_ABBR[day.day]}</span>
                                        <span className="day-date">{DAY_DATES[day.day]}</span>
                                    </div>
                                    <div className="day-info">
                                        <h3 className="day-title">{day.title}</h3>
                                        <div className="day-tags">
                                            {day.tags.map((tag) => (
                                                <span key={tag} className="day-tag">{tag}</span>
                                            ))}
                                        </div>
                                        <div className="day-exercises-preview">
                                            {day.exercises.map((ex) => (
                                                <span key={ex} className="exercise-tag">⊞ {ex}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="day-card-right">
                                    <span className="day-duration">{day.duration} min</span>
                                    <span className="day-arrow">›</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Diet Tab */}
                {activeTab === 'diet' && (
                    <div className="diet-plan-content">
                        {/* Daily Macro Summary */}
                        <div className="macro-summary-row">
                            <div className="macro-summary-card macro-calories">
                                <span className="macro-summary-value">{plan.dailyMacros.calories.toLocaleString()}</span>
                                <span className="macro-summary-label">KCAL / DAY</span>
                            </div>
                            <div className="macro-summary-card">
                                <span className="macro-summary-value">{plan.dailyMacros.protein}g</span>
                                <span className="macro-summary-label">PROTEIN</span>
                            </div>
                            <div className="macro-summary-card">
                                <span className="macro-summary-value">{plan.dailyMacros.carbs}g</span>
                                <span className="macro-summary-label">CARBS</span>
                            </div>
                            <div className="macro-summary-card">
                                <span className="macro-summary-value">{plan.dailyMacros.fats}g</span>
                                <span className="macro-summary-label">FATS</span>
                            </div>
                        </div>

                        {/* Daily Meals Section */}
                        <label className="section-label">DAILY MEALS</label>

                        <div className="diet-meals-list">
                            {plan.mealPlan.map((meal, i) => {
                                const mealColor = MEAL_TYPE_COLORS[meal.mealType] || { bg: '#F1F5F9', text: '#475569' };
                                return (
                                    <div
                                        key={meal.mealType}
                                        className="diet-meal-card"
                                        style={{ animationDelay: `${i * 0.08}s` }}
                                    >
                                        <div className="diet-meal-header">
                                            <span
                                                className="meal-type-badge"
                                                style={{ background: mealColor.bg, color: mealColor.text }}
                                            >
                                                {meal.mealType}
                                            </span>
                                            <span className="meal-calorie-badge">{meal.calories} kcal</span>
                                        </div>

                                        <div className="diet-meal-time">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10" />
                                                <polyline points="12 6 12 12 16 14" />
                                            </svg>
                                            {meal.time}
                                        </div>

                                        <h4 className="diet-meal-name">{meal.name}</h4>
                                        <p className="diet-meal-ingredients">{meal.ingredients}</p>

                                        <div className="diet-meal-macros">
                                            <span className="macro-pill macro-protein">P · {meal.protein}g</span>
                                            <span className="macro-pill macro-carbs">C · {meal.carbs}g</span>
                                            <span className="macro-pill macro-fat">F · {meal.fat}g</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Water Intake */}
                        <div className="water-intake-card">
                            <div className="water-intake-left">
                                <span className="water-icon">💧</span>
                                <div>
                                    <strong className="water-title">Water intake</strong>
                                    <p className="water-subtitle">Stay hydrated throughout the day</p>
                                </div>
                            </div>
                            <div className="water-intake-value">
                                <span className="water-amount">{plan.waterIntake} L</span>
                                <span className="water-unit">/day</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Upsell Banner */}
                <div className="upsell-banner">
                    <div className="upsell-icon">🔔</div>
                    <div className="upsell-content">
                        <h4>Want a nutritionist to review this?</h4>
                        <p>Get personalised feedback from certified nutrition experts.</p>
                    </div>
                    <button className="upsell-btn" type="button">
                        ⬆ Upgrade to Pro →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIPlanView;
