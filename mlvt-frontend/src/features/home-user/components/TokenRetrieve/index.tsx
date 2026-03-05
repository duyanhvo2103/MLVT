import LinearScaleOutlinedIcon from '@mui/icons-material/LinearScaleOutlined'
import TokenIcon from '@mui/icons-material/Token'
import {
    Alert,
    AlertProps,
    Box,
    Button,
    Snackbar,
    Typography,
} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CustomButton } from 'src/components/CustomButton'
import { useAuth } from 'src/contexts/AuthContext'
import { getWalletBalance } from 'src/features/account-settings/apis/wallet.api'
import { useGetUserDetails } from 'src/hooks/useGetUserDetails'
import { getDailyToken } from '../../apis/get-daily-token.api'
import PipelineIcon from '../../assets/pipeline-icon.png'

interface SnackbarState {
    open: boolean
    message: string
    severity: AlertProps['severity']
}

const TokenRetrieve = () => {
    const navigate = useNavigate()

    const { remainingToken, SetRemainingToken } = useAuth()
    const { data: userDetails } = useGetUserDetails()
    const userId = userDetails?.user.id.toString() || ''
    const [loading, setLoading] = useState(false)
    const [fetchError, setFetchError] = useState<string | null>(null)

    useEffect(() => {
        if (!userId) return
        const fetchToken = async () => {
            try {
                setFetchError(null)
                const walletResponse = await getWalletBalance(userId)
                SetRemainingToken(walletResponse)
            } catch (error) {
                console.error('Error fetching wallet balance:', error)
                setFetchError('Could not load balance.')
            }
        }
        fetchToken()
    }, [userId, SetRemainingToken])

    const [snackbar, setSnackbar] = useState<SnackbarState>({
        open: false,
        message: '',
        severity: 'success',
    })
    const handleRetrieveToken = async () => {
        if (!userId) return
        setLoading(true)
        try {
            const response = await getDailyToken(parseInt(userId))
            if (response) {
                setSnackbar({
                    open: true,
                    message: 'Token retrieved successfully!',
                    severity: 'success',
                })
                const walletResponse = await getWalletBalance(userId)
                SetRemainingToken(walletResponse)
            }
        } catch (error) {
            console.error('Error retrieving token:', error)
            setSnackbar({
                open: true,
                message: 'Failed to retrieve token. Please try again later.',
                severity: 'error',
            })
        } finally {
            setLoading(false)
        }
    }
    const handleCloseSnackbar = useCallback(() => {
        setSnackbar((prev) => ({ ...prev, open: false }))
    }, [])
    return (
        <Box
            sx={{
                mt: 4,
                display: 'flex',
                justifyContent: 'center',
                paddingY: 2,
                paddingX: 3,
                gap: 2,
            }}
        >
            <Box
                padding={2}
                bgcolor="primary.main"
                gap={3}
                borderRadius={'10px'}
                display="flex"
                flexDirection="column"
                alignItems="center"
                paddingX={5}
            >
                <Box
                    gap={1}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            lineHeight: 1.2,
                            color: 'primary.contrastText',
                        }}
                    >
                        {fetchError
                            ? 'Unavailable'
                            : `${remainingToken} Tokens`}
                    </Typography>
                    <Typography
                        color="primary.contrastText"
                        sx={{ opacity: 0.8, lineHeight: 1, fontSize: '0.7rem' }}
                    >
                        Get your free daily token here
                    </Typography>
                </Box>

                <CustomButton
                    text="Retrieve Token"
                    loading={loading}
                    onClick={handleRetrieveToken}
                    sx={{
                        bgcolor: (theme) => theme.palette.tertiary.main,
                        color: 'text.primary',
                    }}
                    startIcon={
                        <TokenIcon
                            sx={{
                                fontSize: '1.5rem',
                                color: 'text.primary',
                            }}
                        />
                    }
                />
            </Box>
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: '10px',
                    backgroundColor: (theme) => theme.palette.tertiary.main,
                    paddingY: 1,
                }}
            >
                <img
                    src={PipelineIcon}
                    alt="Pipeline Icon"
                    style={{ width: '200px', height: '110px' }}
                />
                <Box sx={{ flex: 1, textAlign: 'center' }}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        paddingX={5}
                        sx={{
                            mt: 2,
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                        }}
                    >
                        Dive into our video pipeline—generate your script,
                        translate it instantly, and sync the lips to create
                        amazing content.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/project-pipeline')}
                        endIcon={
                            <LinearScaleOutlinedIcon
                                sx={{
                                    fontSize: '1.5rem !important',
                                    color: 'secondary.main',
                                }}
                            />
                        }
                        sx={{
                            mt: 2,
                            width: { xs: '90%', sm: '80%', md: '60%' },
                            padding: '10px 20px',
                            fontWeight: '600',
                            fontSize: '1rem',
                        }}
                    >
                        EXPLORE THE PIPELINE
                    </Button>
                </Box>
            </Box>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000} // Disappears after 6 seconds
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default TokenRetrieve
