// ./components/TopicDetailView.tsx

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';
import { TopicCardProps } from './TopicCard'; // Adjust path if necessary

interface TopicDetailViewProps {
    topic: TopicCardProps;
    onBack: () => void; // Function to go back to the list
}

// Placeholder content for demonstration
const topicDetailsContent: { [key: string]: React.ReactNode } = {
    'Getting Started': (
        <Typography variant="body1" sx={{ mt: 2 }}>
            Welcome! To get started, first ensure your video is in MP4 format.
            Upload your video using the "Translate Video" button on the homepage.
            Select your source and target languages, and our system will handle the rest,
            including speech-to-text, translation, voice cloning, and lip-syncing.
        </Typography>
    ),
    'Video & Audio Requirements': (
        <Typography variant="body1" sx={{ mt: 2 }}>
            For optimal results, please use a video with a clear, forward-facing speaker
            and minimal background noise. A resolution of 720p or higher is recommended.
            Supported audio codecs are AAC and MP3.
        </Typography>
    ),
    'FAQs': (
        <Typography variant="body1" sx={{ mt: 2 }}>
            <b>Q: How long does processing take?</b><br/>
            A: Processing time typically equals the length of your video, but may vary based on server load.<br/><br/>
            <b>Q: Are my videos private?</b><br/>
            A: Yes, all uploaded content is encrypted and processed securely. We respect your privacy.
        </Typography>
    ),
    // Add other placeholders as needed
};


const TopicDetailView: React.FC<TopicDetailViewProps> = ({ topic, onBack }) => {
    return (
        <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 }, textAlign: 'center' }}>
            <Box sx={{ textAlign: 'left', mb: 4 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={onBack}
                    sx={{ color: 'white', textTransform: 'none' }}
                >
                    Back to all topics
                </Button>
            </Box>

            <Typography variant="h2" component="h1" fontWeight="bold">
                {topic.title}
            </Typography>

            <Box sx={{ mt: 3, textAlign: 'left', color: 'rgba(255, 255, 255, 0.8)' }}>
                {topicDetailsContent[topic.title] || (
                    <Typography>
                        Detailed information for "{topic.title}" will be available here soon.
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default TopicDetailView;