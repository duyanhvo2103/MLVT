import React from "react";
import { Box, Typography, Modal, useTheme } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface SuccessPopupProps {
    open: boolean;
    onClose: () => void;
    message: string;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({
    open,
    onClose,
    message,
}) => {
    const theme = useTheme();
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="success-popup-title"
            aria-describedby="success-popup-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRadius: 2,
                }}
            >
                <CheckCircleIcon
                    sx={{
                        fontSize: 100,
                        color: theme.palette.success.contrastText,
                        alignSelf: "center",
                    }}
                />

                <Typography
                    sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: "550",
                        fontSize: "1.5rem",
                        marginTop: 5,
                        color: theme.palette.success.contrastText,
                        textAlign: "center",
                    }}
                >
                    {message}
                </Typography>
            </Box>
        </Modal>
    );
};

export default SuccessPopup;
