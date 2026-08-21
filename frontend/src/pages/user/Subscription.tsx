import React, { useState, useEffect } from 'react';
import { Check, Sparkles, Zap, Crown, Loader2, AlertCircle } from 'lucide-react';
import type { subscriptionPlanService, ISubscriptionPlanFrontend } from '../../services/subscriptionPlanService';
import '../../styles/UserPages.css';

const defaultFallbackPlans = [
  {
    name: 'Basic', price: 'Free', period: '', icon: Zap, featured: false,
    features: ['Basic workout logging', 'Food tracking (5 items/day)', 'Weekly reports', 'Community access'],
    missing: ['AI Plan Generation', 'Trainer Matching', 'Cycle Sync Insights', 'Priority Support'],
  },
  {
    name: 'Premium', price: '₹999', period: '/month', icon: Sparkles, featured: true,
    features: ['Unlimited workout logging', 'Full food tracking', 'AI-powered plans', 'Cycle-synced insights', 'Trainer matching', 'Advanced reports', 'Priority support'],
    missing: ['Dedicated coach', 'Custom meal plans'],
  },
  {
    name: 'Elite', price: '₹2,499', period: '/month', icon: Crown, featured: false,
    features: ['Everything in Premium', 'Dedicated personal coach', 'Custom meal plans', '1-on-1 video sessions', 'Hormone panel analysis', 'VIP community', '24/7 chat support'],
    missing: [],
  },
];

const getIconForTier = (tier: string) => {
  switch (tier.toLowerCase()) {
    case 'elite': return Crown;
    case 'premium': return Sparkles;
    default: return Zap;
  }
};

const Subscription: React.FC = () => {
  const [plans, setPlans] = useState<ISubscriptionPlanFrontend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submittingPlanId, setSubmittingPlanId] = useState<string | null>(null);
  const [activePlan] = useState('Basic');

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await subscriptionPlanService.getActivePlans();
      setPlans(data);
    } catch (err: any) {
      console.error('Failed to load subscription plans:', err);
      setError('Unable to load subscription plans right now.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId: string) => {
    try {
      setSubmittingPlanId(planId);
      const res = await subscriptionPlanService.createSubscriptionCheckout(planId);
      if (res.checkoutUrl) {
        window.location.href = res.checkoutUrl;
      }
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to initiate checkout session.');
    } finally {
      setSubmittingPlanId(null);
    }
  };

  return (
    <div className="up-page">
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: 8 }}>Choose Your Plan</h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto' }}>
          Unlock the full power of CycleSync AI to optimize your fitness journey
        </p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
          <Loader2 size={36} className="animate-spin" style={{ color: 'var(--primary)' }} />
        </div>
      ) : error || plans.length === 0 ? (
        <div className="up-plans-grid">
          {defaultFallbackPlans.map((plan, i) => (
            <div key={i} className={`up-card up-plan-card ${plan.featured ? 'featured' : ''}`}>
              {plan.featured && <div className="up-plan-badge">POPULAR</div>}
              <div style={{ width: 52, height: 52, borderRadius: 'var(--radius-lg)', background: plan.featured ? 'var(--primary)' : 'var(--bg-primary)', color: plan.featured ? 'white' : 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <plan.icon size={24} />
              </div>
              <h3>{plan.name}</h3>
              <div className="up-plan-price">{plan.price}<span>{plan.period}</span></div>
              <ul className="up-plan-features">
                {plan.features.map((f, fi) => (
                  <li key={fi}><Check size={16} style={{ color: '#22c55e', flexShrink: 0 }} />{f}</li>
                ))}
                {plan.missing.map((f, fi) => (
                  <li key={`m-${fi}`} style={{ color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                    <Check size={16} style={{ color: 'var(--text-muted)', flexShrink: 0, opacity: 0.3 }} />{f}
                  </li>
                ))}
              </ul>
              <button className={`up-btn ${plan.featured ? 'up-btn-primary' : ''}`} style={{ width: '100%', justifyContent: 'center' }}>
                {activePlan === plan.name ? 'Current Plan' : plan.featured ? 'Upgrade Now' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="up-plans-grid">
          {plans.map((plan) => {
            const IconComponent = getIconForTier(plan.tier);
            const isFeatured = plan.tier === 'premium';
            const isSubmitting = submittingPlanId === plan._id;

            return (
              <div key={plan._id} className={`up-card up-plan-card ${isFeatured ? 'featured' : ''}`}>
                {isFeatured && <div className="up-plan-badge">POPULAR</div>}
                <div style={{ width: 52, height: 52, borderRadius: 'var(--radius-lg)', background: isFeatured ? 'var(--primary)' : 'var(--bg-primary)', color: isFeatured ? 'white' : 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <IconComponent size={24} />
                </div>
                <h3>{plan.name}</h3>
                <div className="up-plan-price">
                  ₹{plan.price}
                  <span>/{plan.billingCycle}</span>
                </div>
                <ul className="up-plan-features">
                  <li>
                    <Check size={16} style={{ color: plan.features.aiPlanGeneration ? '#22c55e' : 'var(--text-muted)', flexShrink: 0 }} />
                    AI Plan Generation
                  </li>
                  <li>
                    <Check size={16} style={{ color: plan.features.unlimitedFoodTracking ? '#22c55e' : 'var(--text-muted)', flexShrink: 0 }} />
                    {plan.features.unlimitedFoodTracking ? 'Unlimited Food Tracking' : `Food Tracking (${plan.features.maxDailyFoodLogs} logs/day)`}
                  </li>
                  <li>
                    <Check size={16} style={{ color: plan.features.cycleSyncInsights ? '#22c55e' : 'var(--text-muted)', flexShrink: 0 }} />
                    Cycle Sync Insights
                  </li>
                  <li>
                    <Check size={16} style={{ color: plan.features.trainerMatching ? '#22c55e' : 'var(--text-muted)', flexShrink: 0 }} />
                    Trainer Matching
                  </li>
                </ul>
                <button
                  onClick={() => handleSubscribe(plan._id)}
                  disabled={isSubmitting}
                  className={`up-btn ${isFeatured ? 'up-btn-primary' : ''}`}
                  style={{ width: '100%', justifyContent: 'center', cursor: 'pointer' }}
                >
                  {isSubmitting ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    isFeatured ? 'Upgrade Now' : 'Get Started'
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Subscription;
