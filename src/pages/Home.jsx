import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Paper,
  Avatar,
  IconButton,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const timeSlots = [
  "8:00 am",
  "8:30 am",
  "9:00 am",
  "9:30 am",
  "10:00 am",
  "10:30 am",
  "11:00 am",
  "11:30 am",
  "12:00 pm",
  "12:30 pm",
  "1:00 pm",
  "1:30 pm",
  "2:00 pm",
  "2:30 pm",
  "3:00 pm",
  "3:30 pm",
  "4:00 pm",
  "4:30 pm",
  "5:00 pm",
  "5:30 pm",
];

const Home = () => {
  const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [showAllSlots, setShowAllSlots] = useState(false);

  if (!isAuthenticated || !user) {
    return <h1>Loading...</h1>;
  }

  const loginUserEmail = user?.email;

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    if (!selectedTime) {
      alert("Please select a time slot!");
      return;
    }

    const appointmentData = {
      user_name: user.name,
      user_email: loginUserEmail,
      appointment_date: format(selectedDate, "yyyy-MM-dd"),
      appointment_time: selectedTime,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/appointment/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(appointmentData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(
          `Appointment confirmed for ${format(
            selectedDate,
            "EEEE, MMM d"
          )} at ${selectedTime}`
        );
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  const visibleTimeSlots = showAllSlots ? timeSlots : timeSlots.slice(0, 16);

  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>
      {/* Top Right Avatar */}
      <Box sx={{ position: "absolute", top: 10, right: 20 }}>
        <IconButton>
          <Avatar sx={{ bgcolor: "#ccc", color: "#000", fontWeight: "bold" }}>
            {user?.name
              ?.split(" ")
              .map((word) => word.charAt(0).toUpperCase())
              .slice(0, 2)
              .join("")}
          </Avatar>
        </IconButton>
      </Box>

      {/* Main Content */}
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <Paper
          elevation={3}
          sx={{
            width: { xs: "90%", sm: "80%", md: "70%" },
            p: 3,
            borderRadius: 2,
            bgcolor: "white",
            mt: { xs: "50px", md: "100px" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              gap: 3,
            }}
          >
            {/* Left Side - User's Name */}
            <Box
              sx={{
                textAlign: { xs: "center", md: "left" },
                width: { md: "20%" },
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                Welcome, {user.name}
              </Typography>
            </Box>

            {/* Center - Calendar */}
            <Box sx={{ flexGrow: 1, textAlign: "center" }}>
              <Typography variant="h6" fontWeight="bold">
                Select a Date
              </Typography>
              <Typography variant="body2" color="gray">
                Timezone: Israel Daylight Time (GMT+3)
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                />
              </LocalizationProvider>
            </Box>

            {/* Right Side - Time Slots */}
            <Box sx={{ width: { xs: "100%", md: "30%" }, textAlign: "center" }}>
              <Typography variant="h6" fontWeight="bold">
                {format(selectedDate, "EEEE, MMM d")}
              </Typography>

              <Grid container spacing={1} mt={1}>
                {visibleTimeSlots.map((time) => (
                  <Grid item xs={6} key={time}>
                    <Button
                      variant={selectedTime === time ? "contained" : "outlined"}
                      onClick={() => setSelectedTime(time)}
                      sx={{
                        width: "100%",
                        color: selectedTime === time ? "white" : "black",
                      }}
                    >
                      {time}
                    </Button>
                  </Grid>
                ))}
              </Grid>

              {/* Show/Hide Sessions Button */}
              <Box mt={2}>
                {showAllSlots ? (
                  <Typography
                    variant="body2"
                    sx={{ color: "blue", cursor: "pointer" }}
                    onClick={() => setShowAllSlots(false)}
                  >
                    Hide sessions
                  </Typography>
                ) : (
                  <Typography
                    variant="body2"
                    sx={{ color: "blue", cursor: "pointer" }}
                    onClick={() => setShowAllSlots(true)}
                  >
                    Show all sessions
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>

          {/* Back & Submit Buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              gap: 2,
              mt: 4,
            }}
          >
            <Button
              onClick={handleBack}
              variant="contained"
              sx={{
                px: 4,
                backgroundColor: "#366A5A",
                fontWeight: "bold",
                width: { xs: "100%", sm: "auto" },
                "&:hover": { backgroundColor: "#2a5248" },
              }}
            >
              Back
            </Button>

            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                px: 4,
                backgroundColor: "#366A5A",
                fontWeight: "bold",
                width: { xs: "100%", sm: "auto" },
                "&:hover": { backgroundColor: "#2a5248" },
              }}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Home;






// import React from "react";
// import { Box, Button, TextField, Typography, Stepper, Step, StepLabel } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// const steps = ["Basic Information", "Application Use Case", "Questions Here"];

// const MultiStepForm = () => {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//         backgroundImage: "url('https://source.unsplash.com/1600x900/?technology')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         p: 2,
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           width: "70%",
//           background: "#fff",
//           borderRadius: "12px",
//           boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
//           overflow: "hidden",
//         }}
//       >
//         {/* Sidebar */}
//         <Box sx={{ width: "30%", p: 3, background: "#F8F9FA" }}>
//           <Stepper activeStep={0} orientation="vertical">
//             {steps.map((label, index) => (
//               <Step key={index}>
//                 <StepLabel>{label}</StepLabel>
//               </Step>
//             ))}
//           </Stepper>
//         </Box>

//         {/* Form Section */}
//         <Box sx={{ flex: 1, p: 4 }}>
//           <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
//             1. First Name & Last Name
//           </Typography>
//           <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
//             <TextField fullWidth placeholder="Enter Your First Name" size="small" />
//             <TextField fullWidth placeholder="Enter Your Last Name" size="small" />
//           </Box>

//           <Typography variant="h6" sx={{ mb: 1 }}>2. Company Name</Typography>
//           <TextField fullWidth placeholder="Enter Your Company Name" size="small" sx={{ mb: 2 }} />

//           <Typography variant="h6" sx={{ mb: 1 }}>3. Email Address</Typography>
//           <TextField fullWidth placeholder="Enter Your Email" size="small" sx={{ mb: 2 }} />

//           <Typography variant="h6" sx={{ mb: 1 }}>4. Phone Number</Typography>
//           <TextField fullWidth placeholder="Enter Your Number" size="small" sx={{ mb: 3 }} />

//           {/* Navigation Buttons */}
//           <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
//             <Button startIcon={<ArrowBackIcon />} sx={{ color: "green", textTransform: "none" }}>
//               Back
//             </Button>
//             <Button variant="contained" color="success" endIcon={<ArrowForwardIcon />} sx={{ textTransform: "none" }}>
//               Next
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default MultiStepForm;






// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   FormGroup,
//   FormControlLabel,
//   Checkbox,
//   TextField,
//   Avatar,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";

// const options = [
//   { id: "ar", label: "Augmented Reality (AR)" },
//   { id: "vr", label: "Virtual Reality (VR)" },
// ];

// const goals = [
//   { id: "assembly", label: "Assembly Guidance" },
//   { id: "troubleshooting", label: "Troubleshooting Assistance" },
//   { id: "training", label: "Operational Training" },
// ];

// const platforms = [
//   { id: "mobile", label: "Mobile devices" },
//   { id: "glasses", label: "Smart glasses" },
//   { id: "vr_headsets", label: "VR headsets" },
//   { id: "desktop", label: "Desktop application" },
//   { id: "web", label: "Web-based experience" },
// ];

// const ImmersiveTechSelection = () => {

//   const [step, setStep] = useState(1);
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [productDetails, setProductDetails] = useState("");
//   const [selectedGoals, setSelectedGoals] = useState([]);
//   const [requirements, setRequirements] = useState("");
//   const [selectedPlatforms, setSelectedPlatforms] = useState([]);
//   const [compliance, setCompliance] = useState("");
//   const navigate = useNavigate();
//   const { isAuthenticated, user } = useAuth0();

//   if (!isAuthenticated || !user) {
//     return <h1>Loading...</h1>;
//   }

//   const loginUserEmail = user?.email;

//   const loginUserName = user?.name;


//   const handleCheckboxChange = (id, stateUpdater) => {
//     stateUpdater((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//     );
//   };

//   const handleSubmit = async () => {
//     const formData = {
//       email:loginUserEmail,
//       fullname:loginUserName,
//       immersiveTechnology: selectedOptions,
//       productDetails,
//       goals: selectedGoals,
//       requirements,
//       platforms: selectedPlatforms,
//       compliance,
//     };

//     console.log("Submitting data:", formData); // Debugging: Check data in console

//     try {
//       const response = await fetch("http://localhost:5000/api/immersive-tech-selections/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();
//       console.log("API Response:", result);

//       if (response.ok) {
//         alert("Submission successful!");
//         navigate("/thank-you"); // Redirect after submission (optional)
//       } else {
//         alert("Error submitting data.");
//       }
//     } catch (error) {
//       console.error("Submission Error:", error);
//     }
//   };

//   const handleNext = () => {
//     if (step < 6) setStep(step + 1);
//     else handleSubmit(); // Call API on last step
//   };

//   const handleBack = () => {
//     if (step > 1) setStep(step - 1);
//   };

//   return (
//     <Box sx={{ minHeight: "100vh", p: 4, textAlign: "center" }}>
//       <Box sx={{ position: "absolute", top: 16,mb:10, right: 16 }}>
//         <Avatar
//           src="https://your-avatar-url.com/avatar.jpg"
//           alt="User Avatar"
//           sx={{ width: 40, height: 40, cursor: "pointer" }}
//         />
//       </Box>
//       <Typography variant="h5" fontWeight="bold" sx={{ color: "white",mb:10 }}>
//         Superside + Rohith’s Team
//       </Typography>

//       <Box
//         sx={{
//           mt: 3,
//           background: "white",
//           textAlign: "left",
//           maxWidth: 600,
//           mx: "auto",
//           p: 3,
//           borderRadius: 2,
//           boxShadow: 2,
//           border: "1px solid black",
//         }}
//       >
//         <Box
//           sx={{
//             backgroundColor: "white",
//             color: "black",
//             p: 2,
//             borderRadius: 2,
//             mb: 2,
//           }}
//         >
//           <Typography
//             variant="h4"
//             fontWeight="bold"
//             sx={{
//               fontStyle: "italic",
//               fontSize: "20px",
//               fontFamily: "Inter Tight",
//             }}
//           >
//             {step === 1 &&
//               "What type of immersive technology solution are you interested in?"}
//             {step === 2 &&
//               "Which product(s) or manual(s) would you like to enhance?"}
//             {step === 3 &&
//               "What is the primary goal of your immersive solution?"}
//             {step === 4 && "Do you have specific requirements in mind?"}
//             {step === 5 && "What is your preferred platform?"}
//             {step === 6 && "Are there any compliance requirements?"}
//           </Typography>
//         </Box>

//         {step === 1 && (
//           <FormGroup>
//             {options.map((option) => (
//               <FormControlLabel
//                 key={option.id}
//                 control={
//                   <Checkbox
//                     checked={selectedOptions.includes(option.id)}
//                     onChange={() =>
//                       handleCheckboxChange(option.id, setSelectedOptions)
//                     }
//                     sx={{ color: "black" }}
//                   />
//                 }
//                 label={
//                   <Typography sx={{ color: "black" }}>
//                     {option.label}
//                   </Typography>
//                 }
//               />
//             ))}
//           </FormGroup>
//         )}

//         {step === 2 && (
//           <TextField
//             fullWidth
//             variant="outlined"
//             placeholder="Enter product details..."
//             value={productDetails}
//             onChange={(e) => setProductDetails(e.target.value)}
//           />
//         )}

//         {step === 3 && (
//           <FormGroup>
//             {goals.map((goal) => (
//               <FormControlLabel
//                 key={goal.id}
//                 control={
//                   <Checkbox
//                     checked={selectedGoals.includes(goal.id)}
//                     onChange={() =>
//                       handleCheckboxChange(goal.id, setSelectedGoals)
//                     }
//                     sx={{ color: "black" }}
//                   />
//                 }
//                 label={
//                   <Typography sx={{ color: "black" }}>{goal.label}</Typography>
//                 }
//               />
//             ))}
//           </FormGroup>
//         )}

//         {step === 4 && (
//           <TextField
//             fullWidth
//             variant="outlined"
//             placeholder="Enter requirements..."
//             value={requirements}
//             onChange={(e) => setRequirements(e.target.value)}
//           />
//         )}

//         {step === 5 && (
//           <FormGroup>
//             {platforms.map((platform) => (
//               <FormControlLabel
//                 key={platform.id}
//                 control={
//                   <Checkbox
//                     checked={selectedPlatforms.includes(platform.id)}
//                     onChange={() =>
//                       handleCheckboxChange(platform.id, setSelectedPlatforms)
//                     }
//                     sx={{ color: "black" }}
//                   />
//                 }
//                 label={
//                   <Typography sx={{ color: "black" }}>
//                     {platform.label}
//                   </Typography>
//                 }
//               />
//             ))}
//           </FormGroup>
//         )}

//         {step === 6 && (
//           <TextField
//             fullWidth
//             variant="outlined"
//             placeholder="Specify compliance requirements..."
//             value={compliance}
//             onChange={(e) => setCompliance(e.target.value)}
//           />
//         )}
//       </Box>

//       {/* Buttons */}
//       <Box
//         sx={{
//           mt: 4,
//           display: "flex",
//           justifyContent: "space-between",
//           maxWidth: 600,
//           mx: "auto",
//         }}
//       >
//         <Button
//           variant="contained"
//           onClick={handleBack}
//           sx={{
//             backgroundColor: "gray",
//             color: "white",
//             textTransform: "none",
//             fontWeight: "bold",
//           }}
//           disabled={step === 1}
//         >
//           Back
//         </Button>

//         <Button
//           variant="contained"
//           onClick={handleNext}
//           sx={{
//             backgroundColor: "#B7FF6A",
//             color: "#0E1C11",
//             textTransform: "none",
//             fontWeight: "bold",
//           }}
//         >
//           {step < 6 ? "Continue" : "Submit"}
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default ImmersiveTechSelection;
