<<<<<<< HEAD
import React, { useState } from 'react';
import '../../styles/Auth.css';
import { showToast } from '../../components/common/Toast/Toast';
=======
import React, { useState } from 'react'
import '../../styles/Auth.css'
>>>>>>> 081b12d (changes)
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Zap,
<<<<<<< HEAD
  CheckCircle2,
} from "lucide-react";
import { useUserAuth } from '../../hooks/auth/useUserAuth';

const Register = () => {
    const navigate = useNavigate();
    const { registerUser, loading } = useUserAuth();
    
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const validateField = (name: string, value: string): string => {
        switch (name) {
            case 'firstName':
                if (!value.trim()) return 'First name is required';
                if (value.trim().length < 2) return 'First name must be at least 2 characters';
                return '';
            case 'lastName':
                if (!value.trim()) return 'Last name is required';
                if (value.trim().length < 2) return 'Last name must be at least 2 characters';
                return '';
            case 'email':
                if (!value.trim()) return 'Email is required';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return 'Please enter a valid email address';
                return '';
            case 'password':
                if (!value) return 'Password is required';
                if (value.length < 8) return 'Password must be at least 8 characters long';
                if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
                if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
                return '';
            case 'confirmPassword':
                if (!value) return 'Please confirm your password';
                if (value !== formData.password) return 'Passwords do not match';
                return '';
            default:
                return '';
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};
       
        Object.keys(formData).forEach(key => {
            const error = validateField(key, (formData as any)[key]);
            if (error) newErrors[key] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
       
        setFormData(prev => ({
            ...prev,
            [id]: value,
        }));
        
        // Clear error when user starts typing
        if (errors[id]) {
            setErrors(prev => ({ ...prev, [id]: '' }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { id } = e.target;
        setTouched(prev => ({ ...prev, [id]: true }));
       
        const error = validateField(id, (formData as any)[id]);
        if (error) {
            setErrors(prev => ({ ...prev, [id]: error }));
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate all fields on submit
        if (!validateForm()) {
            const allTouched = Object.keys(formData).reduce((acc, key) => {
                acc[key] = true;
                return acc;
            }, {} as Record<string, boolean>);
            setTouched(allTouched);
            
            showToast.error("Please fix the errors in the form");
            return;
        }

        const toastId = showToast.loading("Creating your account...");

        try {
            setErrors({});
            
            const response = await registerUser({
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                email: formData.email.trim(),
                password: formData.password,
                confirmPassword: formData.confirmPassword,
            });

            showToast.dismiss(toastId);
            showToast.success("Account created successfully! 🎉");
            
            navigate("/verify-otp", {
                state: {
                    userId: response.data._id,
                    email: response.data.email
                },
            });
        } catch (error: any) {
            showToast.dismiss(toastId);
            
            const errorMessage = error.response?.data?.message || 
                               "Registration failed. Please try again.";
            
            console.error(error);
            setErrors({ submit: errorMessage });
            showToast.error(errorMessage);
        }
    };

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

                    {/* General Error */}
                    {(errors.submit) && (
                        <div className="auth-error-message">
                            {errors.submit}
                        </div>
                    )}

                    <form className="auth-form" onSubmit={handleRegister} noValidate>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
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
                                        onBlur={handleBlur}
                                        className={errors.firstName ? 'error' : ''}
                                    />
                                </div>
                                {errors.firstName && <p className="error-text">{errors.firstName}</p>}
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
                                        onBlur={handleBlur}
                                        className={errors.lastName ? 'error' : ''}
                                    />
                                </div>
                                {errors.lastName && <p className="error-text">{errors.lastName}</p>}
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
                                    onBlur={handleBlur}
                                    className={errors.email ? 'error' : ''}
                                />
                            </div>
                            {errors.email && <p className="error-text">{errors.email}</p>}
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
                                    onBlur={handleBlur}
                                    className={errors.password ? 'error' : ''}
                                />
                            </div>
                            {errors.password && <p className="error-text">{errors.password}</p>}
                            <p className="input-hint">Must be at least 8 characters with uppercase and number</p>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div className="input-wrapper">
                                <Lock size={18} className="input-icon" />
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.confirmPassword ? 'error' : ''}
                                />
                            </div>
                            {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                        </div>

                        <div className="terms-checkbox">
                            <input type="checkbox" id="terms" required />
                            <label htmlFor="terms">
                                I agree to the <Link to="/terms">Terms</Link> and{" "}
                                <Link to="/privacy">Privacy Policy</Link>
                            </label>
                        </div>
                        <div className="auth-divider">
    <span>OR</span>
</div>

<button
    type="button"
    className="google-btn"
>
    <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="google-icon"
    />
    Continue with Google
</button>

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

            {/* Side Panel */}
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

export default Register;
=======
  
  CheckCircle2,
} from "lucide-react";
// import {Github} from "lucide-react"
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

            <div className="social-auth" style={{ marginTop: '16px' }}>
           
            <div
  id="googleSignInDiv"
  style={{
    width: "100%",
    display: "flex",
    justifyContent: "center",
  }}
>
  <button
    type="button"
    style={{
      width: "100%",
      padding: "12px 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      background: "#fff",
      color: "#374151",
      fontSize: "16px",
      fontWeight: 500,
      cursor: "pointer",
    }}
  >
    <img
      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
      alt="Google"
      width={20}
      height={20}
    />
    Continue with Google
  </button>
</div>
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
>>>>>>> 081b12d (changes)
