import React, { useState,useRef,useEffect } from 'react';
import { useTrainerAuth } from '../../hooks/auth/useTrainerAuth';
import { useNavigate,useLocation } from 'react-router-dom';
import { Mail, ShieldCheck, RefreshCw, Dumbbell } from 'lucide-react';
import { showToast } from '../../components/common/Toast/Toast';
import '../../styles/Auth.css';


const TrainerVerifyEmail: React.FC = () => {
    const {verifyTrainerOtp,resendOTP,loading}=useTrainerAuth();
    const location=useLocation();
    const trainerId=location.state?.trainerId;
    console.log(trainerId);
    // console.log(location.state.trainerId);
    
    
    const email=location.state?.email;
    const navigate = useNavigate();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(30);
    const [isResending, setIsResending] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    useEffect(() => {

  if(timer <= 0) return;

  const interval =
    setInterval(() => {
      setTimer(prev => prev - 1);
    },1000);

  return () =>
    clearInterval(interval);

},[timer]);
    // const email = localStorage.getItem('pendingTrainerVerificationEmail') || 'trainer@cyclesync.ai';
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

    const handleResendOtp=async () => {
    try {
        console.log(location.state?.trainerId);
        
        setIsResending(true);
      await resendOTP({trainerId})
      showToast.success("OTP resent successfully");
      setTimer(30);
    } catch (error) {
      console.error(error);
      
    }
    finally{
        setIsResending(false)
    }
  }

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        const code=otp.join("")
        if(code.length!==6)
        {
            setError(true)
            setErrorMsg("Enter Valid OTP")
            return;
        }
        try {
            await verifyTrainerOtp({
                trainerId,
                otp:code
            })

            navigate("/trainer/success")
        } catch (error:any) {
            setError(true);
            setErrorMsg(error.response?.data?.message||"OTP verification failed")
        }
    };

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
                            <Dumbbell size={16} /> Security Check
                        </div>
                    </div>

                    <div className="auth-header" style={{ textAlign: 'center' }}>
                        <div style={{ 
                            width: '64px', 
                            height: '64px', 
                            background: '#e6fffa', 
                            color: '#0d9488', 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            margin: '0 auto 24px'
                        }}>
                            <Mail size={32} />
                        </div>
                        <h2>Verify your identity</h2>
                        <div className="verify-info" style={{ marginTop: '12px' }}>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                                We've sent a 6-digit confirmation code to <br />
                                <strong style={{ color: 'var(--text-primary)' }}>{email}</strong>
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleVerify} style={{ marginTop: '24px' }}>
                        <div className="otp-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                            <div className="otp-input-wrapper" style={{ display: 'flex', gap: '10px' }}>
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
                                        style={{
                                            width: '45px',
                                            height: '45px',
                                            textAlign: 'center',
                                            fontSize: '1.25rem',
                                            fontWeight: '700',
                                            borderRadius: '8px',
                                            border: error ? '2px solid #ef4444' : '1px solid var(--border)',
                                            outline: 'none',
                                            background: 'var(--bg-primary)',
                                            color: 'var(--text-primary)',
                                            transition: 'border-color 0.2s'
                                        }}
                                        autoFocus={index === 0}
                                    />
                                ))}
                            </div>

                            {error && (
                                <p style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: '600', width: '100%', textAlign: 'center' }}>
                                    {errorMsg || 'Invalid code. Please try again.'}
                                </p>
                            )}

                            <button type="submit" className="btn btn-full" style={{
                                width: '100%',
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
                                boxShadow: '0 4px 12px rgba(13, 148, 136, 0.2)'
                            }}>
                                Verify Code <ShieldCheck size={18} />
                            </button>
                        </div>
                    </form>

                    <div className="resend-container" style={{ marginTop: '32px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        {timer > 0 ? (
                            <p>Resend verification code in <strong>{timer}s</strong></p>
                        ) : (
                            <p>
                                Didn't receive the code?{' '}
                                <button 
                                    className="resend-btn" 
                                    onClick={handleResendOtp}
                                    disabled={isResending}
                                    style={{
                                        border: 'none',
                                        background: 'none',
                                        color: '#0d9488',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        padding: '0 4px'
                                    }}
                                >
                                    {isResending ? (
                                        <><RefreshCw size={12} className="animate-spin" /> Sending...</>
                                    ) : 'Click to resend'}
                                </button>
                            </p>
                        )}
                    </div>

                    <p className="auth-footer" style={{ marginTop: '40px', textAlign: 'center', fontSize: '0.85rem' }}>
                        Incorrect email? <span onClick={() => navigate('/trainer/register')} style={{ color: '#0d9488', fontWeight: '600', cursor: 'pointer' }}>Register again</span>
                    </p>
                </div>
            </div>

            <div className="auth-side animate-fadeIn" style={{
                background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #5eead4 100%)',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div className="auth-side-content" style={{ color: 'white', padding: '40px' }}>
                    <div className="premium-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '24px' }}>
                        <ShieldCheck size={14} /> Professional Validation
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '24px' }}>
                        "Your credentials and data security are our top priorities."
                    </h2>
                    <p style={{ opacity: '0.9', fontSize: '1rem', lineHeight: '1.6' }}>
                        CycleSync AI enforces secure multi-factor authentication to protect our trainer network profiles, billing details, and private client communications.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TrainerVerifyEmail;
