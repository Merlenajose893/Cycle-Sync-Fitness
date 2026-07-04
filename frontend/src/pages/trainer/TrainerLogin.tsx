import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Dumbbell, ArrowRight } from 'lucide-react';
<<<<<<< HEAD
=======
import '../../styles/Auth.css';
>>>>>>> feature/admin-manage
import { useTrainerAuth } from '../../hooks/auth/useTrainerAuth';
import '../../styles/Auth.css';

const TrainerLogin: React.FC = () => {
    const navigate = useNavigate();
    const { loginTrainer, loading } = useTrainerAuth();

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

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { id } = e.target;
        setTouched(prev => ({ ...prev, [id]: true }));

        const error = validateField(id, (formData as any)[id]);
        if (error) {
            setErrors(prev => ({ ...prev, [id]: error }));
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            setTouched({ email: true, password: true });
            return;
        }

        try {
            setErrors({});
            await loginTrainer({
                email: formData.email.trim(),
                password: formData.password,
            });
            navigate('/trainer-panel/dashboard');
        } catch (error: any) {
            console.error(error);
            setErrors({ 
                submit: error.response?.data?.message || "Invalid email or password." 
            });
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-container" style={{ justifyContent: 'center' }}>
<<<<<<< HEAD
                {/* Brand */}
=======
>>>>>>> feature/admin-manage
                <div className="auth-brand" style={{ justifyContent: 'center', marginBottom: '40px' }}>
                    <div className="auth-logo" style={{ 
                        background: 'linear-gradient(135deg, #0d9488, #14b8a6)', 
                        width: '48px', 
                        height: '48px', 
                        fontSize: '1.4rem' 
                    }}>
                        C
                    </div>
                    <h1>CycleSync <span style={{ color: '#0d9488' }}>AI</span></h1>
                </div>

                <div className="auth-card animate-slideUp" style={{
                    background: 'var(--bg-card)',
                    padding: '40px',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-lg)'
                }}>
<<<<<<< HEAD
                    {/* Trainer Badge */}
=======
>>>>>>> feature/admin-manage
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
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
                            <Dumbbell size={16} /> Trainer Portal
                        </div>
                    </div>

                    <div className="auth-header" style={{ textAlign: 'center' }}>
                        <h2>Trainer Sign In</h2>
                        <p>Enter your credentials to manage your clients and sessions.</p>
                    </div>

                    {errors.submit && (
                        <div className="auth-error-message" style={{ textAlign: 'center', marginBottom: '20px' }}>
                            {errors.submit}
                        </div>
                    )}

                    <form className="auth-form" onSubmit={handleLogin} noValidate>
                        <div className="form-group">
                            <label>Email Address</label>
                            <div className="input-wrapper">
                                <Mail size={18} className="input-icon" />
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="trainer@cyclesync.ai"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.email ? 'error' : ''}
<<<<<<< HEAD
                                    required
=======
>>>>>>> feature/admin-manage
                                />
                            </div>
                            {errors.email && <p className="error-text">{errors.email}</p>}
                        </div>

                        <div className="form-group">
                            <label>Password</label>
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
<<<<<<< HEAD
                                    required
=======
>>>>>>> feature/admin-manage
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

                        <div style={{ textAlign: 'right', marginBottom: '8px' }}>
                            <a href="#" style={{ fontSize: '0.85rem', color: '#0d9488', fontWeight: '500' }}>
                                Forgot Password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-full"
                            disabled={loading}
                            style={{
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
                                marginTop: '8px',
                                transition: 'opacity 0.2s',
                                opacity: loading ? 0.7 : 1,
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                        >
<<<<<<< HEAD
                            {loading ? "Signing in..." : "Sign In"} 
                            <ArrowRight size={18} />
=======
                            {loading ? "Signing in..." : "Sign In"} <ArrowRight size={18} />
>>>>>>> feature/admin-manage
                        </button>
                    </form>

                    <p style={{ 
                        textAlign: 'center', 
                        marginTop: '24px', 
                        fontSize: '0.85rem', 
                        color: 'var(--text-muted)' 
                    }}>
                        Don't have a trainer account?{' '}
                        <Link to="/trainer-panel/register" style={{ color: '#0d9488', fontWeight: '600' }}>
                            Register
                        </Link>
                    </p>

                    <p style={{ 
                        textAlign: 'center', 
                        marginTop: '8px', 
                        fontSize: '0.85rem', 
                        color: 'var(--text-muted)' 
                    }}>
                        Access restricted to registered trainers.
                    </p>
                </div>
            </div>

<<<<<<< HEAD
            {/* Side Panel */}
=======
>>>>>>> feature/admin-manage
            <div className="auth-side" style={{
                background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #5eead4 100%)',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div className="auth-side-content" style={{ textAlign: 'center' }}>
                    <div style={{ marginBottom: '32px' }}>
                        <Dumbbell size={64} color="rgba(255,255,255,0.4)" />
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '16px' }}>
                        Trainer Hub
                    </h2>
                    <p style={{ fontSize: '1.1rem', opacity: 0.8, lineHeight: '1.6' }}>
                        Manage workouts, meal plans, recipes, and session slots from a single dashboard.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TrainerLogin;
<<<<<<< HEAD


















=======
>>>>>>> feature/admin-manage
