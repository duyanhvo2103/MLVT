import React, { useCallback } from 'react'
import { BasePopup } from '../../BasePopup'
import { DialogContent, GenerateLipsyncData } from './PopupContent'

import UploadNotification from 'src/components/UploadNotification'
import { uploadAudio } from 'src/utils/ProcessTriggerPopup/AudioService'
import { lipSync } from 'src/utils/ProcessTriggerPopup/PipelineService'
import { uploadVideo } from 'src/utils/ProcessTriggerPopup/VideoService'

interface NotificationState {
    isOpen: boolean
    status: 'success' | 'fail' | 'loading'
    content: string | null
}

interface LipsyncPopupProps {
    isOpen: boolean
    onClose: () => void
}

export const LipsyncPopup: React.FC<LipsyncPopupProps> = ({
    isOpen,
    onClose,
}) => {
    const [notification, setNotification] = React.useState<NotificationState>({
        isOpen: false,
        status: 'loading',
        content: null,
    })
    const handleCloseNotification = () => {
        setNotification({ ...notification, isOpen: false })
    }
    const handleStartGeneration = useCallback(
        async (data: GenerateLipsyncData) => {
            // 1. Immediately close the input popup
            onClose()

            // 2. Open the notification popup in a 'loading' state
            setNotification({
                isOpen: true,
                status: 'loading',
                content: 'Preparing files...',
            })

            try {
                // Logic to get videoId
                const videoPromise = (async (): Promise<number> => {
                    if (data.videoViewState === 'upload' && data.deviceVideo) {
                        return await uploadVideo(
                            data.deviceVideo,
                            data.videoData,
                        )
                    }
                    if (data.videoViewState === 'browse' && data.MLVTVideo) {
                        return data.MLVTVideo.id
                    }
                    throw new Error('No valid video source provided.')
                })()

                // Logic to get audioId
                const audioPromise = (async (): Promise<number> => {
                    if (data.audioViewState === 'upload' && data.deviceAudio) {
                        return await uploadAudio(
                            data.deviceAudio,
                            data.audioData,
                        )
                    }
                    if (data.audioViewState === 'browse' && data.MLVTAudio) {
                        return data.MLVTAudio.id
                    }

                    throw new Error('No valid audio source provided.')
                })()

                setNotification((prev) => ({
                    ...prev,
                    content: 'Uploading files...',
                }))

                // 3. Upload video and audio in parallel
                const [videoId, audioId] = await Promise.all([
                    videoPromise,
                    audioPromise,
                ])

                if (!videoId || !audioId) {
                    throw new Error(
                        'Failed to get a valid ID for video or audio.',
                    )
                }

                // 4. Start the lipsync process
                setNotification((prev) => ({
                    ...prev,
                    content: 'Uploading...',
                }))
                await lipSync(videoId, audioId)

                // 5. If everything succeeds, update notification to 'success'
                setNotification({
                    isOpen: true,
                    status: 'success',
                    content: 'Upload data successfully! 🎉',
                })
            } catch (error) {
                console.error('Upload failed:', error)
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : 'An unknown error occurred.'
                // 6. If anything fails, update notification to 'fail'
                setNotification({
                    isOpen: true,
                    status: 'fail',
                    content: `Process failed: ${errorMessage}`,
                })
            }
        },
        [onClose],
    )
    return (
        <>
            <BasePopup
                title="Lip Synchronization"
                isOpen={isOpen}
                onClose={onClose}
                statusChip={null}
                childComponent={
                    <DialogContent onGenerate={handleStartGeneration} />
                }
            />
            <UploadNotification
                isOpen={notification.isOpen}
                status={notification.status}
                onClose={handleCloseNotification}
                content={notification.content}
                title="Lip Sync Status"
            />
        </>
    )
}
