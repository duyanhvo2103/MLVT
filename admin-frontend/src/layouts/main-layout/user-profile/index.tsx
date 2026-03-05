// components/UserProfileBox.tsx
import React, { useState } from 'react';
import { Box, Typography, Avatar, Menu, Divider, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { useTheme } from '../../../theme';
import { AccountCircle, NavigateNext } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

interface UserProfileBoxProps {
    firstName: string;
    lastName: string;
    avatarUrl: string;
    userId: string;
}

const UserProfile: React.FC<UserProfileBoxProps> = ({ firstName, lastName, avatarUrl, userId }) => {
    const theme = useTheme();
    const [anchorDropdown, setAnchorDropdown] = useState<null | HTMLElement>(null);
    const menuItems = [
        { label: 'Edit account', icon: <AccountCircle sx={{ fontSize: '2em' }}/>, path: `/edit_account/${userId}` }
    ]
    const navigate = useNavigate();

    // Handle dropdown open
    const handleDropdownOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorDropdown(event.currentTarget);
    };

    // Handle dropdown close
    const handleDropdownClose = () => {
        setAnchorDropdown(null);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                marginLeft: '1rem',
                alignItems: 'center',
                borderRadius: '0.4rem',
                cursor: 'pointer',
            }}
        >
            <Typography
                variant="body2"
                sx={{
                    color: 'white',
                    fontFamily: theme.typography.body1.fontFamily,
                    fontWeight: 600,
                    fontSize: '0.95rem',
                }}
            >
                {`${firstName} ${lastName}`}
            </Typography>
            <Avatar
                src={avatarUrl}
                alt={`${firstName} ${lastName}`}
                sx={{ width: '2.8rem', height: '2.5rem' }}
                onClick={handleDropdownOpen}
            />

            {/* Dropdown Menu */}
            <Menu
                anchorEl={anchorDropdown}
                open={Boolean(anchorDropdown)}
                onClose={handleDropdownClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                sx={{
                    mt: '1.2rem',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                    borderRadius: '0.7rem',
                }}
                slotProps={{
                    paper: {
                        style: {
                            borderRadius: '0.6rem',
                        }
                    }
                }}
            >

                {/* Profile Section */}
                <Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 1.5,
                        padding: '1rem 1.5rem',
                        marginLeft: '0.5rem',
                        marginRight: '0.5rem',
                        marginBottom: '0.5rem',
                        alignItems: 'center',
                        borderBottom: '1px solid #E0E0E0',
                        borderRadius: '0.4rem',
                    }}>
                        <Avatar src={avatarUrl} alt={`${firstName} ${lastName}`} sx={{ width: '2.8rem', height: '2.5rem' }} />
                        <Box>
                            <Typography variant="body2" sx={{
                                color: "black",
                                fontFamily: theme.typography.body1,
                                fontWeight: 'bold',
                                fontSize: '0.95rem'
                            }}>
                                {`${firstName} ${lastName}`}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {menuItems.map((item) => (
                    <React.Fragment key={item.label}>
                        {item.label === 'Log out' && <Divider sx={{ margin: '0.5rem 0' }} variant="middle" component="li" />}
                        <MenuItem
                            onClick={() => {
                                handleDropdownClose();
                                navigate(item.path);
                            }}
                            sx={{
                                padding: '0.3rem 1.5rem',
                                margin: '0.5rem 0.5rem',
                                borderRadius: '0.4rem',
                                alignItems: 'center',
                                gap: '1.2rem',
                                '&:hover': {
                                    backgroundColor: theme.background.lightPurple,
                                    color: theme.palette.primary.contrastText,
                                },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: '35px' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText disableTypography primary={item.label} sx={{
                                color: theme.fontColor.black,
                                fontFamily: theme.typography.body1,
                                fontSize: '0.8rem',
                            }} />
                            {/* Conditionally render NavigateNext icon */}
                            {['Appearance: Light', 'Language: English'].includes(item.label) && (
                                <NavigateNext sx={{ marginLeft: 'auto', color: theme.fontColor.black }} />
                            )}
                        </MenuItem>
                    </React.Fragment>
                ))}
            </Menu>
        </Box>
    );
};

export default UserProfile;
