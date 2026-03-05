import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import HomeIcon from '@mui/icons-material/Home'
import LocalActivityIcon from '@mui/icons-material/LocalActivity'
import MenuIcon from '@mui/icons-material/Menu'
import ShapeLineIcon from '@mui/icons-material/ShapeLine'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import WorkspacesOutlinedIcon from '@mui/icons-material/WorkspacesOutlined'
import React, { useState } from 'react'
import MLVTLogo from '../../assets/mlvt_logo.png'

import {
    Box,
    Drawer,
    IconButton,
    Link as MuiLink,
    Typography,
    useTheme,
} from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'

interface NavLink {
    name: string
    icon: React.ReactNode
    link: string
}

const navLinks: NavLink[] = [
    {
        name: 'Home',
        icon: <HomeIcon />,
        link: '/',
    },
    {
        name: 'Pipeline',
        icon: <ShapeLineIcon />,
        link: '/project-pipeline',
    },
    {
        name: 'Storage',
        icon: <VideoLibraryIcon />,
        link: '/my-storage',
    },
    {
        name: 'Buy Token',
        icon: <LocalActivityIcon />,
        link: '/premium-plan',
    },
    {
        name: 'Explore',
        icon: <ExploreOutlinedIcon />,
        link: '/landing',
    },
    {
        name: 'About us',
        icon: <WorkspacesOutlinedIcon />,
        link: '/about-us',
    },
    {
        name: 'FAQ',
        icon: <HelpOutlineOutlinedIcon />,
        link: '/help-and-support',
    },
]

const Sidebar: React.FC = () => {
    const theme = useTheme()
    // --- CHANGE 1: Get the current location from react-router-dom ---
    const location = useLocation()
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

    const toggleDrawer = (open: boolean) => () => {
        setIsDrawerOpen(open)
    }

    return (
        <>
            {/* Permanent Sidebar for Larger Screens */}
            <Box
                sx={{
                    backgroundColor: theme.palette.tertiary.main,
                    padding: 0,
                    display: { xs: 'none', lg: 'flex' },
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        py: '1em',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        width: '100%',
                        flexGrow: 1,
                        paddingX: '0.8em',
                    }}
                >
                    {/* MLVT Logo */}
                    <img
                        src={MLVTLogo}
                        alt="logo"
                        style={{
                            width: '4em',
                            height: '4em',
                            borderRadius: '10%',
                            cursor: 'pointer',
                            marginBottom: '2.5em',
                        }}
                        onClick={() => (window.location.href = '/')}
                        role="button"
                    />

                    {/* Menu Toggle Icon */}
                    <IconButton
                        onClick={toggleDrawer(true)}
                        sx={{
                            backgroundColor:
                                theme.palette.secondary.contrastText,
                            borderRadius: '20%',
                            width: '2em',
                            height: '2em',
                            '&:hover': {
                                backgroundColor:
                                    theme.palette.background.default,
                                '& .MuiSvgIcon-root': {
                                    color: theme.palette.primary.main,
                                },
                            },
                        }}
                    >
                        <MenuIcon
                            sx={{
                                color: theme.palette.background.default,
                            }}
                        />
                    </IconButton>

                    {navLinks.map((item) => {
                        // --- CHANGE 2: Check if the link is the currently active one ---
                        const isActive = location.pathname === item.link

                        return (
                            <MuiLink
                                key={item.name}
                                component={RouterLink}
                                to={item.link}
                                underline="none"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '20%',
                                    width: '3em',
                                    height: '2.5em',
                                    textDecoration: 'none',
                                    backgroundColor: isActive
                                        ? theme.palette.secondary.main
                                        : 'transparent',
                                    '&:hover': {
                                        backgroundColor:
                                            theme.palette.secondary.main,
                                    },
                                }}
                            >
                                {/* Increase Icon Size */}
                                {React.cloneElement(
                                    item.icon as React.ReactElement,
                                    {
                                        sx: {
                                            fontSize: '1.5em',
                                            color: theme.palette.text.primary,
                                        },
                                    },
                                )}
                            </MuiLink>
                        )
                    })}
                </Box>
            </Box>

            {/* Drawer for Smaller Screens */}
            <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: '15em',
                        backgroundColor: theme.palette.tertiary.main,
                    },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        paddingTop: 2,
                    }}
                >
                    {/* Centered Logo */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: '1em',
                        }}
                    >
                        <img
                            src={MLVTLogo}
                            alt="logo"
                            style={{
                                width: '10em',
                                height: '10em',
                                borderRadius: '10%',
                            }}
                        />
                        <Typography
                            sx={{
                                color: theme.palette.secondary.contrastText,
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '2.5em',
                                fontWeight: 800,
                            }}
                        >
                            MLVT
                        </Typography>
                    </Box>

                    {/* Left-Aligned Menu Items */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                        }}
                    >
                        {navLinks.map((item) => {
                            // --- CHANGE 4: Check for active link in the drawer as well ---
                            const isActive = location.pathname === item.link

                            return (
                                <MuiLink
                                    component={RouterLink}
                                    key={item.name}
                                    to={item.link}
                                    style={{
                                        textDecoration: 'none',
                                        color: theme.palette.text.primary,
                                        gap: 1,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'flex-start',
                                            gap: 3,
                                            padding: '0.5em 2em',
                                            fontSize: '1.2em',
                                            // --- CHANGE 5: Apply background color if active ---
                                            backgroundColor: isActive
                                                ? theme.palette.secondary.main
                                                : 'transparent',
                                            '&:hover': {
                                                backgroundColor:
                                                    theme.palette.secondary
                                                        .main,
                                            },
                                        }}
                                    >
                                        {item.icon}
                                        <Typography
                                            sx={{
                                                fontFamily:
                                                    'Poppins, sans-serif',
                                                fontSize: '0.8em',
                                            }}
                                        >
                                            {item.name}
                                        </Typography>
                                    </Box>
                                </MuiLink>
                            )
                        })}
                    </Box>
                </Box>
            </Drawer>

            {/* Menu Toggle Icon for Mobile Screens */}
            <IconButton
                onClick={toggleDrawer(true)}
                sx={{
                    display: { xs: 'block', lg: 'none' },
                    position: 'fixed',
                    top: '5em',
                    left: '0.5em',
                    backgroundColor: theme.palette.secondary.contrastText,
                    borderRadius: '20%',
                    width: '2em',
                    height: '2em',
                    alignItems: 'center',
                    '&:hover': {
                        backgroundColor: theme.palette.background.default,
                        '& .MuiSvgIcon-root': {
                            color: theme.palette.primary.main,
                        },
                    },
                    padding: '0em',
                }}
            >
                <MenuIcon
                    sx={{
                        fontSize: '1.2em',
                        color: theme.palette.text.primary,
                    }}
                />
            </IconButton>
        </>
    )
}

export default Sidebar
