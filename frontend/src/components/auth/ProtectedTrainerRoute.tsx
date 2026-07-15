import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useTrainerContext } from "../../context/TrainerAuthContext";

interface ProtectedTrainerRouteProps {
    allowedStatuses?: string[];
}

const ProtectedTrainerRoute: React.FC<ProtectedTrainerRouteProps> = ({ allowedStatuses }) => {
    const { isAuthenticated, loading, trainer } = useTrainerContext();

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

    if (allowedStatuses && trainer && trainer.status) {
        if (!allowedStatuses.includes(trainer.status)) {
            // Determine correct redirect based on status
            switch (trainer.status) {
                case "REGISTERED":
                    return <Navigate to="/trainer/verify-otp" replace />;
                case "ONBOARDING":
                    return <Navigate to="/trainer/onboarding" replace />;
                case "PENDING_APPROVAL":
                    return <Navigate to="/trainer/pending" replace />;
                case "REJECTED":
                    return <Navigate to="/trainer/rejected" replace />;
                case "ACTIVE":
                    return <Navigate to="/trainer" replace />;
                default:
                    return <Navigate to="/trainer/login" replace />;
            }
        }
    }

    return <Outlet />;
};

export default ProtectedTrainerRoute;
