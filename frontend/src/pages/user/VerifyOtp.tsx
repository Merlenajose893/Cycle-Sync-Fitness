import React, { useState } from 'react'
import { useUserAuth } from '../../hooks/auth/useUserAuth';
import { Mail, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { useLocation ,useNavigate} from 'react-router-dom';

const VerifyOtp = () => {
  const navigate=useNavigate();
  const location=useLocation();
  const {verifyOtp,loading,resendOTP}=useUserAuth();
  const email=location.state?.email;
  const userId=location.state?.userId;
  const [otp,setOtp]=useState(["","","","","",""]);
  const [error,setError]=useState("")
  const handleChange=(value,index)=>{
    if(!/^\d*$/.test(value)) return;
    const newOtp=[...otp];
    newOtp[index]=value;
    setOtp(newOtp);

    if(value && index<5)
    {
      document.getElementById(`otp-${index+1}`)?.focus();

    }

  }
  const handleSubmit=async (e) => {
    e.preventDefault();
    const finalOtp=otp.join("");
    if(finalOtp.length!==6)
    {
      setError("Please enter a valid 6-digit otp")
      return;
    }
    try {
      setError("");
      const response=await verifyOtp({
        userId,
      
        otp:finalOtp
      });
      console.log(response.data);
      
      if(response.success)
      {
        navigate("/login");

      }
      else{
        setError("Invalid Otp")
      }
    } catch (error:any) {
      setError(error.response?.data?.message||"OTP verification failed")
    }

  }

  const handleResendOtp=async () => {
    try {
      await resendOTP({userId})
      alert("OTP resend successfully");
    } catch (error) {
      console.error(error);
      
    }
  }
  return (
    <div className="auth-wrapper">
      <div
        className="auth-container"
        style={{ justifyContent: "center" }}
      >
        <div className="auth-brand">
          <div className="auth-logo">C</div>
          <h1>
            CycleSync <span>AI</span>
          </h1>
        </div>

        <div className="auth-card animate-slideUp">
          <div
            className="auth-header"
            style={{ textAlign: "center" }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                background: "var(--primary-100)",
                color: "var(--primary)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <Mail size={32} />
            </div>

            <h2>Verify your email</h2>

            <div className="verify-info">
              <p>
                We've sent a 6-digit verification code to
                <br />
                <strong>{email}</strong>
              </p>
            </div>
          </div>
          {error && <div></div>}
          <form onSubmit={handleSubmit}>
            <div className="otp-container">
              <div className="otp-input-wrapper">
  {otp.map((digit, index) => (
    <input
      key={index}
      id={`otp-${index}`}
      type="text"
      maxLength={1}
      className="otp-field"
      value={digit}
      onChange={(e) => handleChange(e.target.value, index)}
      onKeyDown={(e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
          document.getElementById(`otp-${index - 1}`)?.focus();
        }
      }}
    />
  ))}
</div>

              <button
                type="submit"
                className="btn btn-primary btn-full"
              >
                Verify Email
                <ShieldCheck
                  size={18}
                  style={{ marginLeft: "8px" }}
                />
              </button>
            </div>
          </form>

          <div
            className="resend-container"
            style={{ marginTop: "32px" }}
          >
            <p>
              Didn't receive the code?
              <button className="resend-btn" onClick={handleResendOtp}>
                Click to resend
              </button>
            </p>
          </div>

          <p
            className="auth-footer"
            style={{ marginTop: "48px" }}
          >
            Back to <a href="/register">Registration</a>
          </p>
        </div>
      </div>

      <div className="auth-side animate-fadeIn">
        <div className="auth-side-content">
          <div className="premium-badge">
            <ShieldCheck size={14} />
            Secure Access
          </div>

          <h2 className="auth-side-quote">
            "Your health data, protected by
            industry-standard encryption."
          </h2>

          <p className="auth-side-subtitle">
            CycleSync AI uses multi-factor authentication
            to ensure your intimate biological insights
            remain private and secure.
          </p>

          <div
            className="testimonial-micro"
            style={{
              background: "rgba(255,255,255,0.1)",
            }}
          >
            <p
              style={{
                fontSize: "1rem",
                fontWeight: "500",
                marginBottom: "12px",
              }}
            >
              "The security measures here are top-notch.
              I feel completely safe logging my most
              personal data."
            </p>

            <span className="user">
              — Verified User
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp