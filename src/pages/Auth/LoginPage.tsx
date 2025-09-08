import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormLabel,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SecurityIcon from "@mui/icons-material/Security";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ShieldIcon from '@mui/icons-material/Shield';
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
const LoginPage: React.FC = () => {
  const [role, setRole] = useState(0); // 0 = End User, 1 = IT Admin, 2 = Super Admin

  const handleRoleChange = (event: React.SyntheticEvent, newValue: number) => {
    setRole(newValue);
  };

  // Role-based placeholders & labels
  const roleConfig = [
    {
      label: "End User",
      emailLabel: "User Email",
      emailPlaceholder: "alex.johnson@company.com",
      passwordPlaceholder: "Enter Your Password",
      buttonText: "Sign In As User",
      buttonColor: "#2f5dff",
      notice: null,
    },
    {
      label: "IT Admin",
      emailLabel: "Admin Email",
      emailPlaceholder: "sarah.wilson@company.com",
      passwordPlaceholder: "Enter Admin Password",
      buttonText: "Sign In As Admin",
      buttonColor: "#2ecc71",
      notice: {
        type: "info",
        title: "Admin Access Notice",
        description: "Read-only access to team management features",
      },
    },
    {
      label: "Super Admin",
      emailLabel: "Super Admin Email",
      emailPlaceholder: "super.admin@company.com",
      passwordPlaceholder: "Enter Super Admin Password",
      buttonText: "Sign In As Super Admin",
      buttonColor: "#ff4d4d",
      notice: {
        type: "warning",
        title: "Super Admin Notice",
        description: "Full system access with member management privileges",
      },
    },
  ];

  const currentRole = roleConfig[role];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      {/* Logo & Header */}
      <Box textAlign="center" mb={4}>
        <Box
          component="img"
          src="/assets/itsm-logo.png" // 👈 place your logo in public/assets
          alt="ITSM Logo"
          sx={{
            width: 80,
            height: 80,
            mb: 2,
          }}
        />
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(90deg, #2ab1af, #49d26c)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontSize: "28px",
          }}
        >
          ITSM Portal
        </Typography>
        <Typography variant="subtitle1" color="#838fa2" fontSize="10px">
          Modern IT Service Management Platform
        </Typography>
      </Box>

      {/* Login Card */}
      <Card
        sx={{
          maxWidth: 450,
          width: "100%",
          borderRadius: 3,
          boxShadow: 4,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Title */}
          <Typography
            variant="h6"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
          >
            Welcome Back
          </Typography>
          <Typography
            variant="body2"
            textAlign="center"
            color="#838fa2"
            fontSize="12px"
            mb={3}
          >
            Access Your Service Management Dashboard
          </Typography>

          {/* Role Tabs */}
          <Tabs
            value={role}
            onChange={handleRoleChange}
            variant="fullWidth"
            sx={{
              mb: 3,
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 500,
                fontSize: "14px",
                borderRadius: 2,
                minWidth: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                whiteSpace: "nowrap",
              },
            }}
          >
            <Tab icon={<PersonIcon />} iconPosition="start" label="End User" />
            <Tab
              icon={<SecurityIcon />}
              iconPosition="start"
              label="IT Admin"
            />
            <Tab
              icon={<AdminPanelSettingsIcon />}
              iconPosition="start"
              label="Super Admin"
            />
          </Tabs>

          {/* Email */}
          <FormControl fullWidth margin="normal">
            <FormLabel
              sx={{ mb: 0.5, fontSize: "0.875rem", color: "text.secondary" }}
            >
              {currentRole.emailLabel}
            </FormLabel>
            <TextField
              placeholder={currentRole.emailPlaceholder}
              variant="outlined"
              size="small"
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                  height: "42px",
                },
              }}
            />
          </FormControl>

          {/* Password */}
          <FormControl fullWidth margin="normal">
            <FormLabel
              sx={{ mb: 0.5, fontSize: "0.875rem", color: "text.secondary" }}
            >
              Password
            </FormLabel>
            <TextField
              type="password"
              placeholder={currentRole.passwordPlaceholder}
              variant="outlined"
              size="small"
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                  height: "42px",
                },
              }}
            />
          </FormControl>

          {/* Sign In Button */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={<ShieldIcon sx={{fontSize:"16px"}}/>}
            endIcon={<ArrowForwardIosIcon sx={{ fontSize: "12px" }} />}
            sx={{
              mt: 2,
              borderRadius: 2,
              bgcolor: "#2f5dff",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#1a46d6" },
            }}
          >
            {currentRole.buttonText}
          </Button>

          {/* Role-specific Notice */}
          {currentRole.notice && (
            <Alert
              severity={currentRole.notice.type as "info" | "warning"}
              sx={{ mt: 3, borderRadius: 2 }}
            >
              <Typography fontWeight="bold" variant="body2">
                {currentRole.notice.title}
              </Typography>
              <Typography variant="caption">
                {currentRole.notice.description}
              </Typography>
            </Alert>
          )}

          {/* Forgot Password */}
          <Box textAlign="center" mt={2}>
            <Link
              to={"/"}
              style={{
                fontFamily: "Inter, sans-serif",
                textDecoration: "none",
                color: "#3868fc",
                fontSize: "14px",
                fontWeight: 500,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.textDecoration = "underline")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.textDecoration = "none")
              }
            >
              Forgot Your Password?
            </Link>
            <Typography
              variant="caption"
              display="block"
              mt={1}
              color="text.secondary"
            >
              Need Help? Contact Your IT Department
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Single Sign-On */}
          <Button fullWidth variant="outlined" sx={{ borderRadius: 2 }}>
            Continue With Single Sign-On
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
