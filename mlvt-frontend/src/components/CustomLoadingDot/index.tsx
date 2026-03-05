import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { SxProps, Theme } from "@mui/material/styles";

const bounceAnimation = {
    "@keyframes bounce": {
        "0%, 80%, 100%": {
            transform: "scale(0)",
        },
        "40%": {
            transform: "scale(1.0)",
        },
    },
};

const Dot = styled("span")(({ theme }) => ({
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: theme.palette.primary.main,
    animation: "bounce 1.4s infinite ease-in-out both",
}));

interface LoadingDotsProps {
    /**
     * The text content to display before the dots.
     * @default 'Loading'
     */
    content?: string;
    /**
     * Optional MUI sx prop to customize the root container.
     */
    sx?: SxProps<Theme>;
}

// 4. The main component
const LoadingDots: React.FC<LoadingDotsProps> = ({
    content = "",
    sx,
}) => {
    return (
        <Box
            sx={{
                ...bounceAnimation,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.5,
                mt: 2,
                ...sx,
            }}
        >
            <Typography
                variant="body1"
                component="span"
                fontFamily={"Poppins, sans-serif"}
                fontWeight={500}
                fontSize="1rem"
                color={(theme) => theme.palette.primary.main}
            >
                {content}
            </Typography>

            <Box sx={{ display: "flex", gap: 0.75 }}>
                <Dot
                    sx={{
                        animationDelay: "-0.32s",
                    }}
                />
                <Dot
                    sx={{
                        animationDelay: "-0.16s",
                    }}
                />
                <Dot
                    sx={{
                        animationDelay: "0s",
                    }}
                />
            </Box>
        </Box>
    );
};

export default LoadingDots;
