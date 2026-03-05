import { Box, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import SpeakerProfile from './SpeakerProfile'
import TranscriptionCard from './TranscriptionCard'

// Sample audio wave data (different for each)
const audioWaveHeights1 = [
    30, 50, 70, 60, 40, 80, 75, 55, 35, 25, 45, 65, 85, 70, 50, 30, 60, 40, 20,
    50, 70, 60, 40, 80, 75, 55, 35, 25, 45, 65, 20, 15, 10, 12, 8, 10, 15, 18,
    10, 5,
]
const audioWaveHeights2 = [
    10, 12, 8, 10, 15, 18, 10, 5, 30, 50, 70, 60, 40, 80, 75, 55, 35, 25, 45,
    65, 85, 70, 50, 30, 60, 40, 20, 50, 70, 60, 40, 80, 75, 55, 35, 25, 45, 65,
]

const LanguagesShowcase: React.FC = () => {
    return (
        <Box
            sx={{
                backgroundColor: 'transparent',
                py: { xs: 4, md: 8 },
                color: '#E0E0E0',
            }}
        >
            <Container maxWidth="lg">
                <Typography
                    variant="h1"
                    component="h2"
                    textAlign="center"
                    gutterBottom
                    sx={{
                        mb: { xs: 4, md: 6 },
                        fontSize: { xs: '2.2rem', sm: '2.5rem', md: '2.8rem' },
                        fontWeight: 600,
                        color: '#FFFFFF',
                        fontFamily: 'Poppins, sans-serif',
                    }}
                >
                    Various languages, Intended for all audiences
                </Typography>

                <Grid container spacing={{ xs: 4, md: 6 }} alignItems="stretch">
                    {/* Left Column */}
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 3,
                        }}
                    >
                        <SpeakerProfile
                            imageUrl="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=300&q=60"
                            flagUrl="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"
                            altText="English Speaker"
                            flagAltText="UK Flag"
                        />
                        <TranscriptionCard
                            showTopAudioWave
                            topAudioWaveHeights={audioWaveHeights1}
                            detectedOrSelectedLanguage="Auto Detect"
                            text="Wheel of fortune contestant christopher coleman has had enough of his name being dragged through the mud coleman appeared on tuesday nights wheel"
                            sourceLanguage="Auto Detect: English"
                            decorativeLines={true}
                        />
                    </Grid>

                    {/* Right Column */}
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 3,
                        }}
                    >
                        <TranscriptionCard
                            detectedOrSelectedLanguage="Vietnamese"
                            text="Thí sinh của chương trình Wheel of Fortune, Christopher Coleman đã quá chán ngán khi tên của mình bị lôi xuống bùn. Coleman đã xuất hiện trên Wheel vào tối thứ ba."
                            isTranslationTarget
                            sourceLanguage="Auto Detect"
                            targetLanguage="Vietnamese"
                            showBottomAudioWave
                            bottomAudioWaveHeights={audioWaveHeights2}
                            decorativeLines={true}
                        />
                        <SpeakerProfile
                            imageUrl="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=300&q=60"
                            flagUrl="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg"
                            altText="Vietnamese Speaker"
                            flagAltText="Vietnam Flag"
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default LanguagesShowcase
