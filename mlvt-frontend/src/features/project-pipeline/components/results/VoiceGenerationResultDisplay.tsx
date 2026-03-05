import { Alert, Box, CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { getAudioById } from 'src/api/audio.api'
import { PipelineProgress } from '../../types'

type AssetState<T> = {
    data: T | null
    isLoading: boolean
    error: string | null
}

interface VoiceGenerationResultDisplayProps {
    progressData: PipelineProgress
}

export const VoiceGenerationResultDisplay = ({
    progressData,
}: VoiceGenerationResultDisplayProps) => {
    const [audioUrl, setAudioUrl] = useState<AssetState<string>>({
        data: null,
        isLoading: true,
        error: null,
    })

    useEffect(() => {
        let isMounted = true

        const fetchAudio = async () => {
            if (isMounted) {
                setAudioUrl({
                    data: null,
                    isLoading: true,
                    error: null,
                })
            }

            if (!progressData.audio_id) {
                if (isMounted) {
                    setAudioUrl({
                        data: null,
                        isLoading: false,
                        error: 'Missing audio ID',
                    })
                }
                return
            }

            try {
                const audioResult = await getAudioById(progressData.audio_id)
                if (isMounted) {
                    setAudioUrl({
                        data: audioResult.download_url,
                        isLoading: false,
                        error: null,
                    })
                }
            } catch (error) {
                if (isMounted) {
                    setAudioUrl({
                        data: null,
                        isLoading: false,
                        error: 'Failed to fetch audio',
                    })
                }
            }
        }

        fetchAudio()

        return () => {
            isMounted = false
        }
    }, [progressData.audio_id])

    return (
        <Box display={'flex'} width={'100%'} padding={2} borderRadius={4}>
            {audioUrl.isLoading ? (
                <CircularProgress />
            ) : audioUrl.error ? (
                <Alert severity="error">{audioUrl.error}</Alert>
            ) : (
                <audio
                    controls
                    src={audioUrl.data?.split('?')[0] || undefined}
                    style={{ flex: 1 }}
                />
            )}
        </Box>
    )
}
