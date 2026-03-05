import { useTheme } from "@mui/material/styles";
import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import LoginSignup from "../../layout/LoginSignup";

// A simple email validation function using regex
const validateEmailFormat = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const InputStyles = (theme: any) => ({
    sx: {
        "& input::placeholder": {
            fontSize: "0.9rem",
            color: theme.fontColor.gray,
        },
        borderRadius: 2.5,
    },
});

const EmailOTP = () => {
    const theme = useTheme();
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    // const [error, setError] = useState("");

    // Validate the email input on blur (when the user leaves the field)
    const validateEmail = () => {
        if (!email) {
            setEmailError("Email is required");
        } else if (!validateEmailFormat(email)) {
            setEmailError("Invalid email format");
        } else {
            setEmailError("");
        }
    };

    return (
        <LoginSignup>
            <Typography
                variant="h4"
                sx={{
                    // color: theme.fontColor.black,
                    fontFamily: theme.typography.h1,
                    fontWeight: theme.typography.fontWeightBold,
                    fontSize: "4rem",
                    marginBottom: 5,
                }}
            >
                Email to get OTP
            </Typography>

            <Typography
                sx={{
                    fontFamily: theme.typography.body1,
                    fontSize: 15,
                    fontWeight: 550,
                    marginTop: 2.5,
                }}
            >
                Email address
            </Typography>
            <TextField
                placeholder="Enter your email address"
                type="email"
                fullWidth
                margin="normal"
                size="medium"
                required
                InputProps={{
                    ...InputStyles(theme),
                    sx: {
                        ...InputStyles(theme).sx,
                        "& input::placeholder": {
                            ...InputStyles(theme).sx["& input::placeholder"],
                            fontSize: "1rem",
                        },
                    },
                }}
                sx={{
                    marginTop: 0.6,
                    "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                            // borderColor: theme.background.main,
                        },
                    },
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
                error={!!emailError}
                helperText={emailError}
                FormHelperTextProps={{
                    sx: {
                        fontFamily: theme.typography.body1,
                        // color: theme.status.failed.fontColor,
                        marginLeft: 0,
                        fontSize: 12,
                    },
                }}
            />

            {emailError && (
                <Typography color="error" sx={{ marginTop: 2 }}>
                    {emailError}
                </Typography>
            )}

            <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={!!emailError}
                sx={{
                    marginTop: 3.5,
                    marginBottom: 20,
                    borderRadius: 2.5,
                    // backgroundColor: theme.background.main,
                    fontFamily: theme.typography.h1,
                    fontWeight: theme.typography.fontWeightBold,
                    fontSize: "1rem",
                    height: "2.5rem",
                    "&:hover": {
                        // backgroundColor: theme.background.main,
                    },
                }}
            >
                GET OTP
            </Button>
        </LoginSignup>
    );
};

export default EmailOTP;
