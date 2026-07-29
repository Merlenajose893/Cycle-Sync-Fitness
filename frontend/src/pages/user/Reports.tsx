import React, { useState } from 'react';
import { BarChart3, TrendingUp, Flame, Dumbbell, Droplets, Scale, Calendar, Download } from 'lucide-react';
import '../../styles/UserPages.css';

const stats = [
  { label: 'Avg Daily Calories', value: '1,650', change: '+5% vs last week', icon: Flame, color: 'orange' as const },
  { label: 'Workouts This Week', value: '4', change: '+1 from last week', icon: Dumbbell, color: 'blue' as const },
  { label: 'Weight Trend', value: '62.5 kg', change: '-0.3 kg this month', icon: Scale, color: 'green' as const },
  { label: 'Water Intake', value: '2.1 L', change: '87% of daily goal', icon: Droplets, color: 'purple' as const },
];

const weeklyData = [
  { day: 'Mon', cal: 1700, target: 1800 }, { day: 'Tue', cal: 1500, target: 1800 },
  { day: 'Wed', cal: 1900, target: 1800 }, { day: 'Thu', cal: 1650, target: 1800 },
  { day: 'Fri', cal: 1800, target: 1800 }, { day: 'Sat', cal: 2100, target: 1800 },
  { day: 'Sun', cal: 1400, target: 1800 },
];

const Reports: React.FC = () => {
  const [period, setPeriod] = useState('week');
  const maxCal = Math.max(...weeklyData.map(d => Math.max(d.cal, d.target)));

  return (
    <div className="up-page">
      <div className="up-page-header">
        <div><h1>Reports</h1><p>Track your progress and insights</p></div>
        <div className="up-header-actions">
          {['week', 'month', '3months'].map(p => (
            <button key={p} className={`up-btn up-btn-sm ${period === p ? 'up-btn-primary' : ''}`} onClick={() => setPeriod(p)}>
              {p === 'week' ? 'Week' : p === 'month' ? 'Month' : '3 Months'}
            </button>
          ))}
          <button className="up-btn"><Download size={16} /> Export</button>
        </div>
      </div>

      <div className="up-reports-grid">
        {stats.map((s, i) => (
          <div key={i} className="up-card up-stat-card">
            <div className={`up-stat-icon ${s.color}`}><s.icon size={24} /></div>
            <div className="up-stat-content"><div className="label">{s.label}</div><div className="value">{s.value}</div><div className="change">{s.change}</div></div>
          </div>
        ))}
      </div>

      <div className="up-card" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}><BarChart3 size={18} /> Calorie Intake vs Target</h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 200, padding: '0 12px' }}>
          {weeklyData.map((d, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ width: '100%', display: 'flex', gap: 4, alignItems: 'flex-end', justifyContent: 'center', height: 160 }}>
                <div style={{ width: '40%', height: `${(d.cal / maxCal) * 100}%`, background: 'var(--primary)', borderRadius: '4px 4px 0 0', transition: 'height 0.5s', minHeight: 4 }} />
                <div style={{ width: '40%', height: `${(d.target / maxCal) * 100}%`, background: 'var(--border)', borderRadius: '4px 4px 0 0', minHeight: 4 }} />
              </div>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>{d.day}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 16 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem' }}><span style={{ width: 12, height: 12, background: 'var(--primary)', borderRadius: 3 }} /> Actual</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem' }}><span style={{ width: 12, height: 12, background: 'var(--border)', borderRadius: 3 }} /> Target</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div className="up-card">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}><TrendingUp size={18} /> Weight Progress</h3>
          <div className="up-chart-placeholder"><Calendar size={24} style={{ marginRight: 8 }} /> Weight chart coming soon</div>
        </div>
        <div className="up-card">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}><Dumbbell size={18} /> Workout Consistency</h3>
          <div className="up-chart-placeholder"><BarChart3 size={24} style={{ marginRight: 8 }} /> Workout chart coming soon</div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
