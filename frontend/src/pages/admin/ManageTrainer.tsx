import React, { useEffect, useState,useCallback } from 'react';
import {
    Dumbbell,
    Search,
    Filter,
    Download,
    Mail,
    Ban,
    CheckCircle2,
    XCircle,
    MoreVertical,
    Calendar,
    Star,
    Plus,
    Eye,
    UserPlus,
    Award,
    Clock,
    Users,
    X,
    Package,
    CheckCircle
} from 'lucide-react';
import '../../styles/AdminPage.css';
import type { Trainer } from '../../types/auth.types';
import { useAdminAuth } from '../../hooks/auth/useAdmin';
import { showToast } from '../../components/common/Toast/Toast';
// import { usePackages, updatePackageStatus } from '../../data/mockPackages';

const ManageTrainersPage: React.FC = () => {
    const [trainers,setTrainers]=useState<Trainer[]>([]);
    const {getAllTrainers,loading,error,blockTrainer,unblockTrainer}=useAdminAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedTrainers, setSelectedTrainers] = useState<number[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [activeTab, setActiveTab] = useState<'trainers' | 'packages'>('trainers');
    // const packages = usePackages();

    const stats = {
        total: 24,
        active: 18,
        suspended: 2,
        pendingTrainers: 4,
        // pendingPackages: packages.filter(p => p.status === 'pending').length
    };

    const fetchTrainers = useCallback(async () => {
    try {
        const data = await getAllTrainers();
        setTrainers(data);
    } catch (err) {
        showToast.error("Failed to fetch trainers");
    }
}, [getAllTrainers]);

useEffect(() => {
    fetchTrainers();
}, [fetchTrainers]);

    const handleBlock=async (trainerId:string):Promise<void> => {
        try {
            await blockTrainer(trainerId);
            showToast.success("Trainer blocked successfully");
            fetchTrainers();
        } catch (error) {
            console.log(error);
            
        }
    }

    const handleUnBlock=async (trainerId:string):Promise<void> => {
        try {
            await unblockTrainer(trainerId);
            showToast.success("Trainer unblocked successfully");
            fetchTrainers();
        } catch (error) {
            console.log(error);
            
        }
    }

    const toggleSelection = (id: number) => {
        setSelectedTrainers((prev) =>
            prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
        );
    };

    const filteredTrainers = trainers.filter((t) => {
        const matchesSearch = t.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || t.email.toLowerCase().includes(searchQuery.toLowerCase());
        // const matchesFilter = filterStatus === 'all' || t.isEmailVerified === filterStatus;
        const matchesFilter =
        filterStatus === "all" ||
        (filterStatus === "verified" &&
            t.isEmailVerified) ||
        (filterStatus === "unverified" &&
            !t.isEmailVerified);
        return matchesSearch && matchesFilter;
    });

    // const filteredPackages = packages.filter(pkg => {
    //     const matchesStatus = filterStatus === 'all' || pkg.status === filterStatus;
    //     const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase());
    //     return matchesStatus && matchesSearch;
    // });

    // const handleApprovePkg = (id: number) => {
    //     if (window.confirm('Approve this package for user assignment?')) {
    //         updatePackageStatus(id, 'active');
    //     }
    // };

    // const handleRejectPkg = (id: number) => {
    //     if (window.confirm('Reject this package?')) {
    //         updatePackageStatus(id, 'rejected');
    //     }
    // };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <div>
                    <h1 className="admin-title">Manage Trainers & Packages</h1>
                    <p className="admin-subtitle">View, add, and manage registered trainers and their coaching packages.</p>
                </div>
                <div className="admin-header-actions">
                    <button className="btn btn-secondary">
                        <Download size={18} /> Export
                    </button>
                    {activeTab === 'trainers' && (
                        <button
                            className="btn btn-primary"
                            style={{ background: '#0d9488', display: 'flex', alignItems: 'center', gap: '8px' }}
                            onClick={() => setShowAddModal(true)}
                        >
                            <UserPlus size={18} /> Add Trainer
                        </button>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '20px', borderBottom: '1px solid var(--border)', marginBottom: '24px' }}>
                <button 
                    onClick={() => setActiveTab('trainers')}
                    style={{ 
                        padding: '12px 16px', border: 'none', background: 'transparent', cursor: 'pointer',
                        fontWeight: activeTab === 'trainers' ? 700 : 500, fontSize: '1rem',
                        color: activeTab === 'trainers' ? 'var(--primary)' : 'var(--text-secondary)',
                        borderBottom: activeTab === 'trainers' ? '2px solid var(--primary)' : '2px solid transparent',
                        marginBottom: '-1px'
                    }}
                >
                    <Dumbbell size={16} style={{ display: 'inline', marginRight: '6px' }} />
                    Trainers
                </button>
                <button 
                    onClick={() => setActiveTab('packages')}
                    style={{ 
                        padding: '12px 16px', border: 'none', background: 'transparent', cursor: 'pointer',
                        fontWeight: activeTab === 'packages' ? 700 : 500, fontSize: '1rem',
                        color: activeTab === 'packages' ? 'var(--primary)' : 'var(--text-secondary)',
                        borderBottom: activeTab === 'packages' ? '2px solid var(--primary)' : '2px solid transparent',
                        marginBottom: '-1px', display: 'flex', alignItems: 'center'
                    }}
                >
                    <Package size={16} style={{ marginRight: '6px' }} />
                    Trainer Packages
                    {stats.pendingPackages > 0 && (
                        <span style={{ marginLeft: '8px', background: '#fef3c7', color: '#b45309', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
                            {stats.pendingPackages} New
                        </span>
                    )}
                </button>
            </div>

            {/* Search & Filter */}
            <div className="users-controls">
                <div className="search-bar-admin">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        placeholder={`Search ${activeTab === 'packages' ? 'packages' : 'trainers'}...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input-admin"
                    />
                </div>
                <div className="filter-group">
                    <label>Status:</label>
                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="filter-select">
                        <option value="all">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="suspended">{activeTab === 'trainers' ? 'Suspended' : 'Rejected'}</option>
                    </select>
                </div>
                <button className="btn btn-secondary">
                    <Filter size={18} /> More Filters
                </button>
            </div>

            {/* Bulk Actions */}
            {selectedTrainers.length > 0 && (
                <div className="bulk-actions-bar">
                    <span>{selectedTrainers.length} trainer(s) selected</span>
                    <div className="bulk-actions-buttons">
                        <button className="btn btn-sm btn-secondary"><Mail size={16} /> Send Email</button>
                        <button className="btn btn-sm btn-secondary"><Ban size={16} /> Suspend</button>
                        <button className="btn btn-sm btn-danger"><XCircle size={16} /> Remove</button>
                    </div>
                </div>
            )}

            {activeTab === 'trainers' ? (
                <>
                {/* Trainers Table */}
                <div className="users-table-container">
                    <table className="users-table">
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    checked={selectedTrainers.length === filteredTrainers.length && filteredTrainers.length > 0}
                                    onChange={(e) => setSelectedTrainers(e.target.checked ? filteredTrainers.map((t) => t.id) : [])}
                                />
                            </th>
                            <th>Trainer</th>
                            <th>Specialty</th>
                            <th>Status</th>
                            <th>Rating</th>
                            <th>Clients</th>
                            <th>Sessions</th>
                            <th>Joined</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTrainers.map((trainer) => (
                            <tr key={trainer._id} className={selectedTrainers.includes(trainer.id) ? 'selected' : ''}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedTrainers.includes(trainer._id)}
                                        onChange={() => toggleSelection(trainer._id)}
                                    />
                                </td>
                                <td>
                                    <div className="user-cell">
                                        <img src={trainer.avatar} alt={trainer.firstName} className="user-avatar" />
                                        <div>
                                            <div className="user-name">{trainer.firstName}</div>
                                            <div className="user-email">{trainer.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="subscription-badge premium" style={{ background: '#f0fdfa', color: '#0d9488' }}>
                                        <Award size={14} /> {trainer.speciality}
                                    </span>
                                </td>
                                <td>
                                    <span className={`status-badge ${trainer.status === 'pending' ? 'suspended' : trainer.status}`}>
                                        {trainer.status === 'active' && <CheckCircle2 size={14} />}
                                        {trainer.status === 'suspended' && <Ban size={14} />}
                                        {trainer.status === 'pending' && <Clock size={14} />}
                                        {trainer.status + trainer.status}
                                    </span>
                                </td>
                                <td>
                                    {trainer.rating > 0 ? (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Star size={14} fill="#FBBF24" color="#FBBF24" />
                                            <span style={{ fontWeight: '700' }}>{trainer.rating}</span>
                                        </div>
                                    ) : (
                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>N/A</span>
                                    )}
                                </td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Users size={14} color="var(--text-muted)" />
                                        <span style={{ fontWeight: '600' }}>{trainer.totalClients}</span>
                                    </div>
                                </td>
                                <td style={{ fontWeight: '600' }}>{trainer.totalSessions}</td>
                                <td>
                                    <div className="date-cell">
                                        <Calendar size={14} />
                                        {new Date(trainer.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="btn-icon" title="View Profile"><Eye size={16} /></button>
                                        <button className="btn-icon" title="Send Email"><Mail size={16} /></button>
                                        {trainer.status === 'pending' && (
                                            <button className="btn-icon" title="Approve" style={{ borderColor: '#22c55e', color: '#22c55e' }}>
                                                <CheckCircle2 size={16} />
                                            </button>
                                        )}
                                        <button onClick={()=>handleBlock(trainer._id)}>block</button>
                                        <button onClick={()=>handleUnBlock(trainer._id)}> unblock</button>
                                        <button className="btn-icon" title="More Actions"><MoreVertical size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="pagination">
                <button className="btn btn-secondary btn-sm">Previous</button>
                <div className="pagination-info">
                    Showing {filteredTrainers.length} of {stats.total} trainers
                </div>
                <button className="btn btn-secondary btn-sm">Next</button>
            </div>

            {/* Add Trainer Modal */}
            {showAddModal && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', zIndex: 1000
                }} onClick={() => setShowAddModal(false)}>
                    <div style={{
                        background: 'white', borderRadius: 'var(--radius-xl)', width: '520px',
                        maxWidth: '90vw', maxHeight: '85vh', overflowY: 'auto',
                        boxShadow: 'var(--shadow-xl)', animation: 'scaleIn 0.2s ease'
                    }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 24px 0' }}>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>Add New Trainer</h2>
                            <button onClick={() => setShowAddModal(false)} style={{
                                width: '36px', height: '36px', borderRadius: 'var(--radius-full)',
                                background: 'var(--bg-primary)', border: 'none', display: 'flex',
                                alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)'
                            }}><X size={20} /></button>
                        </div>
                        <div style={{ padding: '24px' }}>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                                An invite email will be sent to the trainer with an onboarding link.
                            </p>
                            <div style={{ marginBottom: '18px' }}>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Full Name</label>
                                <input type="text" placeholder="e.g. Dr. Sarah Mitchell" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem' }} />
                            </div>
                            <div style={{ marginBottom: '18px' }}>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Email Address</label>
                                <input type="email" placeholder="trainer@example.com" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Specialty</label>
                                    <select style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', background: 'white' }}>
                                        <option value="">Select...</option>
                                        <option>Nutrition & Hormones</option>
                                        <option>Fitness & Strength</option>
                                        <option>Cycle Health</option>
                                        <option>Mental Wellness</option>
                                        <option>Yoga & Recovery</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Experience</label>
                                    <select style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', background: 'white' }}>
                                        <option value="">Select...</option>
                                        <option>1-3 years</option>
                                        <option>3-5 years</option>
                                        <option>5-10 years</option>
                                        <option>10+ years</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', padding: '16px 24px 24px', borderTop: '1px solid var(--border)' }}>
                            <button onClick={() => setShowAddModal(false)} className="btn btn-secondary">Cancel</button>
                            <button onClick={() => setShowAddModal(false)} className="btn btn-primary" style={{ background: '#0d9488' }}>
                                <Mail size={16} style={{ marginRight: '6px' }} /> Send Invite
                            </button>
                        </div>
                    </div>
                </div>
            )}
            </>
            ) : (
                <div className="users-table-container">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>Package ID</th>
                                <th>Package Info</th>
                                <th>Pricing & Duration</th>
                                <th>Status</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPackages.length === 0 ? (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: 'center', padding: '40px' }}>
                                        <Package size={32} style={{ color: '#94a3b8', margin: '0 auto 12px' }} />
                                        <p style={{ color: '#64748b' }}>No packages found matching your criteria.</p>
                                    </td>
                                </tr>
                            ) : filteredPackages.map(pkg => (
                                <tr key={pkg.id}>
                                    <td>
                                        <span style={{ fontFamily: 'monospace', color: '#64748b' }}>#{pkg.id}</span>
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>{pkg.name}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#64748b', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {pkg.description}
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>${pkg.price}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{pkg.duration} ({pkg.sessions} sessions)</div>
                                    </td>
                                    <td>
                                        <span className={`status-pill ${pkg.status}`} style={{ textTransform: 'capitalize' }}>
                                            <div className="dot"></div> {pkg.status}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <div className="premium-action-group" style={{ justifyContent: 'flex-end' }}>
                                            {pkg.status === 'pending' && (
                                                <>
                                                    <button 
                                                        className="p-action-btn" 
                                                        title="Approve Package"
                                                        onClick={() => handleApprovePkg(pkg.id)}
                                                        style={{ color: '#16a34a' }}
                                                    >
                                                        <CheckCircle size={16} />
                                                    </button>
                                                    <button 
                                                        className="p-action-btn" 
                                                        title="Reject Package"
                                                        onClick={() => handleRejectPkg(pkg.id)}
                                                        style={{ color: '#dc2626' }}
                                                    >
                                                        <XCircle size={16} />
                                                    </button>
                                                </>
                                            )}
                                            {pkg.status === 'active' && (
                                                <button 
                                                    className="p-action-btn" 
                                                    title="Revoke / Suspend"
                                                    onClick={() => handleRejectPkg(pkg.id)}
                                                    style={{ color: '#f59e0b' }}
                                                >
                                                    <Clock size={16} />
                                                </button>
                                            )}
                                            <button className="p-action-btn more" title="More Options">
                                                <MoreVertical size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageTrainersPage;
