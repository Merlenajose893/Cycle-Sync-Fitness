import { BrowserRouter,Routes,Route } from "react-router-dom";
<<<<<<< HEAD
// import AppLayout from "../layouts/AppLayouts";
=======
>>>>>>> 081b12d (changes)
import RegisterPage from "../pages/user/Register";
import Home from "../pages/user/Home";
import Login from "../pages/user/Login";
import Dashboard from "../pages/user/Dashboard";
import VerifyOtp from "../pages/user/VerifyOtp";
<<<<<<< HEAD
import ForgotPasswordPage from "../pages/user/ForgotPassword";
import ResetPasswordPage from "../pages/user/ResetPassword";
=======
>>>>>>> 081b12d (changes)
import VerificationSuccess from "../pages/user/VerificationSuccess";
import Onboarding from "../pages/user/Onboarding";
import TrainerRegister from "../pages/trainer/TrainerRegister";
import TrainerLogin from "../pages/trainer/TrainerLogin";
import TrainerVerifyEmail from "../pages/trainer/TrainerVerify";
import TrainerVerificationSuccess from "../pages/trainer/TrainerVerifySuccess";
import TrainerOnboarding from "../pages/trainer/TrainerOnboarding";
<<<<<<< HEAD
import TrainerForgotPassword from "../pages/trainer/TrainerForgotPassword";
import TrainerResetPassword from "../pages/trainer/TrainerResetPassword";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboardPage from "../pages/admin/AdminDashboard";
import ManageUsersPage from "../pages/admin/ManageUsers";
import ManageTrainersPage from "../pages/admin/ManageTrainer";
import AppLayout from "../layouts/AppLayouts";
// import Dashboard from "../pages/user/Dashboard";
=======
import AdminLogin from "../pages/admin/AdminLogin";
>>>>>>> 081b12d (changes)
function AppRoutes()
{
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/verify-otp" element={<VerifyOtp/>}/>
<<<<<<< HEAD
            <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
            <Route path="/reset-password" element={<ResetPasswordPage/>}/>
            <Route path="/verification-success" element={<VerificationSuccess/>}/>
            <Route path="/onboarding" element={<Onboarding/>}/>
            <Route element={<AppLayout/>}>

            <Route path="/app" element={<Dashboard/>}/>
                </Route> 
            <Route path="/trainer/register" element={<TrainerRegister/>}/>
            <Route path="/trainer/login" element={<TrainerLogin/>}/>
            <Route path="/trainer/verify-otp" element={<TrainerVerifyEmail/>}/>
            <Route path="/trainer/forgot-password" element={<TrainerForgotPassword/>}/>
            <Route path="/trainer/reset-password" element={<TrainerResetPassword/>}/>
            <Route path="/trainer/success" element={<TrainerVerificationSuccess/>}/>
            <Route path="/trainer/onboarding" element={<TrainerOnboarding/>}/>
            <Route path="/admin/admin-login" element={<AdminLogin/>}/>
            <Route path="/admin" element={<AdminDashboardPage/>}/>
            <Route path="/admin/users" element={<ManageUsersPage/>}/>
            <Route path="/admin/trainers" element={<ManageTrainersPage/>}/>
=======
            <Route path="/verification-success" element={<VerificationSuccess/>}/>
            <Route path="/onboarding" element={<Onboarding/>}/>
            <Route path="/trainer/register" element={<TrainerRegister/>}/>
            <Route path="/trainer/login" element={<TrainerLogin/>}/>
            <Route path="/trainer/verify-otp" element={<TrainerVerifyEmail/>}/>
            <Route path="/trainer/success" element={<TrainerVerificationSuccess/>}/>
            <Route path="/trainer/onboarding" element={<TrainerOnboarding/>}/>
            <Route path="/admin/admin-login" element={<AdminLogin/>}/>
>>>>>>> 081b12d (changes)
            </Routes>
            </BrowserRouter>
    )
}

export default AppRoutes;