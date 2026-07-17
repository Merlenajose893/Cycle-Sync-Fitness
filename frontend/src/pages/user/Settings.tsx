import React, { useState } from 'react';
import { User, Bell, Shield, Palette, Trash2, Mail, Phone, Calendar, MapPin, Lock, Eye, Check } from 'lucide-react';
import '../../styles/UserSettings.css';

const Settings: React.FC = () => {
    const [cycleLength, setCycleLength] = useState(28);
    const [periodLength, setPeriodLength] = useState(5);

    return (
        <div className="settings-container">
            <div className="settings-header">
                <h1 className="settings-title">
                    <User size={28} />
                    Settings
                </h1>
                <p className="settings-subtitle">Manage your account, privacy, and app preferences</p>
            </div>

            <div className="settings-layout">
                {/* Sidebar Menu */}
                <div className="settings-sidebar">
                    <div className="sidebar-label">Settings Menu</div>
                    <button className="settings-nav-item active">
                        <div className="nav-item-left">
                            <User size={16} />
                            Profile
                        </div>
                    </button>
                    <button className="settings-nav-item">
                        <div className="nav-item-left">
                            <Bell size={16} />
                            Notifications
                        </div>
                    </button>
                    <button className="settings-nav-item">
                        <div className="nav-item-left">
                            <Shield size={16} />
                            Privacy & Security
                        </div>
                    </button>
                    <button className="settings-nav-item">
                        <div className="nav-item-left">
                            <Palette size={16} />
                            Appearance
                        </div>
                    </button>

                    <button className="settings-nav-item danger">
                        <div className="nav-item-left">
                            <Trash2 size={16} />
                            Danger Zone
                        </div>
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="settings-content-card">
                    <div className="settings-section-header">
                        <h2 className="settings-section-title">Profile Settings</h2>
                        <p className="settings-section-subtitle">Manage your personal information, account details, and cycle data.</p>
                    </div>

                    <div className="settings-form-body">
                        {/* Profile Photo */}
                        <div>
                            <h3 className="form-group-title">Profile Photo</h3>
                            <div className="profile-photo-section">
                                <div className="photo-avatar">
                                    JD
                                    <div className="photo-badge">
                                        <Check size={12} />
                                    </div>
                                </div>
                                <div className="photo-info">
                                    <span className="photo-name">Jane Doe</span>
                                    <span className="photo-hint">JPG, PNG or GIF - Max 5 MB</span>
                                    <div className="photo-actions">
                                        <button className="btn-upload">Upload Photo</button>
                                        <button className="btn-remove">Remove</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Personal Information */}
                        <div>
                            <h3 className="form-group-title">Personal Information</h3>
                            <div className="form-grid">
                                <div className="form-field">
                                    <label className="field-label">First Name</label>
                                    <input type="text" className="form-input" defaultValue="Jane" />
                                </div>
                                <div className="form-field">
                                    <label className="field-label">Last Name</label>
                                    <input type="text" className="form-input" defaultValue="Doe" />
                                </div>

                                <div className="form-field">
                                    <label className="field-label">Email Address</label>
                                    <div className="input-wrapper">
                                        <Mail size={16} className="input-icon" />
                                        <input type="email" className="form-input" defaultValue="jane.doe@example.com" />
                                    </div>
                                </div>
                                <div className="form-field">
                                    <label className="field-label">Phone Number</label>
                                    <div className="input-wrapper">
                                        <Phone size={16} className="input-icon" />
                                        <input type="tel" className="form-input" defaultValue="+91 98765 43210" />
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label className="field-label">Date of Birth</label>
                                    <div className="input-wrapper">
                                        <Calendar size={16} className="input-icon" />
                                        <input type="text" className="form-input" defaultValue="15-03-1996" />
                                    </div>
                                </div>
                                <div className="form-field">
                                    <label className="field-label">Location</label>
                                    <div className="input-wrapper">
                                        <MapPin size={16} className="input-icon" />
                                        <input type="text" className="form-input" defaultValue="Mumbai, India" />
                                    </div>
                                </div>

                                <div className="form-field full-width">
                                    <label className="field-label">Bio</label>
                                    <textarea className="form-textarea" defaultValue="Passionate about holistic wellness and cycle-synced living. 🌙"></textarea>
                                    <span className="field-hint">62/160 characters</span>
                                </div>
                            </div>
                        </div>

                        {/* Cycle Configuration */}
                        <div>
                            <h3 className="form-group-title">Cycle Configuration</h3>

                            <div className="cycle-stats">
                                <div className="cycle-stat-box">
                                    <span className="cycle-stat-value">{cycleLength}</span>
                                    <span className="cycle-stat-label">Cycle Length (days)</span>
                                </div>
                                <div className="cycle-stat-box">
                                    <span className="cycle-stat-value">{periodLength}</span>
                                    <span className="cycle-stat-label">Period Length (days)</span>
                                </div>
                                <div className="cycle-stat-box">
                                    <span className="cycle-stat-value">2026-02-10</span>
                                    <span className="cycle-stat-label">Last Period Start</span>
                                </div>
                            </div>

                            <div className="form-grid">
                                <div className="slider-group">
                                    <div className="slider-field">
                                        <div className="slider-header">
                                            <span className="slider-label">Average Cycle Length</span>
                                            <span className="slider-value">{cycleLength}d</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="21"
                                            max="35"
                                            value={cycleLength}
                                            onChange={(e) => setCycleLength(parseInt(e.target.value))}
                                            className="form-slider"
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label className="field-label">Last Period Start Date</label>
                                        <div className="input-wrapper">
                                            <Calendar size={16} className="input-icon" />
                                            <input type="date" className="form-input" defaultValue="2026-02-10" />
                                        </div>
                                    </div>
                                </div>

                                <div className="slider-group">
                                    <div className="slider-field">
                                        <div className="slider-header">
                                            <span className="slider-label">Period Length</span>
                                            <span className="slider-value">{periodLength}d</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="3"
                                            max="10"
                                            value={periodLength}
                                            onChange={(e) => setPeriodLength(parseInt(e.target.value))}
                                            className="form-slider"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Change Password */}
                        <div>
                            <h3 className="form-group-title">Change Password</h3>
                            <div className="form-grid">
                                <div className="form-field full-width">
                                    <label className="field-label">Current Password</label>
                                    <div className="input-wrapper">
                                        <Lock size={16} className="input-icon" />
                                        <input type="password" className="form-input" defaultValue="********" />
                                    </div>
                                </div>
                                <div className="form-field">
                                    <label className="field-label">New Password</label>
                                    <div className="input-wrapper">
                                        <Lock size={16} className="input-icon" />
                                        <input type="password" className="form-input" placeholder="Min 8 characters" />
                                        <Eye size={16} className="input-icon" style={{ left: 'auto', right: '12px', cursor: 'pointer' }} />
                                    </div>
                                </div>
                                <div className="form-field">
                                    <label className="field-label">Confirm New Password</label>
                                    <div className="input-wrapper">
                                        <Lock size={16} className="input-icon" />
                                        <input type="password" className="form-input" placeholder="Repeat new password" />
                                    </div>
                                </div>
                            </div>
                            <button className="btn-update-password">
                                <Lock size={14} /> Update Password
                            </button>
                        </div>

                    </div>

                    <div className="settings-footer">
                        <button className="btn-cancel">Cancel</button>
                        <button className="btn-save">
                            <Check size={16} /> Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
