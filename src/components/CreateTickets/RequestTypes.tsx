import React, { useContext, type ReactNode } from "react";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import GroupIcon from "@mui/icons-material/Group";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import SettingsIcon from "@mui/icons-material/Settings";
import DevicesIcon from "@mui/icons-material/Devices";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Box, Grid, Typography } from "@mui/material";
import StepCards from "./StepCards";
import { useTicket } from "../../context/ticket-context";

const RequestTypes: React.FC = ({}) => {
    const {selectedType, setSelectedType,requestData,setRequestData} =  useTicket()
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
        sx={{ mb: 3, fontSize: "12px", color: "#9aa4b4" }}
      >
        Select the category that best describes your request
      </Typography>

      <Grid container spacing={2} columns={12}>
        {requestData.map((item:any) => (
          <Grid key={item.ID} size={{ xs: 12, sm: 6 }}>
            <StepCards
              icon={item.icon}
              title={item.NAME}
              subtitle={item.DESCRIPTION}
              isSelected={selectedType === item.ID}
              onClick={() => setSelectedType(item.ID)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RequestTypes;
