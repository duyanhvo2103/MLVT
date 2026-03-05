import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import { Avatar, Badge, Box, IconButton, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React, { useState } from 'react'
import { useGetUserDetails } from 'src/hooks/useGetUserDetails'
import CustomLoadingDot from '../../../CustomLoadingDot'
import MenuDropdown from './MenuDropdown'

interface UserMenuProps {
    first_name: string
    last_name: string
    status?: boolean
    avatarSrc: string
    notifications: number
}

const UserMenu: React.FC<UserMenuProps> = ({
    first_name,
    last_name,
    status,
    avatarSrc,
    notifications,
}) => {
    const theme = useTheme()

    const { data: userDetails } = useGetUserDetails()
    const [anchorDropdown, setAnchorDropdown] = useState<null | HTMLElement>(
        null,
    )

    const handleDropdownOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorDropdown(event.currentTarget)
    }

    if (!userDetails) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                }}
            >
                <CustomLoadingDot />
            </Box>
        )
    }

    const user = userDetails.user
    return (
        <>
            <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}
                style={{ cursor: 'pointer' }}
                onClick={handleDropdownOpen}
            >
                <Avatar
                    src={avatarSrc}
                    sx={{ width: '3rem', height: '3rem' }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                    }}
                >
                    <Typography
                        sx={{
                            color: theme.palette.text.primary,
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                        }}
                    >
                        {`${user?.first_name} ${user?.last_name}`}
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            color: theme.palette.text.secondary,
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '0.77rem',
                        }}
                    >
                        {status ? 'Premium user' : 'Standard user'}
                    </Typography>
                </Box>
                <Badge
                    badgeContent={notifications}
                    color="primary"
                    sx={{
                        cursor: 'pointer',
                        '& .MuiBadge-badge': {
                            fontFamily: 'Poppins, sans-serif',
                        },
                    }}
                >
                    <IconButton>
                        <NotificationsNoneIcon color="primary" />
                    </IconButton>
                </Badge>
            </Box>

            {/* Dropdown Menu */}
            <MenuDropdown
                user={user!}
                anchorDropdown={anchorDropdown}
                setAnchorDropdown={setAnchorDropdown}
            />
        </>
    )
}

export default UserMenu
