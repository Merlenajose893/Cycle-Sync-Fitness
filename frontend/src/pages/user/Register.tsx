import React, { useState } from 'react'
import '../../styles/Auth.css'
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { useUserAuth } from '../../hooks/auth/useUserAuth';
const Register = () => {
    const navigate=useNavigate();
const {registerUser,loading}=useUserAuth();
const [formData,setFormData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:""
})
const [error,setError]=useState("")
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { id, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [id]: value,
  }));
};
const handleRegister=async (e:React.ChangeEvent) => {
    e.preventDefault();
    if(formData.password!==formData.confirmPassword)
    {
        setError("Passwords do not match")
        return;

    }
    try {
        setError("");
        const response=await registerUser({
            firstName:formData.firstName,
            lastName:formData.lastName,
            email:formData.email,
            password:formData.password,
            confirmPassword:formData.confirmPassword
        });
        navigate("/verify-otp",{
            state:{
                userId:response.data._id,
                email:response.data.email
            },
        });
    } catch (error) {
        console.error(error);
        
    }
}
console.log(error);

console.log(handleChange,handleRegister);

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
            <h2>Create an account</h2>
            <p>Start your 14-day free trial today</p>
          </div>
          {error && (
  <div className="auth-error-message">
    {error}
  </div>
)}

          <form className="auth-form" onSubmit={handleRegister}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <div className="input-wrapper">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    id="firstName"
                    placeholder="First"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <div className="input-wrapper">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Last"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <p className="input-hint">
                Must be at least 8 characters long
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="terms-checkbox">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">
                I agree to the <Link to="/terms">Terms</Link> and{" "}
                <Link to="/privacy">Privacy Policy</Link>
              </label>
            </div>

            <button
  type="submit"
  className="btn btn-premium btn-full"
  disabled={loading}
>
  {loading ? "Creating Account..." : "Create Account"}
  {!loading && <ArrowRight size={18} />}
</button>
              
          </form>

          <p className="auth-footer">
            Already have an account?{" "}
            <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>

      <div className="auth-side animate-fadeIn">
        <div className="auth-side-content">
          <div className="premium-badge">
            <Zap size={14} /> AI-Powered Performance
          </div>

          <h2 className="auth-side-quote">
            "The first fitness app that actually listens to your body's
            biology."
          </h2>

          <p className="auth-side-subtitle">
            Join 10,000+ women optimizing their training with AI
            cycle-syncing.
          </p>

          <ul className="premium-perks">
            <li>
              <CheckCircle2 size={18} />
              Phase-Specific Workout Plans
            </li>
            <li>
              <CheckCircle2 size={18} />
              Real-time Metabolic Tracking
            </li>
            <li>
              <CheckCircle2 size={18} />
              Nutrition synced to your cycle
            </li>
            <li>
              <CheckCircle2 size={18} />
              Hormone-balancing recovery tips
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Register