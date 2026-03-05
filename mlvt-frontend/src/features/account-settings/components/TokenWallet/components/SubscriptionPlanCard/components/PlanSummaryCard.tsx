import React from 'react';
import {
    Box,
    Grid,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    useTheme,
    Stack,
    Avatar,
    Link,
    SvgIcon,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export interface PlanSummaryCardProps {
    nextChargeDate: Date;
    nextChargeAmount: number;
    benefits: string[];
    paymentMethod: string;
    paymentLogo?: React.ReactNode;
    onUpdatePaymentClick?: () => void;
}

const PlanSummaryCard: React.FC<PlanSummaryCardProps> = ({
    nextChargeDate,
    nextChargeAmount,
    benefits,
    paymentMethod,
    paymentLogo,
    onUpdatePaymentClick
}) => {
    const theme = useTheme();
    const formattedDate = new Date(nextChargeDate).toLocaleDateString(undefined, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: 2,
                overflow: 'hidden',
                border: `2px solid #FFE1FF`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    backgroundColor: '#FFE1FF',
                    px: 4,
                    py: 6,
                    width: '100%',
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        color: '#A60195',
                        textTransform: 'uppercase',
                        fontFamily: 'Poppins, sans-serif',
                        mb: 1,
                        letterSpacing: 0.5,
                    }}
                >
                    Token Wallet Plan
                </Typography>
                <Typography sx={{
                    fontWeight: 400,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '0.8rem',
                    color: 'black',
                    '&:hover': {
                        textDecoration: 'underline',
                        cursor: 'pointer',
                    }
                }}>
                    Change your plan at any time here
                </Typography>
            </Box>

            <Box
                sx={{
                    mt: 2,
                    backgroundColor: theme.palette.info.main,
                    borderRadius: '0.5rem',
                    color: theme.palette.info.contrastText,
                    display: 'flex',
                    alignItems: 'center',
                    width: '80%',
                    gap: 2,
                    px: 3,
                    py: 1
                }}
            >
                <InfoOutlinedIcon />
                <Typography sx={{ fontWeight: 500, fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem' }}>
                    Your premium plan will be charged on {formattedDate}.
                </Typography>
            </Box>

            <Grid container spacing={8} sx={{ p: 4 }}>
                <Grid item xs={12} md={6}>
                    <List disablePadding sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        {benefits.map((b, i) => (
                            <ListItem key={i} disableGutters sx={{ pl: 0, paddingY: 0.5 }}>
                                <ListItemText
                                    primary={b}
                                    primaryTypographyProps={{ fontWeight: 400, fontSize: '0.9rem', fontFamily: 'Poppins, sans-serif' }}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            mb: 1,
                            letterSpacing: 0.5,
                            fontFamily: 'Poppins, sans-serif',
                        }}
                    >
                        Payment
                    </Typography>
                    <Typography sx={{ mb: 2, fontFamily: 'Poppins, sans-serif' }}>
                        Your next bill is for {nextChargeAmount.toFixed(2)}$ on{' '}
                        {formattedDate}
                    </Typography>

                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}    
                        alignItems={{ xs: 'flex-start', sm: 'center' }}
                        justifyContent="space-between"
                        mt={3}
                        pr={{ xs: 0, sm: 8 }}                        
                        gap={{ xs: 2, sm: 0 }}                       
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            gap={1}
                            sx={{ width: { xs: '100%', sm: 'auto' } }}  
                        >
                            {paymentLogo ?? (
                                <Avatar sx={{ width: { xs: 28, sm: 32 }, height: { xs: 28, sm: 32 } }}>
                                    <SvgIcon fontSize="small" />
                                </Avatar>
                            )}
                            <Typography
                                sx={{
                                    fontFamily: 'Poppins, sans-serif',
                                    fontSize: { xs: '0.85rem', sm: '0.9rem' },
                                    fontWeight: 400,
                                }}
                            >
                                {paymentMethod}
                            </Typography>
                        </Stack>
                        <Link
                            component="button"
                            underline='hover'
                            sx={{
                                fontWeight: 600,
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: { xs: '0.85rem', sm: '0.9rem' },
                                alignSelf: { xs: 'flex-end', sm: 'initial' }, 
                                cursor: 'pointer',
                            }}
                            onClick={onUpdatePaymentClick}
                        >
                            Update
                        </Link>
                    </Stack>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default PlanSummaryCard;
