import React from "react";
import {
  Box,
  Typography,
  Container,
} from "@mui/material";

const HelpHeader: React.FC = () => {
  return (
    <Box
      sx={{
        py: { xs: 4, md: 8 },
        marginTop: { xs: 0, md: 5 },
        backgroundColor: "transparent",
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
        <Typography
          fontWeight="600"
          gutterBottom
          fontFamily={"Poppins, sans-serif"}
          sx={{
            fontSize: { xs: "1.5rem", md: "4rem" },
            color: "#E0E0E0",
            mb: 2,
          }}
        >
          How can we help?
        </Typography>
      </Container>
    </Box>
  );
};

export default HelpHeader;
