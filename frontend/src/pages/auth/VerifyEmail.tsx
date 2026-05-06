import React, { useState, useRef, useEffect } from 'react';
import { Mail, ShieldCheck, RefreshCw } from 'lucide-react';
import '../../styles/Auth.css';

const VerifyEmailPage: React.FC = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(30);
    const [isResending, setIsResending] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg] = useState('');
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Static email (UI only)
    const email = 'user@example.com';

    useEffect(() => {
        let interval: any;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        setError(false);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleResend = () => {
        setIsResending(true);

        setTimeout(() => {
            setIsResending(false);
            setTimer(30);
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        }, 1000);
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-container" style={{ justifyContent: 'center' }}>
                <div className="auth-brand">
                    <div className="auth-logo">C</div>
                    <h1>CycleSync <span>AI</span></h1>
                </div>

                <div className="auth-card animate-slideUp">
                    <div className="auth-header" style={{ textAlign: 'center' }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            background: 'var(--primary-100)',
                            color: 'var(--primary)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px'
                        }}>
                            <Mail size={32} />
                        </div>

                        <h2>Verify your email</h2>

                        <div className="verify-info">
                            <p>
                                We've sent a 6-digit verification code to <br />
                                <strong>{email}</strong>
                            </p>
                        </div>
                    </div>

                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="otp-container">
                            <div className="otp-input-wrapper">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        ref={(el) => { inputRefs.current[index] = el; }}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className={`otp-field ${error ? 'error' : ''}`}
                                        autoFocus={index === 0}
                                    />
                                ))}
                            </div>

                            {error && (
                                <p style={{
                                    color: '#ef4444',
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    marginTop: '-12px'
                                }}>
                                    {errorMsg || 'Invalid code. Please try again.'}
                                </p>
                            )}

                            <button type="submit" className="btn btn-primary btn-full">
                                Verify Email <ShieldCheck size={18} style={{ marginLeft: '8px' }} />
                            </button>
                        </div>
                    </form>

                    <div className="resend-container" style={{ marginTop: '32px' }}>
                        {timer > 0 ? (
                            <p>Resend code in <strong>{timer}s</strong></p>
                        ) : (
                            <p>
                                Didn't receive the code?
                                <button
                                    className="resend-btn"
                                    onClick={handleResend}
                                    disabled={isResending}
                                >
                                    {isResending ? (
                                        <><RefreshCw size={14} className="animate-spin" /> Sending...</>
                                    ) : 'Click to resend'}
                                </button>
                            </p>
                        )}
                    </div>

                    <p className="auth-footer" style={{ marginTop: '48px' }}>
                        Back to <span style={{ fontWeight: 600 }}>Registration</span>
                    </p>
                </div>
            </div>

            <div className="auth-side animate-fadeIn">
                <div className="auth-side-content">
                    <div className="premium-badge">
                        <ShieldCheck size={14} /> Secure Access
                    </div>

                    <h2 className="auth-side-quote">
                        "Your health data, protected by industry-standard encryption."
                    </h2>

                    <p className="auth-side-subtitle">
                        CycleSync AI uses multi-factor authentication to ensure your intimate biological insights remain private and secure.
                    </p>

                    <div className="testimonial-micro" style={{ background: 'rgba(255,255,255,0.1)' }}>
                        <p style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '12px' }}>
                            "The security measures here are top-notch. I feel completely safe logging my most personal data."
                        </p>
                        <span className="user">— Verified User</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmailPage;