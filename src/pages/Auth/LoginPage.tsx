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
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import { Link, useNavigate } from "react-router-dom";
import { useTicketAPI } from "../../Apis/ticket.API";

const LoginPage: React.FC = () => {
  const [role, setRole] = useState(0); // 0 = End User, 1 = IT Admin, 2 = Super Admin
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { loginUser } = useTicketAPI();

  const handleRoleChange = (event: React.SyntheticEvent, newValue: number) => {
    setRole(newValue);
  };

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await loginUser(email, password);
      console.log("✅ Login successful:", res);

      // token + user are stored in context by loginUser
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Role-based placeholders & labels
  const roleConfig = [
    {
      label: "End User",
      emailLabel: "Email Address",
      emailPlaceholder: "alex.johnson@company.com",
      passwordPlaceholder: "Enter Your Password",
      buttonText: "Sign In To Portal",
      buttonColor: "#2f5dff",
      notice: null,
    },
    {
      label: "IT Admin",
      emailLabel: "Admin Email",
      emailPlaceholder: "sarah.wilson@company.com",
      passwordPlaceholder: "Enter Admin Password",
      buttonText: "Sign In As Admin",
      buttonIcon: <SecurityIcon sx={{ fontSize: "16px" }} />,
      buttonColor: "#2ecc71",
      color: "#2ecc71",
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
      buttonIcon: <AdminPanelSettingsIcon sx={{ fontSize: "16px" }} />,
      buttonColor: "#ff7861",
      notice: {
        type: "warning",
        title: "Super Admin Access",
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
      }}
    >
      {/* Logo & Header */}
      <Box textAlign="center" mb={4}>
        <Box
          component="img"
          src="/assets/itsm-logo.png"
          alt="ITSM Logo"
          sx={{ width: 80, height: 80, mb: 2 }}
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
      <Card sx={{ maxWidth: 380, width: "100%", borderRadius: 2, boxShadow: 1 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h6"
            textAlign="center"
            sx={{ fontWeight: 600, fontSize: "20px" }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="body2"
            textAlign="center"
            sx={{ color: "#838fa2", fontSize: "12px", mb: 2 }}
          >
            Access Your Service Management Dashboard
          </Typography>

          {/* Role Tabs */}
          <Tabs
            value={role}
            onChange={handleRoleChange}
            variant="fullWidth"
            TabIndicatorProps={{ style: { display: "none" } }}
            sx={{
              mt: 5,
              "& .MuiTab-root": {
                textTransform: "none",
                fontSize: "13px",
                fontWeight: 500,
                borderRadius: 1,
                minWidth: "auto",
                color: "#838fa2",
                px: 1.5,
                whiteSpace: "nowrap",
              },
            }}
          >
            <Tab
              icon={<PersonIcon sx={{ fontSize: 16 }} />}
              iconPosition="start"
              label="End User"
            />
            <Tab
              icon={<SecurityIcon sx={{ fontSize: 16 }} />}
              iconPosition="start"
              label="IT Admin"
            />
            <Tab
              icon={<AdminPanelSettingsIcon sx={{ fontSize: 16 }} />}
              iconPosition="start"
              label="Super Admin"
            />
          </Tabs>

          {/* Email */}
          <FormControl fullWidth margin="normal">
            <FormLabel sx={{ mb: 0.5, fontSize: "10px", fontWeight: 600 }}>
              {currentRole.emailLabel}
            </FormLabel>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={currentRole.emailPlaceholder}
              variant="outlined"
              size="small"
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                  height: "35px",
                  fontSize: "13px",
                },
              }}
            />
          </FormControl>

          {/* Password */}
          <FormControl fullWidth margin="normal">
            <FormLabel sx={{ mb: 0.5, fontSize: "10px", fontWeight: 600 }}>
              Password
            </FormLabel>
            <TextField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={currentRole.passwordPlaceholder}
              variant="outlined"
              size="small"
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                  height: "35px",
                  fontSize: "13px",
                },
              }}
            />
          </FormControl>

          {/* Error Message */}
          {error && (
            <Alert severity="error" sx={{ mt: 2, fontSize: "13px" }}>
              {error}
            </Alert>
          )}

          {/* Sign In Button */}
          <Button
            fullWidth
            variant="contained"
            size="medium"
            startIcon={currentRole.buttonIcon}
            onClick={handleLogin}
            disabled={loading}
            endIcon={
              role === 0 ? (
                <ArrowForwardIosIcon sx={{ fontSize: "10px", width: 12, height: 12 }} />
              ) : null
            }
            sx={{
              bgcolor: currentRole.buttonColor,
              fontSize: "13px",
              py: 1,
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 1.5,
              mt: 1,
            }}
          >
            {loading ? "Signing In..." : currentRole.buttonText}
          </Button>

          {/* Role-specific Notice */}
          {currentRole.notice && (
            <Box
              sx={{
                mt: 2,
                p: 2,
                border: "1px solid #e0e6f0",
                borderRadius: 2,
                display: "flex",
                alignItems: "flex-start",
                bgcolor: "#fff",
                mb: "30px",
              }}
            >
              {currentRole.notice.type === "info" && (
                <InfoOutlineIcon sx={{ fontSize: 13, color: "#2f5dff", mr: 1 }} />
              )}
              {currentRole.notice.type === "warning" && (
                <LockOutlineIcon sx={{ fontSize: 13, mr: 1 }} />
              )}
              <Box>
                <Typography fontSize="14px">{currentRole.notice.title}</Typography>
                <Typography sx={{ fontSize: "10px", color: "#838fa2" }}>
                  {currentRole.notice.description}
                </Typography>
              </Box>
            </Box>
          )}

          {/* Forgot Password - only for End User */}
          {role === 0 && (
            <Box textAlign="center" mt={2}>
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "#2f5dff",
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                Forgot Your Password?
              </Link>
              <Typography
                variant="caption"
                display="block"
                sx={{ mt: 1, color: "#838fa2", fontSize: "10px", mb: "30px" }}
              >
                Need Help? Contact Your IT Department
              </Typography>
            </Box>
          )}

          <Divider sx={{ my: 2 }} />

          {/* Single Sign-On */}
          <Button
            fullWidth
            variant="outlined"
            sx={{
              borderColor: "#e0e6f0",
              borderRadius: 2,
              color: "#000",
              textTransform: "none",
              fontSize: "13px",
            }}
          >
            Continue With Single Sign-On
          </Button>
        </CardContent>
      </Card>

      <Box textAlign="center" mt={2}>
        <Typography variant="caption" sx={{ color: "#6b7280", fontSize: "10px" }}>
          © 2024 ITSM Portal • Secure & Efficient IT Management
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
