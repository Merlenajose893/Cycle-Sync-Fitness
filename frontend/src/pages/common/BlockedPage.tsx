import { useNavigate } from "react-router-dom";
import { ShieldX, LogOut } from "lucide-react";
import { useUserAuth } from "../../hooks/auth/useUserAuth";
import { useTrainerAuth } from "../../hooks/auth/useTrainerAuth";
import  "../../styles/BlockedPage.css"

const BlockedPage = () => {
  const navigate = useNavigate();
  const { logoutUser } = useUserAuth();
  const { logoutTrainer } = useTrainerAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {
      // User logout failed — may be a trainer session
    }

    try {
      await logoutTrainer();
    } catch {
      // Trainer logout failed — may be a user session
    }

    navigate("/login");
  };

  return (
    <div className="blocked-wrapper">
      <div className="blocked-card animate-slideUp">
        <div className="blocked-icon-container">
          <ShieldX size={48} strokeWidth={1.5} />
        </div>

        <div className="blocked-status">403</div>

        <h1 className="blocked-title">Account Blocked</h1>

        <p className="blocked-message">
          Your account has been blocked by the administrator.
        </p>

        <p className="blocked-submessage">
          If you believe this is a mistake,<br />
          please contact support.
        </p>

        <button
          className="blocked-logout-btn"
          onClick={handleLogout}
          id="blocked-logout-btn"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default BlockedPage;
