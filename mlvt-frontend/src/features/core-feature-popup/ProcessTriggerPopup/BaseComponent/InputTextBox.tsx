import { useState, useEffect, ChangeEvent } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface InputTextBoxProps {
    inputTextFromParent: string;
    handleChangeText: (text: string) => void;
    // handleChangeDisableGenerate: (value: boolean) => void;
}

export const InputTextBox: React.FC<InputTextBoxProps> = ({
    inputTextFromParent,
    handleChangeText,
    // handleChangeDisableGenerate,
}) => {
    const [inputValue, setInputValue] = useState<string>(inputTextFromParent);
    const theme = useTheme();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const url = event.target.value;
        setInputValue(url);
    };

    useEffect(() => {
        const delayDebounce = setTimeout(async () => {
            handleChangeText(inputValue);
        }, 150);

        return () => clearTimeout(delayDebounce);
    }, [inputValue, handleChangeText]);

    return (
        <Box
            sx={{
                marginBottom: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <Typography
                variant="body2"
                sx={{
                    marginY: "10px",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                }}
            >
                Enter text:
            </Typography>

            <TextField
                fullWidth
                label=""
                placeholder="Enter your text here"
                multiline
                rows={4}
                value={inputValue}
                onChange={handleInputChange}
                inputProps={{
                    id: "textarea-input",
                    name: "textareaInput",
                }}
                sx={{
                    borderRadius: "0.375rem",
                    height: "2.5rem",
                    padding: "0",
                    marginBottom: "4rem",
                }}
                InputProps={{
                    style: {
                        backgroundColor: theme.palette.background.paper,
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "0.875rem",
                    },
                }}
            />
        </Box>
    );
};
