import React from 'react';
import { Button, ButtonProps, CircularProgress, Box } from '@mui/material';

export interface CustomButtonProps
    extends Omit<ButtonProps, 'children' | 'onClick'> {
    text: string;
    height?: number | string;
    loading?: boolean;
    loadingText?: string;
    onClick: () => void;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
    text,
    height = 39,
    loading = false,
    loadingText = 'Submitting…',
    onClick,
    sx,
    disabled,         
    ...rest
}) => (
    <Button
        variant="contained"
        onClick={onClick}
        disabled={loading || disabled}   
        sx={{
            height,
            borderRadius: 1,
            fontWeight: 550,
            bgcolor: (theme) => theme.palette.primary.main,
            color: (theme) => theme.palette.background.default,
            fontFamily: 'Poppins, Sora, sans-serif',
            ...sx,
        }}
        {...rest}
    >
        {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={18} color="inherit" />
                {loadingText}
            </Box>
        ) : (
            text
        )}
    </Button>
);
