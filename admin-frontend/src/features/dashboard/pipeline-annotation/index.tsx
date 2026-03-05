import { Box, Paper, Typography, keyframes } from '@mui/material'
import Grid from '@mui/material/Grid2'

interface CardInfo {
    abbr: string
    label: string
}

const cards: CardInfo[] = [
    { abbr: 'ALL', label: 'All pipelines' },
    { abbr: 'TTS', label: 'Text To Speech' },
    { abbr: 'LS', label: 'Lip Synchronization' },
    { abbr: 'TTT', label: 'Text To Text' },
    { abbr: 'STT', label: 'Speech To Text' },
    { abbr: 'FP', label: 'Full Pipeline' },
]

export default function ThreeTwoGrid() {
    return (
        <Box
            padding={3.5}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                alignItems: 'flex-start',
                background:
                    'linear-gradient(270deg, #f7797d, #FBD786, #C6FFDD)',
                borderRadius: 4,
                animation: `${keyframes`
                0% { transform: translateY(-10px); opacity: 0; }
                100% { transform: translateY(0); opacity: 1; }
            `} 0.5s ease-in-out`,
            }}
        >
            <Typography
                sx={{
                    fontWeight: 600,
                    color: '#0E185F',
                    fontFamily: 'Sora, Poppins, sans-serif',
                    textAlign: 'center',
                    fontSize: '1.3em',
                }}
            >
                Pipeline Annotation
            </Typography>
            <Grid
                container
                spacing={1}
                sx={{
                    paddingX: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexGrow: 1,
                }}
            >
                {cards.map(({ abbr, label }) => (
                    <Grid
                        key={abbr}
                        size={{ xs: 12, sm: 6, md: 3.5 }}
                        sx={{
                            backgroundColor: 'transparent',
                        }}
                    >
                        <Paper
                            elevation={3}
                            sx={{
                                p: 1,
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 2,
                                backgroundColor: 'transparent',
                                boxShadow: 'none',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 3,
                                    width: '100%',
                                    flexGrow: 1,
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: '1em',
                                        color: '#252525',
                                        fontFamily: 'Sora, Poppins, sans-serif',
                                    }}
                                >
                                    {abbr}
                                </Typography>
                                <Typography
                                    sx={{
                                        opacity: 0.75,
                                        fontWeight: 500,
                                        fontSize: '0.9em',
                                        color: 'black',
                                        fontFamily: 'Sora, Poppins, sans-serif',
                                    }}
                                >
                                    {label}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
