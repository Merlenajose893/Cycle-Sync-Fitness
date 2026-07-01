import React from 'react';
import { Users, Dumbbell } from 'lucide-react';
import '../../styles/AdminPage.css'

const AdminDashboardPage: React.FC = () => {
  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Admin Dashboard</h1>
          <p className="admin-subtitle">Welcome back, Administrator</p>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="admin-welcome-section">
        <div className="welcome-card glass-premium">
          <div className="welcome-icon">
            <Dumbbell size={80} />
          </div>
          <h2 className="welcome-title">Welcome Admin</h2>
          <p className="welcome-message">
            You have full access to manage the platform. 
            Use the navigation to manage users, trainers, content, and subscriptions.
          </p>
        </div>
      </div>

      {/* Quick Actions - Kept minimal but useful */}
      <div className="admin-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="quick-actions-grid">
          <a href="/admin/users" className="quick-action-card">
            <Users size={28} />
            <span>Manage Users</span>
          </a>
          <a href="/admin/trainers" className="quick-action-card">
            <Dumbbell size={28} />
            <span>Manage Trainers</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;