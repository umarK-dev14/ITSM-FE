import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CameraFrontIcon from "@mui/icons-material/CameraFront";
import React from "react";
import Typography from "@mui/material/Typography";

interface SelfServiceHeaderProps {
  title?: string;
  description?: string;
  userName?: string;
}

const SelfHeader: React.FC<SelfServiceHeaderProps> = ({
  title = "Self-Service Portal",
  description = "Find solutions and get help",
  userName = "Welcome, Alex Jhonson",
}) => {
  return (
    <Box>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#fff",
        justifyContent:"space-between",
        py: 1,
        px: 3,
        marginLeft: "-15px",
        marginRight: "-10px",
        borderRadius: 1,
        border: "1px solid #e5e7eb",
        borderBottom: "2px solid rgba(0,0,0,0.1)",
      }}
    >
      <Box sx={{display:"flex", alignItems:"center", gap:2}}>
        <IconButton
          sx={{
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#43d36b", // green box background
              color: "white", // make arrow white on hover
            },
            transition: "all 0.3s ease", // smooth hover
          }}
        >
          <ArrowBackIcon sx={{ fontSize: "15px" }} />
        </IconButton>

        {/* Title + Description */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <CameraFrontIcon sx={{ fontSize: 20, color: "#2563eb" }} />
          <Box>
            <Typography
              variant="h6"
              sx={{ lineHeight: 1.2, fontWeight: 500, fontSize: "16px" }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="#838fa2"
              sx={{ fontSize: "12px", mt: 0.7 }}
            >
              {description}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Typography
        variant="body2"
        sx={{ fontSize: "13px", mt: 0.7, color: "#838fa2" }}
      >
        {userName}
      </Typography>
    </Box>

    </Box>
  );
};

export default SelfHeader;
