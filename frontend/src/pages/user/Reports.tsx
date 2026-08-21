import React from 'react';
import { BarChart3, TrendingUp, Flame, Dumbbell, Scale, Download, Loader2, RefreshCw, Activity } from 'lucide-react';
import { useReports } from '../../hooks/useReports';
import '../../styles/UserPages.css';

const Reports: React.FC = () => {
  const { range, setRange, data, loading, exporting, error, refetch, exportReport } = useReports('week');

  const summary = data?.summary;
  const calorieSeries = data?.calorieSeries || [];
  const workoutSeries = data?.workoutSeries || [];
  const weightCycleSeries = data?.weightCycleSeries || [];

  const maxCal = Math.max(
    2000,
    ...calorieSeries.map((d) => Math.max(d.caloriesConsumed, d.calorieTarget))
  );

  const stats = [
    {
      label: 'Avg Daily Calories',
      value: summary ? `${summary.averageDailyCalories.toLocaleString()} kcal` : '--',
      change: summary ? `${summary.calorieTargetAdherence}% adherence` : 'Target alignment',
      icon: Flame,
      color: 'orange' as const,
    },
    {
      label: 'Workouts Completed',
      value: summary ? `${summary.totalWorkoutSessions}` : '--',
      change: summary ? `${summary.workoutConsistency}% consistency` : 'Session volume',
      icon: Dumbbell,
      color: 'blue' as const,
    },
    {
      label: 'Weight Trend',
      value: summary?.currentWeight ? `${summary.currentWeight} kg` : 'No data',
      change: summary?.weightChange !== null && summary?.weightChange !== undefined
        ? `${summary.weightChange >= 0 ? '+' : ''}${summary.weightChange} kg net`
        : 'Weight tracking',
      icon: Scale,
      color: 'green' as const,
    },
    {
      label: 'Workout Volume',
      value: summary ? `${summary.totalWorkoutVolume.toLocaleString()} kg` : '--',
      change: summary ? `${summary.totalWorkoutSets} total sets` : 'Total load',
      icon: Activity,
      color: 'purple' as const,
    },
  ];

  return (
    <div className="up-page">
      <div className="up-page-header">
        <div>
          <h1>Reports & Analytics</h1>
          <p>Track your progress, nutrition, and phase-aligned fitness trends</p>
        </div>
        <div className="up-header-actions">
          {(['week', 'month', '3months'] as const).map((p) => (
            <button
              key={p}
              className={`up-btn up-btn-sm ${range === p ? 'up-btn-primary' : ''}`}
              onClick={() => setRange(p)}
              disabled={loading}
            >
              {p === 'week' ? 'Week' : p === 'month' ? 'Month' : '3 Months'}
            </button>
          ))}
          <button className="up-btn" onClick={exportReport} disabled={exporting || loading}>
            {exporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
            {exporting ? 'Exporting...' : 'Export CSV'}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ padding: '12px 16px', borderRadius: '8px', backgroundColor: '#fee2e2', color: '#b91c1c', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{error}</span>
          <button className="up-btn up-btn-sm" onClick={refetch} style={{ gap: 4 }}>
            <RefreshCw size={14} /> Retry
          </button>
        </div>
      )}

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
          <Loader2 size={36} className="animate-spin" style={{ color: 'var(--primary)' }} />
        </div>
      ) : (
        <>
          <div className="up-reports-grid">
            {stats.map((s, i) => (
              <div key={i} className="up-card up-stat-card">
                <div className={`up-stat-icon ${s.color}`}>
                  <s.icon size={24} />
                </div>
                <div className="up-stat-content">
                  <div className="label">{s.label}</div>
                  <div className="value">{s.value}</div>
                  <div className="change">{s.change}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Calorie Chart */}
          <div className="up-card" style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                <BarChart3 size={18} /> Calorie Intake vs Target
              </h3>
            </div>
            {calorieSeries.length === 0 ? (
              <div className="up-chart-placeholder">No nutrition data available for this range</div>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: calorieSeries.length > 30 ? 4 : 12, height: 200, padding: '0 12px', overflowX: 'auto' }}>
                  {calorieSeries.map((d, i) => {
                    const formattedDate = new Date(d.date).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                    });
                    return (
                      <div key={i} style={{ flex: 1, minWidth: calorieSeries.length > 30 ? 12 : 28, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: '100%', display: 'flex', gap: 2, alignItems: 'flex-end', justifyContent: 'center', height: 160 }}>
                          <div
                            title={`Consumed: ${d.caloriesConsumed} kcal`}
                            style={{
                              width: '45%',
                              height: `${(d.caloriesConsumed / maxCal) * 100}%`,
                              background: 'var(--primary)',
                              borderRadius: '4px 4px 0 0',
                              transition: 'height 0.5s',
                              minHeight: d.caloriesConsumed > 0 ? 4 : 0,
                            }}
                          />
                          <div
                            title={`Target: ${d.calorieTarget} kcal`}
                            style={{
                              width: '45%',
                              height: `${(d.calorieTarget / maxCal) * 100}%`,
                              background: 'var(--border)',
                              borderRadius: '4px 4px 0 0',
                              minHeight: 4,
                            }}
                          />
                        </div>
                        {calorieSeries.length <= 14 && (
                          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                            {formattedDate}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 16 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem' }}>
                    <span style={{ width: 12, height: 12, background: 'var(--primary)', borderRadius: 3 }} /> Actual Consumed
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem' }}>
                    <span style={{ width: 12, height: 12, background: 'var(--border)', borderRadius: 3 }} /> Daily Target
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Weight & Workout Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div className="up-card">
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <TrendingUp size={18} /> Weight & Cycle Phase Progress
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 220, overflowY: 'auto' }}>
                {weightCycleSeries.filter(w => w.weight || w.cyclePhase).length === 0 ? (
                  <div className="up-chart-placeholder">No weight or cycle logs recorded</div>
                ) : (
                  weightCycleSeries
                    .filter(w => w.weight || w.cyclePhase)
                    .map((w, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--bg-card-subtle, #f8fafc)', borderRadius: 6 }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{w.date}</span>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                          {w.weight && <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{w.weight} kg</span>}
                          {w.cyclePhase && (
                            <span className="up-badge" style={{ fontSize: '0.75rem', textTransform: 'capitalize' }}>
                              Day {w.cycleDay || '--'} ({w.cyclePhase.toLowerCase()})
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>

            <div className="up-card">
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <Dumbbell size={18} /> Workout Consistency Logs
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 220, overflowY: 'auto' }}>
                {workoutSeries.filter(w => w.workoutCompleted).length === 0 ? (
                  <div className="up-chart-placeholder">No workouts completed in this period</div>
                ) : (
                  workoutSeries
                    .filter(w => w.workoutCompleted)
                    .map((w, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--bg-card-subtle, #f8fafc)', borderRadius: 6 }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{w.date}</span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>
                          {w.totalVolume} kg volume • {w.totalSets} sets
                        </span>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;
