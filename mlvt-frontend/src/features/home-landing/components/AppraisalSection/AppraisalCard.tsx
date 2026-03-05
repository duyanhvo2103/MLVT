// src/components/AppraisalCard.tsx
import React from "react";
import { Box, Typography, IconButton, Paper, Grid } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";

interface AppraisalCardProps {
  imageSrc: string;
  title: string;
  subtitle: string;
  description: string;
  link?: string;
}

const cardBackgroundColor = "#23233B";
const textColor = "#E0E0E0";
const lightTextColor = "#B0B0B0";
const accentColor = "#906bff";

const AppraisalCard: React.FC<AppraisalCardProps> = ({
  imageSrc,
  title,
  subtitle,
  description,
  link,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: cardBackgroundColor,
        p: { xs: 2, md: 3 },
        borderRadius: "12px",
        mx: { xs: 1, sm: 2 },
        display: "flex",
        minHeight: "auto",
        overflow: "hidden",
      }}
    >
      <Grid container spacing={3} alignItems="flex-start">
        <Grid item xs={12} sm={4} md={3.5}>
          <Box
            sx={{
              width: "100%",
              height: { xs: 280, sm: 320, md: "100%" },
              minHeight: 280,
              borderRadius: "8px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255,255,255,0.05)",
            }}
          >
            <img
              src={imageSrc}
              alt={title}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          </Box>
        </Grid>

        {/* Text Content Section */}
        <Grid item xs={12} sm={8} md={8.5}>
          <Box
            sx={{
              position: "relative",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {link && (
              <IconButton
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  color: lightTextColor,
                  border: `1px solid ${lightTextColor}`,
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  "&:hover": {
                    borderColor: accentColor,
                    color: accentColor,
                  },
                }}
              >
                <LaunchIcon fontSize="small" />
              </IconButton>
            )}

            <Typography
              variant="h6"
              component="h3"
              fontWeight="bold"
              sx={{
                color: textColor,
                fontSize: { xs: "1.1rem", md: "1.25rem" },
                fontFamily: "Poppins, sans-serif",
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="caption"
              display="block"
              sx={{
                color: lightTextColor,
                mb: 2,
                fontSize: "0.75rem",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              {subtitle}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: lightTextColor,
                lineHeight: 1.7,
                flexGrow: 1,
                fontSize: "0.9rem",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              {description}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AppraisalCard;
