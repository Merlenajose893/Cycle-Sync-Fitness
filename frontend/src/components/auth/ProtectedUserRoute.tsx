import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../context/UserAuthContext";

const ProtectedUserRoute = () => {
    const { isAuthenticated, loading } = useUserContext();

    if (loading) {
        return (
            <div className="route-guard-loader">
                <div className="route-guard-spinner" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedUserRoute;
