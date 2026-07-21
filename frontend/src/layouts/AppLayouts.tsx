import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, Utensils, Dumbbell,
    BarChart3, BookOpen, MessageCircle,
    User, Settings, Users, LogOut,
    ChevronRight, Menu, X, Bell, Sparkles,Brain
} from 'lucide-react';
import '../styles/AppLayout.css'

const AppLayout: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/app/dashboard' },
        { name: 'Food', icon: <Utensils size={20} />, path: '/app/food' },
        { name: 'Exercise', icon: <Dumbbell size={20} />, path: '/app/exercise' },
        { name: 'AI Plans', icon: <Brain size={20} />, path: '/app/ai-plan' },
        { name: 'Reports', icon: <BarChart3 size={20} />, path: '/app/reports' },
        { name: 'Messages', icon: <MessageCircle size={20} />, path: '/app/messages' },
        { name: 'Trainers', icon: <Users size={20} />, path: '/app/trainer' }
    ];

    const bottomItems = [
        { name: 'Profile', icon: <User size={20} />, path: '/app/profile' },
        { name: 'Subscription', icon: <Sparkles size={20} />, path: '/app/premium' },
        { name: 'Settings', icon: <Settings size={20} />, path: '/app/settings' },
    ];

    return (
        <div className={`app-layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            {/* Sidebar */}
            <aside className="app-sidebar">
                <div className="sidebar-header">
                    <div className="sidebar-brand">
                        <div className="brand-logo">C</div>
                        <span className="brand-name">CycleSync AI</span>
                    </div>
                    <button className="sidebar-toggle-mobile" onClick={() => setSidebarOpen(false)}>
                        <X size={20} />
                    </button>
                </div>

                <nav className="sidebar-nav">
                    <div className="nav-section">
                        <p className="nav-label">Menu</p>
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`nav-item ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                <span className="nav-text">{item.name}</span>
                                {location.pathname.startsWith(item.path) && <ChevronRight size={14} className="active-arrow" />}
                            </Link>
                        ))}
                    </div>

                    <div className="nav-section">
                        <p className="nav-label">Account</p>
                        {bottomItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`nav-item ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                <span className="nav-text">{item.name}</span>
                            </Link>
                        ))}
                        <button className="nav-item logout-btn">
                            <span className="nav-icon"><LogOut size={20} /></span>
                            <span className="nav-text">Logout</span>
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="main-wrapper">
                <header className="app-topbar">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                            <Menu size={20} />
                        </button>

                        {/* Cycle Phase indicator */}
                        <div className="topbar-phase-indicator">
                            <div className="phase-pill">
                                <Sparkles size={14} />
                                <span>Luteal Phase</span>
                            </div>
                            <span className="phase-day">Day 22 of 28</span>
                        </div>
                    </div>

                    <div className="topbar-right">
                        <button className="topbar-icon-btn">
                            <Bell size={20} />
                            <span className="notification-dot"></span>
                        </button>
                        <div className="user-profile-menu">
                            <div className="user-avatar">M</div>
                            <div className="user-info">
                                <p className="user-name">merlu</p>
                                <p className="user-plan">Premium Member</p>
                            </div>
                            <ChevronRight size={14} color="var(--text-muted)" />
                        </div>
                    </div>
                </header>

                <main className="app-content-area">
                    <div className="content-container">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
