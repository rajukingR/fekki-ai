import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <h1>Loading...</h1>;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default AuthGuard;
