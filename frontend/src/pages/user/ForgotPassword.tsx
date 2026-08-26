import React, { useState } from 'react';
import { useUserAuth } from '../../hooks/auth/useUserAuth';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import '../../styles/Auth.css';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigate=useNavigate()
  const [submitted, setSubmitted] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const {forgotPassword,loading,error}=useUserAuth();

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await forgotPassword({email});
        if (response?.data?.userId) {
          setUserId(response.data.userId);
        }
        setSubmitted(true);
    } catch (err) {
        console.error(err);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container" style={{ justifyContent: 'center' }}>
        {/* Brand */}
        <div className="auth-brand" style={{ justifyContent: 'center', marginBottom: '40px' }}>
          <div className="auth-logo">C</div>
          <h1>CycleSync <span>AI</span></h1>
        </div>

        <div className="auth-card animate-slideUp">
          {!submitted ? (
            <>
              <div className="auth-header" style={{ textAlign: 'center' }}>
                <h2>Forgot Password?</h2>
                <p>No worries! Enter your email and we'll send you a reset link.</p>
              </div>
              {error && (
  <p style={{ color: "red", marginTop: "10px" }}>
    {error}
  </p>
)}

              <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email Address</label>
                  <div className="input-wrapper">
                    <Mail size={18} className="input-icon" />
                    <input
                      type="email"
                      id="forgot-email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-full" disabled={loading} style={{
                  padding: '14px',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}>
                  {loading ? "Sending...":"Send Reset Link"} <ArrowRight size={18} />
                </button>
              </form>

              <div className="auth-footer" style={{ marginTop: '32px' }}>
                <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                  <ArrowLeft size={16} /> Back to Login
                </Link>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{
                width: '72px',
                height: '72px',
                background: 'var(--primary-50)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px auto',
                color: 'var(--primary)'
              }}>
                <CheckCircle size={36} />
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '12px' }}>Check Your Email</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '32px' }}>
                We've sent a 6-digit verification code to<br />
                <strong style={{ color: 'var(--text-primary)' }}>{email}</strong>
              </p>
              
              <button
                type="button"
                onClick={() => navigate(`/reset-password?email=${encodeURIComponent(email)}${userId ? `&userId=${encodeURIComponent(userId)}` : ''}`, { replace: true })}
                className="btn btn-primary btn-full"
                style={{ padding: '14px', fontSize: '1rem', marginBottom: '16px' }}
              >
                Enter Reset Code
              </button>
              
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Didn't receive the email? Check your spam folder or{' '}
                <button onClick={() => setSubmitted(false)} style={{ color: 'var(--primary)', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>try again</button>.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Side Panel */}
      <div className="auth-side">
        <div className="auth-side-content">
          <div className="testimonial-micro">
            <div className="stars">★★★★★</div>
            <p>"I love how easy it is to manage my health data. The insights are incredibly helpful!"</p>
            <div className="user">— Emily R., Pro Member</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
