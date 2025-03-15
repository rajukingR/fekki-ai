import React from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import Logo from "../../public/logo.png";

const SignIn = () => {
  const { isAuthenticated, logout, user } = useAuth0();

  return (
    <Container maxWidth="sm">
      {/* Centered Logo */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <Box
          component="img"
          src={Logo}
          alt="Logo"
          sx={{ width: 200, height: "auto" }}
        />
      </Box>

      {/* Description Text */}
      <Typography variant="h5" align="center" sx={{ mt: 2, mb: 4 }}>
        Welcome to Our Application. Please sign in to continue.
      </Typography>

      {/* Centered Login Button */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default SignIn;
