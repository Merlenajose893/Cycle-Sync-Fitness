import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Lock, ArrowRight, Eye, EyeOff, Dumbbell, RefreshCw } from 'lucide-react';
import '../../styles/Auth.css';

const TrainerResetPassword: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email') || 'your email';

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [timer, setTimer] = useState(30);
    const [isResending, setIsResending] = useState(false);

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        let interval: any;
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
        setError(false);

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
            setError(false);
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const code = otp.join('');

        if (code.length < 6) {
            setError(true);
            return;
        }

        if (password !== confirmPassword) {
            return;
        }

        // Mock verification
        if (code === '123456') {
            setSuccess(true);
            setTimeout(() => {
                navigate('/trainer-panel/login');
            }, 3000);
        } else {
            setError(true);
        }
    };

    const handleResend = () => {
        setIsResending(true);
        setTimeout(() => {
            setIsResending(false);
            setTimer(30);
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        }, 1500);
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
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: '#f0fdfa',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px',
                            color: '#0d9488',
                            animation: 'pulse 2s ease-in-out infinite'
                        }}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6 9 17l-5-5" />
                            </svg>
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
                            @keyframes pulse {
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
                            <Dumbbell size={64} color="rgba(255,255,255,0.4)" />
                        </div>
                        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '16px' }}>Welcome Back!</h2>
                        <p style={{ fontSize: '1.1rem', opacity: 0.8, lineHeight: '1.6' }}>
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
                            width: '64px',
                            height: '64px',
                            background: '#f0fdfa',
                            color: '#0d9488',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px'
                        }}>
                            <Lock size={32} />
                        </div>
                        <h2>Reset Your Password</h2>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            Enter the 6-digit code sent to <br /><strong>{email}</strong>
                        </p>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
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
                                            className={`otp-field ${error ? 'error' : ''}`}
                                            autoFocus={index === 0}
                                            style={{
                                                borderColor: error ? '#ef4444' : undefined,
                                                color: error ? '#ef4444' : undefined
                                            }}
                                        />
                                    ))}
                                </div>
                                {error && (
                                    <p style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: '600', marginTop: '8px', textAlign: 'center' }}>
                                        Invalid code. For testing, use: 123456
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>New Password</label>
                            <div className="input-wrapper">
                                <Lock size={18} className="input-icon" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="trainer-new-password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={8}
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '0 12px' }}
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
                            <label>Confirm New Password</label>
                            <div className="input-wrapper">
                                <Lock size={18} className="input-icon" />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="trainer-confirm-password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    minLength={8}
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '0 12px' }}
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {password && confirmPassword && password !== confirmPassword && (
                                <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '6px' }}>
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
                            style={{
                                marginTop: '12px',
                                padding: '14px',
                                background: password !== confirmPassword || password.length < 8
                                    ? '#d1d5db'
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
                                cursor: password !== confirmPassword || password.length < 8 ? 'not-allowed' : 'pointer',
                                opacity: password !== confirmPassword || password.length < 8 ? 0.7 : 1
                            }}
                            disabled={password !== confirmPassword || password.length < 8}
                        >
                            Update Password <ArrowRight size={18} />
                        </button>
                    </form>

                    <div className="resend-container" style={{ marginTop: '32px', textAlign: 'center' }}>
                        {timer > 0 ? (
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Resend code in <strong style={{ color: '#0d9488' }}>{timer}s</strong></p>
                        ) : (
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                Didn't receive the code?
                                <button
                                    className="resend-btn"
                                    onClick={handleResend}
                                    disabled={isResending}
                                    style={{ marginLeft: '6px', color: '#0d9488', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                >
                                    {isResending ? (
                                        <><RefreshCw size={14} className="animate-spin" style={{ marginRight: '4px', display: 'inline-block', verticalAlign: 'middle' }} /> Sending...</>
                                    ) : 'Click to resend'}
                                </button>
                            </p>
                        )}
                    </div>

                    <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        Back to <Link to="/trainer-panel/login" style={{ color: '#0d9488', fontWeight: '600' }}>Trainer Login</Link>
                    </p>
                </div>
            </div>

            <div className="auth-side" style={{
                background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #5eead4 100%)',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div className="auth-side-content" style={{ textAlign: 'center' }}>
                    <div style={{ marginBottom: '32px' }}>
                        <Dumbbell size={64} color="rgba(255,255,255,0.4)" />
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '16px' }}>Secure Reset</h2>
                    <p style={{ fontSize: '1.1rem', opacity: 0.8, lineHeight: '1.6' }}>
                        Your trainer account is protected with industry-standard encryption. Set a strong password to keep your data safe.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TrainerResetPassword;
