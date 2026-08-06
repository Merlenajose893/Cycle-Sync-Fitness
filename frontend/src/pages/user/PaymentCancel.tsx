import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, ArrowLeft } from 'lucide-react';
import '../../styles/UserPages.css';

const PaymentCancel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="up-page" style={{ textAlign: 'center', padding: '60px 20px', maxWidth: 520, margin: '0 auto' }}>
      <div className="up-card" style={{ padding: 40, borderRadius: 20 }}>
        <div style={{ marginBottom: 20 }}>
          <XCircle size={72} style={{ color: '#ef4444' }} />
        </div>

        <h1 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: 8, color: 'var(--text-primary)' }}>
          Payment Cancelled
        </h1>

        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 28, fontSize: '0.95rem' }}>
          Your transaction was cancelled. No charges were made to your account. You can select another package anytime from the trainer marketplace.
        </p>

        <button
          className="up-btn up-btn-primary"
          style={{ width: '100%', justifyContent: 'center', padding: '12px 20px', fontSize: '0.95rem' }}
          onClick={() => navigate('/app/trainer')}
        >
          <ArrowLeft size={18} /> Return to Trainer Marketplace
        </button>
      </div>
    </div>
  );
};

export default PaymentCancel;
