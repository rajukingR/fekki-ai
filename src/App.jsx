import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Auth0ProviderWithHistory from "./auth/Auth0ProviderWithHistory";
import AuthGuard from "./AuthGuard";
import Home from "./pages/Home";
import LoginRedirect from "./components/LoginRedirect"; // Updated
import SignIn from "./components/SignIn";

const App = () => {
  return (
    <Router>
  <Auth0ProviderWithHistory>
    <Routes>
      <Route
        path="/"
        element={
          <AuthGuard>
            <SignIn />
          </AuthGuard>
        }
      />
      <Route path="/login" element={<LoginRedirect />} />
      <Route path="/slot-booking" element={<AuthGuard><Profile /></AuthGuard>} />
      <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />

      {/* Catch-all 404 Route */}
      <Route path="*" element={<h2>404 Page Not Found</h2>} />
    </Routes>
  </Auth0ProviderWithHistory>
</Router>

  );
};

export default App;
