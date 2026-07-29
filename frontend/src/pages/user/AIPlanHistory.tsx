import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAIPlan } from '../../hooks/aiplan/useAIPlan';
import type { AIPlan } from '../../types/aiplan.types';
import Modal from '../../components/common/Modal/Modal';
import toast from 'react-hot-toast';
import { Activity, Plus, Play, Archive, Edit, Trash2, Calendar, Target, ChevronRight } from 'lucide-react';
import '../../styles/AIPlan.css';

const AIPlanHistory: React.FC = () => {
    const navigate = useNavigate();
    const { getPlanHistory, updatePlanStatus, deletePlan, loading } = useAIPlan();
    const [plans, setPlans] = useState<AIPlan[]>([]);
    const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'DRAFT' | 'ARCHIVED'>('ALL');
    const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
    const [modalType, setModalType] = useState<'activate' | 'archive' | 'delete' | null>(null);

    const fetchHistory = async () => {
        try {
            const data = await getPlanHistory();
            setPlans(data || []);
        } catch (error) {
            console.error("Failed to load plan history", error);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const filteredPlans = plans.filter(p => filter === 'ALL' || p.status === filter);

    const handleConfirmAction = async () => {
        if (!selectedPlanId || !modalType) return;
        try {
            if (modalType === 'activate') {
                await updatePlanStatus(selectedPlanId, 'ACTIVE');
                toast.success("Plan activated!");
            } else if (modalType === 'archive') {
                await updatePlanStatus(selectedPlanId, 'ARCHIVED');
                toast.success("Plan archived!");
            } else if (modalType === 'delete') {
                await deletePlan(selectedPlanId);
                toast.success("Plan deleted!");
            }
            fetchHistory();
        } catch (error) {
            toast.error(`Failed to ${modalType} plan`);
        } finally {
            setModalType(null);
            setSelectedPlanId(null);
        }
    };

    const getBadgeStyle = (status: string) => {
        switch (status) {
            case 'ACTIVE': return { bg: '#DCFCE7', color: '#166534' };
            case 'DRAFT': return { bg: '#FEF3C7', color: '#92400E' };
            case 'ARCHIVED': return { bg: '#F1F5F9', color: '#475569' };
            default: return { bg: '#E2E8F0', color: '#334155' };
        }
    };

    return (
        <div className="aiplan-page animate-fadeIn" style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Activity color="#0d9488" size={28} /> AI Plan History
                    </h1>
                    <p style={{ color: '#64748b', margin: '4px 0 0 0' }}>Manage all your created, active, and archived fitness & nutrition plans.</p>
                </div>
                <button
                    onClick={() => navigate('/app/ai-plan')}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px',
                        borderRadius: '12px', background: '#0d9488', color: '#fff', border: 'none',
                        fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(13, 148, 136, 0.25)'
                    }}
                >
                    <Plus size={18} /> New Plan
                </button>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
                {(['ALL', 'ACTIVE', 'DRAFT', 'ARCHIVED'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        style={{
                            padding: '8px 16px', borderRadius: '20px', border: 'none',
                            fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer',
                            backgroundColor: filter === tab ? '#0d9488' : '#f1f5f9',
                            color: filter === tab ? '#ffffff' : '#64748b',
                            transition: 'all 0.2s'
                        }}
                    >
                        {tab.charAt(0) + tab.slice(1).toLowerCase()}
                    </button>
                ))}
            </div>

            {/* Plan List */}
            {filteredPlans.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px 24px', background: '#fff', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
                    <p style={{ color: '#64748b', fontSize: '1rem' }}>No plans found for this filter.</p>
                    <button onClick={() => navigate('/app/ai-plan')} style={{ marginTop: '12px', padding: '8px 16px', background: '#0d9488', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                        Create a Plan
                    </button>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {filteredPlans.map((p) => {
                        const badge = getBadgeStyle(p.status);
                        return (
                            <div
                                key={p._id}
                                style={{
                                    background: '#ffffff', borderRadius: '16px', padding: '20px 24px',
                                    border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                }}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span style={{
                                            padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem',
                                            fontWeight: 700, backgroundColor: badge.bg, color: badge.color
                                        }}>
                                            {p.status}
                                        </span>
                                        <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '1.1rem' }}>
                                            {p.inputs?.goal ? p.inputs.goal.replace('_', ' ') : 'Custom AI Plan'}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '16px', color: '#64748b', fontSize: '0.875rem' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Target size={14} /> Level: {p.inputs?.fitnessLevel || 'General'}
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Calendar size={14} /> {p.inputs?.daysPerWeek || 4} days/week
                                        </span>
                                        <span>• {p.summary?.dailyCalories || 2000} kcal/day</span>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {p.status === 'DRAFT' && (
                                        <button
                                            onClick={() => { setSelectedPlanId(p._id); setModalType('activate'); }}
                                            style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 12px', borderRadius: '8px', background: '#dcfce7', color: '#166534', border: 'none', fontWeight: 600, cursor: 'pointer' }}
                                        >
                                            <Play size={14} /> Activate
                                        </button>
                                    )}
                                    {p.status === 'ACTIVE' && (
                                        <button
                                            onClick={() => { setSelectedPlanId(p._id); setModalType('archive'); }}
                                            style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 12px', borderRadius: '8px', background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', fontWeight: 600, cursor: 'pointer' }}
                                        >
                                            <Archive size={14} /> Archive
                                        </button>
                                    )}
                                    {p.status !== 'ARCHIVED' && (
                                        <button
                                            onClick={() => navigate(`/app/ai-plan/edit/${p._id}`)}
                                            style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 12px', borderRadius: '8px', background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', fontWeight: 600, cursor: 'pointer' }}
                                        >
                                            <Edit size={14} /> Edit
                                        </button>
                                    )}
                                    <button
                                        onClick={() => { setSelectedPlanId(p._id); setModalType('delete'); }}
                                        style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 12px', borderRadius: '8px', background: '#fee2e2', color: '#dc2626', border: 'none', fontWeight: 600, cursor: 'pointer' }}
                                    >
                                        <Trash2 size={14} /> Delete
                                    </button>
                                    <button
                                        onClick={() => navigate('/app/ai-plan/view')}
                                        style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px' }}
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Modal dialogs for history actions */}
            <Modal
                isOpen={modalType !== null}
                onClose={() => setModalType(null)}
                title={`${modalType?.toUpperCase()} Plan`}
                confirmText={modalType === 'delete' ? 'Delete Plan' : modalType === 'activate' ? 'Activate Plan' : 'Archive Plan'}
                variant={modalType === 'delete' ? 'danger' : 'primary'}
                onConfirm={handleConfirmAction}
                isLoading={loading}
            >
                <p>
                    {modalType === 'activate' && "Activating this plan will set it as your active plan and archive any currently active plan."}
                    {modalType === 'archive' && "Are you sure you want to archive this active plan?"}
                    {modalType === 'delete' && "Are you sure you want to permanently delete this plan? This action cannot be undone."}
                </p>
            </Modal>
        </div>
    );
};

export default AIPlanHistory;
