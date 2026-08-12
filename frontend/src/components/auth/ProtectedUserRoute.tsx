import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserAuthContext";

const ProtectedUserRoute = () => {
    const { isAuthenticated, user, loading } = useUserContext();
    const location = useLocation();

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

    if (user) {
        const isOnboardingRoute = location.pathname === "/onboarding";
        if (!user.onboardingComplete && !isOnboardingRoute) {
            return <Navigate to="/onboarding" replace />;
        }
        if (user.onboardingComplete && isOnboardingRoute) {
            return <Navigate to="/app" replace />;
        }
    }

    return <Outlet />;
};

export default ProtectedUserRoute;
