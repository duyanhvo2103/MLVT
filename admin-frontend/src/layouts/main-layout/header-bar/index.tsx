import { Search } from '@mui/icons-material'
import LogoutIcon from '@mui/icons-material/Logout'
import {
    AppBar,
    Box,
    IconButton,
    SxProps,
    TextField,
    Theme,
    Toolbar,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../../../api/user.api'
import { useAuth } from '../../../context/auth-context'
import { useTheme } from '../../../theme'
import UserProfile from '../user-profile'

const HeaderBar: React.FC<{ sx?: SxProps<Theme> | undefined }> = ({ sx }) => {
    const theme = useTheme()
    const navigate = useNavigate()
    const { userId, logout } = useAuth()
    const [avatarUrl, setAvatarUrl] = useState('')
    const [userData, setUserData] = useState({ firstName: '', lastName: '' })

    const handleLogout = () => {
        logout()
        navigate('/auth')
    }

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) return

            try {
                const userData = await getUser(userId)
                setUserData({
                    firstName: userData.user.first_name,
                    lastName: userData.user.last_name,
                })

                const avatarUrl = userData.user.avatar || ''
                const avatarCorrectUrl = avatarUrl.split('?X-Amz-Algorithm')[0]
                setAvatarUrl(avatarCorrectUrl)
            } catch (error) {
                console.error('Error fetching user data:', error)
            }
        }

        fetchUserData()
        console.log('User id: ', userId)
    }, [userId])

    return (
        <AppBar sx={{ ...sx, boxShadow: 'none' }} position="static">
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box sx={{ flex: 1, maxWidth: '17em' }} />
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <TextField
                        variant="outlined"
                        placeholder="Search"
                        sx={{
                            backgroundColor: theme.background.dark,
                            borderRadius: '100%',
                            borderWidth: 1,
                            width: '100%',
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: theme.background.dark,
                                borderRadius: '10px',
                                height: '90%',
                                paddingLeft: 1.5,
                                paddingRight: 3.5,
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline':
                                    {
                                        borderColor: 'white',
                                    },
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white',
                            },
                            height: '50px',
                        }}
                        slotProps={{
                            input: {
                                style: {
                                    color: 'white',
                                    fontFamily:
                                        theme.typography.body2.fontFamily,
                                    fontSize: '0.9em',
                                },
                                endAdornment: (
                                    <IconButton edge="end" aria-label="search">
                                        <Search sx={{ color: 'white' }} />
                                    </IconButton>
                                ),
                            },
                            inputLabel: {
                                style: {
                                    color: 'white',
                                    fontFamily:
                                        theme.typography.body2.fontFamily,
                                    fontSize: '0.9em',
                                },
                            },
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        maxWidth: '20em',
                        gap: 2,
                    }}
                >
                    <UserProfile
                        firstName={userData.firstName}
                        lastName={userData.lastName}
                        avatarUrl={avatarUrl}
                        userId={userId ? userId : ''}
                    />
                    <IconButton
                        onClick={handleLogout}
                        sx={{
                            color: 'white',
                            marginRight: '1rem',
                            gap: 1,
                            cursor: 'pointer',
                        }}
                    >
                        <LogoutIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default HeaderBar
