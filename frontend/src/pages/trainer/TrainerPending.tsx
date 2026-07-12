import { useNavigate } from "react-router-dom";
import { Clock, LogOut, Shield, FileCheck } from "lucide-react";
import { useTrainerAuth } from "../../hooks/auth/useTrainerAuth";
import "../../styles/TrainerStatusPages.css";

const TrainerPendingPage = () => {
  const navigate = useNavigate();
  const { logoutTrainer } = useTrainerAuth();

  const handleLogout = async () => {
    try {
      await logoutTrainer();
    } catch {
      // Logout failed
    }
    navigate("/trainer/login");
  };

  return (
    <div className="status-wrapper">
      <div className="status-card animate-slideUp">
        {/* Animated pulse ring behind the icon */}
        <div className="status-icon-container status-icon--pending">
          <div className="status-pulse status-pulse--pending" />
          <Clock size={44} strokeWidth={1.5} />
        </div>

        <div className="status-badge status-badge--pending">
          <div className="status-badge-dot status-badge-dot--pending" />
          Application Under Review
        </div>

        <h1 className="status-title">Your profile has been submitted</h1>

        <p className="status-message">
          Please wait while the admin reviews your application.
          <br />
          This usually takes 1–2 business days.
        </p>

        {/* Info cards */}
        <div className="status-info-grid">
          <div className="status-info-item">
            <div className="status-info-icon status-info-icon--pending">
              <FileCheck size={18} />
            </div>
            <div>
              <span className="status-info-label">Profile</span>
              <span className="status-info-value">Submitted</span>
            </div>
          </div>
          <div className="status-info-item">
            <div className="status-info-icon status-info-icon--pending">
              <Shield size={18} />
            </div>
            <div>
              <span className="status-info-label">Verification</span>
              <span className="status-info-value">In Progress</span>
            </div>
          </div>
        </div>

        <p className="status-submessage">
          You'll receive an email notification once your application has been reviewed.
        </p>

        <button
          className="status-logout-btn"
          onClick={handleLogout}
          id="pending-logout-btn"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default TrainerPendingPage;
