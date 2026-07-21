import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/AIPlan.css';
import { useAIPlan } from '../../hooks/aiplan/useAIPlan';
import { WorkoutDay } from '../../types/aiplan.types';

const DAY_ABBR: Record<string, string> = {
    MONDAY: 'MON', TUESDAY: 'TUE', WEDNESDAY: 'WED',
    THURSDAY: 'THU', FRIDAY: 'FRI', SATURDAY: 'SAT', SUNDAY: 'SUN',
};

const DAY_DATES: Record<string, number> = {
    MONDAY: 14, TUESDAY: 15, WEDNESDAY: 16,
    THURSDAY: 17, FRIDAY: 18, SATURDAY: 19, SUNDAY: 20,
};

const WorkoutDetail = () => {
    const navigate = useNavigate();
    const { dayIndex } = useParams<{ dayIndex: string }>();
    const index = parseInt(dayIndex || '0', 10);
    
    const { getActivePlan } = useAIPlan();
    const [workout, setWorkout] = useState<WorkoutDay | null>(null);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const fetchWorkout = async () => {
            try {
                const activePlan = await getActivePlan();
                if (activePlan && activePlan.workoutPlan && activePlan.workoutPlan[index]) {
                    setWorkout(activePlan.workoutPlan[index]);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setFetching(false);
            }
        };
        fetchWorkout();
    }, [getActivePlan, index]);

    if (fetching) {
        return (
            <div className="aiplan-page animate-fadeIn">
                <div className="plan-view-card" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                    <span className="spinner" style={{ width: '40px', height: '40px', borderWidth: '4px' }} />
                </div>
            </div>
        );
    }

    if (!workout) {
        return (
            <div className="aiplan-page animate-fadeIn">
                <div className="plan-view-card" style={{ textAlign: 'center', padding: '60px' }}>
                    <p>Workout not found.</p>
                    <button className="back-link" onClick={() => navigate('/app/ai-plan/view')} type="button">
                        ← Back to plan
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="aiplan-page animate-fadeIn">
            <div className="aiplan-header">
                <button className="back-btn" onClick={() => navigate('/app/ai-plan/view')} type="button">
                    ←
                </button>
                <h2>{workout.title}</h2>
            </div>

            <div className="workout-detail-card">
                {/* Back link */}
                <button className="back-link" onClick={() => navigate('/app/ai-plan/view')} type="button">
                    ← Back to plan
                </button>

                {/* Workout Header */}
                <div className="workout-header">
                    <div className="workout-day-badge">
                        <span className="day-abbr">{DAY_ABBR[workout.day] || workout.day.slice(0,3)}</span>
                        <span className="day-date">{DAY_DATES[workout.day] || 14}</span>
                    </div>
                    <div className="workout-header-info">
                        <h2>{workout.title}</h2>
                        <div className="workout-header-tags">
                            <span className="day-tag">{workout.exercises.length > 0 ? 'Workout' : 'Rest'}</span>
                            <span className="day-tag">◷ {workout.duration} min</span>
                        </div>
                    </div>
                </div>

                {/* Warm-up */}
                {workout.warmup && (
                    <div className="warmup-section">
                        <span className="section-icon warmup-icon">🔥</span>
                        <div>
                            <strong className="section-type warmup-text">WARM-UP</strong>
                            <p>{workout.warmup.description}</p>
                        </div>
                    </div>
                )}

                {/* Exercises */}
                {workout.exercises && workout.exercises.length > 0 && (
                    <div className="exercises-section">
                        <label className="section-label">EXERCISES</label>
                        <div className="exercises-list">
                            {workout.exercises.map((ex, i) => (
                                <div
                                    key={ex.name + i}
                                    className="exercise-card"
                                    style={{ animationDelay: `${i * 0.06}s` }}
                                >
                                    <div className="exercise-header">
                                        <span className="exercise-number">{i + 1}</span>
                                        <div>
                                            <h4 className="exercise-name">{ex.name}</h4>
                                            <span className="exercise-muscle">{ex.muscleGroup}</span>
                                        </div>
                                    </div>
                                    <div className="exercise-stats">
                                        <div className="stat-box">
                                            <span className="stat-label">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px', verticalAlign: 'middle' }}>
                                                    <path d="M4 12h16M4 6h16M4 18h16" />
                                                </svg>
                                                SETS
                                            </span>
                                            <span className="stat-value">{ex.sets}</span>
                                        </div>
                                        <div className="stat-box">
                                            <span className="stat-label">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px', verticalAlign: 'middle' }}>
                                                    <polyline points="17 1 21 5 17 9" />
                                                    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                                                    <polyline points="7 23 3 19 7 15" />
                                                    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                                                </svg>
                                                REPS
                                            </span>
                                            <span className="stat-value">{ex.reps}</span>
                                        </div>
                                        <div className="stat-box">
                                            <span className="stat-label">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px', verticalAlign: 'middle' }}>
                                                    <circle cx="12" cy="12" r="10" />
                                                    <polyline points="12 6 12 12 16 14" />
                                                </svg>
                                                REST
                                            </span>
                                            <span className="stat-value">
                                                {ex.rest > 0 ? `${ex.rest} sec` : '—'}
                                            </span>
                                        </div>
                                    </div>
                                    {ex.tip && (
                                        <div className="exercise-tip">
                                            <span className="tip-icon">💡</span>
                                            {ex.tip}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Cool-down */}
                {workout.cooldown && (
                    <div className="cooldown-section">
                        <span className="section-icon cooldown-icon">🌿</span>
                        <div>
                            <strong className="section-type cooldown-text">COOL-DOWN</strong>
                            <p>{workout.cooldown.description}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkoutDetail;
