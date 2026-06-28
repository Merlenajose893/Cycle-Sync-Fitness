import { BrowserRouter,Routes,Route } from "react-router-dom";
import RegisterPage from "../pages/user/Register";
import Home from "../pages/user/Home";
import Login from "../pages/user/Login";
import Dashboard from "../pages/user/Dashboard";
import VerifyOtp from "../pages/user/VerifyOtp";
import VerificationSuccess from "../pages/user/VerificationSuccess";
import Onboarding from "../pages/user/Onboarding";
import TrainerRegister from "../pages/trainer/TrainerRegister";
import TrainerLogin from "../pages/trainer/TrainerLogin";
import TrainerVerifyEmail from "../pages/trainer/TrainerVerify";
import TrainerVerificationSuccess from "../pages/trainer/TrainerVerifySuccess";
import TrainerOnboarding from "../pages/trainer/TrainerOnboarding";
import AdminLogin from "../pages/admin/AdminLogin";
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
            <Route path="/verification-success" element={<VerificationSuccess/>}/>
            <Route path="/onboarding" element={<Onboarding/>}/>
            <Route path="/trainer/register" element={<TrainerRegister/>}/>
            <Route path="/trainer/login" element={<TrainerLogin/>}/>
            <Route path="/trainer/verify-otp" element={<TrainerVerifyEmail/>}/>
            <Route path="/trainer/success" element={<TrainerVerificationSuccess/>}/>
            <Route path="/trainer/onboarding" element={<TrainerOnboarding/>}/>
            <Route path="/admin/admin-login" element={<AdminLogin/>}/>
            </Routes>
            </BrowserRouter>
    )
}

export default AppRoutes;