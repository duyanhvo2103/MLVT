import React, { ChangeEvent, useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export const checkValidUrl = (url: string): boolean => {
    if (url.length > 2048) {
        return false;
    }
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
};

const checkVideoUrlViaElement = (
    inputUrl: string
): Promise<[boolean, string | null]> => {
    return new Promise<[boolean, string | null]>((resolve) => {
        const videoEl = document.createElement("video");
        videoEl.muted = true;
        videoEl.src = inputUrl;

        videoEl.onloadedmetadata = () => {
            resolve([true, null]);
            cleanup();
        };

        videoEl.onerror = () => {
            resolve([
                false,
                "URL does not seem to contain valid video content.",
            ]);
            cleanup();
        };

        function cleanup() {
            videoEl.onloadedmetadata = null;
            videoEl.onerror = null;
        }
    });
};

interface UrlVideoProps {
    setURLInput: (url: string | null) => void;
    handleChangeDisableGenerate: (value: boolean) => void;
}

export const UploadVideoFromUrl: React.FC<UrlVideoProps> = ({
    setURLInput,
    handleChangeDisableGenerate,
}) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [isValid, setIsValid] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (!inputValue) {
            setIsValid(false);
            setErrorMessage(null);
            return;
        }

        const delayDebounce = setTimeout(async () => {
            const isUrlValid = checkValidUrl(inputValue);
            if (!isUrlValid) {
                setErrorMessage("The URL does not have the right pattern");
                setIsValid(false);
                return;
            }

            const [valid, errorCheck] = await checkVideoUrlViaElement(
                inputValue
            );
            setIsValid(valid);
            if (!valid && errorCheck) {
                setErrorMessage(errorCheck);
            } else {
                setErrorMessage(null);
            }
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [inputValue]);

    useEffect(() => {
        handleChangeDisableGenerate(!isValid);
        if (isValid) {
            setURLInput(inputValue);
        } else {
            setURLInput(null);
        }
    }, [isValid, inputValue, handleChangeDisableGenerate, setURLInput]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <Box
            sx={{
                marginBottom: "15px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <Typography
                variant="body2"
                sx={{
                    marginBottom: "5px",
                    marginTop: "15px",
                    fontFamily: "Poppins, sans-serif",
                }}
            >
                Enter a valid YouTube or other supported video URL.
            </Typography>

            <TextField
                fullWidth
                label="Enter a valid URL"
                variant="filled"
                value={inputValue}
                onChange={handleInputChange}
                InputLabelProps={{
                    sx: {
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "0.9rem",
                        color: (theme) => theme.palette.text.secondary,
                        "&.Mui-focused": {
                            color: (theme) => theme.palette.primary.main,
                        },
                    },
                }}
                InputProps={{
                    sx: {
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "0.95rem",
                        color: (theme) => theme.palette.text.primary,
                    },
                }}
                sx={{
                    borderRadius: "0.375rem",
                    height: "2.5rem",
                    padding: "0",
                    marginBottom: "10px",
                }}
                helperText={
                    !inputValue || (inputValue && isValid) ? null : (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                marginTop: "0.5rem",
                                color: "#DC143C",
                                fontFamily: "Poppins, sans-serif",
                            }}
                        >
                            <InfoOutlinedIcon
                                sx={{ fontSize: "1rem", color: "#DC143C" }}
                            />
                            {errorMessage
                                ? errorMessage
                                : "Please enter a valid YouTube or other supported video URL."}
                        </Box>
                    )
                }
            />
            <Button
                startIcon={<InfoOutlinedIcon />}
                variant="text"
                disabled
                sx={{
                    marginTop: "2.3rem",
                    fontSize: "0.8rem",
                    padding: 0,
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    "&.Mui-disabled": {
                        color: (theme) => theme.palette.text.secondary,
                    },
                }}
            >
                Required
            </Button>
        </Box>
    );
};
