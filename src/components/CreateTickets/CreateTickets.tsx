import {
  Box,
  Button,
  createTheme,
  // FormControl,
  Grid,
  LinearProgress,
  // MenuItem,
  // Select,
  // TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useState, type ReactNode } from "react";
import CreateTicketHeader from "./CreateTicketHeader";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StepCards from "./StepCards";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import GroupIcon from "@mui/icons-material/Group";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import SettingsIcon from "@mui/icons-material/Settings";
import DevicesIcon from "@mui/icons-material/Devices";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const theme = createTheme({
  palette: {
    primary: {
      main: "#43d36b",
    },
    secondary: {
      main: "#666",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

interface StepItem {
  type_id: number;
  title: string;
  desc?: string;
  icon?: ReactNode;
  category?: { cat_id: number; title: string }[];
}

const stepConfig: StepItem[] = [
  {
    type_id: 1,
    title: "Incident",
    desc: "Something is broken and needs to be fixed",
    icon: (
      <InfoOutlineIcon
        sx={{ color: "#ef4444", bgcolor: "#f4e4ec", fontSize: 17 }}
      />
    ),
    category: [
      { cat_id: 1, title: "Network" },
      { cat_id: 2, title: "Hardware" },
      { cat_id: 3, title: "Security" },
      { cat_id: 4, title: "Email" },
      { cat_id: 5, title: "Software" },
      { cat_id: 6, title: "Access" },
    ],
  },
  {
    type_id: 2,
    title: "Service Request",
    desc: "Request for something new or a change",
    icon: (
      <GroupIcon sx={{ color: "#4372ff", bgcolor: "#eaefff", fontSize: 20 }} />
    ),
    category: [
      { cat_id: 7, title: "Software Installation" },
      { cat_id: 8, title: "Hardware Request" },
      { cat_id: 9, title: "Access Request" },
      { cat_id: 10, title: "Account Setup" },
    ],
  },
  {
    type_id: 3,
    title: "Problem",
    desc: "Root cause analysis needed",
    icon: <LightbulbIcon sx={{ color: "#ff9800", bgcolor: "#fdf5e6" }} />,
    category: [
      { cat_id: 11, title: "Recurring Issues" },
      { cat_id: 12, title: "Performance" },
      { cat_id: 13, title: "System Analysis" },
    ],
  },
  {
    type_id: 4,
    title: "Change Request",
    desc: "Planned change to IT services",
    icon: <SettingsIcon sx={{ color: "#4caf50", bgcolor: "#ecfaf0" }} />,
    category: [
      { cat_id: 14, title: "System Updates" },
      { cat_id: 15, title: "Configuration Changes" },
      { cat_id: 16, title: "Infrastructure" },
    ],
  },
  {
    type_id: 5,
    title: "Asset Request",
    desc: "Request for hardware or software",
    icon: <DevicesIcon sx={{ color: "#43d36b", bgcolor: "#ecfaf0" }} />,
    category: [
      { cat_id: 17, title: "Laptop" },
      { cat_id: 18, title: "Desktop" },
      { cat_id: 19, title: "Mobile Device" },
      { cat_id: 20, title: "Software License" },
    ],
  },
  {
    type_id: 6,
    title: "Knowledge Suggestion",
    desc: "Suggest an improvement to documentation",
    icon: <MenuBookIcon sx={{ color: "#3f51b5", bgcolor: "#eaefff" }} />,
    category: [
      { cat_id: 21, title: "Process Improvement" },
      { cat_id: 22, title: "Documentation" },
      { cat_id: 23, title: "Training" },
    ],
  },
];

const CreateTickets: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [ticketDetails, setTicketDetails] = useState({
    title: "",
    description: "",
    urgency: "",
    impact: "",
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleTypeSelect = (typeId: any) => {
    setSelectedType(typeId);
  };

  const handleCategorySelect = (catId: any) => setSelectedCategory(catId);

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicketDetails({ ...ticketDetails, [e.target.name]: e.target.value });
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return selectedType !== null;
      case 2:
        return selectedCategory !== null;
      case 3:
        return (
          ticketDetails.title &&
          ticketDetails.description &&
          ticketDetails.urgency &&
          ticketDetails.impact
        );
      case 4:
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    if (currentStep === 1) {
      return (
        <Box sx={{ p: 4 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ mb: 1, fontSize: "15px" }}
          >
            What Type Of Request Is This?
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3, fontSize: "12px", color:"#9aa4b4" }}
          >
            Select the category that best describes your request
          </Typography>

          <Grid container spacing={2} columns={12}>
            {stepConfig.map((item) => (
              <Grid key={item.type_id} size={{ xs: 12, sm: 6 }}>
                <StepCards
                  icon={item.icon}
                  title={item.title}
                  subtitle={item.desc}
                  isSelected={selectedType === item.type_id}
                  onClick={() => handleTypeSelect(item.type_id)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      );
    } else if (currentStep === 2) {
      const selectedStep = stepConfig.find(
        (item) => item.type_id === selectedType
      );
      const categories = selectedStep?.category || [];
      return (
        <Box sx={{ p: 4 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ mb: 1, fontSize: "15px" }}
          >
            Select A Category
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3, fontSize: "12px" }}
          >
            Choose the specific category for your{" "}
            {
              stepConfig.find((step) => step.type_id === selectedType)?.title
            }
          </Typography>

          <Grid container spacing={2} columns={12}>
            {categories.map((cat) => (
              <Grid key={cat.cat_id} size={{ xs: 12, sm: 6 }}>
                <StepCards
                  title={cat.title}
                  isSelected={selectedCategory === cat.cat_id}
                  onClick={() => handleCategorySelect(cat.cat_id)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      );
    }

    return null;
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
            {renderStepContent()}
          </Box>

          {/* Navigation */}
          <Box sx={{ p: 3, display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<ArrowBackIcon />}
              onClick={handleBack}
              disabled={currentStep === 1}
              sx={{ borderRadius: "8px", textTransform: "none" }}
            >
              Back
            </Button>
            <Button
              variant="outlined"
              size="small"
              endIcon={<ArrowForwardIcon />}
              onClick={handleNext}
              disabled={!isStepValid() || currentStep === totalSteps}
              sx={{
                borderRadius: "8px",
                bgcolor: "#2f5dff",
                // "&:hover": { bgcolor: "#39c15d" },
                color: "#fff",
                textTransform: "none",
              }}
            >
              {currentStep < totalSteps ? "Next" : "Submit Ticket"}
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CreateTickets;
