import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Dumbbell, LogOut, User } from 'lucide-react';
import { useUserContext } from '../../context/UserAuthContext';
import '../../styles/Header.css';

const Header: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const location = useLocation();
    const { isAuthenticated, user, logout } = useUserContext();

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
    ];

    return (
        <nav className="public-navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <div className="brand-logo">C</div>
                    <span className="brand-text">
                        CycleSync <span className="brand-ai">AI</span>
                    </span>
                </Link>

                <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="navbar-actions">
                    <Link
                        to="/trainer/login"
                        className="btn btn-ghost"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '0.88rem',
                            color: 'var(--primary)',
                            border: '1px solid var(--primary)',
                            borderRadius: 'var(--radius-full)',
                            padding: '6px 14px',
                            fontWeight: 600
                        }}
                    >
                        <Dumbbell size={15} /> For Trainers
                    </Link>

                    {isAuthenticated ? (
                        <>
                            {user && !user.onboardingComplete ? (
                                <Link to="/onboarding" className="btn btn-primary">
                                    Continue Onboarding
                                </Link>
                            ) : (
                                <Link to="/app" className="btn btn-primary">
                                    Dashboard
                                </Link>
                            )}
                            <button onClick={() => logout()} className="btn btn-ghost" title="Log Out">
                                <LogOut size={16} /> Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-ghost">
                                Log In
                            </Link>
                            <Link to="/register" className="btn btn-primary">
                                Get Started
                            </Link>
                        </>
                    )}
                </div>

                <button
                    className="mobile-menu-toggle"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </nav>
    );
};

export default Header;
