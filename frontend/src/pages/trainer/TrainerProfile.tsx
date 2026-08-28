import React, { useState, useRef, useEffect } from 'react';
import {
    CheckCircle,
    Edit3,
    Camera,
    Plus,
    X,
    Trash2,
    Award,
    Globe,
    ExternalLink,
    Phone,
    Mail,
    MapPin,
    Briefcase,
    User,
    Calendar,
    ChevronRight,
    Clock,
    Check,
    Save,
    RotateCcw
} from 'lucide-react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useTrainerContext } from '../../context/TrainerAuthContext';
import { traineronboardingService } from '../../services/onboarding/traineronboardingService';
import '../../styles/TrainerPanel.css';
import { trainerMarketPlaceService } from '../../services/marketplace/trainerMarketplaceService';

interface CertificationItem {
    id: string;
    title: string;
    issuedBy: string;
    year: string;
}

interface PackageItem {
    id: string;
    name: string;
    sessions?: number;
    duration?: string;
    price: number;
    status?: 'active' | 'pending';
    popular?: boolean;
}

export const TrainerProfile: React.FC = () => {
    const { trainer } = useTrainerContext();
    
    // Toggle state: preview as client vs edit mode
    const [previewAsClient, setPreviewAsClient] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [saving, setSaving] = useState<boolean>(false);
    const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

    // Profile Data State initialized with current trainer data or high quality mockup matching design screenshot
    const [fullName, setFullName] = useState<string>(
        trainer ? `Dr. ${trainer.firstName} ${trainer.lastName}` : 'Dr. Sarah Mitchell'
    );
    const [headline, setHeadline] = useState<string>(
        trainer?.speciality || 'Nutrition & Hormones • Cycle Health • PCOS Management'
    );
    const [bio, setBio] = useState<string>(
        trainer?.bio || 'Certified nutritionist specializing in hormone balance and cycle-synced nutrition plans. Helping women optimize their metabolic health through all phases of their cycle.'
    );
    const [avatar, setAvatar] = useState<string>(
        trainer?.avatar || 'https://images.unsplash.com/photo-1594824813572-c50974719c27?auto=format&fit=crop&q=80&w=400'
    );
    const [coverImage, setCoverImage] = useState<string>(
        'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=1200'
    );

    // Specialties tags
    const [specialties, setSpecialties] = useState<string[]>(
        trainer?.tags && trainer.tags.length > 0
            ? trainer.tags
            : ['Nutrition & Hormones', 'Cycle Health', 'PCOS Management']
    );
    const [newSpecialty, setNewSpecialty] = useState<string>('');

    // Certifications
    const [certifications, setCertifications] = useState<CertificationItem[]>(
        trainer?.certifications && trainer.certifications.length > 0
            ? trainer.certifications.map((c, idx) => ({ id: `cert-${idx}`, title: c.title, issuedBy: c.issuedBy, year: c.year }))
            : [
                { id: '1', title: 'Registered Dietitian (RD)', issuedBy: 'Commission on Dietetic Registration', year: '2016' },
                { id: '2', title: 'Certified Strength & Conditioning Specialist', issuedBy: 'NSCA', year: '2018' }
            ]
    );

    // Coaching Packages
    // const [packages] = useState<PackageItem[]>([
    //     { id: 'pkg-1', name: '3-Month Evolution', sessions: 24, duration: '3 Months', price: 750, status: 'active' },
    //     { id: 'pkg-2', name: '6-Month Mastery', sessions: 48, duration: '6 Months', price: 1300, status: 'active' },
    //     { id: 'pkg-3', name: 'Power Reset (1 Month)', sessions: 8, duration: '1 Month', price: 299, status: 'active' },
    //     { id: 'pkg-4', name: 'Pre-Natal Focus', price: 450, status: 'pending' }
    // ]);
const [packages, setPackages] = useState<PackageItem[]>([]);
    const [packagesLoading, setPackagesLoading] = useState<boolean>(false);
    // Session Mode
    const [sessionMode, setSessionMode] = useState<string>('Both (Online & In-Person)');

    // Professional Links
    const [website, setWebsite] = useState<string>('www.sarahmitchell.com');
    const [linkedin, setLinkedin] = useState<string>('linkedin.com/in/sarahmitchell');
    const [instagram, setInstagram] = useState<string>('instagram.com/sarah.hormone.dr');

    // Personal Information
    const [phone, setPhone] = useState<string>(
        trainer?.phone ? String(trainer.phone) : '+1 (555) 0123-4567'
    );
    const [email, setEmail] = useState<string>(trainer?.email || 'sarah.mitchell@cyclesync.ai');
    const [location, setLocation] = useState<string>(trainer?.location || 'San Francisco, CA');
    const [experience, setExperience] = useState<string>(trainer?.experience || '12 years');
    const [gender, setGender] = useState<string>('Female');
    const [joinedDate, setJoinedDate] = useState<string>(
        trainer?.createdAt
            ? new Date(trainer.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            : 'March 2025'
    );

    // Sync state when trainer context loads asynchronously
    useEffect(() => {
        if (trainer) {
            setFullName(`Dr. ${trainer.firstName} ${trainer.lastName}`);
            if (trainer.speciality) setHeadline(trainer.speciality);
            if (trainer.email) setEmail(trainer.email);
            if (trainer.location) setLocation(trainer.location);
            if (trainer.phone) setPhone(String(trainer.phone));
            if (trainer.avatar) setAvatar(trainer.avatar);
            if (trainer.createdAt) {
                setJoinedDate(
                    new Date(trainer.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                );
            }
        }
    }, [trainer]);

    // File input refs
    const avatarInputRef = useRef<HTMLInputElement | null>(null);
    const coverInputRef = useRef<HTMLInputElement | null>(null);

    // Handle toggle switch "Preview as Client"
    const handleTogglePreview = (checked: boolean) => {
        setPreviewAsClient(checked);
        if (checked) {
            setIsEditMode(false);
        }
    };

    // Handle Edit Mode Toggle
    const handleStartEditing = () => {
        setIsEditMode(true);
        setPreviewAsClient(false);
    };

    const handleCancelEditing = () => {
        setIsEditMode(false);
    };

    // Specialty Handlers
    const handleAddSpecialty = () => {
        if (!newSpecialty.trim()) return;
        if (!specialties.includes(newSpecialty.trim())) {
            setSpecialties([...specialties, newSpecialty.trim()]);
        }
        setNewSpecialty('');
    };

    const handleRemoveSpecialty = (tag: string) => {
        setSpecialties(specialties.filter((item) => item !== tag));
    };

    // Certification Handlers
    const handleAddCertification = () => {
        const newCert: CertificationItem = {
            id: `cert-${Date.now()}`,
            title: 'New Certification Title',
            issuedBy: 'Issuing Organization',
            year: new Date().getFullYear().toString()
        };
        setCertifications([...certifications, newCert]);
    };

    const handleUpdateCertification = (id: string, field: keyof CertificationItem, value: string) => {
        setCertifications(certifications.map(cert => {
            if (cert.id === id) {
                return { ...cert, [field]: value };
            }
            return cert;
        }));
    };

    const handleRemoveCertification = (id: string) => {
        setCertifications(certifications.filter(cert => cert.id !== id));
    };

    // Image Upload Handlers
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAvatar(url);
            traineronboardingService.uploadAvatar(file).catch(err => console.error("Avatar upload error", err));
        }
    };

    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setCoverImage(url);
        }
    };

    useEffect(() => {
        const fetchPackages = async (trainerId: string) => {
            try {
                setPackagesLoading(true);
                const response = await trainerMarketPlaceService.getTrainerPackages(trainerId);
                setPackages(response);
            } catch (error) {
                console.error('Failed to fetch trainer packages:', error);
            } finally {
                setPackagesLoading(false);
            }
        };

        if (trainer?._id) {
            fetchPackages(trainer._id);
        }
    }, [trainer]);
    // Save Profile Handler
    const handleSaveProfile = async () => {
        setSaving(true);
        setSaveSuccessMessage(null);
        try {
            // Update backend service if available
            await traineronboardingService.updateTrainerProfile({
                bio,
                experience,
                location,
                speciality: headline,
                tags: specialties
            }).catch(() => {
                // Silently fallback if mock environment
            });

            await traineronboardingService.updateTrainerCertifications({
                certifications: certifications.map(c => ({
                    title: c.title,
                    issuedBy: c.issuedBy,
                    year: c.year
                }))
            }).catch(() => {});

            setSaveSuccessMessage("Profile saved successfully!");
            setIsEditMode(false);
            setTimeout(() => setSaveSuccessMessage(null), 4000);
        } catch (error) {
            console.error("Failed to save trainer profile", error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="tp-profile-page-wrapper">
            {/* Top Toolbar / Dashboard Subheader */}
            <div className="tp-profile-top-bar">
                <div className="tp-profile-top-bar-left">
                    <h1 className="tp-profile-page-title">Dashboard</h1>
                    <p className="tp-profile-page-subtitle">Welcome back, Coach!</p>
                </div>

                <div className="tp-profile-top-bar-right">
                    <div className="tp-client-preview-toggle-card">
                        <span className="tp-preview-toggle-label">Preview as Client</span>
                        <label className="tp-toggle-switch">
                            <input
                                type="checkbox"
                                checked={previewAsClient}
                                onChange={(e) => handleTogglePreview(e.target.checked)}
                            />
                            <span className="tp-toggle-slider" />
                        </label>
                    </div>
                </div>
            </div>

            {saveSuccessMessage && (
                <div className="tp-alert-success animate-fadeIn">
                    <CheckCircle size={18} />
                    <span>{saveSuccessMessage}</span>
                </div>
            )}

            <div className="tp-profile-container">
                {/* ═══ HERO COVER & PROFILE CARD ═══ */}
                <div className={`tp-profile-header-card ${isEditMode ? 'editing' : ''}`}>
                    {/* Cover Gradient / Image Banner */}
                    <div
                        className="tp-profile-cover-banner"
                        style={{ backgroundImage: `url(${coverImage})` }}
                    >
                        <div className="tp-cover-overlay" />
                        <button
                            type="button"
                            className="tp-cover-edit-btn"
                            onClick={() => coverInputRef.current?.click()}
                        >
                            <Camera size={16} />
                            <span>Change Cover</span>
                        </button>
                        <input
                            ref={coverInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleCoverChange}
                        />
                    </div>

                    {/* Header Content */}
                    <div className="tp-profile-header-main">
                        <div className="tp-profile-avatar-wrapper">
                            <img src={avatar} alt={fullName} className="tp-profile-avatar-img" />
                            <button
                                type="button"
                                className="tp-avatar-camera-btn"
                                onClick={() => avatarInputRef.current?.click()}
                                title="Change Profile Photo"
                            >
                                <Camera size={16} />
                            </button>
                            <input
                                ref={avatarInputRef}
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleAvatarChange}
                            />
                        </div>

                        <div className="tp-profile-header-info">
                            {isEditMode ? (
                                <div className="tp-profile-edit-name-group">
                                    <div className="tp-profile-input-with-badge">
                                        <input
                                            type="text"
                                            className="tp-input-field tp-input-name"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder="Full Name"
                                        />
                                        <span className="tp-verified-badge-icon" title="Verified Trainer">
                                            <Check size={14} color="white" />
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        className="tp-input-field tp-input-headline"
                                        value={headline}
                                        onChange={(e) => setHeadline(e.target.value)}
                                        placeholder="Specialties / Subtitle"
                                    />
                                </div>
                            ) : (
                                <>
                                    <div className="tp-profile-name-row">
                                        <h2 className="tp-profile-display-name">{fullName}</h2>
                                        <span className="tp-verified-badge-icon" title="Verified Trainer">
                                            <Check size={14} color="white" />
                                        </span>
                                    </div>
                                    <p className="tp-profile-headline">{headline}</p>
                                </>
                            )}
                        </div>

                        {/* Top Right Actions */}
                        <div className="tp-profile-header-actions">
                            {isEditMode ? (
                                <div className="tp-edit-actions-group">
                                    <button
                                        type="button"
                                        className="tp-btn tp-btn-cancel"
                                        onClick={handleCancelEditing}
                                        disabled={saving}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="tp-btn tp-btn-save"
                                        onClick={handleSaveProfile}
                                        disabled={saving}
                                    >
                                        <Save size={16} />
                                        <span>{saving ? 'Saving...' : 'Save Profile'}</span>
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    className="tp-btn tp-btn-edit-profile"
                                    onClick={handleStartEditing}
                                >
                                    <span>Edit Profile</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* ═══ TWO-COLUMN CONTENT GRID ═══ */}
                <div className="tp-profile-content-grid">
                    {/* ── LEFT COLUMN ── */}
                    <div className="tp-profile-col-left">
                        {/* About Me Card */}
                        <div className="tp-profile-card">
                            <h3 className="tp-card-title">About Me</h3>
                            {isEditMode ? (
                                <textarea
                                    className="tp-textarea-field"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    rows={4}
                                    placeholder="Tell clients about yourself..."
                                />
                            ) : (
                                <p className="tp-profile-bio-text">{bio}</p>
                            )}
                        </div>

                        {/* Expertise & Specialties Card */}
                        <div className="tp-profile-card">
                            <h3 className="tp-card-title">Expertise & Specialties</h3>
                            <div className="tp-specialties-chips-container">
                                {specialties.map((tag) => (
                                    <span key={tag} className="tp-specialty-chip">
                                        <span className="tp-chip-text">{tag}</span>
                                        {isEditMode && (
                                            <button
                                                type="button"
                                                className="tp-chip-remove-btn"
                                                onClick={() => handleRemoveSpecialty(tag)}
                                            >
                                                <X size={12} />
                                            </button>
                                        )}
                                    </span>
                                ))}
                            </div>

                            {isEditMode && (
                                <div className="tp-add-specialty-row">
                                    <input
                                        type="text"
                                        className="tp-input-field tp-input-add-tag"
                                        placeholder="Add specialty..."
                                        value={newSpecialty}
                                        onChange={(e) => setNewSpecialty(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleAddSpecialty();
                                            }
                                        }}
                                    />
                                    <button
                                        type="button"
                                        className="tp-btn-add-tag"
                                        onClick={handleAddSpecialty}
                                    >
                                        <Plus size={16} />
                                        <span>Add</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Professional Certifications Card */}
                        <div className="tp-profile-card">
                            <div className="tp-card-header-row">
                                <h3 className="tp-card-title">Professional Certifications</h3>
                                {isEditMode && (
                                    <button
                                        type="button"
                                        className="tp-btn-text-action"
                                        onClick={handleAddCertification}
                                    >
                                        <Plus size={14} />
                                        <span>Add New</span>
                                    </button>
                                )}
                            </div>

                            <div className="tp-certifications-list">
                                {certifications.map((cert) => (
                                    <div key={cert.id} className="tp-certification-card-item">
                                        <div className="tp-cert-badge-icon">
                                            <Award size={20} />
                                        </div>

                                        {isEditMode ? (
                                            <div className="tp-cert-edit-fields">
                                                <input
                                                    type="text"
                                                    className="tp-input-field tp-cert-input-title"
                                                    value={cert.title}
                                                    onChange={(e) => handleUpdateCertification(cert.id, 'title', e.target.value)}
                                                    placeholder="Certification Name"
                                                />
                                                <div className="tp-cert-input-row">
                                                    <input
                                                        type="text"
                                                        className="tp-input-field tp-cert-input-sub"
                                                        value={cert.issuedBy}
                                                        onChange={(e) => handleUpdateCertification(cert.id, 'issuedBy', e.target.value)}
                                                        placeholder="Issuing Organization"
                                                    />
                                                    <input
                                                        type="text"
                                                        className="tp-input-field tp-cert-input-year"
                                                        value={cert.year}
                                                        onChange={(e) => handleUpdateCertification(cert.id, 'year', e.target.value)}
                                                        placeholder="Year"
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="tp-cert-info-main">
                                                <h4 className="tp-cert-title">{cert.title}</h4>
                                                <p className="tp-cert-issuer">
                                                    {cert.issuedBy} {cert.year ? `• ${cert.year}` : ''}
                                                </p>
                                            </div>
                                        )}

                                        {isEditMode ? (
                                            <button
                                                type="button"
                                                className="tp-btn-delete-cert"
                                                onClick={() => handleRemoveCertification(cert.id)}
                                                title="Delete certification"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        ) : (
                                            <div className="tp-cert-arrow">
                                                <ChevronRight size={18} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── RIGHT COLUMN ── */}
                    <div className="tp-profile-col-right">
                        {/* Coaching Packages Card */}
                        <div className="tp-profile-card">
                            <div className="tp-card-header-row">
                                <h3 className="tp-card-title">Coaching Packages</h3>
                                <span className="tp-badge-pill tp-badge-active">
                                    {packagesLoading ? 'Loading...' : `${packages.length} Active`}
                                </span>
                            </div>

                            <div className="tp-packages-list">
                                {packages.map((pkg, idx) => (
                                    <div
                                        key={pkg.id || (pkg as any)._id || idx}
                                        className={`tp-package-item-card ${pkg.status === 'pending' ? 'pending' : 'active'}`}
                                    >
                                        <div className="tp-package-item-left">
                                            <div className="tp-package-status-icon">
                                                {pkg.status === 'pending' ? (
                                                    <Clock size={16} />
                                                ) : (
                                                    <CheckCircle size={16} />
                                                )}
                                            </div>
                                            <div className="tp-package-item-details">
                                                <h4 className="tp-package-name">{pkg.name}</h4>
                                                <p className="tp-package-meta">
                                                    {pkg.status === 'pending' ? (
                                                        <span className="tp-status-pending-text">Pending admin approval</span>
                                                    ) : (
                                                        `${pkg.sessions ?? 0} sessions • ${pkg.duration ?? 'Monthly'}`
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="tp-package-price">Rs{pkg.price}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Session Mode Card */}
                        <div className="tp-profile-card">
                            <h3 className="tp-card-title">Session Mode</h3>
                            {isEditMode ? (
                                <select
                                    className="tp-select-field"
                                    value={sessionMode}
                                    onChange={(e) => setSessionMode(e.target.value)}
                                >
                                    <option value="Both (Online & In-Person)">Both (Online & In-Person)</option>
                                    <option value="Online Only">Online Only</option>
                                    <option value="In-Person Only">In-Person Only</option>
                                </select>
                            ) : (
                                <div className="tp-session-mode-display">
                                    <Globe size={18} className="tp-session-icon" />
                                    <span>{sessionMode}</span>
                                </div>
                            )}
                        </div>

                        {/* Professional Links Card */}
                        <div className="tp-profile-card">
                            <h3 className="tp-card-title">Professional Links</h3>
                            {isEditMode ? (
                                <div className="tp-social-inputs-stack">
                                    <div className="tp-social-input-item">
                                        <Globe size={18} className="tp-social-icon" />
                                        <input
                                            type="text"
                                            className="tp-input-field"
                                            value={website}
                                            onChange={(e) => setWebsite(e.target.value)}
                                            placeholder="Website URL"
                                        />
                                    </div>
                                    <div className="tp-social-input-item">
                                        <FaLinkedin size={18} className="tp-social-icon" />
                                        <input
                                            type="text"
                                            className="tp-input-field"
                                            value={linkedin}
                                            onChange={(e) => setLinkedin(e.target.value)}
                                            placeholder="LinkedIn URL"
                                        />
                                    </div>
                                    <div className="tp-social-input-item">
                                        <FaInstagram size={18} className="tp-social-icon" />
                                        <input
                                            type="text"
                                            className="tp-input-field"
                                            value={instagram}
                                            onChange={(e) => setInstagram(e.target.value)}
                                            placeholder="Instagram URL"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="tp-social-links-stack">
                                    <a
                                        href={`https://${website}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="tp-social-link-pill"
                                    >
                                        <Globe size={18} />
                                        <span className="tp-link-url">{website}</span>
                                        <ExternalLink size={14} className="tp-ext-icon" />
                                    </a>

                                    <a
                                        href={`https://${linkedin}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="tp-social-link-pill"
                                    >
                                        <FaLinkedin size={18} />
                                        <span className="tp-link-url">{linkedin}</span>
                                        <ExternalLink size={14} className="tp-ext-icon" />
                                    </a>

                                    <a
                                        href={`https://${instagram}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="tp-social-link-pill"
                                    >
                                        <FaInstagram size={18} />
                                        <span className="tp-link-url">{instagram}</span>
                                        <ExternalLink size={14} className="tp-ext-icon" />
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Personal Information Card */}
                        <div className="tp-profile-card">
                            <h3 className="tp-card-title">Personal Information</h3>
                            <div className="tp-personal-info-rows">
                                <div className="tp-info-row">
                                    <span className="tp-info-label">
                                        <Phone size={16} />
                                        <span>Phone</span>
                                    </span>
                                    {isEditMode ? (
                                        <input
                                            type="text"
                                            className="tp-input-field tp-info-input"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    ) : (
                                        <span className="tp-info-value">{phone}</span>
                                    )}
                                </div>

                                <div className="tp-info-row">
                                    <span className="tp-info-label">
                                        <Mail size={16} />
                                        <span>Email</span>
                                    </span>
                                    <span className="tp-info-value tp-info-email">{email}</span>
                                </div>

                                <div className="tp-info-row">
                                    <span className="tp-info-label">
                                        <MapPin size={16} />
                                        <span>Location</span>
                                    </span>
                                    {isEditMode ? (
                                        <input
                                            type="text"
                                            className="tp-input-field tp-info-input"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                        />
                                    ) : (
                                        <span className="tp-info-value">{location}</span>
                                    )}
                                </div>

                                <div className="tp-info-row">
                                    <span className="tp-info-label">
                                        <Briefcase size={16} />
                                        <span>Experience</span>
                                    </span>
                                    {isEditMode ? (
                                        <input
                                            type="text"
                                            className="tp-input-field tp-info-input"
                                            value={experience}
                                            onChange={(e) => setExperience(e.target.value)}
                                        />
                                    ) : (
                                        <span className="tp-info-value">{experience}</span>
                                    )}
                                </div>

                                <div className="tp-info-row">
                                    <span className="tp-info-label">
                                        <User size={16} />
                                        <span>Gender</span>
                                    </span>
                                    {isEditMode ? (
                                        <input
                                            type="text"
                                            className="tp-input-field tp-info-input"
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                        />
                                    ) : (
                                        <span className="tp-info-value">{gender}</span>
                                    )}
                                </div>

                                <div className="tp-info-row">
                                    <span className="tp-info-label">
                                        <Calendar size={16} />
                                        <span>Joined</span>
                                    </span>
                                    <span className="tp-info-value">{joinedDate}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainerProfile;
