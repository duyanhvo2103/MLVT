import React, { FC } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Typography,
    Divider,
    Box,
    Link,
    CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { useNavigate } from "react-router-dom";
import { alpha, useTheme } from "@mui/material/styles";
import { CustomButton } from "../CustomButton";

interface UploadNotificationProps {
    isOpen: boolean;
    status: "success" | "fail" | "loading";
    onClose: () => void;
    content: string | null;
    okButtonVisible?: boolean;
    navigateStorage?: boolean;
    title?: string;
}

const UploadNotification: FC<UploadNotificationProps> = ({
    isOpen,
    status,
    onClose,
    content,
    okButtonVisible = false,
    navigateStorage = true,
    title = "Video Translation",
}) => {
    const isSuccess = status === "success";
    const isLoading = status === "loading";
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Dialog
            open={isOpen}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    backgroundColor: alpha(
                        theme.palette.background.default,
                        0.88
                    ),
                    borderRadius: "15px",
                },
            }}
            onClose={isLoading ? () => {} : onClose}
        >
            {!okButtonVisible && (
                <DialogTitle
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        height: "30px",
                        margin: "10px",
                    }}
                >
                    <Typography
                        sx={{
                            flexGrow: 1,
                            fontWeight: "600",
                            fontFamily: "Poppins, sans-serif",
                            color: theme.palette.secondary.contrastText,
                        }}
                    >
                        {title}
                    </Typography>

                    <IconButton onClick={onClose}>
                        <CloseIcon
                            sx={{
                                color: theme.palette.secondary.contrastText,
                            }}
                        />
                    </IconButton>
                </DialogTitle>
            )}

            <Divider
                orientation="horizontal"
                flexItem
                sx={{ borderBottomWidth: 2 }}
            />

            <DialogContent
                sx={{
                    bgcolor: theme.palette.background.paper,
                    paddingY: 4,
                }}
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    {isLoading && (
                        <>
                            <CircularProgress size={80} />
                        </>
                    )}
                    {!isLoading && (
                        <>
                            {isSuccess ? (
                                <CheckCircleIcon
                                    sx={{
                                        color: theme.palette.success
                                            .contrastText,
                                        fontSize: 100,
                                    }}
                                />
                            ) : (
                                <CancelRoundedIcon
                                    sx={{
                                        color: theme.palette.error.contrastText,
                                        fontSize: 100,
                                    }}
                                />
                            )}
                        </>
                    )}

                    <Typography
                        sx={{
                            flexGrow: 1,
                            fontWeight: 600,
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "1.8rem",
                            textAlign: "center",
                            color: (theme) =>
                                isLoading 
                                    ? theme.palette.primary.main 
                                    : isSuccess 
                                    ? theme.palette.success.contrastText 
                                    : theme.palette.error.contrastText, 
                        }}
                    >
                        {isSuccess
                            ? `${
                                  content !== null
                                      ? content
                                      : "Upload data successfully! 🎉"
                              }`
                            : `${
                                  content !== null
                                      ? content
                                      : "Upload data failed!"
                              }`}
                    </Typography>
                    {navigateStorage && (
                        <Typography
                            variant="body2"
                            paddingTop="15px"
                            sx={{
                                flexGrow: 1,
                                fontFamily:
                                    "Poppins, Roboto, Arial, sans-serif",
                            }}
                        >
                            Navigate to the video storage by{" "}
                            <Link
                                component="button"
                                onClick={() => navigate("/my-storage")}
                                sx={{
                                    fontWeight: "650",
                                    color: theme.palette.neutral.main,
                                    textDecoration: "underline",
                                }}
                            >
                                click here
                            </Link>
                        </Typography>
                    )}
                </Box>
                {okButtonVisible && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 3,
                        }}
                    >
                        <CustomButton
                            text="Continue"
                            onClick={onClose}
                            sx={{
                                fontSize: "1rem",
                            }}
                        />
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default UploadNotification;
