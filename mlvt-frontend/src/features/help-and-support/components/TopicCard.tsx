// TopicCard.tsx (Corrected)

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Card,
  CardContent,
  Link as MuiLink,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

export interface TopicCardProps {
  title: string;
  description: string;
  linkText: string;
  href: string;
}

interface ClickableTopicCardProps extends TopicCardProps {
  onClick: () => void;
}

const TopicCard: React.FC<ClickableTopicCardProps> = ({
  title,
  description,
  linkText,
  onClick,
}) => {
  return (
    <Card
      onClick={onClick} 
      variant="outlined"
      sx={{
        height: "100%",
        cursor: "pointer", 
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        background: "rgba(30, 20, 50, 0.6)", 
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "16px",
        backdropFilter: 'blur(10px)',
        '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)'
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1, color: "white" }}>
        <Typography
          variant="h6"
          component="h4"
          gutterBottom
          fontWeight="600"
          sx={{
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="rgba(255, 255, 255, 0.7)"
          paragraph
          sx={{
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {description}
        </Typography>
      </CardContent>
      <Stack sx={{ p: 2, pt: 0 }}>
        <MuiLink
          component="div" 
          underline="none"
          variant="body2"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            color: "#DDCCFF",
            fontWeight: "medium",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {linkText}
          <ArrowForwardIosIcon sx={{ fontSize: "0.8rem", ml: 0.5 }} />
        </MuiLink>
      </Stack>
    </Card>
  );
};

export default TopicCard;