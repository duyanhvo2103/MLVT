import React from 'react';
import { Button, ButtonProps } from '@mui/material';

export interface CustomButtonProps extends Omit<ButtonProps, 'onClick' | 'children'> {
    text: string;
    height?: number | string;
    onClick: () => void;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
    text,
    height = 39,
    onClick,
    sx,
    ...rest
}) => (
    <Button
        variant="contained"
        onClick={onClick}
        sx={{
            height,
            borderRadius: 2,
            fontWeight: 600,
            bgcolor: '#B6FFA1',
            color: '#222222',
            fontFamily: 'Poppins, Sora, sans-serif',
            ...sx,
        }}
        {...rest}
    >
        {text}
    </Button>
);
