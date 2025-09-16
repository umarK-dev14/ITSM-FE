import { Box } from "@mui/system";
import React from "react";
import SelfHeader from "./SelfHeader";
import ShieldIcon from "@mui/icons-material/Shield";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import { Typography } from "@mui/material";
import SelfKnowledgeBase from "./SelfKnowledgeBase";

const actions = [
  {
    title: "Reset Password",
    description: "Reset your account password",
    icon: <ShieldIcon sx={{ color: "#4372ff", fontSize: "17px" }} />,
    bg: "#eef2ff",
  },
  {
    title: "Check System Status",
    description: "View current system status",
    icon: <TrendingUpIcon sx={{ color: "#22c55e", fontSize: "17px" }} />,
    bg: "#ecfdf5",
  },
  {
    title: "Download Software",
    description: "Access approved software",
    icon: <DownloadIcon sx={{ color: "#16a34a", fontSize: "17px" }} />,
    bg: "#f0fdf4",
  },
  {
    title: "Report Issue",
    description: "Create a new ticket",
    icon: <AddIcon sx={{ color: "#ef4444", fontSize: "17px" }} />,
    bg: "#fef2f2",
  },
];

const SelfService: React.FC = () => {
  return (
      <Box sx={{ p: 2, backgroundColor: "#fff", minHeight: "100vh" }}>
        <SelfHeader />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Typography sx={{ fontSize: "20px", fontWeight: "bold", mb: 1 }}>
            How Can We Help You Today?
          </Typography>
          <Typography
            sx={{ color: "#838fa2", fontSize: "12px", textAlign: "center" }}
          >
            Find answers quickly with our knowledge base or access self-service
            tools to resolve common issues.
          </Typography>
        </Box>

        {/* Quick Actions */}
        <Box sx={{ mt: 3 }}>
          <Typography
            sx={{ fontSize: "16px", fontWeight: 600, color: "#1f2937" }}
          >
            Quick Actions
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 2,
              mt: 2,
            }}
          >
            {actions.map((action, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  p: 2,
                  border: "1px solid #e5e7eb",
                  borderRadius: "16px",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
                    borderColor: "transparent",
                  },
                }}
              >
                <Box
                  sx={{
                    backgroundColor: action.bg,
                    borderRadius: "10px",
                    p: 1.2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 2,
                  }}
                >
                  {/* Icon Container */}
                  {action.icon}
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontWeight: "500",
                      fontSize: "12px",
                      color: "#111827",
                      lineHeight: 1.4,
                    }}
                  >
                    {action.title}
                  </Typography>
                  <Typography sx={{ fontSize: "10px", color: "#6b7280" }}>
                    {action.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Knowledge Base */}
        <SelfKnowledgeBase />
      </Box>
  );
};

export default SelfService;
