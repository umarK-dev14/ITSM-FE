import React, { useState } from "react";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { faqData } from "../data/faqdata"; 

const FAQParent: React.FC = () => {
  const [expanded, setExpanded] = useState<number | false>(0);

  const handleChange =
    (panel: number) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Container maxWidth="md">
      <Paper
        elevation={2}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          "&:hover": {
            boxShadow: 6,
          },
        }}
      >
        {faqData.map((faq, index) => (
          <Accordion
            key={index}
            expanded={expanded === index}
            onChange={handleChange(index)}
            disableGutters
            square
            sx={{
              "&:before": { display: "none" },
              boxShadow: "none",
              borderBottom: "1px solid #eee",
              "&:hover": {
                backgroundColor: "#fafafa",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                "&:hover": {
                  textDecoration: "underline",
                },
                "& .MuiTypography-root": {
                  fontWeight: 500,
                  fontSize: { xs: 12, sm: 14 },
                },
              }}
            >
              <Typography>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                fontSize={{ xs: 12, sm: 13 }}
                sx={{ color: "text.secondary", lineHeight: 1.6 }}
              >
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>
    </Container>
  );
};

export default FAQParent;
