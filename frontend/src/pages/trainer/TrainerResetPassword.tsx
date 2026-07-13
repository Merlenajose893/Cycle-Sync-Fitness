import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Lock, ArrowRight, Eye, EyeOff, Dumbbell, RefreshCw, Shield, AlertCircle, Loader2, CheckCircle } from 'lucide-react';
import '../../styles/Auth.css';
import { useTrainerAuth } from '../../hooks/auth/useTrainerAuth';

const TrainerResetPassword: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email') || 'your email';

    const { resetPassword, forgotPassword, loading, error: apiError } = useTrainerAuth();

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [timer, setTimer] = useState(30);
    const [isResending, setIsResending] = useState(false);

    const [otpError, setOtpError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [success, setSuccess] = useState(false);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        setOtpError('');

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleOtpPaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (pasted.length > 0) {
            const newOtp = [...otp];
            for (let i = 0; i < 6; i++) {
                newOtp[i] = pasted[i] || '';
            }
            setOtp(newOtp);
            setOtpError('');
            const focusIndex = Math.min(pasted.length, 5);
            inputRefs.current[focusIndex]?.focus();
        }
    };

    // Password strength calculation
    const getPasswordStrength = (pw: string) => {
        let score = 0;
        if (pw.length >= 8) score++;
        if (/[A-Z]/.test(pw)) score++;
        if (/[a-z]/.test(pw)) score++;
        if (/\d/.test(pw)) score++;
        if (/[^A-Za-z0-9]/.test(pw)) score++;
        return score;
    };

    const strengthScore = getPasswordStrength(password);
    const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][strengthScore] || '';
    const strengthColor = ['', '#ef4444', '#f97316', '#eab308', '#22c55e', '#0d9488'][strengthScore] || '';

    const validateForm = (): boolean => {
        const code = otp.join('');

        if (code.length < 6) {
            setOtpError('Please enter the complete 6-digit code');
            return false;
        }

        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters');
            return false;
        }

        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return false;
        }

        setOtpError('');
        setPasswordError('');
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        const code = otp.join('');

        try {
            await resetPassword({
                trainerId: email,
                otp: code,
                newPassword: password
            });

            setSuccess(true);
            setTimeout(() => {
                navigate('/trainer/login');
            }, 3000);
        } catch {
            setOtpError(apiError || 'Password reset failed. Please check your code and try again.');
        }
    };

    const handleResend = async () => {
        if (email === 'your email') return;

        setIsResending(true);
        try {
            await forgotPassword({ email });
            setTimer(30);
            setOtp(['', '', '', '', '', '']);
            setOtpError('');
            inputRefs.current[0]?.focus();
        } catch {
            // Error handled by hook
        } finally {
            setIsResending(false);
        }
    };

    if (success) {
        return (
            <div className="auth-wrapper">
                <div className="auth-container" style={{ justifyContent: 'center' }}>
                    <div className="auth-brand" style={{ justifyContent: 'center', marginBottom: '40px' }}>
                        <div className="auth-logo" style={{ background: 'linear-gradient(135deg, #0d9488, #14b8a6)', width: '48px', height: '48px', fontSize: '1.4rem' }}>C</div>
                        <h1>CycleSync <span style={{ color: '#0d9488' }}>AI</span></h1>
                    </div>

                    <div className="auth-card animate-slideUp" style={{
                        background: 'var(--bg-card)',
                        padding: '48px 40px',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border)',
                        boxShadow: 'var(--shadow-lg)',
                        textAlign: 'center'
                    }}>
                        {/* Trainer Badge */}
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
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

                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'linear-gradient(135deg, #f0fdfa, #ccfbf1)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px',
                            color: '#0d9488',
                            boxShadow: '0 8px 24px rgba(13, 148, 136, 0.15)',
                            animation: 'successPulse 2s ease-in-out infinite'
                        }}>
                            <CheckCircle size={40} />
                        </div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '12px', color: '#0d9488' }}>Password Updated!</h2>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px' }}>
                            Your trainer account password has been successfully reset. Redirecting you to the login page...
                        </p>
                        <div style={{
                            width: '100%',
                            height: '4px',
                            background: '#e5e7eb',
                            borderRadius: '2px',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                height: '100%',
                                background: 'linear-gradient(135deg, #0d9488, #14b8a6)',
                                borderRadius: '2px',
                                animation: 'progressBar 3s ease-in-out forwards'
                            }} />
                        </div>
                        <style>{`
                            @keyframes progressBar {
                                from { width: 0%; }
                                to { width: 100%; }
                            }
                            @keyframes successPulse {
                                0%, 100% { transform: scale(1); }
                                50% { transform: scale(1.05); }
                            }
                        `}</style>
                    </div>
                </div>

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
                                <CheckCircle size={48} color="rgba(255,255,255,0.8)" />
                            </div>
                        </div>
                        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '16px' }}>Welcome Back!</h2>
                        <p style={{ fontSize: '1.1rem', opacity: 0.85, lineHeight: '1.7' }}>
                            Your account is secured. Get back to empowering your clients with personalized training.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-container" style={{ justifyContent: 'center' }}>
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
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
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

                    <div className="auth-header" style={{ textAlign: 'center' }}>
                        <div style={{
                            width: '72px',
                            height: '72px',
                            background: 'linear-gradient(135deg, #f0fdfa, #ccfbf1)',
                            color: '#0d9488',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px',
                            boxShadow: '0 8px 24px rgba(13, 148, 136, 0.12)'
                        }}>
                            <Lock size={36} />
                        </div>
                        <h2>Reset Your Password</h2>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                            Enter the 6-digit code sent to <br /><strong style={{ color: 'var(--text-primary)' }}>{email}</strong>
                        </p>
                    </div>

                    {/* API Error Message */}
                    {(apiError || otpError) && (
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
                            <span>{otpError || apiError}</span>
                        </div>
                    )}

                    <form className="auth-form" onSubmit={handleSubmit} noValidate>
                        <div className="form-group">
                            <label style={{ textAlign: 'center', display: 'block', marginBottom: '12px' }}>Verification Code</label>
                            <div className="otp-container" style={{ marginBottom: '24px' }}>
                                <div className="otp-input-wrapper">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            maxLength={1}
                                            value={digit}
                                            ref={(el) => { inputRefs.current[index] = el; }}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                            onPaste={index === 0 ? handleOtpPaste : undefined}
                                            className={`otp-field ${otpError ? 'error' : ''}`}
                                            autoFocus={index === 0}
                                            id={`trainer-reset-otp-${index}`}
                                            style={{
                                                borderColor: otpError ? '#ef4444' : undefined,
                                                color: otpError ? '#ef4444' : undefined
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="trainer-new-password">New Password</label>
                            <div className="input-wrapper">
                                <Lock size={18} className="input-icon" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="trainer-new-password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setPasswordError('');
                                    }}
                                    className={passwordError && password.length < 8 ? 'error' : ''}
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    className="show-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {/* Password Strength Indicator */}
                            {password && (
                                <div style={{ marginTop: '10px' }}>
                                    <div style={{ display: 'flex', gap: '4px', marginBottom: '6px' }}>
                                        {[1, 2, 3, 4, 5].map((level) => (
                                            <div key={level} style={{
                                                flex: 1,
                                                height: '4px',
                                                borderRadius: '2px',
                                                background: level <= strengthScore ? strengthColor : '#e5e7eb',
                                                transition: 'background 0.3s ease'
                                            }} />
                                        ))}
                                    </div>
                                    <p style={{ fontSize: '0.8rem', color: strengthColor, fontWeight: '600', margin: 0 }}>
                                        {strengthLabel}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="trainer-confirm-password">Confirm New Password</label>
                            <div className="input-wrapper">
                                <Lock size={18} className="input-icon" />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="trainer-confirm-password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        setPasswordError('');
                                    }}
                                    className={passwordError && password !== confirmPassword ? 'error' : ''}
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    className="show-password"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {password && confirmPassword && password !== confirmPassword && (
                                <p className="error-text">
                                    Passwords do not match
                                </p>
                            )}
                            {password && confirmPassword && password === confirmPassword && confirmPassword.length >= 8 && (
                                <p style={{ color: '#0d9488', fontSize: '0.85rem', marginTop: '6px', fontWeight: '500' }}>
                                    ✓ Passwords match
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-full"
                            disabled={loading || password !== confirmPassword || password.length < 8}
                            style={{
                                marginTop: '12px',
                                padding: '14px',
                                background: password !== confirmPassword || password.length < 8
                                    ? '#d1d5db'
                                    : loading
                                        ? '#94a3b8'
                                        : 'linear-gradient(135deg, #0d9488, #14b8a6)',
                                color: 'white',
                                borderRadius: 'var(--radius-md)',
                                fontWeight: '600',
                                fontSize: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                transition: 'all 0.2s',
                                cursor: password !== confirmPassword || password.length < 8 || loading ? 'not-allowed' : 'pointer',
                                opacity: password !== confirmPassword || password.length < 8 || loading ? 0.7 : 1
                            }}
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                                    Updating Password...
                                </>
                            ) : (
                                <>
                                    Update Password <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Security Info */}
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
                        <span>Your password is encrypted with industry-standard security. Choose a strong, unique password.</span>
                    </div>

                    <div className="resend-container" style={{ marginTop: '24px', textAlign: 'center' }}>
                        {timer > 0 ? (
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                Resend code in <strong style={{ color: '#0d9488' }}>{timer}s</strong>
                            </p>
                        ) : (
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                Didn't receive the code?
                                <button
                                    className="resend-btn"
                                    onClick={handleResend}
                                    disabled={isResending}
                                    style={{ marginLeft: '6px' }}
                                >
                                    {isResending ? (
                                        <>
                                            <RefreshCw size={14} style={{ marginRight: '4px', display: 'inline-block', verticalAlign: 'middle', animation: 'spin 1s linear infinite' }} />
                                            Sending...
                                        </>
                                    ) : 'Click to resend'}
                                </button>
                            </p>
                        )}
                    </div>

                    <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        Back to <Link to="/trainer/login" style={{ color: '#0d9488', fontWeight: '600' }}>Trainer Login</Link>
                    </p>
                </div>

                {/* Inline keyframes for spinner */}
                <style>{`
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                `}</style>
            </div>

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
                        🔐 Secure Reset
                    </div>

                    <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '16px' }}>Secure Reset</h2>
                    <p style={{ fontSize: '1.1rem', opacity: 0.85, lineHeight: '1.7' }}>
                        Your trainer account is protected with industry-standard encryption. Set a strong password to keep your data safe.
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
                            { icon: '🔑', text: 'One-time verification codes' },
                            { icon: '🛡️', text: 'End-to-end encrypted' },
                            { icon: '✅', text: 'Password strength validation' }
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

export default TrainerResetPassword;
