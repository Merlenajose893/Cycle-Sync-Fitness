import { Navigate, Outlet } from "react-router-dom";
import { useTrainerContext } from "../../context/TrainerAuthContext";

const ProtectedTrainerRoute = () => {
    const { isAuthenticated, loading } = useTrainerContext();

    if (loading) {
        return (
            <div className="route-guard-loader">
                <div className="route-guard-spinner" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/trainer/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedTrainerRoute;
