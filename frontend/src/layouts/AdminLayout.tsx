import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Users, Dumbbell, Shield,
    Settings, LogOut, ChevronRight, Menu, X,
    Bell, Search, Package, BarChart3, Eye, FileText,
    CreditCard, ClipboardList
} from 'lucide-react';
import '../styles/AdminLayout.css';

const AdminLayout: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchFocused, setSearchFocused] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
        { name: 'Users', icon: <Users size={20} />, path: '/admin/users' },
        { name: 'Trainers & Packages', icon: <Dumbbell size={20} />, path: '/admin/trainers' },
        { name: 'Subscriptions', icon: <CreditCard size={20} />, path: '/admin/subscriptions' },
        { name: 'Analytics', icon: <BarChart3 size={20} />, path: '/admin/analytics' },
        { name: 'Moderation', icon: <Eye size={20} />, path: '/admin/moderation' },
        { name: 'Audit Logs', icon: <ClipboardList size={20} />, path: '/admin/audit-logs' },
    ];

    const bottomItems = [
        { name: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' },
    ];

    const isActive = (path: string) => {
        if (path === '/admin') return location.pathname === '/admin';
        return location.pathname.startsWith(path);
    };

    const handleLogout = () => {
        // Clear admin auth state here
        navigate('/admin/admin-login');
    };

    return (
        <div className={`admin-layout ${sidebarOpen ? 'admin-sidebar-open' : 'admin-sidebar-closed'}`}>
            {/* Sidebar Overlay for Mobile */}
            {sidebarOpen && (
                <div
                    className="admin-sidebar-overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="admin-sidebar-header">
                    <div className="admin-sidebar-brand">
                        <div className="admin-brand-logo">
                            <Shield size={20} />
                        </div>
                        <div className="admin-brand-text">
                            <span className="admin-brand-name">CycleSync</span>
                            <span className="admin-brand-badge">Admin</span>
                        </div>
                    </div>
                    <button
                        className="admin-sidebar-close-mobile"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="admin-sidebar-nav">
                    <div className="admin-nav-section">
                        <p className="admin-nav-label">Main Menu</p>
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`admin-nav-item ${isActive(item.path) ? 'active' : ''}`}
                            >
                                <span className="admin-nav-icon">{item.icon}</span>
                                <span className="admin-nav-text">{item.name}</span>
                                {isActive(item.path) && (
                                    <ChevronRight size={14} className="admin-active-arrow" />
                                )}
                            </Link>
                        ))}
                    </div>

                    <div className="admin-nav-section">
                        <p className="admin-nav-label">System</p>
                        {bottomItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`admin-nav-item ${isActive(item.path) ? 'active' : ''}`}
                            >
                                <span className="admin-nav-icon">{item.icon}</span>
                                <span className="admin-nav-text">{item.name}</span>
                            </Link>
                        ))}
                        <button className="admin-nav-item admin-logout-btn" onClick={handleLogout}>
                            <span className="admin-nav-icon"><LogOut size={20} /></span>
                            <span className="admin-nav-text">Logout</span>
                        </button>
                    </div>
                </nav>

                {/* Sidebar Footer */}
                <div className="admin-sidebar-footer">
                    <div className="admin-sidebar-status">
                        <div className="admin-status-dot" />
                        <span className="admin-status-text">System Online</span>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="admin-main-wrapper">
                <header className="admin-topbar">
                    <div className="admin-topbar-left">
                        <button
                            className="admin-sidebar-toggle"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            <Menu size={20} />
                        </button>

                        <div className={`admin-topbar-search ${searchFocused ? 'focused' : ''}`}>
                            <Search size={18} className="admin-search-icon" />
                            <input
                                type="text"
                                placeholder="Search anything..."
                                className="admin-search-input"
                                onFocus={() => setSearchFocused(true)}
                                onBlur={() => setSearchFocused(false)}
                            />
                        </div>
                    </div>

                    <div className="admin-topbar-right">
                        <div className="admin-topbar-role-badge">
                            <Shield size={14} />
                            <span>Administrator</span>
                        </div>

                        <button className="admin-topbar-icon-btn">
                            <Bell size={20} />
                            <span className="admin-notification-dot" />
                        </button>

                        <div className="admin-user-profile-menu">
                            <div className="admin-user-avatar">A</div>
                            <div className="admin-user-info">
                                <p className="admin-user-name">Admin</p>
                                <p className="admin-user-role">Super Admin</p>
                            </div>
                            <ChevronRight size={14} color="var(--text-muted)" />
                        </div>
                    </div>
                </header>

                <main className="admin-content-area">
                    <div className="admin-content-container">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
