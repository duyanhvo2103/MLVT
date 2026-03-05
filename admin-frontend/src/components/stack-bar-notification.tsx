import React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface SnackbarNotificationProps {
    open: boolean;
    handleClose: () => void;
    message: string;
}

const SnackbarNotification: React.FC<SnackbarNotificationProps> = ({ open, handleClose, message }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SnackbarNotification;
