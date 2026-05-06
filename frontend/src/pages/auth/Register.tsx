import React, { useState } from 'react';

import { Mail, Lock, User, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import '../../styles/Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/auth.service';
import { useAuth } from '../../auth/AuthContext';

const RegisterPage: React.FC = () => {
  const navigate=useNavigate();
  const {login}=useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    setError('');
  };

  const validate=()=>{
    if(!formData.firstName.trim()) return 'First name is required';
    if(!formData.lastName.trim()) return 'Last name is required';
    if(!formData.email) return 'Email is required';
     if (!/^\S+@\S+\.\S+$/.test(formData.email)) return 'Invalid email';

    if (!formData.password) return 'Password is required';
    if (formData.password.length < 6) return 'Password must be at least 6 characters';

    if (formData.password !== formData.confirmPassword)
      return 'Passwords do not match';

    return null;

  }

  const handleRegister=async (e:React.FormEvent) => {
    e.preventDefault();
    const validationError=await validate();
    if(validationError)
    {
      setError(validationError);
      return;
    }
    try {
      setIsLoading(true);
      setError('');
      const res=await registerUser({
        firstName:formData.firstName,
        lastName:formData.lastName,
        email:formData.email,
        password:formData.password
      })
       const user = {
      _id: res.data._id,
      email: res.data.email,
      role: res.data.role
    };

    navigate('/verifyEmail',{
      state:{email:res.data.email}
    })
    } catch (error:any) {
      console.log(error);
      alert(error)
      
      setError(error.response?.data?.message||'Registration failed');

    }
    finally{
setIsLoading(false)
    }
  }
console.log(handleRegister);

  return (
    <div className="auth-wrapper">
      <div className="auth-container">

        <div className="auth-brand">
          <div className="auth-logo">C</div>
          <h1>CycleSync <span>AI</span></h1>
        </div>

        <div className="auth-card animate-slideUp">
          <div className="auth-header">
            <h2>Create an account</h2>
            <p>Start your 14-day free trial today</p>
          </div>
{error && <p className="error-text">{error}</p>}
          <form className="auth-form" onSubmit={handleRegister}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              
              <div className="form-group">
                <label>First Name</label>
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
                <label>Last Name</label>
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
              <label>Email Address</label>
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
              <label>Password</label>
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
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
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
              <label>
                I agree to the <span className="fake-link">Terms</span> and <span className="fake-link">Privacy Policy</span>
              </label>
            </div>

          <button type="submit" className="btn btn-premium btn-full" disabled={isLoading}>
  {isLoading ? "Creating..." : "Create Account"} <ArrowRight size={18} />
</button>

          </form>

          <p className="auth-footer">
            Already have an account? <span className="fake-link">Log in</span>
          </p>
        </div>

      </div>

      <div className="auth-side animate-fadeIn">
        <div className="auth-side-content">

          <div className="premium-badge">
            <Zap size={14} /> AI-Powered Performance
          </div>

          <h2 className="auth-side-quote">
            "The first fitness app that actually listens to your body's biology."
          </h2>

          <p className="auth-side-subtitle">
            Join 10,000+ women optimizing their training with AI cycle-syncing.
          </p>

          <ul className="premium-perks">
            <li><CheckCircle2 size={18} /> Phase-Specific Workout Plans</li>
            <li><CheckCircle2 size={18} /> Real-time Metabolic Tracking</li>
            <li><CheckCircle2 size={18} /> Nutrition synced to your cycle</li>
            <li><CheckCircle2 size={18} /> Hormone-balancing recovery tips</li>
          </ul>

        </div>
      </div>
    </div>
  );
};

export default RegisterPage;