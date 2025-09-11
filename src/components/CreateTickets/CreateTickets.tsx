import {
  Box,
  Button,
  createTheme,
  LinearProgress,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React from "react";
import CreateTicketHeader from "./CreateTicketHeader";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTicket } from "../../context/ticket-context";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2f5dff",
    },
    secondary: {
      main: "#666",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

const steps = ["/create-ticket/requesttype", "/create-ticket/category", "/create-ticket/ticketdetails"];
const totalSteps = steps.length;
const CreateTickets: React.FC = () => {
  const { selectedType, selectedCategory } = useTicket();

  const location = useLocation();
  const navigate = useNavigate();
  const currentStep = steps.indexOf(location.pathname);
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      navigate(steps[currentStep + 1]);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      navigate(steps[currentStep - 1]);
    }
  };

  const isStepValid = () => {
    if (location.pathname === "/create-ticket/requesttype") {
      return selectedType !== null;
    }
    if (location.pathname === "/create-ticket/category") {
      return selectedCategory !== null;
    }

    return true;
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 2, backgroundColor: "#fff", minHeight: "100vh" }}>
        <CreateTicketHeader />
        <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
          {/* Progress Bar */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ my: 1, mx: 3, fontWeight: "bold", fontSize: "12px" }}
              >
                Progress
              </Typography>
              <Typography
                variant="body2"
                color="#808d9f"
                sx={{ my: 1, mx: 3, fontWeight: "bold", fontSize: "12px" }}
              >
                {Math.round(progress)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                mx: 3,
                height: 7,
                borderRadius: 5,
                backgroundColor: "#d3dbfb",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#2f5dff",
                  borderRadius: 5,
                },
              }}
            />
          </Box>

          {/* step Content */}
          <Box sx={{ boxShadow: 2, mx: 3, borderRadius: 4, mt: 3 }}>
            <Outlet />
          </Box>

          {/* Navigation */}
          <Box sx={{ p: 3, display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<ArrowBackIcon />}
              onClick={handleBack}
              disabled={currentStep === 0}
              sx={{ borderRadius: "8px", textTransform: "none" }}
            >
              Back
            </Button>
            <Button
              variant="outlined"
              size="small"
              endIcon={<ArrowForwardIcon />}
              onClick={handleNext}
              disabled={!isStepValid() ||  currentStep === totalSteps - 1}
              sx={{
                borderRadius: "8px",
                bgcolor: "#2f5dff",
                // "&:hover": { bgcolor: "#39c15d" },
                color: "#fff",
                textTransform: "none",
              }}
            >
              {currentStep < totalSteps - 1 ? "Next" : "Submit Ticket"}
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CreateTickets;
