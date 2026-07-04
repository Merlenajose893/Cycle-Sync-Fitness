import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Dumbbell, ChevronRight, Sparkles } from 'lucide-react';
import '../../styles/AdminPage.css';

const AdminDashboardPage: React.FC = () => {
  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Admin Dashboard</h1>
          <p className="admin-subtitle">Today's Overview &amp; Insights</p>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="admin-welcome-section">
        <div className="welcome-card glass-premium">
          <div className="welcome-icon">
            <Sparkles size={80} />
          </div>
          <h2 className="welcome-title">Welcome Admin</h2>
          <p className="welcome-message">
            You have full access to manage the platform.
            Use the navigation to manage users, trainers, content, and subscriptions.
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="admin-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="quick-actions-grid">
          <Link to="/admin/users" className="quick-action-card">
            <div className="action-icon" style={{ background: '#eef2ff', color: '#6366f1' }}>
              <Users size={28} />
            </div>
            <h3>Manage Users</h3>
            <p>View, edit, and manage all registered user accounts on the platform.</p>
            <div className="quick-action-arrow">
              <ChevronRight size={18} />
            </div>
          </Link>

          <Link to="/admin/trainers" className="quick-action-card">
            <div className="action-icon" style={{ background: '#f0fdf4', color: '#22c55e' }}>
              <Dumbbell size={28} />
            </div>
            <h3>Manage Trainers</h3>
            <p>Review trainer applications, manage active trainers, and their packages.</p>
            <div className="quick-action-arrow">
              <ChevronRight size={18} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;