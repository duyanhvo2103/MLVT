import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Grid, TextField, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useGetUserDetails } from 'src/hooks/useGetUserDetails'
import { UseRedeemCode } from '../../../../../api/voucher.api'
import { CustomButton } from '../../../../../components/CustomButton'
import UploadNotification from '../../../../../components/UploadNotification'
import { useAuth } from '../../../../../contexts/AuthContext'

interface RedeemCodeProps {
    handleChangeView: (view: string) => void
}

interface UploadNoti {
    isOpen: boolean
    status: 'fail' | 'success'
    content: string
}

export const RedeemCode: React.FC<RedeemCodeProps> = ({ handleChangeView }) => {
    const theme = useTheme()
    const [redeemCode, setRedeemCode] = useState('')
    const [loading, setLoading] = useState(false)
    const { data: userDetails } = useGetUserDetails()
    const userId = userDetails?.user.id.toString() || ''
    const { AddRemainingToken } = useAuth()
    const [uploadNoti, setUploadNoti] = useState<UploadNoti>({
        isOpen: false,
        status: 'success',
        content: '',
    })
    useEffect(() => {
        console.log('User id: ', userId)
    })

    const handleSubmit = async () => {
        if (!redeemCode.trim() || userId === null) return
        try {
            setLoading(true)

            const aditionalToken = await UseRedeemCode(
                parseInt(userId),
                redeemCode,
            )
            AddRemainingToken(aditionalToken)
            setUploadNoti((prevData) => ({
                ...prevData,
                status: 'success',
                content: 'Redeem code has been used succesfully',
            }))
        } catch (error) {
            setUploadNoti((prevData) => ({
                ...prevData,
                status: 'fail',
                content: 'Invalid redeem code',
            }))
        } finally {
            setLoading(false)
            setUploadNoti((prevData) => ({ ...prevData, isOpen: true }))
        }
    }

    const handleCloseNotiPopup = () => {
        setUploadNoti((prevData) => ({ ...prevData, isOpen: false }))
    }

    if (uploadNoti['isOpen']) {
        return (
            <UploadNotification
                isOpen={uploadNoti['isOpen']}
                onClose={handleCloseNotiPopup}
                status={uploadNoti['status']}
                content={uploadNoti['content']}
                okButtonVisible={true}
                navigateStorage={false}
            />
        )
    }

    return (
        <Box p={4}>
            <Typography
                sx={{
                    mb: 1,
                    fontWeight: 600,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '2rem',
                    color: theme.palette.primary.main,
                }}
            >
                Redeem Code
            </Typography>
            <Typography
                sx={{
                    mb: 3,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '0.9rem',
                    fontWeight: 400,
                    color: theme.palette.text.secondary,
                }}
            >
                Enter redeem code to receive token
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <Box
                        sx={{
                            marginTop: '2rem',
                            backgroundColor: theme.palette.tertiary.main,
                            padding: 3,
                            borderRadius: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '1rem',
                                color: theme.palette.text.primary,
                                fontWeight: 450,
                                fontFamily: 'Poppins, sans-serif',
                            }}
                        >
                            Enter redeem code here
                        </Typography>
                        <TextField
                            variant="outlined"
                            placeholder="Enter code"
                            value={redeemCode}
                            onChange={(e) => setRedeemCode(e.target.value)}
                            fullWidth
                            sx={{
                                '& input::placeholder': {
                                    fontFamily: 'Poppins, sans-serif',
                                    fontSize: '1rem',
                                    color: theme.palette.text.secondary,
                                },
                                marginBottom: '1rem',
                            }}
                            inputProps={{
                                style: {
                                    textTransform: 'uppercase',
                                    fontFamily: 'Poppins, sans-serif',
                                },
                            }}
                        />
                        <CustomButton
                            text="Redeem Code"
                            onClick={handleSubmit}
                            loading={loading}
                            sx={{
                                width: '25%',
                                mx: 'auto',
                                fontSize: '0.9rem',
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
            <Typography
                onClick={() => handleChangeView('subscription')}
                sx={{
                    marginTop: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontWeight: '500',
                    mb: 2,
                    fontFamily: 'Poppins, sans-serif',
                    '&:hover': {
                        textDecoration: 'underline',
                        color: theme.palette.primary.main,
                    },
                }}
            >
                <ArrowBackIcon sx={{ mr: 1, fontSize: '1.1rem' }} />
                Back
            </Typography>
        </Box>
    )
}
