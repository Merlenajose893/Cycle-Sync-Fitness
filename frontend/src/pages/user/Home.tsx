import React from 'react';
import { Link } from 'react-router-dom';

import {
  ArrowRight, Sparkles, Activity, Shield,
  Zap, Calendar, Smartphone, ChevronRight,
  Play, CheckCircle2, Star, Quote, UserPlus,
  TrendingUp, Heart, Waves, BrainCircuit, Dumbbell
} from 'lucide-react';
import '../../styles/Landing.css';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-container">
      {/* ── Hero Section (Glassmorphism & High Contrast) ── */}
      <Header/>
      <section className="hero-premium">
        <div className="hero-blur-bg"></div>
        <div className="hero-content">
          <div className="badge-premium animate-slideUp">
            <Sparkles size={14} />
            <span>The Gold Standard of Cycle Syncing</span>
          </div>
          
          <h1 className="hero-title-premium animate-slideUp" style={{ animationDelay: '0.1s' }}>
            Master Your Biology, <br />
            <span className="text-gradient-purple">Elevate Your Life.</span>
          </h1>
          
          <p className="hero-subtitle-premium animate-slideUp" style={{ animationDelay: '0.2s' }}>
            The only AI-driven health & fitness ecosystem that adapts in real-time to your hormonal fluctuations. Train harder, recover smarter, and live in sync.
          </p>
          
          <div className="hero-actions-premium animate-slideUp" style={{ animationDelay: '0.3s' }}>
            <Link to="/register" className="btn btn-premium btn-lg">
              Start Your Journey <ArrowRight size={20} />
            </Link>
            <Link to="/about" className="btn btn-outline btn-lg">
              Watch Demo <Play size={18} fill="currentColor" />
            </Link>
          </div>

          <div className="animate-slideUp" style={{ animationDelay: '0.35s', marginTop: '14px' }}>
            <Link
              to="/trainer-panel/register"
              style={{
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.85)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                borderBottom: '1px solid rgba(255,255,255,0.35)',
                paddingBottom: '2px',
              }}
            >
              <Dumbbell size={13} />
              Are you a coach?&nbsp;
              <span style={{ color: 'white', fontWeight: 700 }}>Join as a Trainer →</span>
            </Link>
          </div>
          
          <div className="hero-social-proof animate-slideUp" style={{ animationDelay: '0.4s' }}>
            <div className="avatar-stack">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100" alt="User" />
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="User" />
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="User" />
            </div>
            <div className="trust-text">
                <div className="stars">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="#FBBF24" color="#FBBF24" />)}
                </div>
                <p>Trusted by 50,000+ high-performing women</p>
            </div>
          </div>
        </div>

        <div className="hero-visual-premium animate-fadeIn">
          <div className="gym-visual-card">
            <img 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200" 
              alt="Premium Gym Experience" 
            />
            {/* Floating Glass Cards */}
            <div className="glass-card g-card-1 animate-float">
                <Activity size={20} color="var(--primary)" />
                <div className="gc-text">
                    <span className="gc-label">Current Phase</span>
                    <span className="gc-val">Follicular (Day 3)</span>
                </div>
            </div>
            <div className="glass-card g-card-2 animate-float" style={{ animationDelay: '1.5s' }}>
                <Zap size={20} color="var(--accent-orange)" />
                <div className="gc-text">
                    <span className="gc-label">Metabolic Rate</span>
                    <span className="gc-val">+12% Optimal</span>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Dynamic Stats (Scroll Optimized) ── */}
      <section className="stats-section-premium">
        <div className="stats-grid">
            <div className="stat-card-premium">
                <span className="stat-val">99%</span>
                <span className="stat-label">Prediction Accuracy</span>
            </div>
            <div className="stat-card-premium">
                <span className="stat-val">2.5M</span>
                <span className="stat-label">Workouts Synced</span>
            </div>
            <div className="stat-card-premium">
                <span className="stat-val">4.9/5</span>
                <span className="stat-label">Community Rating</span>
            </div>
            <div className="stat-card-premium">
                <span className="stat-val">24/7</span>
                <span className="stat-label">AI Life Support</span>
            </div>
        </div>
      </section>

      {/* ── Pillars of Excellence ── */}
      <section className="pillars-section">
        <div className="section-header-premium">
          <h2 className="text-gradient-teal">The Pillars of Your Performance</h2>
          <p>We've engineered every feature to work in perfect harmony with your natural biological clock.</p>
        </div>

        <div className="pillars-grid">
          <div className="pillar-card">
            <div className="pillar-icon blue"><Calendar size={28} /></div>
            <h3>Intelligent Tracking</h3>
            <p>Advanced algorithmic mapping of your cycle that goes beyond just "dates".</p>
            <ul className="pillar-list">
                <li><CheckCircle2 size={16} /> Symptom correlation</li>
                <li><CheckCircle2 size={16} /> Hormone level estimation</li>
            </ul>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon purple"><Dumbbell size={28} /></div>
            <h3>Adaptive Fitness</h3>
            <p>Your workout intensity adjusts automatically based on your current hormone state.</p>
            <ul className="pillar-list">
                <li><CheckCircle2 size={16} /> Phase-specific protocols</li>
                <li><CheckCircle2 size={16} /> Recovery intelligence</li>
            </ul>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon teal"><Waves size={28} /></div>
            <h3>Metabolic Nutrition</h3>
            <p>Sync your macros to your cycle for optimal energy and craving management.</p>
            <ul className="pillar-list">
                <li><CheckCircle2 size={16} /> AI Meal Suggestions</li>
                <li><CheckCircle2 size={16} /> Micronutrient density</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── AI Daily Protocol Preview ── */}
      <section className="ai-preview-section">
        <div className="ai-preview-card glassmorphism">
            <div className="ai-header">
                <div className="ai-chip"><BrainCircuit size={16} /> AI Protocol</div>
                <h3>Personalized Insight for Tuesday</h3>
            </div>
            <p className="ai-quote">"Your progesterone levels are rising. Today is the optimal time for slow-burn resistance training and increased complex carbohydrate intake."</p>
            <div className="ai-actions">
                <div className="ai-action-item">
                    <TrendingUp size={20} color="var(--primary)" />
                    <span>Focus: Strength & Recovery</span>
                </div>
                <div className="ai-action-item">
                    <Heart size={20} color="var(--accent-pink)" />
                    <span>Metabolism: Peaks in 48h</span>
                </div>
            </div>
        </div>
      </section>

      {/* ── Final CTA (High Urgency) ── */}
      <section className="final-cta-premium">
         <div className="cta-glass-container">
            <h2>Ready to transform your <span className="text-gradient-purple">Rhythm?</span></h2>
            <p>Join the movement of thousands of women reclaiming their peak performance through cycle intelligence.</p>
            <div className="cta-actions-premium">
                <Link to="/register" className="btn btn-premium btn-lg">Start Free Trial</Link>
                <Link
                  to="/trainer-panel/register"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 28px',
                    borderRadius: 'var(--radius-full)',
                    border: '2px solid rgba(255,255,255,0.7)',
                    background: 'transparent',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1rem',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.15)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
                >
                  <Dumbbell size={18} /> Join as Trainer
                </Link>
            </div>
         </div>
      </section>
      <Footer/>
    </div>
  );
};

export default LandingPage;
