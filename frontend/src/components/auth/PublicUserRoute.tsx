import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../context/UserAuthContext";

const PublicUserRoute = () => {
    const { isAuthenticated, user, loading } = useUserContext();

    if (loading) {
        return (
            <div className="route-guard-loader">
                <div className="route-guard-spinner" />
            </div>
        );
    }

    if (isAuthenticated) {
        if (user && !user.onboardingComplete) {
            return <Navigate to="/onboarding" replace />;
        }
        return <Navigate to="/app" replace />;
    }

    return <Outlet />;
};

export default PublicUserRoute;
