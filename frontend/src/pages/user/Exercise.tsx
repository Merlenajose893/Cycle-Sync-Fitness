import React, { useEffect, useState } from 'react';
import { Search, Dumbbell, Flame, TrendingUp, Calendar, ChevronRight, Activity, Info } from 'lucide-react';
import '../../styles/UserPages.css';
import { WorkoutProgram } from '../../types/workout.types';
import { userAssignmentService } from '../../services/assignment/userAssignmentService';

export interface ExerciseItem {
  id: string;
  title: string;
  type: string;
  duration: string;
  calories: number;
  muscles: string[];
  exercisesCount: number;
  image?: string;
}

export interface WorkoutLogItem {
  id: string;
  date: string;
  workoutTitle: string;
  duration: string;
  caloriesBurned: number;
}

const Exercise: React.FC = () => {
  const {getActivePrograms}=userAssignmentService();
  const [activeTab, setActiveTab] = useState<'workouts' | 'history'>('workouts');
  const [activeProgram,setActiveProgram]=useState<WorkoutProgram|null>(null);
  const [loading,setLoading]=useState(false)
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  // Workouts and History start blank (populated dynamically when trainer assigns exercises)
  const [workouts] = useState<ExerciseItem[]>([]);
  const [historyLogs] = useState<WorkoutLogItem[]>([]);

  const filteredWorkouts = workouts.filter((w) => {
    const matchSearch = !search || w.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || w.type === filter;
    return matchSearch && matchFilter;
  });

  useEffect


  return (
    <div className="up-page">
      <div className="up-page-header">
        <div>
          <h1>Exercise & Workouts</h1>
          <p>View workouts created by your trainer and track your exercise logs</p>
        </div>
      </div>

      <div className="up-tabs">
        <button className={`up-tab ${activeTab === 'workouts' ? 'active' : ''}`} onClick={() => setActiveTab('workouts')}>
          <Dumbbell size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />Trainer Workouts
        </button>
        <button className={`up-tab ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
          <Calendar size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />Exercise History
        </button>
      </div>

      {/* ═══════════ WORKOUTS TAB ═══════════ */}
      {activeTab === 'workouts' && (
        <>
          <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
            <div className="up-search" style={{ flex: 1, marginBottom: 0 }}>
              <Search size={18} className="up-search-icon" />
              <input placeholder="Search trainer workouts..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            {['All', 'Strength', 'Cardio', 'Flexibility'].map((f) => (
              <button key={f} className={`up-btn up-btn-sm ${filter === f ? 'up-btn-primary' : ''}`} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>

          {filteredWorkouts.length === 0 ? (
            <div className="up-card" style={{ textAlign: 'center', padding: '48px 24px', background: '#f8fafc', border: '1px dashed #cbd5e1' }}>
              <Activity size={48} style={{ color: '#94a3b8', marginBottom: 12 }} />
              <h3 style={{ margin: 0, color: '#334155', fontSize: '1.1rem', fontWeight: 700 }}>No Trainer Workouts Assigned Yet</h3>
              <p style={{ margin: '8px 0 0', color: '#64748b', fontSize: '0.88rem', maxWidth: 460, marginInline: 'auto' }}>
                Workouts and exercise routines created by your trainer will automatically appear here once assigned to your profile.
              </p>
            </div>
          ) : (
            <div className="up-exercise-grid">
              {filteredWorkouts.map((w) => (
                <div key={w.id} className="up-card up-exercise-card">
                  {w.image && (
                    <div style={{ height: 160, overflow: 'hidden' }}>
                      <img src={w.image} alt={w.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <div className="up-exercise-card-body">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h3>{w.title}</h3>
                      <span style={{ padding: '3px 10px', background: '#dbeafe', color: '#2563eb', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>{w.type}</span>
                    </div>
                    <div className="up-exercise-meta">
                      <span><Dumbbell size={14} /> {w.duration}</span>
                      <span><Flame size={14} /> {w.calories} kcal</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ═══════════ HISTORY TAB ═══════════ */}
      {activeTab === 'history' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
            <div className="up-card up-stat-card">
              <div className="up-stat-icon blue"><Dumbbell size={24} /></div>
              <div className="up-stat-content"><div className="label">This Week</div><div className="value">{historyLogs.length}</div><div className="change">Workouts logged</div></div>
            </div>
            <div className="up-card up-stat-card">
              <div className="up-stat-icon orange"><Flame size={24} /></div>
              <div className="up-stat-content">
                <div className="label">Calories Burned</div>
                <div className="value">{historyLogs.reduce((acc, l) => acc + (l.caloriesBurned || 0), 0)}</div>
                <div className="change">Total kcal</div>
              </div>
            </div>
            <div className="up-card up-stat-card">
              <div className="up-stat-icon green"><TrendingUp size={24} /></div>
              <div className="up-stat-content"><div className="label">Streak</div><div className="value">{historyLogs.length > 0 ? 'Active' : '0 days'}</div></div>
            </div>
          </div>

          {historyLogs.length === 0 ? (
            <div className="up-card" style={{ textAlign: 'center', padding: '40px 24px', background: '#f8fafc', border: '1px dashed #cbd5e1' }}>
              <Info size={36} style={{ color: '#94a3b8', marginBottom: 8 }} />
              <p style={{ fontWeight: 600, color: '#475569', margin: 0 }}>No Exercise History Logged</p>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: 4 }}>
                Your completed workout logs will be listed here.
              </p>
            </div>
          ) : (
            historyLogs.map((log) => (
              <div key={log.id} className="up-card" style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                <div className="up-stat-icon blue" style={{ width: 44, height: 44 }}><Dumbbell size={20} /></div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600, margin: '0 0 2px' }}>{log.workoutTitle}</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>{log.date} • {log.duration} • {log.caloriesBurned} kcal</p>
                </div>
                <ChevronRight size={18} style={{ color: 'var(--text-muted)' }} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Exercise;
