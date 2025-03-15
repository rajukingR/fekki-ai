import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </div>
    </nav>
  );
};

export default Navbar;



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