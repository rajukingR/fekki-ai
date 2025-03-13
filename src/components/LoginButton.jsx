import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithPopup, user, isAuthenticated } = useAuth0();

  const handleLogin = async () => {
    await loginWithPopup();
  };

  return (
    !isAuthenticated ? (
      <button onClick={handleLogin} className="btn">
        Log In
      </button>
    ) : (
      <p>Welcome, {user?.name}</p>
    )
  );
};

export default LoginButton;
