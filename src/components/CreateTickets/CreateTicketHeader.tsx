import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface CreateTicketHeaderProps {
  title?: string;
  step?: string;
}
const CreateTicketHeader: React.FC<CreateTicketHeaderProps> = ({
  title = "Create New Ticket",
  step = "Step 1 of 4",
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#fff",
        pl: 15,
        py: 1,
        borderRadius: "2px",
        // borderBottom: "1px solid #e5e7eb",
        boxShadow: 1,
      }}
    >
      <IconButton
        sx={{
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: "#43d36b", // green box background
            color: "white", // make arrow white on hover
          },
          mr: 2,
          transition: "all 0.3s ease", // smooth hover
        }}
      >
        <ArrowBackIcon sx={{ fontSize: "15px" }} />
      </IconButton>

      {/* Title + Step */}
      <Box>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ lineHeight: 1.2, fontSize: "16px" }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="#838fa2"
          sx={{ fontSize: "12px", mt:0.7 }}
        >
          {step}
        </Typography>
      </Box>
    </Box>
  );
};

export default CreateTicketHeader;
