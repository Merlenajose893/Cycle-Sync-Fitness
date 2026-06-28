import React from 'react';
// import { useNavigate } from 'react-serif';
import { useNavigate as useNav } from 'react-router-dom';
import { CheckCircle, ArrowRight, Sparkles, Dumbbell } from 'lucide-react';
import '../../styles/Auth.css';

const TrainerVerificationSuccess: React.FC = () => {
    const navigate = useNav();

    return (
        <div className="auth-wrapper">
            <div className="auth-container" style={{ justifyContent: 'center' }}>
                <div className="auth-brand" style={{ justifyContent: 'center', marginBottom: '40px' }}>
                    <div className="auth-logo" style={{ background: 'linear-gradient(135deg, #0d9488, #14b8a6)', width: '48px', height: '48px', fontSize: '1.4rem' }}>C</div>
                    <h1>CycleSync <span style={{ color: '#0d9488' }}>AI</span></h1>
                </div>

                <div className="auth-card animate-slideUp success-card" style={{
                    background: 'var(--bg-card)',
                    padding: '40px',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <div className="success-icon-wrapper" style={{ position: 'relative', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="success-pulse" style={{
                            position: 'absolute',
                            width: '70px',
                            height: '70px',
                            background: 'rgba(13, 148, 136, 0.2)',
                            border_radius: '50%',
                            borderRadius: '50%',
                            animation: 'successPulse 2s infinite',
                            zIndex: 1
                        }} />
                        <CheckCircle size={80} className="success-icon animate-popIn" style={{ color: '#0d9488', zIndex: 2 }} />
                    </div>

                    <div className="auth-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h2 className="success-title" style={{ fontSize: '2rem', color: 'var(--text-primary)', fontWeight: 900, marginBottom: '12px' }}>Email verified!</h2>
                        <p className="success-subtitle" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '340px', margin: '0 auto', lineHeight: '1.5' }}>
                            Your expert trainer credentials are now active. Let's finish setting up your profile.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate('/trainer/onboarding')}
                        className="btn btn-full success-btn"
                        style={{
                            width: '100%',
                            padding: '16px 24px',
                            fontSize: '1.1rem',
                            background: 'linear-gradient(135deg, #0d9488, #14b8a6)',
                            color: 'white',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            boxShadow: '0 10px 20px rgba(13, 148, 136, 0.2)',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Start Trainer Onboarding <ArrowRight size={20} />
                    </button>

                    <div className="success-footer" style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>
                        <Sparkles size={16} style={{ color: '#0d9488' }} /> <span>Join a premium network of biological health coaches</span>
                    </div>
                </div>
            </div>

            <div className="auth-side animate-fadeIn success-side" style={{
                backgroundImage: `linear-gradient(135deg, rgba(13, 148, 136, 0.85) 0%, rgba(20, 184, 166, 0.5) 100%), url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1200')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div className="auth-side-content" style={{ color: 'white', padding: '40px' }}>
                    <div className="premium-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '24px' }}>
                        <Dumbbell size={14} /> Trainer Access Granted
                    </div>
                    <h2 className="auth-side-quote" style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '24px' }}>
                        "Elevating coaching through scientific cycle syncing."
                    </h2>
                    <p className="auth-side-subtitle" style={{ opacity: '0.9', fontSize: '1rem', lineHeight: '1.6' }}>
                        Verification is complete. You can now build customized workout programs and nutrition recommendations based on client cycle phases.
                    </p>
                </div>
            </div>

            <style>{`
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
            `}</style>
        </div>
    );
};

export default TrainerVerificationSuccess;
