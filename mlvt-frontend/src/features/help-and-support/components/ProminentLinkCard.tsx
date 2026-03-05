// ProminentLinkCard.tsx (Corrected)

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
    Box,
    Link as MuiLink,
    Paper,
    SvgIcon,
    Typography
} from '@mui/material';
import React from 'react';

// The props interface is correct, you've already added onClick!
interface ProminentLinkCardProps {
    icon: React.ElementType;
    title: string;
    linkText: string;
    href: string;
    onClick: () => void;
}

// We just need to use the onClick prop and remove the href behavior.
const ProminentLinkCard: React.FC<ProminentLinkCardProps> = ({
    icon: IconComponent,
    title,
    linkText,
    onClick, // <-- Make sure to destructure onClick
}) => {
    return (
        <Paper
            onClick={onClick} // <-- 1. Apply the click handler here
            elevation={0}
            sx={{
                p: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #1D1235 0%, #1B1033 100%)',
                boxShadow: '0 0 20px rgba(0,0,0,0.2)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'box-shadow 0.3s, transform 0.2s', // Added transform for hover
                '&:hover': {
                    boxShadow: (theme) => theme.shadows[3],
                    transform: 'translateY(-4px)', // Added hover effect
                },
                cursor: 'pointer',
            }}
        >
            <SvgIcon
                component={IconComponent}
                sx={{ fontSize: 40, color: '#DDDDDD' }}
            />
            <Box>
                <Typography
                    variant="h5"
                    fontWeight="600"
                    sx={{
                        fontFamily: 'Poppins, sans-serif',
                        color: '#DDDDDD',
                    }}
                >
                    {title}
                </Typography>
                {/* 2. Neutralize the MuiLink so it doesn't navigate */}
                <MuiLink
                    component="div" // Render as a non-interactive div
                    underline="none"
                    variant="body2"
                    sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        color: '#DDCCFF',
                        fontFamily: 'Poppins, sans-serif',
                    }}
                >
                    {linkText}
                    <ArrowForwardIosIcon sx={{ fontSize: '0.8rem', ml: 0.5 }} />
                </MuiLink>
            </Box>
        </Paper>
    );
};

export default ProminentLinkCard;