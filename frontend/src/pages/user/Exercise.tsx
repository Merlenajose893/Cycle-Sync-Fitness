import React, { useEffect, useState } from 'react';
import { Search, Dumbbell, Flame, TrendingUp, Calendar, ChevronRight, Activity, Info, RefreshCw, CheckCircle } from 'lucide-react';
import '../../styles/UserPages.css';
import type { WorkoutProgram } from '../../types/workout.types';
import { workoutProgramService } from '../../services/workout/workoutProgramService';

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
  const [activeTab, setActiveTab] = useState<'workouts' | 'history'>('workouts');
  const [activeProgram, setActiveProgram] = useState<WorkoutProgram | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const [historyLogs] = useState<WorkoutLogItem[]>([]);

  useEffect(() => {
    const fetchActiveProgram = async () => {
      setLoading(true);
      try {
        const program = await workoutProgramService.getActivePrograms();
        setActiveProgram(program);
      } catch (err) {
        console.error("Failed to fetch active workout program:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveProgram();
  }, []);

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

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
              <RefreshCw size={28} className="spin-icon" style={{ marginBottom: 12 }} />
              <p>Loading assigned workout program...</p>
            </div>
          ) : activeProgram ? (
            <div className="up-card" style={{ padding: 24, marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <span style={{ padding: '4px 10px', background: '#dbeafe', color: '#2563eb', borderRadius: 12, fontSize: '0.75rem', fontWeight: 700 }}>
                    {activeProgram.phase || 'FOLLICULAR'} PHASE SYNC
                  </span>
                  <h2 style={{ margin: '8px 0 4px', fontSize: '1.4rem' }}>{activeProgram.title}</h2>
                </div>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.5, marginBottom: 24 }}>
                {activeProgram.description || 'Customized workout program created by your personal trainer.'}
              </p>

              {/* Days list */}
              {activeProgram.days && activeProgram.days.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {activeProgram.days.map((day: any, idx: number) => (
                    <div key={idx} style={{ padding: 16, borderRadius: 12, background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <h4 style={{ margin: '0 0 12px', fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                        Day {day.dayNumber || idx + 1}: {day.title || 'Routine'}
                      </h4>
                      {day.exercises && day.exercises.length > 0 ? (
                        <div style={{ display: 'grid', gap: 10 }}>
                          {day.exercises.map((ex: any, exIdx: number) => (
                            <div key={exIdx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'rgba(0, 0, 0, 0.15)', borderRadius: 8 }}>
                              <div>
                                <span style={{ fontWeight: 600, color: 'var(--text-primary)', display: 'block' }}>{ex.name}</span>
                                {ex.notes && <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{ex.notes}</span>}
                              </div>
                              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#2563eb' }}>
                                {ex.sets} sets × {ex.reps} reps
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Rest day or custom mobility recovery.</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Your trainer will be adding daily exercises to this program shortly.</p>
              )}
            </div>
          ) : (
            <div className="up-card" style={{ textAlign: 'center', padding: '48px 24px', background: '#f8fafc', border: '1px dashed #cbd5e1' }}>
              <Activity size={48} style={{ color: '#94a3b8', marginBottom: 12 }} />
              <h3 style={{ margin: 0, color: '#334155', fontSize: '1.1rem', fontWeight: 700 }}>No Trainer Workouts Assigned Yet</h3>
              <p style={{ margin: '8px 0 0', color: '#64748b', fontSize: '0.88rem', maxWidth: 460, marginInline: 'auto' }}>
                Workouts and exercise routines created by your trainer will automatically appear here once assigned to your profile.
              </p>
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
