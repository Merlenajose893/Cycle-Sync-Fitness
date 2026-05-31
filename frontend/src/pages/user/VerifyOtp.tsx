import React from 'react'

import { Mail, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';

const VerifyOtp = () => {
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
                <strong>name@example.com</strong>
              </p>
            </div>
          </div>

          <form>
            <div className="otp-container">
              <div className="otp-input-wrapper">
                <input
                  type="text"
                  maxLength={1}
                  className="otp-field"
                />
                <input
                  type="text"
                  maxLength={1}
                  className="otp-field"
                />
                <input
                  type="text"
                  maxLength={1}
                  className="otp-field"
                />
                <input
                  type="text"
                  maxLength={1}
                  className="otp-field"
                />
                <input
                  type="text"
                  maxLength={1}
                  className="otp-field"
                />
                <input
                  type="text"
                  maxLength={1}
                  className="otp-field"
                />
              </div>

              <button
                type="button"
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
              <button className="resend-btn">
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