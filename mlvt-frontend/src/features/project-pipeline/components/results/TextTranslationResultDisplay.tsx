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
    translatedText: TextState<string>
}

interface TextTranslationResultDisplayProps {
    progressData: PipelineProgress
}

export const TextTranslationResultDisplay = ({
    progressData,
}: TextTranslationResultDisplayProps) => {
    const [assets, setAssets] = useState<AssetState>({
        translatedText: {
            data: null,
            isLoading: true,
            error: null,
        },
    })

    useEffect(() => {
        let isMounted = true

        const fetchTranslatedText = async () => {
            if (isMounted) {
                setAssets({
                    translatedText: {
                        data: null,
                        isLoading: true,
                        error: null,
                    },
                })
            }

            if (!progressData.translated_transcription_id) {
                if (isMounted) {
                    setAssets({
                        translatedText: {
                            data: null,
                            isLoading: false,
                            error: 'Missing translated transcription ID',
                        },
                    })
                }
                return
            }

            try {
                const textContent = await getTextContent(
                    progressData.translated_transcription_id,
                ).then((res) => res[1])

                if (isMounted) {
                    setAssets({
                        translatedText: {
                            data: textContent,
                            isLoading: false,
                            error: null,
                        },
                    })
                }
            } catch (error) {
                if (isMounted) {
                    setAssets({
                        translatedText: {
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

        fetchTranslatedText()

        return () => {
            isMounted = false
        }
    }, [progressData.translated_transcription_id])

    return (
        <RelatedOutput
            childrenData={[
                {
                    type: 'text',
                    props: {
                        displayText: assets.translatedText.data || '',
                        textTitle: 'Original Text',
                        isLoading: assets.translatedText.isLoading,
                        error: assets.translatedText.error,
                    },
                },
            ]}
            splitTwoColumn={false}
        />
    )
}
