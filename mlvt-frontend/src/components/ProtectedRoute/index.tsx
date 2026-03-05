import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
    children,
}: {
    children: React.ReactNode;
}): React.ReactElement | null => {
    const authToken = localStorage.getItem("authToken");
    return authToken ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
