import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '../../theme';
import Sidebar from './side-bar';
import { Outlet } from 'react-router-dom';
import HeaderBar from './header-bar/index';

const MainLayout: React.FC = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                background: `linear-gradient(180deg, ${theme.background.dark} 0%, ${theme.background.lightDark} 100%)`,
                backgroundBlendMode: 'multiply',
                overflow: 'hidden',            
            }}
        >
            <Sidebar />
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',     
                    overflow: 'hidden',          
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        overflowY: 'auto',         
                    }}
                >
                    <HeaderBar
                        sx={{
                            background: 'none',
                            paddingTop: '1em',
                        }}
                    />

                    <Box sx={{ padding: '3em' }}>
                        <Outlet />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default MainLayout;
