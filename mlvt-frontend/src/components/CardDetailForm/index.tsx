import React, { useEffect, useState } from "react";
import { Box, Grid, TextField, Typography, useTheme } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { CardData } from "../../types/Payment";

const labelSX = {
    fontSize: "0.9rem",
    fontWeight: 500,
    fontFamily: "Poppins, sans-serif",
    mb: 0.8,
};

const inputBaseSX = {
    "& .MuiInputBase-input": {
        padding: "10px 14px",
        fontFamily: "Poppins, sans-serif",
        fontSize: "1rem",
    },
};

interface CardDetailsFormProps {
    onUpdate: (data: CardData, isValid: boolean) => void;
}

const CardDetailsForm: React.FC<CardDetailsFormProps> = ({ onUpdate }) => {
    const theme = useTheme();
    const [cardHolderName, setCardHolderName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [securityCode, setSecurityCode] = useState("");

    // All handler functions now live inside this component
    const handleCardHolderNameChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
        setCardHolderName(value);
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, ""); // Remove non-digits
        const truncatedValue = rawValue.substring(0, 16); // Max 16 digits (typical for Visa/MasterCard)

        let formattedValue = "";
        for (let i = 0; i < truncatedValue.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += " ";
            }
            formattedValue += truncatedValue[i];
        }
        setCardNumber(formattedValue);
    };

    const handleExpiryDateChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const inputValue = event.target.value;
        const previousValue = expiryDate;
        let digits = inputValue.replace(/\D/g, "");

        if (
            digits.length === 1 &&
            parseInt(digits[0]) > 1 &&
            parseInt(digits[0]) <= 9
        ) {
            if (previousValue.replace(/\D/g, "").length === 0) {
                digits = "0" + digits[0];
            }
        }

        if (digits.length >= 2) {
            let monthPart = digits.substring(0, 2);
            if (monthPart === "00") {
                digits = "0" + digits.substring(2);
            } else if (parseInt(monthPart) > 12) {
                digits = monthPart[0] + digits.substring(2);
            }
        }

        if (digits.length > 4) {
            digits = digits.substring(0, 4);
        }

        let formatted = "";
        if (digits.length > 2) {
            formatted = `${digits.substring(0, 2)}/${digits.substring(2)}`;
        } else if (digits.length > 0) {
            formatted = digits;
        } else {
            formatted = "";
        }

        if (
            inputValue.endsWith("/") &&
            digits.length === 2 &&
            formatted.length === 2
        ) {
            formatted += "/";
        } else if (
            previousValue.endsWith("/") &&
            digits.length === 2 &&
            formatted.length === 2 &&
            !inputValue.endsWith("/")
        ) {
        }
        setExpiryDate(formatted);
    };

    const handleSecurityCodeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const inputValue = event.target.value.replace(/\D/g, "");
        setSecurityCode(inputValue.substring(0, 3));
    };

    useEffect(() => {
        const data: CardData = {
            cardHolderName,
            cardNumber,
            expiryDate,
            securityCode,
        };
        const isValid =
            cardHolderName.trim() !== "" &&
            cardNumber.replace(/\s/g, "").length === 16 &&
            expiryDate.length === 5 && // e.g., 'MM/YY'
            securityCode.length === 3;

        onUpdate(data, isValid);
    }, [cardHolderName, cardNumber, expiryDate, securityCode, onUpdate]);
    return (
        <Grid container spacing={2}>
            {/* Card Holder Name */}
            <Grid item xs={12}>
                <Typography sx={labelSX}>Card Holder Name</Typography>
                <TextField
                    fullWidth
                    placeholder="John Doe"
                    inputProps={{
                        style: {
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "1rem",
                        },
                    }}
                    value={cardHolderName}
                    onChange={handleCardHolderNameChange}
                    sx={inputBaseSX}
                />
            </Grid>

            {/* Card Number */}
            <Grid item xs={12}>
                <Typography sx={labelSX}>Card Number</Typography>
                <TextField
                    fullWidth
                    placeholder="XXXX XXXX XXXX XXXX"
                    inputProps={{
                        style: {
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "1rem",
                        },
                    }}
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    sx={inputBaseSX}
                    InputProps={{
                        startAdornment: (
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mr: 1,
                                }}
                            >
                                <CreditCardIcon
                                    sx={{ color: theme.palette.text.secondary }}
                                />
                            </Box>
                        ),
                    }}
                />
            </Grid>

            {/* Expiry Date */}
            <Grid item xs={6}>
                <Typography sx={labelSX}>Expiry Date</Typography>
                <TextField
                    fullWidth
                    placeholder="MM/YY"
                    inputProps={{
                        style: {
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "1rem",
                        },
                    }}
                    value={expiryDate}
                    onChange={handleExpiryDateChange}
                    sx={inputBaseSX}
                />
            </Grid>

            {/* Security Code */}
            <Grid item xs={6}>
                <Typography sx={labelSX}>Security Code</Typography>
                <TextField
                    fullWidth
                    placeholder="CVV"
                    inputProps={{
                        style: {
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "1rem",
                        },
                    }}
                    value={securityCode}
                    onChange={handleSecurityCodeChange}
                    sx={inputBaseSX}
                />
            </Grid>
        </Grid>
    );
};

export default CardDetailsForm;
