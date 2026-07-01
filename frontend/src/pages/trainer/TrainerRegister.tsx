import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Dumbbell, CheckCircle2 } from 'lucide-react';
import '../../styles/Auth.css';
import { useTrainerAuth } from '../../hooks/auth/useTrainerAuth';

const TrainerRegister: React.FC = () => {
    const navigate = useNavigate();
<<<<<<< HEAD
    const { registerTrainer, loading } = useTrainerAuth();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        speciality: ""
    });

    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const validateField = (name: string, value: string): string => {
        switch (name) {
            case 'firstName':
                if (!value.trim()) return 'First name is required';
                if (value.trim().length < 2) return 'First name must be at least 2 characters';
                return '';
            case 'lastName':
                if (!value.trim()) return 'Last name is required';
                if (value.trim().length < 2) return 'Last name must be at least 2 characters';
                return '';
            case 'email':
                if (!value.trim()) return 'Email is required';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return 'Please enter a valid email address';
                return '';
            case 'password':
                if (!value) return 'Password is required';
                if (value.length < 8) return 'Password must be at least 8 characters long';
                if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
                if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
                return '';
            case 'confirmPassword':
                if (!value) return 'Please confirm your password';
                if (value !== formData.password) return 'Passwords do not match';
                return '';
            case 'speciality':
                if (!value) return 'Please select a primary specialty';
                return '';
            default:
                return '';
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        Object.keys(formData).forEach(key => {
            const error = validateField(key, (formData as any)[key]);
            if (error) newErrors[key] = error;
        });

        if (!agreedToTerms) {
            newErrors.terms = 'You must agree to the Trainer Terms and Privacy Policy';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));

        const error = validateField(name, (formData as any)[name]);
        if (error) {
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAgreedToTerms(e.target.checked);
        if (errors.terms) {
            setErrors(prev => ({ ...prev, terms: '' }));
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            const allTouched = Object.keys(formData).reduce((acc, key) => {
                acc[key] = true;
                return acc;
            }, {} as Record<string, boolean>);
            setTouched(allTouched);
            return;
        }

        try {
            setErrors({});
            const response = await registerTrainer({
                ...formData,
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                email: formData.email.trim(),
            });

            navigate("/trainer/verify-otp", {
                state: {
                    trainerId: response.data._id,
                    email: response.data.email,
                }
            });
        } catch (error: any) {
            console.error(error);
            setErrors({ submit: error.response?.data?.message || "Registration failed. Please try again." });
        }
    };

=======

    const handleRegister = async(e: React.FormEvent) => {
        e.preventDefault();
        console.log("hi");
        
        console.log(formData.password,formData.confirmPassword);
        if(formData.password!==formData.confirmPassword)
        {
            setError("Passwords do not match")
            return;
        }
        
        try {
            console.log("jo");
            
            const response=await registerTrainer(formData);
            console.log(response);
            
            navigate("/trainer/verify-otp",{
                state:{
                    trainerId:response.data._id,
                    email:response.data.email,
                }
            })
        } catch (error) {
            console.error(error);
            
        }
    };

    const [formData,setFormData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
        speciality:""
    })

    const [error,setError]=useState<string|null>(null);

    const {registerTrainer,loading}=useTrainerAuth();

    const handleChange=(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>{
        const {name,value}=e.target;
        setFormData((prev)=>({
            ...prev,
            [name]:value
        }))
    }

>>>>>>> 081b12d (changes)
    return (
        <div className="auth-wrapper">
            <div className="auth-container" style={{ justifyContent: 'center' }}>
                <div className="auth-brand" style={{ justifyContent: 'center', marginBottom: '40px' }}>
                    <div className="auth-logo" style={{ background: 'linear-gradient(135deg, #0d9488, #14b8a6)', width: '48px', height: '48px', fontSize: '1.4rem' }}>C</div>
                    <h1>CycleSync <span style={{ color: '#0d9488' }}>AI</span></h1>
                </div>

                <div className="auth-card animate-slideUp" style={{
                    background: 'var(--bg-card)',
                    padding: '40px',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-lg)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '6px 16px',
                            borderRadius: 'var(--radius-full)',
                            background: '#f0fdfa',
                            border: '1px solid #99f6e4',
                            color: '#0d9488',
                            fontSize: '0.85rem',
                            fontWeight: '600'
                        }}>
                            <Dumbbell size={16} /> Trainer Registration
                        </div>
                    </div>

                    <div className="auth-header" style={{ textAlign: 'center' }}>
                        <h2>Join Our Expert Network</h2>
                        <p>Create your profile to start coaching with expert cycle-sync precision.</p>
                    </div>

<<<<<<< HEAD
                    {/* General Error */}
                    {(errors.submit || Object.keys(errors).length > 0) && (
                        <div className="auth-error-message">
                            {errors.submit || "Please fix the errors below"}
                        </div>
                    )}

                    <form className="auth-form" onSubmit={handleRegister} noValidate>
=======
                    <form className="auth-form" onSubmit={handleRegister}>
>>>>>>> 081b12d (changes)
                        <div className="form-group">
                            <label>First Name</label>
                            <div className="input-wrapper">
                                <User size={18} className="input-icon" />
                                <input
<<<<<<< HEAD
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Dr. Sarah Mitchell"
                                    className={errors.firstName ? 'error' : ''}
                                />
                            </div>
                            {errors.firstName && <p className="error-text">{errors.firstName}</p>}
                        </div>

=======
                                    type="text" name='firstName' value={formData.firstName} onChange={handleChange}
                                    placeholder="Dr. Sarah Mitchell"
                                    
                                />
                            </div>
                        </div>
>>>>>>> 081b12d (changes)
                        <div className="form-group">
                            <label>Last Name</label>
                            <div className="input-wrapper">
                                <User size={18} className="input-icon" />
                                <input
<<<<<<< HEAD
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Mitchell"
                                    className={errors.lastName ? 'error' : ''}
                                />
                            </div>
                            {errors.lastName && <p className="error-text">{errors.lastName}</p>}
=======
                                    type="text"name='lastName' value={formData.lastName} onChange={handleChange}
                                    placeholder="Mitchler"
                                
                                />
                            </div>
>>>>>>> 081b12d (changes)
                        </div>

                        <div className="form-group">
                            <label>Email Address</label>
                            <div className="input-wrapper">
                                <Mail size={18} className="input-icon" />
                                <input
                                    type="email"
<<<<<<< HEAD
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="trainer@cyclesync.ai"
                                    className={errors.email ? 'error' : ''}
                                />
                            </div>
                            {errors.email && <p className="error-text">{errors.email}</p>}
=======
                                    placeholder="trainer@cyclesync.ai" name='email' value={formData.email} onChange={handleChange}
                                    
                                />
                            </div>
>>>>>>> 081b12d (changes)
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <div className="input-wrapper">
                                <Lock size={18} className="input-icon" />
                                <input
                                    type="password"
<<<<<<< HEAD
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="••••••••"
                                    className={errors.password ? 'error' : ''}
                                />
                            </div>
                            {errors.password && <p className="error-text">{errors.password}</p>}
                            <p className="input-hint">Must be at least 8 characters with uppercase and number</p>
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>
=======
                                    placeholder="••••••••"
                                    name='password' value={formData.password} onChange={handleChange}
                                />
                            </div>
                            <p className="input-hint">Must be at least 8 characters long</p>
                        </div>

                         <div className="form-group">
                            <label>ConfirmPassword</label>
>>>>>>> 081b12d (changes)
                            <div className="input-wrapper">
                                <Lock size={18} className="input-icon" />
                                <input
                                    type="password"
<<<<<<< HEAD
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="••••••••"
                                    className={errors.confirmPassword ? 'error' : ''}
                                />
                            </div>
                            {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
=======
                                    placeholder="••••••••"
                                    name='confirmPassword' value={formData.confirmPassword} onChange={handleChange}
                                />
                            </div>
                            <p className="input-hint">Must be at least 8 characters long</p>
>>>>>>> 081b12d (changes)
                        </div>

                        <div className="form-group">
                            <label>Primary Specialty</label>
                            <div className="input-wrapper">
                                <Dumbbell size={18} className="input-icon" />
<<<<<<< HEAD
                                <select
                                    className={`select-input ${errors.speciality ? 'error' : ''}`}
                                    style={{ width: '100%', paddingLeft: '40px' }}
                                    value={formData.speciality}
                                    name="speciality"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
=======
                                <select  className="select-input" style={{ width: '100%', paddingLeft: '40px' }} value={formData.speciality} name='speciality' onChange={handleChange}>
>>>>>>> 081b12d (changes)
                                    <option value="">Select Specialty...</option>
                                    <option value="nutrition">Nutrition & Hormones</option>
                                    <option value="fitness">Fitness & Strength</option>
                                    <option value="cycle-health">Cycle Health Expert</option>
                                    <option value="mental-wellness">Mental Wellness</option>
                                </select>
                            </div>
<<<<<<< HEAD
                            {errors.speciality && <p className="error-text">{errors.speciality}</p>}
                        </div>

                        <div className="terms-checkbox" style={{ marginBottom: '8px' }}>
                            <input
                                type="checkbox"
                                id="trainer-terms"
                                checked={agreedToTerms}
                                onChange={handleTermsChange}
                            />
=======
                        </div>

                        <div className="terms-checkbox" style={{ marginBottom: '24px' }}>
                            <input type="checkbox" id="trainer-terms"/>
>>>>>>> 081b12d (changes)
                            <label htmlFor="trainer-terms" style={{ fontSize: '0.85rem' }}>
                                I agree to the <Link to="/terms" style={{ color: '#0d9488' }}>Trainer Terms</Link> and <Link to="/privacy" style={{ color: '#0d9488' }}>Privacy Policy</Link>
                            </label>
                        </div>
<<<<<<< HEAD
                        {errors.terms && <p className="error-text" style={{ marginBottom: '16px' }}>{errors.terms}</p>}

                        <button
                            type="submit"
                            className="btn btn-full"
                            disabled={loading}
                            style={{
                                padding: '14px',
                                background: 'linear-gradient(135deg, #0d9488, #14b8a6)',
                                color: 'white',
                                borderRadius: 'var(--radius-md)',
                                fontWeight: '600',
                                fontSize: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                marginTop: '8px',
                                transition: 'opacity 0.2s',
                                boxShadow: '0 4px 12px rgba(13, 148, 136, 0.2)',
                                opacity: loading ? 0.7 : 1,
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {loading ? "Creating Account..." : "Create Trainer Account"}
                            {!loading && <ArrowRight size={18} />}
=======

                        <button type="submit" className="btn btn-full" style={{
                            padding: '14px',
                            background: 'linear-gradient(135deg, #0d9488, #14b8a6)',
                            color: 'white',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: '600',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            marginTop: '8px',
                            transition: 'opacity 0.2s',
                            boxShadow: '0 4px 12px rgba(13, 148, 136, 0.2)'
                        }}>
                            Create Trainer Account <ArrowRight size={18} />
>>>>>>> 081b12d (changes)
                        </button>
                    </form>

                    <p className="auth-footer" style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        Already have a trainer account? <Link to="/trainer-panel/login" style={{ color: '#0d9488', fontWeight: '600' }}>Log in</Link>
                    </p>
                </div>
            </div>

            <div className="auth-side animate-fadeIn" style={{
                background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #5eead4 100%)',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div className="auth-side-content" style={{ color: 'white' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '24px' }}>Professional Trainer Benefits:</h2>
                    <ul className="premium-perks" style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', fontSize: '1.1rem' }}>
                            <CheckCircle2 size={24} /> Client Cycle Monitoring
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', fontSize: '1.1rem' }}>
                            <CheckCircle2 size={24} /> Automated Workout Planning
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', fontSize: '1.1rem' }}>
                            <CheckCircle2 size={24} /> Phase-Based Nutrition Delivery
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', fontSize: '1.1rem' }}>
                            <CheckCircle2 size={24} /> 24/7 Trainer Portal Access
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

<<<<<<< HEAD
export default TrainerRegister;
=======
export default TrainerRegister;
>>>>>>> 081b12d (changes)
