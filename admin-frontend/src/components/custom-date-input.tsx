import React, { useState } from 'react';
import { TextField, IconButton, Paper } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import theme from '../theme/theme';


interface CustomDateInputProps {
    label: string;
    value: Date | null;
    onChange: (newValue: Date | null) => void;
}

const CustomDateInput: React.FC<CustomDateInputProps> = ({ label, value, onChange }) => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (newValue: Date | null) => {
        onChange(newValue);
        handleClose();
    };

    return (
        <DatePicker
            disableFuture={true}
            disableHighlightToday={true}
            label={label}
            value={value}
            onChange={handleChange}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            slots={{
                textField: TextField,
                desktopPaper: Paper,
            }}
            slotProps={{
                textField: {
                    variant: 'filled',
                    sx: {
                        width: {
                            xs: '100%',
                            sm: '100px',
                            md: '150px',
                        },
                        backgroundColor: 'rgba(42, 54, 99, 0.5)',
                        borderRadius: '10px',
                        '& .MuiInputBase-input': {
                            paddingX: '0.5em',
                            paddingBottom: '0.4em'

                        },
                        '& .MuiOutlinedInput-root': {
                            fontFamily: theme.typography.body2.fontFamily,
                            fontWeight: '600',
                            color: 'white',
                            '& fieldset': {
                                borderColor: 'transparent',
                            },
                            '&:hover fieldset': {
                                borderColor: 'transparent',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'transparent',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white',
                            fontFamily: theme.typography.body2.fontFamily,
                            fontSize: '0.8em',
                            fontWeight: '600',
                        },
                        '& .MuiFilledInput-root': {
                            backgroundColor: 'rgba(42, 54, 99, 0.5)',
                            borderRadius: '10px',
                            fontSize: '0.75em',
                            color: 'white',
                            padding: '0',
                            paddingLeft: '1em',
                            fontFamily: theme.typography.body2.fontFamily,
                            '&:before': {
                                borderBottom: 'none',
                            },
                            '&:after': {
                                borderBottom: 'none',
                            },
                            '&:hover:not(.Mui-disabled):before': {
                                borderBottom: 'none',
                            },
                            '&:hover:not(.Mui-disabled):after': {
                                borderBottom: 'none',
                            },
                            '&.Mui-focused:before': {
                                borderBottom: 'none',
                            },
                            '&:hover': {
                                backgroundColor: 'rgba(42, 54, 99, 0.5)',
                            },
                        },
                    },
                    InputProps: {
                        endAdornment: (
                            <IconButton onClick={handleOpen}
                                sx={{
                                    '&:focus': {
                                        outline: 'none',
                                    },
                                }}

                            >
                                <CalendarTodayIcon sx={{ color: 'white' }} />
                            </IconButton>
                        ),
                    },
                },

                desktopPaper: {
                    sx: {
                        background: 'linear-gradient(to right, #4b79a1, #283e51)',
                        color: 'white',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        '& .MuiCalendarPicker-root': {
                            backgroundColor: 'linear-gradient(to right, #000428, #004e92)',
                        },
                        '& .MuiPickersDay-root': {
                            '&:hover': {
                                backgroundColor: 'rgba(42, 54, 99, 0.5)',
                            },
                            outline: 'none',
                        },
                        '& .Mui-selected': {
                            backgroundColor: 'rgba(42, 54, 99, 0.5) !important',
                            '&:hover': {
                                backgroundColor: 'rgba(42, 54, 99, 0.5)',
                            },
                            outline: 'none',
                        },
                        '& .MuiTypography-root': {
                            color: 'white',
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '0.8em',
                            fontWeight: '500',
                        },
                        '& .MuiButtonBase-root': {
                            color: 'white',
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '0.8em',
                            fontWeight: '500',
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                            border: 'none',
                        },
                        '& .MuiIconButton-root': {
                            fontSize: '1em',
                        },
                        '& .MuiPickersCalendarHeader-label': {
                            color: 'white',
                            fontFamily: 'Poppins, sans-serif',
                        },
                        '& .MuiDateCalendar-root': {
                            color: 'white',
                            fontFamily: 'Poppins, sans-serif',
                            '& .MuiPickersDay-root': {
                                color: 'white',
                            },
                            '& .MuiPickersYear-root': {
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontFamily: 'Poppins, sans-serif',
                                '&.Mui-selected': {
                                    backgroundColor: 'none',

                                },
                            },
                        },
                        '& .MuiPickersYear-yearButton': {
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '0.9em',
                            fontWeight: '500',
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            outline: 'none',
                        }
                    },
                },
                popper: {
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 10],
                            },
                        },
                    ],
                    sx: {
                        zIndex: 1300,
                    }
                }
            }}
        />
    );
};

export default CustomDateInput;
