import React, { useState, useEffect } from 'react';
import {
  CreditCard, Plus, Search, Filter, CheckCircle2, XCircle,
  Loader2, AlertCircle, Eye, Power
} from 'lucide-react';
import '../../styles/AdminPage.css';
import {
  subscriptionPlanService,
  ISubscriptionPlanFrontend,
  CreateSubscriptionPlanInput
} from '../../services/subscriptionPlanService';
import { showToast } from '../../components/common/Toast/Toast';

const ManageSubscriptionPlans: React.FC = () => {
  const [plans, setPlans] = useState<ISubscriptionPlanFrontend[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterTier, setFilterTier] = useState<string>('all');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [formData, setFormData] = useState<CreateSubscriptionPlanInput>({
    name: '',
    code: '',
    tier: 'premium',
    price: 999,
    currency: 'INR',
    billingCycle: 'monthly',
    features: {
      aiPlanGeneration: true,
      unlimitedFoodTracking: true,
      trainerMatching: true,
      cycleSyncInsights: true,
      maxDailyFoodLogs: 10,
    },
  });

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const data = await subscriptionPlanService.getAllPlans();
      setPlans(data);
    } catch (err: any) {
      console.error(err);
      showToast.error('Failed to load subscription plans');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleDeactivate = async (id: string) => {
    try {
      await subscriptionPlanService.deactivatePlan(id);
      showToast.success('Plan deactivated successfully');
      fetchPlans();
    } catch (err: any) {
      console.error(err);
      showToast.error('Failed to deactivate plan');
    }
  };

  const handleCreatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await subscriptionPlanService.createPlan({
        ...formData,
        code: formData.code.toUpperCase(),
      });
      showToast.success('Subscription plan created successfully');
      setShowModal(false);
      fetchPlans();
    } catch (err: any) {
      console.error(err);
      showToast.error(err?.response?.data?.message || 'Failed to create subscription plan');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredPlans = plans.filter((plan) => {
    const matchesSearch =
      plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = filterTier === 'all' || plan.tier === filterTier;
    return matchesSearch && matchesTier;
  });

  const activeCount = plans.filter(p => p.isActive).length;
  const basicCount = plans.filter(p => p.tier === 'basic').length;
  const premiumCount = plans.filter(p => p.tier === 'premium').length;
  const eliteCount = plans.filter(p => p.tier === 'elite').length;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Manage Subscription Plans</h1>
          <p className="admin-subtitle">Create, configure, and monitor subscription pricing tiers</p>
        </div>
        <div className="admin-header-actions">
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={18} />
            Create New Plan
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="users-stats-grid">
        <div className="user-stat-card glass-premium">
          <div className="stat-icon-wrapper">
            <CreditCard size={24} className="stat-icon" />
          </div>
          <div className="stat-info">
            <div className="stat-value">{plans.length}</div>
            <div className="stat-label">Total Plans</div>
          </div>
        </div>
        <div className="user-stat-card glass-premium active-border">
          <div className="stat-icon-wrapper success">
            <CheckCircle2 size={24} className="stat-icon" />
          </div>
          <div className="stat-info">
            <div className="stat-value">{activeCount}</div>
            <div className="stat-label">Active Tiers</div>
          </div>
        </div>
        <div className="user-stat-card glass-premium">
          <div className="stat-info">
            <div className="stat-value">{premiumCount}</div>
            <div className="stat-label">Premium Plans</div>
          </div>
        </div>
        <div className="user-stat-card glass-premium">
          <div className="stat-info">
            <div className="stat-value">{eliteCount}</div>
            <div className="stat-label">Elite Plans</div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="users-controls">
        <div className="search-bar-admin">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search plans by name or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input-admin"
          />
        </div>

        <div className="filter-group">
          <label>Tier:</label>
          <select
            value={filterTier}
            onChange={(e) => setFilterTier(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Tiers</option>
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
            <option value="elite">Elite</option>
          </select>
        </div>
      </div>

      {/* Plans Table */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
          <Loader2 size={36} className="animate-spin" style={{ color: 'var(--primary)' }} />
        </div>
      ) : (
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Plan Name</th>
                <th>Code</th>
                <th>Tier</th>
                <th>Price</th>
                <th>Billing Cycle</th>
                <th>Key Features</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '30px' }}>
                    No subscription plans found.
                  </td>
                </tr>
              ) : (
                filteredPlans.map((plan) => (
                  <tr key={plan._id} className="table-row-premium">
                    <td>
                      <div className="user-name-premium">{plan.name}</div>
                    </td>
                    <td>
                      <code style={{ padding: '2px 6px', borderRadius: 4, background: 'var(--bg-secondary)', fontSize: '0.85rem' }}>
                        {plan.code}
                      </code>
                    </td>
                    <td>
                      <span className={`badge-tier ${plan.tier}`} style={{ textTransform: 'capitalize', fontWeight: 600 }}>
                        {plan.tier}
                      </span>
                    </td>
                    <td>
                      ₹{plan.price} <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>{plan.currency}</span>
                    </td>
                    <td style={{ textTransform: 'capitalize' }}>{plan.billingCycle}</td>
                    <td>
                      <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <span>AI Plan: {plan.features.aiPlanGeneration ? '✓' : '✗'}</span>
                        <span>Insights: {plan.features.cycleSyncInsights ? '✓' : '✗'}</span>
                      </div>
                    </td>
                    <td>
                      {plan.isActive ? (
                        <span style={{ color: '#22c55e', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.85rem' }}>
                          <CheckCircle2 size={14} /> Active
                        </span>
                      ) : (
                        <span style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.85rem' }}>
                          <XCircle size={14} /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="actions-cell">
                      {plan.isActive && (
                        <button
                          onClick={() => handleDeactivate(plan._id)}
                          className="btn btn-sm btn-secondary"
                          title="Deactivate Plan"
                          style={{ color: '#ef4444' }}
                        >
                          <Power size={14} style={{ marginRight: 4 }} />
                          Deactivate
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Create Plan Modal */}
      {showModal && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-container glass-premium" style={{ width: '100%', maxWidth: 540, padding: 24, borderRadius: 16, background: '#18181b', border: '1px solid var(--border-color)', color: 'white' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 16 }}>Create Subscription Plan</h2>
            <form onSubmit={handleCreatePlan} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: '0.85rem', display: 'block', marginBottom: 4 }}>Plan Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Pro Monthly"
                    className="search-input-admin"
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', display: 'block', marginBottom: 4 }}>Code</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="e.g. PRO_MONTHLY"
                    className="search-input-admin"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: '0.85rem', display: 'block', marginBottom: 4 }}>Tier</label>
                  <select
                    value={formData.tier}
                    onChange={(e) => setFormData({ ...formData, tier: e.target.value as any })}
                    className="filter-select"
                    style={{ width: '100%' }}
                  >
                    <option value="basic">Basic</option>
                    <option value="premium">Premium</option>
                    <option value="elite">Elite</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', display: 'block', marginBottom: 4 }}>Price (₹)</label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="search-input-admin"
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', display: 'block', marginBottom: 4 }}>Billing</label>
                  <select
                    value={formData.billingCycle}
                    onChange={(e) => setFormData({ ...formData, billingCycle: e.target.value as any })}
                    className="filter-select"
                    style={{ width: '100%' }}
                  >
                    <option value="monthly">Monthly</option>
                    <option value="annual">Annual</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: 8 }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: 8 }}>Features</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: '0.85rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.features.aiPlanGeneration}
                      onChange={(e) => setFormData({
                        ...formData,
                        features: { ...formData.features, aiPlanGeneration: e.target.checked }
                      })}
                    />
                    AI Plan Generation
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.features.cycleSyncInsights}
                      onChange={(e) => setFormData({
                        ...formData,
                        features: { ...formData.features, cycleSyncInsights: e.target.checked }
                      })}
                    />
                    Cycle Sync Insights
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.features.trainerMatching}
                      onChange={(e) => setFormData({
                        ...formData,
                        features: { ...formData.features, trainerMatching: e.target.checked }
                      })}
                    />
                    Trainer Matching
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.features.unlimitedFoodTracking}
                      onChange={(e) => setFormData({
                        ...formData,
                        features: { ...formData.features, unlimitedFoodTracking: e.target.checked }
                      })}
                    />
                    Unlimited Food Tracking
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? <Loader2 size={16} className="animate-spin" /> : 'Create Plan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSubscriptionPlans;
