import DownloadIcon from '@mui/icons-material/Download' // Assuming download icon is used
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { Box, IconButton, LinearProgress, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import 'react-h5-audio-player/lib/styles.css'

interface AudioPlayerProps {
    audioSrc: string
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc }) => {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    useEffect(() => {
        const audio = audioRef.current

        if (audio) {
            audio.addEventListener('loadedmetadata', () => {
                setDuration(audio.duration)
            })

            audio.addEventListener('timeupdate', () => {
                setCurrentTime(audio.currentTime)
            })

            audio.addEventListener('error', (e) => {
                console.error('Error when playing audio:', e)
            })
        }

        return () => {
            if (audio) {
                audio.removeEventListener('loadedmetadata', () => {})
                audio.removeEventListener('timeupdate', () => {})
                audio.removeEventListener('error', () => {})
            }
        }
    }, [])

    const handlePlayPause = () => {
        if (!audioSrc) return

        const audio = audioRef.current
        if (audio) {
            try {
                if (isPlaying) {
                    audio.pause()
                } else {
                    audio
                        .play()
                        .catch((e) => console.error('Không thể phát audio:', e))
                }
                setIsPlaying(!isPlaying)
            } catch (e) {
                console.error('Lỗi khi thao tác với audio:', e)
            }
        }
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }

    return (
        <Box sx={{ width: '100%', padding: 2, borderRadius: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box display="flex" alignItems="center">
                    <IconButton
                        size="small"
                        sx={{ padding: '0px' }}
                        onClick={handlePlayPause}
                        disabled={!audioSrc}
                    >
                        {isPlaying ? (
                            <PauseIcon
                                sx={{
                                    color: (theme) =>
                                        theme.palette.text.secondary,
                                }}
                            />
                        ) : (
                            <PlayArrowIcon
                                sx={{
                                    color: (theme) =>
                                        theme.palette.text.secondary,
                                }}
                            />
                        )}
                    </IconButton>

                    <Typography
                        variant="body2"
                        sx={{
                            marginLeft: 0.5,
                            fontFamily: 'Poppins, sans-serif',
                        }}
                    >
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        marginTop: '4px',
                        boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.4)',
                        borderRadius: '4px',
                    }}
                >
                    <LinearProgress
                        variant="determinate"
                        value={(currentTime / duration) * 100}
                    />
                </Box>
            </Box>

            <audio ref={audioRef} src={audioSrc} />
        </Box>
    )
}

export const CustomAudioPlayer = ({
    audioSrc,
    audioTitle,
    customizeSx,
    sourceType,
    disableDownload = false,
}: {
    audioSrc: string
    audioTitle: string
    customizeSx?: object
    sourceType: 'audio' | 'video'
    disableDownload?: boolean
}) => {
    return (
        <Box
            sx={{
                backgroundColor: (theme) => theme.palette.tertiary.main,
                padding: '20px',
                borderRadius: '20px',
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'visible',
                ...customizeSx,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px',
                }}
            >
                {/* Tiêu đề */}
                <Typography
                    variant="body1"
                    sx={{
                        fontWeight: '600',
                        fontFamily: 'Poppins, sans-serif',
                        margin: 0,
                        color: (theme) => theme.palette.primary.main,
                    }}
                >
                    {audioTitle}
                </Typography>
                {/* Nút tải về */}
                {!disableDownload && (
                    <IconButton
                        size="small"
                        sx={{
                            borderRadius: '10px',
                            padding: '5px',
                            backgroundColor: (theme) =>
                                theme.palette.action.active,
                            color: 'white',
                            '&:hover': {
                                backgroundColor: (theme) =>
                                    theme.palette.action.hover,
                            },
                        }}
                        href={audioSrc}
                        download
                    >
                        <DownloadIcon />
                    </IconButton>
                )}
            </Box>

            {sourceType === 'audio' ? (
                <>
                    {/* Biểu tượng nốt nhạc */}
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                        <MusicNoteIcon
                            sx={{ fontSize: '60px', color: '#6D6D6D' }}
                        />
                    </Box>

                    {/* Trình phát âm thanh */}
                    <AudioPlayer audioSrc={audioSrc} />
                </>
            ) : (
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        paddingTop: '56.25%', // 16:9 aspect ratio (height/width * 100)
                        backgroundColor: 'black', // Optional: background for empty areas
                        borderRadius: '10px',
                    }}
                >
                    <video
                        src={audioSrc}
                        controls
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            borderRadius: '10px',
                        }}
                    />
                </Box>
            )}
        </Box>
    )
}
