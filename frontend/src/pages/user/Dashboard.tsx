import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Dashboard.css';
import { useUserContext } from '../../context/UserAuthContext';
import { useAIPlan } from '../../hooks/aiplan/useAIPlan';
import { useUserAssignment } from '../../hooks/assignment/useUserAssignment';
import { useWorkoutProgram } from '../../hooks/workout/useWorkoutProgram';
import { useFoodInsights } from '../../hooks/nutrition/useFoodInsights';
import { useExerciseInsights } from '../../hooks/workout/useExerciseInsights';
import type { AIPlan } from '../../types/aiplan.types';
import { Sparkles, Brain, ArrowRight, LogOut, Award, UserCheck, ChevronRight, Dumbbell, MessageSquare, Calendar, Heart, Utensils, Activity, Flame } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();
  const { getActivePlan } = useAIPlan();
  const { assignment, fetchAssignment } = useUserAssignment();
  const { activeProgram, fetchActiveProgram } = useWorkoutProgram();
  const foodInsights = useFoodInsights();
  const exerciseInsights = useExerciseInsights();
  
  const [plan, setPlan] = useState<AIPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        const [activePlan] = await Promise.all([
          getActivePlan().catch(() => null),
          fetchAssignment().catch(() => null),
          fetchActiveProgram().catch(() => null),
        ]);
        setPlan(activePlan);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, []);

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
  const hasAnyPlanOrAssignment = !!(plan || assignment || activeProgram);

  return (
    <div className="dashboard-content animate-fadeIn">
      <div className="dashboard-header-premium" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div className="header-greeting">
          <h1>{getGreeting()}, {user?.firstName || 'User'}</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Here is your daily training & health summary</p>
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
        <div style={{ padding: '60px', textAlign: 'center' }}>
          <span className="spinner" style={{ width: '40px', height: '40px', borderWidth: '4px' }} />
          <p style={{ marginTop: '12px', color: 'var(--text-secondary)' }}>Loading your dashboard...</p>
        </div>
      ) : (
        <div className="dashboard-plan-summary" style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* ══════════ Daily Insights Snapshot ══════════ */}
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
              <Activity size={20} color="var(--primary)" /> Daily Snapshot & Tracking
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              
              {/* Nutrition Snapshot Card */}
              <div 
                className="dashboard-card" 
                style={{ 
                  background: 'linear-gradient(135deg, #fff7ed, #ffedd5)', 
                  padding: '20px', 
                  borderRadius: '16px', 
                  border: '1px solid #fed7aa',
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/app/nutrition')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: 38, height: 38, borderRadius: '10px', background: '#ea580c', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Utensils size={20} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, color: '#9a3412', fontSize: '0.95rem', fontWeight: 700 }}>Food & Nutrition</h4>
                      <span style={{ fontSize: '0.78rem', color: '#c2410c' }}>Daily Goal: {foodInsights.targetCalories} kcal</span>
                    </div>
                  </div>
                  <ChevronRight size={18} color="#ea580c" />
                </div>
                
                <div style={{ margin: '14px 0 8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, color: '#7c2d12', marginBottom: '6px' }}>
                    <span>{foodInsights.consumedCalories} consumed</span>
                    <span>{foodInsights.remainingCalories} remaining</span>
                  </div>
                  <div style={{ height: '8px', background: '#ffedd5', border: '1px solid #fdba74', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${foodInsights.percentage}%`, background: 'linear-gradient(90deg, #ea580c, #f97316)', borderRadius: '10px', transition: 'width 0.4s' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '12px', fontSize: '0.78rem', color: '#9a3412' }}>
                  <span>P: <strong>{foodInsights.protein}g</strong></span>
                  <span>C: <strong>{foodInsights.carbs}g</strong></span>
                  <span>F: <strong>{foodInsights.fat}g</strong></span>
                </div>
              </div>

              {/* Exercise Snapshot Card */}
              <div 
                className="dashboard-card" 
                style={{ 
                  background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', 
                  padding: '20px', 
                  borderRadius: '16px', 
                  border: '1px solid #bbf7d0',
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/app/exercise')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: 38, height: 38, borderRadius: '10px', background: '#16a34a', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Dumbbell size={20} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, color: '#14532d', fontSize: '0.95rem', fontWeight: 700 }}>Exercise & Workouts</h4>
                      <span style={{ fontSize: '0.78rem', color: '#15803d' }}>This Week: {exerciseInsights.workoutsThisWeek} sessions</span>
                    </div>
                  </div>
                  <ChevronRight size={18} color="#16a34a" />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '16px' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#166534', textTransform: 'uppercase', fontWeight: 600 }}>Weekly Volume</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#14532d' }}>{exerciseInsights.weeklyVolumeKg.toLocaleString()} <span style={{ fontSize: '0.85rem' }}>kg</span></div>
                  </div>
                  {exerciseInsights.lastWorkoutTitle && (
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.75rem', color: '#166534', textTransform: 'uppercase', fontWeight: 600 }}>Last Workout</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#14532d' }}>{exerciseInsights.lastWorkoutTitle}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Health Tracking Quick Card */}
              <div 
                className="dashboard-card" 
                style={{ 
                  background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)', 
                  padding: '20px', 
                  borderRadius: '16px', 
                  border: '1px solid #fbcfe8',
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/app/health')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: 38, height: 38, borderRadius: '10px', background: '#ec4899', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Heart size={20} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, color: '#831843', fontSize: '0.95rem', fontWeight: 700 }}>Cycle & Health Log</h4>
                      <span style={{ fontSize: '0.78rem', color: '#be185d' }}>Track symptoms, period & water</span>
                    </div>
                  </div>
                  <ChevronRight size={18} color="#ec4899" />
                </div>

                <p style={{ margin: '14px 0 0', color: '#9d174d', fontSize: '0.82rem', lineHeight: '1.4' }}>
                  Log daily physical symptoms, period dates, and stay hydrated with personalized phase predictions.
                </p>
              </div>

            </div>
          </div>
          
          {/* ══════════ Active Personal Trainer Coaching Widget (ALWAYS SHOWN IF PAID) ══════════ */}
          {assignment ? (
            <div className="dashboard-card" style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                    <UserCheck size={28} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#60a5fa', fontWeight: 'bold' }}>
                      Active Personal Trainer Assignment
                    </div>
                    <h3 style={{ margin: '2px 0 0', fontSize: '1.25rem', color: '#fff' }}>
                      {assignment.trainerId?.firstName} {assignment.trainerId?.lastName}
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: '#94a3b8' }}>
                      Package: <strong>{assignment.packageId?.packageName || 'Custom Coaching Program'}</strong>
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}
                    onClick={() => navigate('/app/exercise')}
                  >
                    <Dumbbell size={16} /> View Workouts
                  </button>
                  <button 
                    style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                    onClick={() => navigate('/app/messages')}
                  >
                    <MessageSquare size={16} /> Message Trainer
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

          {/* ══════════ Trainer Assigned Program Section ══════════ */}
          {activeProgram && (
            <div className="dashboard-card" style={{ background: 'var(--surface-color)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                  <Dumbbell size={20} color="var(--primary-color)"/> Assigned Trainer Workout Program
                </h3>
                <span style={{ padding: '4px 12px', background: '#dbeafe', color: '#2563eb', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
                  {activeProgram.phase || 'CYCLE SYNCED'}
                </span>
              </div>
              <h4 style={{ fontSize: '1.1rem', margin: '0 0 8px', color: 'var(--text-primary)' }}>{activeProgram.title}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>{activeProgram.description}</p>
              <button 
                className="up-btn up-btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                onClick={() => navigate('/app/exercise')}
              >
                Start Trainer Workouts <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* ══════════ AI Plan Summary (If Available) ══════════ */}
          {plan ? (
            <>
              <div className="dashboard-card" style={{ background: 'var(--surface-color)', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                 <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><Sparkles size={18} color="var(--primary-color)"/> Cycle Phase & AI Plan</h3>
                 <p style={{ color: 'var(--text-secondary)' }}>You are currently following the <strong>{plan.inputs?.goal?.replace('_', ' ') || 'Cycle Sync'}</strong> plan.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {/* Today's Workout Card */}
                <div className="dashboard-card" style={{ background: 'var(--surface-color)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                  <h3 style={{ marginBottom: '16px' }}>Today's AI Workout</h3>
                  {todayWorkoutData ? (
                    <div>
                      <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>{todayWorkoutData.workout.title}</h4>
                      <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                        {todayWorkoutData.workout.duration} min • {todayWorkoutData.workout.exercises?.length || 0} exercises
                      </p>
                      <button 
                        style={{ background: 'var(--primary-color)', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                        onClick={() => navigate(`/app/ai-plan/workout/${todayWorkoutData.index}`)}
                      >
                        Start Workout <ArrowRight size={16} />
                      </button>
                    </div>
                  ) : (
                    <p style={{ color: 'var(--text-muted)' }}>No AI workout scheduled for today. Rest up!</p>
                  )}
                </div>

                {/* Macros Summary */}
                <div className="dashboard-card" style={{ background: 'var(--surface-color)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                  <h3 style={{ marginBottom: '16px' }}>Daily Macros Target</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 'bold' }}>CALORIES</div>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--primary-color)' }}>{plan.summary?.dailyCalories || '--'}</div>
                    </div>
                    <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 'bold' }}>PROTEIN</div>
                      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{plan.summary?.protein || '--'}g</div>
                    </div>
                    <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 'bold' }}>CARBS</div>
                      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{plan.summary?.carbs || '--'}g</div>
                    </div>
                    <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 'bold' }}>FATS</div>
                      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{plan.summary?.fat || '--'}g</div>
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
            </>
          ) : assignment && !activeProgram ? (
            /* User has paid trainer package, but trainer hasn't published workout program yet */
            <div className="dashboard-card" style={{ background: '#f8fafc', border: '1px dashed #cbd5e1', padding: '32px', borderRadius: '16px', textAlign: 'center' }}>
              <Calendar size={40} style={{ color: '#2563eb', margin: '0 auto 12px' }} />
              <h3 style={{ margin: '0 0 8px', color: '#1e293b' }}>Trainer Package Active!</h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', maxWidth: '480px', margin: '0 auto 20px' }}>
                Your personal trainer <strong>{assignment.trainerId?.firstName} {assignment.trainerId?.lastName}</strong> is currently reviewing your profile to construct your customized workout and nutrition plan.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <button 
                  style={{ background: '#2563eb', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  onClick={() => navigate('/app/messages')}
                >
                  <MessageSquare size={16} /> Chat with Trainer
                </button>
                <button 
                  style={{ background: 'white', color: '#2563eb', border: '1px solid #bfdbfe', padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  onClick={() => navigate('/app/ai-plan')}
                >
                  <Sparkles size={16} /> Generate Optional AI Plan
                </button>
              </div>
            </div>
          ) : null}

          {/* ══════════ Empty State (Only if NO AI plan AND NO active Trainer assignment) ══════════ */}
          {!hasAnyPlanOrAssignment && (
            <div className="dashboard-empty-state" style={{ marginTop: '20px', padding: '48px', background: 'var(--surface-color)', borderRadius: '24px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <Brain size={48} color="var(--primary-color)" style={{ margin: '0 auto 16px' }} />
              <h2 style={{ marginBottom: '12px', fontSize: '24px' }}>No Active Plan Found</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '440px', margin: '0 auto 24px' }}>
                Get started by generating your personalized AI-driven workout and meal plan, or select a certified personal trainer.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button 
                  style={{ background: 'var(--primary-color)', color: 'white', border: 'none', padding: '14px 28px', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  onClick={() => navigate('/app/ai-plan')}
                >
                  <Sparkles size={18} /> Generate your AI plan
                </button>
                <button 
                  style={{ background: 'transparent', color: 'var(--primary-color)', border: '1px solid var(--primary-color)', padding: '14px 28px', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  onClick={() => navigate('/app/trainer')}
                >
                  <Award size={18} /> Browse Trainers
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;