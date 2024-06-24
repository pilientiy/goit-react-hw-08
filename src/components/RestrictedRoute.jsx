import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "../redux/auth/selector"
import { Navigate } from "react-router-dom";

export default function RestrictedRoute({ component, redirectTo }) {
    const isLoginIn = useSelector(selectIsLoggedIn);
    return  isLoginIn ? <Navigate to={redirectTo} /> : component;    
}