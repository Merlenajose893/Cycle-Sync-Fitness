import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowRight,
    ArrowLeft,
    CheckCircle,
    User,
    Target,
    Activity,
    Zap,
    Dumbbell,
    Moon,
    TrendingUp,
    Heart,
    Baby,
    Star
} from 'lucide-react';
import '../../styles/Auth.css';

import { useUserOnboarding } from '../../hooks/onboarding/useUserOnboarding';

const Onboarding: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [bodyDetails, setBodyDetails] = useState({
        height: "",
        weight: "",
        dateOfBirth: "",
        biologicalSex: ""
    });
    const [cycleSetup, setCycleSetUp] = useState({
        averageCycleLength: "",
        averagePeriodLength: "",
        lastPeriodStart: "",
        birthControl: "",
    });
    const [goals, setGoals] = useState({
        primaryGoal: "" as "" | "weight_loss" | "muscle_gain" | "hormone_balance" | "general_health",
        targetWeight: "",
        activityLevel: "" as "" | "sedentary" | "lightActive" | "moderatelyActive",
    });

    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
    const { loading, error, updateBodyDetails, updateCycleSetUp, updateGoals, completeOnboarding } = useUserOnboarding();

    const steps = [
        { id: 1, title: 'Identity', icon: User, sideTitle: 'Start your journey', sideQuote: '"The most important step is the first one."', sideImage: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=1200' },
        { id: 2, title: 'Goals', icon: Target, sideTitle: 'Set your vision', sideQuote: '"Goals are dreams with deadlines."', sideImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1200' },
        { id: 3, title: 'Biosync', icon: Activity, sideTitle: 'Align your health', sideQuote: '"Listen to your body\'s natural rhythm."', sideImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200' },
        { id: 4, title: 'Plan', icon: Zap, sideTitle: 'Your optimal path', sideQuote: '"Predicting the future is easy when you control it."', sideImage: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=1200' },
    ];

    const currentStepData = steps.find(s => s.id === step)!;

    // Map UI goal IDs to backend primaryGoal values
    const goalToBackendMap: Record<string, "weight_loss" | "muscle_gain" | "hormone_balance" | "general_health"> = {
        Weight: "weight_loss",
        Muscle: "muscle_gain",
        CycleSync: "hormone_balance",
        Sleep: "general_health",
        Mood: "general_health",
        Pregnancy: "general_health",
    };

    const handleNext = async () => {
        try {
            if (step === 1) {
                await updateBodyDetails({
                    height: Number(bodyDetails.height),
                    weight: Number(bodyDetails.weight),
                    dateOfBirth: bodyDetails.dateOfBirth as unknown as number,
                    biologicalSex: bodyDetails.biologicalSex,
                });
                setStep(2);
            } else if (step === 2) {
                // Map the first selected goal to primaryGoal for the backend
                const firstGoal = selectedGoals[0];
                const primaryGoal = firstGoal ? goalToBackendMap[firstGoal] : undefined;
                console.log(firstGoal, primaryGoal);


                await updateGoals({
                    primaryGoal: primaryGoal,
                    targetWeight: goals.targetWeight ? Number(goals.targetWeight) : undefined,
                    activityLevel: goals.activityLevel || undefined,
                });
                setStep(3);
            } else if (step === 3) {
                await updateCycleSetUp({
                    averageCycleLength: cycleSetup.averageCycleLength ? Number(cycleSetup.averageCycleLength) : undefined,
                    averagePeriodLength: cycleSetup.averagePeriodLength ? Number(cycleSetup.averagePeriodLength) : undefined,
                    lastPeriodStart: cycleSetup.lastPeriodStart ? new Date(cycleSetup.lastPeriodStart) : undefined,
                    birthControl: cycleSetup.birthControl || undefined,
                });
                setStep(4);
            } else if (step === 4) {
                await completeOnboarding();
                navigate('/app');
            }
        } catch (err) {
            console.error("Onboarding step error:", err);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const toggleGoal = (goalId: string) => {
        setSelectedGoals(prev =>
            prev.includes(goalId)
                ? prev.filter(g => g !== goalId)
                : [...prev, goalId]
        );
    };

    const goalOptions = [
        { id: 'CycleSync', label: 'Track Cycle', icon: Activity, color: '#0d9488' },
        { id: 'Weight', label: 'Lose Weight', icon: Heart, color: '#0ea5e9' },
        { id: 'Muscle', label: 'Gain Muscle', icon: Dumbbell, color: '#8b5cf6' },
        { id: 'Sleep', label: 'Improve Sleep', icon: Moon, color: '#3b82f6' },
        { id: 'Mood', label: 'Mood Tracking', icon: TrendingUp, color: '#f43f5e' },
        { id: 'Pregnancy', label: 'Get Pregnant', icon: Baby, color: '#ec4899' },
    ];

    return (
        <div className="auth-wrapper">
            {/* Form Section */}
            <div className="auth-container" style={{ padding: '40px 60px' }}>
                <div className="auth-brand">
                    <div className="auth-logo">C</div>
                    <h1>CycleSync <span>AI</span></h1>
                </div>

                <div className="onboarding-flow-container">
                    {/* Progress indicator */}
                    <div className="onboarding-steps">
                        {steps.map(s => (
                            <div key={s.id} className={`step-dot ${step === s.id ? 'active' : ''} ${step > s.id ? 'completed' : ''}`}>
                                <div className="dot">
                                    {step > s.id ? <CheckCircle size={14} /> : <span>{s.id}</span>}
                                </div>
                                <span>{s.title}</span>
                            </div>
                        ))}
                        <div className="progress-line">
                            <div className="progress-fill" style={{ width: `${((step - 1) / 3) * 100}%` }} />
                        </div>
                    </div>

                    {/* Error display */}
                    {error && (
                        <div style={{
                            background: '#fef2f2',
                            border: '1px solid #fecaca',
                            color: '#dc2626',
                            padding: '12px 16px',
                            borderRadius: '8px',
                            marginBottom: '16px',
                            fontSize: '0.9rem',
                            fontWeight: 500,
                        }}>
                            {error}
                        </div>
                    )}

                    <div className="auth-card animate-slideUp">
                        {/* Step 1: Identity */}
                        {step === 1 && (
                            <div className="animate-fadeIn">
                                <h1 className="onboarding-title">Welcome back</h1>
                                <p className="onboarding-p"> Let's personalize your health journey by learning a little more about your body.</p>
                                <div className="form-group-row">
                                    <div className="form-group">
                                        <label>Height (cm)</label>

                                        <div className="input-wrapper">
                                            <TrendingUp size={18} className="input-icon" />

                                            <input
                                                type="number"
                                                placeholder="170"
                                                value={bodyDetails.height}
                                                onChange={(e) =>
                                                    setBodyDetails({
                                                        ...bodyDetails,
                                                        height: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Weight (kg)</label>

                                        <div className="input-wrapper">
                                            <Heart size={18} className="input-icon" />

                                            <input
                                                type="number"
                                                placeholder="60"
                                                value={bodyDetails.weight}
                                                onChange={(e) =>
                                                    setBodyDetails({
                                                        ...bodyDetails,
                                                        weight: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group-row">
                                    <div className="form-group">
                                        <label>Date of Birth</label>

                                        <div className="input-wrapper">
                                            <User size={18} className="input-icon" />

                                            <input
                                                type="date"
                                                value={bodyDetails.dateOfBirth}
                                                onChange={(e) =>
                                                    setBodyDetails({
                                                        ...bodyDetails,
                                                        dateOfBirth: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Biological Sex</label>

                                        <div className="input-wrapper">
                                            <select
                                                className="select-input"
                                                value={bodyDetails.biologicalSex}
                                                onChange={(e) =>
                                                    setBodyDetails({
                                                        ...bodyDetails,
                                                        biologicalSex: e.target.value,
                                                    })
                                                }
                                            >
                                                <option value="">Select</option>
                                                <option value="female">Female</option>
                                                <option value="male">Male</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )}

                        {/* Step 2: Goals */}
                        {step === 2 && (
                            <div className="animate-fadeIn">
                                <h1 className="onboarding-title">What are your goals?</h1>
                                <p className="onboarding-p">Select the focus areas for your AI-personalized plan.</p>

                                <div className="goals-grid">
                                    {goalOptions.map(goal => {
                                        const Icon = goal.icon;
                                        const isActive = selectedGoals.includes(goal.id);
                                        return (
                                            <div
                                                key={goal.id}
                                                className={`goal-card ${isActive ? 'active' : ''}`}
                                                onClick={() => toggleGoal(goal.id)}
                                            >
                                                <div className="goal-icon" style={{ background: isActive ? goal.color : 'var(--bg-primary)', color: isActive ? 'white' : goal.color }}>
                                                    <Icon size={22} />
                                                </div>
                                                <span className="goal-label">{goal.label}</span>
                                                {isActive && <CheckCircle size={16} className="goal-check" />}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Activity Level */}
                                <div className="form-group" style={{ marginTop: '16px' }}>
                                    <label>Activity Level</label>
                                    <div className="input-wrapper">
                                        <select
                                            className="select-input"
                                            value={goals.activityLevel}
                                            onChange={(e) => setGoals({ ...goals, activityLevel: e.target.value as typeof goals.activityLevel })}
                                        >
                                            <option value="">Select</option>
                                            <option value="sedentary">Sedentary</option>
                                            <option value="lightActive">Lightly Active</option>
                                            <option value="moderatelyActive">Moderately Active</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Target Weight */}
                                <div className="form-group" style={{ marginTop: '16px' }}>
                                    <label>Target Weight (kg) — optional</label>
                                    <div className="input-wrapper">
                                        <Target size={18} className="input-icon" />
                                        <input
                                            type="number"
                                            placeholder="55"
                                            value={goals.targetWeight}
                                            onChange={(e) => setGoals({ ...goals, targetWeight: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Biosync */}
                        {step === 3 && (
                            <div className="animate-fadeIn">
                                <h1 className="onboarding-title">Biological Sync</h1>
                                <p className="onboarding-p">Help us accurately map your cycle phases for optimal performance.</p>

                                <div className="form-group" style={{ marginBottom: '24px' }}>
                                    <label>Average Cycle Length (Days)</label>
                                    <div className="input-wrapper">
                                        <Activity size={18} className="input-icon" />
                                        <input
                                            type="number"
                                            placeholder="28"
                                            value={cycleSetup.averageCycleLength}
                                            onChange={(e) => setCycleSetUp({ ...cycleSetup, averageCycleLength: e.target.value })}
                                        />
                                    </div>
                                    <p className="input-hint">Most cycles are between 21 and 35 days.</p>
                                </div>

                                <div className="form-group" style={{ marginBottom: '24px' }}>
                                    <label>Average Period Duration (Days)</label>
                                    <div className="input-wrapper">
                                        <Activity size={18} className="input-icon" />
                                        <input
                                            type="number"
                                            placeholder="5"
                                            value={cycleSetup.averagePeriodLength}
                                            onChange={(e) => setCycleSetUp({ ...cycleSetup, averagePeriodLength: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="form-group" style={{ marginBottom: '24px' }}>
                                    <label>Last Period Start Date</label>
                                    <div className="input-wrapper">
                                        <User size={18} className="input-icon" />
                                        <input
                                            type="date"
                                            value={cycleSetup.lastPeriodStart}
                                            onChange={(e) => setCycleSetUp({ ...cycleSetup, lastPeriodStart: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Birth Control (optional)</label>
                                    <div className="input-wrapper">
                                        <select
                                            className="select-input"
                                            value={cycleSetup.birthControl}
                                            onChange={(e) => setCycleSetUp({ ...cycleSetup, birthControl: e.target.value })}
                                        >
                                            <option value="">None</option>
                                            <option value="pill">Pill</option>
                                            <option value="iud">IUD</option>
                                            <option value="implant">Implant</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Subscription Plan Suggestion */}
                        {step === 4 && (
                            <div className="animate-fadeIn">
                                <div className="ai-analysis-header">
                                    <div className="pulse-ai-icon">
                                        <Zap size={32} />
                                    </div>
                                    <h1 className="onboarding-title" style={{ fontSize: '1.75rem' }}>AI Analysis Complete</h1>
                                    <p className="onboarding-p" style={{ marginBottom: '24px' }}>We've constructed your performance path. Choose a plan below to start syncing.</p>
                                </div>

                                <div className="plans-stack" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                                    <div
                                        className="stacked-plan-card selected"
                                        style={{
                                            position: 'relative',
                                            border: `2px solid #534AB7`,
                                            background: '#F0EFFE',
                                            borderRadius: 'var(--radius-lg)', padding: '24px',
                                            display: 'flex', flexDirection: 'column', gap: '12px',
                                            boxShadow: '0 8px 24px rgba(83,74,183,0.15)'
                                        }}
                                    >
                                        <div style={{
                                            position: 'absolute', top: '-12px', right: '24px',
                                            background: '#1D9E75', color: 'white', padding: '4px 12px',
                                            borderRadius: '999px', fontSize: '0.8rem', fontWeight: 800,
                                            display: 'flex', alignItems: 'center', gap: '4px',
                                            boxShadow: '0 4px 10px rgba(29, 158, 117, 0.3)'
                                        }}>
                                            <Star size={12} fill="white" /> 100% Free
                                        </div>
                                        <h4 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#534AB7', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                                            7-Day AI Protocol
                                        </h4>
                                        <p style={{ fontSize: '0.95rem', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                                            Your first week is completely free. We use AI to generate your personalised workout and nutrition plans so you can start right away.
                                        </p>
                                        <ul style={{ padding: 0, margin: '8px 0 0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#334155', fontWeight: 600 }}>
                                                <CheckCircle size={16} color="#1D9E75" /> Personalised AI Workouts
                                            </li>
                                            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#334155', fontWeight: 600 }}>
                                                <CheckCircle size={16} color="#1D9E75" /> Cycle-Synced Food Nudges
                                            </li>
                                            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#334155', fontWeight: 600 }}>
                                                <CheckCircle size={16} color="#1D9E75" /> No Money Needed Today
                                            </li>
                                        </ul>
                                    </div>

                                    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                        <div style={{ flexShrink: 0, color: '#F59E0B' }}>
                                            <Zap size={20} />
                                        </div>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                                            <strong>Day 8 onwards:</strong> A certified personal trainer will be assigned to take over your plan. At that point, a premium subscription will be required to continue.
                                        </p>
                                    </div>

                                </div>
                            </div>
                        )}

                        <div className="onboarding-footer">
                            <button
                                onClick={handleBack}
                                className={`btn btn-ghost ${step === 1 ? 'hidden' : ''}`}
                                disabled={loading}
                            >
                                <ArrowLeft size={18} /> Back
                            </button>
                            <button
                                onClick={handleNext}
                                className="btn btn-premium"
                                style={{ minWidth: '160px' }}
                                disabled={loading}
                            >
                                {loading ? (
                                    'Saving...'
                                ) : (
                                    <>
                                        {step === 4 ? 'Launch Dashboard' : step === 3 ? 'Analyze My Biology' : 'Continue'} <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidepanel with Dynamic Content */}
            <div
                className="auth-side animate-fadeIn"
                style={{
                    backgroundImage: `linear-gradient(135deg, rgba(13, 148, 136, 0.82) 0%, rgba(139, 92, 246, 0.5) 100%), url('${currentStepData.sideImage}')`
                }}
            >
                <div className="auth-side-content">
                    <div className="premium-badge">
                        <Zap size={14} /> Step {step}/4
                    </div>
                    <h2 className="auth-side-quote">
                        {currentStepData.sideQuote}
                    </h2>
                    <p className="auth-side-subtitle">
                        {currentStepData.sideTitle}. We're tailoring your AI insights as we go.
                    </p>

                    <div className="step-preview-card">
                        <currentStepData.icon size={32} color="#0d9488" />
                        <div>
                            <h4>{currentStepData.title} Phase</h4>
                            <span>Refining your journey...</span>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .onboarding-flow-container {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    max-width: 500px;
                    margin: 0 auto;
                }

                .onboarding-steps {
                    display: flex;
                    justify-content: space-between;
                    position: relative;
                    margin-bottom: 60px;
                }

                .progress-line {
                    position: absolute;
                    top: 15px;
                    left: 20px;
                    right: 20px;
                    height: 2px;
                    background: var(--border);
                    z-index: 0;
                }

                .progress-fill {
                    height: 100%;
                    background: var(--primary);
                    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .step-dot {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 12px;
                    z-index: 1;
                    min-width: 60px;
                }

                .step-dot .dot {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: white;
                    border: 2px solid var(--border);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.8rem;
                    font-weight: 800;
                    color: var(--text-muted);
                    transition: all 0.3s;
                }

                .step-dot.active .dot {
                    border-color: var(--primary);
                    color: var(--primary);
                    background: var(--primary-50);
                    box-shadow: 0 0 0 4px var(--primary-100);
                }

                .step-dot.completed .dot {
                    background: var(--primary);
                    border-color: var(--primary);
                    color: white;
                }

                .step-dot span {
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: var(--text-muted);
                }

                .step-dot.active span {
                    color: var(--text-primary);
                }

                .onboarding-title {
                    font-size: 2.25rem;
                    font-weight: 900;
                    margin-bottom: 12px;
                    color: var(--text-primary);
                }

                .onboarding-p {
                    color: var(--text-secondary);
                    margin-bottom: 40px;
                    line-height: 1.5;
                }

                .goals-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                    margin-bottom: 24px;
                }

                .goal-card {
                    padding: 20px;
                    background: white;
                    border: 1px solid var(--border);
                    border-radius: var(--radius-lg);
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    position: relative;
                    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .goal-card:hover {
                    border-color: var(--primary);
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
                }

                .goal-card.active {
                    background: var(--primary-50);
                    border-color: var(--primary);
                    box-shadow: inset 0 0 0 1px var(--primary);
                }

                .goal-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s;
                }

                .goal-label {
                    font-weight: 700;
                    font-size: 0.95rem;
                }

                .goal-check {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    color: var(--primary);
                }

                .onboarding-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 48px;
                }

                .step-preview-card {
                    background: rgba(255, 255, 255, 0.15);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    padding: 24px;
                    border-radius: var(--radius-lg);
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    margin-top: 40px;
                }

                .step-preview-card h4 {
                    font-weight: 700;
                    margin-bottom: 4px;
                }

                .step-preview-card span {
                    font-size: 0.8rem;
                    opacity: 0.7;
                }

                .hidden {
                    visibility: hidden;
                    pointer-events: none;
                }

                @media (max-width: 1024px) {
                    .onboarding-container {
                        padding: 20px;
                    }
                    .onboarding-title {
                        font-size: 1.75rem;
                    }
                }
            `}</style>
        </div>
    );
};


export default Onboarding;
