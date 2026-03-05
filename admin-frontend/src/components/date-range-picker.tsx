import { Box } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useState } from 'react'
import CustomDateInput from './custom-date-input'

const DateRangePicker = () => {
    const [fromDate, setFromDate] = useState<Date | null>(null)
    const [toDate, setToDate] = useState<Date | null>(null)

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                <CustomDateInput
                    label="From"
                    value={fromDate}
                    onChange={setFromDate}
                />
                <CustomDateInput
                    label="To"
                    value={toDate}
                    onChange={setToDate}
                />
            </Box>
        </LocalizationProvider>
    )
}

export default DateRangePicker
