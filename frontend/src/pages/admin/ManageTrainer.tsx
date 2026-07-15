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
    CheckCircle,
    FileText
} from 'lucide-react';
import '../../styles/AdminPage.css';
import type { Trainer } from '../../types/auth.types';
import { useAdminAuth } from '../../hooks/auth/useAdmin';
import { showToast } from '../../components/common/Toast/Toast';
// import { usePackages, updatePackageStatus } from '../../data/mockPackages';

const ManageTrainersPage: React.FC = () => {
    const [trainers,setTrainers]=useState<Trainer[]>([]);
    const {getAllTrainers,loading,error,blockTrainer,unblockTrainer,approveTrainer,rejectTrainer}=useAdminAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedTrainers, setSelectedTrainers] = useState<string[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [viewingDocumentsFor, setViewingDocumentsFor] = useState<Trainer | null>(null);
    const [activeTab, setActiveTab] = useState<'trainers' | 'packages'>('trainers');
    const filteredPackages: any[] = [];

    const stats = {
        total: trainers.length,
        active: trainers.filter(t => t.status === 'ACTIVE' && !t.isDeleted).length,
        suspended: trainers.filter(t => t.isDeleted).length,
        pendingTrainers: trainers.filter(t => t.status === 'PENDING_APPROVAL').length,
        pendingPackages: 0
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

    const handleApprove = async (trainerId: string): Promise<void> => {
        try {
            await approveTrainer(trainerId);
            showToast.success("Trainer approved successfully");
            fetchTrainers();
        } catch (error) {
            console.error(error);
            showToast.error("Failed to approve trainer");
        }
    };

    const handleReject = async (trainerId: string): Promise<void> => {
        const reason = prompt("Please enter the reason for rejection:");
        if (reason === null) return; // cancelled
        try {
            await rejectTrainer(trainerId, reason || "Does not meet requirements");
            showToast.success("Trainer rejected successfully");
            fetchTrainers();
        } catch (error) {
            console.error(error);
            showToast.error("Failed to reject trainer");
        }
    };

    const toggleSelection = (id: string) => {
        setSelectedTrainers((prev) =>
            prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
        );
    };

    const filteredTrainers = trainers.filter((t) => {
        const matchesSearch = 
            t.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || 
            t.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
            t.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.speciality?.toLowerCase().includes(searchQuery.toLowerCase());

        let matchesFilter = false;
        if (filterStatus === "all") {
            matchesFilter = true;
        } else if (filterStatus === "active") {
            matchesFilter = t.status === "ACTIVE" && !t.isDeleted;
        } else if (filterStatus === "pending") {
            matchesFilter = t.status === "PENDING_APPROVAL";
        } else if (filterStatus === "suspended") {
            matchesFilter = t.isDeleted === true;
        }

        return matchesSearch && matchesFilter;
    });


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
                                    onChange={(e) => setSelectedTrainers(e.target.checked ? filteredTrainers.map((t) => t._id) : [])}
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
                            <tr key={trainer._id} className={selectedTrainers.includes(trainer._id) ? 'selected' : ''}>
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
                                    {trainer.isDeleted ? (
                                        <span className="status-badge suspended">
                                            <Ban size={14} /> BLOCKED
                                        </span>
                                    ) : (
                                        <>
                                            {trainer.status === 'ACTIVE' && (
                                                <span className="status-badge active">
                                                    <CheckCircle2 size={14} /> ACTIVE
                                                </span>
                                            )}
                                            {trainer.status === 'PENDING_APPROVAL' && (
                                                <span className="status-badge pending">
                                                    <Clock size={14} /> PENDING APPROVAL
                                                </span>
                                            )}
                                            {trainer.status === 'REGISTERED' && (
                                                <span className="status-badge inactive">
                                                    <Clock size={14} /> REGISTERED
                                                </span>
                                            )}
                                            {trainer.status === 'ONBOARDING' && (
                                                <span className="status-badge inactive">
                                                    <Clock size={14} /> ONBOARDING
                                                </span>
                                            )}
                                            {trainer.status === 'REJECTED' && (
                                                <span className="status-badge suspended">
                                                    <XCircle size={14} /> REJECTED
                                                </span>
                                            )}
                                        </>
                                    )}
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
                                    <div className="action-buttons" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <button className="btn-icon" title="View Profile"><Eye size={16} /></button>
                                        <button className="btn-icon" title="Send Email"><Mail size={16} /></button>
                                        <button 
                                            className="btn-icon" 
                                            title="View Documents" 
                                            onClick={() => setViewingDocumentsFor(trainer)}
                                            style={{ color: '#0d9488' }}
                                        >
                                            <FileText size={16} />
                                        </button>
                                        {!trainer.isDeleted && trainer.status === 'PENDING_APPROVAL' && (
                                            <>
                                                <button 
                                                    className="btn-icon" 
                                                    title="Approve" 
                                                    onClick={() => handleApprove(trainer._id)}
                                                    style={{ borderColor: '#22c55e', color: '#22c55e', background: 'transparent' }}
                                                >
                                                    <CheckCircle2 size={16} />
                                                </button>
                                                <button 
                                                    className="btn-icon" 
                                                    title="Reject" 
                                                    onClick={() => handleReject(trainer._id)}
                                                    style={{ borderColor: '#ef4444', color: '#ef4444', background: 'transparent' }}
                                                >
                                                    <XCircle size={16} />
                                                </button>
                                            </>
                                        )}
                                        {trainer.isDeleted ? (
                                            <button 
                                                className="btn-icon" 
                                                title="Unblock Trainer" 
                                                onClick={() => handleUnBlock(trainer._id)}
                                                style={{ borderColor: '#3b82f6', color: '#3b82f6', background: 'transparent', padding: '2px 8px', fontSize: '0.8rem', height: '28px' }}
                                            >
                                                unblock
                                            </button>
                                        ) : (
                                            <button 
                                                className="btn-icon" 
                                                title="Block Trainer" 
                                                onClick={() => handleBlock(trainer._id)}
                                                style={{ borderColor: '#ef4444', color: '#ef4444', background: 'transparent', padding: '2px 8px', fontSize: '0.8rem', height: '28px' }}
                                            >
                                                block
                                            </button>
                                        )}
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
            {/* View Documents Modal */}
            {viewingDocumentsFor && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', zIndex: 1000
                }} onClick={() => setViewingDocumentsFor(null)}>
                    <div style={{
                        background: 'white', borderRadius: 'var(--radius-xl)', width: '600px',
                        maxWidth: '90vw', maxHeight: '85vh', overflowY: 'auto',
                        boxShadow: 'var(--shadow-xl)', animation: 'scaleIn 0.2s ease'
                    }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 24px 0' }}>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>Documents for {viewingDocumentsFor.firstName}</h2>
                            <button onClick={() => setViewingDocumentsFor(null)} style={{
                                width: '36px', height: '36px', borderRadius: 'var(--radius-full)',
                                background: 'var(--bg-primary)', border: 'none', display: 'flex',
                                alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)'
                            }}><X size={20} /></button>
                        </div>
                        <div style={{ padding: '24px' }}>
                            {(!viewingDocumentsFor.documents || viewingDocumentsFor.documents.length === 0) ? (
                                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '40px 0' }}>
                                    No documents uploaded by this trainer.
                                </p>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {viewingDocumentsFor.documents.map((doc, idx) => (
                                        <div key={idx} style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>{doc.name || `Document ${idx + 1}`}</div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Type: {doc.type}</div>
                                            </div>
                                            <a href={doc.url} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ textDecoration: 'none' }}>
                                                View
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', padding: '16px 24px 24px', borderTop: '1px solid var(--border)' }}>
                            <button onClick={() => setViewingDocumentsFor(null)} className="btn btn-secondary">Close</button>
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
