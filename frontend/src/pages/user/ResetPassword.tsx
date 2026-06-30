import React, { useState, useRef, useEffect } from 'react';
import { useUserAuth } from '../../hooks/auth/useUserAuth';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Lock, ArrowRight, CheckCircle, Eye, EyeOff, ShieldCheck, RefreshCw } from 'lucide-react';
import '../../styles/Auth.css';

const ResetPasswordPage: React.FC = () => {
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
    const {resetPassword}=useUserAuth();
    
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

    const handleSubmit = async (e: React.FormEvent) => {
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
        try {
            await resetPassword({userId:searchParams.get("userId")!,otp:code,newPassword:password});
            alert("Password reset successfully");
            navigate("/login")
        } catch (error) {
            setError(true)
        }
    };

    const handleResend = () => {
        setIsResending(true);
        // Here you would call your backend endpoint (e.g., POST /api/v1/auth/forgot-password)
        setTimeout(() => {
            setIsResending(false);
            setTimer(30);
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        }, 1500);
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-container" style={{ justifyContent: 'center' }}>
                <div className="auth-brand">
                    <div className="auth-logo">C</div>
                    <h1>CycleSync <span>AI</span></h1>
                </div>

                <div className="auth-card animate-slideUp">
                    <>
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
                                <Lock size={32} />
                            </div>
                            <h2>Reset Your Password</h2>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                Enter the 6-digit code sent to <br/><strong>{email}</strong>
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
                                                className={`otp-field ${error ? 'error' : ''}`}
                                                autoFocus={index === 0}
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
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Confirm New Password</label>
                                <div className="input-wrapper">
                                    <Lock size={18} className="input-icon" />
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
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
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {password && confirmPassword && password !== confirmPassword && (
                                    <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '6px' }}>
                                        Passwords do not match
                                    </p>
                                )}
                            </div>

                            <button 
                                type="submit" 
                                className="btn btn-primary btn-full"
                                style={{ marginTop: '12px' }}
                                disabled={password !== confirmPassword || password.length < 8}
                            >
                                Update Password <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                            </button>
                        </form>
                        
                        <div className="resend-container" style={{ marginTop: '32px', textAlign: 'center' }}>
                            {timer > 0 ? (
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Resend code in <strong>{timer}s</strong></p>
                            ) : (
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                    Didn't receive the code? 
                                    <button 
                                        className="resend-btn" 
                                        onClick={handleResend}
                                        disabled={isResending}
                                        style={{ marginLeft: '6px', color: 'var(--primary)', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                    >
                                        {isResending ? (
                                            <><RefreshCw size={14} className="animate-spin" style={{ marginRight: '4px', display: 'inline-block', verticalAlign: 'middle' }} /> Sending...</>
                                        ) : 'Click to resend'}
                                    </button>
                                </p>
                            )}
                        </div>
                        
                        <p className="auth-footer" style={{ marginTop: '32px' }}>
                            Back to <Link to="/login">Login</Link>
                        </p>
                    </>
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

export default ResetPasswordPage;
