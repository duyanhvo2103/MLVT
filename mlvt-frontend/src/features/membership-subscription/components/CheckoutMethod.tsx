import React, { useState } from "react";
import {
    Box,
    Container,
    Typography,
    Paper,
    Divider,
    Button,
    Stack,
} from "@mui/material";
import CardDetailsForm from "../../../components/CardDetailForm";
import { CardData } from "../../../types/Payment";
import MoMoLogo from "../../../assets/momo_logo.png";
import VisaCard from "../../../assets/visa_card.jpg";
import MastercardCard from "../../../assets/master_card.jpg";
import { CustomButton } from "../../../components/CustomButton";

interface CheckoutMethodProps {
    email: string;
    totalAmount: number;
}

const CheckoutMethod: React.FC<CheckoutMethodProps> = ({
    email,
    totalAmount,
}) => {
    const [cardData, setCardData] = useState<CardData | null>(null);
    const [isCardFormValid, setIsCardFormValid] = useState(false);

    const handleCardUpdate = (data: CardData, isValid: boolean) => {
        setCardData(data);
        setIsCardFormValid(isValid);
    };

    const handlePay = () => {
        if (!isCardFormValid || !cardData) {
            console.error("Card information is invalid.");
            return;
        }
        console.log("Processing payment with card:", cardData);
        // Add API call to process the payment here
    };

    return (
        <Container maxWidth="sm">
            <Paper
                elevation={0}
                sx={{
                    borderRadius: 3,
                    p: { xs: 2, sm: 4 },
                    bgcolor: "transparent",
                    boxShadow: "0 4px 8px rgba(208, 169, 169, 0.1)",
                }}
            >
                {/* 1. MoMo Payment Button */}
                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                        bgcolor: (theme) => theme.palette.action.active,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 2,
                        p: 1.5,
                        textTransform: "none",
                        boxShadow: "1px 3px 4px rgba(0,0,0,0.1)",
                        "&:hover": {
                            bgcolor: (theme) => theme.palette.action.hover,
                        },
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: "bold",
                            fontSize: "1rem",
                            fontFamily: "Poppins, Roboto, sans-serif",
                            color: (theme) => theme.palette.primary.main,
                        }}
                    >
                        COMPLETE YOUR PAYMENT WITH
                    </Typography>
                    <Box
                        component="img"
                        src={MoMoLogo}
                        alt="MoMo Logo"
                        sx={{ height: 40 }}
                    />
                </Button>

                {/* 2. Divider */}
                <Divider
                    sx={{
                        my: 3,
                        fontSize: "0.8rem",
                        color: "text.secondary",
                        fontWeight: 500,
                        fontFamily: "Poppins, Roboto, sans-serif",
                    }}
                >
                    OR USING CARD PAYMENT
                </Divider>

                {/* 3. Email Display */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        bgcolor: (theme) => theme.palette.background.paper,
                        boxShadow: 1,
                        px: 1.5,
                        py: 0.9,
                        borderRadius: 1,
                        mb: 3,
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: "500",
                            fontSize: "0.8rem",
                            color: "text.secondary",
                            fontFamily: "Poppins, Roboto, sans-serif",
                        }}
                    >
                        Email
                    </Typography>
                    <Typography
                        sx={{
                            color: "text.secondary",
                            fontSize: "0.8rem",
                            fontFamily: "Poppins, Roboto, sans-serif",
                        }}
                    >
                        {email}
                    </Typography>
                </Box>

                {/* 4. Credit/Debit Card Form Section */}
                <Paper sx={{ p: 3, borderRadius: 2 }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={0.5}
                            alignItems="center"
                        >
                            <Box
                                component="img"
                                src={VisaCard}
                                borderRadius={0.5}
                                sx={{ height: 35 }}
                            />
                            <Box
                                component="img"
                                src={MastercardCard}
                                borderRadius={0.5}
                                sx={{ height: 35 }}
                            />
                        </Stack>
                    </Box>
                    <CardDetailsForm onUpdate={handleCardUpdate} />
                </Paper>

                {/* 5. Final Pay Button */}
                <CustomButton 
                    text={`Pay $${totalAmount.toFixed(2)}`}
                    height={45}
                    loading={false}
                    onClick={handlePay}
                    sx={{ mt: 3, width: "100%" }}
                    // disabled={!isCardFormValid || !cardData}
                />
            </Paper>
        </Container>
    );
};

export default CheckoutMethod;
