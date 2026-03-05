import React, { useCallback, useState } from 'react'
import UploadNotification from 'src/components/UploadNotification'
import { useGetUserDetails } from 'src/hooks/useGetUserDetails'
import { TextFileType } from 'src/types/FileType'
import { uploadAudio } from 'src/utils/ProcessTriggerPopup/AudioService'
import { generateVoice } from 'src/utils/ProcessTriggerPopup/PipelineService'
import { uploadText } from 'src/utils/ProcessTriggerPopup/TextService'
import { getLanguageCode } from 'src/utils/ProcessTriggerPopup/VideoPopup.utils'
import { BasePopup } from '../../BasePopup'
import { DialogContent, VoiceGenerationData } from './PopupContent'

interface NotificationState {
    isOpen: boolean
    status: 'success' | 'fail' | 'loading'
    content: string | null
}

interface VoiceGenerationPopupProps {
    isOpen: boolean
    onClose: () => void
}

export const VoiceGenerationPopup: React.FC<VoiceGenerationPopupProps> = ({
    isOpen,
    onClose,
}) => {
    const [notification, setNotification] = useState<NotificationState>({
        isOpen: false,
        status: 'loading',
        content: null,
    })

    const { data: userDetails } = useGetUserDetails()
    const userId = userDetails?.user.id.toString() || ''

    const handleCloseNotification = () => {
        setNotification({ ...notification, isOpen: false })
    }

    const handleStartGeneration = useCallback(
        async (data: VoiceGenerationData) => {
            onClose()
            setNotification({
                isOpen: true,
                status: 'loading',
                content: 'Preparing generation request...',
            })

            try {
                // --- Step 1: Get the Text ID ---
                const textIdPromise: Promise<number> = (async () => {
                    if (data.textLanguage) {
                        data.textData.lang = getLanguageCode(data.textLanguage)
                    }
                    if (
                        data.textViewState === 'upload' &&
                        data.deviceTextFile
                    ) {
                        return uploadText(
                            data.deviceTextFile,
                            data.textData,
                            TextFileType.PlainText,
                        )
                    }
                    if (data.textViewState === 'enter text' && data.inputText) {
                        const textBlob = new Blob([data.inputText], {
                            type: 'text/plain',
                        })
                        const textFile = new File([textBlob], 'input.txt', {
                            type: 'text/plain',
                        })
                        const newFileName = `${userId}_${Math.floor(Date.now() / 1000)}`
                        data.textData.file_name = newFileName
                        return uploadText(
                            textFile,
                            data.textData,
                            TextFileType.PlainText,
                        )
                    }
                    if (data.textViewState === 'browse' && data.MLVTText) {
                        return data.MLVTText.id
                    }
                    throw new Error('No valid text source provided.')
                })()

                // --- Step 2: Get the Voice Source (either an Audio ID or a build-in voice name) ---
                const voiceSourcePromise: Promise<number | string> =
                    (async () => {
                        if (
                            data.audioViewState === 'custom' &&
                            data.deviceAudioFile
                        ) {
                            return uploadAudio(
                                data.deviceAudioFile,
                                data.audioData,
                            )
                        }
                        if (
                            data.audioViewState === 'browse' &&
                            data.MLVTVoice
                        ) {
                            return data.MLVTVoice.id
                        }
                        throw new Error('No valid voice source provided.')
                    })()

                setNotification((prev) => ({
                    ...prev,
                    content: 'Uploading assets...',
                }))

                // --- Step 3: Await both promises in parallel ---
                const [textId, voiceSource] = await Promise.all([
                    textIdPromise,
                    voiceSourcePromise,
                ])

                if (!textId || !voiceSource) {
                    throw new Error(
                        'Failed to get valid IDs for text or voice.',
                    )
                }

                // --- Step 4: Call the pipeline service ---
                setNotification((prev) => ({
                    ...prev,
                    content: 'Generating voice...',
                }))

                let audioId: number
                if (typeof voiceSource === 'number') {
                    // voiceSource is an existing audio file ID
                    audioId = await generateVoice(textId, {
                        audioId: voiceSource,
                    })
                } else {
                    // build-in voices aren’t supported by this endpoint yet
                    throw new Error(
                        `Build-in voice "${voiceSource}" not supported for TTS.`,
                    )
                }

                setNotification({
                    isOpen: true,
                    status: 'success',
                    content: `Voice generation started! Audio ID: ${audioId}`,
                })
            } catch (error) {
                console.error('Voice generation process failed:', error)
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : 'An unknown error occurred.'
                // --- Step 6: Failure ---
                setNotification({
                    isOpen: true,
                    status: 'fail',
                    content: `Process failed: ${errorMessage}`,
                })
            }
        },
        [onClose, userId],
    )

    return (
        <>
            <BasePopup
                title="Voice Generation"
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
                title="Voice Generation Status"
            />
        </>
    )
}
