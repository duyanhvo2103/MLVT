// src/components/PurposeShowcase.tsx
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import VideoPlaceholderImage from 'src/assets/news.png'

const TABS = ['Multimedia', 'Education', 'Other'] as const
type TabType = (typeof TABS)[number]

const LANGUAGES = [
    'Vietnamese',
    'English',
    'Japanese',
    'French',
    '120+ other',
] as const
type LanguageType = (typeof LANGUAGES)[number]

const tabContentData: Record<TabType, { title: string; description: string }> =
    {
        Multimedia: {
            title: 'MLVT for Multilingual Multimedia',
            description:
                'Effectively and truthfully disseminate propaganda information with minimal time, maximizing efficiency and accuracy, while utilizing limited resources.',
        },
        Education: {
            title: 'MLVT for Educational Content',
            description:
                'Break down language barriers in learning. Provide educational videos, lectures, and tutorials in multiple languages to reach a global student base.',
        },
        Other: {
            title: 'MLVT for Various Applications',
            description:
                'Extend your reach in corporate training, product demonstrations, public service announcements, and entertainment content by offering multilingual versions.',
        },
    }

const PurposeShowcase: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('Multimedia')
    const [activeLanguage, setActiveLanguage] =
        useState<LanguageType>('Vietnamese')

    const currentContent = tabContentData[activeTab]
    const primaryPurple = '#906bff'
    const darkBg = 'transparent'
    const componentBg = '#23233B'
    const textColor = '#E0E0E0'
    const lightTextColor = '#B0B0B0'

    return (
        <Box
            sx={{
                backgroundColor: darkBg,
                color: textColor,
                py: { xs: 4, md: 8 },
                px: { xs: 2, md: 4 },
            }}
        >
            <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                    <Typography
                        variant="h3"
                        component="h2"
                        fontWeight="600"
                        sx={{
                            fontSize: {
                                xs: '2rem',
                                md: '2.5rem',
                                fontFamily: 'Poppins, sans-serif',
                            },
                        }}
                    >
                        Built for various purpose,
                        <br />
                        For everyone.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent={{ xs: 'center', md: 'flex-end' }}
                    >
                        {TABS.map((tab) => (
                            <Button
                                key={tab}
                                variant={
                                    activeTab === tab ? 'outlined' : 'contained'
                                }
                                onClick={() => setActiveTab(tab)}
                                sx={{
                                    borderRadius: '50px',
                                    px: 3,
                                    py: 1,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    fontFamily: 'Poppins, sans-serif',
                                    backgroundColor:
                                        activeTab === tab
                                            ? 'transparent'
                                            : 'rgba(255, 255, 255, 0.08)',
                                    borderColor:
                                        activeTab === tab
                                            ? primaryPurple
                                            : 'transparent',
                                    color:
                                        activeTab === tab
                                            ? primaryPurple
                                            : textColor,
                                    '&:hover': {
                                        backgroundColor:
                                            activeTab === tab
                                                ? 'rgba(144, 107, 255, 0.1)'
                                                : 'rgba(255, 255, 255, 0.12)',
                                        borderColor: primaryPurple,
                                    },
                                }}
                            >
                                {tab}
                            </Button>
                        ))}
                    </Stack>
                </Grid>
            </Grid>

            <Paper
                elevation={0}
                sx={{
                    backgroundColor: componentBg,
                    p: { xs: 2, md: 3 },
                    borderRadius: '16px',
                }}
            >
                <Grid container spacing={{ xs: 2, md: 3 }} alignItems="center">
                    {/* Language Selector */}
                    <Grid item xs={12} sm={2} md={1.5}>
                        <Stack spacing={1.5} alignItems="flex-start">
                            {LANGUAGES.map((lang) => (
                                <Box
                                    key={lang}
                                    onClick={() => setActiveLanguage(lang)}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        width: '100%',
                                        py: 0.5,
                                        position: 'relative',
                                    }}
                                >
                                    {activeLanguage === lang && (
                                        <Box
                                            sx={{
                                                width: '4px',
                                                height: '28px',
                                                backgroundColor: 'white',
                                                borderRadius: '4px',
                                                position: 'absolute',
                                                left: -12,
                                            }}
                                        />
                                    )}
                                    <RadioButtonUncheckedIcon
                                        sx={{
                                            mr: 1.5,
                                            fontSize: '18px',
                                            color:
                                                activeLanguage === lang
                                                    ? 'white'
                                                    : lightTextColor,
                                            opacity:
                                                activeLanguage === lang ? 0 : 1, // Hide if pill is shown
                                        }}
                                    />
                                    {/* This is a simplified indicator, the pill above is closer to the design */}
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight:
                                                activeLanguage === lang
                                                    ? 'bold'
                                                    : 'normal',
                                            color:
                                                activeLanguage === lang
                                                    ? 'white'
                                                    : lightTextColor,
                                            fontFamily: 'Poppins, sans-serif',
                                        }}
                                    >
                                        {lang}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                    </Grid>

                    {/* Video Player Mock */}
                    <Grid item xs={12} sm={6} md={6.5}>
                        <Box
                            sx={{
                                position: 'relative',
                                width: '100%',
                                aspectRatio: '16/9',
                                backgroundColor: '#000',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <img
                                src={VideoPlaceholderImage}
                                alt="Video broadcast placeholder"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                            {/* Optional: Overlay VTV logo if not part of the image */}
                            <Typography
                                sx={{
                                    position: 'absolute',
                                    top: 16,
                                    right: 24,
                                    color: 'white',
                                    fontWeight: 'bold',
                                    backgroundColor: 'rgba(0,0,0,0.3)',
                                    px: 1,
                                    borderRadius: 1,
                                }}
                            >
                                VTV<span style={{ color: 'red' }}>HD</span>
                            </Typography>
                            {/* Optional: Overlay news ticker if not part of the image */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 16,
                                    left: 0,
                                    right: 0,
                                    backgroundColor: 'rgba(20, 20, 80, 0.8)',
                                    p: 1,
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'yellow',
                                        textAlign: 'center',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    TIN TỨC: CAM KẾT HỖ TRỢ VẮC XIN CHO NƯỚC
                                    NGHÈO
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Text Description */}
                    <Grid item xs={12} sm={4} md={4}>
                        <Box sx={{ pl: { sm: 2, md: 3 } }}>
                            <Typography
                                variant="h4"
                                component="h3"
                                fontWeight="bold"
                                gutterBottom
                                sx={{
                                    fontSize: { xs: '1.5rem', md: '2rem' },
                                    color: 'white',
                                    fontFamily: 'Poppins, sans-serif',
                                }}
                            >
                                {currentContent.title}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: lightTextColor,
                                    lineHeight: 1.7,
                                    fontFamily: 'Poppins, sans-serif',
                                }}
                            >
                                {currentContent.description}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}

export default PurposeShowcase
