import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { getOneVideoById } from 'src/api/video.api'
import { PipelineProgress } from '../../types'

type VideoState<T> = {
    data: T | null
    isLoading: boolean
    error: string | null
}

interface AssetState {
    lipSyncVideo: VideoState<string>
}

interface LipSynchronizationResultDisplayProps {
    progressData: PipelineProgress
}
export const LipSynchronizationResultDisplay = ({
    progressData,
}: LipSynchronizationResultDisplayProps) => {
    const [assets, setAssets] = useState<AssetState>({
        lipSyncVideo: {
            data: null,
            isLoading: true,
            error: null,
        },
    })

    useEffect(() => {
        let isMounted = true

        const fetchLipSyncVideo = async () => {
            if (isMounted) {
                setAssets({
                    lipSyncVideo: {
                        data: null,
                        isLoading: true,
                        error: null,
                    },
                })
            }

            if (!progressData.progressed_video_id) {
                if (isMounted) {
                    setAssets({
                        lipSyncVideo: {
                            data: null,
                            isLoading: false,
                            error: 'Missing lip sync video ID',
                        },
                    })
                }
                return
            }

            try {
                const videoResult = await (progressData.progressed_video_id
                    ? getOneVideoById(progressData.progressed_video_id)
                    : undefined)
                if (!videoResult || !videoResult.video_url) {
                    throw new Error('Video URL not found')
                }
                console.log('Lip sync video fetched:', videoResult)
                console.log('Lip sync video URL:', videoResult.video_url)

                if (isMounted) {
                    setAssets({
                        lipSyncVideo: {
                            data: videoResult.video_url,
                            isLoading: false,
                            error: null,
                        },
                    })
                }
            } catch (error) {
                if (isMounted) {
                    setAssets({
                        lipSyncVideo: {
                            data: null,
                            isLoading: false,
                            error: 'Failed to fetch lip sync video',
                        },
                    })
                }
            }
        }

        fetchLipSyncVideo()

        return () => {
            isMounted = false
        }
    }, [progressData.progressed_video_id])

    return (
        <Box display={'flex'} width={'100%'} padding={2} borderRadius={4}>
            {assets.lipSyncVideo.isLoading ? (
                <p>Loading...</p>
            ) : assets.lipSyncVideo.error ? (
                <p>Error: {assets.lipSyncVideo.error}</p>
            ) : (
                assets.lipSyncVideo.data && (
                    <video
                        src={assets.lipSyncVideo.data}
                        controls
                        style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
                    />
                )
            )}
        </Box>
    )
}
