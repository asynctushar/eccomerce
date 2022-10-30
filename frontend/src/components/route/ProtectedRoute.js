import { Navigate } from "react-router";
import Loader from "../Loader/Loader";

const ProtectedRoute = ({ isAuthenticated, isLoading, children }) => {
    if (isLoading) {
        return <Loader />;
    } else if (!isAuthenticated && !isLoading) {
        return <Navigate to="/login" />
    }

    return children;
}

export default ProtectedRoute;