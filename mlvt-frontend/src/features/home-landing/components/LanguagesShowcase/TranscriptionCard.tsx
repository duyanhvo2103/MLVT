import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import RefreshIcon from '@mui/icons-material/Refresh'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined'
import {
    Box,
    Button,
    IconButton,
    Paper,
    Stack,
    Typography,
} from '@mui/material'
import React from 'react'
import AudioWaveform from './AudioWaveForm'

interface TranscriptionCardProps {
    detectedOrSelectedLanguage: string
    text: string
    showTopAudioWave?: boolean
    showBottomAudioWave?: boolean
    topAudioWaveHeights?: number[]
    bottomAudioWaveHeights?: number[]
    isTranslationTarget?: boolean
    sourceLanguage?: string
    targetLanguage?: string
    decorativeLines?: boolean
}

const TranscriptionCard: React.FC<TranscriptionCardProps> = ({
    detectedOrSelectedLanguage,
    text,
    showTopAudioWave = false,
    showBottomAudioWave = false,
    topAudioWaveHeights,
    bottomAudioWaveHeights,
    isTranslationTarget = false,
    sourceLanguage,
    targetLanguage,
    decorativeLines = false,
}) => {
    const cardBgColor = 'rgba(70, 70, 130, 0.3)'
    const cardBorderColor = 'rgba(120, 120, 180, 0.5)'

    return (
        <Stack spacing={2} sx={{ position: 'relative' }}>
            {decorativeLines && (
                <Box
                    sx={{
                        position: 'absolute',
                        left: -20,
                        top: '20%',
                        height: '60%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        '& > div': {
                            width: 4,
                            height: '20%',
                            bgcolor: 'secondary.main',
                            borderRadius: '2px',
                            opacity: 0.7,
                        },
                    }}
                >
                    <div style={{ height: '30%' }} />
                    <div />
                    <div style={{ height: '15%' }} />
                </Box>
            )}

            {showTopAudioWave && (
                <AudioWaveform heights={topAudioWaveHeights} />
            )}

            <Paper
                elevation={3}
                sx={{
                    p: 2.5,
                    bgcolor: cardBgColor,
                    border: `1px solid ${cardBorderColor}`,
                    borderRadius: 3,
                    color: 'white',
                    minHeight: 180,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <Box>
                    <Typography
                        variant="caption"
                        color="grey.400"
                        gutterBottom
                        fontFamily={'Poppins, sans-serif'}
                    >
                        {detectedOrSelectedLanguage}
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                        {text}
                    </Typography>
                </Box>
                <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="flex-start"
                    alignItems="center"
                    mt={2}
                >
                    <IconButton size="small" sx={{ color: 'grey.400' }}>
                        <ContentCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" sx={{ color: 'grey.400' }}>
                        <ShareOutlinedIcon fontSize="small" />
                    </IconButton>
                    <Box flexGrow={1} />
                    <IconButton size="small" sx={{ color: 'grey.400' }}>
                        <VolumeUpOutlinedIcon fontSize="small" />
                    </IconButton>
                </Stack>
            </Paper>

            {isTranslationTarget && sourceLanguage && targetLanguage && (
                <Paper
                    elevation={1}
                    sx={{
                        p: 1,
                        bgcolor: 'rgba(0,0,0,0.2)',
                        borderRadius: 50,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Button
                        variant="text"
                        size="small"
                        sx={{
                            color: 'grey.300',
                            borderRadius: 50,
                            px: 2,
                            fontFamily: 'Poppins, sans-serif',
                            textTransform: 'none',
                        }}
                    >
                        {sourceLanguage}
                    </Button>
                    <IconButton
                        size="small"
                        sx={{
                            color: 'primary.main',
                            bgcolor: 'rgba(255,255,255,0.1)',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                        }}
                    >
                        <RefreshIcon fontSize="small" />
                    </IconButton>
                    <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        sx={{
                            borderRadius: 50,
                            px: 2,
                            boxShadow: 'none',
                            textTransform: 'none',
                            fontFamily: 'Poppins, sans-serif',
                        }}
                    >
                        {targetLanguage}
                    </Button>
                </Paper>
            )}

            {!isTranslationTarget && sourceLanguage && (
                <Paper
                    elevation={1}
                    sx={{
                        p: 1,
                        bgcolor: 'rgba(0,0,0,0.2)',
                        borderRadius: 50,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        maxWidth: 'fit-content',
                    }}
                >
                    <Button
                        variant="text"
                        size="small"
                        sx={{
                            color: 'grey.300',
                            borderRadius: 50,
                            px: 2,
                            textTransform: 'none',
                            fontFamily: 'Poppins, sans-serif',
                        }}
                    >
                        {sourceLanguage}
                    </Button>
                </Paper>
            )}

            {showBottomAudioWave && (
                <AudioWaveform heights={bottomAudioWaveHeights} />
            )}
        </Stack>
    )
}

export default TranscriptionCard
