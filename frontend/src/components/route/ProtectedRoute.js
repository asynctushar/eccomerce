import { Navigate } from "react-router";
import Loader from "../Loader/Loader";

const ProtectedRoute = ({ isAuthenticated, isLoading, children }) => {
    if (!isAuthenticated && !isLoading) {
        return <Navigate to="/login" />
    } else if (isLoading) {
        return <Loader />
    }
    return children;
}

export default ProtectedRoute;