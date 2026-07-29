import React, { useState } from 'react';
import { Check, Sparkles, Zap, Crown } from 'lucide-react';
import '../../styles/UserPages.css';

const plans = [
  {
    name: 'Basic', price: 'Free', period: '', icon: Zap, featured: false,
    features: ['Basic workout logging', 'Food tracking (5 items/day)', 'Weekly reports', 'Community access'],
    missing: ['AI Plan Generation', 'Trainer Matching', 'Cycle Sync Insights', 'Priority Support'],
  },
  {
    name: 'Premium', price: '$9.99', period: '/month', icon: Sparkles, featured: true,
    features: ['Unlimited workout logging', 'Full food tracking', 'AI-powered plans', 'Cycle-synced insights', 'Trainer matching', 'Advanced reports', 'Priority support'],
    missing: ['Dedicated coach', 'Custom meal plans'],
  },
  {
    name: 'Elite', price: '$24.99', period: '/month', icon: Crown, featured: false,
    features: ['Everything in Premium', 'Dedicated personal coach', 'Custom meal plans', '1-on-1 video sessions', 'Hormone panel analysis', 'VIP community', '24/7 chat support'],
    missing: [],
  },
];

const Subscription: React.FC = () => {
  const [activePlan] = useState('Basic');

  return (
    <div className="up-page">
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: 8 }}>Choose Your Plan</h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto' }}>
          Unlock the full power of CycleSync AI to optimize your fitness journey
        </p>
      </div>

      <div className="up-plans-grid">
        {plans.map((plan, i) => (
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
    </div>
  );
};

export default Subscription;
