import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Logo from "../../public/logo.png";

const options = [
  { id: "ar", label: "Augmented Reality (AR)" },
  { id: "vr", label: "Virtual Reality (VR)" },
];

const goals = [
  { id: "assembly", label: "Assembly Guidance" },
  { id: "troubleshooting", label: "Troubleshooting Assistance" },
  { id: "training", label: "Operational Training" },
];

const platforms = [
  { id: "mobile", label: "Mobile devices" },
  { id: "glasses", label: "Smart glasses" },
  { id: "vr_headsets", label: "VR headsets" },
  { id: "desktop", label: "Desktop application" },
  { id: "web", label: "Web-based experience" },
];

const ImmersiveTechSelection = () => {
  const [step, setStep] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [productDetails, setProductDetails] = useState("");
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [requirements, setRequirements] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [compliance, setCompliance] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth0();
  const [open, setOpen] = useState(false);
  const [isAvatarClicked, setIsAvatarClicked] = useState(false);

  if (!isAuthenticated || !user) {
    return <h1>Loading...</h1>;
  }

  const getInitials = (name) => {
    const nameParts = name.split(" ");
    const firstInitial = nameParts[0]?.[0]?.toUpperCase();
    const secondInitial = nameParts[1]?.[0]?.toUpperCase();
    return `${firstInitial}${secondInitial || ""}`;
  };

  const loginUserEmail = user?.email;

  const loginUserName = user?.name;

  const initials = getInitials(loginUserName);

  const handleCheckboxChange = (id, stateUpdater) => {
    stateUpdater((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    const data = {
      email: loginUserEmail,
      fullname: loginUserName,
      immersiveTechnology: selectedOptions
        .map((id) => options.find((opt) => opt.id === id)?.label)
        .join(", "),
      productDetails,
      goals: selectedGoals
        .map((id) => goals.find((goal) => goal.id === id)?.label)
        .join(", "),
      requirements,
      platforms: selectedPlatforms
        .map((id) => platforms.find((platform) => platform.id === id)?.label)
        .join(", "),
      compliance,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/immersive-tech-selections/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        setOpen(true);

        console.log(data, "kkkkkkkkkkkkkkkk");
      } else {
        alert("Failed to submit form");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form");
    }
  };

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 4,
        textAlign: "center",
        display: "contents",
      }}
    >
      <Box sx={{ position: "absolute", top: 16, right: 16 }}>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            cursor: "pointer",
            backgroundColor: "#1976d2",
          }}
          onClick={() => setIsAvatarClicked(!isAvatarClicked)}
        >
          {initials}
        </Avatar>
      </Box>

      {isAvatarClicked && (
        <Box sx={{ position: "absolute", top: 70, right: 10 }}>
          <Button
  variant="contained"
  sx={{
    backgroundColor: "#808080", // Gray background
    color: "white",              // White text
    "&:hover": {
      backgroundColor: "#6c6c6c", // Darker gray when hovered
    },
  }}
  size="large"
  onClick={() =>
    logout({ logoutParams: { returnTo: window.location.origin } })
  }
>
  Logout
</Button>

        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Box
          component="img"
          src={Logo}
          alt="Logo"
          sx={{ width: 150, height: "auto" }}
        />
      </Box>
      <Typography variant="h5" fontWeight="bold" sx={{ color: "black" }}>
        Discover the Future of Training with Fekki’s AR Solutions
      </Typography>

      <Box
        sx={{
          mt: 3,
          background: "white",
          textAlign: "left",
          maxWidth: 600,
          mx: "auto",
          p: 3,
          borderRadius: 2,
          boxShadow: 2,
          border: "1px solid black",
        }}
      >
        {/* Question Box */}
        <Box
          sx={{
            backgroundColor: "white",
            color: "black",
            borderRadius: 2,
            mb: 2,
            textAlign: "start",
            maxWidth: "100%", // Ensuring consistent width
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Inter Tight, sans-serif",
              fontSize: "20px",
              fontWeight: 500, // Set to 500
            }}
          >
            {step === 1 &&
              "1. What type of immersive technology solution are you interested in?"}
            {step === 2 &&
              "2. Which product(s) or manual(s) would you like to enhance?"}
            {step === 3 &&
              "3. What is the primary goal of your immersive solution?"}
            {step === 4 && "4. Do you have specific requirements in mind?"}
            {step === 5 && "5. What is your preferred platform?"}
            {step === 6 && "6. Are there any compliance requirements?"}
          </Typography>
        </Box>

        {step === 1 && (
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel
                key={option.id}
                control={
                  <Checkbox
                    checked={selectedOptions.includes(option.id)}
                    onChange={() =>
                      handleCheckboxChange(option.id, setSelectedOptions)
                    }
                    sx={{ color: "black" }}
                  />
                }
                label={
                  <Typography
                    sx={{ color: "black", fontSize: "16px", fontWeight: 400 }}
                  >
                    {option.label}
                  </Typography>
                }
              />
            ))}
          </FormGroup>
        )}

        {step === 2 && (
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter product details..."
            value={productDetails}
            onChange={(e) => setProductDetails(e.target.value)}
          />
        )}

        {step === 3 && (
          <FormGroup>
            {goals.map((goal) => (
              <FormControlLabel
                key={goal.id}
                control={
                  <Checkbox
                    checked={selectedGoals.includes(goal.id)}
                    onChange={() =>
                      handleCheckboxChange(goal.id, setSelectedGoals)
                    }
                    sx={{ color: "black" }}
                  />
                }
                label={
                  <Typography sx={{ color: "black" }}>{goal.label}</Typography>
                }
              />
            ))}
          </FormGroup>
        )}

        {step === 4 && (
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter requirements..."
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
          />
        )}

        {step === 5 && (
          <FormGroup>
            {platforms.map((platform) => (
              <FormControlLabel
                key={platform.id}
                control={
                  <Checkbox
                    checked={selectedPlatforms.includes(platform.id)}
                    onChange={() =>
                      handleCheckboxChange(platform.id, setSelectedPlatforms)
                    }
                    sx={{ color: "black" }}
                  />
                }
                label={
                  <Typography sx={{ color: "black" }}>
                    {platform.label}
                  </Typography>
                }
              />
            ))}
          </FormGroup>
        )}

        {step === 6 && (
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Specify compliance requirements..."
            value={compliance}
            onChange={(e) => setCompliance(e.target.value)}
          />
        )}
      </Box>

      {/* Buttons */}
      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "space-between",
          maxWidth: 600,
          mx: "auto",
        }}
      >
        {/* Back Button - Hidden on Step 1 */}
        {step > 1 && (
          <Button
            variant="contained"
            onClick={handleBack}
            sx={{
              backgroundColor: "#3B7567", // Same color as Continue button
              color: "#ffff",
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Back
          </Button>
        )}

        {/* Continue Button - Always at the Right End */}
        <Button
          variant="contained"
          onClick={handleNext}
          sx={{
            backgroundColor: "#3B7567",
            color: "#ffff",
            textTransform: "none",
            fontWeight: "bold",
            marginLeft: "auto", // Pushes the button to the right
          }}
        >
          {step < 6 ? "Continue" : "Submit"}
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Success!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Thank you! We will get back to you soon.
          </DialogContentText>
          <DialogActions>
            <Button
              onClick={() =>
                (window.location.href = "https://fekki.ai/fekki-io/thank-you/")
              }
            >
              OK
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ImmersiveTechSelection;

// import React, { useState } from "react";
// import {
//   Container,
//   TextField,
//   Typography,
//   Button,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormLabel,
//   Box,
//   Paper,
// } from "@mui/material";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useNavigate } from "react-router-dom";

// const Profile = () => {
//   const navigate = useNavigate();

//   const { isAuthenticated, logout, user } = useAuth0();

//   const loginUserName = user.name;
//   const loginUserEmail = user.email;

//   const [formData, setFormData] = useState({
//     fullname: "",
//     email: "",
//     companyName: "",
//     phoneNumber: "",
//     interest: "",
//     experience: "",
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const validate = () => {
//     let tempErrors = {};

//     if (!formData.fullname) tempErrors.fullname = "Full Name is required.";
//     if (!formData.email) tempErrors.email = "Email is required.";
//     else if (!/\S+@\S+\.\S+/.test(formData.email))
//       tempErrors.email = "Invalid email format.";
//     if (!formData.companyName)
//       tempErrors.companyName = "Company Name is required.";

//     if (!formData.phoneNumber) {
//       tempErrors.phoneNumber = "Phone Number is required.";
//     } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
//       tempErrors.phoneNumber = "Phone Number must be exactly 10 digits.";
//     }

//     if (!formData.interest)
//       tempErrors.interest = "Please select an area of interest.";

//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     navigate("/home");
//   };

//   return (
//     isAuthenticated && (
//       <Container maxWidth="sm" sx={{ mt: 4 }}>
//         <Paper
//           elevation={0}
//           sx={{ p: 4, borderRadius: 2, backgroundColor: "#f5f5f5" }}
//         >
//           <Typography
//             variant="h4"
//             align="center"
//             sx={{ color: "#333", fontWeight: "bold", mb: 3 }}
//           >
//             Sign Up
//           </Typography>

//           <Box
//             component="form"
//             noValidate
//             autoComplete="off"
//             onSubmit={handleSubmit}
//           >
//             {/* Full Name */}
//             <Typography sx={{ fontWeight: "bold", mt: 2, color: "#222" }}>
//               Full Name
//             </Typography>
//             <TextField
//               fullWidth
//               placeholder="Enter Full Name"
//               variant="outlined"
//               size="small"
//               name="fullname"
//               value={formData.fullname}
//               onChange={handleChange}
//               sx={{ mt: 1, backgroundColor: "white" }}
//               error={!!errors.fullname}
//               helperText={errors.fullname}
//             />

//             {/* Company Name */}
//             <Typography sx={{ fontWeight: "bold", mt: 2, color: "#222" }}>
//               Company Name
//             </Typography>
//             <TextField
//               fullWidth
//               placeholder="Enter Company Name"
//               variant="outlined"
//               size="small"
//               name="companyName"
//               value={formData.companyName}
//               onChange={handleChange}
//               sx={{ mt: 1, backgroundColor: "white" }}
//               error={!!errors.companyName}
//               helperText={errors.companyName}
//             />

//             {/* Email */}
//             <Typography sx={{ fontWeight: "bold", mt: 2, color: "#222" }}>
//               Email
//             </Typography>
//             <TextField
//               fullWidth
//               variant="outlined"
//               size="small"
//               name="email"
//               placeholder="Enter Your Email"
//               value={formData.email}
//               onChange={handleChange}
//               sx={{ mt: 1, backgroundColor: "white" }}
//               error={!!errors.email}
//               helperText={errors.email}
//             />

//             {/* Phone Number */}
//             <Typography sx={{ fontWeight: "bold", mt: 2, color: "#222" }}>
//               Phone Number
//             </Typography>
//             <TextField
//               fullWidth
//               placeholder="Enter Phone Number"
//               variant="outlined"
//               size="small"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               sx={{ mt: 1, backgroundColor: "white" }}
//               error={!!errors.phoneNumber}
//               helperText={errors.phoneNumber}
//             />

//             {/* Area of Interest */}
//             <FormLabel sx={{ fontWeight: "bold", mt: 3, color: "#222" }}>
//               Area of Interest
//             </FormLabel>
//             <RadioGroup
//               sx={{ mt: 0, display: "flex", gap: 0 }}
//               name="interest"
//               value={formData.interest}
//               onChange={handleChange}
//             >
//               <FormControlLabel value="AR" control={<Radio />} label="AR" />
//               <FormControlLabel value="VR" control={<Radio />} label="VR" />
//             </RadioGroup>

//             {errors.interest && (
//               <Typography sx={{ color: "red", fontSize: "0.8rem" }}>
//                 {errors.interest}
//               </Typography>
//             )}

//             {/* Experience Text */}
//             <Typography sx={{ fontWeight: "bold", mt: 3, color: "#222" }}>
//               Which of your Product / Model Immersive Experience (assembly,
//               operations, troubleshooting, training) desired?
//             </Typography>
//             <TextField
//               fullWidth
//               multiline
//               rows={3}
//               placeholder="Enter Text"
//               variant="outlined"
//               name="experience"
//               value={formData.experience}
//               onChange={handleChange}
//               sx={{ mt: 1, backgroundColor: "white" }}
//             />

//             {/* Buttons */}
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: { xs: "column", sm: "row" }, // Stack on mobile, row on larger screens
//                 justifyContent: "space-between",
//                 gap: 2, // Add spacing between buttons
//                 mt: 4,
//               }}
//             >
//               <Button
//                 type="submit"
//                 variant="contained"
//                 sx={{
//                   px: 4,
//                   backgroundColor: "#366A5A",
//                   fontWeight: "bold",
//                   width: { xs: "100%", sm: "auto" },
//                 }} // Full width on mobile
//               >
//                 Submit
//               </Button>

//               <Button
//                 onClick={() =>
//                   logout({ logoutParams: { returnTo: window.location.origin } })
//                 }
//                 variant="contained"
//                 sx={{
//                   px: 4,
//                   backgroundColor: "#366A5A",
//                   fontWeight: "bold",
//                   width: { xs: "100%", sm: "auto" },
//                 }} // Full width on mobile
//               >
//                 Back to Home
//               </Button>
//             </Box>
//           </Box>
//         </Paper>
//       </Container>
//     )
//   );
// };

// export default Profile;
