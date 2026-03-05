import React, { FC } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
    IconButton,
    Divider,
    Box,
    Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { ProjectStatus, toDisplayText } from "../../../types/ProjectStatus";

interface BasePopupProps {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    childComponent: React.ReactNode;
    statusChip: ProjectStatus | null;
    customSx?: object;
    customPaperPropsSx?: object;
}

export const BasePopup: FC<BasePopupProps> = ({
    title,
    isOpen,
    onClose,
    childComponent,
    statusChip,
    customSx,
    customPaperPropsSx,
}) => {
    const theme = useTheme();

    const mapStatusToColor = (statusChip: string) => {
        switch (statusChip) {
            case "processing":
                return {
                    backgroundColor: "#FFCC00",
                    fontColor: "#000000",
                };
            case "succeeded":
                return {
                    backgroundColor: "#C0EBA6",
                    fontColor: "#16610E",
                };
            case "failed":
                return {
                    backgroundColor: "#F8C4B4",
                    fontColor: "#CF0A0A",
                };
            case "raw":
                return {
                    backgroundColor: "#CCCCCC",
                    fontColor: "#000000",
                };
            default:
                return {
                    backgroundColor: theme.palette.grey[500],
                    fontColor: theme.palette.text.primary,
                };
        }
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth={false}
            fullWidth={false}
            scroll="paper"
            container={document.body}
            sx={{
                zIndex: (theme) => theme.zIndex.modal + 2,
                "& .MuiDialog-container": {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                },
                "& .MuiDialog-paperScrollBody": {
                    maxHeight: "none",
                    margin: 0,
                },
                ...customSx,
            }}
            PaperProps={{
                sx: {
                    backgroundColor: theme.palette.background.paper,
                    width: "800px",
                    minHeight: "400px",
                    ...customPaperPropsSx,
                },
            }}
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "30px",
                    margin: "10px 0",
                }}
            >
                <Box display="flex" flexDirection="row" alignItems="center">
                    {statusChip !== null && (
                        <Chip
                            label={toDisplayText(statusChip)}
                            sx={{
                                backgroundColor:
                                    mapStatusToColor(statusChip)
                                        .backgroundColor,
                                color: mapStatusToColor(statusChip).fontColor,
                                fontFamily: "Poppins, sans-serif",
                                fontSize: "0.9rem",
                                fontWeight: "600",
                                marginRight: "10px",
                                borderRadius: "0.5rem",
                            }}
                        />
                    )}
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            fontFamily: "Poppins, sans-serif",
                            color: theme.palette.text.primary,
                        }}
                    >
                        {title}
                    </Typography>
                </Box>
                <IconButton
                    onClick={(event) => {
                        event.stopPropagation();
                        onClose();
                    }}
                >
                    <CloseIcon
                        sx={{
                            color: (theme) => theme.palette.text.primary,
                        }}
                    />
                </IconButton>
            </DialogTitle>

            <Divider
                orientation="horizontal"
                flexItem
                sx={{ borderBottomWidth: 1 }}
            />

            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "auto",
                    height: "100%",
                }}
            >
                <Box height="100%" width="100%">
                    {childComponent}
                </Box>
            </DialogContent>
        </Dialog>
    );
};
