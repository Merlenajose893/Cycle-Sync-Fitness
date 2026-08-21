import React, { useState, useEffect } from 'react';
import {
  CreditCard, Plus, Search, CheckCircle2, XCircle,
  Loader2, Power, Zap, Crown, Shield, Sparkles, Check, X
} from 'lucide-react';
import '../../styles/AdminPage.css';
import { subscriptionPlanService } from '../../services/subscriptionPlanService';
import type {
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
    if (!formData.name.trim() || !formData.code.trim()) {
      showToast.error('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      await subscriptionPlanService.createPlan({
        ...formData,
        code: formData.code.toUpperCase().replace(/\s+/g, '_'),
      });
      showToast.success('Subscription plan created successfully');
      setShowModal(false);
      setFormData({
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

  const renderTierBadge = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'elite':
        return (
          <span className="tier-pill tier-pill-elite">
            <Crown size={12} /> Elite
          </span>
        );
      case 'premium':
        return (
          <span className="tier-pill tier-pill-premium">
            <Zap size={12} /> Premium
          </span>
        );
      default:
        return (
          <span className="tier-pill tier-pill-basic">
            <Shield size={12} /> Basic
          </span>
        );
    }
  };

  return (
    <div className="admin-container">
      {/* Header Banner */}
      <div className="admin-header sub-header-banner">
        <div>
          <h1 className="admin-title">Manage Subscription Plans</h1>
          <p className="admin-subtitle">Create, configure, and monitor subscription pricing tiers for Cycle-Sync Fitness</p>
        </div>
        <div className="admin-header-actions">
          <button className="btn btn-create-plan" onClick={() => setShowModal(true)}>
            <Plus size={18} />
            <span>Create New Plan</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="users-stats-grid">
        <div className="sub-stat-card card-total">
          <div className="sub-stat-icon-wrapper icon-purple">
            <CreditCard size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{plans.length}</div>
            <div className="stat-label">Total Plans</div>
          </div>
        </div>

        <div className="sub-stat-card card-active">
          <div className="sub-stat-icon-wrapper icon-green">
            <CheckCircle2 size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{activeCount}</div>
            <div className="stat-label">Active Tiers</div>
          </div>
        </div>

        <div className="sub-stat-card card-premium">
          <div className="sub-stat-icon-wrapper icon-indigo">
            <Zap size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{premiumCount}</div>
            <div className="stat-label">Premium Tiers</div>
          </div>
        </div>

        <div className="sub-stat-card card-elite">
          <div className="sub-stat-icon-wrapper icon-amber">
            <Crown size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{eliteCount}</div>
            <div className="stat-label">Elite Tiers</div>
          </div>
        </div>
      </div>

      {/* Filters & Controls */}
      <div className="users-controls sub-controls-wrapper">
        <div className="search-bar-admin sub-search-bar">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search plans by name or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input-admin"
          />
        </div>

        <div className="filter-group">
          <label>Tier Filter:</label>
          <select
            value={filterTier}
            onChange={(e) => setFilterTier(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Tiers ({plans.length})</option>
            <option value="basic">Basic ({basicCount})</option>
            <option value="premium">Premium ({premiumCount})</option>
            <option value="elite">Elite ({eliteCount})</option>
          </select>
        </div>
      </div>

      {/* Plans Table */}
      {loading ? (
        <div className="sub-loading-container">
          <Loader2 size={36} className="animate-spin text-primary" />
          <p>Loading subscription plans...</p>
        </div>
      ) : (
        <div className="users-table-container sub-table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>Plan Name</th>
                <th>Code</th>
                <th>Tier</th>
                <th>Pricing</th>
                <th>Billing Cycle</th>
                <th>Included Features</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.length === 0 ? (
                <tr>
                  <td colSpan={8} className="sub-empty-table">
                    <Sparkles size={32} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
                    <p>No subscription plans match your search or filter.</p>
                  </td>
                </tr>
              ) : (
                filteredPlans.map((plan) => (
                  <tr key={plan._id} className="sub-table-row">
                    <td>
                      <div className="sub-plan-name">{plan.name}</div>
                    </td>
                    <td>
                      <code className="sub-code-badge">
                        {plan.code}
                      </code>
                    </td>
                    <td>{renderTierBadge(plan.tier)}</td>
                    <td>
                      <div className="sub-price-tag">
                        <span className="sub-currency">₹</span>
                        <span className="sub-amount">{plan.price}</span>
                        <span className="sub-curr-code">{plan.currency}</span>
                      </div>
                    </td>
                    <td>
                      <span className="sub-billing-tag">
                        {plan.billingCycle}
                      </span>
                    </td>
                    <td>
                      <div className="sub-features-chips">
                        <span className={`feat-chip ${plan.features.aiPlanGeneration ? 'active' : 'inactive'}`}>
                          {plan.features.aiPlanGeneration ? <Check size={10} /> : <X size={10} />} AI Plan
                        </span>
                        <span className={`feat-chip ${plan.features.cycleSyncInsights ? 'active' : 'inactive'}`}>
                          {plan.features.cycleSyncInsights ? <Check size={10} /> : <X size={10} />} Insights
                        </span>
                        <span className={`feat-chip ${plan.features.trainerMatching ? 'active' : 'inactive'}`}>
                          {plan.features.trainerMatching ? <Check size={10} /> : <X size={10} />} Trainer
                        </span>
                      </div>
                    </td>
                    <td>
                      {plan.isActive ? (
                        <span className="status-pill status-pill-active">
                          <CheckCircle2 size={12} /> Active
                        </span>
                      ) : (
                        <span className="status-pill status-pill-inactive">
                          <XCircle size={12} /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="actions-cell" style={{ textAlign: 'right' }}>
                      {plan.isActive ? (
                        <button
                          onClick={() => handleDeactivate(plan._id)}
                          className="btn-deactivate-action"
                          title="Deactivate Plan"
                        >
                          <Power size={14} />
                          <span>Deactivate</span>
                        </button>
                      ) : (
                        <span className="sub-archived-lbl">Archived</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal - Create Plan */}
      {showModal && (
        <div className="sub-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="sub-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="sub-modal-header">
              <div className="sub-modal-title-box">
                <Sparkles size={20} className="icon-sparkle" />
                <h2>Create Subscription Plan</h2>
              </div>
              <button className="sub-modal-close" onClick={() => setShowModal(false)}>
                &times;
              </button>
            </div>

            <form onSubmit={handleCreatePlan} className="sub-modal-body">
              <div className="form-section-title">General Information</div>
              <div className="form-grid-2">
                <div className="input-field-group">
                  <label>Plan Name <span className="req">*</span></label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData({
                        ...formData,
                        name: val,
                        code: formData.code || val.toUpperCase().replace(/\s+/g, '_')
                      });
                    }}
                    placeholder="e.g. Pro Monthly"
                    className="sub-input"
                  />
                </div>
                <div className="input-field-group">
                  <label>Plan Code <span className="req">*</span></label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    placeholder="e.g. PRO_MONTHLY"
                    className="sub-input"
                  />
                </div>
              </div>

              <div className="form-section-title" style={{ marginTop: 16 }}>Pricing & Tier Configuration</div>
              <div className="form-grid-3">
                <div className="input-field-group">
                  <label>Tier Category</label>
                  <select
                    value={formData.tier}
                    onChange={(e) => setFormData({ ...formData, tier: e.target.value as any })}
                    className="sub-select"
                  >
                    <option value="basic">Basic Tier</option>
                    <option value="premium">Premium Tier</option>
                    <option value="elite">Elite Tier</option>
                  </select>
                </div>

                <div className="input-field-group">
                  <label>Price (₹ INR) <span className="req">*</span></label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="sub-input"
                  />
                </div>

                <div className="input-field-group">
                  <label>Billing Cycle</label>
                  <select
                    value={formData.billingCycle}
                    onChange={(e) => setFormData({ ...formData, billingCycle: e.target.value as any })}
                    className="sub-select"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="annual">Annual</option>
                  </select>
                </div>
              </div>

              <div className="form-section-title" style={{ marginTop: 16 }}>Included Feature Flags</div>
              <div className="feature-cards-grid">
                <div 
                  className={`feature-toggle-card ${formData.features.aiPlanGeneration ? 'selected' : ''}`}
                  onClick={() => setFormData({
                    ...formData,
                    features: { ...formData.features, aiPlanGeneration: !formData.features.aiPlanGeneration }
                  })}
                >
                  <input
                    type="checkbox"
                    checked={formData.features.aiPlanGeneration}
                    onChange={() => {}}
                  />
                  <span>AI Plan Generation</span>
                </div>

                <div 
                  className={`feature-toggle-card ${formData.features.cycleSyncInsights ? 'selected' : ''}`}
                  onClick={() => setFormData({
                    ...formData,
                    features: { ...formData.features, cycleSyncInsights: !formData.features.cycleSyncInsights }
                  })}
                >
                  <input
                    type="checkbox"
                    checked={formData.features.cycleSyncInsights}
                    onChange={() => {}}
                  />
                  <span>Cycle Sync Insights</span>
                </div>

                <div 
                  className={`feature-toggle-card ${formData.features.trainerMatching ? 'selected' : ''}`}
                  onClick={() => setFormData({
                    ...formData,
                    features: { ...formData.features, trainerMatching: !formData.features.trainerMatching }
                  })}
                >
                  <input
                    type="checkbox"
                    checked={formData.features.trainerMatching}
                    onChange={() => {}}
                  />
                  <span>Trainer Matching</span>
                </div>

                <div 
                  className={`feature-toggle-card ${formData.features.unlimitedFoodTracking ? 'selected' : ''}`}
                  onClick={() => setFormData({
                    ...formData,
                    features: { ...formData.features, unlimitedFoodTracking: !formData.features.unlimitedFoodTracking }
                  })}
                >
                  <input
                    type="checkbox"
                    checked={formData.features.unlimitedFoodTracking}
                    onChange={() => {}}
                  />
                  <span>Unlimited Food Tracking</span>
                </div>
              </div>

              <div className="sub-modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit" disabled={submitting}>
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
