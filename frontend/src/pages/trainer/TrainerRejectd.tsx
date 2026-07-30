import { useNavigate } from "react-router-dom";
import { XCircle, LogOut, RefreshCw, AlertTriangle, Mail } from "lucide-react";
import { useTrainerAuth } from "../../hooks/auth/useTrainerAuth";
import { useTrainerContext } from "../../context/TrainerAuthContext";
import "../../styles/TrainerStatusPages.css";

const TrainerRejectedPage = () => {
  const navigate = useNavigate();
  const { logoutTrainer } = useTrainerAuth();
  const { trainer } = useTrainerContext();

  const handleLogout = async () => {
    try {
      await logoutTrainer();
    } catch {
      // Logout failed
      
    }
    navigate("/trainer/login");
  };

  const handleResubmit = () => {
    navigate("/trainer/onboarding");
  };

  return (
    <div className="status-wrapper">
      <div className="status-card animate-slideUp">
        {/* Icon with pulse */}
        <div className="status-icon-container status-icon--rejected">
          <div className="status-pulse status-pulse--rejected" />
          <XCircle size={44} strokeWidth={1.5} />
        </div>

        <div className="status-badge status-badge--rejected">
          <div className="status-badge-dot status-badge-dot--rejected" />
          Application Rejected
        </div>

        <h1 className="status-title">Your application was not approved</h1>

        {/* Rejection reason card */}
        {trainer?.rejectionReason && (
          <div className="rejection-reason-card">
            <div className="rejection-reason-header">
              <AlertTriangle size={16} />
              <span>Reason for Rejection</span>
            </div>
            <p className="rejection-reason-text">
              {trainer.rejectionReason}
            </p>
          </div>
        )}

        <p className="status-message">
          Unfortunately, your trainer application did not meet our
          requirements at this time. You may update your profile and
          resubmit for review.
        </p>

        {/* Action buttons */}
        <div className="status-actions">
          <button
            className="status-resubmit-btn"
            onClick={handleResubmit}
            id="rejected-resubmit-btn"
          >
            <RefreshCw size={18} />
            Resubmit Application
          </button>

          <button
            className="status-logout-btn"
            onClick={handleLogout}
            id="rejected-logout-btn"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <div className="status-contact-hint">
          <Mail size={14} />
          <span>
            Need help? Contact{" "}
            <a href="mailto:support@cyclesync.ai" className="status-link">
              support@cyclesync.ai
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrainerRejectedPage;
