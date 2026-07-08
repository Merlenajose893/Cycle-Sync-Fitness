import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import '../../styles/Auth.css';
import { useUserAuth } from '../../hooks/auth/useUserAuth';

const Login = () => {
    const navigate = useNavigate();
    const { loginUser, loading } = useUserAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const validateField = (name: string, value: string): string => {
        switch (name) {
            case 'email':
                if (!value.trim()) return 'Email is required';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) 
                    return 'Please enter a valid email address';
                return '';
            case 'password':
                if (!value) return 'Password is required';
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
        setFormData(prev => ({ ...prev, [id]: value }));

        if (errors[id]) {
            setErrors(prev => ({ ...prev, [id]: '' }));
        }
    };

<<<<<<< HEAD
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { id } = e.target;
        setTouched(prev => ({ ...prev, [id]: true }));

        const error = validateField(id, (formData as any)[id]);
        if (error) {
            setErrors(prev => ({ ...prev, [id]: error }));
        }
    };
=======
  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-brand">
          <div className="auth-logo">C</div>
          <h1>
            CycleSync <span>AI</span>
          </h1>
        </div>
>>>>>>> feature/admin-manage

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

<<<<<<< HEAD
        if (!validateForm()) {
            setTouched({ email: true, password: true });
            return;
        }

        try {
            setErrors({});
            await loginUser({
                email: formData.email.trim(),
                password: formData.password,
            });
            navigate("/app");
        } catch (error: any) {
            console.error(error);
            setErrors({ 
                submit: error.response?.data?.message || "Invalid email or password." 
            });
        }
    };

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

                    {errors.submit && (
                        <div className="auth-error-message">{errors.submit}</div>
                    )}

                    <form className="auth-form" onSubmit={handleLogin} noValidate>
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
                                    required
                                />
                            </div>
                            {errors.email && <p className="error-text">{errors.email}</p>}
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
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.password ? 'error' : ''}
                                    required
                                />
                                <button
                                    type="button"
                                    className="show-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && <p className="error-text">{errors.password}</p>}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-full"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Login"} 
                            <ArrowRight size={18} />
                        </button>
                    </form>

                    <div className="auth-divider">
                        <span>Or continue with</span>
                    </div>

                    <p className="auth-footer">
                        Don't have an account?{" "}
                        <Link to="/register">Create an account</Link>
                    </p>

                    <div style={{
                        marginTop: "16px",
                        paddingTop: "16px",
                        borderTop: "1px solid var(--border)",
                        textAlign: "center",
                    }}>
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
                            <span style={{ fontWeight: 700, color: "var(--primary)" }}>
                                Log in here →
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Side Panel */}
            <div className="auth-side animate-fadeIn">
                <div className="auth-side-content">
                    <div className="testimonial-micro">
                        <div className="stars">★★★★★</div>
                        <p>
                            "The AI insights predicted my energy dip perfectly. 
                            I adjusted my workout and felt amazing!"
                        </p>
                        <p className="user">- Emily R., Pro Athlete</p>
                    </div>
                </div>
            </div>
        </div>
    );
=======
          {errors.submit && (
            <div className="auth-error-message">{errors.submit}</div>
          )}

          <form className="auth-form" onSubmit={handleLogin} noValidate>
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
              <div className="label-row">
                <label htmlFor="password">Password</label>
                <Link to="/forgot-password" className="forgot-link">
                  Forgot password?
                </Link>
              </div>

              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.password ? 'error' : ''}
                />
                <button
                  type="button"
                  className="show-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="error-text">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Login"} <ArrowRight size={18} />
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
>>>>>>> feature/admin-manage
};

export default Login;