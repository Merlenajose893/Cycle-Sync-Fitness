import { BrowserRouter,Routes,Route } from "react-router-dom";
import RegisterPage from "../pages/user/Register";
import Home from "../pages/user/Home";
import Login from "../pages/user/Login";
import Dashboard from "../pages/user/Dashboard";
import VerifyOtp from "../pages/user/VerifyOtp";
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
            </Routes>
            </BrowserRouter>
    )
}

export default AppRoutes;