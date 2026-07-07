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
    const { loading, error, updateBodyDetails, updateCycleSetUp, updateGoals, completeOnboarding } = useUserOnboarding();

    const [step, setStep] = useState(1);

    const [bodyDetails, setBodyDetails] = useState({
        height: "",
        weight: "",
        dateOfBirth: "",
        biologicalSex: ""
    });

    const [cycleSetup, setCycleSetup] = useState({
        averageCycleLength: "",
        averagePeriodLength: "",
        lastPeriodStart: "",
        birthControl: "",
    });

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        goals: [] as string[],
        cycleLength: '',
        periodLength: ''
    });

    const steps = [
        { id: 1, title: 'Identity', icon: User, sideTitle: 'Start your journey', sideQuote: '"The most important step is the first one."', sideImage: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=1200' },
        { id: 2, title: 'Goals', icon: Target, sideTitle: 'Set your vision', sideQuote: '"Goals are dreams with deadlines."', sideImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1200' },
        { id: 3, title: 'Biosync', icon: Activity, sideTitle: 'Align your health', sideQuote: '"Listen to your body\'s natural rhythm."', sideImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200' },
        { id: 4, title: 'Plan', icon: Zap, sideTitle: 'Your optimal path', sideQuote: '"Predicting the future is easy when you control it."', sideImage: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=1200' },
    ];

    const currentStepData = steps.find(s => s.id === step)!;

    const goalOptions = [
        { id: 'CycleSync', label: 'Track Cycle', icon: Activity, color: '#0d9488' },
        { id: 'Weight', label: 'Lose Weight', icon: Heart, color: '#0ea5e9' },
        { id: 'Muscle', label: 'Gain Muscle', icon: Dumbbell, color: '#8b5cf6' },
        { id: 'Sleep', label: 'Improve Sleep', icon: Moon, color: '#3b82f6' },
        { id: 'Mood', label: 'Mood Tracking', icon: TrendingUp, color: '#f43f5e' },
        { id: 'Pregnancy', label: 'Get Pregnant', icon: Baby, color: '#ec4899' },
    ];

    const handleNext = async () => {
        try {
            if (step === 1) {
                await updateBodyDetails(bodyDetails);
            } else if (step === 2) {
                await updateGoals({ primaryGoal: formData.goals[0] || '', targetWeight: '', activityLevel: '' });
            } else if (step === 3) {
                await updateCycleSetUp({
                    averageCycleLength: formData.cycleLength,
                    averagePeriodLength: formData.periodLength,
                    lastPeriodStart: "",
                    birthControl: "",
                });
            } else if (step === 4) {
                await completeOnboarding();
                navigate('/app');
                return;
            }

            if (step < 4) {
                setStep(step + 1);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const toggleGoal = (goalId: string) => {
        setFormData(prev => ({
            ...prev,
            goals: prev.goals.includes(goalId)
                ? prev.goals.filter(g => g !== goalId)
                : [...prev.goals, goalId]
        }));
    };

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

                    <div className="auth-card animate-slideUp">
                        {/* Step 1: Identity */}
                        {step === 1 && (
                            <div className="animate-fadeIn">
                                <h1 className="onboarding-title">Welcome</h1>
                                <p className="onboarding-p">Let's personalize your health journey.</p>

                                <div className="form-group" style={{ marginBottom: '24px' }}>
                                    <label>What should we call you?</label>
                                    <div className="input-wrapper">
                                        <User size={18} className="input-icon" />
                                        <input 
                                            type="text" 
                                            placeholder="Alex" 
                                            value={formData.name} 
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                                        />
                                    </div>
                                </div>

                                <div className="form-group-row">
                                    <div className="form-group">
                                        <label>Height (cm)</label>
                                        <div className="input-wrapper">
                                            <TrendingUp size={18} className="input-icon" />
                                            <input 
                                                type="number" 
                                                placeholder="165" 
                                                value={bodyDetails.height} 
                                                onChange={(e) => setBodyDetails({ ...bodyDetails, height: e.target.value })} 
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Weight (kg)</label>
                                        <div className="input-wrapper">
                                            <Heart size={18} className="input-icon" />
                                            <input 
                                                type="number" 
                                                placeholder="58" 
                                                value={bodyDetails.weight} 
                                                onChange={(e) => setBodyDetails({ ...bodyDetails, weight: e.target.value })} 
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
                                                onChange={(e) => setBodyDetails({ ...bodyDetails, dateOfBirth: e.target.value })} 
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Biological Sex</label>
                                        <div className="input-wrapper">
                                            <select
                                                className="select-input"
                                                value={bodyDetails.biologicalSex}
                                                onChange={(e) => setBodyDetails({ ...bodyDetails, biologicalSex: e.target.value })}
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
                                <p className="onboarding-p">Select all that apply.</p>

                                <div className="goals-grid">
                                    {goalOptions.map(goal => {
                                        const Icon = goal.icon;
                                        const isActive = formData.goals.includes(goal.id);
                                        return (
                                            <div 
                                                key={goal.id} 
                                                className={`goal-card ${isActive ? 'active' : ''}`}
                                                onClick={() => toggleGoal(goal.id)}
                                            >
                                                <div className="goal-icon" style={{ 
                                                    background: isActive ? goal.color : 'var(--bg-primary)', 
                                                    color: isActive ? 'white' : goal.color 
                                                }}>
                                                    <Icon size={22} />
                                                </div>
                                                <span className="goal-label">{goal.label}</span>
                                                {isActive && <CheckCircle size={16} className="goal-check" />}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Biosync */}
                        {step === 3 && (
                            <div className="animate-fadeIn">
                                <h1 className="onboarding-title">Biological Sync</h1>
                                <p className="onboarding-p">Help us map your cycle for better recommendations.</p>

                                <div className="form-group" style={{ marginBottom: '24px' }}>
                                    <label>Average Cycle Length (Days)</label>
                                    <div className="input-wrapper">
                                        <Activity size={18} className="input-icon" />
                                        <input 
                                            type="number" 
                                            placeholder="28" 
                                            value={formData.cycleLength} 
                                            onChange={(e) => setFormData({ ...formData, cycleLength: e.target.value })} 
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Average Period Duration (Days)</label>
                                    <div className="input-wrapper">
                                        <Activity size={18} className="input-icon" />
                                        <input 
                                            type="number" 
                                            placeholder="5" 
                                            value={formData.periodLength} 
                                            onChange={(e) => setFormData({ ...formData, periodLength: e.target.value })} 
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Final Plan */}
                        {step === 4 && (
                            <div className="animate-fadeIn">
                                <div className="ai-analysis-header">
                                    <div className="pulse-ai-icon">
                                        <Zap size={32} />
                                    </div>
                                    <h1 className="onboarding-title" style={{ fontSize: '1.75rem' }}>AI Analysis Complete</h1>
                                    <p className="onboarding-p">Your personalized 7-day free protocol is ready.</p>
                                </div>

                                {/* Plan Card */}
                                <div className="stacked-plan-card selected" style={{
                                    border: '2px solid #534AB7',
                                    background: '#F0EFFE',
                                    padding: '24px',
                                    borderRadius: 'var(--radius-lg)',
                                    boxShadow: '0 8px 24px rgba(83,74,183,0.15)'
                                }}>
                                    <div style={{
                                        position: 'absolute', top: '-12px', right: '24px',
                                        background: '#1D9E75', color: 'white', padding: '4px 12px',
                                        borderRadius: '999px', fontSize: '0.8rem', fontWeight: 800
                                    }}>
                                        <Star size={12} fill="white" /> FREE
                                    </div>
                                    <h4 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#534AB7' }}>
                                        7-Day AI Protocol
                                    </h4>
                                    <p>Your personalized plan with AI workouts and nutrition guidance.</p>
                                </div>
                            </div>
                        )}

                        <div className="onboarding-footer">
                            <button 
                                onClick={handleBack} 
                                className={`btn btn-ghost ${step === 1 ? 'hidden' : ''}`}
                            >
                                <ArrowLeft size={18} /> Back
                            </button>
                            <button 
                                onClick={handleNext} 
                                className="btn btn-premium"
                                disabled={loading}
                                style={{ minWidth: '160px' }}
                            >
                                {loading ? "Saving..." : step === 4 ? 'Launch Dashboard' : 'Continue'} 
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Side Panel */}
            <div 
                className="auth-side animate-fadeIn" 
                style={{ 
                    backgroundImage: `linear-gradient(135deg, rgba(13, 148, 136, 0.82) 0%, rgba(139, 92, 246, 0.5) 100%), url('${currentStepData.sideImage}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
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
                        {currentStepData.sideTitle}. We’re tailoring your AI insights as we go.
                    </p>
                </div>
            </div>

            {/* Inline Styles */}
            <style>{`
                /* Your existing styles here - kept clean and functional */
                .onboarding-flow-container { flex: 1; display: flex; flex-direction: column; justify-content: center; max-width: 500px; margin: 0 auto; }
                .goals-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
                .goal-card { padding: 20px; background: white; border: 1px solid var(--border); border-radius: var(--radius-lg); cursor: pointer; transition: all 0.25s; }
                .goal-card.active { background: var(--primary-50); border-color: var(--primary); }
                /* ... other styles ... */
            `}</style>
        </div>
    );
};


export default Onboarding;

