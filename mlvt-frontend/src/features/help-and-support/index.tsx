import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Container, Grid } from '@mui/material';
import React, { useState } from 'react';
import bgImage from '../../assets/landing_page_background.png';
import LandingPageFooter from '../../components/LandingPageComponents/Footer';
import NavBar from '../../components/LandingPageComponents/NavBar';
import CommonTopicsSection from './components/CommonTopicSection';
import HelpHeader from './components/HelpHeader';
import ProminentLinkCard from './components/ProminentLinkCard';
import ProminentLinkDetailView, { ProminentLinkData } from './components/ProminentLinkDetailView'; // <-- Import new component and type
import { TopicCardProps } from './components/TopicCard';
import TopicDetailView from './components/TopicDetailView';

// State to manage the active view
type View =
    | { type: 'index' }
    | { type: 'topic'; data: TopicCardProps }
    | { type: 'prominent'; data: ProminentLinkData };


const prominentLinksData: ProminentLinkData[] = [
    {
        icon: SettingsIcon,
        title: 'Overflow Essentials',
        linkText: 'See all',
        href: '#essentials',
    },
    {
        icon: CheckCircleOutlineIcon,
        title: 'Good to know',
        linkText: 'See all',
        href: '#good-to-know',
    },
];

const commonTopicsData: TopicCardProps[] = [
    // ... your commonTopicsData remains unchanged
    {
        title: 'Getting Started',
        description: 'Learn how to quickly get the most out of Overflow.',
        linkText: 'See all 12 articles',
        href: '#getting-started',
    },
    {
        title: 'Video & Audio Requirements',
        description:
            'Get tips on file formats, recording quality, and audio clarity to ensure the best possible translation and lip-sync results.',
        linkText: 'See all 9 best practices',
        href: '#desktop-app',
    },
    {
        title: 'Managing Translations',
        description:
            'Learn how to review and edit the translated text before the new audio is generated, giving you full control over the final output.',
        linkText: 'See all 8 guides',
        href: '#dashboard',
    },
    {
        title: 'Troubleshooting',
        description: "Find solutions for common issues like a failed video process, inaccurate lip-sync, or problems with the cloned voice.",
        linkText: 'See all releases',
        href: '#releases',
    },
    {
        title: 'FAQs',
        description:
            'Answers to the most commonly asked questions. What is Overflow, what can you...',
        linkText: 'See all FAQs',
        href: '#faqs',
    },
    {
        title: 'Account & Billing',
        description:
            'Manage your subscription, view your processing history, and find all information related to your plan and payments.',
        linkText: 'See all 6 articles',
        href: '#how-to',
    },
];


const HelpAndSupportPage: React.FC = () => {
    // A more robust state to handle different view types
    const [activeView, setActiveView] = useState<View>({ type: 'index' });

    const handleTopicClick = (topic: TopicCardProps) => {
        setActiveView({ type: 'topic', data: topic });
        window.scrollTo(0, 0);
    };

    const handleProminentLinkClick = (linkData: ProminentLinkData) => {
        setActiveView({ type: 'prominent', data: linkData });
        window.scrollTo(0, 0);
    };

    // A single handler to go back to the main index view
    const handleBackClick = () => {
        setActiveView({ type: 'index' });
    };

    const renderContent = () => {
        switch (activeView.type) {
            case 'topic':
                return <TopicDetailView topic={activeView.data} onBack={handleBackClick} />;
            case 'prominent':
                return <ProminentLinkDetailView detail={activeView.data} onBack={handleBackClick} />;
            case 'index':
            default:
                return (
                    <>
                        <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
                            <Grid container spacing={3}>
                                {prominentLinksData.map((link, index) => (
                                    <Grid item xs={12} md={6} key={index}>
                                        <ProminentLinkCard
                                            {...link}
                                            onClick={() => handleProminentLinkClick(link)} // <-- Pass the handler
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
                        <CommonTopicsSection
                            topics={commonTopicsData}
                            onTopicClick={handleTopicClick}
                        />
                    </>
                );
        }
    };

    return (
        <Box
            sx={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'right center',
                backgroundRepeat: 'repeat-y',
                color: 'white',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <NavBar />
            <Box component="main" sx={{ flex: 1 }}>
                <HelpHeader />
                {renderContent()}
            </Box>
            <LandingPageFooter />
        </Box>
    );
};

export default HelpAndSupportPage;