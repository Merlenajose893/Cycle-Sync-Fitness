import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  Download,
  Mail,
  Ban,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Edit,
  ShieldCheck,
  ShieldAlert,
  Calendar,
  Target,
  Sparkles,
  UserCheck,
  UserX
} from 'lucide-react';
import '../../styles/AdminPage.css';
import type { User } from '../../types/auth.types';
import { useAdminAuth } from '../../hooks/auth/useAdmin';
import { showToast } from '../../components/common/Toast/Toast';

const ManageUsersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  
  const { getAllUsers, loading, error, blockUser, unblockUser } = useAdminAuth();

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
      showToast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBlock = async (userId: string) => {
    try {
      await blockUser(userId);
      showToast.success("User account suspended successfully");
      fetchUsers();
    } catch (err) {
      console.error(err);
      showToast.error("Failed to suspend user");
    }
  };

  const handleUnblock = async (userId: string) => {
    try {
      await unblockUser(userId);
      showToast.success("User account reinstated successfully");
      fetchUsers();
    } catch (err) {
      console.error(err);
      showToast.error("Failed to reinstate user");
    }
  };

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === 'ACTIVE' || u.subscription?.status === 'active').length,
    suspended: users.filter((u) => u.isDeleted || u.status === 'SUSPENDED').length,
    inactive: users.filter((u) => !u.isDeleted && u.subscription?.status !== 'active').length,
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesFilter = true;
    if (filterStatus === 'active') {
      matchesFilter = user.status === 'ACTIVE' || user.subscription?.status === 'active';
    } else if (filterStatus === 'suspended') {
      matchesFilter = user.isDeleted === true || user.status === 'SUSPENDED';
    } else if (filterStatus === 'inactive') {
      matchesFilter = !user.isDeleted && user.subscription?.status !== 'active';
    }

    return matchesSearch && matchesFilter;
  });

  const formatGoal = (goalStr?: string) => {
    if (!goalStr) return 'General Health';
    return goalStr
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="admin-container">
      {/* Header Banner */}
      <div className="admin-header user-header-banner">
        <div>
          <h1 className="admin-title">Manage User Accounts</h1>
          <p className="admin-subtitle">Monitor user activity, manage subscriptions, and regulate user account access</p>
        </div>
        <div className="admin-header-actions">
          <button className="btn btn-secondary-admin">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="users-stats-grid">
        <div className="sub-stat-card card-total">
          <div className="sub-stat-icon-wrapper icon-purple">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{stats.total.toLocaleString()}</div>
            <div className="stat-label">Total Users</div>
          </div>
        </div>

        <div className="sub-stat-card card-active">
          <div className="sub-stat-icon-wrapper icon-green">
            <UserCheck size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{stats.active.toLocaleString()}</div>
            <div className="stat-label">Active Users</div>
          </div>
        </div>

        <div className="sub-stat-card card-elite">
          <div className="sub-stat-icon-wrapper icon-amber">
            <UserX size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{stats.inactive.toLocaleString()}</div>
            <div className="stat-label">Inactive / Free</div>
          </div>
        </div>

        <div className="sub-stat-card card-premium" style={{ borderTopColor: '#ef4444' }}>
          <div className="sub-stat-icon-wrapper" style={{ background: '#fee2e2', color: '#dc2626' }}>
            <Ban size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{stats.suspended.toLocaleString()}</div>
            <div className="stat-label">Suspended</div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="users-controls trainer-controls-box">
        <div className="search-bar-admin trainer-search-bar">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search users by name or email..."
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
            <option value="all">All Users ({users.length})</option>
            <option value="active">Active ({stats.active})</option>
            <option value="inactive">Inactive ({stats.inactive})</option>
            <option value="suspended">Suspended ({stats.suspended})</option>
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="bulk-actions-bar">
          <span>{selectedUsers.length} user(s) selected</span>
          <div className="bulk-actions-buttons">
            <button className="btn btn-sm btn-secondary">
              <Mail size={16} /> Send Email
            </button>
            <button className="btn btn-sm btn-secondary">
              <Ban size={16} /> Suspend Selected
            </button>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="users-table-container trainer-table-card">
        <table className="users-table">
          <thead>
            <tr>
              <th style={{ width: 40 }}>
                <input
                  type="checkbox"
                  checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                  onChange={(e) =>
                    setSelectedUsers(e.target.checked ? filteredUsers.map((u) => u._id) : [])
                  }
                />
              </th>
              <th>User Details</th>
              <th>Primary Goal</th>
              <th>Subscription</th>
              <th>Verified</th>
              <th>Onboarding</th>
              <th>Joined Date</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={8} className="sub-empty-table">
                  <Sparkles size={32} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
                  <p>No user accounts match your criteria.</p>
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => {
                const isBlocked = user.isDeleted || user.status === 'SUSPENDED';
                return (
                  <tr
                    key={user._id}
                    className={`trainer-table-row ${
                      selectedUsers.includes(user._id) ? "selected" : ""
                    }`}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user._id)}
                        onChange={() => toggleUserSelection(user._id)}
                      />
                    </td>

                    <td>
                      <div className="user-cell">
                        <img
                          src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.firstName || 'User')}&background=4f46e5&color=fff`}
                          alt={user.firstName}
                          className="user-avatar"
                        />
                        <div>
                          <div className="user-name-premium">
                            {user.firstName || 'User'} {user.lastName || ''}
                          </div>
                          <div className="user-email">{user.email}</div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="user-goal-pill">
                        <Target size={12} />
                        {formatGoal(user.goals?.primaryGoal)}
                      </span>
                    </td>

                    <td>
                      {user.subscription?.status === 'active' ? (
                        <span className="status-pill status-pill-active">
                          <CheckCircle2 size={12} /> Pro Tier
                        </span>
                      ) : (
                        <span className="status-pill status-pill-registered">
                          Free Tier
                        </span>
                      )}
                    </td>

                    <td>
                      {user.isEmailVerified ? (
                        <span className="status-pill status-pill-active" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>
                          <CheckCircle2 size={11} /> Verified
                        </span>
                      ) : (
                        <span className="status-pill status-pill-inactive" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>
                          <XCircle size={11} /> Unverified
                        </span>
                      )}
                    </td>

                    <td>
                      {user.onboardingComplete ? (
                        <span className="status-pill status-pill-active" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>
                          <CheckCircle2 size={11} /> Complete
                        </span>
                      ) : (
                        <span className="status-pill status-pill-pending" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>
                          Pending
                        </span>
                      )}
                    </td>

                    <td>
                      <div className="date-cell">
                        <Calendar size={13} />
                        {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <div className="trainer-actions-row" style={{ justifyContent: 'flex-end' }}>
                        <button className="trainer-act-btn" title="Edit Profile">
                          <Edit size={15} />
                        </button>

                        <button className="trainer-act-btn" title="Send Email">
                          <Mail size={15} />
                        </button>

                        {isBlocked ? (
                          <button
                            className="trainer-toggle-block-btn unblock"
                            title="Restate User"
                            onClick={() => handleUnblock(user._id)}
                          >
                            <ShieldCheck size={14} />
                            <span>Unblock</span>
                          </button>
                        ) : (
                          <button
                            className="trainer-toggle-block-btn block"
                            title="Suspend User"
                            onClick={() => handleBlock(user._id)}
                          >
                            <ShieldAlert size={14} />
                            <span>Block</span>
                          </button>
                        )}

                        <button className="trainer-act-btn" title="More Options">
                          <MoreVertical size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button className="btn btn-secondary btn-sm">Previous</button>
        <div className="pagination-info">
          Showing {filteredUsers.length} of {stats.total.toLocaleString()} users
        </div>
        <button className="btn btn-secondary btn-sm">Next</button>
      </div>
    </div>
  );
};

export default ManageUsersPage;