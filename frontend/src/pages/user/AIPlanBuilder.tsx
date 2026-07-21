import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const { generatePlan, getActivePlan, loading } = useAIPlan();
    
    const [goal, setGoal] = useState('');
    const [fitnessLevel, setFitnessLevel] = useState('');
    const [daysPerWeek, setDaysPerWeek] = useState<number | null>(null);
    const [dietPreference, setDietPreference] = useState('');

    const [currentStep] = useState(3); // Progress indicator

    useEffect(() => {
        const checkActivePlan = async () => {
            try {
                const activePlan = await getActivePlan();
                if (activePlan) {
                    navigate('/app/ai-plan/view', { replace: true });
                }
            } catch (error) {
                // If no plan, just stay on the builder
                console.log(error);
            }
        };
        checkActivePlan();
    }, [getActivePlan, navigate]);

    const isFormValid = goal && fitnessLevel && daysPerWeek && dietPreference;

    const handleGenerate = async () => {
        if (!isFormValid) return;
        try {
            await generatePlan({
                goal: goal as Goal,
                fitnessLevel: fitnessLevel as FitnessLevel,
                daysPerWeek: daysPerWeek!,
                dietPreference: dietPreference as DietPreference,
            });
            toast.success("Plan generated successfully!");
            navigate('/app/ai-plan/view');
        } catch (error) {
            toast.error("Failed to generate plan");
        }
    };

    return (
        <div className="aiplan-page animate-fadeIn">
            <div className="aiplan-header">
                <h2>AI Plan Builder</h2>
                <div className="aiplan-progress">
                    {[0, 1, 2, 3].map((i) => (
                        <span key={i} className={`progress-dot ${i < currentStep ? 'active' : ''}`} />
                    ))}
                </div>
            </div>

            <div className="aiplan-builder-card">
                <div className="builder-badge">✦ AI PLAN BUILDER</div>
                <h1 className="builder-title">
                    Build your <span className="text-gradient">plan</span>
                </h1>
                <p className="builder-subtitle">
                    Tell us about yourself and our AI will craft a personalised workout and
                    nutrition plan — just for you.
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

                {/* Generate Button */}
                <button
                    className={`generate-btn ${isFormValid ? '' : 'generate-btn-disabled'}`}
                    onClick={handleGenerate}
                    disabled={!isFormValid || loading}
                    type="button"
                >
                    {loading ? (
                        <>
                            <span className="spinner" /> Generating...
                        </>
                    ) : (
                        <>
                            <span>+</span> Generate my plan
                            <span className="ai-badge">AI</span>
                        </>
                    )}
                </button>

                <p className="builder-footnote">
                    ⓘ Your plan is generated by AI and updated weekly based on your progress.
                </p>
            </div>
        </div>
    );
};

export default AIPlanBuilder;
