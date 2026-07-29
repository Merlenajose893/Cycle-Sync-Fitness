import React, { useState } from 'react';
import { Search, Plus, Dumbbell, Clock, Flame, TrendingUp, Calendar, ChevronRight, Play } from 'lucide-react';
import '../../styles/UserPages.css';

const workouts = [
  { id: '1', title: 'Upper Body Strength', type: 'Strength', duration: '45 min', calories: 320, muscles: ['Chest', 'Shoulders', 'Triceps'], exercises: 6, image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&h=300&fit=crop' },
  { id: '2', title: 'HIIT Cardio Blast', type: 'Cardio', duration: '30 min', calories: 450, muscles: ['Full Body'], exercises: 8, image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=300&fit=crop' },
  { id: '3', title: 'Yoga Flow - Recovery', type: 'Flexibility', duration: '40 min', calories: 180, muscles: ['Core', 'Hips', 'Back'], exercises: 12, image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=300&fit=crop' },
  { id: '4', title: 'Leg Day Power', type: 'Strength', duration: '50 min', calories: 380, muscles: ['Quads', 'Hamstrings', 'Glutes'], exercises: 7, image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=600&h=300&fit=crop' },
  { id: '5', title: 'Core & Abs Sculpt', type: 'Strength', duration: '25 min', calories: 200, muscles: ['Core', 'Obliques'], exercises: 10, image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=300&fit=crop' },
  { id: '6', title: 'Morning Run Protocol', type: 'Cardio', duration: '35 min', calories: 350, muscles: ['Legs', 'Cardiovascular'], exercises: 1, image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&h=300&fit=crop' },
];

const recentLogs = [
  { date: 'Today', workout: 'Upper Body Strength', duration: '48 min', calories: 335 },
  { date: 'Yesterday', workout: 'HIIT Cardio Blast', duration: '32 min', calories: 460 },
  { date: 'Jul 26', workout: 'Yoga Flow - Recovery', duration: '40 min', calories: 175 },
];

const Exercise: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'workouts' | 'history'>('workouts');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = workouts.filter(w => {
    const matchSearch = w.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || w.type === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="up-page">
      <div className="up-page-header">
        <div><h1>Exercise</h1><p>Browse workouts and track your progress</p></div>
        <button className="up-btn up-btn-primary"><Plus size={16} /> Log Workout</button>
      </div>

      <div className="up-tabs">
        <button className={`up-tab ${activeTab === 'workouts' ? 'active' : ''}`} onClick={() => setActiveTab('workouts')}>
          <Dumbbell size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />Workouts
        </button>
        <button className={`up-tab ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
          <Calendar size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />History
        </button>
      </div>

      {activeTab === 'workouts' && (
        <>
          <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
            <div className="up-search" style={{ flex: 1, marginBottom: 0 }}>
              <Search size={18} className="up-search-icon" />
              <input placeholder="Search workouts..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            {['All', 'Strength', 'Cardio', 'Flexibility'].map(f => (
              <button key={f} className={`up-btn up-btn-sm ${filter === f ? 'up-btn-primary' : ''}`} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>

          <div className="up-exercise-grid">
            {filtered.map(w => (
              <div key={w.id} className="up-card up-exercise-card">
                <div style={{ height: 160, overflow: 'hidden' }}>
                  <img src={w.image} alt={w.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
                </div>
                <div className="up-exercise-card-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3>{w.title}</h3>
                    <span style={{ padding: '3px 10px', background: w.type === 'Strength' ? '#dbeafe' : w.type === 'Cardio' ? '#fef3c7' : '#ede9fe', color: w.type === 'Strength' ? '#2563eb' : w.type === 'Cardio' ? '#d97706' : '#7c3aed', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700 }}>{w.type}</span>
                  </div>
                  <div className="up-exercise-meta">
                    <span><Clock size={14} /> {w.duration}</span>
                    <span><Flame size={14} /> {w.calories} kcal</span>
                    <span><Dumbbell size={14} /> {w.exercises} exercises</span>
                  </div>
                  <div className="up-exercise-tags">
                    {w.muscles.map((m, i) => <span key={i} className="up-exercise-tag">{m}</span>)}
                  </div>
                </div>
                <div className="up-exercise-footer">
                  <button className="up-btn up-btn-sm"><Play size={14} /> Start</button>
                  <button className="up-btn up-btn-sm up-btn-primary"><Plus size={14} /> Log</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'history' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
            <div className="up-card up-stat-card">
              <div className="up-stat-icon blue"><Dumbbell size={24} /></div>
              <div className="up-stat-content"><div className="label">This Week</div><div className="value">4</div><div className="change">+1 from last week</div></div>
            </div>
            <div className="up-card up-stat-card">
              <div className="up-stat-icon orange"><Flame size={24} /></div>
              <div className="up-stat-content"><div className="label">Calories Burned</div><div className="value">1,430</div><div className="change">↑ 12%</div></div>
            </div>
            <div className="up-card up-stat-card">
              <div className="up-stat-icon green"><TrendingUp size={24} /></div>
              <div className="up-stat-content"><div className="label">Streak</div><div className="value">7 days</div><div className="change">Personal best!</div></div>
            </div>
          </div>

          {recentLogs.map((log, i) => (
            <div key={i} className="up-card" style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12, cursor: 'pointer' }}>
              <div className="up-stat-icon blue" style={{ width: 44, height: 44 }}><Dumbbell size={20} /></div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, margin: '0 0 2px' }}>{log.workout}</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>{log.date} • {log.duration} • {log.calories} kcal</p>
              </div>
              <ChevronRight size={18} style={{ color: 'var(--text-muted)' }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Exercise;
