import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect({ appState: { returnTo: "/profile" } });
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/sign-up");
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) return <h1>Loading...</h1>;

  return isAuthenticated ? children : null; 
};

export default AuthGuard;
