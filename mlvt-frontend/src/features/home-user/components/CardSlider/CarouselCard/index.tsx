import React from 'react';
import { Box, Typography } from '@mui/material';

interface CarouselCardProps {
    title: string;
    onClick: () => void;
}

const getDefaultContent = (title: string): string => {
    switch (title) {
        case 'Video Translation':
            return 'Video Translation enables real-time, on-screen translations within video content, displayed through a seamless overlay that allows users to receive critical information without disrupting their viewing experience. This feature is ideal for multilingual video presentations, tutorials, and corporate communications, ensuring accessibility and comprehension across global audiences. It creates an interactive layer that enhances the viewer\'s engagement by prompting decisions or offering additional information in their preferred language.';
        case 'Text Generation':
            return 'Text Generation produces contextually appropriate, high-quality written content based on user input or pre-set templates. This functionality is designed to streamline content creation for various applications, from automated customer service responses to creative writing assistance. With advanced language processing capabilities, it generates coherent and nuanced text that captures the intent and style needed for each unique scenario, reducing manual effort and ensuring consistency in messaging.';
        case 'Subtitle Generation':
            return 'Subtitle Generation automatically creates precise and readable subtitles for video content, enhancing accessibility for hearing-impaired audiences and facilitating cross-language understanding. This feature is invaluable for educational videos, online courses, social media content, and corporate communications, as it enables wider reach and better engagement. By accurately capturing dialogue and context, it ensures that viewers from diverse backgrounds can follow along effortlessly, irrespective of language or accessibility needs.';
        case 'Voice Generation':
            return 'Voice Generation transforms text into high-quality, natural-sounding audio, ideal for applications in e-learning, video narration, virtual assistants, and more. This feature not only saves time in manual recording but also offers options for customizing voice characteristics to suit different contexts and audiences. It creates a dynamic listening experience that makes content more relatable and engaging, supporting varied tones and languages for truly localized audio presentations.';
        case 'Lip synchronization':
            return 'Lip synchronization for video brings a lifelike quality to video content by perfectly aligning the movement of a speaker’s lips with generated or translated audio. This feature is essential for dubbing, animated characters, virtual influencers, and localized content, as it ensures a seamless and immersive experience for viewers. By eliminating distracting mismatches between voice and visual cues, it enhances the authenticity and quality of audiovisual media, making it highly effective for global audiences.';
        default:
            return 'Description currently unavailable for this feature.';
    }
};

const CarouselCard: React.FC<CarouselCardProps> = ({ title, onClick }) => {
    const content = getDefaultContent(title);

    return (
        <Box
            onClick={onClick}
            sx={{
                width: { xs: '100%', sm: '80%', md: '60%', lg: '40%' },
                maxWidth: 640,
                bgcolor: 'rgba(0, 0, 0, 0.75)',
                borderRadius: 2,
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                p: 3,
                gap: 1,
                cursor: 'pointer',
                overflow: 'hidden',
            }}
        >
            <Typography sx={{
                fontSize: { xs: '1.2rem', sm: '1.8rem' },
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                color: '#FF9BD2',
                textAlign: 'left',
                mb: 0.3,
            }} >
                {title}
            </Typography>
            <Typography
                align="justify"
                sx={{
                    color: 'white',
                    fontSize: { xs: '0.7rem', sm: '0.8rem' },
                    fontFamily: 'Poppins, sans-serif',
                }}
            >
                {content}
            </Typography>
        </Box>
    );
};

export default CarouselCard;