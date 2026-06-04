import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowRight,
    ArrowLeft,
    User,
    Dumbbell,
    Award,
    Calendar,
    FileText,
    CheckCircle,
    Upload,
    Clock,
    MapPin,
    Globe,
    Camera,
} from 'lucide-react';
import '../../styles/Auth.css';
import '../../styles/TrainerPanel.css';

const stepLabels = ['Profile', 'Expertise', 'Availability', 'Documents', 'Review'];

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
        packageName: '',
        packageSessions: '',
        packagePrice: '',
        preferredDays: [] as string[],
        preferredTime: '',
        sessionMode: '',
        location: '',
        idDocument: '',
        certFiles: '',
        agreeTerms: false,
    });

    const totalSteps = 5;

    const handleNext = () => {
        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            navigate('/trainer-panel/login');
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const toggleArrayField = (field: 'specialty' | 'languages' | 'preferredDays', value: string) => {
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
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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
                                    alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', cursor: 'pointer'
                                }}>
                                    <Camera size={28} color="#0d9488" />
                                </div>
                                <span style={{ fontSize: '0.82rem', color: '#0d9488', fontWeight: 600, cursor: 'pointer' }}>Upload Photo</span>
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
                                    <input type="date" value={formData.dob}
                                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                    />
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
                                            {formData.specialty.includes(s) ? <CheckCircle size={18} color="#0d9488" /> : <Dumbbell size={18} color="var(--text-muted)" />}
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

                    {/* Step 3: Availability */}
                    {step === 3 && (
                        <div className="animate-fadeIn">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                <Calendar size={24} color="#0d9488" />
                                <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Availability & Preferences</h2>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '28px' }}>Set your preferred schedule and session mode.</p>

                            <div className="tp-form-row">
                                <div className="tp-form-group">
                                    <label>Starter Package Name</label>
                                    <input type="text" placeholder="e.g. 1-Month Jumpstart"
                                        value={formData.packageName}
                                        onChange={(e) => setFormData({ ...formData, packageName: e.target.value })}
                                    />
                                </div>
                                <div className="tp-form-group">
                                    <label>Package Sessions</label>
                                    <input type="number" placeholder="e.g. 12"
                                        value={formData.packageSessions}
                                        onChange={(e) => setFormData({ ...formData, packageSessions: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="tp-form-group">
                                <label>Package Price ($)</label>
                                <input type="number" placeholder="e.g. 299"
                                    value={formData.packagePrice}
                                    onChange={(e) => setFormData({ ...formData, packagePrice: e.target.value })}
                                />
                            </div>
                            <div className="tp-form-group">
                                <label>Preferred Working Days</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                                    {days.map((day) => (
                                        <span key={day} onClick={() => toggleArrayField('preferredDays', day)} style={{
                                            padding: '8px 16px', borderRadius: 'var(--radius-full)', fontSize: '0.82rem',
                                            fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                                            background: formData.preferredDays.includes(day) ? '#ccfbf1' : 'var(--bg-primary)',
                                            color: formData.preferredDays.includes(day) ? '#0d9488' : 'var(--text-secondary)',
                                            border: formData.preferredDays.includes(day) ? '1px solid #99f6e4' : '1px solid var(--border)',
                                        }}>{day.slice(0, 3)}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="tp-form-row">
                                <div className="tp-form-group">
                                    <label>Preferred Time Slot</label>
                                    <select value={formData.preferredTime} onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}>
                                        <option value="">Select...</option>
                                        <option value="morning">Morning (6 AM - 12 PM)</option>
                                        <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                                        <option value="evening">Evening (5 PM - 10 PM)</option>
                                        <option value="flexible">Flexible</option>
                                    </select>
                                </div>
                                <div className="tp-form-group">
                                    <label>Session Mode</label>
                                    <select value={formData.sessionMode} onChange={(e) => setFormData({ ...formData, sessionMode: e.target.value })}>
                                        <option value="">Select...</option>
                                        <option value="online">Online Only</option>
                                        <option value="offline">In-Person Only</option>
                                        <option value="both">Both</option>
                                    </select>
                                </div>
                            </div>
                            {(formData.sessionMode === 'offline' || formData.sessionMode === 'both') && (
                                <div className="tp-form-group">
                                    <label>Location / Gym Address</label>
                                    <input type="text" placeholder="e.g. FitLife Gym, Koramangala, Bangalore"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 4: Documents */}
                    {step === 4 && (
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
                                    background: 'var(--bg-primary)'
                                }}>
                                    <Upload size={32} color="var(--text-muted)" style={{ margin: '0 auto 8px' }} />
                                    <p style={{ fontWeight: 600, color: 'var(--text-secondary)', margin: '0 0 4px' }}>Click or drag to upload</p>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>PDF, JPG, PNG • Max 5MB</p>
                                </div>
                            </div>

                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>Certification Documents</label>
                                <div style={{
                                    border: '2px dashed var(--border)', borderRadius: 'var(--radius-lg)',
                                    padding: '32px', textAlign: 'center', cursor: 'pointer',
                                    background: 'var(--bg-primary)'
                                }}>
                                    <Upload size={32} color="var(--text-muted)" style={{ margin: '0 auto 8px' }} />
                                    <p style={{ fontWeight: 600, color: 'var(--text-secondary)', margin: '0 0 4px' }}>Upload certification files</p>
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

                    {/* Step 5: Review */}
                    {step === 5 && (
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
                                { icon: Calendar, title: 'Availability & Pricing', items: [`${formData.packageName || 'Starter Package'} ($${formData.packagePrice || '0'} for ${formData.packageSessions || '0'} sessions)`, formData.preferredDays.map(d => d.slice(0, 3)).join(', ') || 'Days not set', formData.sessionMode || 'Mode not set'] },
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
                        <button onClick={handleNext} className="btn btn-primary" style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            paddingLeft: '32px', paddingRight: '32px',
                            background: 'linear-gradient(135deg, #0d9488, #14b8a6)'
                        }}>
                            {step === totalSteps ? 'Submit Application' : 'Next'} {step !== totalSteps && <ArrowRight size={18} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainerOnboarding;
