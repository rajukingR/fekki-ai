import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./components/Profile";
import Auth0ProviderWithHistory from "./auth/Auth0ProviderWithHistory"
const App = () => {
  return (
    <Auth0ProviderWithHistory>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Profile />
      </Router>
    </Auth0ProviderWithHistory>
  );
};

export default App;
