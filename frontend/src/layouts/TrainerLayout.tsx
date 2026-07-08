import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Users, MessageSquare, Dumbbell,
    Package, Apple, Calendar, User, LogOut, Menu, X, Bell
} from 'lucide-react';
import '../styles/TrainerLayout.css';

const TrainerLayout: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/trainer/dashboard' },
        { name: 'My Clients', icon: <Users size={20} />, path: '/trainer/clients' },
        { name: 'Messages', icon: <MessageSquare size={20} />, path: '/trainer/messages' },
        { name: 'Workouts', icon: <Dumbbell size={20} />, path: '/trainer/workouts' },
        { name: 'Packages', icon: <Package size={20} />, path: '/trainer/packages' },
        { name: 'Foods & Recipes', icon: <Apple size={20} />, path: '/trainer/nutrition' },
        { name: 'Slots', icon: <Calendar size={20} />, path: '/trainer/slots' },
    ];

    const bottomItems = [
        { name: 'Profile', icon: <User size={20} />, path: '/trainer/profile' },
    ];

    const isActive = (path: string) => {
        if (path === '/trainer/dashboard') return location.pathname === '/trainer/dashboard';
        return location.pathname.startsWith(path);
    };

    const handleLogout = () => {
        // Clear trainer auth state here later
        navigate('/trainer/login');
    };

    return (
        <div className={`trainer-layout ${sidebarOpen ? 'trainer-sidebar-open' : 'trainer-sidebar-closed'}`}>
            {/* Sidebar Overlay for Mobile */}
            {sidebarOpen && (
                <div
                    className="trainer-sidebar-overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className="trainer-sidebar">
                <div className="trainer-sidebar-header">
                    <div className="trainer-sidebar-brand">
                        <div className="trainer-brand-logo">T</div>
                        <div className="trainer-brand-text">
                            <span className="trainer-brand-name">Trainer Panel</span>
                            <span className="trainer-brand-subtitle">CycleSync AI</span>
                        </div>
                    </div>
                    <button
                        className="trainer-sidebar-close-mobile"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="trainer-sidebar-nav">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`trainer-nav-item ${isActive(item.path) ? 'active' : ''}`}
                        >
                            <span className="trainer-nav-icon">{item.icon}</span>
                            <span className="trainer-nav-text">{item.name}</span>
                        </Link>
                    ))}

                    <div className="trainer-nav-divider"></div>

                    {bottomItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`trainer-nav-item ${isActive(item.path) ? 'active' : ''}`}
                        >
                            <span className="trainer-nav-icon">{item.icon}</span>
                            <span className="trainer-nav-text">{item.name}</span>
                        </Link>
                    ))}
                    
                    <button className="trainer-nav-item trainer-logout-btn" onClick={handleLogout}>
                        <span className="trainer-nav-icon"><LogOut size={20} /></span>
                        <span className="trainer-nav-text">Sign Out</span>
                    </button>
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="trainer-main-wrapper">
                <header className="trainer-topbar">
                    <div className="trainer-topbar-left">
                        <button
                            className="trainer-sidebar-toggle"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            <Menu size={20} />
                        </button>
                    </div>

                    <div className="trainer-topbar-right">
                        <button className="trainer-topbar-icon-btn">
                            <Bell size={20} />
                            <span className="trainer-notification-dot" />
                        </button>

                        <div className="trainer-user-avatar">JD</div>
                    </div>
                </header>

                <main className="trainer-content-area">
                    <div className="trainer-content-container">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TrainerLayout;
