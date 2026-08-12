import React, { useEffect, useState } from 'react';
import { Search, Dumbbell, Flame, TrendingUp, Calendar, ChevronRight, Activity, Info, RefreshCw, Plus, CheckCircle, Clock, X, FileText, Award } from 'lucide-react';
import '../../styles/UserPages.css';
import type { WorkoutProgram } from '../../types/workout.types';
import { workoutProgramService } from '../../services/workout/workoutProgramService';
import { workoutLogService } from '../../services/workout/workoutLogService';
import { showToast } from '../../components/common/Toast/Toast';

const Exercise: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'workouts' | 'history'>('workouts');
  const [activeProgram, setActiveProgram] = useState<WorkoutProgram | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  // History state
  const [historyLogs, setHistoryLogs] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [selectedDetailLog, setSelectedDetailLog] = useState<any | null>(null);

  // Logging Modal State
  const [showLogModal, setShowLogModal] = useState(false);
  const [selectedWorkoutTitle, setSelectedWorkoutTitle] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [caloriesBurned, setCaloriesBurned] = useState(250);
  const [notes, setNotes] = useState('');
  const [submittingLog, setSubmittingLog] = useState(false);
  // Image upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  const fetchHistory = async () => {
    setHistoryLoading(true);
    try {
      const logs = await workoutLogService.getUserLogs();
      setHistoryLogs(logs || []);
    } catch (err) {
      console.error("Failed to fetch workout history:", err);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveProgram();
    fetchHistory();
  }, []);

  const handleOpenLogModal = (title: string) => {
    setSelectedWorkoutTitle(title);
    setSelectedFile(null);
    setImagePreview(null);
    setShowLogModal(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleLogWorkout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWorkoutTitle) return;

    setSubmittingLog(true);
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('date', new Date().toISOString());
        formData.append('source', 'TRAINER_PROGRAM');
        if (activeProgram?._id) formData.append('workoutProgramId', activeProgram._id);
        formData.append('workoutTitle', selectedWorkoutTitle);
        formData.append('durationMinutes', String(durationMinutes));
        formData.append('caloriesBurned', String(caloriesBurned));
        formData.append('notes', notes);
        await workoutLogService.createLog(formData);
      } else {
        await workoutLogService.createLog({
          date: new Date().toISOString(),
          source: 'TRAINER_PROGRAM',
          workoutProgramId: activeProgram?._id,
          workoutTitle: selectedWorkoutTitle,
          durationMinutes,
          caloriesBurned,
          notes,
          exercises: [],
        });
      }

      setShowLogModal(false);
      setNotes('');
      setSelectedFile(null);
      setImagePreview(null);
      fetchHistory();
      setActiveTab('history');
      showToast.success('Workout session logged successfully!');
    } catch (err: any) {
      showToast.error(err.response?.data?.message || 'Failed to log workout.');
    } finally {
      setSubmittingLog(false);
    }
  };

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
                  {activeProgram.days.map((day: any, idx: number) => {
                    const dayTitle = day.title || `Day ${day.dayNumber || idx + 1} Routine`;
                    return (
                      <div key={idx} style={{ padding: 16, borderRadius: 12, background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                          <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                            Day {day.dayNumber || idx + 1}: {dayTitle}
                          </h4>
                          <button
                            className="up-btn up-btn-primary up-btn-sm"
                            onClick={() => handleOpenLogModal(dayTitle)}
                          >
                            <Plus size={14} style={{ marginRight: 4 }} /> Log Session
                          </button>
                        </div>

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
                    );
                  })}
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
      {activeTab === 'history' && (() => {
        const safeHistoryLogs = Array.isArray(historyLogs) ? historyLogs : [];
        return (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
            <div className="up-card up-stat-card">
              <div className="up-stat-icon blue"><Dumbbell size={24} /></div>
              <div className="up-stat-content"><div className="label">Total Logged</div><div className="value">{safeHistoryLogs.length}</div><div className="change">Workouts logged</div></div>
            </div>
            <div className="up-card up-stat-card">
              <div className="up-stat-icon orange"><Flame size={24} /></div>
              <div className="up-stat-content">
                <div className="label">Calories Burned</div>
                <div className="value">{safeHistoryLogs.reduce((acc, l) => acc + (l.caloriesBurned || 0), 0)}</div>
                <div className="change">Total kcal</div>
              </div>
            </div>
            <div className="up-card up-stat-card">
              <div className="up-stat-icon green"><TrendingUp size={24} /></div>
              <div className="up-stat-content"><div className="label">Status</div><div className="value">{safeHistoryLogs.length > 0 ? 'Active' : '0 logs'}</div></div>
            </div>
          </div>

          {historyLoading ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
              <RefreshCw size={24} className="spin-icon" style={{ marginBottom: 8 }} />
              <p>Loading history...</p>
            </div>
          ) : historyLogs.length === 0 ? (
            <div className="up-card" style={{ textAlign: 'center', padding: '40px 24px', background: '#f8fafc', border: '1px dashed #cbd5e1' }}>
              <Info size={36} style={{ color: '#94a3b8', marginBottom: 8 }} />
              <p style={{ fontWeight: 600, color: '#475569', margin: 0 }}>No Exercise History Logged</p>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: 4 }}>
                Your completed workout logs will be listed here.
              </p>
            </div>
          ) : (
            safeHistoryLogs.map((log: any) => (
              <div
                key={log._id || log.id}
                className="up-card"
                onClick={() => setSelectedDetailLog(log)}
                style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12, padding: 16, cursor: 'pointer', transition: 'transform 0.15s ease, border-color 0.15s ease' }}
              >
                {log.imageUrl ? (
                  <img src={log.imageUrl} alt="Workout Proof" style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover', border: '1px solid rgba(255,255,255,0.2)' }} />
                ) : (
                  <div className="up-stat-icon blue" style={{ width: 44, height: 44 }}><CheckCircle size={20} /></div>
                )}
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600, margin: '0 0 2px' }}>{log.workoutTitle}</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                    {log.createdAt ? new Date(log.createdAt).toLocaleDateString() : 'Today'} • {log.durationMinutes || 30} mins • {log.caloriesBurned || 250} kcal
                  </p>
                  {log.notes && <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '4px 0 0', fontStyle: 'italic' }}>"{log.notes}"</p>}
                </div>
                <ChevronRight size={18} style={{ color: 'var(--text-muted)' }} />
              </div>
            ))
          )}
        </div>
        );
      })()}

      {/* Log Workout Modal */}
      {showLogModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, zIndex: 1000 }}>
          <div className="up-card" style={{ width: '100%', maxWidth: 440, padding: 28 }}>
            <h3 style={{ margin: '0 0 16px' }}>Log Session: {selectedWorkoutTitle}</h3>
            <form onSubmit={handleLogWorkout}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: 6, fontWeight: 600 }}>
                  Duration (Minutes)
                </label>
                <input
                  type="number"
                  required
                  min={5}
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-primary)' }}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: 6, fontWeight: 600 }}>
                  Estimated Calories Burned (kcal)
                </label>
                <input
                  type="number"
                  required
                  min={10}
                  value={caloriesBurned}
                  onChange={(e) => setCaloriesBurned(Number(e.target.value))}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-primary)' }}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: 6, fontWeight: 600 }}>
                  Workout Photo / Progress Image (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                />
                {imagePreview && (
                  <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img src={imagePreview} alt="Preview" style={{ width: 60, height: 60, borderRadius: 8, objectFit: 'cover', border: '1px solid #2563eb' }} />
                    <span style={{ fontSize: '0.8rem', color: '#22c55e', fontWeight: 600 }}>Image ready to upload</span>
                  </div>
                )}
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: 6, fontWeight: 600 }}>
                  Notes for Trainer (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="How did the session feel? Any heavy PRs?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-primary)' }}
                />
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <button type="button" className="up-btn" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setShowLogModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="up-btn up-btn-primary" style={{ flex: 1, justifyContent: 'center' }} disabled={submittingLog}>
                  {submittingLog ? 'Submitting...' : 'Save Log'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Workout Detail Modal */}
      {selectedDetailLog && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, zIndex: 1050, backdropFilter: 'blur(4px)' }}>
          <div className="up-card" style={{ width: '100%', maxWidth: 540, maxHeight: '90vh', overflowY: 'auto', padding: 28, position: 'relative' }}>
            <button
              onClick={() => setSelectedDetailLog(null)}
              style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.1)', border: 'none', color: 'var(--text-primary)', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ padding: '4px 10px', background: '#dbeafe', color: '#2563eb', borderRadius: 12, fontSize: '0.75rem', fontWeight: 700 }}>
                {selectedDetailLog.source || 'TRAINER_PROGRAM'}
              </span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {selectedDetailLog.createdAt ? new Date(selectedDetailLog.createdAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }) : 'Today'}
              </span>
            </div>

            <h2 style={{ fontSize: '1.35rem', margin: '0 0 16px', fontWeight: 700 }}>{selectedDetailLog.workoutTitle}</h2>

            {/* Quick stats grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
              <div style={{ padding: 12, borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
                <Clock size={18} style={{ color: '#3b82f6', marginBottom: 4 }} />
                <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>{selectedDetailLog.durationMinutes || 30} mins</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Duration</div>
              </div>
              <div style={{ padding: 12, borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
                <Flame size={18} style={{ color: '#f59e0b', marginBottom: 4 }} />
                <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>{selectedDetailLog.caloriesBurned || 250} kcal</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Calories Burned</div>
              </div>
              <div style={{ padding: 12, borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
                <Dumbbell size={18} style={{ color: '#10b981', marginBottom: 4 }} />
                <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>{selectedDetailLog.totalVolumeKg || 0} kg</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Volume</div>
              </div>
            </div>

            {/* Uploaded session proof image */}
            {selectedDetailLog.imageUrl && (
              <div style={{ marginBottom: 20 }}>
                <h4 style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Award size={16} style={{ color: '#3b82f6' }} /> Session Proof Photo
                </h4>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.15)', maxHeight: 280, background: '#000' }}>
                  <img src={selectedDetailLog.imageUrl} alt="Workout Proof" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
                </div>
              </div>
            )}

            {/* Session Notes */}
            {selectedDetailLog.notes && (
              <div style={{ marginBottom: 20, padding: 14, borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <FileText size={14} /> Session / Trainer Notes
                </h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-primary)', fontStyle: 'italic', lineHeight: 1.5 }}>
                  "{selectedDetailLog.notes}"
                </p>
              </div>
            )}

            {/* Completed exercises list */}
            {selectedDetailLog.exercises && selectedDetailLog.exercises.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 10 }}>Completed Exercises</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {selectedDetailLog.exercises.map((ex: any, idx: number) => (
                    <div key={idx} style={{ padding: 12, borderRadius: 8, background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{ex.exerciseName}</span>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{ex.category}</span>
                      </div>
                      {ex.sets && ex.sets.length > 0 && (
                        <div style={{ fontSize: '0.82rem', color: '#60a5fa' }}>
                          {ex.sets.map((s: any, sIdx: number) => (
                            <span key={sIdx} style={{ marginRight: 12 }}>
                              Set {s.setNumber || sIdx + 1}: {s.repsCompleted} reps {s.weightKg ? `× ${s.weightKg}kg` : ''}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              className="up-btn up-btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
              onClick={() => setSelectedDetailLog(null)}
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exercise;
