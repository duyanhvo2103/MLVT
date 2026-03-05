import React, { useCallback } from 'react'
import { BasePopup } from '../../BasePopup'
import { DialogContent, TextGenerationData } from './PopupContent'

import UploadNotification from 'src/components/UploadNotification'
import { generateText } from 'src/utils/ProcessTriggerPopup/PipelineService'
import { uploadVideo } from 'src/utils/ProcessTriggerPopup/VideoService'

interface NotificationState {
    isOpen: boolean
    status: 'success' | 'fail' | 'loading'
    content: string | null
}
interface TextGenerationPopupProps {
    isOpen: boolean
    onClose: () => void
}

export const TextGenerationPopup: React.FC<TextGenerationPopupProps> = ({
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
        async (data: TextGenerationData) => {
            onClose()
            setNotification({
                isOpen: true,
                status: 'loading',
                content: 'Uploading files...',
            })

            try {
                // Logic to get videoId
                let videoId: number | undefined
                if (data.viewState === 'upload' && data.deviceFile) {
                    videoId = await uploadVideo(data.deviceFile, data.fileData)
                } else if (data.viewState === 'browse' && data.MLVTVideo) {
                    videoId = data.MLVTVideo.id
                } else if (data.viewState === 'url') {
                    throw new Error('URL upload not implemented yet.')
                }

                if (!videoId || !data.sourceLanguage) {
                    throw new Error(
                        'Missing required data for text generation.',
                    )
                }
                await generateText(videoId, data.sourceLanguage)

                setNotification({
                    isOpen: true,
                    status: 'success',
                    content: 'Upload data successfully! 🎉',
                })
            } catch (error) {
                setNotification({
                    isOpen: true,
                    status: 'fail',
                    content: `Text Generation process failed`,
                })
            }
        },
        [onClose],
    )
    return (
        <>
            <BasePopup
                title="Text Generation"
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
                content={notification.content}
                onClose={handleCloseNotification}
                title="Text Generation Status"
            />
        </>
    )
}
