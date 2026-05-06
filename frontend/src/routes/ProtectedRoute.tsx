import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const ProtectedRoute=({children,role}:any)=>{
    const {token,role:userRole}=useAuth();
    if(!token)
    {
        return <Navigate to="/login"/>
    }
    if(role && role!==userRole)
    {
        return <Navigate to="/"/>
    }

    return children;
}

export default ProtectedRoute;