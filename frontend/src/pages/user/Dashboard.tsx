import React from 'react'
import {
  ChevronRight,
  Flame,
  Dumbbell,
  MessageCircle,
  Sparkles,
  TrendingUp,
  Crown,
  Waves,
  BrainCircuit,
  ChefHat,
  Zap,
} from "lucide-react";

function Ring({
  size,
  stroke,
  progress,
  color,
  bgColor = "rgba(0,0,0,0.05)",
}: {
  size: number;
  stroke: number;
  progress: number;
  color: string;
  bgColor?: string;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={bgColor}
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
    </svg>
  );
}
import '../../styles/Auth.css'
import '../../styles/Dashboard.css'
import { useUserContext } from '../../context/UserAuthContext';

const Dashboard = () => {
  const {user}=useUserContext();
  console.log(user?.firstName);
  
  const calorieGoal = 1800;
  const calorieFood = 550;
  const calorieExercise = 200;
  const calorieRemaining = calorieGoal - calorieFood + calorieExercise;
  const calorieProgress =
    ((calorieFood - calorieExercise) / calorieGoal) * 100;

  return (
    <div className="dashboard-content animate-fadeIn">
      {/* Header */}
      <div className="dashboard-header-premium">
        <div className="header-greeting">
          <div className="daily-status-pill">
            <Zap size={12} />
            <span>Optimal Performance State</span>
          </div>

          <h1>Good Morning, {user?.firstName}</h1>

          <p>
            Tuesday, February 17 •{" "}
            <span
              style={{
                color: "var(--primary)",
                fontWeight: "700",
              }}
            >
              Luteal Phase Recovery
            </span>
          </p>
        </div>

        <div className="dashboard-badges">
          <div className="plan-toggle-badge">
            <Crown size={16} color="#fbbf24" />
            <span>Elite Member</span>
          </div>

          <div className="streak-badge-premium">
            <div className="streak-icon">
              <Flame size={20} />
            </div>

            <div className="streak-text">
              <span className="count">3</span>
              <span className="label">Day Streak</span>
            </div>
          </div>
        </div>
      </div>

      {/* Biological Horizon */}
      <div className="biological-horizon-banner">
        <div className="horizon-main">
          <div className="horizon-left">
            <div className="phase-indicator-large">
              <Sparkles size={24} color="#0d9488" />
              <h2>Luteal Phase</h2>
            </div>

            <h3>The "Power & Polish" Phase</h3>

            <p>
              Your metabolism is peaking. This is the optimal time for strength
              training and high-magnesium nutrition.
            </p>

            <div className="horizon-actions">
              <button className="horizon-btn">
                View Phase Insights
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="horizon-center">
            <div className="cycle-orbit">
              <div className="orbit-ring"></div>

              <div
                className="orbit-indicator"
                style={{ transform: "rotate(240deg)" }}
              ></div>

              <div className="orbit-content">
                <span className="day-val">22</span>
                <span className="day-total">of 28</span>
              </div>
            </div>
          </div>

          <div className="horizon-right">
            <div className="hormonal-insight-card">
              <div className="insight-header">
                <Waves size={16} color="#8b5cf6" />
                <span>Hormonal State</span>
              </div>

              <div className="hormone-levels">
                <div className="hormone-item">
                  <span>Progesterone</span>

                  <div className="h-bar">
                    <div
                      className="h-fill"
                      style={{
                        width: "85%",
                        background: "#8b5cf6",
                      }}
                    ></div>
                  </div>
                </div>

                <div className="hormone-item">
                  <span>Estrogen</span>

                  <div className="h-bar">
                    <div
                      className="h-fill"
                      style={{
                        width: "40%",
                        background: "#0d9488",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="dashboard-command-grid">
        {/* Calories */}
        <div className="command-card premium-card">
          <div className="card-top">
            <div className="card-title-group">
              <h3>Energy Intake</h3>
              <span className="card-subtitle">
                Daily Calorie Balance
              </span>
            </div>

            <div className="card-icon blue">
              <Flame size={20} />
            </div>
          </div>

          <div className="metric-display">
            <div className="ring-center">
              <Ring
                size={140}
                stroke={12}
                progress={calorieProgress}
                color="var(--primary)"
              />

              <div className="ring-label">
                <span className="main-val">
                  {calorieRemaining}
                </span>

                <span className="sub-val">kcal left</span>
              </div>
            </div>

            <div className="metric-stats">
              <div className="stat-row">
                <div className="dot food"></div>
                <span>Food</span>
                <strong>{calorieFood}</strong>
              </div>

              <div className="stat-row">
                <div className="dot exercise"></div>
                <span>Exercise</span>
                <strong>{calorieExercise}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Macros */}
        <div className="command-card premium-card">
          <div className="card-top">
            <div className="card-title-group">
              <h3>Biological Macros</h3>
              <span className="card-subtitle">
                Optimized for Luteal
              </span>
            </div>

            <div className="card-icon purple">
              <TrendingUp size={20} />
            </div>
          </div>

          <div className="macros-horizontal-stack">
            <div className="macro-column">
              <div className="macro-bar-container">
                <div
                  className="m-bar-fill"
                  style={{
                    height: "60%",
                    background: "#3b82f6",
                  }}
                ></div>
              </div>
              <span className="m-label">Carbs</span>
              <span className="m-val">120g</span>
            </div>

            <div className="macro-column">
              <div className="macro-bar-container">
                <div
                  className="m-bar-fill"
                  style={{
                    height: "70%",
                    background: "#8b5cf6",
                  }}
                ></div>
              </div>
              <span className="m-label">Protein</span>
              <span className="m-val">85g</span>
            </div>

            <div className="macro-column">
              <div className="macro-bar-container">
                <div
                  className="m-bar-fill"
                  style={{
                    height: "70%",
                    background: "#f97316",
                  }}
                ></div>
              </div>
              <span className="m-label">Fat</span>
              <span className="m-val">42g</span>
            </div>
          </div>

          <div className="macro-insight">
            <Sparkles size={12} />
            <span>Increase complex carbs by 20g today.</span>
          </div>
        </div>

        {/* Protocol */}
        <div className="command-card full-span premium-card border-premium">
          <div className="card-top">
            <div className="card-title-group">
              <h3>Trainer-Guided Protocol</h3>
              <span className="card-subtitle">
                Tailored by Coach Sarah
              </span>
            </div>

            <div className="trainer-mini-profile">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
                alt="Trainer"
              />
              <div className="online-indicator"></div>
            </div>
          </div>

          <div className="protocol-actions">
            <div className="protocol-item">
              <div className="p-icon workout">
                <Dumbbell size={20} />
              </div>

              <div className="p-info">
                <strong>Coach Sarah’s Lower Body Burn</strong>
                <span>Resistance Training Session</span>
              </div>

              <button className="p-btn">
                Watch Video
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="protocol-item">
              <div className="p-icon food">
                <ChefHat size={20} />
              </div>

              <div className="p-info">
                <strong>Custom Meal Plan</strong>
                <span>
                  Focus on Salmon & Greens today
                </span>
              </div>

              <button className="p-btn">
                View Details
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="trainer-chat-teaser">
              <MessageCircle size={18} />
              <span>
                Sarah left you a new message about your recovery.
              </span>
              <ChevronRight size={14} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .border-premium {
          border: 2px solid transparent;
        }
      `}</style>
    </div>
  );
}

export default Dashboard