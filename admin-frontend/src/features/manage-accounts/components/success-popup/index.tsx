import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Box, Modal, Typography } from '@mui/material'
import React from 'react'
import { useTheme } from '../../../../theme'

interface SuccessPopupProps {
    open: boolean
    onClose: () => void
    message: string
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({
    open,
    onClose,
    message,
}) => {
    const theme = useTheme()

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="success-popup-title"
            aria-describedby="success-popup-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: 4,
                }}
            >
                <CheckCircleIcon
                    sx={{
                        fontSize: 100,
                        color: theme.status.complete.fontColor,
                        alignSelf: 'center',
                    }}
                />

                <Typography
                    sx={{
                        fontFamily: 'Poppins, Sora, sans-serif',
                        fontWeight: 600,
                        fontSize: '1.5rem',
                        marginTop: 3,
                        color: theme.status.complete.fontColor,
                        textAlign: 'center',
                    }}
                >
                    {message}
                </Typography>
            </Box>
        </Modal>
    )
}

export default SuccessPopup
