import React, { useEffect, useState, useCallback } from 'react';
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
    FileText,
    ShieldAlert,
    ShieldCheck,
    Sparkles,
    Send
} from 'lucide-react';
import '../../styles/AdminPage.css';
import type { Trainer } from '../../types/auth.types';
import { useAdminAuth } from '../../hooks/auth/useAdmin';
import { showToast } from '../../components/common/Toast/Toast';
import Modal from '../../components/common/Modal/Modal';

const ManageTrainersPage: React.FC = () => {
    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const { getAllTrainers, loading, error, blockTrainer, unblockTrainer, approveTrainer, rejectTrainer } = useAdminAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedTrainers, setSelectedTrainers] = useState<string[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [viewingDocumentsFor, setViewingDocumentsFor] = useState<Trainer | null>(null);
    const [rejectingTrainerId, setRejectingTrainerId] = useState<string | null>(null);
    const [approvingTrainerId, setApprovingTrainerId] = useState<string | null>(null);
    const [rejectionReason, setRejectionReason] = useState('');
    const [activeTab, setActiveTab] = useState<'trainers' | 'packages'>('trainers');
    
    // Form state for adding a trainer
    const [addForm, setAddForm] = useState({
        fullName: '',
        email: '',
        specialty: '',
        experience: ''
    });
    const [inviting, setInviting] = useState(false);

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

    const handleBlock = async (trainerId: string): Promise<void> => {
        try {
            await blockTrainer(trainerId);
            showToast.success("Trainer blocked successfully");
            fetchTrainers();
        } catch (error) {
            console.error(error);
        }
    };

    const handleUnBlock = async (trainerId: string): Promise<void> => {
        try {
            await unblockTrainer(trainerId);
            showToast.success("Trainer unblocked successfully");
            fetchTrainers();
        } catch (error) {
            console.error(error);
        }
    };

    const handleApprove = (trainerId: string): void => {
        setApprovingTrainerId(trainerId);
    };

    const handleConfirmApprove = async (): Promise<void> => {
        if (!approvingTrainerId) return;
        try {
            await approveTrainer(approvingTrainerId);
            showToast.success("Trainer approved successfully");
            fetchTrainers();
        } catch (error) {
            console.error(error);
            showToast.error("Failed to approve trainer");
        } finally {
            setApprovingTrainerId(null);
        }
    };

    const handleReject = (trainerId: string): void => {
        setRejectingTrainerId(trainerId);
        setRejectionReason('');
    };

    const handleConfirmReject = async (): Promise<void> => {
        if (!rejectingTrainerId) return;
        try {
            await rejectTrainer(rejectingTrainerId, rejectionReason || "Does not meet requirements");
            showToast.success("Trainer rejected successfully");
            fetchTrainers();
        } catch (error) {
            console.error(error);
            showToast.error("Failed to reject trainer");
        } finally {
            setRejectingTrainerId(null);
            setRejectionReason('');
        }
    };

    const handleSendInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!addForm.fullName.trim() || !addForm.email.trim()) {
            showToast.error("Please enter trainer name and email");
            return;
        }
        try {
            setInviting(true);
            // Simulate sending invite
            await new Promise(r => setTimeout(r, 600));
            showToast.success(`Invite sent successfully to ${addForm.email}`);
            setShowAddModal(false);
            setAddForm({ fullName: '', email: '', specialty: '', experience: '' });
        } catch (err) {
            showToast.error("Failed to send trainer invitation");
        } finally {
            setInviting(false);
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

    const renderSpecialties = (specialityString?: string) => {
        if (!specialityString) {
            return <span className="trainer-spec-chip text-muted">General Fitness</span>;
        }
        const items = specialityString.split(',').map(s => s.trim()).filter(Boolean);
        if (items.length === 0) return <span className="trainer-spec-chip text-muted">General</span>;

        const visible = items.slice(0, 2);
        const remaining = items.length - 2;

        return (
            <div className="trainer-spec-chips-container">
                {visible.map((spec, idx) => (
                    <span key={idx} className="trainer-spec-chip">
                        <Award size={11} />
                        {spec}
                    </span>
                ))}
                {remaining > 0 && (
                    <span className="trainer-spec-chip more" title={items.slice(2).join(', ')}>
                        +{remaining} more
                    </span>
                )}
            </div>
        );
    };

    return (
        <div className="admin-container">
            {/* Header Banner */}
            <div className="admin-header trainer-header-banner">
                <div>
                    <h1 className="admin-title">Manage Trainers & Packages</h1>
                    <p className="admin-subtitle">View, onboard, and oversee certified trainers and coaching programs</p>
                </div>
                <div className="admin-header-actions">
                    <button className="btn btn-secondary-admin">
                        <Download size={16} /> Export CSV
                    </button>
                    {activeTab === 'trainers' && (
                        <button
                            className="btn btn-add-trainer"
                            onClick={() => setShowAddModal(true)}
                        >
                            <UserPlus size={18} />
                            <span>Add Trainer</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="trainer-tabs-bar">
                <button
                    onClick={() => setActiveTab('trainers')}
                    className={`trainer-tab-btn ${activeTab === 'trainers' ? 'active' : ''}`}
                >
                    <Dumbbell size={18} />
                    <span>Trainers Directory</span>
                    <span className="tab-count-badge">{trainers.length}</span>
                </button>
                <button
                    onClick={() => setActiveTab('packages')}
                    className={`trainer-tab-btn ${activeTab === 'packages' ? 'active' : ''}`}
                >
                    <Package size={18} />
                    <span>Trainer Packages</span>
                    {stats.pendingPackages > 0 && (
                        <span className="tab-pending-badge">
                            {stats.pendingPackages} New
                        </span>
                    )}
                </button>
            </div>

            {/* Controls & Search */}
            <div className="users-controls trainer-controls-box">
                <div className="search-bar-admin trainer-search-bar">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder={`Search ${activeTab === 'packages' ? 'packages' : 'trainers by name, email or specialty'}...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input-admin"
                    />
                </div>

                <div className="filter-group">
                    <label>Status Filter:</label>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">All Statuses ({trainers.length})</option>
                        <option value="active">Active ({stats.active})</option>
                        <option value="pending">Pending ({stats.pendingTrainers})</option>
                        <option value="suspended">Blocked / Suspended ({stats.suspended})</option>
                    </select>
                </div>
            </div>

            {/* Bulk Actions Bar */}
            {selectedTrainers.length > 0 && (
                <div className="bulk-actions-bar">
                    <span>{selectedTrainers.length} trainer(s) selected</span>
                    <div className="bulk-actions-buttons">
                        <button className="btn btn-sm btn-secondary"><Mail size={16} /> Send Email</button>
                        <button className="btn btn-sm btn-secondary"><Ban size={16} /> Block Selected</button>
                    </div>
                </div>
            )}

            {activeTab === 'trainers' ? (
                <>
                    {/* Trainers Table */}
                    <div className="users-table-container trainer-table-card">
                        <table className="users-table">
                            <thead>
                                <tr>
                                    <th style={{ width: 40 }}>
                                        <input
                                            type="checkbox"
                                            checked={selectedTrainers.length === filteredTrainers.length && filteredTrainers.length > 0}
                                            onChange={(e) => setSelectedTrainers(e.target.checked ? filteredTrainers.map((t) => t._id) : [])}
                                        />
                                    </th>
                                    <th>Trainer Details</th>
                                    <th>Specialty & Certs</th>
                                    <th>Status</th>
                                    <th>Rating</th>
                                    <th>Clients</th>
                                    <th>Joined Date</th>
                                    <th style={{ textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTrainers.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="sub-empty-table">
                                            <Sparkles size={32} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
                                            <p>No trainers match the selected filters.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredTrainers.map((trainer) => (
                                        <tr key={trainer._id} className={`trainer-table-row ${selectedTrainers.includes(trainer._id) ? 'selected' : ''}`}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedTrainers.includes(trainer._id)}
                                                    onChange={() => toggleSelection(trainer._id)}
                                                />
                                            </td>
                                            <td>
                                                <div className="user-cell">
                                                    <img
                                                        src={trainer.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(trainer.firstName)}&background=0d9488&color=fff`}
                                                        alt={trainer.firstName}
                                                        className="user-avatar"
                                                    />
                                                    <div>
                                                        <div className="user-name-premium">
                                                            {trainer.firstName} {trainer.lastName || ''}
                                                        </div>
                                                        <div className="user-email">{trainer.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {renderSpecialties(trainer.speciality)}
                                            </td>
                                            <td>
                                                {trainer.isDeleted ? (
                                                    <span className="status-pill status-pill-blocked">
                                                        <Ban size={12} /> BLOCKED
                                                    </span>
                                                ) : (
                                                    <>
                                                        {trainer.status === 'ACTIVE' && (
                                                            <span className="status-pill status-pill-active">
                                                                <CheckCircle2 size={12} /> ACTIVE
                                                            </span>
                                                        )}
                                                        {trainer.status === 'PENDING_APPROVAL' && (
                                                            <span className="status-pill status-pill-pending">
                                                                <Clock size={12} /> PENDING
                                                            </span>
                                                        )}
                                                        {trainer.status === 'REGISTERED' && (
                                                            <span className="status-pill status-pill-registered">
                                                                <Clock size={12} /> REGISTERED
                                                            </span>
                                                        )}
                                                        {trainer.status === 'ONBOARDING' && (
                                                            <span className="status-pill status-pill-registered">
                                                                <Clock size={12} /> ONBOARDING
                                                            </span>
                                                        )}
                                                        {trainer.status === 'REJECTED' && (
                                                            <span className="status-pill status-pill-inactive">
                                                                <XCircle size={12} /> REJECTED
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                            </td>
                                            <td>
                                                {trainer.rating > 0 ? (
                                                    <div className="trainer-rating-cell">
                                                        <Star size={14} fill="#FBBF24" color="#FBBF24" />
                                                        <span>{trainer.rating}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-sm">New</span>
                                                )}
                                            </td>
                                            <td>
                                                <div className="trainer-clients-cell">
                                                    <Users size={14} className="text-muted" />
                                                    <span>{trainer.totalClients || 0}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="date-cell">
                                                    <Calendar size={13} />
                                                    {new Date(trainer.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </div>
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                <div className="trainer-actions-row">
                                                    <button className="trainer-act-btn" title="View Profile">
                                                        <Eye size={15} />
                                                    </button>
                                                    <button className="trainer-act-btn" title="Send Email">
                                                        <Mail size={15} />
                                                    </button>
                                                    <button
                                                        className="trainer-act-btn teal"
                                                        title="View Documents"
                                                        onClick={() => setViewingDocumentsFor(trainer)}
                                                    >
                                                        <FileText size={15} />
                                                    </button>

                                                    {!trainer.isDeleted && trainer.status === 'PENDING_APPROVAL' && (
                                                        <>
                                                            <button
                                                                className="trainer-act-btn green"
                                                                title="Approve Application"
                                                                onClick={() => handleApprove(trainer._id)}
                                                            >
                                                                <CheckCircle2 size={15} />
                                                            </button>
                                                            <button
                                                                className="trainer-act-btn red"
                                                                title="Reject Application"
                                                                onClick={() => handleReject(trainer._id)}
                                                            >
                                                                <XCircle size={15} />
                                                            </button>
                                                        </>
                                                    )}

                                                    {trainer.isDeleted ? (
                                                        <button
                                                            className="trainer-toggle-block-btn unblock"
                                                            title="Unblock Trainer"
                                                            onClick={() => handleUnBlock(trainer._id)}
                                                        >
                                                            <ShieldCheck size={14} />
                                                            <span>Unblock</span>
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="trainer-toggle-block-btn block"
                                                            title="Block Trainer"
                                                            onClick={() => handleBlock(trainer._id)}
                                                        >
                                                            <ShieldAlert size={14} />
                                                            <span>Block</span>
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
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
                        <div className="sub-modal-backdrop" onClick={() => setShowAddModal(false)}>
                            <div className="sub-modal-card" onClick={(e) => e.stopPropagation()}>
                                <div className="sub-modal-header" style={{ background: 'linear-gradient(135deg, #0f766e 0%, #115e59 100%)' }}>
                                    <div className="sub-modal-title-box">
                                        <UserPlus size={20} className="text-white" />
                                        <h2>Add New Trainer</h2>
                                    </div>
                                    <button className="sub-modal-close" onClick={() => setShowAddModal(false)}>
                                        &times;
                                    </button>
                                </div>

                                <form onSubmit={handleSendInvite} className="sub-modal-body">
                                    <p className="modal-description-sub">
                                        Send an invitation email to the trainer with a secure onboarding link.
                                    </p>

                                    <div className="form-grid-2">
                                        <div className="input-field-group">
                                            <label>Full Name <span className="req">*</span></label>
                                            <input
                                                type="text"
                                                required
                                                value={addForm.fullName}
                                                onChange={(e) => setAddForm({ ...addForm, fullName: e.target.value })}
                                                placeholder="e.g. Dr. Sarah Mitchell"
                                                className="sub-input"
                                            />
                                        </div>
                                        <div className="input-field-group">
                                            <label>Email Address <span className="req">*</span></label>
                                            <input
                                                type="email"
                                                required
                                                value={addForm.email}
                                                onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                                                placeholder="trainer@example.com"
                                                className="sub-input"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-grid-2" style={{ marginTop: 14 }}>
                                        <div className="input-field-group">
                                            <label>Primary Specialty</label>
                                            <select
                                                value={addForm.specialty}
                                                onChange={(e) => setAddForm({ ...addForm, specialty: e.target.value })}
                                                className="sub-select"
                                            >
                                                <option value="">Select specialty...</option>
                                                <option value="Nutrition & Hormones">Nutrition & Hormones</option>
                                                <option value="Fitness & Strength">Fitness & Strength</option>
                                                <option value="Cycle Health">Cycle Health</option>
                                                <option value="Mental Wellness">Mental Wellness</option>
                                                <option value="Yoga & Recovery">Yoga & Recovery</option>
                                            </select>
                                        </div>

                                        <div className="input-field-group">
                                            <label>Experience Level</label>
                                            <select
                                                value={addForm.experience}
                                                onChange={(e) => setAddForm({ ...addForm, experience: e.target.value })}
                                                className="sub-select"
                                            >
                                                <option value="">Select experience...</option>
                                                <option value="1-3 years">1-3 years</option>
                                                <option value="3-5 years">3-5 years</option>
                                                <option value="5-10 years">5-10 years</option>
                                                <option value="10+ years">10+ years</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="sub-modal-actions">
                                        <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>
                                            Cancel
                                        </button>
                                        <button 
                                            type="submit" 
                                            className="btn-submit"
                                            disabled={inviting}
                                            style={{ background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)' }}
                                        >
                                            <Send size={15} style={{ marginRight: 6 }} />
                                            {inviting ? 'Sending...' : 'Send Invite'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* View Documents Modal */}
                    {viewingDocumentsFor && (
                        <div className="sub-modal-backdrop" onClick={() => setViewingDocumentsFor(null)}>
                            <div className="sub-modal-card" onClick={(e) => e.stopPropagation()}>
                                <div className="sub-modal-header" style={{ background: '#0f766e' }}>
                                    <div className="sub-modal-title-box">
                                        <FileText size={20} className="text-white" />
                                        <h2>Verification Documents ({viewingDocumentsFor.firstName})</h2>
                                    </div>
                                    <button className="sub-modal-close" onClick={() => setViewingDocumentsFor(null)}>
                                        &times;
                                    </button>
                                </div>
                                <div className="sub-modal-body">
                                    {(!viewingDocumentsFor.documents || viewingDocumentsFor.documents.length === 0) ? (
                                        <div className="sub-empty-table" style={{ padding: '30px 0' }}>
                                            <FileText size={32} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
                                            <p>No certification or verification documents uploaded by this trainer.</p>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                            {viewingDocumentsFor.documents.map((doc, idx) => (
                                                <div key={idx} className="trainer-doc-item">
                                                    <div>
                                                        <div className="doc-name">{doc.name || `Document ${idx + 1}`}</div>
                                                        <div className="doc-type">Type: {doc.type}</div>
                                                    </div>
                                                    <a href={doc.url} target="_blank" rel="noreferrer" className="btn-cancel" style={{ textDecoration: 'none', padding: '6px 14px', fontSize: '0.82rem' }}>
                                                        View File
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div className="sub-modal-actions" style={{ marginTop: 20 }}>
                                        <button onClick={() => setViewingDocumentsFor(null)} className="btn-cancel">
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                /* Packages View */
                <div className="users-table-container trainer-table-card">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>Package ID</th>
                                <th>Package Name & Description</th>
                                <th>Pricing & Duration</th>
                                <th>Status</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPackages.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="sub-empty-table">
                                        <Package size={32} style={{ color: '#94a3b8', margin: '0 auto 12px' }} />
                                        <p>No coaching packages found.</p>
                                    </td>
                                </tr>
                            ) : filteredPackages.map(pkg => (
                                <tr key={pkg.id}>
                                    <td>
                                        <code className="sub-code-badge">#{pkg.id}</code>
                                    </td>
                                    <td>
                                        <div className="sub-plan-name">{pkg.name}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#64748b', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {pkg.description}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="sub-price-tag">
                                            <span className="sub-currency">$</span>
                                            <span className="sub-amount">{pkg.price}</span>
                                        </div>
                                        <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{pkg.duration} ({pkg.sessions} sessions)</div>
                                    </td>
                                    <td>
                                        <span className={`status-pill status-pill-${pkg.status}`}>
                                            {pkg.status}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <div className="trainer-actions-row" style={{ justifyContent: 'flex-end' }}>
                                            <button className="trainer-act-btn" title="More Options">
                                                <MoreVertical size={15} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Approval Confirmation Modal */}
            <Modal
                isOpen={!!approvingTrainerId}
                onClose={() => setApprovingTrainerId(null)}
                title="Approve Trainer Application"
                confirmText="Approve Trainer"
                cancelText="Cancel"
                variant="primary"
                onConfirm={handleConfirmApprove}
            >
                <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0 }}>
                    Are you sure you want to approve this trainer's application? They will gain access to trainer features and be listed for clients.
                </p>
            </Modal>

            {/* Rejection Reason Modal */}
            <Modal
                isOpen={!!rejectingTrainerId}
                onClose={() => setRejectingTrainerId(null)}
                title="Reject Trainer Application"
                confirmText="Reject Trainer"
                cancelText="Cancel"
                variant="danger"
                onConfirm={handleConfirmReject}
            >
                <div>
                    <p style={{ marginBottom: '12px', fontSize: '0.9rem', color: '#475569' }}>
                        Please enter the reason for rejecting this trainer's application. An email notification will be sent to them.
                    </p>
                    <textarea
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder="e.g. Incomplete credentials, certification not verified..."
                        rows={3}
                        style={{
                            width: '100%',
                            padding: '10px 12px',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.9rem',
                            outline: 'none',
                            resize: 'vertical',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default ManageTrainersPage;