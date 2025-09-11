import React, { useEffect, useState } from "react";
import { useTicket } from "../../context/ticket-context";
import { Box } from "@mui/system";
import {
  Chip,
  FormControl,
  FormLabel,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const urgencyOptions = [
  { value: "Low", label: "Low - Can Wait" },
  { value: "Medium", label: "Medium - Important" },
  { value: "High", label: "High - Urgent" },
  { value: "Critical", label: "Critical - Emergency" },
];

const impactOptions = [
  { value: "Low", label: "Low (Single user) - Just Me" },
  { value: "Medium", label: "Medium (Multiple users) - My Team" },
  { value: "High", label: "High (Multiple teams) - Several Departments" },
  {
    value: "Critical",
    label: "Critical (Business-wide) - Entire Organization",
  },
];

const TicketDetails: React.FC = () => {
  const {
    ticketDetails,
    setTicketDetails,
    calculatePriority,
    selectedType,
    selectedCategory
  } = useTicket();
  const [priority, setPriority] = useState<{ level: string }>({ level: "N/A" });
  const [urgency, setUrgency] = useState(""); // You can change default
  const [impact, setImpact] = useState("");

  useEffect(() => {
    if (!urgency || !impact) return; // only calculate if both selected
    const result = calculatePriority(urgency, impact);
    setPriority(result);
  }, [urgency, impact, calculatePriority]);

  useEffect(() => {
    if (!ticketDetails.title && !ticketDetails.description) return;

    // Split priority into number and text
    const [priority_no, ...priorityArr] = priority.level.split(" ");
    const priorityText = priorityArr.join(" ").replace(/[()]/g, "");

    // Store in context
    setTicketDetails({
      title: ticketDetails.title,
      description: ticketDetails.description,
      priority_no,
      priority: priorityText,
    });

    // console.log("Type:", selectedType);
    // console.log("Category:", selectedCategory);
    // console.log("Title:", ticketDetails.title);
    // console.log("Description:", ticketDetails.description);
    // console.log("Selected Priority:", priorityText);
    // console.log("Priority Number:", priority_no);
    // console.log({ Type: selectedType, Category: selectedCategory, ...ticketDetails });
  }, [priority]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", mb: 1, fontSize: "15px" }}
      >
        Provide Details
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3, fontSize: "12px", color: "#9aa4b4" }}
      >
        Give us the information we need to help you
      </Typography>

      {/* Title */}
      <FormControl sx={{ fontFamily: "'Inter', sans-serif" }}>
        <FormLabel
          sx={{
            mb: 0.5,
            fontSize: "7px",
            fontWeight: 600,
            color: "text.secondary",
          }}
        />
        Title *
      </FormControl>
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        value={ticketDetails.title}
        onChange={(e) =>
          setTicketDetails({ ...ticketDetails, title: e.target.value })
        }
        placeholder="Brief description of your request"
        sx={{
          mb: 3,
          "& .MuiInputBase-root": {
            borderRadius: "8px",
            height: "35px",
            fontSize: "12px",
            "&.Mui-focused fieldset": {
              borderColor: "#95affd",
              boxShadow: "0 0 5px rgba(149, 175, 253, 0.5)", // change to your desired color
            },
          },
        }}
      />

      {/* Description */}
      <FormControl sx={{ fontFamily: "'Inter', sans-serif" }}>
        <FormLabel
          sx={{
            mb: 0.5,
            fontSize: "7px",
            fontWeight: 600,
            color: "text.secondary",
          }}
        />
        Description *
      </FormControl>
      <TextField
        fullWidth
        multiline
        rows={4}
        value={ticketDetails.description}
        onChange={(e) =>
          setTicketDetails({ ...ticketDetails, description: e.target.value })
        }
        placeholder="Please provide detailed information about your request. Include any error message, steps you've already tried, and relevent context"
        sx={{
          mb: 3,
          "& .MuiInputBase-root": {
            borderRadius: "8px",
            fontSize: "13px",
            // paddingLeft:"10px",
            paddingBottom: "30px",
          },
          "& .MuiInputBase-input::placeholder": {
            fontSize: "12px",
          },
        }}
      />

      {/* Urgency & Impact */}
      <Box sx={{ display: "flex", gap: 2 }}>
        {/* Urgency */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel
            sx={{
              mb: 0.5,
              fontSize: "12px",
              fontWeight: 600,
              color: "text.secondary",
            }}
          >
            Urgency *
          </FormLabel>

          <TextField
            select
            size="small"
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
            SelectProps={{
              displayEmpty: true,
              renderValue: (selected: any) => {
                if (!selected) {
                  // placeholder style inside the closed select
                  return (
                    <Typography
                      sx={{
                        color: "#748495",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      How Urgent Is This?
                    </Typography>
                  );
                }
                const opt = urgencyOptions.find((o) => o.value === selected);
                return opt ? opt.label : selected;
              },
            }}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "8px",
                fontSize: "13px",
                height: 38,
              },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e6e8ee" },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#95affd",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#95affd",
                boxShadow: "0 0 5px rgba(149,175,253,0.5)",
              },
            }}
          >
            {urgencyOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        {/* Impact */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <FormLabel
            sx={{
              mb: 0.5,
              fontSize: "12px",
              fontWeight: 600,
              color: "text.secondary",
            }}
          >
            Impact *
          </FormLabel>

          <TextField
            select
            size="small"
            value={impact}
            onChange={(e) => setImpact(e.target.value)}
            SelectProps={{
              displayEmpty: true,
              renderValue: (selected: any) => {
                if (!selected) {
                  return (
                    <Typography
                      sx={{
                        color: "#748495",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      How Many People Affected?
                    </Typography>
                  );
                }
                const opt = impactOptions.find((o) => o.value === selected);
                return opt ? opt.label : selected;
              },
            }}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "8px",
                fontSize: "13px",
                height: 38,
              },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e6e8ee" },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#95affd",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#95affd",
                boxShadow: "0 0 5px rgba(149,175,253,0.5)",
              },
            }}
          >
            {impactOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </Box>

      {/* Calculated Priority */}
      {urgency && impact && (
        <Paper
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            gap: 2,
            borderRadius: 2,
            background: "linear-gradient(90deg, #eef5ff, #f0fff4)",
          }}
        >
          <Typography variant="body2" color="primary">
            ⏱ Calculated Priority:
          </Typography>
          <Chip
            label={priority.level}
            sx={{
              bgcolor: priority.level.includes("Critical")
                ? "#ef4444"
                : priority.level.includes("High")
                  ? "#facc15"
                  : "#4ade80",
              color: "#fff",
              fontWeight: "bold",
            }}
          />
          <Typography variant="body2" color="text.secondary">
            Based on urgency × impact matrix
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default TicketDetails;
