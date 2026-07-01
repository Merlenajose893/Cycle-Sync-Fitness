import React, { useState } from 'react';
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
} from 'lucide-react';
import '../../styles/AdminPage.css';
import type { User } from '../../types/auth.types';
import { useAdminAuth } from '../../hooks/auth/useAdmin';
import { useEffect } from 'react';

const ManageUsersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]); // ✅ was number[]

  const [users, setUsers] = useState<User[]>([]);
  const { getAllUsers, loading, error } = useAdminAuth();

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const stats = {
    total: users.length,
    active: users.filter(
      (user) => user.subscription?.status === "active"
    ).length,
    suspended: 0,
    inactive: users.filter(
      (user) => user.subscription?.status !== "active"
    ).length,
  };

  const toggleUserSelection = (userId: string) => { // ✅ was number
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Manage Users</h1>
          <p className="admin-subtitle">View and manage all user accounts</p>
        </div>
        <div className="admin-header-actions">
          <button className="btn btn-secondary">
            <Download size={18} />
            Export Users
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="users-stats-grid">
        <div className="user-stat-card glass-premium">
          <div className="stat-icon-wrapper">
            <Users size={24} className="stat-icon" />
          </div>
          <div className="stat-info">
            <div className="stat-value">{stats.total.toLocaleString()}</div>
            <div className="stat-label">Total Registered</div>
          </div>
        </div>
        <div className="user-stat-card glass-premium active-border">
          <div className="stat-icon-wrapper success">
            <CheckCircle2 size={24} className="stat-icon" />
          </div>
          <div className="stat-info">
            <div className="stat-value">{stats.active.toLocaleString()}</div>
            <div className="stat-label">Active Now</div>
          </div>
        </div>
        <div className="user-stat-card glass-premium suspended-border">
          <div className="stat-icon-wrapper warning">
            <Ban size={24} className="stat-icon" />
          </div>
          <div className="stat-info">
            <div className="stat-value">{stats.suspended.toLocaleString()}</div>
            <div className="stat-label">Suspended</div>
          </div>
        </div>
        <div className="user-stat-card glass-premium inactive-border">
          <div className="stat-icon-wrapper muted">
            <XCircle size={24} className="stat-icon" />
          </div>
          <div className="stat-info">
            <div className="stat-value">{stats.inactive.toLocaleString()}</div>
            <div className="stat-label">Inactive</div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="users-controls">
        <div className="search-bar-admin">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input-admin"
          />
        </div>

        <div className="filter-group">
          <label>Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Users</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button className="btn btn-secondary">
          <Filter size={18} />
          More Filters
        </button>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="bulk-actions-bar">
          <span>{selectedUsers.length} user(s) selected</span>
          <div className="bulk-actions-buttons">
            <button className="btn btn-sm btn-secondary">
              <Mail size={16} />
              Send Email
            </button>
            <button className="btn btn-sm btn-secondary">
              <Ban size={16} />
              Suspend
            </button>
            <button className="btn btn-sm btn-danger">
              <XCircle size={16} />
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                  onChange={(e) =>
                    setSelectedUsers(e.target.checked ? filteredUsers.map((u) => u._id) : []) // ✅ was u.id
                  }
                />
              </th>
              <th>User</th>
              <th>Goal</th>
              <th>Subscription</th>
              <th>Verified</th>
              <th>Onboarding</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className={`${
                  selectedUsers.includes(user._id) ? "selected" : ""
                } table-row-premium`}
              >
                <td className="checkbox-cell">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user._id)}
                    onChange={() => toggleUserSelection(user._id)}
                  />
                </td>

                <td>
                  <div className="user-profile-cell">
                    <div className="user-id-info">
                      <div className="user-name-premium">
                        {user.firstName} {user.lastName}
                      </div>

                      <div className="user-email-secondary">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>

                <td>{user.goals?.primaryGoal ?? "-"}</td>

                <td>{user.subscription?.status ?? "Inactive"}</td>

                <td>
                  {user.isEmailVerified ? (
                    <CheckCircle2 size={18} color="green" />
                  ) : (
                    <XCircle size={18} color="red" />
                  )}
                </td>

                <td>
                  {user.onboardingComplete ? (
                    <CheckCircle2 size={18} color="green" />
                  ) : (
                    <XCircle size={18} color="red" />
                  )}
                </td>

                <td>
                  {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    
                </td>

                <td className="actions-cell">
                  <div className="premium-action-group">
                    <button className="p-action-btn" title="Edit">
                      <Edit size={14} />
                    </button>

                    <button className="p-action-btn" title="Email">
                      <Mail size={14} />
                    </button>

                    <button className="p-action-btn more" title="More">
                      <MoreVertical size={14} />
                    </button>
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
          Showing {filteredUsers.length} of {stats.total.toLocaleString()} users
        </div>
        <button className="btn btn-secondary btn-sm">Next</button>
      </div>
    </div>
  );
};

export default ManageUsersPage;