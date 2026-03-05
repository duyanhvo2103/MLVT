import { Avatar, Box } from '@mui/material'
import React from 'react'

interface SpeakerProfileProps {
    imageUrl: string
    flagUrl: string
    altText: string
    flagAltText: string
}

const SpeakerProfile: React.FC<SpeakerProfileProps> = ({
    imageUrl,
    flagUrl,
    altText,
    flagAltText,
}) => {
    return (
        <Box
            sx={{
                position: 'relative',
                width: { xs: 120, sm: 150 },
                height: { xs: 120, sm: 150 },
                margin: 'auto',
            }}
        >
            <Avatar
                src={imageUrl}
                alt={altText}
                sx={{
                    width: '100%',
                    height: '100%',
                    border: '3px solid rgba(255,255,255,0.1)', // Subtle border
                }}
            />
            <Avatar
                src={flagUrl}
                alt={flagAltText}
                sx={{
                    width: { xs: 40, sm: 50 },
                    height: { xs: 40, sm: 50 },
                    position: 'absolute',
                    bottom: -5, // Slight overlap
                    right: -5, // Slight overlap
                    border: (theme) =>
                        `3px solid ${theme.palette.background.paper}`, // Border matching background
                    boxShadow: '0px 2px 4px rgba(0,0,0,0.5)', // Shadow for depth
                }}
            />
        </Box>
    )
}

export default SpeakerProfile
