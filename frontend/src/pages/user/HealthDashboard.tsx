import React, { useState } from 'react';
import {
  Calendar,
  Droplet,
  Activity,
  Award,
  Plus,
  CheckCircle,
  PlusCircle,
  RefreshCw,
  Info,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { useHealthTracking } from '../../hooks/health/useHealthTracking';
import { FlowIntensity, Mood, PhysicalSymptom } from '../../types/health.types';
import '../../styles/HealthDashboard.css';

const HealthDashboard: React.FC = () => {
  const {
    loading,
    error,
    cycleLogs,
    prediction,
    todayLog,
    milestones,
    startPeriod,
    endPeriod,
    addWater,
    logDailyHealth,
  } = useHealthTracking();

  const [activeTab, setActiveTab] = useState<'cycle' | 'symptoms' | 'water' | 'milestones'>('cycle');

  // Form states
  const [flow, setFlow] = useState<FlowIntensity>(FlowIntensity.MEDIUM);
  const [selectedMoods, setSelectedMoods] = useState<Mood[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<PhysicalSymptom[]>([]);
  const [weight, setWeight] = useState<number | ''>('');
  const [energy, setEnergy] = useState<number>(5);

  const activeOngoingPeriod = cycleLogs.find((log) => !log.endDate);

  const handleStartPeriod = async () => {
    try {
      await startPeriod({
        startDate: new Date().toISOString().split('T')[0],
        flowIntensity: flow,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleEndPeriod = async () => {
    if (!activeOngoingPeriod) return;
    try {
      await endPeriod(activeOngoingPeriod._id, {
        endDate: new Date().toISOString().split('T')[0],
      });
    } catch (e) {
      console.error(e);
    }
  };

  const toggleMood = (m: Mood) => {
    setSelectedMoods((prev) =>
      prev.includes(m) ? prev.filter((item) => item !== m) : [...prev, m]
    );
  };

  const toggleSymptom = (s: PhysicalSymptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(s) ? prev.filter((item) => item !== s) : [...prev, s]
    );
  };

  const handleSaveDailyLog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await logDailyHealth({
        date: new Date().toISOString().split('T')[0],
        moods: selectedMoods,
        physicalSymptoms: selectedSymptoms,
        energyLevel: energy,
        weightKg: weight ? Number(weight) : undefined,
      });
    } catch (e) {
      console.error(e);
    }
  };

  if (loading && !prediction) {
    return (
      <div className="hd-loading-container">
        <RefreshCw size={32} className="spin-icon" />
        <p>Loading your Health Sync Data...</p>
      </div>
    );
  }

  const waterCurrent = todayLog?.waterIntakeMl || 0;
  const waterTarget = todayLog?.waterTargetMl || 2500;
  const waterPercent = Math.min(100, Math.round((waterCurrent / waterTarget) * 100));

  return (
    <div className="hd-container">
      {/* Header */}
      <div className="hd-header">
        <div>
          <h1 className="hd-title">Health Sync & Analytics</h1>
          <p className="hd-subtitle">Track cycles, log daily symptoms & reach hydration goals</p>
        </div>
      </div>

      {error && <div className="hd-error-banner">{error}</div>}

      {/* Tabs */}
      <div className="hd-tabs">
        <button
          className={`hd-tab ${activeTab === 'cycle' ? 'active' : ''}`}
          onClick={() => setActiveTab('cycle')}
        >
          <Calendar size={18} /> Cycle Tracking
        </button>
        <button
          className={`hd-tab ${activeTab === 'symptoms' ? 'active' : ''}`}
          onClick={() => setActiveTab('symptoms')}
        >
          <Activity size={18} /> Daily Symptoms
        </button>
        <button
          className={`hd-tab ${activeTab === 'water' ? 'active' : ''}`}
          onClick={() => setActiveTab('water')}
        >
          <Droplet size={18} /> Water Intake
        </button>
        <button
          className={`hd-tab ${activeTab === 'milestones' ? 'active' : ''}`}
          onClick={() => setActiveTab('milestones')}
        >
          <Award size={18} /> Milestones ({milestones.length})
        </button>
      </div>

      {/* Tab 1: Cycle Tracking & Predictions */}
      {activeTab === 'cycle' && (
        <div className="hd-grid">
          {/* Main Action Card */}
          <div className="hd-card hd-cycle-card">
            <h3>Current Cycle Status</h3>
            {activeOngoingPeriod ? (
              <div className="hd-status-box active-period">
                <span className="hd-badge red">Period Active</span>
                <p>Started on {new Date(activeOngoingPeriod.startDate).toLocaleDateString()}</p>
                <button className="hd-btn hd-btn-secondary" onClick={handleEndPeriod}>
                  Log Period End
                </button>
              </div>
            ) : (
              <div className="hd-status-box">
                <span className="hd-badge green">Not Currently Menstruating</span>
                <div style={{ marginTop: 12 }}>
                  <label style={{ fontSize: '0.85rem', display: 'block', marginBottom: 6 }}>
                    Flow Intensity:
                  </label>
                  <select
                    value={flow}
                    onChange={(e) => setFlow(e.target.value as FlowIntensity)}
                    className="hd-select"
                  >
                    <option value={FlowIntensity.LIGHT}>Light</option>
                    <option value={FlowIntensity.MEDIUM}>Medium</option>
                    <option value={FlowIntensity.HEAVY}>Heavy</option>
                    <option value={FlowIntensity.SPOTTING}>Spotting</option>
                  </select>
                </div>
                <button className="hd-btn hd-btn-primary" onClick={handleStartPeriod} style={{ marginTop: 12 }}>
                  <Plus size={16} /> Start Period Today
                </button>
              </div>
            )}

            {/* Predictions Box */}
            {prediction && (
              <div className="hd-prediction-summary" style={{ marginTop: 24 }}>
                <h4>Cycle Insights</h4>
                <div className="hd-pred-grid">
                  <div className="hd-pred-item">
                    <span className="hd-pred-label">Current Phase</span>
                    <span className="hd-pred-val highlight">{prediction.currentPhase.toUpperCase()}</span>
                  </div>
                  <div className="hd-pred-item">
                    <span className="hd-pred-label">Cycle Day</span>
                    <span className="hd-pred-val">Day {prediction.currentCycleDay}</span>
                  </div>
                  <div className="hd-pred-item">
                    <span className="hd-pred-label">Next Period</span>
                    <span className="hd-pred-val">
                      {new Date(prediction.nextPeriodStartDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="hd-pred-item">
                    <span className="hd-pred-label">Fertile Window</span>
                    <span className="hd-pred-val">
                      {new Date(prediction.fertileWindowStart).toLocaleDateString()} -{' '}
                      {new Date(prediction.fertileWindowEnd).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* History Card */}
          <div className="hd-card">
            <h3>Recent Cycle Logs</h3>
            {cycleLogs.length === 0 ? (
              <p className="hd-empty">No cycle history logged yet.</p>
            ) : (
              <div className="hd-history-list">
                {cycleLogs.map((log) => (
                  <div key={log._id} className="hd-history-item">
                    <div>
                      <strong>
                        {new Date(log.startDate).toLocaleDateString()}
                        {log.endDate ? ` — ${new Date(log.endDate).toLocaleDateString()}` : ' (Ongoing)'}
                      </strong>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        Flow: {log.flowIntensity}
                      </div>
                    </div>
                    {log.endDate && <CheckCircle size={18} color="#22c55e" />}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Daily Symptoms */}
      {activeTab === 'symptoms' && (
        <div className="hd-card">
          <h3>Log Today's Symptoms & Mood</h3>
          <form onSubmit={handleSaveDailyLog}>
            <div style={{ marginBottom: 20 }}>
              <label className="hd-label">Energy Level (1-10)</label>
              <input
                type="range"
                min="1"
                max="10"
                value={energy}
                onChange={(e) => setEnergy(Number(e.target.value))}
                style={{ width: '100%' }}
              />
              <div style={{ textAlign: 'right', fontSize: '0.85rem', fontWeight: 600 }}>
                {energy} / 10
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label className="hd-label">Moods</label>
              <div className="hd-chip-group">
                {Object.values(Mood).map((m) => (
                  <button
                    type="button"
                    key={m}
                    className={`hd-chip ${selectedMoods.includes(m) ? 'active' : ''}`}
                    onClick={() => toggleMood(m)}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label className="hd-label">Physical Symptoms</label>
              <div className="hd-chip-group">
                {Object.values(PhysicalSymptom).map((s) => (
                  <button
                    type="button"
                    key={s}
                    className={`hd-chip ${selectedSymptoms.includes(s) ? 'active' : ''}`}
                    onClick={() => toggleSymptom(s)}
                  >
                    {s.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label className="hd-label">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g. 62.5"
                value={weight}
                onChange={(e) => setWeight(e.target.value === '' ? '' : Number(e.target.value))}
                className="hd-input"
              />
            </div>

            <button type="submit" className="hd-btn hd-btn-primary">
              Save Daily Log
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: Water Intake */}
      {activeTab === 'water' && (
        <div className="hd-card" style={{ textAlign: 'center', maxWidth: 500, margin: '0 auto' }}>
          <h3>Water Hydration Tracker</h3>
          <div className="hd-water-circle">
            <div className="hd-water-level" style={{ height: `${waterPercent}%` }} />
            <div className="hd-water-text">
              <span className="hd-water-amount">{waterCurrent} ml</span>
              <span className="hd-water-target">Goal: {waterTarget} ml</span>
              <span className="hd-water-percent">{waterPercent}%</span>
            </div>
          </div>

          <div className="hd-water-actions" style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}>
            <button className="hd-btn hd-btn-secondary" onClick={() => addWater(250)}>
              +250 ml (Glass)
            </button>
            <button className="hd-btn hd-btn-secondary" onClick={() => addWater(500)}>
              +500 ml (Bottle)
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Milestones */}
      {activeTab === 'milestones' && (
        <div className="hd-card">
          <h3>Health Badges & Milestones</h3>
          {milestones.length === 0 ? (
            <div className="hd-empty">
              <Award size={48} color="#cbd5e1" style={{ margin: '0 auto 12px' }} />
              <p>No health milestones achieved yet. Keep logging daily health and cycles to unlock badges!</p>
            </div>
          ) : (
            <div className="hd-milestone-grid">
              {milestones.map((m) => (
                <div key={m._id} className="hd-milestone-card">
                  <Award size={32} color="#0d9488" />
                  <div>
                    <h4 style={{ margin: '0 0 4px' }}>{m.title}</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>{m.description}</p>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      Unlocked {new Date(m.achievedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HealthDashboard;
