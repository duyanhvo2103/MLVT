import React, { useCallback, useState } from 'react'
import { DialogContent, GenerateVideoData } from './PopupContent'

import UploadNotification from 'src/components/UploadNotification'
import { translateVideo } from '../../../../utils/ProcessTriggerPopup/PipelineService'
import { uploadVideo } from '../../../../utils/ProcessTriggerPopup/VideoService'
import { BasePopup } from '../../BasePopup'

interface NotificationState {
    isOpen: boolean
    status: 'success' | 'fail' | 'loading'
    content: string | null
}
interface VideoTranslationPopupProps {
    isOpen: boolean
    onClose: () => void
}

export const VideoTranslationPopup: React.FC<VideoTranslationPopupProps> = ({
    isOpen,
    onClose,
}) => {
    const [notification, setNotification] = useState<NotificationState>({
        isOpen: false,
        status: 'loading',
        content: null,
    })
    const handleCloseNotification = () => {
        setNotification({ ...notification, isOpen: false })
    }
    const handleStartGeneration = useCallback(
        async (data: GenerateVideoData) => {
            onClose()
            setNotification({
                isOpen: true,
                status: 'loading',
                content: 'Uploading video...',
            })

            try {
                let videoId: number | undefined
                if (data.viewState === 'upload' && data.deviceFile) {
                    videoId = await uploadVideo(data.deviceFile, data.fileData)
                } else if (data.viewState === 'browse' && data.MLVTVideo) {
                    videoId = data.MLVTVideo.id
                } else if (data.viewState === 'url') {
                    throw new Error('URL upload not implemented yet.')
                }

                if (!videoId || !data.sourceLanguage || !data.targetLanguage) {
                    throw new Error('Missing required data for translation.')
                }

                await translateVideo(
                    videoId,
                    data.sourceLanguage,
                    data.targetLanguage,
                )

                setNotification({
                    isOpen: true,
                    status: 'success',
                    content: null,
                })
            } catch (error) {
                console.error('Video translation process failed:', error)
                setNotification({
                    isOpen: true,
                    status: 'fail',
                    content: null,
                })
            }
        },
        [onClose],
    )
    return (
        <>
            <BasePopup
                title="Video Translation"
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
                title="Video Translation Status"
            />
        </>
    )
}
