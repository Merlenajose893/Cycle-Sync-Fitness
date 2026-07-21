import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/AIPlan.css';

/* ── Mock Data (same exercises from the screenshot) ── */
const mockWorkoutDays = [
    {
        day: 'MONDAY',
        title: 'Push Day — Chest & Shoulders',
        duration: 50,
        tags: ['Strength', 'Upper Body'],
        warmup: { title: 'Light cardio + arm circles', description: '5 min light cardio + arm circles', duration: 5 },
        exercises: [
            { name: 'Barbell Bench Press', muscleGroup: 'Chest', sets: 4, reps: '8-10', rest: 90, tip: 'Keep shoulder blades retracted throughout the lift.' },
            { name: 'Overhead Press (OHP)', muscleGroup: 'Shoulders', sets: 3, reps: '8-10', rest: 90, tip: 'Brace your core to protect your lower back.' },
            { name: 'Incline DB Press', muscleGroup: 'Upper Chest', sets: 3, reps: '10-12', rest: 75 },
            { name: 'Lateral Raises', muscleGroup: 'Deltoids', sets: 3, reps: '12-15', rest: 60, tip: 'Lead with your elbows, not your wrists.' },
            { name: 'Tricep Rope Pushdown', muscleGroup: 'Triceps', sets: 3, reps: '12-15', rest: 60 },
            { name: 'Tricep Dips', muscleGroup: 'Triceps', sets: 3, reps: 'To failure', rest: 75 },
        ],
        cooldown: { title: 'Chest & shoulder static stretches', description: 'Chest & shoulder static stretches, 5 min', duration: 5 },
    },
    {
        day: 'TUESDAY',
        title: 'Pull Day — Back & Biceps',
        duration: 45,
        tags: ['Strength', 'Upper Body'],
        warmup: { title: 'Band pull-aparts + cat-cow', description: 'Band pull-aparts + cat-cow, 5 min', duration: 5 },
        exercises: [
            { name: 'Conventional Deadlift', muscleGroup: 'Back', sets: 4, reps: '6-8', rest: 120, tip: 'Keep a neutral spine throughout the movement.' },
            { name: 'Pull-ups', muscleGroup: 'Lats', sets: 3, reps: '8-12', rest: 90 },
            { name: 'Seated Cable Row', muscleGroup: 'Mid Back', sets: 3, reps: '10-12', rest: 75 },
            { name: 'Single-Arm DB Row', muscleGroup: 'Lats', sets: 3, reps: '10-12', rest: 60 },
            { name: 'Barbell Curl', muscleGroup: 'Biceps', sets: 3, reps: '10-12', rest: 60 },
            { name: 'Hammer Curls', muscleGroup: 'Biceps', sets: 3, reps: '12-15', rest: 60 },
        ],
        cooldown: { title: 'Back & bicep stretches', description: 'Back & bicep stretches, 5 min', duration: 5 },
    },
    {
        day: 'WEDNESDAY',
        title: 'Active Recovery',
        duration: 20,
        tags: ['Rest', 'Mobility'],
        warmup: { title: 'Dynamic stretching', description: 'Dynamic full-body stretching, 3 min', duration: 3 },
        exercises: [
            { name: 'Light Walk / Cycling', muscleGroup: 'Cardio', sets: 1, reps: '15 min', rest: 0 },
            { name: 'Hip Flexor Stretch', muscleGroup: 'Hips', sets: 2, reps: '30 sec each', rest: 0 },
            { name: 'Thoracic Rotation', muscleGroup: 'Spine', sets: 2, reps: '10 each side', rest: 0 },
        ],
        cooldown: { title: 'Deep breathing', description: 'Deep breathing & relaxation, 5 min', duration: 5 },
    },
    {
        day: 'THURSDAY',
        title: 'Lower Body Power',
        duration: 55,
        tags: ['Strength', 'Legs'],
        warmup: { title: 'Bodyweight squats + leg swings', description: 'Bodyweight squats + leg swings, 5 min', duration: 5 },
        exercises: [
            { name: 'Back Squat', muscleGroup: 'Quads', sets: 4, reps: '6-8', rest: 120, tip: 'Drive through your heels and keep your chest up.' },
            { name: 'Romanian Deadlift', muscleGroup: 'Hamstrings', sets: 3, reps: '10-12', rest: 90 },
            { name: 'Leg Press', muscleGroup: 'Quads', sets: 3, reps: '12-15', rest: 75 },
            { name: 'Walking Lunges', muscleGroup: 'Glutes', sets: 3, reps: '12 each', rest: 60 },
            { name: 'Leg Curl', muscleGroup: 'Hamstrings', sets: 3, reps: '12-15', rest: 60 },
            { name: 'Calf Raises', muscleGroup: 'Calves', sets: 4, reps: '15-20', rest: 45 },
        ],
        cooldown: { title: 'Quad & hamstring stretches', description: 'Quad & hamstring static stretches, 5 min', duration: 5 },
    },
];

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
    const workout = mockWorkoutDays[index];

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
                        <span className="day-abbr">{DAY_ABBR[workout.day]}</span>
                        <span className="day-date">{DAY_DATES[workout.day]}</span>
                    </div>
                    <div className="workout-header-info">
                        <h2>{workout.title}</h2>
                        <div className="workout-header-tags">
                            {workout.tags.map((tag) => (
                                <span key={tag} className="day-tag">{tag}</span>
                            ))}
                            <span className="day-tag">◷ {workout.duration} min</span>
                        </div>
                    </div>
                </div>

                {/* Warm-up */}
                <div className="warmup-section">
                    <span className="section-icon warmup-icon">🔥</span>
                    <div>
                        <strong className="section-type warmup-text">WARM-UP</strong>
                        <p>{workout.warmup.description}</p>
                    </div>
                </div>

                {/* Exercises */}
                <div className="exercises-section">
                    <label className="section-label">EXERCISES</label>
                    <div className="exercises-list">
                        {workout.exercises.map((ex, i) => (
                            <div
                                key={ex.name}
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

                {/* Cool-down */}
                <div className="cooldown-section">
                    <span className="section-icon cooldown-icon">🌿</span>
                    <div>
                        <strong className="section-type cooldown-text">COOL-DOWN</strong>
                        <p>{workout.cooldown.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkoutDetail;
