import CheckIcon from '@mui/icons-material/Check'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DescriptionIcon from '@mui/icons-material/Description'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import TranslateIcon from '@mui/icons-material/Translate'
import {
    Box,
    Button,
    Divider,
    Grid,
    IconButton,
    Tooltip,
    Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useGetUserDetails } from 'src/hooks/useGetUserDetails'
import HomePage from '../../../layout/HomePage'
import { createPayment, PaymentResponse } from '../apis/tokenPlan.api'
import coinImg from '../assets/token_img.png'
import CheckoutInformation from '../components/CheckoutInformation'
import PaymentStatusChip from '../components/PaymentStatusChip'
import { TokenPlan } from '../types/TokenPlan'

const features = [
    {
        icon: <PlayCircleOutlineIcon fontSize="large" />,
        label: 'Transform videos from the origin',
    },
    { icon: <TranslateIcon fontSize="large" />, label: 'Powerful translation Vietnamese & English' },
    { icon: <DescriptionIcon fontSize="large" />, label: 'Generate text with your audio' },
]
const MembershipCheckoutPage: React.FC = () => {
    const location = useLocation()
    const state = location.state as { plan?: TokenPlan } | undefined
    const plan = state?.plan
    const { data } = useGetUserDetails()
    const userId = data?.user.id

    const [paymentDetails, setPaymentDetails] =
        useState<PaymentResponse | null>(null)
    const [loading, setLoading] = useState(false)
    const [isCopied, setIsCopied] = useState(false)

    useEffect(() => {
        if (!isCopied) return
        const t = setTimeout(() => setIsCopied(false), 2000)
        return () => clearTimeout(t)
    }, [isCopied])

    if (!plan) {
        return <Navigate to="/premium-plan" replace />
    }

    const handleMakePayment = async () => {
        if (!userId) {
            alert('Please log in to make a payment.')
            return
        }
        setLoading(true)
        try {
            const details = await createPayment(userId, plan.option)
            setPaymentDetails(details)
        } catch (err) {
            console.error(err)
            alert('Failed to initiate payment. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleCopy = () => {
        if (!paymentDetails) return
        navigator.clipboard.writeText(paymentDetails.transaction_id)
        setIsCopied(true)
    }

    return (
        <HomePage>
            <Box display="flex" minHeight="100vh">
                <Box width="50%" bgcolor={(t) => t.palette.accent.main} p={10}>
                    <CheckoutInformation plan={plan} />
                </Box>

                {/* right dynamic */}
                <Box
                    width={{ xs: '100%', md: '50%' }}
                    p={{ xs: 4, md: 10 }}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={3}
                >
                    {/* Before payment: show only one button */}
                    {!paymentDetails ? (
                        <Box
                            sx={{
                                backgroundColor: '#FFB8E0',
                                color: 'common.white',
                                p: { xs: 4, md: 6 },
                                borderRadius: 2,
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            {/* Headline */}
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    letterSpacing: 1,
                                    mb: 1,
                                }}
                            >
                                EMPOWER YOUR CONTENT WITH
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 800,
                                    lineHeight: 1.1,
                                    mb: 4,
                                    textTransform: 'uppercase',
                                }}
                            >
                                Tokens for AI-Powered Translations
                            </Typography>

                            <Grid
                                container
                                spacing={4}
                                alignItems="center"
                                padding={0}
                            >
                                {/* Feature list */}
                                <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    sx={{
                                        '&.MuiGrid-item': {
                                            paddingLeft: 0,
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 3,
                                        }}
                                    >
                                        {features.map((f) => (
                                            <Box
                                                key={f.label}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 2,
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        borderRadius: '50%',
                                                        p: 1,
                                                        color: '#E91E63',
                                                        width: 50,
                                                    }}
                                                >
                                                    {f.icon}
                                                </Box>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontSize: '1em',
                                                    }}
                                                >
                                                    {f.label}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Grid>

                                {/* Coin graphic */}
                                <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    sx={{
                                        textAlign: {
                                            xs: 'center',
                                            md: 'right',
                                        },
                                        '&.MuiGrid-item': {
                                            paddingLeft: 0,
                                        },
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={coinImg}
                                        alt="Token coin"
                                        sx={{
                                            width: { xs: 140, md: 270 },
                                            height: 'auto',
                                            borderRadius: 2,
                                            // boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                            transition: 'transform 0.3s',
                                            backgroundPosition: 'center',
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            {/* Call to action */}
                            <Box sx={{ textAlign: 'center', mt: 6 }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={handleMakePayment}
                                    sx={{
                                        px: 6,
                                        py: 1.5,
                                        bgcolor: '#E91E63',
                                        '&:hover': { bgcolor: '#AD1457' },
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                        fontWeight: 700,
                                        fontSize: '1rem',
                                        color: 'white'
                                    }}
                                    disabled={loading}
                                >
                                    Complete Payment Now
                                </Button>
                            </Box>
                        </Box>
                    ) : (
                        <>
                            <Typography
                                variant="h5"
                                fontWeight={600}
                                align="center"
                            >
                                Scan with your Banking App
                            </Typography>

                            <Box
                                component="img"
                                src={paymentDetails.qr_data_url}
                                alt="Payment QR Code"
                                sx={{
                                    width: 280,
                                    height: 280,
                                    border: '1px solid',
                                    borderRadius: 2,
                                    p: 1,
                                }}
                            />

                            {/* Payment details grid */}
                            <Box
                                width="100%"
                                p={3}
                                border="1px solid"
                                borderRadius={2}
                            >
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    fontWeight={600}
                                >
                                    PAYMENT DETAILS
                                </Typography>

                                <Grid container rowSpacing={1.5}>
                                    {/* Amount */}
                                    <Grid item xs={6}>
                                        <Typography color="text.secondary">
                                            Amount
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} textAlign="right">
                                        <Typography fontWeight={500}>
                                            {paymentDetails.vnd_amount.toLocaleString(
                                                'vi-VN',
                                            )}{' '}
                                            VND
                                        </Typography>
                                    </Grid>

                                    {/* Package */}
                                    <Grid item xs={6}>
                                        <Typography color="text.secondary">
                                            Token Package
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} textAlign="right">
                                        <Typography fontWeight={500}>
                                            {paymentDetails.payment_option}
                                        </Typography>
                                    </Grid>

                                    {/* Transaction ID */}
                                    <Grid item xs={6}>
                                        <Typography color="text.secondary">
                                            Transaction ID
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} textAlign="right">
                                        <Box
                                            display="flex"
                                            justifyContent="flex-end"
                                            alignItems="center"
                                        >
                                            <Typography
                                                fontWeight={500}
                                                sx={{
                                                    maxWidth: '180px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                {paymentDetails.transaction_id}
                                            </Typography>
                                            <Tooltip
                                                title={
                                                    isCopied
                                                        ? 'Copied!'
                                                        : 'Copy Transaction ID'
                                                }
                                            >
                                                <IconButton
                                                    onClick={handleCopy}
                                                    disabled={isCopied}
                                                    size="small"
                                                >
                                                    {isCopied ? (
                                                        <CheckIcon
                                                            fontSize="inherit"
                                                            color="success"
                                                        />
                                                    ) : (
                                                        <ContentCopyIcon fontSize="inherit" />
                                                    )}
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </Grid>

                                    {/* Status */}
                                    <Grid item xs={6}>
                                        <Typography color="text.secondary">
                                            Payment Status
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} textAlign="right">
                                        <PaymentStatusChip
                                            status={paymentDetails.status}
                                        />
                                    </Grid>
                                </Grid>

                                <Divider sx={{ my: 3 }} />

                                {/* Total */}
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Typography variant="h6" fontWeight={600}>
                                        TOTAL
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        color="primary"
                                        fontWeight={700}
                                    >
                                        {paymentDetails.vnd_amount.toLocaleString(
                                            'vi-VN',
                                        )}{' '}
                                        VND
                                    </Typography>
                                </Box>
                            </Box>
                        </>
                    )}
                </Box>
            </Box>
        </HomePage>
    )
}

export default MembershipCheckoutPage
