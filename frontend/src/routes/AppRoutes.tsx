
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
import ManageSubscriptionPlans from "../pages/admin/ManageSubscriptionPlans";
import AppLayout from "../layouts/AppLayouts";
import AdminLayout from "../layouts/AdminLayout";
import TrainerDashboard from "../pages/trainer/trainerDashboard";
import TrainerProfile from "../pages/trainer/TrainerProfile";
import TrainerLayout from "../layouts/TrainerLayout";
import FoodsAndRecipes from "../pages/trainer/FoodsAndRecipes";
import TrainerClients from "../pages/trainer/TrainerClients";
import TrainerWorkouts from "../pages/trainer/TrainerWorkouts";
import TrainerPackages from "../pages/trainer/TrainerPackages";
import TrainerSlots from "../pages/trainer/TrainerSlots";
import BlockedPage from "../pages/common/BlockedPage";
import About from "../pages/common/About";
import TrainerPendingPage from "../pages/trainer/TrainerPending";
import TrainerRejectedPage from "../pages/trainer/TrainerRejectd";
import ProtectedUserRoute from "../components/auth/ProtectedUserRoute";
import ProtectedTrainerRoute from "../components/auth/ProtectedTrainerRoute";
import PublicUserRoute from "../components/auth/PublicUserRoute";
import PublicTrainerRoute from "../components/auth/PublicTrainerRoute";
import AIPlanBuilder from "../pages/user/AIPlanBuilder";
import AIPlanView from "../pages/user/AIPlanView";
import AIPlanHistory from "../pages/user/AIPlanHistory";
import WorkoutDetail from "../pages/user/WorkoutDetail";
import Food from "../pages/user/Food";
import Exercise from "../pages/user/Exercise";
import Reports from "../pages/user/Reports";
import Messages from "../pages/user/Messages";
import Trainers from "../pages/user/Trainers";
import TrainerDetail from "../pages/user/TrainerDetail";
import Subscription from "../pages/user/Subscription";
import PaymentSuccess from "../pages/user/PaymentSuccess";
import PaymentCancel from "../pages/user/PaymentCancel";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* ── Public Routes ── */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/blocked" element={<BlockedPage />} />

                {/* ── Public Guest-Only User Routes ── */}
                <Route element={<PublicUserRoute />}>
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/verify-otp" element={<VerifyOtp />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                    <Route path="/verification-success" element={<VerificationSuccess />} />
                </Route>

                {/* ── Protected User Routes ── */}
                <Route element={<ProtectedUserRoute />}>
                    <Route path="/onboarding" element={<Onboarding />} />
                    <Route element={<AppLayout />}>
                        <Route path="/app" element={<Dashboard />} />
                        <Route path="/app/dashboard" element={<Dashboard />} />
                        <Route path="/app/profile" element={<Profile />} />
                        <Route path="/app/settings" element={<Settings />} />
                        <Route path="/app/ai-plan" element={<AIPlanBuilder />} />
                        <Route path="/app/ai-plan/edit/:planId" element={<AIPlanBuilder />} />
                        <Route path="/app/ai-plan/view" element={<AIPlanView />} />
                        <Route path="/app/ai-plan/history" element={<AIPlanHistory />} />
                        <Route path="/app/ai-plan/workout/:dayIndex" element={<WorkoutDetail />} />
                        <Route path="/app/food" element={<Food />} />
                        <Route path="/app/exercise" element={<Exercise />} />
                        <Route path="/app/reports" element={<Reports />} />
                        <Route path="/app/messages" element={<Messages />} />
                        <Route path="/app/trainer" element={<Trainers />} />
                        <Route path="/app/trainer/:trainerId" element={<TrainerDetail />} />
                        <Route path="/app/premium" element={<Subscription />} />
                        <Route path="/app/health" element={<HealthDashboard />} />
                        <Route path="/payment/success" element={<PaymentSuccess />} />
                        <Route path="/payment/cancel" element={<PaymentCancel />} />
                    </Route>
                </Route>

                {/* ── Trainer Public Guest-Only Routes ── */}
                <Route element={<PublicTrainerRoute />}>
                    <Route path="/trainer/register" element={<TrainerRegister />} />
                    <Route path="/trainer/login" element={<TrainerLogin />} />
                    <Route path="/trainer/verify-otp" element={<TrainerVerifyEmail />} />
                    <Route path="/trainer/forgot-password" element={<TrainerForgotPassword />} />
                    <Route path="/trainer/reset-password" element={<TrainerResetPassword />} />
                    <Route path="/trainer/success" element={<TrainerVerificationSuccess />} />
                </Route>

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
                        <Route path="/trainer/dashboard" element={<TrainerDashboard />} />
                        <Route path="/trainer/clients" element={<TrainerClients />} />
                        <Route path="/trainer/workouts" element={<TrainerWorkouts />} />
                        <Route path="/trainer/packages" element={<TrainerPackages />} />
                        <Route path="/trainer/nutrition" element={<FoodsAndRecipes />} />
                        <Route path="/trainer/slots" element={<TrainerSlots />} />
                        <Route path="/trainer/profile" element={<TrainerProfile />} />
                    </Route>
                </Route>

                {/* ── Admin Routes ── */}
                <Route path="/admin/admin-login" element={<AdminLogin />} />
                <Route element={<AdminLayout />}>
                    <Route path="/admin" element={<AdminDashboardPage />} />
                    <Route path="/admin/users" element={<ManageUsersPage />} />
                    <Route path="/admin/trainers" element={<ManageTrainersPage />} />
                    <Route path="/admin/subscriptions" element={<ManageSubscriptionPlans />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;

