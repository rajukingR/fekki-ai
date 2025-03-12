import { useAuth0 } from "@auth0/auth0-react";

const Dashboard = () => {
  const { isAuthenticated } = useAuth0();

  return (
    isAuthenticated ? <h1>Dashboard: Protected Content</h1> : <h1>Please Log In</h1>
  );
};

export default Dashboard;
