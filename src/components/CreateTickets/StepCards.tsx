import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

interface stepCardProps {
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const StepCards: React.FC<stepCardProps> = ({
  icon,
  title,
  subtitle,
  isSelected,
  onClick,
}) => (
  <Paper
    onClick={onClick}
    sx={{
      p: 2.5,
      borderRadius: "12px",
      // fontSize:"5px",
      border: isSelected ? "2px solid #2f5dff" : "1px solid #e0e6f0",
      bgcolor: isSelected ? "#f5f7ff" : "#fff",
      boxShadow: isSelected
        ? "0 2px 8px rgba(47, 93, 255, 0.15)"
        : "0 1px 3px rgba(0,0,0,0.05)",
      cursor: "pointer",
      transition: "all 0.3s ease-in-out",
      "&:hover": {
        boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
        transform: "translateY(-1px)",
      },
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Box
        sx={{

          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="body1" fontWeight="bold" sx={{ fontSize: "12px", color:"#373f4e" }}>
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "10px", color:"#8892a1ff" }}
        >
          {subtitle}
        </Typography>
      </Box>
      {isSelected && (
        <TaskAltIcon sx={{ color: "#2f5dff", ml: "auto", fontSize: 20 }} />
      )}
    </Box>
  </Paper>
);

export default StepCards;
