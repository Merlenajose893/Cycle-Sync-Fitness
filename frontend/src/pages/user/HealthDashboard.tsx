import React, { useState } from 'react';
import {
  Calendar,
  Droplet,
  Activity,
  Award,
  Plus,
  CheckCircle,
  RefreshCw,
  Sparkles,
  Flame,
  ChevronRight,
  TrendingUp,
  X,
  Heart,
  Zap,
  Smile,
  ShieldCheck,
  RotateCcw
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
  const [dismissError, setDismissError] = useState(false);

  // Form states
  const [flow, setFlow] = useState<FlowIntensity>(FlowIntensity.MEDIUM);
  const [selectedMoods, setSelectedMoods] = useState<Mood[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<PhysicalSymptom[]>([]);
  const [weight, setWeight] = useState<number | ''>('');
  const [energy, setEnergy] = useState<number>(6);
  const [saveSuccess, setSaveSuccess] = useState(false);

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
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const getEnergyLabel = (val: number) => {
    if (val <= 3) return { text: 'Low Energy (Rest & Recovery)', color: '#ef4444' };
    if (val <= 7) return { text: 'Moderate & Balanced', color: '#f59e0b' };
    return { text: 'Peak High Energy', color: '#10b981' };
  };

  if (loading && !prediction) {
    return (
      <div className="hd-loading-container">
        <div className="hd-spinner-wrapper">
          <RefreshCw size={36} className="spin-icon" color="#ec4899" />
        </div>
        <p className="hd-loading-text">Syncing Health & Cycle Data...</p>
      </div>
    );
  }

  const waterCurrent = todayLog?.waterIntakeMl || 0;
  const waterTarget = todayLog?.waterTargetMl || 2500;
  const waterPercent = Math.min(100, Math.round((waterCurrent / waterTarget) * 100));

  const flowOptions = [
    { value: FlowIntensity.LIGHT, label: 'Light', drops: '💧' },
    { value: FlowIntensity.MEDIUM, label: 'Medium', drops: '💧💧' },
    { value: FlowIntensity.HEAVY, label: 'Heavy', drops: '💧💧💧' },
    { value: FlowIntensity.SPOTTING, label: 'Spotting', drops: '✨' },
  ];

  return (
    <div className="hd-container animate-fadeIn">
      {/* Hero Header */}
      <div className="hd-hero-header">
        <div className="hd-hero-content">
          <div className="hd-hero-badge">
            <Sparkles size={14} />
            <span>CYCLE SYNC HEALTH INTELLIGENCE</span>
          </div>
          <h1 className="hd-title">Health Sync & Analytics</h1>
          <p className="hd-subtitle">
            Log menstrual phases, daily symptoms, energy levels & reach optimal hydration.
          </p>
        </div>
      </div>

      {error && !dismissError && (
        <div className="hd-error-banner">
          <span>{error}</span>
          <button onClick={() => setDismissError(true)} className="hd-error-close">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="hd-tabs-container">
        <div className="hd-tabs">
          <button
            className={`hd-tab ${activeTab === 'cycle' ? 'active' : ''}`}
            onClick={() => setActiveTab('cycle')}
          >
            <Calendar size={18} /> <span>Cycle Tracking</span>
          </button>
          <button
            className={`hd-tab ${activeTab === 'symptoms' ? 'active' : ''}`}
            onClick={() => setActiveTab('symptoms')}
          >
            <Activity size={18} /> <span>Daily Symptoms</span>
          </button>
          <button
            className={`hd-tab ${activeTab === 'water' ? 'active' : ''}`}
            onClick={() => setActiveTab('water')}
          >
            <Droplet size={18} /> <span>Water Intake</span>
          </button>
          <button
            className={`hd-tab ${activeTab === 'milestones' ? 'active' : ''}`}
            onClick={() => setActiveTab('milestones')}
          >
            <Award size={18} /> <span>Milestones ({milestones.length})</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Cycle Tracking */}
      {activeTab === 'cycle' && (
        <div className="hd-tab-content">
          <div className="hd-grid">
            {/* Main Action Card */}
            <div className="hd-card hd-action-card">
              <div className="hd-card-header">
                <h3>Current Cycle Status</h3>
                <span className="hd-card-tag">Real-time</span>
              </div>

              {activeOngoingPeriod ? (
                <div className="hd-status-box active-period">
                  <div className="hd-status-header">
                    <span className="hd-pulse-dot red"></span>
                    <span className="hd-badge-active red">Menstrual Phase Active</span>
                  </div>
                  <p className="hd-status-desc">
                    Period started on <strong>{new Date(activeOngoingPeriod.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</strong>
                  </p>
                  <button className="hd-btn hd-btn-end" onClick={handleEndPeriod}>
                    <CheckCircle size={18} /> Log Period End
                  </button>
                </div>
              ) : (
                <div className="hd-status-box idle-period">
                  <div className="hd-status-header">
                    <span className="hd-pulse-dot green"></span>
                    <span className="hd-badge-active green">Not Currently Menstruating</span>
                  </div>

                  <div className="hd-flow-picker">
                    <label className="hd-flow-label">Select Flow Intensity:</label>
                    <div className="hd-flow-grid">
                      {flowOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          className={`hd-flow-btn ${flow === opt.value ? 'selected' : ''}`}
                          onClick={() => setFlow(opt.value)}
                        >
                          <span className="hd-flow-icon">{opt.drops}</span>
                          <span className="hd-flow-name">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button className="hd-btn hd-btn-primary hd-btn-block" onClick={handleStartPeriod}>
                    <Plus size={18} /> Start Period Today
                  </button>
                </div>
              )}

              {/* Predictions Summary */}
              {prediction && (
                <div className="hd-prediction-section">
                  <div className="hd-section-title">
                    <TrendingUp size={18} color="#ec4899" />
                    <h4>Smart Cycle Predictions</h4>
                  </div>
                  <div className="hd-pred-grid">
                    <div className="hd-pred-card highlight">
                      <span className="hd-pred-label">CURRENT PHASE</span>
                      <span className="hd-pred-val phase-pill">{prediction.currentPhase.toUpperCase()}</span>
                    </div>
                    <div className="hd-pred-card">
                      <span className="hd-pred-label">CYCLE DAY</span>
                      <span className="hd-pred-val">Day {prediction.currentCycleDay}</span>
                    </div>
                    <div className="hd-pred-card">
                      <span className="hd-pred-label">NEXT PERIOD</span>
                      <span className="hd-pred-val">
                        {new Date(prediction.nextPeriodStartDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <div className="hd-pred-card">
                      <span className="hd-pred-label">FERTILE WINDOW</span>
                      <span className="hd-pred-val">
                        {new Date(prediction.fertileWindowStart).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} -{' '}
                        {new Date(prediction.fertileWindowEnd).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* History Card */}
            <div className="hd-card hd-history-card">
              <div className="hd-card-header">
                <h3>Recent Cycle History</h3>
                <span className="hd-card-count">{cycleLogs.length} logs</span>
              </div>

              {cycleLogs.length === 0 ? (
                <div className="hd-empty-state">
                  <Calendar size={48} color="#f472b6" style={{ opacity: 0.6 }} />
                  <h4>No Cycles Logged Yet</h4>
                  <p>Start tracking today to receive accurate phase predictions & cycle insights.</p>
                </div>
              ) : (
                <div className="hd-history-list">
                  {cycleLogs.map((log) => (
                    <div key={log._id} className="hd-history-item">
                      <div className="hd-history-icon">
                        <Flame size={20} color="#ec4899" />
                      </div>
                      <div className="hd-history-info">
                        <div className="hd-history-dates">
                          {new Date(log.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          {log.endDate ? ` — ${new Date(log.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}` : ' (Active)'}
                        </div>
                        <div className="hd-history-meta">
                          <span>Flow: <strong>{log.flowIntensity}</strong></span>
                        </div>
                      </div>
                      {log.endDate ? (
                        <span className="hd-status-check"><CheckCircle size={18} color="#10b981" /></span>
                      ) : (
                        <span className="hd-status-ongoing">Ongoing</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Daily Symptoms */}
      {activeTab === 'symptoms' && (
        <div className="hd-tab-content">
          <div className="hd-card hd-symptoms-card">
            <div className="hd-card-header">
              <div>
                <h3>Log Daily Health & Symptoms</h3>
                <p className="hd-card-sub">Record energy levels, mood shifts, and physical symptoms</p>
              </div>
            </div>

            {saveSuccess && (
              <div className="hd-success-toast">
                <CheckCircle size={18} /> Daily health log saved successfully!
              </div>
            )}

            <form onSubmit={handleSaveDailyLog} className="hd-form">
              {/* Energy Level */}
              <div className="hd-form-group">
                <div className="hd-form-header-row">
                  <label className="hd-label"><Zap size={18} color="#f59e0b" /> Energy Level</label>
                  <span className="hd-energy-badge" style={{ color: getEnergyLabel(energy).color }}>
                    {energy} / 10 • {getEnergyLabel(energy).text}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={energy}
                  onChange={(e) => setEnergy(Number(e.target.value))}
                  className="hd-range-slider"
                />
              </div>

              {/* Moods */}
              <div className="hd-form-group">
                <label className="hd-label"><Smile size={18} color="#ec4899" /> Current Moods</label>
                <div className="hd-chip-grid">
                  {Object.values(Mood).map((m) => {
                    const isSelected = selectedMoods.includes(m);
                    return (
                      <button
                        type="button"
                        key={m}
                        className={`hd-chip ${isSelected ? 'active' : ''}`}
                        onClick={() => toggleMood(m)}
                      >
                        {m}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Physical Symptoms */}
              <div className="hd-form-group">
                <label className="hd-label"><Activity size={18} color="#8b5cf6" /> Physical Symptoms</label>
                <div className="hd-chip-grid">
                  {Object.values(PhysicalSymptom).map((s) => {
                    const isSelected = selectedSymptoms.includes(s);
                    return (
                      <button
                        type="button"
                        key={s}
                        className={`hd-chip symptom ${isSelected ? 'active' : ''}`}
                        onClick={() => toggleSymptom(s)}
                      >
                        {s.replace('_', ' ')}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Weight */}
              <div className="hd-form-group" style={{ maxWidth: 320 }}>
                <label className="hd-label">Body Weight</label>
                <div className="hd-input-wrapper">
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g. 62.5"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value === '' ? '' : Number(e.target.value))}
                    className="hd-input"
                  />
                  <span className="hd-input-unit">kg</span>
                </div>
              </div>

              <div className="hd-form-actions">
                <button type="submit" className="hd-btn hd-btn-primary">
                  <Heart size={18} /> Save Daily Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tab 3: Water Hydration Tracker */}
      {activeTab === 'water' && (
        <div className="hd-tab-content">
          <div className="hd-card hd-water-card">
            <div className="hd-card-header text-center">
              <h3>Water Hydration Tracker</h3>
              <p className="hd-card-sub">Maintain target hydration tailored to your active phase</p>
            </div>

            <div className="hd-water-visual-wrapper">
              <div className="hd-water-ring">
                <div className="hd-water-fill" style={{ height: `${waterPercent}%` }} />
                <div className="hd-water-content">
                  <Droplet size={36} className="hd-droplet-glow" />
                  <span className="hd-water-amount">{waterCurrent} <small>ml</small></span>
                  <span className="hd-water-target">Goal: {waterTarget} ml</span>
                  <span className="hd-water-percent-badge">{waterPercent}% Achieved</span>
                </div>
              </div>
            </div>

            <div className="hd-water-progress-bar">
              <div className="hd-progress-fill" style={{ width: `${waterPercent}%` }} />
            </div>

            <div className="hd-water-quick-actions">
              <button className="hd-water-btn" onClick={() => addWater(250)}>
                <Plus size={16} /> 250 ml <small>(Glass)</small>
              </button>
              <button className="hd-water-btn" onClick={() => addWater(500)}>
                <Plus size={16} /> 500 ml <small>(Bottle)</small>
              </button>
              <button className="hd-water-btn" onClick={() => addWater(750)}>
                <Plus size={16} /> 750 ml <small>(Sports Bottle)</small>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Milestones */}
      {activeTab === 'milestones' && (
        <div className="hd-tab-content">
          <div className="hd-card hd-milestones-card">
            <div className="hd-card-header">
              <div>
                <h3>Health Milestones & Badges</h3>
                <p className="hd-card-sub">Earn badges as you continuously sync and track your health</p>
              </div>
            </div>

            {milestones.length === 0 ? (
              <div className="hd-empty-state">
                <Award size={64} color="#f472b6" style={{ opacity: 0.5 }} />
                <h4>No Badges Unlocked Yet</h4>
                <p>Log your cycles, symptoms, and water intake regularly to unlock milestone achievements!</p>
              </div>
            ) : (
              <div className="hd-milestone-grid">
                {milestones.map((m) => (
                  <div key={m._id} className="hd-milestone-item">
                    <div className="hd-milestone-icon">
                      <Award size={32} color="#ec4899" />
                    </div>
                    <div className="hd-milestone-content">
                      <h4>{m.title}</h4>
                      <p>{m.description}</p>
                      <span className="hd-milestone-date">
                        Unlocked {new Date(m.achievedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
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

export default HealthDashboard;
