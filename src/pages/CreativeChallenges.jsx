import React from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Avatar,
} from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";

const challenges = [
  { title: "Capacity", description: "Overworked team with high workload and limited bandwidth" },
  { title: "Expertise", description: "Lacking specialists to produce advanced asset types (video, web, VR/AR)" },
  { title: "Quality", description: "Creative assets or brand are not meeting quality standards" },
  { title: "Scaling", description: "Difficulty in ramping up creative production" },
  { title: "Resources", description: "Few or no internal creative resources to meet demand" },
  { title: "Costs", description: "Spending too much on current creative solution" },
];

const CreativeChallenges = () => {
  return (
    <Box sx={{ backgroundColor: "#001F1D", minHeight: "100vh", py: 5, position: "relative", color: "white" }}>
      {/* Top Bar */}
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", mb: 2 }}>
          {/* Centered Title */}
          <Typography variant="h6" fontWeight="bold">
            <span style={{ color: "#A3E635" }}>Superside</span> + Rohith's team
          </Typography>

          {/* RK Avatar (Positioned Absolutely on Right) */}
          <Box sx={{ position: "absolute", right: 0 }}>
            <Avatar sx={{ bgcolor: "#ccc", color: "#000", fontWeight: "bold" }}>RK</Avatar>
          </Box>
        </Box>

        {/* Progress Bar */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 3 }}>
          <Box sx={{ width: "50%", height: "5px", backgroundColor: "#A3E635", borderRadius: "5px" }}></Box>
          <Box sx={{ width: "50%", height: "5px", backgroundColor: "#333", borderRadius: "5px" }}></Box>
        </Box>
      </Container>

      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        {/* Step Progress Indicator */}
        <Typography variant="body2" color="gray">
          STEP 1 / 2
        </Typography>

        {/* Main Header */}
        <Typography variant="h5" gutterBottom sx={{ color: "#A3E635", fontStyle: "italic", mt: 1 }}>
          What are your current <i>creative challenges?</i>
        </Typography>
        <Typography variant="body2" color="gray" gutterBottom>
          We will offer the best solutions based on this selection.
        </Typography>

        {/* Challenge Cards */}
        <Grid container spacing={2} sx={{ mt: 3 }}>
          {challenges.map((challenge, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper
                elevation={3}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 2,
                  textAlign: "center",
                  backgroundColor: "#F5F5F5",
                  borderRadius: "8px",
                  width: "100%",
                  height: "150px",
                  transition: "transform 0.2s, background-color 0.3s",
                  "&:hover": {
                    backgroundColor: "#D9F99D",
                    transform: "scale(1.05)",
                  },
                  cursor: "pointer",
                }}
              >
                <CheckCircleOutline color="success" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="subtitle1" fontWeight="bold">
                  {challenge.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {challenge.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            position: "absolute",
            bottom: 20, // Adjust the distance from the bottom
            right: 20, // Adjust the distance from the right
          }}
        >
          <Button variant="contained" color="success" sx={{ px: 4, py: 1.5 }}>
            Continue
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CreativeChallenges;