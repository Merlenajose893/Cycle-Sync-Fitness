import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/AIPlan.css';
import { useAIPlan } from '../../hooks/aiplan/useAIPlan';
import { Goal, FitnessLevel, DietPreference } from '../../types/aiplan.types';
import toast from 'react-hot-toast';

const GOALS = [
    { value: 'MUSCLE_GAIN', label: 'Muscle Gain', icon: '💪' },
    { value: 'WEIGHT_LOSS', label: 'Weight Loss', icon: '🔥' },
    { value: 'ENDURANCE', label: 'Endurance', icon: '🏃' },
    { value: 'GENERAL_FITNESS', label: 'General Fitness', icon: '⚡' },
];

const FITNESS_LEVELS = [
    { value: 'BEGINNER', label: 'Beginner', icon: '🌱' },
    { value: 'INTERMEDIATE', label: 'Intermediate', icon: '⚡' },
    { value: 'ADVANCED', label: 'Advanced', icon: '🏆' },
];

const DAYS_OPTIONS = [3, 4, 5, 6];

const DIET_PREFERENCES = [
    { value: 'NO_RESTRICTION', label: 'No Restriction', icon: '🍽️' },
    { value: 'VEGETARIAN', label: 'Vegetarian', icon: '🥦' },
    { value: 'VEGAN', label: 'Vegan', icon: '🌿' },
    { value: 'KETO', label: 'Keto', icon: '🥑' },
    { value: 'PALEO', label: 'Paleo', icon: '🥩' },
];

const AIPlanBuilder = () => {
    const navigate = useNavigate();
    const { planId } = useParams<{ planId?: string }>();
    const { generatePlan, createDraftPlan, editPlan, getActivePlan, getPlanHistory, loading } = useAIPlan();

    const [goal, setGoal] = useState('');
    const [fitnessLevel, setFitnessLevel] = useState('');
    const [daysPerWeek, setDaysPerWeek] = useState<number | null>(null);
    const [dietPreference, setDietPreference] = useState('');
    const isEditMode = Boolean(planId);

    const [currentStep] = useState(3);

    useEffect(() => {
        const checkOrLoadPlan = async () => {
            if (isEditMode && planId) {
                try {
                    const history = await getPlanHistory();
                    const target = history?.find(p => p._id === planId);
                    if (target) {
                        setGoal(target.inputs.goal);
                        setFitnessLevel(target.inputs.fitnessLevel);
                        setDaysPerWeek(target.inputs.daysPerWeek);
                        setDietPreference(target.inputs.dietPreference);
                    }
                } catch (error) {
                    console.error("Failed to load plan for editing", error);
                }
            } else {
                try {
                    const activePlan = await getActivePlan();
                    if (activePlan) {
                        navigate('/app/ai-plan/view', { replace: true });
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        };
        checkOrLoadPlan();
    }, [getActivePlan, getPlanHistory, isEditMode, navigate, planId]);

    const isFormValid = goal && fitnessLevel && daysPerWeek && dietPreference;

    const handleGenerateActive = async () => {
        if (!isFormValid) return;
        try {
            if (isEditMode && planId) {
                await editPlan(planId, {
                    inputs: {
                        goal: goal as Goal,
                        fitnessLevel: fitnessLevel as FitnessLevel,
                        daysPerWeek: daysPerWeek!,
                        dietPreference: dietPreference as DietPreference,
                    }
                });
                toast.success("Plan updated successfully!");
            } else {
                await generatePlan({
                    goal: goal as Goal,
                    fitnessLevel: fitnessLevel as FitnessLevel,
                    daysPerWeek: daysPerWeek!,
                    dietPreference: dietPreference as DietPreference,
                });
                toast.success("Active plan generated successfully!");
            }
            navigate('/app/ai-plan/view');
        } catch (error) {
            toast.error("Failed to process plan");
        }
    };

    const handleSaveDraft = async () => {
        if (!isFormValid) return;
        try {
            await createDraftPlan({
                goal: goal as Goal,
                fitnessLevel: fitnessLevel as FitnessLevel,
                daysPerWeek: daysPerWeek!,
                dietPreference: dietPreference as DietPreference,
            });
            toast.success("Draft plan saved successfully!");
            navigate('/app/ai-plan/history');
        } catch (error) {
            toast.error("Failed to save draft plan");
        }
    };

    return (
        <div className="aiplan-page animate-fadeIn">
            <div className="aiplan-header">
                <h2>{isEditMode ? 'Edit AI Plan' : 'AI Plan Builder'}</h2>
                <div className="aiplan-progress">
                    {[0, 1, 2, 3].map((i) => (
                        <span key={i} className={`progress-dot ${i < currentStep ? 'active' : ''}`} />
                    ))}
                </div>
            </div>

            <div className="aiplan-builder-card">
                <div className="builder-badge">✦ {isEditMode ? 'EDIT MODE' : 'AI PLAN BUILDER'}</div>
                <h1 className="builder-title">
                    {isEditMode ? 'Update your ' : 'Build your '}
                    <span className="text-gradient">plan</span>
                </h1>
                <p className="builder-subtitle">
                    Tell us about yourself and our AI will craft a personalised workout and nutrition plan.
                </p>

                {/* Goal */}
                <div className="builder-section">
                    <label className="section-label">YOUR GOAL</label>
                    <div className="pill-group">
                        {GOALS.map((g) => (
                            <button
                                key={g.value}
                                className={`pill ${goal === g.value ? 'pill-active' : ''}`}
                                onClick={() => setGoal(g.value)}
                                type="button"
                            >
                                <span className="pill-icon">{g.icon}</span>
                                {g.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Fitness Level */}
                <div className="builder-section">
                    <label className="section-label">FITNESS LEVEL</label>
                    <div className="pill-group">
                        {FITNESS_LEVELS.map((f) => (
                            <button
                                key={f.value}
                                className={`pill ${fitnessLevel === f.value ? 'pill-active' : ''}`}
                                onClick={() => setFitnessLevel(f.value)}
                                type="button"
                            >
                                <span className="pill-icon">{f.icon}</span>
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Days Per Week */}
                <div className="builder-section">
                    <label className="section-label">DAYS PER WEEK</label>
                    <div className="pill-group">
                        {DAYS_OPTIONS.map((d) => (
                            <button
                                key={d}
                                className={`pill pill-compact ${daysPerWeek === d ? 'pill-active' : ''}`}
                                onClick={() => setDaysPerWeek(d)}
                                type="button"
                            >
                                {d} days
                            </button>
                        ))}
                    </div>
                </div>

                {/* Diet Preference */}
                <div className="builder-section">
                    <label className="section-label">DIET PREFERENCE</label>
                    <div className="pill-group">
                        {DIET_PREFERENCES.map((dp) => (
                            <button
                                key={dp.value}
                                className={`pill ${dietPreference === dp.value ? 'pill-active' : ''}`}
                                onClick={() => setDietPreference(dp.value)}
                                type="button"
                            >
                                <span className="pill-icon">{dp.icon}</span>
                                {dp.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                    <button
                        className={`generate-btn ${isFormValid ? '' : 'generate-btn-disabled'}`}
                        onClick={handleGenerateActive}
                        disabled={!isFormValid || loading}
                        type="button"
                        style={{ flex: 2 }}
                    >
                        {loading ? (
                            <>
                                <span className="spinner" /> Processing...
                            </>
                        ) : (
                            <>
                                <span>+</span> {isEditMode ? 'Update & Activate' : 'Generate Active Plan'}
                                <span className="ai-badge">AI</span>
                            </>
                        )}
                    </button>

                    {!isEditMode && (
                        <button
                            className="btn-secondary"
                            onClick={handleSaveDraft}
                            disabled={!isFormValid || loading}
                            type="button"
                            style={{
                                flex: 1,
                                padding: '14px 20px',
                                borderRadius: '14px',
                                border: '1px solid #cbd5e1',
                                background: '#f8fafc',
                                color: '#334155',
                                fontWeight: 600,
                                cursor: isFormValid ? 'pointer' : 'not-allowed'
                            }}
                        >
                            Save as Draft
                        </button>
                    )}
                </div>

                <p className="builder-footnote" style={{ marginTop: '16px' }}>
                    ⓘ Your plan is generated by AI and updated based on your goals.
                </p>
            </div>
        </div>
    );
};

export default AIPlanBuilder;
