import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, ArrowRight, CheckCircle, Dumbbell } from 'lucide-react';
import '../../styles/Auth.css';

const TrainerForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-container" style={{ justifyContent: 'center' }}>
                {/* Brand */}
                <div className="auth-brand" style={{ justifyContent: 'center', marginBottom: '40px' }}>
                    <div className="auth-logo" style={{ background: 'linear-gradient(135deg, #0d9488, #14b8a6)', width: '48px', height: '48px', fontSize: '1.4rem' }}>C</div>
                    <h1>CycleSync <span style={{ color: '#0d9488' }}>AI</span></h1>
                </div>

                <div className="auth-card animate-slideUp" style={{
                    background: 'var(--bg-card)',
                    padding: '40px',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-lg)'
                }}>
                    {/* Trainer Badge */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '6px 16px',
                            borderRadius: 'var(--radius-full)',
                            background: '#f0fdfa',
                            border: '1px solid #99f6e4',
                            color: '#0d9488',
                            fontSize: '0.85rem',
                            fontWeight: '600'
                        }}>
                            <Dumbbell size={16} /> Trainer Portal
                        </div>
                    </div>

                    {!submitted ? (
                        <>
                            <div className="auth-header" style={{ textAlign: 'center' }}>
                                <h2>Forgot Password?</h2>
                                <p>No worries! Enter your trainer email and we'll send you a reset code.</p>
                            </div>

                            <form className="auth-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <div className="input-wrapper">
                                        <Mail size={18} className="input-icon" />
                                        <input
                                            type="email"
                                            id="trainer-forgot-email"
                                            placeholder="trainer@cyclesync.ai"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-full" style={{
                                    padding: '14px',
                                    background: 'linear-gradient(135deg, #0d9488, #14b8a6)',
                                    color: 'white',
                                    borderRadius: 'var(--radius-md)',
                                    fontWeight: '600',
                                    fontSize: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    marginTop: '8px',
                                    transition: 'opacity 0.2s'
                                }}>
                                    Send Reset Code <ArrowRight size={18} />
                                </button>
                            </form>

                            <div className="auth-footer" style={{ marginTop: '32px', textAlign: 'center' }}>
                                <Link to="/trainer-panel/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                                    <ArrowLeft size={16} /> Back to Trainer Login
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '20px 0' }}>
                            <div style={{
                                width: '72px',
                                height: '72px',
                                background: '#f0fdfa',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 24px auto',
                                color: '#0d9488'
                            }}>
                                <CheckCircle size={36} />
                            </div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '12px' }}>Check Your Email</h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '32px' }}>
                                We've sent a 6-digit verification code to<br />
                                <strong style={{ color: 'var(--text-primary)' }}>{email}</strong>
                            </p>

                            <Link to={`/trainer-panel/reset-password?email=${encodeURIComponent(email)}`} className="btn btn-full" style={{
                                padding: '14px',
                                background: 'linear-gradient(135deg, #0d9488, #14b8a6)',
                                color: 'white',
                                borderRadius: 'var(--radius-md)',
                                fontWeight: '600',
                                fontSize: '1rem',
                                display: 'block',
                                textAlign: 'center',
                                marginBottom: '16px',
                                transition: 'opacity 0.2s'
                            }}>
                                Enter Reset Code
                            </Link>

                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                Didn't receive the email? Check your spam folder or{' '}
                                <button onClick={() => setSubmitted(false)} style={{ color: '#0d9488', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>try again</button>.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Side Panel */}
            <div className="auth-side" style={{
                background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #5eead4 100%)',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div className="auth-side-content" style={{ textAlign: 'center' }}>
                    <div style={{ marginBottom: '32px' }}>
                        <Dumbbell size={64} color="rgba(255,255,255,0.4)" />
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '16px' }}>Account Recovery</h2>
                    <p style={{ fontSize: '1.1rem', opacity: 0.8, lineHeight: '1.6' }}>
                        Securely reset your trainer account password. You'll be back to managing your clients in no time.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TrainerForgotPassword;
