import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD

=======
>>>>>>> feature/admin-manage
import RegisterPage from "../pages/user/Register";
import Home from "../pages/user/Home";
import Login from "../pages/user/Login";
import Dashboard from "../pages/user/Dashboard";
import VerifyOtp from "../pages/user/VerifyOtp";
import ForgotPasswordPage from "../pages/user/ForgotPassword";
import ResetPasswordPage from "../pages/user/ResetPassword";
import VerificationSuccess from "../pages/user/VerificationSuccess";
import Onboarding from "../pages/user/Onboarding";

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
<<<<<<< HEAD

import AppLayout from "../layouts/AppLayouts";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public User Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/verify-otp" element={<VerifyOtp />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/verification-success" element={<VerificationSuccess />} />
                <Route path="/onboarding" element={<Onboarding />} />

                {/* Protected User Routes */}
                <Route element={<AppLayout />}>
                    <Route path="/app" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>

                {/* Trainer Routes */}
=======
import AppLayout from "../layouts/AppLayouts";
import AdminLayout from "../layouts/AdminLayout";
// import Dashboard from "../pages/user/Dashboard";
function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/verify-otp" element={<VerifyOtp />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/verification-success" element={<VerificationSuccess />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route element={<AppLayout />}>

                    <Route path="/app" element={<Dashboard />} />
                </Route>
>>>>>>> feature/admin-manage
                <Route path="/trainer/register" element={<TrainerRegister />} />
                <Route path="/trainer/login" element={<TrainerLogin />} />
                <Route path="/trainer/verify-otp" element={<TrainerVerifyEmail />} />
                <Route path="/trainer/forgot-password" element={<TrainerForgotPassword />} />
                <Route path="/trainer/reset-password" element={<TrainerResetPassword />} />
                <Route path="/trainer/success" element={<TrainerVerificationSuccess />} />
                <Route path="/trainer/onboarding" element={<TrainerOnboarding />} />
<<<<<<< HEAD

                {/* Admin Routes */}
                <Route path="/admin/admin-login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="/admin/users" element={<ManageUsersPage />} />
                <Route path="/admin/trainers" element={<ManageTrainersPage />} />
            </Routes>
        </BrowserRouter>
    );
=======
                <Route path="/admin/admin-login" element={<AdminLogin />} />
                <Route element={<AdminLayout/>}>

                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="/admin/users" element={<ManageUsersPage />} />
                <Route path="/admin/trainers" element={<ManageTrainersPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
>>>>>>> feature/admin-manage
}

export default AppRoutes;