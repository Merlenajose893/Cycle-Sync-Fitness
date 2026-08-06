import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Dashboard.css';
import { useUserContext } from '../../context/UserAuthContext';
import { useAIPlan } from '../../hooks/aiplan/useAIPlan';
import { useUserAssignment } from '../../hooks/assignment/useUserAssignment';
import type { AIPlan } from '../../types/aiplan.types';
import { Sparkles, Brain, ArrowRight, LogOut, Award, UserCheck, ChevronRight } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();
  const { getActivePlan } = useAIPlan();
  const { assignment, fetchAssignment } = useUserAssignment();
  
  const [plan, setPlan] = useState<AIPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const activePlan = await getActivePlan();
        setPlan(activePlan);
      } catch (error) {
        console.error("Failed to fetch plan on dashboard", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
    fetchAssignment();
  }, [getActivePlan, fetchAssignment]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getTodayWorkout = () => {
    if (!plan || !plan.workoutPlan) return null;
    const todayStr = new Date().toLocaleString('en-US', { weekday: 'long' }).toUpperCase();
    const workoutIndex = plan.workoutPlan.findIndex(d => d.day === todayStr);
    if (workoutIndex === -1) return null;
    return { workout: plan.workoutPlan[workoutIndex], index: workoutIndex };
  };

  const todayWorkoutData = getTodayWorkout();

  return (
    <div className="dashboard-content animate-fadeIn">
      <div className="dashboard-header-premium" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div className="header-greeting">
          <h1>{getGreeting()}, {user?.firstName || 'User'}</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Here is your daily summary</p>
        </div>
        
        <button 
          onClick={handleLogout}
          style={{ 
            background: 'transparent', 
            color: '#ef4444', 
            border: '1px solid #ef4444', 
            padding: '10px 20px', 
            borderRadius: '12px', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: '600',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#ef4444';
            e.currentTarget.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#ef4444';
          }}
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <span className="spinner" style={{ width: '40px', height: '40px', borderWidth: '4px' }} />
        </div>
      ) : plan ? (
        <div className="dashboard-plan-summary" style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="dashboard-card" style={{ background: 'var(--surface-color)', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
             <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><Sparkles size={18} color="var(--primary-color)"/> Cycle Phase & Plan</h3>
             <p style={{ color: 'var(--text-secondary)' }}>You are currently following the <strong>{plan.inputs.goal.replace('_', ' ')}</strong> plan.</p>
          </div>

          {/* ══════════ Personal Trainer Coaching Widget ══════════ */}
          {assignment ? (
            <div className="dashboard-card" style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                    <UserCheck size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#60a5fa', fontWeight: 'bold' }}>
                      Active Personal Trainer
                    </div>
                    <h3 style={{ margin: '2px 0 0', fontSize: '1.15rem', color: '#fff' }}>
                      {assignment.trainerId?.firstName} {assignment.trainerId?.lastName}
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>
                      Package: {assignment.packageId?.packageName || 'Custom Program'}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
                    onClick={() => navigate('/app/exercise')}
                  >
                    View Workouts
                  </button>
                  <button 
                    style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer' }}
                    onClick={() => navigate('/app/messages')}
                  >
                    Message Trainer
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="dashboard-card" style={{ background: 'linear-gradient(135deg, #eff6ff, #dbeafe)', padding: '20px 24px', borderRadius: '16px', border: '1px solid #bfdbfe', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Award size={28} style={{ color: '#2563eb' }} />
                <div>
                  <h4 style={{ margin: 0, color: '#1e3a8a', fontSize: '1rem', fontWeight: 700 }}>Want 1-on-1 Certified Coaching?</h4>
                  <p style={{ margin: 0, color: '#1e40af', fontSize: '0.85rem' }}>Explore certified trainers tailored to your cycle phases.</p>
                </div>
              </div>
              <button 
                style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
                onClick={() => navigate('/app/trainer')}
              >
                Browse Trainers <ChevronRight size={16} />
              </button>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {/* Today's Workout Card */}
            <div className="dashboard-card" style={{ background: 'var(--surface-color)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <h3 style={{ marginBottom: '16px' }}>Today's Workout</h3>
              {todayWorkoutData ? (
                <div>
                  <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>{todayWorkoutData.workout.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                    {todayWorkoutData.workout.duration} min • {todayWorkoutData.workout.exercises.length} exercises
                  </p>
                  <button 
                    style={{ background: 'var(--primary-color)', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                    onClick={() => navigate(`/app/ai-plan/workout/${todayWorkoutData.index}`)}
                  >
                    Start Workout <ArrowRight size={16} />
                  </button>
                </div>
              ) : (
                <p style={{ color: 'var(--text-muted)' }}>No workout scheduled for today. Rest up!</p>
              )}
            </div>

            {/* Macros Summary */}
            <div className="dashboard-card" style={{ background: 'var(--surface-color)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <h3 style={{ marginBottom: '16px' }}>Daily Macros Target</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 'bold' }}>CALORIES</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--primary-color)' }}>{plan.summary.dailyCalories}</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 'bold' }}>PROTEIN</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{plan.summary.protein}g</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 'bold' }}>CARBS</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{plan.summary.carbs}g</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 'bold' }}>FATS</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{plan.summary.fat}g</div>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            style={{ alignSelf: 'flex-start', background: 'transparent', color: 'var(--primary-color)', border: '1px solid var(--primary-color)', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            onClick={() => navigate('/app/ai-plan/view')}
          >
            View Full AI Plan <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <div className="dashboard-empty-state" style={{ marginTop: '40px', padding: '48px', background: 'var(--surface-color)', borderRadius: '24px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <Brain size={48} color="var(--primary-color)" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ marginBottom: '12px', fontSize: '24px' }}>No Active Plan Found</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px' }}>
            Get started by generating your personalized AI-driven workout and meal plan.
          </p>
          <button 
            style={{ background: 'var(--primary-color)', color: 'white', border: 'none', padding: '14px 28px', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            onClick={() => navigate('/app/ai-plan')}
          >
            <Sparkles size={18} /> Generate your first AI plan
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;