import React, { useState, useEffect } from 'react';
import { Package, Plus, Trash2, CheckCircle, RefreshCw } from 'lucide-react';
import { useTrainerOnboarding } from '../../hooks/onboarding/useTrainerOnboarding';
import { showToast } from '../../components/common/Toast/Toast';
import type { UpdateTrainerPackageDTO } from '../../types/traineronboarding.types';
import '../../styles/TrainerPanel.css';

interface PackageItem {
    name: string;
    sessions: number;
    duration: "1_week" | "1_month" | "3_months" | "6_months";
    price: number;
    popular: boolean;
    mode: "online" | "offline" | "hybrid";
}

const TrainerPackages: React.FC = () => {
    const { updatePackages, getOnboardingStatus, loading } = useTrainerOnboarding();
    const [packagesList, setPackagesList] = useState<PackageItem[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState<PackageItem>({
        name: '',
        sessions: 6,
        duration: '1_month',
        price: 1000,
        popular: false,
        mode: 'online'
    });

    const loadTrainerPackages = async () => {
        const status = await getOnboardingStatus();
        if (status && status.trainer && (status.trainer as any).packages) {
            setPackagesList((status.trainer as any).packages || []);
        }
    };

    useEffect(() => {
        loadTrainerPackages();
    }, []);

    const handleSavePackages = async (updatedList: PackageItem[]) => {
        setSaving(true);
        try {
            const payload: UpdateTrainerPackageDTO = {
                packages: updatedList.map(p => ({
                    name: p.name,
                    sessions: Number(p.sessions),
                    duration: p.duration,
                    price: Number(p.price),
                    popular: Boolean(p.popular),
                    mode: p.mode
                }))
            };
            await updatePackages(payload);
            setPackagesList(updatedList);
            showToast.success("Packages updated successfully!");
            setShowModal(false);
        } catch (err: any) {
            showToast.error(err.response?.data?.message || "Failed to update packages");
        } finally {
            setSaving(false);
        }
    };

    const handleAddPackage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || form.name.length < 3) {
            showToast.error("Package name must be at least 3 characters");
            return;
        }
        if (form.price < 100) {
            showToast.error("Minimum package price is 100");
            return;
        }

        const newList = [...packagesList, form];
        handleSavePackages(newList);
    };

    const handleDeletePackage = (index: number) => {
        const newList = packagesList.filter((_, i) => i !== index);
        handleSavePackages(newList);
    };

    return (
        <div className="tp-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 4px' }}>Training Packages</h1>
                    <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Create and manage packages offered to clients</p>
                </div>
                <button 
                    className="btn btn-primary" 
                    onClick={() => {
                        setForm({ name: '', sessions: 6, duration: '1_month', price: 1000, popular: false, mode: 'online' });
                        setShowModal(true);
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#0d9488' }}
                >
                    <Plus size={18} /> Add Package
                </button>
            </div>

            {loading && packagesList.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    <RefreshCw size={24} className="spin-icon" />
                    <p>Loading packages...</p>
                </div>
            ) : packagesList.length === 0 ? (
                <div className="auth-card" style={{ textAlign: 'center', padding: '40px', background: 'white' }}>
                    <Package size={48} color="var(--text-muted)" style={{ margin: '0 auto 16px' }} />
                    <h3>No Training Packages Created</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Add your first package so clients can subscribe to your services.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                    {packagesList.map((pkg, idx) => (
                        <div key={idx} className="auth-card" style={{
                            background: 'white', padding: '24px', borderRadius: '12px',
                            border: pkg.popular ? '2px solid #0d9488' : '1px solid var(--border)',
                            position: 'relative'
                        }}>
                            {pkg.popular && (
                                <span style={{
                                    position: 'absolute', top: 12, right: 12,
                                    background: '#ccfbf1', color: '#0d9488',
                                    fontSize: '0.75rem', fontWeight: 700, padding: '4px 8px', borderRadius: '12px'
                                }}>POPULAR</span>
                            )}
                            <h3 style={{ margin: '0 0 8px', fontSize: '1.2rem' }}>{pkg.name}</h3>
                            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0d9488', marginBottom: '16px' }}>
                                ₹{pkg.price} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ {pkg.duration.replace('_', ' ')}</span>
                            </div>

                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                    <CheckCircle size={16} color="#0d9488" /> {pkg.sessions} Sessions Included
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                    <CheckCircle size={16} color="#0d9488" /> Mode: {pkg.mode.toUpperCase()}
                                </li>
                            </ul>

                            <button 
                                onClick={() => handleDeletePackage(idx)}
                                disabled={saving}
                                style={{
                                    width: '100%', padding: '8px', background: '#fef2f2',
                                    border: '1px solid #fecaca', color: '#ef4444',
                                    borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                                }}
                            >
                                <Trash2 size={16} /> Delete Package
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                    background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div style={{ background: 'white', padding: '32px', borderRadius: '12px', width: '100%', maxWidth: '480px' }}>
                        <h2 style={{ margin: '0 0 20px' }}>Create New Package</h2>
                        <form onSubmit={handleAddPackage}>
                            <div className="tp-form-group" style={{ marginBottom: '14px' }}>
                                <label>Package Name</label>
                                <input 
                                    type="text" 
                                    
                                    placeholder="e.g. 1-Month Fitness Boost"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                />
                            </div>

                            <div className="tp-form-row" style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
                                <div className="tp-form-group" style={{ flex: 1 }}>
                                    <label>Sessions Count</label>
                                    <input 
                                        type="number" 
                                        min={1} 
                                        max={100} 
                                        
                                        value={form.sessions}
                                        onChange={(e) => setForm({ ...form, sessions: Number(e.target.value) })}
                                    />
                                </div>
                                <div className="tp-form-group" style={{ flex: 1 }}>
                                    <label>Price (₹)</label>
                                    <input 
                                        type="number" 
                                        min={100} 
                                        
                                        value={form.price}
                                        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                                    />
                                </div>
                            </div>

                            <div className="tp-form-row" style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
                                <div className="tp-form-group" style={{ flex: 1 }}>
                                    <label>Duration</label>
                                    <select 
                                        value={form.duration}
                                        onChange={(e) => setForm({ ...form, duration: e.target.value as any })}
                                    >
                                        <option value="1_week">1 Week</option>
                                        <option value="1_month">1 Month</option>
                                        <option value="3_months">3 Months</option>
                                        <option value="6_months">6 Months</option>
                                    </select>
                                </div>
                                <div className="tp-form-group" style={{ flex: 1 }}>
                                    <label>Mode</label>
                                    <select 
                                        value={form.mode}
                                        onChange={(e) => setForm({ ...form, mode: e.target.value as any })}
                                    >
                                        <option value="online">Online</option>
                                        <option value="offline">Offline</option>
                                        <option value="hybrid">Hybrid</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                                <input 
                                    type="checkbox" 
                                    id="popular"
                                    checked={form.popular}
                                    onChange={(e) => setForm({ ...form, popular: e.target.checked })}
                                />
                                <label htmlFor="popular" style={{ fontSize: '0.9rem', cursor: 'pointer' }}>Mark as Popular Package</label>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                                <button type="button" className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" disabled={saving} className="btn btn-primary" style={{ background: '#0d9488' }}>
                                    {saving ? 'Saving...' : 'Save Package'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrainerPackages;
