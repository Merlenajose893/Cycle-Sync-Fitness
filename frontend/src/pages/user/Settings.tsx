import { userDobSchema, getDobMaxDate, parseApiErrorMessage } from '../../utils/validationUtils';
import React, { useEffect, useState } from 'react';
import DateOfBirthPicker from '../../components/common/DateOfBirthPicker/DateOfBirthPicker';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '../../hooks/profile/useUserProfile';
import type { UserProfile, UpdateUserProfileDTO } from '../../types/profile.types';
import { User, Bell, Shield, Palette, Trash2, Calendar, Lock, Eye, Check } from 'lucide-react';
import { showToast } from '../../components/common/Toast/Toast';
import Modal from '../../components/common/Modal/Modal';
import '../../styles/UserSettings.css';

const Settings: React.FC = () => {
    const navigate = useNavigate();
    const { getProfile, updateProfile, uploadAvatar, deleteAvatar, changePassword, deleteAccount, loading } = useUserProfile();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [formData, setFormData] = useState<UpdateUserProfileDTO>({
        firstName: "",
        lastName: "",
        bio: ""
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteConfirmPassword, setDeleteConfirmPassword] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProfile();
                setProfile(data);
                if (data) {
                    setFormData({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        bio: data.bio,
                        bodyDetails: {
                            height: data.bodyDetails?.height || 0,
                            weight: data.bodyDetails?.weight || 0,
                            biologicalSex: data.bodyDetails?.biologicalSex || '',
                            dateOfBirth: data.bodyDetails?.dateOfBirth || ''
                        },
                        cycleSetUp: {
                            averageCycleLength: data.cycleSetUp?.averageCycleLength || 28,
                            averagePeriodLength: data.cycleSetUp?.averagePeriodLength || 5,
                            birthControl: data.cycleSetUp?.birthControl || 'none',
                            lastPeriodStart: data.cycleSetUp?.lastPeriodStart || ''
                        },
                        goals: {
                            primaryGoal: data.goals?.primaryGoal || 'general_health',
                            targetWeight: data.goals?.targetWeight || 0,
                            activityLevel: data.goals?.activityLevel || 'moderatelyActive'
                        }
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleBodyDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            bodyDetails: {
                height: prev.bodyDetails?.height || 0,
                weight: prev.bodyDetails?.weight || 0,
                biologicalSex: prev.bodyDetails?.biologicalSex || '',
                dateOfBirth: prev.bodyDetails?.dateOfBirth || '',
                [name]: value
            }
        }));
    };

    const handleCycleSetupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            cycleSetUp: {
                ...prev.cycleSetUp,
                [name]: parseInt(value)
            }
        }));
    };

    const handleCycleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFormData(prev => ({
            ...prev,
            cycleSetUp: {
                ...prev.cycleSetUp,
                lastPeriodStart: value
            }
        }));
    };


    const handleSave = async () => {
        // Zod DOB Validation if DOB is entered
        if (formData.bodyDetails?.dateOfBirth) {
            const dateStr = typeof formData.bodyDetails.dateOfBirth === 'string'
                ? formData.bodyDetails.dateOfBirth
                : new Date(formData.bodyDetails.dateOfBirth).toISOString().split('T')[0];
            const dobValidation = userDobSchema.safeParse(dateStr);
            if (!dobValidation.success) {
                showToast.error(dobValidation.error.issues[0]?.message || "Invalid Date of Birth");
                return;
            }
        }

        try {
            await updateProfile(formData);
            showToast.success("Profile updated successfully!");
            // 5.2 Redirect to profile page after save
            navigate('/app/profile');
        } catch (error: any) {
            console.error("Failed to update profile", error);
            showToast.error(parseApiErrorMessage(error, "Failed to update profile"));
        }
    };

    const handlePasswordDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdatePassword = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            showToast.error("Passwords do not match");
            return;
        }
        try {
            await changePassword({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });
            showToast.success("Password updated successfully!");
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            console.error("Failed to update password", error);
            showToast.error("Failed to update password");
        }
    };

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const updatedProfile = await uploadAvatar(file);
            setProfile(updatedProfile);
            showToast.success("Avatar uploaded successfully!");
        } catch (error) {
            console.error("Failed to upload avatar", error);
            showToast.error("Failed to upload avatar");
        }
    };

    const handleAvatarDelete = async () => {
        try {
            const updatedProfile = await deleteAvatar();
            setProfile(updatedProfile);
            showToast.success("Avatar removed successfully!");
        } catch (error) {
            console.error("Failed to remove avatar", error);
            showToast.error("Failed to remove avatar");
        }
    };

    const confirmDeleteAccount = async () => {
        if (!deleteConfirmPassword) {
            showToast.error("Please enter your password to confirm");
            return;
        }
        try {
            await deleteAccount({ password: deleteConfirmPassword });
            showToast.success("Account deleted successfully!");
            window.location.href = '/login';
        } catch (error) {
            console.error("Failed to delete account", error);
            showToast.error("Failed to delete account");
        }
    };

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

                    <button className="settings-nav-item danger" onClick={() => setIsDeleteModalOpen(true)}>
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
                                <div className="photo-avatar" style={{ overflow: 'hidden' }}>
                                    {profile?.avatarUrl ? (
                                        <img src={profile.avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        (profile?.firstName?.[0] || '') + (profile?.lastName?.[0] || 'U')
                                    )}
                                    <div className="photo-badge">
                                        <Check size={12} />
                                    </div>
                                </div>
                                <div className="photo-info">
                                    <span className="photo-name">{profile?.firstName || 'User'} {profile?.lastName || ''}</span>
                                    <span className="photo-hint">JPG, PNG or GIF - Max 5 MB</span>
                                    <div className="photo-actions">
                                        <label className="btn-upload" style={{ cursor: 'pointer' }}>
                                            Upload Photo
                                            <input type="file" accept="image/png, image/jpeg, image/gif" style={{ display: 'none' }} onChange={handleAvatarUpload} />
                                        </label>
                                        <button className="btn-remove" onClick={handleAvatarDelete}>Remove</button>
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
                                    <input type="text" className="form-input" name='firstName' value={formData.firstName} onChange={handleChange} />
                                </div>
                                <div className="form-field">
                                    <label className="field-label">Last Name</label>
                                    <input type="text" className="form-input" name='lastName' value={formData.lastName} onChange={handleChange} />
                                </div>

                                <div className="form-field">
                                    <DateOfBirthPicker
                                        value={formData.bodyDetails?.dateOfBirth ? (
                                            typeof formData.bodyDetails.dateOfBirth === 'string' && formData.bodyDetails.dateOfBirth.includes('-')
                                                ? formData.bodyDetails.dateOfBirth
                                                : new Date(formData.bodyDetails.dateOfBirth).toISOString().split('T')[0]
                                        ) : ''}
                                        onChange={(dateStr) => {
                                            setFormData(prev => ({
                                                ...prev,
                                                bodyDetails: {
                                                    height: prev.bodyDetails?.height || 0,
                                                    weight: prev.bodyDetails?.weight || 0,
                                                    biologicalSex: prev.bodyDetails?.biologicalSex || '',
                                                    dateOfBirth: dateStr,
                                                }
                                            }));
                                        }}
                                    />
                                </div>

                                <div className="form-field full-width">
                                    <label className="field-label">Bio</label>
                                    <textarea className="form-textarea" name='bio' value={formData.bio} onChange={handleChange}></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Goals Configuration */}
                        <div>
                            <h3 className="form-group-title">Goals & Activity</h3>
                            <div className="form-grid">
                                <div className="form-field">
                                    <label className="field-label">Primary Goal</label>
                                    <select className="form-input" name="primaryGoal" value={formData.goals?.primaryGoal || 'general_health'} onChange={(e) => setFormData(prev => ({ ...prev, goals: { ...prev.goals, primaryGoal: e.target.value as any } }))}>
                                        <option value="weight_loss">Weight Loss</option>
                                        <option value="muscle_gain">Muscle Gain</option>
                                        <option value="hormone_balance">Hormone Balance</option>
                                        <option value="general_health">General Health</option>
                                    </select>
                                </div>
                                <div className="form-field">
                                    <label className="field-label">Activity Level</label>
                                    <select className="form-input" name="activityLevel" value={formData.goals?.activityLevel || 'moderatelyActive'} onChange={(e) => setFormData(prev => ({ ...prev, goals: { ...prev.goals, activityLevel: e.target.value as any } }))}>
                                        <option value="sedentary">Sedentary</option>
                                        <option value="lightActive">Lightly Active</option>
                                        <option value="moderatelyActive">Moderately Active</option>
                                    </select>
                                </div>
                                <div className="form-field">
                                    <label className="field-label">Target Weight (kg)</label>
                                    <input type="number" className="form-input" name="targetWeight" value={formData.goals?.targetWeight || 0} onChange={(e) => setFormData(prev => ({ ...prev, goals: { ...prev.goals, targetWeight: parseFloat(e.target.value) } }))} />
                                </div>
                            </div>
                        </div>

                        {/* Cycle Configuration */}
                        <div>
                            <h3 className="form-group-title">Cycle Configuration</h3>
                            <div className="form-grid">
                                <div className="slider-group">
                                    <div className="slider-field">
                                        <div className="slider-header">
                                            <span className="slider-label">Average Cycle Length</span>
                                            <span className="slider-value">{formData.cycleSetUp?.averageCycleLength ?? 28}d</span>
                                        </div>
                                        <input
                                            type="range"
                                            name="averageCycleLength"
                                            min="21"
                                            max="35"
                                            value={formData.cycleSetUp?.averageCycleLength ?? 28}
                                            onChange={handleCycleSetupChange}
                                            className="form-slider"
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label className="field-label">Last Period Start Date</label>
                                        <div className="input-wrapper">
                                            <Calendar size={16} className="input-icon" />
                                            <input type="date" className="form-input" value={formData.cycleSetUp?.lastPeriodStart || ''} onChange={handleCycleDateChange} />
                                        </div>
                                    </div>
                                </div>

                                <div className="slider-group">
                                    <div className="slider-field">
                                        <div className="slider-header">
                                            <span className="slider-label">Period Length</span>
                                            <span className="slider-value">{formData.cycleSetUp?.averagePeriodLength ?? 5}d</span>
                                        </div>
                                        <input
                                            type="range"
                                            name="averagePeriodLength"
                                            min="3"
                                            max="10"
                                            value={formData.cycleSetUp?.averagePeriodLength ?? 5}
                                            onChange={handleCycleSetupChange}
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
                                        <input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordDataChange} className="form-input" placeholder="Current password" />
                                    </div>
                                </div>
                                <div className="form-field">
                                    <label className="field-label">New Password</label>
                                    <div className="input-wrapper">
                                        <Lock size={16} className="input-icon" />
                                        <input type={showPassword ? "text" : "password"} name="newPassword" value={passwordData.newPassword} onChange={handlePasswordDataChange} className="form-input" placeholder="Min 8 characters" />
                                        <Eye size={16} className="input-icon" onClick={() => setShowPassword(!showPassword)} style={{ left: 'auto', right: '12px', cursor: 'pointer' }} />
                                    </div>
                                </div>
                                <div className="form-field">
                                    <label className="field-label">Confirm New Password</label>
                                    <div className="input-wrapper">
                                        <Lock size={16} className="input-icon" />
                                        <input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordDataChange} className="form-input" placeholder="Repeat new password" />
                                    </div>
                                </div>
                            </div>
                            <button className="btn-update-password" onClick={handleUpdatePassword} disabled={loading}>
                                <Lock size={14} /> Update Password
                            </button>
                        </div>
                    </div>

                    <div className="settings-footer">
                        <button className="btn-cancel" onClick={() => navigate('/app/profile')}>Cancel</button>
                        <button className="btn-save" onClick={handleSave} disabled={loading}>
                            <Check size={16} /> {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Custom Modal for Account Deletion (5.4) */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete Account"
                confirmText="Delete Account"
                variant="danger"
                onConfirm={confirmDeleteAccount}
                isLoading={loading}
            >
                <p style={{ marginBottom: '16px' }}>Are you sure you want to delete your account? This action is permanent and cannot be undone.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Enter your password to confirm:</label>
                    <input
                        type="password"
                        className="form-input"
                        value={deleteConfirmPassword}
                        onChange={(e) => setDeleteConfirmPassword(e.target.value)}
                        placeholder="Your current password"
                    />
                </div>
            </Modal>
        </div>
    );
};

export default Settings;
