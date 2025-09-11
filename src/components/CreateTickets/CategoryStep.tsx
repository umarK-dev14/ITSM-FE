import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import StepCards from "./StepCards";
import { useTicket } from "../../context/ticket-context";


const CategoryStep: React.FC = () => {
    const {selectedType, selectedCategory, setSelectedCategory,requestData} = useTicket()
     const selectedStep = requestData.find((item:any) => item.ID === selectedType);
      const categories = selectedStep?.Categories || [];
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
        {requestData.find((step:any) => step.ID === selectedType)?.NAME}
      </Typography>

      <Grid container spacing={2} columns={12}>
        {categories.map((cat:any) => (
          <Grid key={cat.ID} size={{ xs: 12, sm: 6 }}>
            <StepCards
              title={cat.NAME}
              isSelected={selectedCategory === cat.ID}
              onClick={() => setSelectedCategory(cat.ID)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryStep;
