import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, ArrowRight, CheckCircle, Dumbbell, Shield, Clock, AlertCircle, Loader2 } from 'lucide-react';
import '../../styles/Auth.css';
import { useTrainerAuth } from '../../hooks/auth/useTrainerAuth';

const TrainerForgotPassword: React.FC = () => {
    const navigate = useNavigate();
    const { forgetPassword, loading, error } = useTrainerAuth();

    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [touched, setTouched] = useState(false);

    const validateEmail = (value: string): string => {
        if (!value.trim()) return 'Email address is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return '';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        if (touched) {
            setEmailError(validateEmail(value));
        }
    };

    const handleBlur = () => {
        setTouched(true);
        setEmailError(validateEmail(email));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setTouched(true);

        const validationError = validateEmail(email);
        if (validationError) {
            setEmailError(validationError);
            return;
        }

        try {
            await forgetPassword({ email: email.trim() });
            setSubmitted(true);
        } catch {
            // Error is handled by the hook's error state
        }
    };

    const handleTryAgain = () => {
        setSubmitted(false);
        setEmail('');
        setEmailError('');
        setTouched(false);
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
                            {/* Header with Icon */}
                            <div className="auth-header" style={{ textAlign: 'center' }}>
                                <div style={{
                                    width: '72px',
                                    height: '72px',
                                    background: 'linear-gradient(135deg, #f0fdfa, #ccfbf1)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 24px auto',
                                    color: '#0d9488',
                                    boxShadow: '0 8px 24px rgba(13, 148, 136, 0.12)'
                                }}>
                                    <Shield size={36} />
                                </div>
                                <h2>Forgot Password?</h2>
                                <p style={{ lineHeight: '1.6' }}>
                                    No worries! Enter your trainer email and we'll send you a secure reset code.
                                </p>
                            </div>

                            {/* API Error Message */}
                            {error && (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '12px 16px',
                                    background: '#fef2f2',
                                    border: '1px solid #fecaca',
                                    borderRadius: 'var(--radius-md)',
                                    color: '#dc2626',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    marginBottom: '20px',
                                    animation: 'fadeIn 0.3s ease-out'
                                }}>
                                    <AlertCircle size={18} style={{ flexShrink: 0 }} />
                                    <span>{error}</span>
                                </div>
                            )}

                            <form className="auth-form" onSubmit={handleSubmit} noValidate>
                                <div className="form-group">
                                    <label htmlFor="trainer-forgot-email">Email Address</label>
                                    <div className="input-wrapper">
                                        <Mail size={18} className="input-icon" />
                                        <input
                                            type="email"
                                            id="trainer-forgot-email"
                                            placeholder="trainer@cyclesync.ai"
                                            value={email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={emailError && touched ? 'error' : ''}
                                            autoComplete="email"
                                            autoFocus
                                        />
                                    </div>
                                    {emailError && touched && (
                                        <p className="error-text">{emailError}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-full"
                                    disabled={loading}
                                    style={{
                                        padding: '14px',
                                        background: loading ? '#94a3b8' : 'linear-gradient(135deg, #0d9488, #14b8a6)',
                                        color: 'white',
                                        borderRadius: 'var(--radius-md)',
                                        fontWeight: '600',
                                        fontSize: '1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        marginTop: '8px',
                                        transition: 'all 0.2s',
                                        opacity: loading ? 0.7 : 1,
                                        cursor: loading ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                                            Sending Reset Code...
                                        </>
                                    ) : (
                                        <>
                                            Send Reset Code <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Security Note */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '12px 16px',
                                background: '#f8fafc',
                                borderRadius: 'var(--radius-md)',
                                marginTop: '24px',
                                fontSize: '0.8rem',
                                color: 'var(--text-muted)',
                                lineHeight: '1.5'
                            }}>
                                <Shield size={14} style={{ flexShrink: 0, color: '#0d9488' }} />
                                <span>We'll send a 6-digit verification code to your registered email. The code expires in 10 minutes.</span>
                            </div>

                            <div className="auth-footer" style={{ marginTop: '28px', textAlign: 'center' }}>
                                <Link
                                    to="/trainer/login"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        color: 'var(--text-secondary)',
                                        fontWeight: '500',
                                        fontSize: '0.9rem',
                                        transition: 'color 0.2s'
                                    }}
                                >
                                    <ArrowLeft size={16} /> Back to Trainer Login
                                </Link>
                            </div>
                        </>
                    ) : (
                        /* Success State */
                        <div style={{ textAlign: 'center', padding: '20px 0' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: 'linear-gradient(135deg, #f0fdfa, #ccfbf1)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 24px auto',
                                color: '#0d9488',
                                boxShadow: '0 8px 24px rgba(13, 148, 136, 0.15)',
                                animation: 'scaleIn 0.4s ease-out'
                            }}>
                                <CheckCircle size={40} />
                            </div>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)' }}>
                                Check Your Email
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '28px', fontSize: '0.95rem' }}>
                                We've sent a 6-digit verification code to<br />
                                <strong style={{ color: 'var(--text-primary)' }}>{email}</strong>
                            </p>

                            {/* Info Cards */}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                                marginBottom: '28px',
                                textAlign: 'left'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '14px 16px',
                                    background: '#f0fdfa',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid #99f6e4'
                                }}>
                                    <Clock size={18} style={{ color: '#0d9488', flexShrink: 0 }} />
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                        Code expires in <strong style={{ color: '#0d9488' }}>10 minutes</strong>
                                    </span>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '14px 16px',
                                    background: '#f8fafc',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--border)'
                                }}>
                                    <Mail size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                        Check your spam folder if you don't see it
                                    </span>
                                </div>
                            </div>

                            <Link
                                to={`/trainer/reset-password?email=${encodeURIComponent(email)}`}
                                className="btn btn-full"
                                style={{
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
                                    marginBottom: '16px',
                                    transition: 'all 0.2s'
                                }}
                            >
                                Enter Reset Code <ArrowRight size={18} />
                            </Link>

                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                                Didn't receive the email?{' '}
                                <button
                                    onClick={handleTryAgain}
                                    style={{
                                        color: '#0d9488',
                                        fontWeight: '600',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: 0,
                                        textDecoration: 'underline',
                                        textUnderlineOffset: '2px'
                                    }}
                                >
                                    Try again
                                </button>
                            </p>
                        </div>
                    )}
                </div>

                {/* Inline keyframes for spinner */}
                <style>{`
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                `}</style>
            </div>

            {/* Side Panel */}
            <div className="auth-side" style={{
                background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #5eead4 100%)',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div className="auth-side-content" style={{ textAlign: 'center' }}>
                    <div style={{ marginBottom: '32px' }}>
                        <div style={{
                            width: '96px',
                            height: '96px',
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255,255,255,0.15)'
                        }}>
                            <Shield size={48} color="rgba(255,255,255,0.8)" />
                        </div>
                    </div>

                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 14px',
                        background: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '40px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        textTransform: 'uppercase' as const,
                        letterSpacing: '1px',
                        marginBottom: '24px',
                        color: 'white'
                    }}>
                        🔒 Secure Recovery
                    </div>

                    <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '16px' }}>
                        Account Recovery
                    </h2>
                    <p style={{ fontSize: '1.1rem', opacity: 0.85, lineHeight: '1.7' }}>
                        Securely reset your trainer account password. You'll be back to managing your clients in no time.
                    </p>

                    {/* Feature list */}
                    <div style={{
                        marginTop: '40px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        textAlign: 'left'
                    }}>
                        {[
                            { icon: '🔐', text: 'Encrypted verification codes' },
                            { icon: '⚡', text: 'Reset in under 2 minutes' },
                            { icon: '🛡️', text: 'Protected by 2FA security' }
                        ].map((item, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px 16px',
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: 'var(--radius-md)',
                                backdropFilter: 'blur(4px)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                fontSize: '0.95rem',
                                fontWeight: '500'
                            }}>
                                <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                                {item.text}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainerForgotPassword;
