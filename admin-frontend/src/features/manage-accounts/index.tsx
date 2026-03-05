import {
    Box,
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { getAllUser } from '../../api/user.api'
import { CustomButton } from '../../components/custom-button'
import { useTheme } from '../../theme'
import { User } from '../../types/user'
import EditAccount from './components/edit-account'
import ManageAccountsTable from './components/manage-accounts-table'

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

const FilterSelect = ({
    label,
    name,
    value,
    onChange,
    options,
    theme,
}: {
    label: string
    name: string
    value: string
    onChange: (event: SelectChangeEvent<string>) => void
    options: { value: string; label: string }[]
    theme: any
}) => (
    <FormControl sx={{ flex: 1 }}>
        <Typography
            sx={{
                mb: 1,
                fontFamily: 'Poppins, Sora, sans-serif',
                fontWeight: '400',
                fontSize: '0.8em',
                color: theme.fontColor.greyWhite,
            }}
        >
            {label}
        </Typography>
        <Select
            name={name}
            value={value}
            onChange={onChange}
            fullWidth
            variant="outlined"
            MenuProps={{
                PaperProps: {
                    sx: {
                        bgcolor: '#232D4D',
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
                bgcolor: theme.background.searchBar,
                height: 39,
                borderRadius: 2,
                color: theme.fontColor.greyWhite,
                fontFamily: 'Sora, Poppins, sans-serif',
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                },
                '& .MuiSelect-select': {
                    color: theme.fontColor.greyWhite,
                    p: '8px 14px',
                    fontSize: '0.875rem',
                },
                '& .MuiSvgIcon-root': { color: theme.fontColor.greyWhite },
            }}
        >
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
)

const ManageAccount = () => {
    const theme = useTheme()
    const [users, setUsers] = useState<User[]>([])
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
    const [tempFilters, setTempFilters] = useState({
        search: '',
        role: 'All',
        status: 'All',
    })
    const [filters, setFilters] = useState({
        search: '',
        role: 'All',
        status: 'All',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true)
            try {
                const response = await getAllUser()
                console.log(response)
                setUsers(
                    response.map((user) => ({
                        ...user,
                        status: user.status.toUpperCase(),
                        role: capitalizeFirstLetter(user.role),
                    })),
                )
                console.log('ALL USERS', response)
            } catch (error) {
                setError('Failed to fetch users')
                console.error(error)
            }
            setLoading(false)
        }

        fetchUsers()
    }, [])

    const handleTempFilterChange = (
        event:
            | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            | SelectChangeEvent<string>,
    ) => {
        const { name, value } = event.target
        setTempFilters((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const applyFilters = () => {
        setFilters(tempFilters)
    }

    const filteredData = users.filter((user) => {
        const search = filters.search.toLowerCase()
        const searchMatch =
            user.username.toLowerCase().includes(search) ||
            user.role.toLowerCase().includes(search) ||
            user.status.toLowerCase().includes(search)

        const roleMatch = filters.role === 'All' || user.role === filters.role
        const statusMatch =
            filters.status === 'All' ||
            user.status === filters.status.toUpperCase()

        return searchMatch && roleMatch && statusMatch
    })

    if (selectedUserId !== null) {
        return (
            <EditAccount
                userId={selectedUserId}
                onBack={() => setSelectedUserId(null)}
            />
        )
    }

    if (loading) return <Box>Loading...</Box>
    if (error) return <Box>Error: {error}</Box>

    return (
        <Box sx={{ backgroundColor: 'transparent', border: 'none' }}>
            <Box
                sx={{
                    marginBottom: 2,
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'flex-end',
                    gap: 2,
                    flexWrap: 'wrap',
                    px: 3,
                    py: 1,
                }}
            >
                <Box width={{ xs: '100%', sm: '100%', md: '50%' }}>
                    <Typography
                        sx={{
                            mb: 1,
                            fontFamily: 'Poppins, Sora, sans-serif',
                            fontWeight: '400',
                            fontSize: '0.8em',
                            color: theme.fontColor.greyWhite,
                        }}
                    >
                        What are you looking for?
                    </Typography>
                    <TextField
                        name="search"
                        value={tempFilters.search}
                        onChange={handleTempFilterChange}
                        fullWidth
                        placeholder="Search for users, admins or by status"
                        slotProps={{
                            input: {
                                sx: {
                                    color: '#fff',
                                    '&::placeholder': {
                                        color: theme.fontColor.greyWhite,
                                    },
                                },
                            },
                        }}
                        sx={{
                            height: '39px',
                            background: theme.background.searchBar,
                            borderRadius: 2,
                            color: theme.fontColor.greyWhite,
                            '& .MuiInputBase-input': {
                                fontFamily: 'Poppins, Sora, sans-serif',
                                color: theme.fontColor.greyWhite,
                                padding: '8px 14px',
                                fontSize: '0.75em',
                                height: '39px',
                                boxSizing: 'border-box',
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    border: 'none',
                                },
                            },
                        }}
                    />
                </Box>

                <FilterSelect
                    label="Role"
                    name="role"
                    value={tempFilters.role}
                    onChange={handleTempFilterChange}
                    options={[
                        { value: 'All', label: 'All' },
                        { value: 'User', label: 'User' },
                        { value: 'Admin', label: 'Admin' },
                    ]}
                    theme={theme}
                />

                <FilterSelect
                    label="Status"
                    name="status"
                    value={tempFilters.status}
                    onChange={handleTempFilterChange}
                    options={[
                        { value: 'All', label: 'All' },
                        { value: 'ACTIVE', label: 'Active' },
                        { value: 'DELETED', label: 'Deleted' },
                        { value: 'SUSPENDED', label: 'Suspended' },
                    ]}
                    theme={theme}
                />
                <CustomButton
                    text="SEARCH"
                    height={39}
                    onClick={applyFilters}
                />
            </Box>
            <ManageAccountsTable
                users={filteredData}
                onEdit={(id: number) => setSelectedUserId(id)}
            />
        </Box>
    )
}

export default ManageAccount
