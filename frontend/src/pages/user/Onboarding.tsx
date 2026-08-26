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
    Star,
    Sparkles,
    Calendar,
    Minus,
    Plus,
    Shield,
    Pill,
    Check
} from 'lucide-react';
import '../../styles/Auth.css';

import { useUserOnboarding } from '../../hooks/onboarding/useUserOnboarding';
import { useUserContext } from '../../context/UserAuthContext';
import { userDobSchema, parseApiErrorMessage } from '../../utils/validationUtils';
import DateOfBirthPicker from '../../components/common/DateOfBirthPicker/DateOfBirthPicker';

const Onboarding: React.FC = () => {
    const navigate = useNavigate();
    const { user, login, refreshUser } = useUserContext();
    const [step, setStep] = useState(1);
    const [dobError, setDobError] = useState<string | null>(null);

    const [bodyDetails, setBodyDetails] = useState({
        height: "165",
        weight: "60",
        dateOfBirth: "",
        biologicalSex: "female"
    });

    const [cycleSetup, setCycleSetUp] = useState({
        averageCycleLength: "28",
        averagePeriodLength: "5",
        lastPeriodStart: "",
        birthControl: "none",
    });

    const [goals, setGoals] = useState({
        primaryGoal: "" as "" | "weight_loss" | "muscle_gain" | "hormone_balance" | "general_health",
        targetWeight: "",
        activityLevel: "moderatelyActive" as "" | "sedentary" | "lightActive" | "moderatelyActive",
    });

    const [selectedGoals, setSelectedGoals] = useState<string[]>(['CycleSync']);
    const { loading, error: apiError, updateBodyDetails, updateCycleSetUp, updateGoals, completeOnboarding } = useUserOnboarding();
    const [customError, setCustomError] = useState<string | null>(null);

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
        setCustomError(null);
        try {
            if (step === 1) {
                const numHeight = Number(bodyDetails.height);
                const numWeight = Number(bodyDetails.weight);
                if (!bodyDetails.height || isNaN(numHeight) || numHeight < 50 || numHeight > 300) {
                    setCustomError("Please enter a valid height between 50 cm and 300 cm.");
                    return;
                }
                if (!bodyDetails.weight || isNaN(numWeight) || numWeight < 20 || numWeight > 500) {
                    setCustomError("Please enter a valid weight between 20 kg and 500 kg.");
                    return;
                }
                if (!bodyDetails.biologicalSex) {
                    setCustomError("Please select your biological sex.");
                    return;
                }

                const dobValidation = userDobSchema.safeParse(bodyDetails.dateOfBirth);
                if (!dobValidation.success) {
                    const msg = dobValidation.error.issues[0]?.message || "Invalid Date of Birth";
                    setDobError(msg);
                    return;
                }
                setDobError(null);

                await updateBodyDetails({
                    height: numHeight,
                    weight: numWeight,
                    dateOfBirth: bodyDetails.dateOfBirth,
                    biologicalSex: bodyDetails.biologicalSex,
                });
                setStep(2);
            } else if (step === 2) {
                const firstGoal = selectedGoals[0];
                const primaryGoal = firstGoal ? goalToBackendMap[firstGoal] : undefined;

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
                if (user) {
                    login({ ...user, onboardingComplete: true });
                }
                await refreshUser();
                navigate('/app');
            }
        } catch (err: any) {
            console.error("Onboarding step error:", err);
            const msg = parseApiErrorMessage(err, "Validation or network error occurred");
            setCustomError(msg);
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
                ? (prev.length > 1 ? prev.filter(g => g !== goalId) : prev)
                : [...prev, goalId]
        );
    };

    // Helper for quick date button selection in Step 3
    const setQuickDate = (daysAgo: number) => {
        const d = new Date();
        d.setDate(d.getDate() - daysAgo);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        setCycleSetUp(prev => ({ ...prev, lastPeriodStart: `${yyyy}-${mm}-${dd}` }));
    };

    const goalOptions = [
        { id: 'CycleSync', label: 'Cycle Syncing', desc: 'Sync workouts & diet to hormones', icon: Activity, color: '#0d9488' },
        { id: 'Weight', label: 'Weight Management', desc: 'Sustainable fat loss & energy', icon: Heart, color: '#0ea5e9' },
        { id: 'Muscle', label: 'Gain Lean Muscle', desc: 'Strength training protocols', icon: Dumbbell, color: '#8b5cf6' },
        { id: 'Sleep', label: 'Optimize Recovery', desc: 'Sleep & stress tracking', icon: Moon, color: '#6366f1' },
        { id: 'Mood', label: 'Hormonal Balance', desc: 'Mood & energy stabilization', icon: TrendingUp, color: '#f43f5e' },
        { id: 'Pregnancy', label: 'Fertility & Sync', desc: 'Pre-conception or cycle tracking', icon: Baby, color: '#ec4899' },
    ];

    const activityOptions = [
        { id: 'sedentary', title: 'Sedentary', desc: 'Mostly sitting, minimal exercise', icon: '🚶‍♀️' },
        { id: 'lightActive', title: 'Lightly Active', desc: 'Light workouts 1-3 days/week', icon: '🏃‍♀️' },
        { id: 'moderatelyActive', title: 'Moderately Active', desc: 'Regular exercise 3-5 days/week', icon: '⚡' },
    ];

    const birthControlOptions = [
        { id: 'none', label: 'None', desc: 'Natural cycle tracking', icon: Sparkles },
        { id: 'pill', label: 'Pill', desc: 'Oral contraceptive', icon: Pill },
        { id: 'iud', label: 'IUD', desc: 'Hormonal / Copper', icon: Shield },
        { id: 'implant', label: 'Implant', desc: 'Arm implant', icon: Zap },
        { id: 'other', label: 'Other', desc: 'Alternative methods', icon: Activity },
    ];

    return (
        <div className="auth-wrapper">
            {/* Form Section */}
            <div className="auth-container" style={{ padding: '40px 50px', maxWidth: '640px' }}>
                <div className="auth-brand" style={{ marginBottom: '36px' }}>
                    <div className="auth-logo" style={{ background: 'linear-gradient(135deg, #0d9488 0%, #2563eb 100%)', boxShadow: '0 4px 14px rgba(13, 148, 136, 0.3)' }}>C</div>
                    <h1>CycleSync <span style={{ background: 'linear-gradient(135deg, #2563eb 0%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 900 }}>AI</span></h1>
                </div>

                <div className="onboarding-flow-container">
                    {/* Stepper Progress Bar */}
                    <div className="onboarding-steps">
                        {steps.map(s => (
                            <div key={s.id} className={`step-dot ${step === s.id ? 'active' : ''} ${step > s.id ? 'completed' : ''}`}>
                                <div className="dot">
                                    {step > s.id ? <CheckCircle size={16} /> : <span>{s.id}</span>}
                                </div>
                                <span>{s.title}</span>
                            </div>
                        ))}
                        <div className="progress-line">
                            <div className="progress-fill" style={{ width: `${((step - 1) / 3) * 100}%` }} />
                        </div>
                    </div>

                    {/* Error display */}
                    {(customError || apiError) && (
                        <div style={{
                            background: '#fef2f2',
                            border: '1px solid #fecaca',
                            color: '#dc2626',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            marginBottom: '20px',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <span style={{ fontSize: '1.2rem' }}>⚠️</span>
                            {customError || parseApiErrorMessage({ response: { data: { message: apiError } } }, apiError || "An error occurred")}
                        </div>
                    )}

                    <div className="auth-card animate-slideUp">
                        {/* Step 1: Identity */}
                        {step === 1 && (
                            <div className="animate-fadeIn">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <span className="step-tag">Step 1 of 4</span>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>• Takes 1 min</span>
                                </div>
                                <h1 className="onboarding-title">Welcome to CycleSync</h1>
                                <p className="onboarding-p">Let's map your baseline biological metrics to calibrate your personalized protocol.</p>

                                {/* Biological Sex Selection Cards */}
                                <div className="form-group" style={{ marginBottom: '24px' }}>
                                    <label className="field-label">Biological Sex</label>
                                    <div className="option-cards-row">
                                        <div
                                            className={`option-card ${bodyDetails.biologicalSex === 'female' ? 'selected' : ''}`}
                                            onClick={() => setBodyDetails({ ...bodyDetails, biologicalSex: 'female' })}
                                        >
                                            <div className="card-radio">
                                                {bodyDetails.biologicalSex === 'female' && <Check size={12} color="white" />}
                                            </div>
                                            <div className="card-content">
                                                <span className="card-title">Female ♀</span>
                                                <span className="card-sub">Cycle-synced recommendations</span>
                                            </div>
                                        </div>

                                        <div
                                            className={`option-card ${bodyDetails.biologicalSex === 'male' ? 'selected' : ''}`}
                                            onClick={() => setBodyDetails({ ...bodyDetails, biologicalSex: 'male' })}
                                        >
                                            <div className="card-radio">
                                                {bodyDetails.biologicalSex === 'male' && <Check size={12} color="white" />}
                                            </div>
                                            <div className="card-content">
                                                <span className="card-title">Male ♂</span>
                                                <span className="card-sub">Standard fitness protocol</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Height & Weight Steppers */}
                                <div className="form-group-row" style={{ marginBottom: '24px' }}>
                                    <div className="form-group">
                                        <label className="field-label">Height (cm)</label>
                                        <div className="stepper-input-container">
                                            <button
                                                type="button"
                                                className="stepper-btn"
                                                onClick={() => setBodyDetails(prev => ({ ...prev, height: String(Math.max(100, Number(prev.height || 165) - 1)) }))}
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <input
                                                type="number"
                                                className="stepper-field"
                                                placeholder="165"
                                                value={bodyDetails.height}
                                                onChange={(e) => setBodyDetails({ ...bodyDetails, height: e.target.value })}
                                            />
                                            <span className="unit-badge">cm</span>
                                            <button
                                                type="button"
                                                className="stepper-btn"
                                                onClick={() => setBodyDetails(prev => ({ ...prev, height: String(Math.min(250, Number(prev.height || 165) + 1)) }))}
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                        <div className="preset-chips">
                                            {['158', '165', '172', '180'].map(h => (
                                                <button
                                                    key={h}
                                                    type="button"
                                                    className={`preset-chip ${bodyDetails.height === h ? 'active' : ''}`}
                                                    onClick={() => setBodyDetails({ ...bodyDetails, height: h })}
                                                >
                                                    {h} cm
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="field-label">Weight (kg)</label>
                                        <div className="stepper-input-container">
                                            <button
                                                type="button"
                                                className="stepper-btn"
                                                onClick={() => setBodyDetails(prev => ({ ...prev, weight: String(Math.max(30, Number(prev.weight || 60) - 1)) }))}
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <input
                                                type="number"
                                                className="stepper-field"
                                                placeholder="60"
                                                value={bodyDetails.weight}
                                                onChange={(e) => setBodyDetails({ ...bodyDetails, weight: e.target.value })}
                                            />
                                            <span className="unit-badge">kg</span>
                                            <button
                                                type="button"
                                                className="stepper-btn"
                                                onClick={() => setBodyDetails(prev => ({ ...prev, weight: String(Math.min(300, Number(prev.weight || 60) + 1)) }))}
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                        <div className="preset-chips">
                                            {['52', '60', '68', '75'].map(w => (
                                                <button
                                                    key={w}
                                                    type="button"
                                                    className={`preset-chip ${bodyDetails.weight === w ? 'active' : ''}`}
                                                    onClick={() => setBodyDetails({ ...bodyDetails, weight: w })}
                                                >
                                                    {w} kg
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Date of Birth Picker Component */}
                                <div className="form-group">
                                    <DateOfBirthPicker
                                        value={bodyDetails.dateOfBirth}
                                        error={dobError}
                                        onChange={(dateStr) => {
                                            setBodyDetails({ ...bodyDetails, dateOfBirth: dateStr });
                                            if (dateStr) {
                                                const res = userDobSchema.safeParse(dateStr);
                                                setDobError(res.success ? null : res.error.issues[0]?.message || null);
                                            } else {
                                                setDobError(null);
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 2: Goals & Activity */}
                        {step === 2 && (
                            <div className="animate-fadeIn">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <span className="step-tag">Step 2 of 4</span>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>• Select focus areas</span>
                                </div>
                                <h1 className="onboarding-title">What are your primary goals?</h1>
                                <p className="onboarding-p">Choose what matters most so our AI algorithm prioritizes your training & nutrition.</p>

                                <div className="goals-grid">
                                    {goalOptions.map(goal => {
                                        const Icon = goal.icon;
                                        const isActive = selectedGoals.includes(goal.id);
                                        return (
                                            <div
                                                key={goal.id}
                                                className={`goal-card-enhanced ${isActive ? 'active' : ''}`}
                                                onClick={() => toggleGoal(goal.id)}
                                            >
                                                <div className="goal-header">
                                                    <div className="goal-icon-box" style={{ background: isActive ? goal.color : 'rgba(15, 23, 42, 0.05)', color: isActive ? 'white' : goal.color }}>
                                                        <Icon size={20} />
                                                    </div>
                                                    {isActive && (
                                                        <div className="goal-active-badge">
                                                            <Check size={12} color="white" />
                                                        </div>
                                                    )}
                                                </div>
                                                <h4 className="goal-card-title">{goal.label}</h4>
                                                <p className="goal-card-desc">{goal.desc}</p>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Activity Level Selector */}
                                <div className="form-group" style={{ marginTop: '24px' }}>
                                    <label className="field-label">Daily Activity Level</label>
                                    <div className="activity-cards-list">
                                        {activityOptions.map(act => (
                                            <div
                                                key={act.id}
                                                className={`activity-card ${goals.activityLevel === act.id ? 'active' : ''}`}
                                                onClick={() => setGoals({ ...goals, activityLevel: act.id as any })}
                                            >
                                                <span className="activity-emoji">{act.icon}</span>
                                                <div className="activity-info">
                                                    <strong>{act.title}</strong>
                                                    <span>{act.desc}</span>
                                                </div>
                                                <div className="activity-radio">
                                                    {goals.activityLevel === act.id && <div className="radio-inner" />}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Biological Sync */}
                        {step === 3 && (
                            <div className="animate-fadeIn">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <span className="step-tag">Step 3 of 4</span>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>• Biological Alignment</span>
                                </div>
                                <h1 className="onboarding-title">Biological Sync</h1>
                                <p className="onboarding-p">Help us accurately map your hormonal cycle phases for peak energy & performance.</p>

                                {/* Average Cycle Length */}
                                <div className="form-group" style={{ marginBottom: '28px' }}>
                                    <div className="field-label-row">
                                        <label className="field-label">Average Cycle Length</label>
                                        <span className="value-highlight">{cycleSetup.averageCycleLength || '28'} Days</span>
                                    </div>
                                    
                                    <div className="stepper-input-container large">
                                        <button
                                            type="button"
                                            className="stepper-btn"
                                            onClick={() => setCycleSetUp(prev => ({ ...prev, averageCycleLength: String(Math.max(15, Number(prev.averageCycleLength || 28) - 1)) }))}
                                        >
                                            <Minus size={18} />
                                        </button>
                                        <div className="slider-wrapper">
                                            <input
                                                type="range"
                                                min="20"
                                                max="45"
                                                value={cycleSetup.averageCycleLength || '28'}
                                                onChange={(e) => setCycleSetUp({ ...cycleSetup, averageCycleLength: e.target.value })}
                                                className="custom-range-slider"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            className="stepper-btn"
                                            onClick={() => setCycleSetUp(prev => ({ ...prev, averageCycleLength: String(Math.min(60, Number(prev.averageCycleLength || 28) + 1)) }))}
                                        >
                                            <Plus size={18} />
                                        </button>
                                    </div>

                                    <div className="preset-chips" style={{ marginTop: '10px' }}>
                                        {[
                                            { days: '26', label: '26 Days' },
                                            { days: '28', label: '28 Days (Regular)' },
                                            { days: '30', label: '30 Days' },
                                            { days: '32', label: '32 Days' }
                                        ].map(p => (
                                            <button
                                                key={p.days}
                                                type="button"
                                                className={`preset-chip ${cycleSetup.averageCycleLength === p.days ? 'active' : ''}`}
                                                onClick={() => setCycleSetUp({ ...cycleSetup, averageCycleLength: p.days })}
                                            >
                                                {p.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Average Period Duration */}
                                <div className="form-group" style={{ marginBottom: '28px' }}>
                                    <div className="field-label-row">
                                        <label className="field-label">Average Period Duration</label>
                                        <span className="value-highlight">{cycleSetup.averagePeriodLength || '5'} Days</span>
                                    </div>

                                    <div className="stepper-input-container large">
                                        <button
                                            type="button"
                                            className="stepper-btn"
                                            onClick={() => setCycleSetUp(prev => ({ ...prev, averagePeriodLength: String(Math.max(1, Number(prev.averagePeriodLength || 5) - 1)) }))}
                                        >
                                            <Minus size={18} />
                                        </button>
                                        <div className="slider-wrapper">
                                            <input
                                                type="range"
                                                min="2"
                                                max="10"
                                                value={cycleSetup.averagePeriodLength || '5'}
                                                onChange={(e) => setCycleSetUp({ ...cycleSetup, averagePeriodLength: e.target.value })}
                                                className="custom-range-slider teal"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            className="stepper-btn"
                                            onClick={() => setCycleSetUp(prev => ({ ...prev, averagePeriodLength: String(Math.min(14, Number(prev.averagePeriodLength || 5) + 1)) }))}
                                        >
                                            <Plus size={18} />
                                        </button>
                                    </div>

                                    <div className="preset-chips" style={{ marginTop: '10px' }}>
                                        {[
                                            { days: '3', label: '3 Days' },
                                            { days: '5', label: '5 Days (Typical)' },
                                            { days: '7', label: '7 Days' }
                                        ].map(p => (
                                            <button
                                                key={p.days}
                                                type="button"
                                                className={`preset-chip ${cycleSetup.averagePeriodLength === p.days ? 'active' : ''}`}
                                                onClick={() => setCycleSetUp({ ...cycleSetup, averagePeriodLength: p.days })}
                                            >
                                                {p.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Last Period Start Date */}
                                <div className="form-group" style={{ marginBottom: '28px' }}>
                                    <label className="field-label">Last Period Start Date</label>
                                    <div className="quick-date-bar" style={{ marginBottom: '10px' }}>
                                        <button type="button" className="quick-date-btn" onClick={() => setQuickDate(0)}>Today</button>
                                        <button type="button" className="quick-date-btn" onClick={() => setQuickDate(3)}>3 Days Ago</button>
                                        <button type="button" className="quick-date-btn" onClick={() => setQuickDate(7)}>1 Week Ago</button>
                                        <button type="button" className="quick-date-btn" onClick={() => setQuickDate(14)}>2 Weeks Ago</button>
                                    </div>

                                    <div className="styled-date-wrapper">
                                        <Calendar size={18} className="input-icon" />
                                        <input
                                            type="date"
                                            className="styled-date-input"
                                            value={cycleSetup.lastPeriodStart}
                                            onChange={(e) => setCycleSetUp({ ...cycleSetup, lastPeriodStart: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Birth Control Option Pills */}
                                <div className="form-group">
                                    <label className="field-label">Birth Control (Optional)</label>
                                    <div className="bc-chips-grid">
                                        {birthControlOptions.map(bc => {
                                            const BcIcon = bc.icon;
                                            const isSelected = cycleSetup.birthControl === bc.id;
                                            return (
                                                <div
                                                    key={bc.id}
                                                    className={`bc-chip ${isSelected ? 'selected' : ''}`}
                                                    onClick={() => setCycleSetUp({ ...cycleSetup, birthControl: bc.id })}
                                                >
                                                    <BcIcon size={16} />
                                                    <div className="bc-text">
                                                        <strong>{bc.label}</strong>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Protocol & Plan */}
                        {step === 4 && (
                            <div className="animate-fadeIn">
                                <div className="ai-protocol-hero">
                                    <div className="ai-glow-badge">
                                        <Sparkles size={28} color="#0d9488" />
                                    </div>
                                    <h1 className="onboarding-title" style={{ fontSize: '1.85rem', textAlign: 'center', marginBottom: '8px' }}>
                                        AI Protocol Ready
                                    </h1>
                                    <p className="onboarding-p" style={{ textAlign: 'center', marginBottom: '28px' }}>
                                        We've calibrated your hormonal phase map. Here is your initial 7-day protocol structure.
                                    </p>
                                </div>

                                <div className="plans-stack">
                                    <div className="featured-protocol-card">
                                        <div className="free-ribbon">
                                            <Star size={12} fill="white" /> 100% Free Trial
                                        </div>

                                        <div className="card-header">
                                            <h3>7-Day AI Cycle Sync Protocol</h3>
                                            <p>Tailored training and nutrition synced to your current biological phase.</p>
                                        </div>

                                        <div className="protocol-features">
                                            <div className="p-feature">
                                                <CheckCircle size={18} color="#0d9488" />
                                                <span>Personalized AI Workouts for your active phase</span>
                                            </div>
                                            <div className="p-feature">
                                                <CheckCircle size={18} color="#0d9488" />
                                                <span>Hormonal Food Nudges & Macronutrient Ratios</span>
                                            </div>
                                            <div className="p-feature">
                                                <CheckCircle size={18} color="#0d9488" />
                                                <span>Instant Dashboard Access — No Payment Required</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="trainer-note-card">
                                        <Zap size={20} color="#f59e0b" style={{ flexShrink: 0 }} />
                                        <p>
                                            <strong>Certified Trainer Handover:</strong> After Day 7, a certified coach will review your progress log and take over your personalized routine.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Footer Actions */}
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
                                style={{ minWidth: '180px', padding: '14px 28px' }}
                                disabled={loading}
                            >
                                {loading ? (
                                    'Processing...'
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

            {/* Dynamic Glassmorphic Right Side Panel */}
            <div className="auth-side animate-fadeIn">
                <div className="auth-side-content">
                    <div className="premium-badge">
                        <Zap size={14} color="#0d9488" /> Step {step} of 4
                    </div>

                    <h2 className="auth-side-quote">
                        {currentStepData.sideQuote}
                    </h2>
                    <p className="auth-side-subtitle">
                        {currentStepData.sideTitle}. Our AI engine tunes your routines dynamically.
                    </p>

                    {/* Step Context Dynamic Card */}
                    <div className="live-preview-card">
                        <div className="card-top">
                            <currentStepData.icon size={28} color="#0d9488" />
                            <div>
                                <span className="preview-label">{currentStepData.title} Sync</span>
                                <h4 className="preview-heading">
                                    {step === 1 && `Body: ${bodyDetails.height || 165}cm / ${bodyDetails.weight || 60}kg`}
                                    {step === 2 && `${selectedGoals.length} Focus Goal${selectedGoals.length > 1 ? 's' : ''} Selected`}
                                    {step === 3 && `${cycleSetup.averageCycleLength || 28}-Day Cycle Calibrated`}
                                    {step === 4 && `Protocol Ready`}
                                </h4>
                            </div>
                        </div>

                        <div className="preview-status-pill">
                            <span className="pulse-dot" />
                            {step === 1 && "Biological metrics ready"}
                            {step === 2 && "Goal priority matrix mapped"}
                            {step === 3 && "Hormonal phase calculations active"}
                            {step === 4 && "AI engine model active"}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .step-tag {
                    font-size: 0.75rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: var(--primary);
                    background: var(--primary-50);
                    padding: 4px 10px;
                    border-radius: 20px;
                }

                .onboarding-flow-container {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    width: 100%;
                    margin: 0 auto;
                }

                .onboarding-steps {
                    display: flex;
                    justify-content: space-between;
                    position: relative;
                    margin-bottom: 40px;
                }

                .progress-line {
                    position: absolute;
                    top: 15px;
                    left: 20px;
                    right: 20px;
                    height: 3px;
                    background: #e2e8f0;
                    z-index: 0;
                    border-radius: 4px;
                }

                .progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #0d9488 0%, #2563eb 100%);
                    border-radius: 4px;
                    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .step-dot {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    z-index: 1;
                    min-width: 60px;
                }

                .step-dot .dot {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: white;
                    border: 2px solid #cbd5e1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.85rem;
                    font-weight: 800;
                    color: #94a3b8;
                    transition: all 0.3s ease;
                }

                .step-dot.active .dot {
                    border-color: #2563eb;
                    color: #2563eb;
                    background: #eff6ff;
                    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15);
                    transform: scale(1.1);
                }

                .step-dot.completed .dot {
                    background: #2563eb;
                    border-color: #2563eb;
                    color: white;
                }

                .step-dot span {
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: #64748b;
                }

                .step-dot.active span {
                    color: #0f172a;
                }

                .onboarding-title {
                    font-size: 2rem;
                    font-weight: 900;
                    margin-bottom: 8px;
                    color: #0f172a;
                    letter-spacing: -0.02em;
                }

                .onboarding-p {
                    color: #64748b;
                    margin-bottom: 32px;
                    line-height: 1.55;
                    font-size: 0.95rem;
                }

                .field-label {
                    font-size: 0.875rem;
                    font-weight: 700;
                    color: #1e293b;
                    margin-bottom: 8px;
                    display: block;
                }

                .field-label-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 8px;
                }

                .value-highlight {
                    font-size: 0.85rem;
                    font-weight: 800;
                    color: #2563eb;
                    background: #eff6ff;
                    padding: 2px 10px;
                    border-radius: 12px;
                }

                /* Option Cards Row (Biological Sex) */
                .option-cards-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 14px;
                }

                .option-card {
                    padding: 16px;
                    background: white;
                    border: 1.5px solid #e2e8f0;
                    border-radius: 14px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    transition: all 0.2s ease;
                }

                .option-card:hover {
                    border-color: #94a3b8;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 16px rgba(0,0,0,0.04);
                }

                .option-card.selected {
                    background: #f0fdfa;
                    border-color: #0d9488;
                    box-shadow: 0 0 0 1px #0d9488, 0 4px 12px rgba(13, 148, 136, 0.1);
                }

                .card-radio {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    border: 2px solid #cbd5e1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                }

                .option-card.selected .card-radio {
                    background: #0d9488;
                    border-color: #0d9488;
                }

                .card-content {
                    display: flex;
                    flex-direction: column;
                }

                .card-title {
                    font-size: 0.95rem;
                    font-weight: 800;
                    color: #0f172a;
                }

                .card-sub {
                    font-size: 0.75rem;
                    color: #64748b;
                }

                /* Steppers */
                .stepper-input-container {
                    display: flex;
                    align-items: center;
                    background: white;
                    border: 1.5px solid #e2e8f0;
                    border-radius: 12px;
                    padding: 4px;
                    position: relative;
                    transition: all 0.2s ease;
                }

                .stepper-input-container:focus-within {
                    border-color: #2563eb;
                    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
                }

                .stepper-input-container.large {
                    padding: 8px;
                }

                .stepper-btn {
                    width: 36px;
                    height: 36px;
                    border-radius: 8px;
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #475569;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .stepper-btn:hover {
                    background: #e2e8f0;
                    color: #0f172a;
                }

                .stepper-field {
                    flex: 1;
                    border: none !important;
                    box-shadow: none !important;
                    text-align: center;
                    font-size: 1.1rem !important;
                    font-weight: 800 !important;
                    color: #0f172a;
                    padding: 8px 4px !important;
                }

                .unit-badge {
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: #94a3b8;
                    margin-right: 8px;
                }

                .preset-chips {
                    display: flex;
                    gap: 8px;
                    margin-top: 8px;
                    flex-wrap: wrap;
                }

                .preset-chip {
                    padding: 4px 12px;
                    background: #f1f5f9;
                    border: 1px solid #e2e8f0;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: #475569;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .preset-chip:hover {
                    background: #e2e8f0;
                }

                .preset-chip.active {
                    background: #2563eb;
                    color: white;
                    border-color: #2563eb;
                }

                /* Goals Grid */
                .goals-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 14px;
                    margin-bottom: 24px;
                }

                .goal-card-enhanced {
                    padding: 16px;
                    background: white;
                    border: 1.5px solid #e2e8f0;
                    border-radius: 16px;
                    cursor: pointer;
                    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                    display: flex;
                    flex-direction: column;
                }

                .goal-card-enhanced:hover {
                    border-color: #3b82f6;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.06);
                }

                .goal-card-enhanced.active {
                    background: #eff6ff;
                    border-color: #2563eb;
                    box-shadow: inset 0 0 0 1px #2563eb;
                }

                .goal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 12px;
                }

                .goal-icon-box {
                    width: 38px;
                    height: 38px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .goal-active-badge {
                    width: 22px;
                    height: 22px;
                    border-radius: 50%;
                    background: #2563eb;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .goal-card-title {
                    font-size: 0.95rem;
                    font-weight: 800;
                    color: #0f172a;
                    margin-bottom: 4px;
                }

                .goal-card-desc {
                    font-size: 0.75rem;
                    color: #64748b;
                    line-height: 1.4;
                }

                /* Activity Level List */
                .activity-cards-list {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .activity-card {
                    padding: 14px 18px;
                    background: white;
                    border: 1.5px solid #e2e8f0;
                    border-radius: 14px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    transition: all 0.2s ease;
                }

                .activity-card:hover {
                    border-color: #cbd5e1;
                }

                .activity-card.active {
                    background: #f0fdfa;
                    border-color: #0d9488;
                }

                .activity-emoji {
                    font-size: 1.5rem;
                }

                .activity-info {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }

                .activity-info strong {
                    font-size: 0.9rem;
                    color: #0f172a;
                }

                .activity-info span {
                    font-size: 0.75rem;
                    color: #64748b;
                }

                .activity-radio {
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    border: 2px solid #cbd5e1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .activity-card.active .activity-radio {
                    border-color: #0d9488;
                }

                .radio-inner {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: #0d9488;
                }

                /* Sliders */
                .slider-wrapper {
                    flex: 1;
                    padding: 0 16px;
                    display: flex;
                    align-items: center;
                }

                .custom-range-slider {
                    width: 100%;
                    height: 6px;
                    border-radius: 4px;
                    background: #e2e8f0;
                    outline: none;
                    accent-color: #2563eb;
                    cursor: pointer;
                }

                .custom-range-slider.teal {
                    accent-color: #0d9488;
                }

                /* Quick Date Buttons */
                .quick-date-bar {
                    display: flex;
                    gap: 8px;
                    flex-wrap: wrap;
                }

                .quick-date-btn {
                    padding: 6px 14px;
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: #475569;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .quick-date-btn:hover {
                    background: #2563eb;
                    color: white;
                    border-color: #2563eb;
                }

                .styled-date-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .styled-date-input {
                    width: 100%;
                    padding: 12px 16px 12px 42px;
                    border: 1.5px solid #e2e8f0;
                    border-radius: 12px;
                    font-size: 0.95rem;
                    font-weight: 600;
                    color: #0f172a;
                    background: white;
                    transition: all 0.2s ease;
                }

                .styled-date-input:focus {
                    border-color: #2563eb;
                    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
                }

                /* Birth Control Pills */
                .bc-chips-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
                    gap: 10px;
                }

                .bc-chip {
                    padding: 12px 10px;
                    background: white;
                    border: 1.5px solid #e2e8f0;
                    border-radius: 12px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.2s ease;
                }

                .bc-chip:hover {
                    border-color: #0d9488;
                }

                .bc-chip.selected {
                    background: #f0fdfa;
                    border-color: #0d9488;
                    color: #0d9488;
                    box-shadow: 0 4px 12px rgba(13, 148, 136, 0.15);
                }

                .bc-text strong {
                    font-size: 0.85rem;
                    display: block;
                }

                /* AI Protocol Cards */
                .ai-protocol-hero {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .ai-glow-badge {
                    width: 64px;
                    height: 64px;
                    border-radius: 50%;
                    background: #f0fdfa;
                    border: 1px solid #ccfbf1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 16px;
                    box-shadow: 0 0 30px rgba(13, 148, 136, 0.25);
                    animation: float 3s ease-in-out infinite;
                }

                .featured-protocol-card {
                    position: relative;
                    border: 2px solid #2563eb;
                    background: linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%);
                    border-radius: 20px;
                    padding: 24px;
                    margin-bottom: 16px;
                    box-shadow: 0 12px 30px rgba(37, 99, 235, 0.12);
                }

                .free-ribbon {
                    position: absolute;
                    top: -12px;
                    right: 24px;
                    background: #10b981;
                    color: white;
                    padding: 4px 14px;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 800;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
                }

                .card-header h3 {
                    font-size: 1.3rem;
                    font-weight: 900;
                    color: #1e3a8a;
                    margin-bottom: 4px;
                }

                .card-header p {
                    font-size: 0.85rem;
                    color: #64748b;
                    margin-bottom: 16px;
                }

                .protocol-features {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .p-feature {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 0.9rem;
                    font-weight: 700;
                    color: #1e293b;
                }

                .trainer-note-card {
                    background: #fffbeb;
                    border: 1px solid #fef3c7;
                    border-radius: 14px;
                    padding: 16px;
                    display: flex;
                    gap: 12px;
                    align-items: flex-start;
                }

                .trainer-note-card p {
                    font-size: 0.8rem;
                    color: #92400e;
                    line-height: 1.5;
                    margin: 0;
                }

                .onboarding-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 40px;
                }

                /* Live Preview Card in Right Side */
                .live-preview-card {
                    background: rgba(255, 255, 255, 0.07);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    padding: 24px;
                    border-radius: 20px;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                }

                .card-top {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin-bottom: 16px;
                }

                .preview-label {
                    font-size: 0.75rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: #0d9488;
                }

                .preview-heading {
                    font-size: 1.1rem;
                    font-weight: 800;
                    color: white;
                    margin-top: 2px;
                }

                .preview-status-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 14px;
                    background: rgba(13, 148, 136, 0.15);
                    border: 1px solid rgba(13, 148, 136, 0.3);
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: #5eead4;
                }

                .pulse-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #14b8a6;
                    box-shadow: 0 0 8px #14b8a6;
                    animation: pulse 2s infinite;
                }

                .hidden {
                    visibility: hidden;
                    pointer-events: none;
                }
            `}</style>
        </div>
    );
};

export default Onboarding;
