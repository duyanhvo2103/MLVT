import {
    AddCardOutlined,
    DashboardOutlined,
    Person,
    ReceiptLong,
} from '@mui/icons-material'
import { Box, Link as MuiLink, Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import MLVTLogo from '../../../assets/mlvt_logo.png'
import { useTheme } from '../../../theme'

interface NavLink {
    name: string
    icon: React.ReactElement
    link: string
}

const navLinks: NavLink[] = [
    {
        name: 'Dashboard',
        icon: <DashboardOutlined sx={{ fontSize: '1.8em' }} />,
        link: '/dashboard',
    },
    // {
    //     name: 'Performance',
    //     icon: <InsertChartOutlined sx={{ fontSize: '1.8em' }} />,
    //     link: '/performance',
    // },
    {
        name: 'Manage Accounts',
        icon: <Person sx={{ fontSize: '1.8em' }} />,
        link: '/manage_accounts',
    },
    {
        name: 'Manage Vouchers',
        icon: <AddCardOutlined sx={{ fontSize: '1.8em' }} />,
        link: '/manage_vouchers',
    },
    {
        name: 'Pending Requests',
        icon: <ReceiptLong sx={{ fontSize: '1.8em' }} />,
        link: '/pending_requests',
    },
    // {
    //     name: 'Configuration',
    //     icon: <DashboardCustomizeOutlined sx={{ fontSize: '1.8em' }} />,
    //     link: '/feature_configuration',
    // },
]

const Sidebar: React.FC = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const location = window.location

    return (
        <Box
            sx={{
                background: `linear-gradient(180deg, ${theme.background.sidebarDark} 0%, ${theme.background.sidebarDarkLight} 90%)`,
                padding: 0,
                display: { xs: 'none', lg: 'flex' },
                height: '100vh',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: '18em',
            }}
        >
            <Box
                sx={{
                    py: '1em',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: '100%',
                    paddingY: 3,
                    flexGrow: 1,
                }}
            >
                <img
                    src={MLVTLogo}
                    alt="logo"
                    style={{
                        width: '7em',
                        height: '7em',
                        borderRadius: '10%',
                        cursor: 'pointer',
                    }}
                    onClick={() => navigate('/dashboard')}
                    role="button"
                />

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1em',
                        alignItems: 'center',
                    }}
                >
                    {navLinks.map((item) => (
                        <MuiLink
                            key={item.name}
                            component={RouterLink}
                            to={item.link}
                            underline="none"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                borderRadius: '8px',
                                width: '100%',
                                padding: '0.5em',
                                textDecoration: 'none',
                                '&:hover': {
                                    backgroundColor: '#2c3e50',
                                },
                                '& svg': {
                                    color:
                                        location.pathname === item.link
                                            ? '#F5D061'
                                            : 'white',
                                    transition: 'color 0.3s ease-in-out',
                                },
                            }}
                        >
                            {item.icon}
                            <Typography
                                sx={{
                                    marginLeft: '1em',
                                    fontWeight: '500',
                                    fontSize: '0.9em',
                                    transition: 'color 0.3s ease-in-out',
                                    fontFamily:
                                        theme.typography.body2.fontFamily,
                                    color:
                                        location.pathname === item.link
                                            ? '#F5D061'
                                            : 'white',
                                }}
                            >
                                {item.name}
                            </Typography>
                        </MuiLink>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default Sidebar
