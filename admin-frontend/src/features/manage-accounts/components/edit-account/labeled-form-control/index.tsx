import {
    Box,
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography,
} from '@mui/material'
import React from 'react'

interface LabeledFormControlProps {
    label: string
    name: string
    value: string
    options: string[]
    onChange: (e: SelectChangeEvent<string>) => void
}

const LabeledFormControl: React.FC<LabeledFormControlProps> = ({
    label,
    name,
    value,
    options,
    onChange,
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 0.5,
            }}
        >
            <Typography
                sx={{
                    minWidth: 120,
                    fontWeight: 500,
                    fontFamily: 'Poppins, Sora',
                    color: 'white',
                    fontSize: '0.875rem',
                }}
            >
                {label}
            </Typography>
            <FormControl fullWidth>
                <Select
                    name={name}
                    value={value}
                    onChange={onChange}
                    size="small"
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                bgcolor: '#27548A',
                                borderRadius: 2,
                                mt: 0.5,
                                boxShadow: 4,
                                '& .MuiMenuItem-root': {
                                    fontFamily: 'Sora, Poppins, sans-serif',
                                    fontSize: '0.8em',
                                    color: '#F3F8FF',
                                    py: 1.2,
                                    '&:hover': {
                                        bgcolor: 'rgba(255,255,255,0.08)',
                                    },
                                    '&.Mui-selected': {
                                        fontWeight: 500,
                                        bgcolor: 'rgba(255,255,255,0.14)',
                                        '&:hover': {
                                            bgcolor: 'rgba(255,255,255,0.18)',
                                        },
                                    },
                                },
                            },
                        },
                        MenuListProps: { sx: { p: 0 } },
                    }}
                    sx={{
                        bgcolor: '#27548A',
                        height: 39,
                        borderRadius: 2,
                        color: 'white',
                        fontWeight: 500,
                        fontFamily: 'Sora, Poppins, sans-serif',
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                        '& .MuiSelect-select': {
                            color: 'white',
                            p: '8px 14px',
                            fontSize: '0.875rem',
                        },
                        '& .MuiSvgIcon-root': { color: 'white' },
                    }}
                >
                    {options.map((opt) => (
                        <MenuItem key={opt} value={opt}>
                            {opt}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}

export default LabeledFormControl
