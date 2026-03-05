import { useEffect, useState } from 'react'
import { RelatedOutput } from 'src/features/core-feature-popup/ProjectPopup/BaseComponent/RelatedOutput'
import { getTextContent } from 'src/utils/ProcessTriggerPopup/TextService'
import { PipelineProgress } from '../../types'

type TextState<T> = {
    data: T | null
    isLoading: boolean
    error: string | null
}

interface AssetState {
    originalText: TextState<string>
}

interface TextGenerationResultDisplayProps {
    progressData: PipelineProgress
}

export const TextGenerationResultDisplay = ({
    progressData,
}: TextGenerationResultDisplayProps) => {
    const [assets, setAssets] = useState<AssetState>({
        originalText: {
            data: null,
            isLoading: true,
            error: null,
        },
    })

    useEffect(() => {
        let isMounted = true

        const fetchOriginalText = async () => {
            if (isMounted) {
                setAssets({
                    originalText: {
                        data: null,
                        isLoading: true,
                        error: null,
                    },
                })
            }

            if (!progressData.original_transcription_id) {
                if (isMounted) {
                    setAssets({
                        originalText: {
                            data: null,
                            isLoading: false,
                            error: 'Missing original transcription ID',
                        },
                    })
                }
                return
            }

            try {
                const textContent = await getTextContent(
                    progressData.original_transcription_id,
                ).then((res) => res[1])

                if (isMounted) {
                    setAssets({
                        originalText: {
                            data: textContent,
                            isLoading: false,
                            error: null,
                        },
                    })
                }
            } catch (error) {
                if (isMounted) {
                    setAssets({
                        originalText: {
                            data: null,
                            isLoading: false,
                            error:
                                error instanceof Error
                                    ? error.message
                                    : 'An unknown error occurred',
                        },
                    })
                }
            }
        }

        fetchOriginalText()

        return () => {
            isMounted = false
        }
    }, [progressData.original_transcription_id])

    return (
        <RelatedOutput
            childrenData={[
                {
                    type: 'text',
                    props: {
                        displayText: assets.originalText.data || '',
                        textTitle: 'Original Text',
                        isLoading: assets.originalText.isLoading,
                        error: assets.originalText.error,
                    },
                },
            ]}
            splitTwoColumn={false}
        />
    )
}
