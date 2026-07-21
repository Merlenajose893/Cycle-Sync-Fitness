import React, { useEffect, useState } from 'react';
import { useUserProfile } from '../../hooks/profile/useUserProfile';
import type { UserProfile,UpdateUserProfileDTO } from '../../types/profile.types';
import { User, Bell, Shield, Palette, Trash2, Mail, Phone, Calendar, MapPin, Lock, Eye, Check } from 'lucide-react';
import { showToast } from '../../components/common/Toast/Toast';
import '../../styles/UserSettings.css';

const Settings: React.FC = () => {
    const {getProfile,updateProfile,uploadAvatar,deleteAvatar,changePassword,deleteAccount,loading}=useUserProfile();
    const [profile,setProfile]=useState<UserProfile|null>(null)
    const [formData,setFormData]=useState<UpdateUserProfileDTO>({
        firstName:"",
        lastName:"",
        bio:""
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
) => {
    e.preventDefault();

    try {
        const updatedProfile = await updateProfile(formData);

        setProfile(updatedProfile);

        showToast.success("Profile updated successfully!");
    } catch (error) {
        console.error(error);
        showToast.error("Failed to update profile.");
    }
};

    useEffect(()=>{
        const fetchData=async () => {
            try {
                const data=await getProfile();
                setProfile(data)
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchData();
    },[])
    useEffect(()=>{
        if(!profile) return;
        setFormData({
            firstName:profile.firstName,
            lastName:profile.lastName,
            bio:profile.bio,
            bodyDetails:{
                height:profile.bodyDetails?.height || 0,
                weight:profile.bodyDetails?.weight || 0,
                biologicalSex:profile.bodyDetails?.biologicalSex || '',
                dateOfBirth:profile.bodyDetails?.dateOfBirth || ''
            },
            cycleSetUp:{
                averageCycleLength:profile.cycleSetUp?.averageCycleLength || 28,
                averagePeriodLength:profile.cycleSetUp?.averagePeriodLength || 5,
                birthControl:profile.cycleSetUp?.birthControl || 'none',
                lastPeriodStart:profile.cycleSetUp?.lastPeriodStart || ''
            },
            goals:{
                primaryGoal:profile.goals?.primaryGoal || 'general_health',
                targetWeight:profile.goals?.targetWeight || 0,
                activityLevel:profile.goals?.activityLevel || 'moderatelyActive'
            }
        })
    }, [profile])
    const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
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
        try {
            await updateProfile(formData);
            showToast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Failed to update profile", error);
            showToast.error("Failed to update profile");
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

    const handleDeleteAccount = async () => {
        const password = prompt("Please enter your password to confirm account deletion:");
        if (!password) return;
        try {
            await deleteAccount({ password });
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

                    <button className="settings-nav-item danger" onClick={handleDeleteAccount}>
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
                                        <img src={profile.avatarUrl} alt="Avatar" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
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
                                    <label className="field-label">Date of Birth</label>
                                    <div className="input-wrapper">
                                        <Calendar size={16} className="input-icon" />
                                        <input type="date" className="form-input" name='dateOfBirth' value={formData.bodyDetails?.dateOfBirth || ''} onChange={handleBodyDetailsChange} />
                                    </div>
                                </div>
                                

                                <div className="form-field full-width">
                                    <label className="field-label">Bio</label>
                                    <textarea className="form-textarea" name='bio' value={formData.bio} onChange={handleChange}></textarea>
                                    <span className="field-hint">62/160 characters</span>
                                </div>
                            </div>
                        </div>

                        {/* Goals Configuration */}
                        <div>
                            <h3 className="form-group-title">Goals & Activity</h3>
                            <div className="form-grid">
                                <div className="form-field">
                                    <label className="field-label">Primary Goal</label>
                                    <select className="form-input" name="primaryGoal" value={formData.goals?.primaryGoal || 'general_health'} onChange={(e) => setFormData(prev => ({...prev, goals: {...prev.goals, primaryGoal: e.target.value as any}}))}>
                                        <option value="weight_loss">Weight Loss</option>
                                        <option value="muscle_gain">Muscle Gain</option>
                                        <option value="hormone_balance">Hormone Balance</option>
                                        <option value="general_health">General Health</option>
                                    </select>
                                </div>
                                <div className="form-field">
                                    <label className="field-label">Activity Level</label>
                                    <select className="form-input" name="activityLevel" value={formData.goals?.activityLevel || 'moderatelyActive'} onChange={(e) => setFormData(prev => ({...prev, goals: {...prev.goals, activityLevel: e.target.value as any}}))}>
                                        <option value="sedentary">Sedentary</option>
                                        <option value="lightActive">Lightly Active</option>
                                        <option value="moderatelyActive">Moderately Active</option>
                                    </select>
                                </div>
                                <div className="form-field">
                                    <label className="field-label">Target Weight (kg)</label>
                                    <input type="number" className="form-input" name="targetWeight" value={formData.goals?.targetWeight || 0} onChange={(e) => setFormData(prev => ({...prev, goals: {...prev.goals, targetWeight: parseFloat(e.target.value)}}))} />
                                </div>
                            </div>
                        </div>

                        {/* Cycle Configuration */}
                        <div>
                            <h3 className="form-group-title">Cycle Configuration</h3>

                            <div className="cycle-stats">
                                <div className="cycle-stat-box">
                                    <input
                                        type="range"
                                        name="averageCycleLength"
                                        min="21"
                                        max="35"
                                        value={formData.cycleSetUp?.averageCycleLength ?? 28}
                                        onChange={handleCycleSetupChange}
                                        style={{display: 'none'}}
                                    />
                                    <span className="cycle-stat-value">{formData.cycleSetUp?.averageCycleLength ?? 28}</span>
                                    <span className="cycle-stat-label">Cycle Length (days)</span>
                                </div>
                                <div className="cycle-stat-box">
                                    <span className="cycle-stat-value">{formData.cycleSetUp?.averagePeriodLength ?? 5}</span>
                                    <span className="cycle-stat-label">Period Length (days)</span>
                                </div>
                                <div className="cycle-stat-box">
                                    <span className="cycle-stat-value">{formData.cycleSetUp?.lastPeriodStart || 'Not set'}</span>
                                    <span className="cycle-stat-label">Last Period Start</span>
                                </div>
                            </div>

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
                        <button className="btn-cancel" onClick={() => setFormData(profile ? {
                            firstName: profile.firstName,
                            lastName: profile.lastName,
                            bio: profile.bio,
                            bodyDetails: {
                                height: profile.bodyDetails?.height || 0,
                                weight: profile.bodyDetails?.weight || 0,
                                biologicalSex: profile.bodyDetails?.biologicalSex || '',
                                dateOfBirth: profile.bodyDetails?.dateOfBirth || ''
                            },
                            cycleSetUp: {
                                averageCycleLength: profile.cycleSetUp?.averageCycleLength || 28,
                                averagePeriodLength: profile.cycleSetUp?.averagePeriodLength || 5,
                                birthControl: profile.cycleSetUp?.birthControl || 'none',
                                lastPeriodStart: profile.cycleSetUp?.lastPeriodStart || ''
                            },
                            goals: {
                                primaryGoal: profile.goals?.primaryGoal || 'general_health',
                                targetWeight: profile.goals?.targetWeight || 0,
                                activityLevel: profile.goals?.activityLevel || 'moderatelyActive'
                            }
                        } : formData)}>Cancel</button>
                        <button className="btn-save" onClick={handleSave} disabled={loading}>
                            <Check size={16} /> {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
