import { Box } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { NavInfo } from 'src/types/Project'
import { getLanguageFromCode } from 'src/utils/ProcessTriggerPopup/VideoPopup.utils'
import { getAudioById } from '../../../../api/audio.api'
import { getOneVideoById } from '../../../../api/video.api'
import { FullPipelineProject } from '../../../../types/Project'
import { getTextContent } from '../../../../utils/ProcessTriggerPopup/TextService'
import ChangeViewBox from '../../ProcessTriggerPopup/BaseComponent/ChangeView'
import { InfoNav } from '../BaseComponent/InfomationNavBar'
import { MainProjectOutput } from '../BaseComponent/MainProjectOutput'
import { OriginalVideo } from '../BaseComponent/OriginalVideo'
import { RelatedOutput } from '../BaseComponent/RelatedOutput'

interface ContentProps {
    inputProject: FullPipelineProject
}

export const FullPipelineContent: React.FC<ContentProps> = ({
    inputProject,
}) => {
    const [viewState, setViewState] = useState<
        'original' | 'translated video' | 'related output'
    >('original')
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [videoUrl, setVideoUrl] = useState<string | null>(null)
    const [resultVideoUrl, setResultVideoUrl] = useState<string | null>(null)
    const [videoStatus, setVideoStatus] = useState<string | null>(null)
    const [extractedText, setExtractedText] = useState<string | null>(null)
    const [translatedText, setTranslatedText] = useState<string | null>(null)
    const [translatedAudio, setTranslatedAudio] = useState<string | null>(null)
    const [navInfo, setNavInfo] = useState<NavInfo>({
        created_at: inputProject.createdAt,
        language: 'none-detected',
    })

    useEffect(() => {
        const fetchVideoData = async () => {
            const [
                originalVideo,
                videoResult,
                extractedTextResult,
                translatedTextResult,
                audioResult,
            ] = await Promise.allSettled([
                getOneVideoById(inputProject.original_videoId),
                getOneVideoById(inputProject.generated_videoId),
                getTextContent(inputProject.extracted_textId),
                getTextContent(inputProject.translated_textId),
                getAudioById(inputProject.translated_audioId),
            ])

            if (originalVideo.status === 'fulfilled') {
                setVideoUrl(originalVideo.value.video_url.split('?')[0])
            } else {
                console.error(
                    'FullPipelineContent get original video failed:',
                    originalVideo.reason,
                )
            }

            if (videoResult.status === 'fulfilled') {
                setResultVideoUrl(videoResult.value.video_url.split('?')[0])
                setImageUrl(videoResult.value.image_url.split('?')[0])
                setVideoStatus(videoResult.value.video.status)
            } else {
                console.error(
                    'FullPipelineContent get result video failed:',
                    videoResult.reason,
                )
            }

            if (extractedTextResult.status === 'fulfilled') {
                setExtractedText(extractedTextResult.value[1])
                setNavInfo((prev) => ({
                    ...prev,
                    language: getLanguageFromCode(
                        extractedTextResult.value[0].lang,
                    ),
                }))
            } else {
                console.error(
                    'FullPipelineContent getTextContent (extracted) failed:',
                    extractedTextResult.reason,
                )
            }

            if (translatedTextResult.status === 'fulfilled') {
                setTranslatedText(translatedTextResult.value[1])
            } else {
                console.error(
                    'FullPipelineContent getTextContent (translated) failed:',
                    translatedTextResult.reason,
                )
            }

            if (audioResult.status === 'fulfilled') {
                setTranslatedAudio(audioResult.value.download_url.split('?')[0])
            } else {
                console.error(
                    'FullPipelineContent get audioResult failed:',
                    audioResult.reason,
                )
            }
        }

        fetchVideoData()
    }, [inputProject])

    const changeViewState = (view: string) => {
        if (['original', 'translated video', 'related output'].includes(view)) {
            setViewState(
                view as 'original' | 'translated video' | 'related output',
            )
        }
    }

    const Views = useMemo(
        () => [
            {
                text: 'ORIGINAL VIDEO',
                viewState: 'original',
                component: <OriginalVideo videoUrl={videoUrl} />,
            },
            {
                text: 'TRANSLATED VIDEO',
                viewState: 'translated video',
                component: (
                    <MainProjectOutput
                        imageUrl={imageUrl}
                        videoUrl={resultVideoUrl}
                        status={videoStatus || 'incomplete'}
                    />
                ),
            },
            {
                text: 'RELATED OUTPUT',
                viewState: 'related output',
                component: (
                    <RelatedOutput
                        splitTwoColumn={true}
                        childrenData={[
                            {
                                type: 'audio/video',
                                props: {
                                    audioSrc: videoUrl ? videoUrl : '',
                                    audioTitle: 'Original Audio',
                                    sourceType: 'audio',
                                },
                            },
                            {
                                type: 'text',
                                props: {
                                    textTitle: 'Original Text',
                                    displayText: extractedText
                                        ? extractedText
                                        : '',
                                },
                            },
                            {
                                type: 'audio/video',
                                props: {
                                    audioSrc: translatedAudio
                                        ? translatedAudio
                                        : '',
                                    audioTitle: 'Processed Audio',
                                    sourceType: 'audio',
                                },
                            },
                            {
                                type: 'text',
                                props: {
                                    textTitle: 'Processed Text',
                                    displayText: translatedText
                                        ? translatedText
                                        : '',
                                },
                            },
                        ]}
                    />
                ),
            },
        ],
        [
            resultVideoUrl,
            imageUrl,
            videoUrl,
            extractedText,
            translatedAudio,
            translatedText,
            videoStatus,
        ],
    )

    const activeView = Views.find((view) => view.viewState === viewState)
    const ActiveComponent = activeView?.component || null

    return (
        <Box
            sx={{
                overflowY: 'auto',
                minHeight: '35rem',
            }}
        >
            <InfoNav
                CreatedAt={navInfo.created_at}
                Language={navInfo.language}
            />
            <Box
                sx={{
                    mt: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <Box paddingX={1}>
                    <ChangeViewBox
                        Views={Views}
                        setViewState={changeViewState}
                    />
                </Box>
                {ActiveComponent}
            </Box>
        </Box>
    )
}
