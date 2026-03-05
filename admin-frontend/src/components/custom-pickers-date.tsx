import React from 'react';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import { startOfWeek, endOfWeek } from 'date-fns';

interface CustomPickersDayProps extends PickersDayProps<Date> {
  selectedDate: Date | null;
  hoveredDay?: Date | null; // Optional prop
}

const CustomPickersDay: React.FC<CustomPickersDayProps> = (props) => {
  const { day, selectedDate, hoveredDay, ...other } = props;

  const isDayInWeek = (date: Date | null | undefined, targetDay: Date) => {
    if (!date) return false;
    const start = startOfWeek(date, { weekStartsOn: 0 });
    const end = endOfWeek(date, { weekStartsOn: 0 });
    return targetDay >= start && targetDay <= end;
  };

  const isWithinSelectedWeek = isDayInWeek(selectedDate, day);
  const isHovered = isDayInWeek(hoveredDay, day);

  const weekHighlightStyles = {
    borderRadius: 0,
    '&:not(:last-of-type)': {
      borderRight: 'none',
    },
    '&:first-of-type': {
      borderTopLeftRadius: '50%',
      borderBottomLeftRadius: '50%',
    },
    '&:last-of-type': {
      borderTopRightRadius: '50%',
      borderBottomRightRadius: '50%',
      borderRight: '1px solid rgba(0, 0, 0, 0.23)',
    },
  };

  const baseStyles = {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '0.9em',
    fontWeight: isWithinSelectedWeek ? 600 : 400,
    margin: 0,
    padding: 0,
    minWidth: '36px',
    width: '36px',
    height: '36px',
  };

  // Selected week styles
  const selectedWeekStyles = {
    backgroundColor: 'rgba(42, 54, 99, 0.5)',
    color: '#FFD63A',
    '&:hover, &:focus': {
      backgroundColor: 'rgba(42, 54, 99, 0.7)',
    },
    '&.Mui-selected': {
      backgroundColor: 'rgba(42, 54, 99, 0.5)',
      color: '#FFD63A',
    },
  };

  // Hovered week styles
  const hoveredWeekStyles = {
    backgroundColor: '#3D90D7',
    color: '#FFD63A',
  };

  return (
    <PickersDay
      {...other}
      day={day}
      sx={{
        ...baseStyles,
        ...(isWithinSelectedWeek && {
          ...weekHighlightStyles,
          ...selectedWeekStyles,
        }),
        ...(isHovered && !isWithinSelectedWeek && {
          ...weekHighlightStyles,
          ...hoveredWeekStyles,
        }),
      }}
    />
  );
};

export default CustomPickersDay;