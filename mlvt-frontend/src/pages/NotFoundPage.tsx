import React from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

// A simple, cute, and self-contained SVG for our lost cat.
// No need for external image files!
const CuteCatSvg = () => {
    const theme = useTheme();
    const primaryColor = theme.palette.text.secondary;
    const accentColor = theme.palette.primary.main;

    return (
        <Box
            component="svg"
            viewBox="0 0 150 150"
            width="200px"
            height="200px"
            sx={{ mb: 4 }}
        >
            {/* Tear Drop */}
            <path
                d="M70 95 C 70 100, 65 105, 60 105 C 55 105, 50 100, 50 95 C 50 90, 60 80, 60 80 C 60 80, 70 90, 70 95 Z"
                fill={accentColor}
                opacity="0.7"
            />

            {/* Cat Body & Head */}
            <path
                d="M50 120 C 50 140, 100 140, 100 120 C 120 120, 120 70, 100 60 C 90 40, 60 40, 50 60 C 30 70, 30 120, 50 120 Z"
                fill={primaryColor}
                stroke={primaryColor}
                strokeWidth="2"
            />

            {/* Ears */}
            <polygon points="50,60 30,30 60,50" fill={primaryColor} />
            <polygon points="100,60 120,30 90,50" fill={primaryColor} />

            {/* Eyes (closed sad) */}
            <path
                d="M65 80 Q 70 85, 75 80"
                stroke="#FFFFFF"
                strokeWidth="3"
                fill="none"
            />
            <path
                d="M95 80 Q 85 85, 80 80"
                stroke="#FFFFFF"
                strokeWidth="3"
                fill="none"
            />

            {/* Sad Mouth */}
            <path
                d="M75 100 Q 82.5 95, 90 100"
                stroke="#FFFFFF"
                strokeWidth="3"
                fill="none"
            />
        </Box>
    );
};

const NotFoundPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    const handleGoHome = () => {
        navigate("/"); // Navigate to the home page
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                backgroundColor: theme.palette.background.default,
                textAlign: "center",
                p: 3, // Add some padding for smaller screens
            }}
        >
            <CuteCatSvg />

            <Typography
                variant="h1"
                component="h1"
                sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "6rem", md: "8rem" },
                    color: theme.palette.primary.main,
                    textShadow: `2px 2px 0 ${theme.palette.background.paper}`,
                    fontFamily: "Poppins, sans-serif",
                }}
            >
                404
            </Typography>

            <Typography
                variant="h4"
                component="h2"
                sx={{
                    mt: 2,
                    mb: 1,
                    fontWeight: "bold",
                    color: theme.palette.text.primary,
                    fontFamily: "Poppins, sans-serif",
                }}
            >
                Oops! Page Not Found
            </Typography>

            <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                    mb: 4,
                    maxWidth: "450px",
                    fontFamily: "Poppins, sans-serif",
                }}
            >
                The page you're looking for seems to have gone on a little
                adventure. Let's get you back on the right track.
            </Typography>

            <Button
                variant="contained"
                onClick={handleGoHome}
                startIcon={<HomeIcon />}
                sx={{
                    borderRadius: "50px",
                    padding: "10px 25px",
                    fontWeight: "550",
                    textTransform: "none", 
                    fontSize: "1rem",
                    fontFamily: "Poppins, sans-serif",
                }}
            >
                Go Back Home
            </Button>
        </Box>
    );
};

export default NotFoundPage;
