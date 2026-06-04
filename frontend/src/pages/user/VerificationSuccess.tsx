import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Sparkles, Zap } from 'lucide-react';
import '../../styles/Auth.css';

const VerificationSuccess: React.FC = () => {
    const navigate = useNavigate();

    // Subtle auto-redirect to emphasize progress, but wait for user click normally
    // useEffect(() => {
    //     const timeout = setTimeout(() => navigate('/onboarding'), 3000);
    //     return () => clearTimeout(timeout);
    // }, [navigate]);

    return (
        <div className="auth-wrapper">
            <div className="auth-container" style={{ justifyContent: 'center' }}>
                <div className="auth-brand">
                    <div className="auth-logo">C</div>
                    <h1>CycleSync <span>AI</span></h1>
                </div>

                <div className="auth-card animate-slideUp success-card">
                    <div className="success-icon-wrapper">
                        <div className="success-pulse" />
                        <CheckCircle size={80} className="success-icon animate-popIn" />
                    </div>

                    <div className="auth-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h2 className="success-title">Email verified successfully!</h2>
                        <p className="success-subtitle">
                            Your account is now fully active. Let's get started by personalizing your experience.
                        </p>
                    </div>

                    <button 
                        onClick={() => navigate('/onboarding')} 
                        className="btn btn-primary btn-full success-btn"
                    >
                        Start Onboarding <ArrowRight size={20} />
                    </button>

                    <div className="success-footer">
                        <Sparkles size={16} /> <span>Join 10,000+ women optimizing their health</span>
                    </div>
                </div>
            </div>

            <div className="auth-side animate-fadeIn success-side">
                <div className="auth-side-content">
                    <div className="premium-badge">
                        <Zap size={14} /> Journey Begins
                    </div>
                    <h2 className="auth-side-quote">
                        "The first step towards hormonal harmony and peak performance."
                    </h2>
                    <p className="auth-side-subtitle">
                        Your verification is complete. Now it's time to sync your life with your biology.
                    </p>
                    
                    <div className="success-stats">
                        <div className="stat-item">
                            <h4>100%</h4>
                            <span>Secure</span>
                        </div>
                        <div className="stat-item">
                            <h4>24/7</h4>
                            <span>AI Support</span>
                        </div>
                        <div className="stat-item">
                            <h4>Personalized</h4>
                            <span>Workouts</span>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .success-card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 40px !important;
                }

                .success-icon-wrapper {
                    position: relative;
                    margin-bottom: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .success-icon {
                    color: #10b981;
                    z-index: 2;
                }

                .success-pulse {
                    position: absolute;
                    width: 70px;
                    height: 70px;
                    background: rgba(16, 185, 129, 0.2);
                    border-radius: 50%;
                    animation: successPulse 2s infinite;
                    z-index: 1;
                }

                @keyframes successPulse {
                    0% { transform: scale(1); opacity: 0.6; }
                    100% { transform: scale(2); opacity: 0; }
                }

                @keyframes popIn {
                    0% { transform: scale(0.5); opacity: 0; }
                    80% { transform: scale(1.1); opacity: 1; }
                    100% { transform: scale(1); opacity: 1; }
                }

                .animate-popIn {
                    animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                }

                .success-title {
                    font-size: 2rem !important;
                    color: var(--text-primary);
                    font-weight: 900 !important;
                    margin-bottom: 12px;
                }

                .success-subtitle {
                    font-size: 1.1rem;
                    color: var(--text-secondary);
                    max-width: 320px;
                    margin: 0 auto;
                }

                .success-btn {
                    padding: 16px 24px !important;
                    font-size: 1.1rem !important;
                    box-shadow: 0 10px 20px rgba(13, 148, 136, 0.2);
                }

                .success-footer {
                    margin-top: 32px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: var(--text-muted);
                    font-size: 0.85rem;
                    font-weight: 600;
                }

                .success-side {
                    background-image: linear-gradient(135deg, rgba(5, 150, 105, 0.85) 0%, rgba(139, 92, 246, 0.5) 100%), url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200') !important;
                }

                .success-stats {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                    margin-top: 40px;
                    text-align: center;
                }

                .stat-item h4 {
                    font-size: 1.1rem;
                    font-weight: 800;
                    margin-bottom: 4px;
                }

                .stat-item span {
                    font-size: 0.75rem;
                    opacity: 0.8;
                    font-weight: 600;
                    text-transform: uppercase;
                }
            `}</style>
        </div>
    );
};

export default VerificationSuccess;
