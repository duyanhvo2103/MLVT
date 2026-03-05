import React, { FC, useState, useEffect } from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import "react-h5-audio-player/lib/styles.css";
import { styled } from "@mui/system";

interface ImageInProgressProps {
    progress: 0 | 25 | 50 | 75 | 100;
    imageUrl: string | null;
}

export const ImageInProgress: FC<ImageInProgressProps> = ({
    progress,
    imageUrl,
}) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const CustomLinearProgress = styled(LinearProgress)(({ theme }) => ({
        borderRadius: "8px",
        height: "20px",
        backgroundColor: theme.palette.grey[300],
        "& .MuiLinearProgress-bar": {
            borderRadius: "8px",
            background:
                "linear-gradient(90deg,rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%)",
        },
    }));

    useEffect(() => {
        if (imageUrl) {
            const img = new Image();
            img.src = imageUrl;
            img.onload = () => setIsImageLoaded(true);
            img.onerror = () => setIsImageLoaded(false);
        }
    }, [imageUrl]);

    interface ProgressBarProps {
        value: number;
    }

    const ProgressBar: FC<ProgressBarProps> = ({ value }) => (
        <Box sx={{ width: "100%" }}>
            <CustomLinearProgress variant="determinate" value={value} />
        </Box>
    );

    return (
        <Box
            sx={{
                borderRadius: "10px",
                overflow: "hidden", // Prevent content overflow
                display: "flex",
                border: "1px solid #EBEBEB",
                marginTop: "20px",
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
                width: "100%", // Parent container width
            }}
        >
            {/* Aspect Ratio Wrapper */}
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    paddingTop: "56.25%", // 16:9 aspect ratio (height/width * 100)
                }}
            >
                {/* Image */}
                <Box
                    component="img"
                    src={
                        (isImageLoaded && imageUrl) ||
                        "https://i.ytimg.com/vi/tvX8_f6LZaA/maxresdefault.jpg"
                    }
                    alt="VideoFrame"
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%", // Fill the container width
                        height: "100%", // Fill the container height
                        objectFit: "contain", // Cover the container, maintaining aspect ratio
                    }}
                />
            </Box>

            {/* Gradient Overlay */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background:
                        "linear-gradient(to bottom, rgba(160, 160, 160, 0.5), rgba(0, 0, 0, 1))",
                    zIndex: 2,
                }}
            />

            {/* Progress Bar */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: "5%",
                    width: "60%",
                    left: "50%",
                    transform: "translate(-50%, 0)",
                    zIndex: 3,
                    textAlign: "center",
                    color: "white",
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: "600",
                        marginBottom: "10px",
                        fontFamily: "Poppins, sans-serif",
                    }}
                >
                    {progress}%
                </Typography>
                <ProgressBar value={progress} />
            </Box>
        </Box>
    );
};
