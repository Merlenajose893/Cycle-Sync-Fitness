import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  MessageSquare,
  ClipboardList,
  Calendar,
  TrendingUp,
  Dumbbell,
  UtensilsCrossed,
  Clock,
  Plus,
  ChevronRight,
  Zap,
  Heart,
  Moon,
  Droplets,
} from 'lucide-react';
import '../../styles/TrainerPanel.css';

/* ──────────────────────────────────────────────
   Static data for Week 1 (auth + onboarding only)
   Replace with real API data in later weeks
   ────────────────────────────────────────────── */

const stats = [
  {
    label: 'Total Clients',
    value: 0,
    change: 'No clients yet',
    icon: Users,
    color: 'teal' as const,
  },
  {
    label: 'New Messages',
    value: 0,
    change: 'No messages yet',
    icon: MessageSquare,
    color: 'blue' as const,
  },
  {
    label: 'Workout Plans',
    value: 0,
    change: 'Create your first plan',
    icon: ClipboardList,
    color: 'purple' as const,
  },
  {
    label: "Today's Sessions",
    value: 0,
    change: 'No sessions scheduled',
    icon: Calendar,
    color: 'orange' as const,
  },
];

const cyclePhases = [
  {
    name: 'Follicular',
    tag: 'HIGH ENERGY',
    count: 0,
    color: '#0d9488',
    bg: '#ccfbf1',
    icon: Zap,
    percent: 0,
  },
  {
    name: 'Ovulatory',
    tag: 'PEAK STRENGTH',
    count: 0,
    color: '#d97706',
    bg: '#fef3c7',
    icon: TrendingUp,
    percent: 0,
  },
  {
    name: 'Luteal',
    tag: 'RECOVERY FOCUS',
    count: 0,
    color: '#ef4444',
    bg: '#fee2e2',
    icon: Heart,
    percent: 0,
  },
  {
    name: 'Menstrual',
    tag: 'LOW INTENSITY',
    count: 0,
    color: '#8b5cf6',
    bg: '#ede9fe',
    icon: Droplets,
    percent: 0,
  },
];

const recentConversations: { name: string; initials: string; message: string; time: string; gradient: string }[] = [];

const prioritySessions: { name: string; initials: string; time: string; type: string; status: 'confirmed' | 'pending'; gradient: string }[] = [];

const shortcuts = [
  { label: 'Create Workout', icon: Dumbbell, color: 'teal' as const },
  { label: 'New Recipe', icon: UtensilsCrossed, color: 'orange' as const },
  { label: 'Manage Slots', icon: Clock, color: 'blue' as const, path: '/trainer/slots' },
  { label: 'Assign Plan', icon: Plus, color: 'purple' as const },
];

const TrainerDashboard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="trainer-content">
      {/* ═══ STAT CARDS ═══ */}
      <div className="tp-stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className={`tp-stat-card ${stat.color}`}>
            <div className={`tp-stat-icon ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div className="tp-stat-content">
              <div className="tp-stat-label">{stat.label}</div>
              <div className="tp-stat-value">{stat.value}</div>
              <div className="tp-stat-change" style={{ color: stat.value === 0 ? 'var(--text-muted)' : '#22c55e' }}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ═══ TWO-COLUMN: CYCLE INSIGHTS + RECENT CONVERSATIONS ═══ */}
      <div className="tp-two-col">
        {/* Client Biological Insights */}
        <div className="tp-section">
          <div className="tp-section-header">
            <h2>
              <Heart size={18} style={{ display: 'inline', marginRight: '8px', color: '#0d9488' }} />
              Client Biological Insights
            </h2>
            <span className="tp-view-all">Manage All →</span>
          </div>

          <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
            {cyclePhases.map((phase) => (
              <div
                key={phase.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '20px',
                }}
              >
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: phase.color,
                    flexShrink: 0,
                  }}
                />
                <div style={{ minWidth: '90px' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    {phase.name}
                  </div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 600, color: phase.color, letterSpacing: '0.5px' }}>
                    {phase.tag}
                  </div>
                </div>
                <div style={{ flex: 1, height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${phase.percent}%`,
                      height: '100%',
                      background: phase.color,
                      borderRadius: '4px',
                      transition: 'width 0.8s ease',
                    }}
                  />
                </div>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', minWidth: '24px', textAlign: 'right' }}>
                  {phase.count}
                </span>
              </div>
            ))}

            {/* Empty state */}
            <div style={{
              textAlign: 'center',
              padding: '16px 0 0',
              borderTop: '1px solid var(--border)',
              color: 'var(--text-muted)',
              fontSize: '0.85rem'
            }}>
              <Moon size={20} style={{ margin: '0 auto 8px', display: 'block', opacity: 0.5 }} />
              Client cycle data will appear here once you have active clients
            </div>
          </div>
        </div>

        {/* Recent Conversations */}
        <div className="tp-section">
          <div className="tp-section-header">
            <h2>
              <MessageSquare size={18} style={{ display: 'inline', marginRight: '8px', color: '#0d9488' }} />
              Recent Conversations
            </h2>
            <span className="tp-view-all">Open Inbox →</span>
          </div>

          <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '8px' }}>
            {recentConversations.length > 0 ? (
              recentConversations.map((conv, i) => (
                <div
                  key={i}
                  className="tp-list-card"
                  style={{ border: 'none', cursor: 'pointer', borderRadius: 'var(--radius-md)' }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: conv.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      flexShrink: 0,
                    }}
                  >
                    {conv.initials}
                  </div>
                  <div className="tp-list-content">
                    <h4>{conv.name}</h4>
                    <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {conv.message}
                    </p>
                  </div>
                  <div className="tp-list-meta">
                    <span className="tp-list-time">{conv.time}</span>
                    <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                  </div>
                </div>
              ))
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '48px 20px',
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
              }}>
                <MessageSquare size={32} style={{ margin: '0 auto 12px', display: 'block', opacity: 0.3 }} />
                <p style={{ fontWeight: 600, color: 'var(--text-secondary)', margin: '0 0 4px' }}>No conversations yet</p>
                <p style={{ margin: 0 }}>Messages from your clients will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ═══ TWO-COLUMN: PRIORITY SESSIONS + COACH SHORTCUTS ═══ */}
      <div className="tp-two-col">
        {/* Priority Sessions */}
        <div className="tp-section">
          <div className="tp-section-header">
            <h2>
              <Calendar size={18} style={{ display: 'inline', marginRight: '8px', color: '#0d9488' }} />
              Priority Sessions
            </h2>
          </div>

          <div className="tp-card-list">
            {prioritySessions.length > 0 ? (
              prioritySessions.map((session, i) => (
                <div key={i} className="tp-list-card" style={{ cursor: 'pointer' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: session.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      flexShrink: 0,
                    }}
                  >
                    {session.initials}
                  </div>
                  <div className="tp-list-content">
                    <h4>{session.name}</h4>
                    <p>{session.type}</p>
                  </div>
                  <div className="tp-list-meta">
                    <span className="tp-list-time">
                      <Clock size={12} />
                      {session.time}
                    </span>
                    <span className={`tp-badge ${session.status === 'confirmed' ? 'success' : 'warning'}`}>
                      {session.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div style={{
                background: 'white',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                textAlign: 'center',
                padding: '48px 20px',
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
              }}>
                <Calendar size={32} style={{ margin: '0 auto 12px', display: 'block', opacity: 0.3 }} />
                <p style={{ fontWeight: 600, color: 'var(--text-secondary)', margin: '0 0 4px' }}>No sessions today</p>
                <p style={{ margin: 0 }}>Scheduled sessions will appear here once you have clients</p>
              </div>
            )}
          </div>
        </div>

        {/* Coach Shortcuts */}
        <div className="tp-section">
          <div className="tp-section-header">
            <h2>
              <Zap size={18} style={{ display: 'inline', marginRight: '8px', color: '#d97706' }} />
              Coach Shortcuts
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
          }}>
            {shortcuts.map((shortcut) => {
              const enabled = Boolean(shortcut.path);
              return (
              <button
                key={shortcut.label}
                className="tp-quick-btn"
                style={{
                  flexDirection: 'column',
                  textAlign: 'center',
                  padding: '24px 16px',
                  gap: '12px',
                  opacity: enabled ? 1 : 0.5,
                  cursor: enabled ? 'pointer' : 'not-allowed',
                  position: 'relative',
                }}
                disabled={!enabled}
                title={enabled ? shortcut.label : 'Coming soon'}
                onClick={() => enabled && shortcut.path && navigate(shortcut.path)}
              >
                <div className={`tp-quick-icon ${shortcut.color}`}>
                  <shortcut.icon size={22} />
                </div>
                <span style={{ fontSize: '0.85rem' }}>{shortcut.label}</span>
                {!enabled && (
                <span style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  color: 'white',
                  background: '#94a3b8',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  letterSpacing: '0.5px',
                }}>
                  SOON
                </span>
                )}
              </button>
            );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboard;
