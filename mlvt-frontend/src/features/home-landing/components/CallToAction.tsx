import React from "react";
import { Box, Typography, Button } from "@mui/material";

const CallToActionSection: React.FC = () => {
  const textColor = "#FFFFFF";
  const buttonBgColor = "#6A0DAD";
  const buttonHoverBgColor = "#5A0BAB";

  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        color: textColor,
        py: { xs: 6, md: 3 },
        px: { xs: 2, md: 4 },
        textAlign: "center",
      }}
    >
      <Typography
        variant="h3"
        component="h2"
        fontWeight="700"
        sx={{
          mb: 4,
          fontSize: {
            xs: "2.2rem",
            sm: "2.5rem",
            md: "2.8rem",
            fontFamily: "Poppins, sans-serif",
          },
        }}
      >
        So, are you ready to join with us?
      </Typography>
      <Button
        variant="contained"
        size="large"
        href="/login"
        sx={{
          backgroundColor: buttonBgColor,
          color: textColor,
          borderRadius: "8px",
          padding: "12px 30px",
          fontSize: { xs: "0.9rem", md: "1rem" },
          fontWeight: 600,
          textTransform: "none",
          boxShadow: "0px 4px 15px rgba(106, 13, 173, 0.4)",
          transition: "background-color 0.3s ease, transform 0.2s ease",
          fontFamily: "Poppins, sans-serif",
          "&:hover": {
            backgroundColor: buttonHoverBgColor,
            transform: "translateY(-2px)",
            boxShadow: "0px 6px 20px rgba(106, 13, 173, 0.5)",
          },
        }}
      >
        Get started, It's free!
      </Button>
    </Box>
  );
};

export default CallToActionSection;
