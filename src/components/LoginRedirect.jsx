import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginRedirect = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    console.log("LoginRedirect Mounted");
    console.log("isAuthenticated:", isAuthenticated, "isLoading:", isLoading);

    if (!isAuthenticated && !isLoading) {
      console.log("Triggering loginWithRedirect");
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  if (isLoading) return <h1>Loading...</h1>;

  return null; // No button needed; just auto-redirect
};

export default LoginRedirect;
