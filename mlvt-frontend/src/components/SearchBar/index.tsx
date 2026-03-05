import SearchIcon from '@mui/icons-material/Search'
import { Box, Input } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React, { ChangeEvent } from 'react'

type SearchBarProps = {
    placeholder: string
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    searchBarWidth: string | number
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

const SearchBar: React.FC<SearchBarProps> = ({
    placeholder,
    onChange,
    searchBarWidth,
    onKeyDown,
}) => {
    const theme = useTheme()
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: theme.palette.tertiary.main,
                width: '100%',
                height: '2.2rem',
                borderRadius: '0.7rem',
                padding: '0.2rem 0.5rem',
                gap: '0.5rem',
            }}
        >
            <SearchIcon
                sx={{
                    fontSize: '1.6rem',
                    color: theme.palette.primary.main,
                }}
            />
            <Input
                placeholder={placeholder}
                onChange={onChange}
                onKeyDown={onKeyDown}
                sx={{
                    width: searchBarWidth,
                    fontSize: '0.9rem',
                    fontFamily: 'Poppins, sans-serif',
                }}
                disableUnderline
            />
        </Box>
    )
}

export default SearchBar
