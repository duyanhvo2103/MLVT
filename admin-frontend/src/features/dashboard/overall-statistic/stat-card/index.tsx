import React from 'react';
import { Box, Typography } from '@mui/material';


interface StatCardProps {
    icon: React.ReactElement;
    title: string;
    value: string | number;
    percentage?: string;
    description?: string;
    isPositive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, percentage, description, isPositive }) => {
    return (
        <Box
            sx={{
                backgroundColor: '#2c3e50',
                borderRadius: '10px',
                padding: '0.8em',
                paddingX: '1em',
                display: 'flex',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1.5em' }}>
                {icon}
                <Box>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: '600', fontFamily: 'Poppins, sans-serif', fontSize: '1.2em' }}>
                        {title}
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#FFD63A', fontWeight: 'bold', fontFamily: 'Poppins, sans-serif', fontSize: '1.5em' }}>
                        {value}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '0.9em',
                        }}
                    >
                        <Box
                            component="span"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5em', 
                            }}
                        >
                            <span
                                style={{
                                    color: isPositive ? '#90C67C' : '#FF5656',
                                    fontWeight: 'bold',
                                    fontFamily: 'Poppins, sans-serif',
                                }}
                            >
                                {percentage}
                            </span>
                            <span
                                style={{
                                    color: '#BDC3C7',
                                    fontFamily: 'Poppins, sans-serif',
                                    fontSize: '0.8em',
                                    fontWeight: '700',
                                }}
                            >
                                {description}
                            </span>
                        </Box>
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default StatCard;