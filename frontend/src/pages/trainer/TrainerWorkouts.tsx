import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Dumbbell, Plus, RefreshCw, CheckCircle, UserCheck } from 'lucide-react';
import { workoutProgramService } from '../../services/workout/workoutProgramService';
import { useTrainerClients } from '../../hooks/trainer/useTrainerClients';
import type { WorkoutProgram } from '../../types/workout.types';
import '../../styles/TrainerPanel.css';

const TrainerWorkouts: React.FC = () => {
  const [searchParams] = useSearchParams();
  const targetClientId = searchParams.get('clientId');

  const [programs, setPrograms] = useState<WorkoutProgram[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [assigningProgramId, setAssigningProgramId] = useState<string | null>(null);
  const [selectedClientForAssign, setSelectedClientForAssign] = useState<string>(targetClientId || '');

  // Form modal state for creating new program
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetPhase, setTargetPhase] = useState<'FOLLICULAR' | 'OVULATORY' | 'LUTEAL' | 'MENSTRUAL'>('FOLLICULAR');
  const [creating, setCreating] = useState(false);

  const { clients, fetchClients } = useTrainerClients();

  const loadPrograms = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await workoutProgramService.getTrainerPrograms();
      setPrograms(data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load workout programs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrograms();
    fetchClients();
  }, [fetchClients]);

  const handleCreateProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || title.length < 3) {
      alert('Program title must be at least 3 characters.');
      return;
    }

    setCreating(true);
    try {
      await workoutProgramService.createProgram({
        title,
        description: description || 'Custom Sync Workout Program',
        durationWeeks: 4,
        daysPerWeek: 3,
        difficulty: 'INTERMEDIATE',
        goal: 'GENERAL_FITNESS',
        days: [
          {
            dayNumber: 1,
            title: 'Day 1 - Core & Strength',
            focusPhase: targetPhase,
            exercises: [
              {
                exerciseName: 'Full Body Compound Circuit',
                category: 'STRENGTH',
                targetSets: 3,
                targetReps: '12 reps',
                restSeconds: 60,
                notes: 'Focus on form and controlled movements',
              },
            ],
          },
        ],
      } as any);
      setShowCreateModal(false);
      setTitle('');
      setDescription('');
      loadPrograms();
    } catch (err: any) {
      const rawMsg = err.response?.data?.message;
      const msg = Array.isArray(rawMsg)
        ? rawMsg.map((m: any) => m.message || m.field || JSON.stringify(m)).join('\n')
        : rawMsg || 'Failed to create program.';
      alert(msg);
    } finally {
      setCreating(false);
    }
  };

  const handleAssign = async (programId: string) => {
    const userIdToAssign = selectedClientForAssign || targetClientId;
    if (!userIdToAssign) {
      alert('Please select a client to assign this program to.');
      return;
    }

    setAssigningProgramId(programId);
    try {
      await workoutProgramService.assignProgram(programId, userIdToAssign);
      alert('Program assigned successfully!');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to assign program.');
    } finally {
      setAssigningProgramId(null);
    }
  };

  return (
    <div className="tp-page">
      <div className="tp-page-header">
        <div>
          <h1>Workout Programs</h1>
          <p>Create personalized fitness plans and assign them to your clients</p>
        </div>
        <button className="tp-btn tp-btn-primary" onClick={() => setShowCreateModal(true)}>
          <Plus size={16} /> Create New Program
        </button>
      </div>

      {/* Target Client Bar */}
      {clients.length > 0 && (
        <div className="tp-card" style={{ padding: '16px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9rem', fontWeight: 600 }}>
            <UserCheck size={18} style={{ color: '#2563eb' }} />
            <span>Select Client to Assign:</span>
          </div>
          <select
            value={selectedClientForAssign}
            onChange={(e) => setSelectedClientForAssign(e.target.value)}
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'var(--text-primary)',
              fontSize: '0.9rem',
              minWidth: 220,
            }}
          >
            <option value="">-- Choose Active Client --</option>
            {clients.map((assignment: any) => {
              const u = assignment.userId;
              return (
                <option key={u?._id} value={u?._id}>
                  {u?.firstName} {u?.lastName} ({assignment.packageId?.packageName || 'Package'})
                </option>
              );
            })}
          </select>
        </div>
      )}

      {loading && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
          <RefreshCw size={28} className="spin-icon" style={{ marginBottom: 12 }} />
          <p>Loading programs...</p>
        </div>
      )}

      {error && !loading && (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#ef4444' }}>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && programs.length === 0 && (
        <div className="tp-card" style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          <Dumbbell size={48} style={{ opacity: 0.5, marginBottom: 16 }} />
          <h2>No Workout Programs Created</h2>
          <p style={{ maxWidth: 420, margin: '0 auto 20px', fontSize: '0.9rem' }}>
            Click "Create New Program" above to start designing programs for your clients.
          </p>
        </div>
      )}

      {!loading && !error && programs.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
          {programs.map((program: WorkoutProgram) => (
            <div key={program._id} className="tp-card" style={{ padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{program.title}</h3>
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: 12,
                      background: 'rgba(37, 99, 235, 0.15)',
                      color: '#2563eb',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                  >
                    {program.phase || 'FOLLICULAR'}
                  </span>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 20 }}>
                  {program.description || 'No description provided.'}
                </p>
              </div>

              <button
                className="tp-btn tp-btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                disabled={assigningProgramId === program._id}
                onClick={() => handleAssign(program._id)}
              >
                <CheckCircle size={16} />
                {assigningProgramId === program._id ? 'Assigning...' : 'Assign to Selected Client'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Create Program Modal */}
      {showCreateModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            zIndex: 1000,
          }}
        >
          <div className="tp-card" style={{ width: '100%', maxWidth: 480, padding: 32 }}>
            <h2 style={{ margin: '0 0 16px' }}>Create New Workout Program</h2>
            <form onSubmit={handleCreateProgram}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: 6, fontWeight: 600 }}>
                  Program Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Strength & Conditioning 4-Week Sync"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: 6, fontWeight: 600 }}>
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Details about the program goals and target outcome..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: 6, fontWeight: 600 }}>
                  Target Cycle Phase
                </label>
                <select
                  value={targetPhase}
                  onChange={(e: any) => setTargetPhase(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <option value="FOLLICULAR">Follicular (High Energy)</option>
                  <option value="OVULATORY">Ovulatory (Peak Strength)</option>
                  <option value="LUTEAL">Luteal (Moderate Strength & Endurance)</option>
                  <option value="MENSTRUAL">Menstrual (Low Impact & Mobility)</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  type="button"
                  className="tp-btn"
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="tp-btn tp-btn-primary"
                  style={{ flex: 1, justifyContent: 'center' }}
                  disabled={creating}
                >
                  {creating ? 'Creating...' : 'Create Program'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerWorkouts;
