import React, { useEffect, useState } from 'react';
import { Search, Star, Users, RefreshCw } from 'lucide-react';
import { useTrainerMarketplace } from '../../hooks/marketplace/useTrainerMarketPlace';
import '../../styles/UserPages.css';
import { useNavigate } from 'react-router-dom';
import type { TrainerPublicProfile } from '../../types/marketplace.types';

const gradients = [
  'linear-gradient(135deg, #2563eb, #06b6d4)',
  'linear-gradient(135deg, #8b5cf6, #d946ef)',
  'linear-gradient(135deg, #f97316, #eab308)',
  'linear-gradient(135deg, #ec4899, #f43f5e)',
  'linear-gradient(135deg, #22c55e, #14b8a6)',
  'linear-gradient(135deg, #6366f1, #8b5cf6)',
];

const Trainers: React.FC = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { trainers, loading, error, fetchTrainers } = useTrainerMarketplace();

  useEffect(() => {
    fetchTrainers();
  }, [fetchTrainers]);

  const filtered = trainers.filter((t: TrainerPublicProfile) => {
    const fullName = `${t.firstName || ''} ${t.lastName || ''}`.toLowerCase();
    const spec = (t.specialization || '').toLowerCase();
    return fullName.includes(search.toLowerCase()) || spec.includes(search.toLowerCase());
  });

  return (
    <div className="up-page">
      <div className="up-page-header">
        <div>
          <h1>Find a Trainer</h1>
          <p>Connect with certified fitness professionals</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <div className="up-search" style={{ flex: 1, marginBottom: 0 }}>
          <Search size={18} className="up-search-icon" />
          <input
            placeholder="Search by name or specialty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
          <RefreshCw size={24} className="spin-icon" style={{ marginBottom: 8 }} />
          <p>Loading trainers...</p>
        </div>
      )}

      {error && !loading && (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#ef4444' }}>
          <p style={{ marginBottom: 12 }}>{error}</p>
          <button className="up-btn up-btn-sm up-btn-primary" onClick={fetchTrainers}>
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
          <p>No trainers found matching your search.</p>
        </div>
      )}

      {!loading && !error && (
        <div className="up-trainer-grid">
          {filtered.map((t: TrainerPublicProfile, i: number) => {
            const initials = `${t.firstName?.[0] || ''}${t.lastName?.[0] || ''}`;
            const gradient = gradients[i % gradients.length];

            return (
              <div key={t._id} className="up-card up-trainer-card">
                <div className="up-trainer-cover" style={{ background: gradient }} />
                {t.avatar ? (
                  <img src={t.avatar} alt={t.firstName} className="up-trainer-avatar-lg" />
                ) : (
                  <div className="up-trainer-avatar-lg" style={{ background: gradient }}>
                    {initials}
                  </div>
                )}
                <h3>{t.firstName} {t.lastName}</h3>
                <div className="specialty">{t.specialization || 'Fitness Coach'}</div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', padding: '8px 20px 0', lineHeight: 1.5 }}>
                  {t.bio || 'No bio provided.'}
                </p>

                <div className="up-trainer-stats">
                  <div className="up-trainer-stat">
                    <span className="val" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Star size={14} style={{ color: '#f59e0b' }} />
                      {t.rating || 5.0}
                    </span>
                    <span className="lbl">Rating</span>
                  </div>
                  <div className="up-trainer-stat">
                    <span className="val">{t.experience || 1} yrs</span>
                    <span className="lbl">Experience</span>
                  </div>
                </div>

                <div className="up-trainer-card-footer">
                  <button
                    className="up-btn up-btn-sm up-btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => navigate(`/app/trainer/${t._id}`)}
                  >
                    <Users size={14} /> View Packages
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

export default Trainers;
