import React from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  ArrowRight
} from "lucide-react";

const Login = () => {
  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-brand">
          <div className="auth-logo">C</div>
          <h1>
            CycleSync <span>AI</span>
          </h1>
        </div>

        <div className="auth-card animate-slideUp">
          <div className="auth-header">
            <h2>Welcome back</h2>
            <p>Enter your details to access your dashboard</p>
          </div>

          <form className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="label-row">
                <label htmlFor="password">Password</label>
                <Link to="/forgot-password" className="forgot-link">
                  Forgot password?
                </Link>
              </div>

              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />

                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                />

                <button
                  type="button"
                  className="show-password"
                >
                  <Eye size={18} />
                </button>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-full"
            >
              Login <ArrowRight size={18} />
            </button>
          </form>

          <div className="auth-divider">
            <span>Or continue with</span>
          </div>


          <p className="auth-footer">
            Don't have an account?{" "}
            <Link to="/register">
              Create an account
            </Link>
          </p>

          <div
            style={{
              marginTop: "16px",
              paddingTop: "16px",
              borderTop: "1px solid var(--border)",
              textAlign: "center",
            }}
          >
            <Link
              to="/trainer-panel/login"
              style={{
                fontSize: "0.82rem",
                color: "var(--text-muted)",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              🏋️ Are you a trainer?
              <span
                style={{
                  fontWeight: 700,
                  color: "var(--primary)",
                }}
              >
                Log in here →
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="auth-side animate-fadeIn">
        <div className="auth-side-content">
          <div className="testimonial-micro">
            <div className="stars">★★★★★</div>

            <p>
              "The AI insights predicted my energy dip
              perfectly. I adjusted my workout and felt
              amazing!"
            </p>

            <p className="user">
              - Emily R., Pro Athlete
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;