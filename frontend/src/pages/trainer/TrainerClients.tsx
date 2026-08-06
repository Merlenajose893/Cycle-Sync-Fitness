import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar, Dumbbell, RefreshCw, CheckCircle, Activity, X } from 'lucide-react';
import { useTrainerClients } from '../../hooks/trainer/useTrainerClients';
import { workoutLogService } from '../../services/workout/workoutLogService';
import '../../styles/TrainerPanel.css';

const TrainerClients: React.FC = () => {
  const navigate = useNavigate();
  const { clients, loading, error, fetchClients } = useTrainerClients();

  // Selected client for progress logs modal
  const [selectedClient, setSelectedClient] = useState<any | null>(null);
  const [clientLogs, setClientLogs] = useState<any[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleOpenProgressModal = async (clientUser: any) => {
    setSelectedClient(clientUser);
    setLogsLoading(true);
    try {
      const logs = await workoutLogService.getClientLogsForTrainer(clientUser._id);
      setClientLogs(logs || []);
    } catch (err) {
      console.error("Failed to fetch client logs:", err);
      setClientLogs([]);
    } finally {
      setLogsLoading(false);
    }
  };

  return (
    <div className="tp-page">
      <div className="tp-page-header">
        <div>
          <h1>My Clients</h1>
          <p>Manage your active client assignments, inspect workout progress, and assign custom programs</p>
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
          <RefreshCw size={28} className="spin-icon" style={{ marginBottom: 12 }} />
          <p>Loading assigned clients...</p>
        </div>
      )}

      {error && !loading && (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#ef4444' }}>
          <p style={{ marginBottom: 12 }}>{error}</p>
          <button className="tp-btn tp-btn-primary" onClick={fetchClients}>
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && clients.length === 0 && (
        <div className="tp-card" style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          <Users size={48} style={{ opacity: 0.5, marginBottom: 16 }} />
          <h2>No Active Clients Yet</h2>
          <p style={{ maxWidth: 420, margin: '0 auto 20px', fontSize: '0.9rem', lineHeight: 1.5 }}>
            When users purchase your training packages on the marketplace, they will automatically appear here.
          </p>
        </div>
      )}

      {!loading && !error && clients.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
          {clients.map((assignment: any) => {
            const user = assignment.userId;
            const pkg = assignment.packageId;
            const userName = user ? `${user.firstName || ''} ${user.lastName || ''}` : 'Client';
            const initials = user ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}` : 'CL';
            const startDate = assignment.startDate ? new Date(assignment.startDate).toLocaleDateString() : 'N/A';
            const endDate = assignment.endDate ? new Date(assignment.endDate).toLocaleDateString() : 'N/A';

            return (
              <div key={assignment._id} className="tp-card" style={{ padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                    {user?.avatar ? (
                      <img src={user.avatar} alt={userName} style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                      <div
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '1.2rem',
                          color: '#fff',
                        }}
                      >
                        {initials}
                      </div>
                    )}

                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: '0 0 4px', fontSize: '1.15rem' }}>{userName}</h3>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: '#22c55e', fontWeight: 600 }}>
                        <CheckCircle size={14} /> Active Client
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(255, 255, 255, 0.04)', marginBottom: 20 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>
                      Package: {pkg?.packageName || 'Custom Program'}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Calendar size={14} /> {startDate} - {endDate}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    className="tp-btn"
                    style={{ flex: 1, justifyContent: 'center' }}
                    onClick={() => handleOpenProgressModal(user)}
                  >
                    <Activity size={16} /> Progress
                  </button>
                  <button
                    className="tp-btn tp-btn-primary"
                    style={{ flex: 1, justifyContent: 'center' }}
                    onClick={() => navigate(`/trainer/workouts?clientId=${user?._id}`)}
                  >
                    <Dumbbell size={16} /> Program
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Progress Modal */}
      {selectedClient && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, zIndex: 1000 }}>
          <div className="tp-card" style={{ width: '100%', maxWidth: 520, padding: 28, maxHeight: '80vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0 }}>
                {selectedClient.firstName}'s Workout Progress
              </h3>
              <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} onClick={() => setSelectedClient(null)}>
                <X size={20} />
              </button>
            </div>

            {logsLoading ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
                <RefreshCw size={24} className="spin-icon" style={{ marginBottom: 8 }} />
                <p>Fetching client logs...</p>
              </div>
            ) : clientLogs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                <Activity size={36} style={{ opacity: 0.5, marginBottom: 8 }} />
                <p style={{ margin: 0 }}>No logged workout sessions yet for this client.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {clientLogs.map((log: any) => (
                  <div key={log._id || log.id} style={{ padding: 14, borderRadius: 10, background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{log.workoutTitle}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                      {log.createdAt ? new Date(log.createdAt).toLocaleDateString() : 'Recent'} • {log.durationMinutes || 30} mins • {log.caloriesBurned || 250} kcal
                    </div>
                    {log.notes && (
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic', marginTop: 6, background: 'rgba(0,0,0,0.2)', padding: '6px 10px', borderRadius: 6 }}>
                        "{log.notes}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerClients;
