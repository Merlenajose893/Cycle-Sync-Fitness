import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import '../../styles/UserPages.css';

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="up-page" style={{ textAlign: 'center', padding: '60px 20px', maxWidth: 520, margin: '0 auto' }}>
      <div className="up-card" style={{ padding: 40, borderRadius: 20 }}>
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: 20 }}>
          <CheckCircle2 size={72} style={{ color: '#22c55e' }} />
          <Sparkles size={24} style={{ color: '#eab308', position: 'absolute', top: -4, right: -10 }} />
        </div>

        <h1 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: 8, color: 'var(--text-primary)' }}>
          Payment Successful!
        </h1>

        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 24, fontSize: '0.95rem' }}>
          Congratulations! Your training package has been successfully activated. Your trainer assignment is complete and your program is ready to start.
        </p>

        {sessionId && (
          <div
            style={{
              padding: '10px 16px',
              borderRadius: 10,
              background: 'rgba(255, 255, 255, 0.05)',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              marginBottom: 28,
              wordBreak: 'break-all',
              fontFamily: 'monospace',
            }}
          >
            Ref ID: {sessionId}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button
            className="up-btn up-btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '12px 20px', fontSize: '0.95rem' }}
            onClick={() => navigate('/app/dashboard')}
          >
            Go to Dashboard <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
