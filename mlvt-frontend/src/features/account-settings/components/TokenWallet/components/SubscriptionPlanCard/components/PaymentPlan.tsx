import {
    Avatar,
    Box,
    Card,
    CardContent,
    FormControlLabel,
    Radio,
    RadioGroup,
    Stack,
    Typography,
    useTheme,
} from '@mui/material'
import React, { useState } from 'react'
import CardDetailsForm from '../../../../../../../components/CardDetailForm'
import { CustomButton } from '../../../../../../../components/CustomButton'
import { CardData } from '../../../../../../../types/Payment'
import masterCard from 'src/assets/master_card.jpg'
import momoLogo from 'src/assets/momo_logo.png'
import visaCard from 'src/assets/visa_card.jpg'

type Method = 'momo' | 'card'

const PaymentPlan: React.FC = () => {
    const theme = useTheme()
    const [method, setMethod] = useState<Method>('momo')

    const [cardData, setCardData] = useState<CardData | null>(null)
    const [isCardFormValid, setIsCardFormValid] = useState(false)

    // This single handler receives the complete data object from the child
    const handleCardFormUpdate = (data: CardData, isValid: boolean) => {
        setCardData(data)
        setIsCardFormValid(isValid)
    }

    const handlePayWithCard = () => {
        if (isCardFormValid && cardData) {
            console.log('Submitting card details:', cardData)
            // API call to payment processor would go here
        } else {
            console.error('Card form is not valid!')
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box
                sx={{
                    padding: 3,
                    backgroundColor: theme.palette.tertiary.main,
                    borderRadius: '12px',
                }}
            >
                <RadioGroup
                    value={method}
                    onChange={(e) => {
                        setMethod(e.target.value as Method)
                    }}
                    sx={{ display: 'flex', gap: 2 }}
                >
                    {/* MoMo Wallet Option */}
                    <Card
                        variant="outlined"
                        sx={{
                            position: 'relative',
                            borderColor:
                                method === 'momo'
                                    ? theme.palette.primary.main
                                    : undefined,
                            bgcolor:
                                method === 'momo'
                                    ? theme.palette.action.active
                                    : theme.palette.tertiary.main,
                            borderRadius: '12px',
                        }}
                    >
                        <CardContent
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            <FormControlLabel
                                value="momo"
                                control={<Radio />}
                                label={
                                    <Typography
                                        sx={{
                                            fontSize: '1rem',
                                            fontWeight: 500,
                                            fontFamily: 'Poppins, sans-serif',
                                        }}
                                    >
                                        MoMo Wallet
                                    </Typography>
                                }
                            />
                            <Avatar
                                variant="square"
                                src={momoLogo}
                                alt="MoMo"
                                sx={{ width: 48, height: 48 }}
                            />
                        </CardContent>
                    </Card>
                    <Card
                        variant="outlined"
                        sx={{
                            position: 'relative',
                            borderColor:
                                method === 'card'
                                    ? theme.palette.primary.main
                                    : undefined,
                            bgcolor:
                                method === 'card'
                                    ? theme.palette.action.active
                                    : theme.palette.tertiary.main,
                            borderRadius: '12px',
                        }}
                    >
                        <CardContent
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <FormControlLabel
                                    value="card"
                                    control={<Radio />}
                                    label={
                                        <Typography
                                            sx={{
                                                fontSize: '1rem',
                                                fontWeight: 500,
                                                fontFamily:
                                                    'Poppins, sans-serif',
                                            }}
                                        >
                                            Credit / Debit Card
                                        </Typography>
                                    }
                                />
                                <Stack direction="row" spacing={0.5}>
                                    <Avatar
                                        src={visaCard}
                                        alt="Visa"
                                        sx={{
                                            width: 45,
                                            height: 30,
                                            borderRadius: '8px',
                                        }}
                                    />
                                    <Avatar
                                        src={masterCard}
                                        alt="Visa"
                                        sx={{
                                            width: 45,
                                            height: 30,
                                            borderRadius: '8px',
                                        }}
                                    />
                                </Stack>
                            </Box>
                            {method === 'card' && (
                                <CardDetailsForm
                                    onUpdate={handleCardFormUpdate}
                                />
                            )}
                        </CardContent>
                    </Card>
                </RadioGroup>
            </Box>

            {/* Action Button */}
            <Box sx={{ textAlign: 'center', mt: 4 }}>
                {method === 'momo' ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            gap: 2,
                            padding: 3,
                            backgroundColor: theme.palette.tertiary.main,
                            borderRadius: '12px',
                        }}
                    >
                        <Avatar
                            variant="square"
                            src={momoLogo}
                            alt="MoMo"
                            sx={{ width: 60, height: 60 }}
                        />
                        <Typography
                            sx={{
                                fontSize: '0.9rem',
                                fontWeight: 500,
                                fontFamily: 'Poppins, sans-serif',
                                mb: 1,
                            }}
                        >
                            You will be redirected to MoMo to complete your
                            purchase.
                        </Typography>
                        <CustomButton
                            text="Continue to MoMo"
                            height={50}
                            loading={false}
                            loadingText="Redirecting to MoMo…"
                            onClick={() => {
                                /* redirect to MoMo */
                            }}
                        />
                    </Box>
                ) : (
                    <CustomButton
                        text="Pay with Card"
                        height={50}
                        loading={false}
                        loadingText="Processing payment…"
                        onClick={() => {
                            handlePayWithCard()
                        }}
                    />
                )}
            </Box>
        </Box>
    )
}

export default PaymentPlan
