// ./components/ProminentLinkDetailView.tsx

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Container, List, ListItem, ListItemIcon, ListItemText, SvgIcon, Typography } from '@mui/material';
import React from 'react';
import ArticleIcon from '@mui/icons-material/Article'; // Example icon

// Define the data structure for a prominent link
export interface ProminentLinkData {
    icon: typeof SvgIcon;
    title: string;
    linkText: string;
    href: string; // Keep for data consistency
}

interface ProminentLinkDetailViewProps {
    detail: ProminentLinkData;
    onBack: () => void;
}

// Placeholder content for demonstration
const detailsContent: { [key: string]: React.ReactNode } = {
    'Overflow Essentials': (
        <List>
            <ListItem>
                <ListItemIcon><ArticleIcon sx={{ color: '#DDCCFF' }} /></ListItemIcon>
                <ListItemText primary="How to create your first translation" />
            </ListItem>
            <ListItem>
                <ListItemIcon><ArticleIcon sx={{ color: '#DDCCFF' }} /></ListItemIcon>
                <ListItemText primary="Understanding voice cloning" />
            </ListItem>
            <ListItem>
                <ListItemIcon><ArticleIcon sx={{ color: '#DDCCFF' }} /></ListItemIcon>
                <ListItemText primary="Managing your translated videos" />
            </ListItem>
        </List>
    ),
    'Good to know': (
        <List>
            <ListItem>
                <ListItemIcon><ArticleIcon sx={{ color: '#DDCCFF' }} /></ListItemIcon>
                <ListItemText primary="Supported video formats and codecs" />
            </ListItem>
            <ListItem>
                <ListItemIcon><ArticleIcon sx={{ color: '#DDCCFF' }} /></ListItemIcon>
                <ListItemText primary="Data privacy and security policy" />
            </ListItem>
        </List>
    ),
};

const ProminentLinkDetailView: React.FC<ProminentLinkDetailViewProps> = ({ detail, onBack }) => {
    const { icon: Icon, title } = detail;

    return (
        <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
            <Box sx={{ mb: 4 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={onBack}
                    sx={{ color: 'white', textTransform: 'none' }}
                >
                    Back to Help Center
                </Button>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center' }}>
                <Icon sx={{ fontSize: '2.5rem' }} />
                <Typography variant="h3" component="h1" fontWeight="bold">
                    {title}
                </Typography>
            </Box>

            <Box sx={{ mt: 4, color: 'rgba(255, 255, 255, 0.8)' }}>
                {detailsContent[title] || <Typography>Content coming soon.</Typography>}
            </Box>
        </Container>
    );
};

export default ProminentLinkDetailView;