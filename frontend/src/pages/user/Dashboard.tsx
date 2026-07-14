import '../../styles/Dashboard.css'
import { useUserContext } from '../../context/UserAuthContext';

const Dashboard = () => {
  const { user } = useUserContext();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="dashboard-content animate-fadeIn">
      <div className="dashboard-header-premium">
        <div className="header-greeting">
          <h1>{getGreeting()}, {user?.firstName}</h1>
        </div>
      </div>
    </div>
  );
}

export default Dashboard