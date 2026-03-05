import { Box, Button, Typography } from "@mui/material";
import LoginSignup from "../../layout/LoginSignup";
import { useState, useRef } from "react";
import { useTheme } from "@mui/material/styles";

const VerifyOtp: React.FC = () => {
    const theme = useTheme();
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const inputRefs = useRef<HTMLInputElement[]>([]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const value = e.target.value;
        if (/^[0-9]*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (index < 5 && value) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const paste = e.clipboardData.getData("text");
        if (paste.length === 6 && /^[0-9]*$/.test(paste)) {
            setOtp(paste.split(""));
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === "Backspace" && index > 0 && !otp[index]) {
            const newOtp = [...otp];
            newOtp[index - 1] = "";
            setOtp(newOtp);
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <LoginSignup>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography
                    sx={{
                        fontFamily: theme.typography.h1,
                        fontSize: "4rem",
                        fontWeight: theme.typography.fontWeightBold,
                        color: "#000",
                        marginTop: "2rem",
                        marginBottom: "2rem",
                    }}
                >
                    Enter OTP
                </Typography>

                <Box display="flex" gap={1}>
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) =>
                                (inputRefs.current[index] =
                                    el as HTMLInputElement)
                            }
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={handlePaste}
                            style={{
                                width: 60,
                                height: 60,
                                textAlign: "center",
                                borderRadius: 5,
                                border:
                                    "2px solid " + theme.palette.primary.main,
                                color: theme.palette.primary.main,
                                fontFamily: theme.typography.body1.fontFamily,
                                fontWeight: theme.typography.fontWeightBold,
                                fontSize: "1.5rem",
                                outline: "none",
                            }}
                        />
                    ))}
                </Box>

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                        marginTop: 5.5,
                        marginBottom: 20,
                        borderRadius: 2.5,
                        backgroundColor: theme.palette.primary.main,
                        fontFamily: theme.typography.h1,
                        fontWeight: theme.typography.fontWeightBold,
                        fontSize: "1rem",
                        height: "2.5rem",
                        "&:hover": {
                            backgroundColor: theme.palette.primary.dark,
                        },
                    }}
                >
                    VERIFY OTP
                </Button>
            </Box>
        </LoginSignup>
    );
};

export default VerifyOtp;
