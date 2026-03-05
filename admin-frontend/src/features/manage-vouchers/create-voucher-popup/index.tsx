import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Stack } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useTheme } from "../../../theme";

interface CreateVoucherPopupProps {
    open: boolean
    onClose: () => void
    onSubmit: (voucher: {
        code: string
        token: number
        max_usage: number
        expired_time: string
    }) => void
}

export const CreateVoucherPopup: React.FC<CreateVoucherPopupProps> = ({ open, onClose, onSubmit }) => {
    const [code, setCode] = useState("");
    const [token, setToken] = useState(0);
    const [maxUsage, setMaxUsage] = useState(0);
    const [expiredTime, setExpiredTime] = useState<Dayjs | null>(dayjs());

    const theme = useTheme()

    const handleSubmit = () => {
        if (!code || !expiredTime) return
        onSubmit({
            code,
            token,
            max_usage: 5,
            expired_time: expiredTime.toISOString(),
        })
    }

    const dateTimePickerSx = {
        slotProps: {
            popper: {
                sx: {
                    ".MuiPaper-root": { border: "1px solid blue", borderRadius: "10px" },
                },
            },
            textField: {
                fullWidth: true,
                sx: {
                    "& .MuiInputLabel-root": {
                        color: theme.fontColor.white,
                    },
                    "& fieldset": {
                        borderColor: theme.fontColor.white,
                    },
                    "& .MuiIconButton-root": {
                        color: theme.fontColor.white,
                    },
                },
                InputProps: {
                    disableUnderline: true,
                    sx: {
                        color: "#FFFF",
                    },
                },
            },
        },
        PopperProps: {
            sx: { "&.MuiPickersPopper-root": { border: "4px solid red" } },
        },
    };

    const textFieldInputSx = {
        sx: {
            // use for text field component
            // label color
            "& .MuiInputLabel-root": {
                color: "#FFFF",
            },
            // border color
            "& .MuiOutlinedInput-root": {
                color: "#FFFF",
                "& fieldset": {
                    borderColor: "#FFFF",
                },
                "&:hover fieldset": {
                    borderColor: "#0041C2",
                },
                "&.Mui-focused fieldset": {
                    borderColor: "primary",
                },
            },
        },
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            sx={{
                "& .MuiPaper-root": {
                    background: `linear-gradient(180deg, ${theme.background.dark} 0%, ${theme.background.lightDark} 100%)`,
                    color: "#ffff",
                },
            }}
        >
            <DialogTitle sx={{ color: "#ffff" }}>Create New Voucher</DialogTitle>
            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <TextField
                        label="Code"
                        fullWidth
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        {...textFieldInputSx}
                    />
                    <TextField
                        label="Token"
                        type="number"
                        fullWidth
                        value={token}
                        onChange={(e) => setToken(parseInt(e.target.value))}
                        {...textFieldInputSx}
                    />
                    <TextField
                        label="Max usage"
                        type="number"
                        fullWidth
                        value={maxUsage}
                        onChange={(e) => setMaxUsage(parseInt(e.target.value))}
                        {...textFieldInputSx}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Expired Time"
                            value={expiredTime}
                            onChange={(newValue) => setExpiredTime(newValue)}
                            {...dateTimePickerSx}
                        />
                    </LocalizationProvider>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    )
}
