import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/AIPlan.css';
import { useAIPlan } from '../../hooks/aiplan/useAIPlan';
import type { AIPlan } from '../../types/aiplan.types';
import { showToast } from '../../components/common/Toast/Toast';
import Modal from '../../components/common/Modal/Modal';
import { Trash2, Archive, Edit, History, AlertCircle } from 'lucide-react';

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
    MORNING_SNACK: { bg: '#F3E8FF', text: '#6B21A8' },
    LUNCH: { bg: '#DBEAFE', text: '#1E40AF' },
    EVENING_SNACK: { bg: '#F3E8FF', text: '#6B21A8' },
    DINNER: { bg: '#DCFCE7', text: '#166534' },
};

const MEAL_TIMES: Record<string, string> = {
    BREAKFAST: '7:00 - 8:00 AM',
    MORNING_SNACK: '10:30 - 11:00 AM',
    LUNCH: '1:00 - 2:00 PM',
    EVENING_SNACK: '4:30 - 5:00 PM',
    DINNER: '7:30 - 8:30 PM'
};

const AIPlanView = () => {
    const navigate = useNavigate();
    const { getActivePlan, generatePlan, updatePlanStatus, deletePlan, loading } = useAIPlan();
    
    const [activeTab, setActiveTab] = useState<'workout' | 'diet'>('workout');
    const [plan, setPlan] = useState<AIPlan | null>(null);
    const [fetching, setFetching] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);

    useEffect(() => {
        const fetchPlan = async () => {
            try {
                const activePlan = await getActivePlan();
                if (!activePlan) {
                    navigate('/app/ai-plan', { replace: true });
                } else {
                    setPlan(activePlan);
                }
            } catch (error) {
                console.error(error);
                navigate('/app/ai-plan', { replace: true });
            } finally {
                setFetching(false);
            }
        };
        fetchPlan();
    }, [getActivePlan, navigate]);

    const handleDayClick = (dayIndex: number) => {
        navigate(`/app/ai-plan/workout/${dayIndex}`);
    };

    const handleRegenerate = async () => {
        if (!plan) return;
        try {
            await generatePlan(plan.inputs);
            const fresh = await getActivePlan();
            setPlan(fresh || null);
            showToast.success("Plan regenerated!");
        } catch (error) {
            showToast.error("Failed to regenerate plan");
        }
    };

    const handleConfirmArchive = async () => {
        if (!plan) return;
        try {
            await updatePlanStatus(plan._id, 'ARCHIVED');
            showToast.success("Plan archived");
            setIsArchiveModalOpen(false);
            navigate('/app/ai-plan/history');
        } catch (error) {
            showToast.error("Failed to archive plan");
        }
    };

    const handleConfirmDelete = async () => {
        if (!plan) return;
        try {
            await deletePlan(plan._id);
            showToast.success("Plan deleted successfully");
            setIsDeleteModalOpen(false);
            navigate('/app/ai-plan');
        } catch (error) {
            showToast.error("Failed to delete plan");
        }
    };

    if (fetching) {
        return (
            <div className="aiplan-page animate-fadeIn">
                <div className="aiplan-header">
                    <h2>Loading Plan...</h2>
                </div>
                <div className="plan-view-card" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                    <span className="spinner" style={{ width: '40px', height: '40px', borderWidth: '4px' }} />
                </div>
            </div>
        );
    }

    if (!plan) return null;

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'ACTIVE':
                return { bg: '#DCFCE7', text: '#15803D' };
            case 'DRAFT':
                return { bg: '#FEF3C7', text: '#B45309' };
            case 'ARCHIVED':
                return { bg: '#F1F5F9', text: '#64748B' };
            default:
                return { bg: '#E2E8F0', text: '#334155' };
        }
    };

    const statusStyle = getStatusStyle(plan.status);

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
                <div className="plan-top-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button className="back-link" onClick={() => navigate('/app/ai-plan')} type="button">
                        ← Back
                    </button>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            className="btn-secondary"
                            onClick={() => navigate('/app/ai-plan/history')}
                            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}
                        >
                            <History size={15} /> History
                        </button>
                        <button
                            className="btn-secondary"
                            onClick={() => navigate(`/app/ai-plan/edit/${plan._id}`)}
                            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}
                        >
                            <Edit size={15} /> Edit
                        </button>
                        {plan.status === 'ACTIVE' && (
                            <button
                                className="btn-secondary"
                                onClick={() => setIsArchiveModalOpen(true)}
                                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', color: '#64748b' }}
                            >
                                <Archive size={15} /> Archive
                            </button>
                        )}
                        <button
                            className="btn-danger"
                            onClick={() => setIsDeleteModalOpen(true)}
                            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '8px', border: 'none', background: '#ef4444', color: '#fff', cursor: 'pointer' }}
                        >
                            <Trash2 size={15} /> Delete
                        </button>
                    </div>
                </div>

                <div className="plan-meta-row">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span className="ai-generated-badge">✦ AI GENERATED</span>
                        <span style={{
                            padding: '4px 10px',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            backgroundColor: statusStyle.bg,
                            color: statusStyle.text
                        }}>
                            {plan.status}
                        </span>
                    </div>
                    <button className="regenerate-btn" onClick={handleRegenerate} disabled={loading} type="button">
                        {loading ? <span className="spinner" /> : <span>↻</span>} 
                        {loading ? ' Regenerating' : ' Regenerate'}
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
                                        <span className="day-abbr">{DAY_ABBR[day.day] || day.day.slice(0,3)}</span>
                                        <span className="day-date">{DAY_DATES[day.day] || 14}</span>
                                    </div>
                                    <div className="day-info">
                                        <h3 className="day-title">{day.title}</h3>
                                        <div className="day-tags">
                                            <span className="day-tag">{day.exercises.length > 0 ? 'Workout' : 'Rest'}</span>
                                        </div>
                                        <div className="day-exercises-preview">
                                            {day.exercises.map((ex) => (
                                                <span key={ex.name} className="exercise-tag">⊞ {ex.name}</span>
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
                {activeTab === 'diet' && plan.mealPlan.length > 0 && (
                    <div className="diet-plan-content">
                        {/* Daily Macro Summary */}
                        <div className="macro-summary-row">
                            <div className="macro-summary-card macro-calories">
                                <span className="macro-summary-value">{plan.summary.dailyCalories.toLocaleString()}</span>
                                <span className="macro-summary-label">KCAL / DAY</span>
                            </div>
                            <div className="macro-summary-card">
                                <span className="macro-summary-value">{plan.summary.protein}g</span>
                                <span className="macro-summary-label">PROTEIN</span>
                            </div>
                            <div className="macro-summary-card">
                                <span className="macro-summary-value">{plan.summary.carbs}g</span>
                                <span className="macro-summary-label">CARBS</span>
                            </div>
                            <div className="macro-summary-card">
                                <span className="macro-summary-value">{plan.summary.fat}g</span>
                                <span className="macro-summary-label">FATS</span>
                            </div>
                        </div>

                        {/* Daily Meals Section */}
                        <label className="section-label">DAILY MEALS (DAY 1)</label>

                        <div className="diet-meals-list">
                            {plan.mealPlan[0].meals.map((meal, i) => {
                                const mealColor = MEAL_TYPE_COLORS[meal.mealType] || { bg: '#F1F5F9', text: '#475569' };
                                const displayTime = MEAL_TIMES[meal.mealType] || 'Anytime';
                                const displayIngredients = meal.ingredients ? meal.ingredients.join(', ') : '';

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
                                                {meal.mealType.replace('_', ' ')}
                                            </span>
                                            <span className="meal-calorie-badge">{meal.calories} kcal</span>
                                        </div>

                                        <div className="diet-meal-time">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10" />
                                                <polyline points="12 6 12 12 16 14" />
                                            </svg>
                                            {displayTime}
                                        </div>

                                        <h4 className="diet-meal-name">{meal.name}</h4>
                                        <p className="diet-meal-ingredients">{displayIngredients}</p>

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
                                <span className="water-amount">{plan.summary.waterIntake} L</span>
                                <span className="water-unit">/day</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal for Plan Archive */}
            <Modal
                isOpen={isArchiveModalOpen}
                onClose={() => setIsArchiveModalOpen(false)}
                title="Archive AI Plan"
                confirmText="Archive Plan"
                variant="primary"
                onConfirm={handleConfirmArchive}
                isLoading={loading}
            >
                <p>Are you sure you want to archive this AI plan? Archived plans will move to your plan history.</p>
            </Modal>

            {/* Modal for Plan Deletion */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete AI Plan"
                confirmText="Delete Plan"
                variant="danger"
                onConfirm={handleConfirmDelete}
                isLoading={loading}
            >
                <p>Are you sure you want to delete this AI plan? This action cannot be undone.</p>
            </Modal>
        </div>
    );
};

export default AIPlanView;
