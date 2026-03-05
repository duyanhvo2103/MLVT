// CalendarPicker.tsx
import React, { useState } from 'react';
import { Box, Button, Popover } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { format } from 'date-fns';
import { DateCalendar, LocalizationProvider, YearCalendar } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import CustomPickersDay from './custom-pickers-date';

interface CalendarPickerProps {
    filter: 'By Day' | 'By Week' | 'By Year';
    onDateChange?: (date: Date | null) => void;
}

export function CalendarPicker({ filter, onDateChange }: CalendarPickerProps) {
    const today = format(new Date(), 'yyyy-MM-dd');
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(today));
    const [hoveredDay, setHoveredDay] = useState<Date | null>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setHoveredDay(null);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDateChange = (newDate: Date | null) => {
        setSelectedDate(newDate);
        if (onDateChange) {
            onDateChange(newDate);
        }
        handleClose();
    };

    const getButtonLabel = () => {
        if (!selectedDate) return 'Select Date';
        if (filter === 'By Day') {
            return format(selectedDate, 'dd MMM yyyy');
        } else if (filter === 'By Week') {
            return format(selectedDate, 'dd MMM yyyy');
        } else if (filter === 'By Year') {
            return format(selectedDate, 'yyyy');
        }
        return 'Select Date';
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            {/* Button to show the selected date (or a placeholder) */}
            <Button
                variant="contained"
                onClick={handleClick}
                endIcon={<ArrowDropDownIcon />}
                sx={{
                    backgroundColor: 'rgba(42, 54, 99, 0.5)',
                    borderRadius: '10px',
                    padding: '0.3em 1em',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '0.9em',
                    textTransform: 'none',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: 'rgba(42, 54, 99, 0.5)',
                    },
                    '&:active': {
                        backgroundColor: 'rgba(42, 54, 99, 0.5)',
                    },
                    '&:focus': {
                        backgroundColor: 'rgba(42, 54, 99, 0.5)',
                        outline: 'none',
                    },
                }}
            >
                {getButtonLabel()}
            </Button>

            {/* Popover containing the appropriate Date Picker */}
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                sx={{
                    '& .MuiPopover-paper': {
                        backgroundColor: 'none',
                        borderRadius: '10px',
                        padding: '0',
                        marginTop: '0.5em',
                    },
                    '& .MuiBox-root': {
                        borderRadius: '10px',
                        padding: '0em',
                    },
                }}
            >
                <Box p={2}>
                    {filter === 'By Day' && (
                        <DateCalendar
                            value={selectedDate}
                            onChange={handleDateChange}
                            disableFuture={true}
                            disableHighlightToday={true}
                            sx={{
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
                                },
                            }}
                        />
                    )}

                    {filter === 'By Week' && (
                        <DateCalendar
                            showDaysOutsideCurrentMonth={true}
                            disableHighlightToday={true}
                            value={selectedDate}
                            onChange={handleDateChange}
                            slots={{
                                day: (slotProps) => (
                                    <CustomPickersDay {...slotProps} selectedDate={selectedDate} />
                                ),
                            }}
                            slotProps={{
                                day: (ownerState) =>
                                    ({
                                        selectedDay: selectedDate,
                                        hoveredDay,
                                        onPointerEnter: () => setHoveredDay(ownerState.day),
                                        onPointerLeave: () => setHoveredDay(null),
                                    }) as any,
                            }}
                            sx={{
                                background: 'linear-gradient(to right, #4b79a1, #283e51)',
                                '& .Mui-selected': {
                                    color: 'yellow !important',
                                    outline: 'none',
                                },
                                '& .MuiDayCalendar-weekDayLabel': {
                                    color: 'white',
                                    fontFamily: 'Poppins, sans-serif',
                                    fontSize: '0.8em',
                                    fontWeight: '500',
                                    margin: 0,
                                    padding: 0,
                                    width: '36px',
                                    height: '36px',
                                },
                                '& .MuiPickersCalendarHeader-label': {
                                    color: 'white',
                                    fontFamily: 'Poppins, sans-serif',
                                },
                                '& .MuiButtonBase-root': {
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#3D90D7',
                                    },
                                    border: 'none',
                                },
                                '& .MuiIconButton-root': {
                                    fontSize: '1em',
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
                                },
                                '& .MuiPickersDay-dayOutsideMonth': {
                                    color: 'rgba(255, 255, 255, 0.5)',
                                    fontFamily: 'Poppins, sans-serif',
                                },
                            }}
                        />
                    )}

                    {filter === 'By Year' && (
                        <YearCalendar
                            value={selectedDate}
                            onChange={handleDateChange}
                            disableFuture={true}
                            disableHighlightToday={true}
                            sx={{
                                background: 'linear-gradient(to right, #4b79a1, #283e51)',
                                color: 'white',
                                borderRadius: '10px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                '& .MuiYearCalendar-root': {
                                    fontFamily: 'Poppins, sans-serif',
                                    fontSize: '0.9em',
                                    fontWeight: '700',
                                },
                                '& .MuiPickersYear-yearButton': {
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: 'white',
                                    fontFamily: 'Poppins, sans-serif',
                                    fontSize: '0.9em',
                                    fontWeight: '500',
                                    '&.Mui-selected': {
                                        fontWeight: '600',
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                        outline: 'none',
                                    },
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                },
                            }}
                        />
                    )}
                </Box>
            </Popover>
        </LocalizationProvider>
    );
}
