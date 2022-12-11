import { Fragment } from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ isAdmin, user, isAuthenticated, isLoading, children }) => {
    return (
        <Fragment>
            {!isAdmin && !isLoading && isAuthenticated && children}
            {isAdmin && !isLoading && isAuthenticated && user.role === "admin" && children}
            {!isLoading && !isAuthenticated && <Navigate to="/login" />}
            {isAdmin && !isLoading && isAuthenticated && user.role !== "admin" && <Navigate to="/login" />}
        </Fragment>
    )


}

export default ProtectedRoute;