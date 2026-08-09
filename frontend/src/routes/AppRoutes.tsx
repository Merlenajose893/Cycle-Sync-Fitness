import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "../pages/user/Register";
import Home from "../pages/user/Home";
import Login from "../pages/user/Login";
import Dashboard from "../pages/user/Dashboard";
import Profile from "../pages/user/Profile";
import Settings from "../pages/user/Settings";
import VerifyOtp from "../pages/user/VerifyOtp";
import ForgotPasswordPage from "../pages/user/ForgotPassword";
import ResetPasswordPage from "../pages/user/ResetPassword";
import VerificationSuccess from "../pages/user/VerificationSuccess";
import Onboarding from "../pages/user/Onboarding";
import HealthDashboard from "../pages/user/HealthDashboard";
import TrainerRegister from "../pages/trainer/TrainerRegister";
import TrainerLogin from "../pages/trainer/TrainerLogin";
import TrainerVerifyEmail from "../pages/trainer/TrainerVerify";
import TrainerVerificationSuccess from "../pages/trainer/TrainerVerifySuccess";
import TrainerOnboarding from "../pages/trainer/TrainerOnboarding";
import TrainerForgotPassword from "../pages/trainer/TrainerForgotPassword";
import TrainerResetPassword from "../pages/trainer/TrainerResetPassword";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboardPage from "../pages/admin/AdminDashboard";
import ManageUsersPage from "../pages/admin/ManageUsers";
import ManageTrainersPage from "../pages/admin/ManageTrainer";
import AppLayout from "../layouts/AppLayouts";
import AdminLayout from "../layouts/AdminLayout";
import TrainerDashboard from "../pages/trainer/trainerDashboard";
import TrainerLayout from "../layouts/TrainerLayout";
import BlockedPage from "../pages/common/BlockedPage";
import About from "../pages/common/About";
import TrainerPendingPage from "../pages/trainer/TrainerPending";
import TrainerRejectedPage from "../pages/trainer/TrainerRejectd";
import ProtectedUserRoute from "../components/auth/ProtectedUserRoute";
import ProtectedTrainerRoute from "../components/auth/ProtectedTrainerRoute";
import AIPlanBuilder from "../pages/user/AIPlanBuilder";
import AIPlanView from "../pages/user/AIPlanView";
import WorkoutDetail from "../pages/user/WorkoutDetail";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* ── Public Routes ── */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/verify-otp" element={<VerifyOtp />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/verification-success" element={<VerificationSuccess />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/blocked" element={<BlockedPage />} />

                {/* ── Protected User Routes ── */}
                <Route element={<ProtectedUserRoute />}>
                    <Route element={<AppLayout />}>
                        <Route path="/app" element={<Dashboard />} />
                        <Route path="/app/dashboard" element={<Dashboard />} />
                        <Route path="/app/profile" element={<Profile />} />
                        <Route path="/app/settings" element={<Settings />} />
                        <Route path="/app/ai-plan" element={<AIPlanBuilder />} />
                        <Route path="/app/ai-plan/view" element={<AIPlanView />} />
                        <Route path="/app/ai-plan/workout/:dayIndex" element={<WorkoutDetail />} />
                        <Route path="/app/health" element={<HealthDashboard />} />
                    </Route>
                </Route>

                {/* ── Trainer Public Routes ── */}
                <Route path="/trainer/register" element={<TrainerRegister />} />
                <Route path="/trainer/login" element={<TrainerLogin />} />
                <Route path="/trainer/verify-otp" element={<TrainerVerifyEmail />} />
                <Route path="/trainer/forgot-password" element={<TrainerForgotPassword />} />
                <Route path="/trainer/reset-password" element={<TrainerResetPassword />} />
                <Route path="/trainer/success" element={<TrainerVerificationSuccess />} />

                {/* ── Protected Trainer Routes ── */}
                <Route element={<ProtectedTrainerRoute allowedStatuses={["ONBOARDING", "REJECTED"]} />}>
                    <Route path="/trainer/onboarding" element={<TrainerOnboarding />} />
                </Route>

                <Route element={<ProtectedTrainerRoute allowedStatuses={["PENDING_APPROVAL"]} />}>
                    <Route path="/trainer/pending" element={<TrainerPendingPage />} />
                </Route>

                <Route element={<ProtectedTrainerRoute allowedStatuses={["REJECTED"]} />}>
                    <Route path="/trainer/rejected" element={<TrainerRejectedPage />} />
                </Route>

                <Route element={<ProtectedTrainerRoute allowedStatuses={["ACTIVE"]} />}>
                    <Route element={<TrainerLayout />}>
                        <Route path="/trainer" element={<TrainerDashboard />} />
                    </Route>
                </Route>

                {/* ── Admin Routes ── */}
                <Route path="/admin/admin-login" element={<AdminLogin />} />
                <Route element={<AdminLayout />}>
                    <Route path="/admin" element={<AdminDashboardPage />} />
                    <Route path="/admin/users" element={<ManageUsersPage />} />
                    <Route path="/admin/trainers" element={<ManageTrainersPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;