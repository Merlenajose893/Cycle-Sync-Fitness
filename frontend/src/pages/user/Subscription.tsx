import React, { useState, useEffect, useMemo } from 'react';
import { Check, Sparkles, Zap, Crown, Loader2, AlertCircle, RefreshCw, XCircle } from 'lucide-react';
import type { ISubscriptionPlanFrontend } from '../../services/subscriptionPlanService';
import { subscriptionPlanService } from '../../services/subscriptionPlanService';
import { useUserAuth } from '../../hooks/auth/useUserAuth';
import '../../styles/UserPages.css';

// Helper to get tier icon dynamically
const getIconForTier = (tier: string) => {
  switch (tier.toLowerCase()) {
    case 'elite':
      return Crown;
    case 'premium':
      return Sparkles;
    default:
      return Zap;
  }
};

// Helper to format currency dynamically
const formatPrice = (price: number, currency: string = 'INR') => {
  if (price === 0) return 'Free';
  const symbol = currency.toUpperCase() === 'INR' ? '₹' : currency.toUpperCase() === 'USD' ? '$' : `${currency} `;
  return `${symbol}${price.toLocaleString()}`;
};

// Helper to construct dynamic user-friendly feature list items from backend plan data
const buildFeatureList = (plan: ISubscriptionPlanFrontend) => {
  const items: Array<{ text: string; enabled: boolean }> = [];

  if (plan.features) {
    items.push({
      text: plan.features.aiPlanGeneration ? 'AI Plan Generation included' : 'AI Plan Generation',
      enabled: Boolean(plan.features.aiPlanGeneration),
    });

    items.push({
      text: plan.features.unlimitedFoodTracking
        ? 'Unlimited Food Tracking'
        : `Food Tracking (${plan.features.maxDailyFoodLogs || 5} logs/day)`,
      enabled: true,
    });

    items.push({
      text: 'Cycle Sync Insights',
      enabled: Boolean(plan.features.cycleSyncInsights),
    });

    items.push({
      text: 'Trainer Matching',
      enabled: Boolean(plan.features.trainerMatching),
    });
  }

  return items;
};

const Subscription: React.FC = () => {
  const [plans, setPlans] = useState<ISubscriptionPlanFrontend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submittingPlanId, setSubmittingPlanId] = useState<string | null>(null);
  const [selectedCycle, setSelectedCycle] = useState<'monthly' | 'annual'>('monthly');
  const [userActiveTier, setUserActiveTier] = useState<string>('basic');

  const { getUser } = useUserAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch user active subscription tier dynamically
      const currentUser = await getUser();
      if (currentUser?.subscription?.status) {
        setUserActiveTier(currentUser.subscription.status.toLowerCase());
      }

      // 2. Fetch active plans directly from backend database
      const data = await subscriptionPlanService.getActivePlans();
      setPlans(data || []);
    } catch (err: any) {
      console.error('Failed to load subscription plans:', err);
      setError('Unable to load subscription plans right now. Please try again.');
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

  // Filter plans based on selected billing cycle
  const displayedPlans = useMemo(() => {
    if (plans.length === 0) return [];

    const cycleFiltered = plans.filter((p) => p.billingCycle?.toLowerCase() === selectedCycle);
    return cycleFiltered.length > 0 ? cycleFiltered : plans;
  }, [plans, selectedCycle]);

  // Check if any annual plan exists to render billing cycle toggle
  const hasAnnualPlans = useMemo(() => {
    return plans.some((p) => p.billingCycle?.toLowerCase() === 'annual');
  }, [plans]);

  return (
    <div className="up-page">
      {/* Header Section */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 900, marginBottom: 8, letterSpacing: '-0.02em' }}>
          Choose Your Membership Plan
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: 540, margin: '0 auto' }}>
          Unlock AI-driven workouts, phase-aligned meal logging, and specialized coaching tailored to your cycle.
        </p>

        {/* Dynamic Billing Cycle Selector */}
        {hasAnnualPlans && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'var(--bg-secondary, #f1f5f9)',
              padding: '4px',
              borderRadius: '9999px',
              marginTop: '24px',
              border: '1px solid var(--border-color, #e2e8f0)',
            }}
          >
            <button
              onClick={() => setSelectedCycle('monthly')}
              style={{
                padding: '8px 20px',
                borderRadius: '9999px',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: selectedCycle === 'monthly' ? 'var(--primary, #6366f1)' : 'transparent',
                color: selectedCycle === 'monthly' ? '#ffffff' : 'var(--text-secondary, #64748b)',
              }}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setSelectedCycle('annual')}
              style={{
                padding: '8px 20px',
                borderRadius: '9999px',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: selectedCycle === 'annual' ? 'var(--primary, #6366f1)' : 'transparent',
                color: selectedCycle === 'annual' ? '#ffffff' : 'var(--text-secondary, #64748b)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              Annual Billing
              <span
                style={{
                  fontSize: '0.7rem',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  background: selectedCycle === 'annual' ? '#ffffff' : '#22c55e',
                  color: selectedCycle === 'annual' ? 'var(--primary, #6366f1)' : '#ffffff',
                  fontWeight: 700,
                }}
              >
                SAVE 20%
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Error Alert Bar with Retry */}
      {error && (
        <div
          style={{
            maxWidth: 600,
            margin: '0 auto 24px',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md, 8px)',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between',
            color: '#ef4444',
            fontSize: '0.9rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchData}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              background: 'none',
              border: 'none',
              color: '#ef4444',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
            }}
          >
            <RefreshCw size={14} /> Retry
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 0', gap: 12 }}>
          <Loader2 size={40} className="animate-spin" style={{ color: 'var(--primary)' }} />
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Loading subscription plans...</p>
        </div>
      ) : displayedPlans.length === 0 ? (
        /* Empty State when admin has not created any plans yet */
        <div
          style={{
            textAlign: 'center',
            padding: '48px 24px',
            background: 'var(--bg-secondary, #f8fafc)',
            borderRadius: 'var(--radius-lg, 12px)',
            maxWidth: 480,
            margin: '0 auto',
            border: '1px dashed var(--border-color, #cbd5e1)',
          }}
        >
          <Sparkles size={40} style={{ color: 'var(--primary, #6366f1)', marginBottom: 12, opacity: 0.8 }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 6 }}>No Active Plans Found</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            There are currently no active subscription plans configured. Please check back soon or contact support.
          </p>
        </div>
      ) : (
        /* Dynamic Admin Plans Grid */
        <div className="up-plans-grid">
          {displayedPlans.map((plan) => {
            const IconComponent = getIconForTier(plan.tier || 'basic');
            const isFeatured = plan.tier?.toLowerCase() === 'premium';
            const isCurrentPlan = userActiveTier === plan.tier?.toLowerCase();
            const isSubmitting = submittingPlanId === plan._id;
            const featuresList = buildFeatureList(plan);

            return (
              <div
                key={plan._id}
                className={`up-card up-plan-card ${isFeatured ? 'featured' : ''}`}
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                  border: isCurrentPlan ? '2px solid #22c55e' : undefined,
                }}
              >
                {/* Popular / Active Badges */}
                {isCurrentPlan ? (
                  <div className="up-plan-badge" style={{ background: '#22c55e', color: '#fff' }}>
                    YOUR CURRENT PLAN
                  </div>
                ) : (
                  isFeatured && <div className="up-plan-badge">POPULAR</div>
                )}

                <div>
                  {/* Tier Icon */}
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 'var(--radius-lg, 12px)',
                      background: isFeatured ? 'var(--primary, #6366f1)' : 'var(--bg-primary, #f8fafc)',
                      color: isFeatured ? '#ffffff' : 'var(--primary, #6366f1)',
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'center',
                      margin: '0 auto 16px',
                    }}
                  >
                    <IconComponent size={26} />
                  </div>

                  {/* Plan Name */}
                  <h3 style={{ textAlign: 'center', fontSize: '1.35rem', fontWeight: 700, marginBottom: 8 }}>
                    {plan.name}
                  </h3>

                  {/* Dynamic Price */}
                  <div className="up-plan-price" style={{ textAlign: 'center', marginBottom: 20 }}>
                    {formatPrice(plan.price || 0, plan.currency)}
                    {plan.price > 0 && (
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        /{plan.billingCycle || 'month'}
                      </span>
                    )}
                  </div>

                  {/* Dynamic Features List */}
                  <ul className="up-plan-features" style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0' }}>
                    {featuresList.map((feature, fi) => (
                      <li
                        key={fi}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          marginBottom: 10,
                          fontSize: '0.9rem',
                          color: feature.enabled ? 'var(--text-primary)' : 'var(--text-muted)',
                          textDecoration: feature.enabled ? 'none' : 'line-through',
                        }}
                      >
                        {feature.enabled ? (
                          <Check size={18} style={{ color: '#22c55e', flexShrink: 0 }} />
                        ) : (
                          <XCircle size={18} style={{ color: 'var(--text-muted)', flexShrink: 0, opacity: 0.4 }} />
                        )}
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Call to Action Button */}
                <button
                  onClick={() => handleSubscribe(plan._id)}
                  disabled={isSubmitting || isCurrentPlan}
                  className={`up-btn ${isFeatured ? 'up-btn-primary' : ''}`}
                  style={{
                    width: '100%',
                    justify: 'center',
                    cursor: isCurrentPlan || isSubmitting ? 'default' : 'pointer',
                    opacity: isCurrentPlan ? 0.7 : 1,
                  }}
                >
                  {isSubmitting ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : isCurrentPlan ? (
                    'Active Plan'
                  ) : isFeatured ? (
                    'Upgrade to Premium'
                  ) : (
                    'Get Started'
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


