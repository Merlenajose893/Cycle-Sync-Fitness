import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrainerOnboarding } from '../../hooks/onboarding/useTrainerOnboarding';
import { useTrainerContext } from '../../context/TrainerAuthContext';
import { showToast } from '../../components/common/Toast/Toast';
import {
    ArrowRight,
    ArrowLeft,
    User,
    Award,
    FileText,
    CheckCircle,
    Upload,
    Camera,
} from 'lucide-react';
import '../../styles/Auth.css';
import '../../styles/TrainerPanel.css';

const stepLabels = ['Profile', 'Expertise', 'Documents', 'Review'];

const TrainerOnboarding: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        gender: '',
        dob: '',
        bio: '',
        profilePhoto: '',
        specialty: [] as string[],
        experience: '',
        certifications: '',
        qualifications: '',
        languages: [] as string[],
        location: '',
        idDocument: '',
        certFiles: '',
        agreeTerms: false,
    });
    const [idDocumentFile, setIdDocumentFile] = useState<File | null>(null);
    const [certificationFiles, setCertificationFiles] = useState<File[]>([]);

    const totalSteps = 4;
    const { updateProfile, updateCertifications, completeOnboarding, uploadAvatar, uploadDocuments, loading, error } = useTrainerOnboarding();
    const { login, trainer } = useTrainerContext();

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            try {
                const response = await uploadAvatar(file);
                const avatarUrl = response?.data?.avatar || response?.avatar || URL.createObjectURL(file);
                setFormData(prev => ({ ...prev, profilePhoto: avatarUrl }));
                showToast.success("Photo uploaded successfully");
            } catch (err) {
                showToast.error("Failed to upload photo");
            }
        }
    };

import { trainerDobSchema, trainerCertificationSchema, documentUploadSchema, getDobMaxDate, parseApiErrorMessage } from '../../utils/validationUtils';

    const [dobError, setDobError] = useState<string | null>(null);

    const handleNext = async () => {
        if (step === 1) {
            if (!formData.fullName || !formData.phone || !formData.gender) {
                showToast.error("Please fill all required personal details");
                return;
            }
            if (formData.dob) {
                const dobValidation = trainerDobSchema.safeParse(formData.dob);
                if (!dobValidation.success) {
                    const msg = dobValidation.error.issues[0]?.message || "Invalid Date of Birth";
                    setDobError(msg);
                    showToast.error(msg);
                    return;
                }
            }
            setDobError(null);
        }

        if (step === 2) {
            const certValidation = trainerCertificationSchema.safeParse({
                certifications: formData.certifications,
                experience: formData.experience,
                specialty: formData.specialty,
            });
            if (!certValidation.success) {
                const msg = certValidation.error.issues[0]?.message || "Please check certification details";
                showToast.error(msg);
                return;
            }
        }

        if (step === 3) {
            const docValidation = documentUploadSchema.safeParse({ idDocument: idDocumentFile });
            if (!docValidation.success) {
                showToast.error(docValidation.error.issues[0]?.message || "Please upload a valid ID document");
                return;
            }
            if (!formData.agreeTerms) {
                showToast.error("You must agree to the Terms of Service to proceed");
                return;
            }
        }

        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            try {
                await updateProfile({
                    bio: formData.bio,
                    experience: formData.experience,
                    location: formData.location,
                    avatar: formData.profilePhoto,
                    speciality: formData.specialty.join(', '),
                    languages: formData.languages,
                });

                const certsList = formData.certifications.split(',').map(c => c.trim()).filter(c => c);
                if (certsList.length > 0) {
                    await updateCertifications({
                        certifications: certsList.map(c => ({
                            title: c,
                            issuedBy: "Unknown",
                            year: new Date().getFullYear().toString()
                        }))
                    });
                }

                if (idDocumentFile) {
                    const allDocs = [idDocumentFile, ...certificationFiles];
                    await uploadDocuments(allDocs);
                }

                await completeOnboarding();
                
                // Update global state so the ProtectedRoute knows we are no longer in ONBOARDING status
                if (trainer) {
                    login({ ...trainer, status: 'PENDING_APPROVAL' });
                }

                showToast.success("Application submitted successfully!");
                navigate('/trainer/pending');
            } catch (err: any) {
                console.error("Failed to submit onboarding data", err);
                showToast.error(error || err.message || "Failed to submit application");
            }
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const toggleArrayField = (field: 'specialty' | 'languages', value: string) => {
        setFormData((prev) => {
            const arr = prev[field];
            return {
                ...prev,
                [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
            };
        });
    };

    const specialties = ['Nutrition & Hormones', 'Fitness & Strength', 'Cycle Health', 'Mental Wellness', 'Yoga & Recovery', 'Weight Management'];
    const languages = ['English', 'Hindi', 'Spanish', 'French', 'German', 'Mandarin', 'Arabic'];

    return (
        <div className="auth-wrapper" style={{ justifyContent: 'center', background: 'var(--bg-primary)' }}>
            <div style={{ width: '100%', maxWidth: '680px', padding: '20px' }}>

                {/* Brand */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', marginBottom: '32px' }}>
                    <div style={{
                        width: '40px', height: '40px', background: 'linear-gradient(135deg, #0d9488, #14b8a6)',
                        borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 800, color: 'white', fontSize: '1.1rem'
                    }}>T</div>
                    <h1 style={{ fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>
                        Trainer Onboarding <span style={{ color: '#0d9488' }}>• CycleSync AI</span>
                    </h1>
                </div>

                {/* Progress */}
                <div style={{ marginBottom: '32px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        {stepLabels.map((label, i) => (
                            <span key={label} style={{
                                fontWeight: 600, fontSize: '0.8rem',
                                color: step >= i + 1 ? '#0d9488' : 'var(--text-muted)',
                                transition: 'color 0.3s'
                            }}>{label}</span>
                        ))}
                    </div>
                    <div style={{ height: '6px', background: 'var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
                        <div style={{
                            height: '100%', width: `${(step / totalSteps) * 100}%`,
                            background: 'linear-gradient(90deg, #0d9488, #14b8a6)',
                            transition: 'width 0.4s ease', borderRadius: '10px'
                        }} />
                    </div>
                    <p style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                        Step {step} of {totalSteps}
                    </p>
                </div>

                {/* Card */}
                <div className="auth-card animate-slideUp" style={{
                    padding: '40px', background: 'white',
                    border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-lg)'
                }}>

                    {/* Step 1: Profile */}
                    {step === 1 && (
                        <div className="animate-fadeIn">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                <User size={24} color="#0d9488" />
                                <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Personal Details</h2>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '28px' }}>Tell us about yourself so clients can get to know you.</p>

                            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                                <div style={{
                                    width: '80px', height: '80px', borderRadius: 'var(--radius-full)',
                                    background: '#f0fdfa', border: '2px dashed #99f6e4', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', cursor: 'pointer',
                                    position: 'relative', overflow: 'hidden'
                                }}>
                                    {formData.profilePhoto ? (
                                        <img src={formData.profilePhoto} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <Camera size={28} color="#0d9488" />
                                    )}
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleAvatarUpload} 
                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} 
                                    />
                                </div>
                                <span style={{ fontSize: '0.82rem', color: '#0d9488', fontWeight: 600, cursor: 'pointer' }}>
                                    {formData.profilePhoto ? 'Change Photo' : 'Upload Photo'}
                                </span>
                            </div>

                            <div className="tp-form-group">
                                <label>Full Name</label>
                                <input type="text" placeholder="Dr. Sarah Mitchell"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>
                            <div className="tp-form-row">
                                <div className="tp-form-group">
                                    <label>Phone Number</label>
                                    <input type="tel" placeholder="+91 98765 43210"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                                <div className="tp-form-group">
                                    <label>Date of Birth</label>
                                    <input
                                        type="date"
                                        max={getDobMaxDate(18)}
                                        value={formData.dob}
                                        onChange={(e) => {
                                            setFormData({ ...formData, dob: e.target.value });
                                            const res = trainerDobSchema.safeParse(e.target.value);
                                            setDobError(res.success ? null : res.error.issues[0]?.message || null);
                                        }}
                                    />
                                    {dobError && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{dobError}</span>}
                                </div>
                            </div>
                            <div className="tp-form-group">
                                <label>Gender</label>
                                <select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                                    <option value="">Select...</option>
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                    <option value="non-binary">Non-binary</option>
                                    <option value="other">Prefer not to say</option>
                                </select>
                            </div>
                            <div className="tp-form-group">
                                <label>Short Bio</label>
                                <textarea placeholder="Write 2-3 sentences about your background and approach..."
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    rows={4}
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Expertise */}
                    {step === 2 && (
                        <div className="animate-fadeIn">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                <Award size={24} color="#0d9488" />
                                <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Expertise & Skills</h2>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '28px' }}>Select your areas of expertise and qualifications.</p>

                            <div className="tp-form-group">
                                <label>Specialties (select all that apply)</label>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '8px' }}>
                                    {specialties.map((s) => (
                                        <div key={s} onClick={() => toggleArrayField('specialty', s)} style={{
                                            padding: '14px 16px', borderRadius: 'var(--radius-md)',
                                            border: formData.specialty.includes(s) ? '2px solid #0d9488' : '1px solid var(--border)',
                                            background: formData.specialty.includes(s) ? '#f0fdfa' : 'white',
                                            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.2s'
                                        }}>
                                            {formData.specialty.includes(s) ? <CheckCircle size={18} color="#0d9488" /> : <div style={{ width: 18, height: 18, border: '1px solid var(--text-muted)', borderRadius: '50%' }} />}
                                            <span style={{ fontWeight: formData.specialty.includes(s) ? 600 : 400, fontSize: '0.9rem' }}>{s}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="tp-form-group">
                                <label>Years of Experience</label>
                                <select value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })}>
                                    <option value="">Select...</option>
                                    <option value="0-1">Less than 1 year</option>
                                    <option value="1-3">1-3 years</option>
                                    <option value="3-5">3-5 years</option>
                                    <option value="5-10">5-10 years</option>
                                    <option value="10+">10+ years</option>
                                </select>
                            </div>
                            <div className="tp-form-group">
                                <label>Certifications (comma-separated)</label>
                                <input type="text" placeholder="e.g. ACE Certified, NASM CPT, RDN"
                                    value={formData.certifications}
                                    onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                                />
                            </div>
                            <div className="tp-form-group">
                                <label>Qualifications / Degrees</label>
                                <input type="text" placeholder="e.g. M.Sc. Sports Science, MD Nutrition"
                                    value={formData.qualifications}
                                    onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                                />
                            </div>
                            <div className="tp-form-group">
                                <label>Languages Spoken</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                                    {languages.map((lang) => (
                                        <span key={lang} onClick={() => toggleArrayField('languages', lang)} style={{
                                            padding: '6px 14px', borderRadius: 'var(--radius-full)', fontSize: '0.82rem',
                                            fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                                            background: formData.languages.includes(lang) ? '#ccfbf1' : 'var(--bg-primary)',
                                            color: formData.languages.includes(lang) ? '#0d9488' : 'var(--text-secondary)',
                                            border: formData.languages.includes(lang) ? '1px solid #99f6e4' : '1px solid var(--border)',
                                        }}>{lang}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Documents */}
                    {step === 3 && (
                        <div className="animate-fadeIn">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                <FileText size={24} color="#0d9488" />
                                <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Verification Documents</h2>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '28px' }}>Upload documents for verification. Admin will review before approval.</p>

                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>Government ID (Aadhaar / Passport / License)</label>
                                <div style={{
                                    border: '2px dashed var(--border)', borderRadius: 'var(--radius-lg)',
                                    padding: '32px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s',
                                    background: 'var(--bg-primary)', position: 'relative'
                                }}>
                                    <input 
                                        type="file" 
                                        accept=".pdf,image/*"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                setIdDocumentFile(e.target.files[0]);
                                            }
                                        }}
                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                                    />
                                    <Upload size={32} color={idDocumentFile ? "#0d9488" : "var(--text-muted)"} style={{ margin: '0 auto 8px' }} />
                                    <p style={{ fontWeight: 600, color: idDocumentFile ? "#0d9488" : "var(--text-secondary)", margin: '0 0 4px' }}>
                                        {idDocumentFile ? idDocumentFile.name : 'Click or drag to upload'}
                                    </p>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>PDF, JPG, PNG • Max 5MB</p>
                                </div>
                            </div>

                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>Certification Documents</label>
                                <div style={{
                                    border: '2px dashed var(--border)', borderRadius: 'var(--radius-lg)',
                                    padding: '32px', textAlign: 'center', cursor: 'pointer',
                                    background: 'var(--bg-primary)', position: 'relative'
                                }}>
                                    <input 
                                        type="file" 
                                        multiple
                                        accept=".pdf,image/*"
                                        onChange={(e) => {
                                            if (e.target.files) {
                                                setCertificationFiles(Array.from(e.target.files));
                                            }
                                        }}
                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                                    />
                                    <Upload size={32} color={certificationFiles.length > 0 ? "#0d9488" : "var(--text-muted)"} style={{ margin: '0 auto 8px' }} />
                                    <p style={{ fontWeight: 600, color: certificationFiles.length > 0 ? "#0d9488" : "var(--text-secondary)", margin: '0 0 4px' }}>
                                        {certificationFiles.length > 0 ? `${certificationFiles.length} files selected` : 'Upload certification files'}
                                    </p>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>PDF, JPG, PNG • Max 5MB each</p>
                                </div>
                            </div>

                            <div style={{
                                display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '16px',
                                background: '#f0fdfa', borderRadius: 'var(--radius-md)', border: '1px solid #99f6e4'
                            }}>
                                <input type="checkbox" checked={formData.agreeTerms}
                                    onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                                    style={{ marginTop: '2px' }}
                                />
                                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                                    I confirm that all information provided is accurate. I agree to the{' '}
                                    <a href="#" style={{ color: '#0d9488', fontWeight: 600 }}>Terms of Service</a> and{' '}
                                    <a href="#" style={{ color: '#0d9488', fontWeight: 600 }}>Trainer Code of Conduct</a>.
                                </label>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Review */}
                    {step === 4 && (
                        <div className="animate-fadeIn">
                            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                                <div style={{
                                    width: '64px', height: '64px', borderRadius: 'var(--radius-full)',
                                    background: '#ccfbf1', display: 'flex', alignItems: 'center',
                                    justifyContent: 'center', margin: '0 auto 16px'
                                }}>
                                    <CheckCircle size={32} color="#0d9488" />
                                </div>
                                <h2 style={{ fontSize: '1.5rem', margin: '0 0 8px' }}>Review & Submit</h2>
                                <p style={{ color: 'var(--text-secondary)' }}>Please review your details before submitting.</p>
                            </div>

                            {/* Summary cards */}
                            {[
                                { icon: User, title: 'Profile', items: [formData.fullName || 'Not set', formData.phone || 'Not set', formData.gender || 'Not set'] },
                                { icon: Award, title: 'Expertise', items: [formData.specialty.join(', ') || 'Not set', `${formData.experience || 'Not set'} experience`, formData.certifications || 'No certifications'] },
                            ].map((section, i) => {
                                const Icon = section.icon;
                                return (
                                    <div key={i} style={{
                                        padding: '16px', background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)',
                                        marginBottom: '12px', border: '1px solid var(--border)'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                            <Icon size={18} color="#0d9488" />
                                            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, margin: 0 }}>{section.title}</h4>
                                        </div>
                                        {section.items.map((item, j) => (
                                            <p key={j} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '4px 0', paddingLeft: '28px' }}>{item}</p>
                                        ))}
                                    </div>
                                );
                            })}

                            <div style={{
                                padding: '16px', background: '#fffbeb', borderRadius: 'var(--radius-md)',
                                border: '1px solid #fef3c7', marginTop: '16px'
                            }}>
                                <p style={{ fontSize: '0.85rem', color: '#92400e', margin: 0, lineHeight: 1.5 }}>
                                    <strong>Note:</strong> Your profile will be reviewed by the admin team. You'll receive an email once approved, and can then start managing workouts, food plans, and slots.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
                        {step > 1 ? (
                            <button onClick={handleBack} className="btn btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <ArrowLeft size={18} /> Back
                            </button>
                        ) : <div />}
                        <button onClick={handleNext} disabled={loading} className="btn btn-primary" style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            paddingLeft: '32px', paddingRight: '32px',
                            background: 'linear-gradient(135deg, #0d9488, #14b8a6)',
                            opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer'
                        }}>
                            {step === totalSteps ? (loading ? 'Submitting...' : 'Submit Application') : 'Next'} {step !== totalSteps && <ArrowRight size={18} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainerOnboarding;
