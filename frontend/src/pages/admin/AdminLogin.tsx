// src/pages/AdminLogin.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAdminAuth } from '../../hooks/auth/useAdmin';
import '../../styles/Auth.css';

const AdminLogin: React.FC = () => {

    const navigate = useNavigate();
    const { adminLogin, loading, error } = useAdminAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await adminLogin({ email, password });
            navigate('/admin');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-container" style={{ justifyContent: 'center' }}>
                {/* Brand */}
                <div className="auth-brand" style={{ justifyContent: 'center', marginBottom: '40px' }}>
                    <div className="auth-logo" style={{ 
                        background: 'var(--accent-purple)', 
                        width: '48px', 
                        height: '48px', 
                        fontSize: '1.4rem' 
                    }}>
                        C
                    </div>
                    <h1>CycleSync <span style={{ color: 'var(--accent-purple)' }}>AI</span></h1>
                </div>

                <div className="auth-card animate-slideUp" style={{
                    background: 'var(--bg-card)',
                    padding: '40px',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-lg)'
                }}>
                    {/* Admin Badge */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '32px'
                    }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '6px 16px',
                            borderRadius: 'var(--radius-full)',
                            background: 'var(--primary-50)',
                            border: '1px solid var(--primary-100)',
                            color: 'var(--accent-purple)',
                            fontSize: '0.85rem',
                            fontWeight: '600'
                        }}>
                            <ShieldCheck size={16} /> Admin Panel
                        </div>
                    </div>

                    <div className="auth-header" style={{ textAlign: 'center' }}>
                        <h2>Admin Sign In</h2>
                        <p>Enter your credentials to access the control panel.</p>
                    </div>

                    {error && (
                        <p className="error-message" style={{ textAlign: 'center', marginBottom: '20px' }}>
                            {error}
                        </p>
                    )}

                    <form className="auth-form" onSubmit={handleLogin}>
                        <div className="form-group">
                            <label>Admin Email</label>
                            <div className="input-wrapper">
                                <Mail size={18} className="input-icon" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}

                                    placeholder='admin@cyclesync.ai'

                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <div className="input-wrapper">
                                <Lock size={18} className="input-icon" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"

                                />
                                <button
                                    type="button"
                                    className="show-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-full"
                            disabled={loading}
                            style={{
                                padding: '14px',
                                background: 'var(--accent-purple)',
                                color: 'white',
                                borderRadius: 'var(--radius-md)',
                                fontWeight: '600',
                                fontSize: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                marginTop: '8px',
                                transition: 'opacity 0.2s'
                            }}
                        >
                            {loading ? "Signing In..." : "Sign In"}
                            <ArrowRight size={18} />
                        </button>
                    </form>

                    <p style={{
                        textAlign: 'center',
                        marginTop: '24px',
                        fontSize: '0.85rem',
                        color: 'var(--text-muted)'
                    }}>
                        This area is restricted to authorized personnel only.
                    </p>
                </div>
            </div>

            {/* Side Panel */}
            <div className="auth-side" style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div className="auth-side-content" style={{ textAlign: 'center' }}>
                    <div style={{ marginBottom: '32px' }}>
                        <ShieldCheck size={64} color="rgba(255,255,255,0.4)" />
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '16px' }}>
                        Control Center
                    </h2>
                    <p style={{ fontSize: '1.1rem', opacity: 0.8, lineHeight: '1.6' }}>
                        Manage users, subscriptions, content, and analytics from a single dashboard.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;