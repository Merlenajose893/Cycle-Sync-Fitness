import React from 'react';
import { Link } from 'react-router-dom';
import { Edit2, MapPin, Calendar, Activity, Zap, Settings, MessageSquare, FileText } from 'lucide-react';
import '../../styles/UserProfile.css';

const Profile: React.FC = () => {
    return (
        <div className="user-profile-container">
            {/* Profile Banner */}
            <div className="profile-banner-card">
                <div className="profile-banner-left">
                    <div className="profile-avatar-wrapper">
                        {/* Use a placeholder image or generic avatar here for the UI */}
                        <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="Jane Doe"
                            className="profile-avatar-img"
                        />
                    </div>
                    <div className="profile-info">
                        <h1 className="profile-name">Jane Doe</h1>
                        <p className="profile-username">@janedoe</p>
                        <div className="profile-meta">
                            <span className="meta-item">
                                <MapPin size={14} />
                                San Francisco, CA
                            </span>
                            <span className="meta-item">
                                <Calendar size={14} />
                                Joined September 2025
                            </span>
                        </div>
                    </div>
                </div>
                <button className="edit-profile-btn">
                    <Edit2 size={16} />
                    Edit Profile
                </button>
            </div>

            {/* Stats Section */}
            <div className="profile-stats-grid">
                <div className="stat-card">
                    <div className="stat-icon-wrapper blue">
                        <Activity size={24} />
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">42</span>
                        <span className="stat-label">Workouts</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon-wrapper orange">
                        <Zap size={24} />
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">12</span>
                        <span className="stat-label">Day Streak</span>
                    </div>
                </div>
            </div>

            {/* Menu Section */}
            <div className="profile-menu-section">
                <h2 className="profile-section-title">Menu</h2>
                <div className="profile-menu-grid">
                    <Link to="/app/settings" className="menu-card settings">
                        <div className="menu-icon-wrapper">
                            <Settings size={24} />
                        </div>
                        <span className="menu-label">Settings</span>
                    </Link>

                    <Link to="/app/messages" className="menu-card messages">
                        <div className="menu-icon-wrapper">
                            <MessageSquare size={24} />
                        </div>
                        <span className="menu-label">Messages</span>
                    </Link>

                    <Link to="/app/invoices" className="menu-card invoices">
                        <div className="menu-icon-wrapper">
                            <FileText size={24} />
                        </div>
                        <span className="menu-label">Invoices</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;
