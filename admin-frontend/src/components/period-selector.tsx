import React, { useState } from 'react';
import {
    Button,
    Menu,
    MenuItem,
} from '@mui/material';

interface PeriodSelectorProps {
    onFilterSelect: (filter: string) => void;
}

function PeriodSelector({ onFilterSelect }: PeriodSelectorProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedFilter, setSelectedFilter] = useState<string>('By day');

    const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleFilterSelection = (filter: string) => {
        setSelectedFilter(filter);
        onFilterSelect(filter);
        handleMenuClose();
    };

    return (
        <>
            <Button
                variant="contained"
                onClick={handleButtonClick}
                disableRipple
                sx={{
                    backgroundColor: 'rgba(42, 54, 99, 0.5)',
                    borderRadius: '10px',
                    padding: '0.3em 1em',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '0.9em',
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: 'rgba(42, 54, 99, 0.5)',
                        border: 'none',
                    },
                    '&:active': {
                        backgroundColor: 'rgba(42, 54, 99, 0.5)',
                        border: 'none',
                    },
                    '&:focus': {
                        backgroundColor: 'rgba(42, 54, 99, 0.5)',
                        border: 'none',
                        outline: 'none',
                    },
                }}
            >
                {selectedFilter}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                slotProps={{
                    paper: {
                        sx: {
                            mt: 1,
                            backgroundColor: '#232D4D',
                            borderRadius: '10px',
                            color: 'white',
                            '& .MuiMenuItem-root': {
                                fontSize: '0.8rem',
                                fontFamily: 'Poppins, sans-serif',
                            },
                        },
                    },
                }}
            >
                <MenuItem onClick={() => handleFilterSelection('By Day')}>
                    By Day
                </MenuItem>
                <MenuItem onClick={() => handleFilterSelection('By Week')}>
                    By Week
                </MenuItem>
                <MenuItem onClick={() => handleFilterSelection('By Year')}>
                    By Year
                </MenuItem>
            </Menu>
        </>
    );
}


export default PeriodSelector;