import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Calendar, Activity, Zap, Settings, MessageSquare, FileText, Heart, Target, User, ShieldAlert } from 'lucide-react';
import '../../styles/UserProfile.css';
import { useUserProfile } from '../../hooks/profile/useUserProfile';
import type { UserProfile } from '../../types/profile.types';

const Profile: React.FC = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const { getProfile, loading } = useUserProfile();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                setProfile(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProfile();
    }, []);

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return 'Not specified';
        try {
            return new Date(dateStr).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            return dateStr;
        }
    };

    return (
        <div className="user-profile-container">
            {/* Profile Banner */}
            <div className="profile-banner-card">
                <div className="profile-banner-left">
                    <div className="profile-avatar-wrapper">
                        {profile?.avatarUrl ? (
                            <img
                                src={profile.avatarUrl}
                                alt={profile.firstName || 'User Avatar'}
                                className="profile-avatar-img"
                            />
                        ) : (
                            <div className="profile-avatar-placeholder" style={{
                                width: '100%', height: '100%', borderRadius: '50%',
                                backgroundColor: '#0d9488', color: '#fff', display: 'flex',
                                alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 700
                            }}>
                                {(profile?.firstName?.[0] || 'U') + (profile?.lastName?.[0] || '')}
                            </div>
                        )}
                    </div>
                    <div className="profile-info">
                        <h1 className="profile-name">
                            {profile?.firstName ? `${profile.firstName} ${profile.lastName || ''}`.trim() : 'User Profile'}
                        </h1>
                        <p className="profile-username">{profile?.email}</p>
                        {profile?.bio && <p className="profile-bio" style={{ marginTop: '8px', color: '#64748b', fontSize: '0.95rem' }}>{profile.bio}</p>}
                        <div className="profile-meta" style={{ marginTop: '12px' }}>
                            <span className="meta-item">
                                <Calendar size={14} /> Joined {formatDate(profile?.createdAt)}
                            </span>
                        </div>
                    </div>
                </div>
                <Link to="/app/settings" className="edit-profile-btn">
                    <Edit2 size={16} />
                    Edit Profile
                </Link>
            </div>

            {/* Quick Stats Section */}
            <div className="profile-stats-grid">
                <div className="stat-card">
                    <div className="stat-icon-wrapper blue">
                        <Activity size={24} />
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{profile?.bodyDetails?.weight ? `${profile.bodyDetails.weight} kg` : '--'}</span>
                        <span className="stat-label">Current Weight</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon-wrapper orange">
                        <Target size={24} />
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{profile?.goals?.targetWeight ? `${profile.goals.targetWeight} kg` : '--'}</span>
                        <span className="stat-label">Target Weight</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon-wrapper purple" style={{ backgroundColor: 'rgba(147, 51, 234, 0.1)', color: '#9333ea' }}>
                        <Heart size={24} />
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{profile?.cycleSetUp?.averageCycleLength ? `${profile.cycleSetUp.averageCycleLength} days` : '28 days'}</span>
                        <span className="stat-label">Cycle Length</span>
                    </div>
                </div>
            </div>

            {/* Detailed Info Cards Grid */}
            <div className="profile-details-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', margin: '24px 0' }}>
                {/* Body Details Card */}
                <div className="profile-card" style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', color: '#0d9488' }}>
                        <User size={20} />
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: '#0f172a' }}>Body Details</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc', paddingBottom: '8px' }}>
                            <span style={{ color: '#64748b' }}>Height</span>
                            <span style={{ fontWeight: 600, color: '#0f172a' }}>{profile?.bodyDetails?.height ? `${profile.bodyDetails.height} cm` : 'Not set'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc', paddingBottom: '8px' }}>
                            <span style={{ color: '#64748b' }}>Weight</span>
                            <span style={{ fontWeight: 600, color: '#0f172a' }}>{profile?.bodyDetails?.weight ? `${profile.bodyDetails.weight} kg` : 'Not set'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc', paddingBottom: '8px' }}>
                            <span style={{ color: '#64748b' }}>Biological Sex</span>
                            <span style={{ fontWeight: 600, color: '#0f172a', textTransform: 'capitalize' }}>{profile?.bodyDetails?.biologicalSex || 'Not set'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#64748b' }}>Date of Birth</span>
                            <span style={{ fontWeight: 600, color: '#0f172a' }}>{formatDate(profile?.bodyDetails?.dateOfBirth)}</span>
                        </div>
                    </div>
                </div>

                {/* Goals & Preferences Card */}
                <div className="profile-card" style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', color: '#0d9488' }}>
                        <Target size={20} />
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: '#0f172a' }}>Goals & Activity</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc', paddingBottom: '8px' }}>
                            <span style={{ color: '#64748b' }}>Primary Goal</span>
                            <span style={{ fontWeight: 600, color: '#0f172a', textTransform: 'capitalize' }}>{profile?.goals?.primaryGoal ? profile.goals.primaryGoal.replace('_', ' ') : 'General Health'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc', paddingBottom: '8px' }}>
                            <span style={{ color: '#64748b' }}>Activity Level</span>
                            <span style={{ fontWeight: 600, color: '#0f172a', textTransform: 'capitalize' }}>{profile?.goals?.activityLevel ? profile.goals.activityLevel.replace(/([A-Z])/g, ' $1') : 'Moderately Active'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#64748b' }}>Target Weight</span>
                            <span style={{ fontWeight: 600, color: '#0f172a' }}>{profile?.goals?.targetWeight ? `${profile.goals.targetWeight} kg` : 'Not set'}</span>
                        </div>
                    </div>
                </div>

                {/* Cycle Setup Card */}
                <div className="profile-card" style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', color: '#0d9488' }}>
                        <Heart size={20} />
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: '#0f172a' }}>Cycle Tracking</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc', paddingBottom: '8px' }}>
                            <span style={{ color: '#64748b' }}>Avg. Cycle Length</span>
                            <span style={{ fontWeight: 600, color: '#0f172a' }}>{profile?.cycleSetUp?.averageCycleLength || 28} days</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc', paddingBottom: '8px' }}>
                            <span style={{ color: '#64748b' }}>Avg. Period Length</span>
                            <span style={{ fontWeight: 600, color: '#0f172a' }}>{profile?.cycleSetUp?.averagePeriodLength || 5} days</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#64748b' }}>Last Period Start</span>
                            <span style={{ fontWeight: 600, color: '#0f172a' }}>{formatDate(profile?.cycleSetUp?.lastPeriodStart)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu Section */}
            <div className="profile-menu-section">
                <h2 className="profile-section-title">Quick Navigation</h2>
                <div className="profile-menu-grid">
                    <Link to="/app/settings" className="menu-card settings">
                        <div className="menu-icon-wrapper">
                            <Settings size={24} />
                        </div>
                        <span className="menu-label">Settings</span>
                    </Link>

                    <Link to="/app/ai-plan/history" className="menu-card messages" style={{ backgroundColor: 'rgba(13, 148, 136, 0.08)' }}>
                        <div className="menu-icon-wrapper" style={{ color: '#0d9488' }}>
                            <Activity size={24} />
                        </div>
                        <span className="menu-label">My AI Plans</span>
                    </Link>

                    <Link to="/app/messages" className="menu-card messages">
                        <div className="menu-icon-wrapper">
                            <MessageSquare size={24} />
                        </div>
                        <span className="menu-label">Messages</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;
