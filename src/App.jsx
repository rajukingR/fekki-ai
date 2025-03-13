import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Auth0ProviderWithHistory from "./auth/Auth0ProviderWithHistory";
import AuthGuard from "./AuthGuard";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Auth0ProviderWithHistory>
        <Routes>
          {/* Protected Route */}
          <Route
            path="/sign-up"
            element={
              <AuthGuard>
                <Profile />
              </AuthGuard>
            }
          />
          <Route
            path="/"
            element={
              <AuthGuard>
                <Profile />
              </AuthGuard>
            }
          />
          
          {/* Public Route */}
          <Route path="/home" element={<Home />} />
        </Routes>
      </Auth0ProviderWithHistory>
    </Router>
  );
};

export default App;
