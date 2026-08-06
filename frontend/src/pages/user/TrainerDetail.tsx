import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Award, Check, ShoppingBag, RefreshCw } from 'lucide-react';
import { useTrainerMarketplace } from '../../hooks/marketplace/useTrainerMarketPlace';
import type { TrainerPackage } from '../../types/marketplace.types';
import '../../styles/UserPages.css';

const TrainerDetail: React.FC = () => {
  const { trainerId } = useParams<{ trainerId: string }>();
  const navigate = useNavigate();

  const {
    selectedTrainer,
    packages,
    loading,
    error,
    fetchTrainerProfile,
    fetchPackages,
  } = useTrainerMarketplace();

  useEffect(() => {
    if (trainerId) {
      fetchTrainerProfile(trainerId);
      fetchPackages(trainerId);
    }
  }, [trainerId, fetchTrainerProfile, fetchPackages]);

  if (loading) {
    return (
      <div className="up-page" style={{ textAlign: 'center', padding: '60px 0' }}>
        <RefreshCw size={28} className="spin-icon" style={{ marginBottom: 12 }} />
        <p style={{ color: 'var(--text-secondary)' }}>Loading trainer profile...</p>
      </div>
    );
  }

  if (error || !selectedTrainer) {
    return (
      <div className="up-page" style={{ textAlign: 'center', padding: '60px 0' }}>
        <p style={{ color: '#ef4444', marginBottom: 16 }}>{error || 'Trainer not found'}</p>
        <button className="up-btn up-btn-primary" onClick={() => navigate('/app/trainer')}>
          <ArrowLeft size={16} /> Back to Trainers
        </button>
      </div>
    );
  }

  const initials = `${selectedTrainer.firstName?.[0] || ''}${selectedTrainer.lastName?.[0] || ''}`;

  return (
    <div className="up-page">
      {/* Back button */}
      <button
        className="up-btn up-btn-sm"
        onClick={() => navigate('/app/trainer')}
        style={{ marginBottom: 20, gap: 6 }}
      >
        <ArrowLeft size={16} /> Back to Trainers
      </button>

      {/* Trainer Profile Card */}
      <div className="up-card" style={{ marginBottom: 32, padding: 28 }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {selectedTrainer.avatar ? (
            <img
              src={selectedTrainer.avatar}
              alt={selectedTrainer.firstName}
              style={{ width: 96, height: 96, borderRadius: '50%', objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                fontWeight: 700,
                color: '#fff',
              }}
            >
              {initials}
            </div>
          )}

          <div style={{ flex: 1, minWidth: 260 }}>
            <h1 style={{ fontSize: '1.75rem', margin: '0 0 6px' }}>
              {selectedTrainer.firstName} {selectedTrainer.lastName}
            </h1>
            <div
              style={{
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: 20,
                background: 'rgba(37, 99, 235, 0.1)',
                color: '#2563eb',
                fontSize: '0.85rem',
                fontWeight: 600,
                marginBottom: 12,
              }}
            >
              {selectedTrainer.specialization || 'Fitness Specialist'}
            </div>

            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 16px' }}>
              {selectedTrainer.bio || 'Dedicated trainer committed to helping clients achieve their fitness and health goals through structured, personalized programs.'}
            </p>

            <div style={{ display: 'flex', gap: 24, fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Star size={16} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                <span><strong>{selectedTrainer.rating || 5.0}</strong> Rating</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Award size={16} style={{ color: '#2563eb' }} />
                <span><strong>{selectedTrainer.experience || 1}</strong> Years Exp.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Packages Section */}
      <div>
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: '1.35rem', margin: '0 0 4px' }}>Training Packages</h2>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Select a package to start training</p>
        </div>

        {packages.length === 0 ? (
          <div className="up-card" style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
            <p>No active training packages currently offered by this trainer.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {packages.map((pkg: TrainerPackage) => (
              <div key={pkg._id} className="up-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 24 }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', margin: '0 0 8px' }}>{pkg.packageName}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 16px', lineHeight: 1.4 }}>
                    {pkg.description}
                  </p>

                  <div style={{ marginBottom: 20 }}>
                    <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      ${pkg.price}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: 6 }}>
                      / {pkg.durationDays} days
                    </span>
                  </div>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px' }}>
                    {pkg.features && pkg.features.length > 0 ? (
                      pkg.features.map((feat, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 8 }}>
                          <Check size={16} style={{ color: '#22c55e', flexShrink: 0 }} />
                          <span>{feat}</span>
                        </li>
                      ))
                    ) : (
                      <li style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        <Check size={16} style={{ color: '#22c55e', flexShrink: 0 }} />
                        <span>Personalized workout & nutrition plan</span>
                      </li>
                    )}
                  </ul>
                </div>

                <button
                  className="up-btn up-btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => alert(`Starting purchase for ${pkg.packageName}... (Stripe Checkout in Phase 2)`)}
                >
                  <ShoppingBag size={16} /> Buy Package
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainerDetail;
