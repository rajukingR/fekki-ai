import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { isAuthenticated, user } = useAuth0();

  if (!isAuthenticated || !user) {
    return <h1>Loading...</h1>; // Handle loading state properly
  }

  return <h1>Welcome to {user.name}</h1>;
};

export default Home;
