import React from 'react';
import { Box, IconButton } from '@mui/material';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'; // For the record-like button

interface AudioWaveformProps {
    barColor?: string;
    buttonColor?: string;
    heights?: number[]; // percentages 0-100
}

const defaultHeights = [
    30, 50, 70, 60, 40, 80, 75, 55, 35, 25, 45, 65, 85, 70, 50, 30, 60, 40, 20, 50,
    70, 60, 40, 80, 75, 55, 35, 25, 45, 65, 20, 15, 10, 12, 8, 10, 15, 18, 10, 5
];

const AudioWaveform: React.FC<AudioWaveformProps> = ({
  barColor = 'warning.main',
  buttonColor = 'error.main',
  heights = defaultHeights,
}) => {
    return (
        <Box
            display="flex"
            alignItems="flex-end"
            justifyContent="space-between"
            p={2}
            bgcolor="rgba(255, 255, 255, 0.05)" // Darker translucent background
            borderRadius={2}
            height={80} // Increased height to better fit the waveform
        >
            <Box display="flex" alignItems="flex-end" height="100%" flexGrow={1} overflow="hidden">
                {heights.map((h, i) => (
                <Box
                    key={i}
                    sx={{
                    width: { xs: 2, sm: 3, md: 4 }, // Responsive bar width
                    height: `${h}%`,
                    bgcolor: barColor,
                    mr: 0.5,
                    borderRadius: '2px',
                    }}
                />
                ))}
            </Box>
            <IconButton size="small" sx={{ color: buttonColor, ml: 1, alignSelf: 'center' }}>
                <CircleOutlinedIcon sx={{ fontSize: { xs: 24, sm: 30 } }} />
            </IconButton>
        </Box>
    );
};

export default AudioWaveform;