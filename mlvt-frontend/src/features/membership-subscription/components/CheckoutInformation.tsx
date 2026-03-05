import { Box, Container, Divider, Stack, Typography } from '@mui/material'
import MLVTLogo from '../../../assets/mlvt_logo.png'
import { TokenPlan } from '../types/TokenPlan'

interface CheckoutInformationProps {
    plan: TokenPlan
}

const CheckoutInformation: React.FC<CheckoutInformationProps> = ({ plan }) => {
    const formattedAmount = plan.vnd_amount.toLocaleString('en-US')
    const formattedVndTotal = `VND ${formattedAmount}`

    return (
        <Container maxWidth="sm">
            {/* Header Section */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: { xs: 3, sm: 4 },
                }}
            >
                <Typography
                    variant="body1"
                    sx={{
                        fontWeight: 'bold',
                        color: (theme) => theme.palette.primary.main,
                        fontSize: { xs: '1.25rem', sm: '1.5rem' },
                    }}
                >
                    CHECK OUT YOUR PURCHASE
                </Typography>
            </Box>

            {/* Main Price Display Section */}
            {/* Responsive margin-bottom */}
            <Stack spacing={2} sx={{ mb: { xs: 4, sm: 6 } }}>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    fontFamily={'Poppins, Roboto, sans-serif'}
                    fontWeight={500}
                >
                    Start your journey with more tokens
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'left',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                        <Typography
                            component="span"
                            sx={{
                                fontWeight: '600',
                                // Responsive font size for the large token amount
                                fontSize: { xs: '2.5rem', sm: '3rem' },
                                color: '#F564A9',
                            }}
                        >
                            {plan.token_amount}
                            <Typography
                                component="span"
                                sx={{
                                    // Responsive font size for the "tokens" label
                                    fontSize: { xs: '0.9rem', sm: '1rem' },
                                    color: (theme) =>
                                        theme.palette.text.secondary,
                                    fontWeight: 500,
                                    ml: 0.5, // Add a slight margin-left for spacing
                                }}
                            >
                                tokens
                            </Typography>
                        </Typography>
                    </Box>
                </Box>
            </Stack>

            {/* Order Summary Section */}
            {/* Responsive spacing for the stack */}
            <Stack spacing={{ xs: 2, sm: 2.5 }}>
                {/* Premium Price Row */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                            sx={{
                                p: { xs: 0.8, sm: 1 },
                                mr: { xs: 1.5, sm: 2 },
                                bgcolor: '#ede7f6',
                                borderRadius: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Box
                                component="img"
                                src={MLVTLogo}
                                alt="Premium plan mascot"
                                sx={{
                                    width: { xs: 40, sm: 50 },
                                    height: { xs: 40, sm: 50 },
                                    objectFit: 'contain',
                                }}
                            />
                        </Box>
                        <Stack>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 550,
                                }}
                            >
                                Token Price
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                fontFamily={'Poppins, Roboto, sans-serif'}
                                mt={0.5}
                            >
                                {plan.option.charAt(0).toUpperCase() +
                                    plan.option.slice(1)}{' '}
                                Plan
                            </Typography>
                        </Stack>
                    </Box>
                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: 550,
                            overflowWrap: 'revert',
                        }}
                    >
                        {formattedVndTotal}
                    </Typography>
                </Box>

                <Divider />

                {/* Total Row */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            // Use a standard bold weight for consistency
                            fontWeight: '600',
                            color: '#89AC46',
                        }}
                    >
                        TOTAL
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            // Use a matching bold weight for the total amount
                            fontWeight: '600',
                            color: '#89AC46',
                        }}
                    >
                        {formattedVndTotal}
                    </Typography>
                </Box>
            </Stack>
        </Container>
    )
}

export default CheckoutInformation
