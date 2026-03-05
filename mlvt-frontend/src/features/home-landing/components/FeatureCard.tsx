import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { ReactNode } from "react";

interface FeatureCardProps {
    icon: ReactNode;
    title: string;
    subtitle: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, subtitle }) => {
    return (
        <Box
            sx={{
                background: "linear-gradient(135deg, #1D1235 0%, #1B1033 100%)",
                color: "white",
                borderRadius: "20px",
                padding: 4,
                width: "100%",
                maxWidth: 360,
                position: "relative",
                boxShadow: "0 0 20px rgba(0,0,0,0.2)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
        >
            {/* Icon */}
            <Box
                sx={{
                    backgroundColor: "black",
                    borderRadius: "50%",
                    width: 64,
                    height: 64,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                }}
            >
                {icon}
            </Box>

            {/* Title */}
            <Typography
                variant="h6"
                fontWeight="650"
                fontFamily="Poppins, sans-serif"
                textAlign="left"
                gutterBottom
            >
                {title}
            </Typography>

            {/* Subtitle */}
            <Typography variant="body2" color="#AAA">
                {subtitle}
            </Typography>

            {/* View Sample */}
            <Button
                sx={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    color: "#A259FF",
                    textTransform: "none",
                    fontWeight: 550,
                    fontSize: "0.9rem",
                    fontFamily: "Poppins, sans-serif",
                }}
            >
                View Sample
            </Button>
        </Box>
    );
};

export default FeatureCard;
