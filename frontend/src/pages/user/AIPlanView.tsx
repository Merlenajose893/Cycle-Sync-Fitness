import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/AIPlan.css';

/* ── Mock Data ── */
const mockPlan = {
    inputs: { goal: 'MUSCLE_GAIN', fitnessLevel: 'INTERMEDIATE', daysPerWeek: 6, dietPreference: 'NO_RESTRICTION' },
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
            day: 'MONDAY',
            meals: [
                { mealType: 'BREAKFAST', name: 'Protein Oatmeal Bowl', calories: 450, protein: 35, carbs: 55, fat: 12 },
                { mealType: 'LUNCH', name: 'Grilled Chicken & Rice', calories: 620, protein: 45, carbs: 65, fat: 15 },
                { mealType: 'DINNER', name: 'Salmon with Quinoa', calories: 550, protein: 40, carbs: 45, fat: 20 },
            ],
        },
        {
            day: 'TUESDAY',
            meals: [
                { mealType: 'BREAKFAST', name: 'Egg & Avocado Toast', calories: 400, protein: 22, carbs: 35, fat: 22 },
                { mealType: 'LUNCH', name: 'Turkey Wrap', calories: 520, protein: 38, carbs: 45, fat: 18 },
                { mealType: 'DINNER', name: 'Lean Beef Stir-fry', calories: 580, protein: 42, carbs: 50, fat: 16 },
            ],
        },
        {
            day: 'WEDNESDAY',
            meals: [
                { mealType: 'BREAKFAST', name: 'Greek Yogurt Parfait', calories: 350, protein: 28, carbs: 40, fat: 10 },
                { mealType: 'LUNCH', name: 'Tuna Salad Bowl', calories: 480, protein: 40, carbs: 30, fat: 20 },
                { mealType: 'DINNER', name: 'Chicken Pasta', calories: 600, protein: 38, carbs: 65, fat: 14 },
            ],
        },
        {
            day: 'THURSDAY',
            meals: [
                { mealType: 'BREAKFAST', name: 'Smoothie Bowl', calories: 380, protein: 30, carbs: 45, fat: 12 },
                { mealType: 'LUNCH', name: 'Chicken Burrito Bowl', calories: 550, protein: 42, carbs: 55, fat: 16 },
                { mealType: 'DINNER', name: 'Grilled Fish & Veggies', calories: 480, protein: 38, carbs: 35, fat: 18 },
            ],
        },
    ],
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

const MEAL_ICONS: Record<string, string> = {
    BREAKFAST: '🌅',
    MORNING_SNACK: '🍎',
    LUNCH: '☀️',
    EVENING_SNACK: '🍌',
    DINNER: '🌙',
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
                    <div className="plan-days-list">
                        {plan.mealPlan.map((day) => (
                            <div key={day.day} className="day-card diet-day-card">
                                <div className="day-card-left">
                                    <div className="day-badge diet-badge">
                                        <span className="day-abbr">{DAY_ABBR[day.day]}</span>
                                        <span className="day-date">{DAY_DATES[day.day]}</span>
                                    </div>
                                    <div className="day-info">
                                        <h3 className="day-title">{DAY_ABBR[day.day]}'s Meals</h3>
                                        <div className="meals-list">
                                            {day.meals.map((meal) => (
                                                <div key={meal.mealType} className="meal-row">
                                                    <span className="meal-icon">{MEAL_ICONS[meal.mealType] || '🍽️'}</span>
                                                    <div className="meal-info">
                                                        <span className="meal-name">{meal.name}</span>
                                                        <span className="meal-macros">
                                                            {meal.calories} cal · P {meal.protein}g · C {meal.carbs}g · F {meal.fat}g
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
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
