import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar, Award, Dumbbell, RefreshCw, CheckCircle } from 'lucide-react';
import { useTrainerClients } from '../../hooks/trainer/useTrainerClients';
import '../../styles/TrainerPanel.css';

const TrainerClients: React.FC = () => {
  const navigate = useNavigate();
  const { clients, loading, error, fetchClients } = useTrainerClients();

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  return (
    <div className="tp-page">
      <div className="tp-page-header">
        <div>
          <h1>My Clients</h1>
          <p>Manage your active client assignments and create custom programs</p>
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
                    className="tp-btn tp-btn-primary"
                    style={{ flex: 1, justifyContent: 'center' }}
                    onClick={() => navigate(`/trainer/workouts?clientId=${user?._id}`)}
                  >
                    <Dumbbell size={16} /> Assign Workout
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TrainerClients;
