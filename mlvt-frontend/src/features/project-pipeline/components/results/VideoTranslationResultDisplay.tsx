import { Alert, Box, CircularProgress, Tab, Tabs } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAudioById } from 'src/api/audio.api'
import { getOneVideoById } from 'src/api/video.api'
import { OriginalVideo } from 'src/features/core-feature-popup/ProjectPopup/BaseComponent/OriginalVideo'
import { RelatedOutput } from 'src/features/core-feature-popup/ProjectPopup/BaseComponent/RelatedOutput'
import { PipelineProgress } from 'src/features/project-pipeline/types'
import { Video } from 'src/types/Response/Video'
import { getTextContent } from 'src/utils/ProcessTriggerPopup/TextService'

// A generic type for managing the state of any fetched asset
type AssetState<T> = {
    data: T | null
    isLoading: boolean
    error: string | null
}

// A structured state to hold all our fetched assets
interface DisplayState {
    video: AssetState<Video>
    originalAudioUrl: AssetState<string>
    translatedAudioUrl: AssetState<string>
    originalText: AssetState<string>
    translatedText: AssetState<string>
}

interface VideoTranslationResultDisplayProps {
    progressData: PipelineProgress
}

const TabPanel = (props: {
    children?: React.ReactNode
    index: number
    value: number
}) => {
    const { children, value, index, ...other } = props
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
        </div>
    )
}

export const VideoTranslationResultDisplay = ({
    progressData,
}: VideoTranslationResultDisplayProps) => {
    const [activeTab, setActiveTab] = useState(0)
    const [assets, setAssets] = useState<DisplayState>({
        video: { data: null, isLoading: true, error: null },
        originalAudioUrl: { data: null, isLoading: true, error: null },
        translatedAudioUrl: { data: null, isLoading: true, error: null },
        originalText: { data: null, isLoading: true, error: null },
        translatedText: { data: null, isLoading: true, error: null },
    })

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue)
    }

    useEffect(() => {
        const fetchAllAssets = async () => {
            const [
                videoResult,
                originalAudioResult,
                translatedAudioResult,
                originalTextResult,
                translatedTextResult,
            ] = await Promise.allSettled([
                progressData.progressed_video_id
                    ? getOneVideoById(progressData.progressed_video_id)
                    : Promise.reject('Missing processed video ID'),

                progressData.original_video_id
                    ? getOneVideoById(progressData.original_video_id).then(
                          (res) => res.video_url,
                      )
                    : Promise.reject('Missing original audio ID'),

                progressData.audio_id
                    ? getAudioById(progressData.audio_id).then(
                          (res) => res.download_url,
                      )
                    : Promise.reject('Missing translated audio ID'),

                progressData.original_transcription_id
                    ? getTextContent(
                          progressData.original_transcription_id,
                      ).then((res) => res[1])
                    : Promise.reject('Missing original transcript ID'),

                progressData.translated_transcription_id
                    ? getTextContent(
                          progressData.translated_transcription_id,
                      ).then((res) => res[1])
                    : Promise.reject('Missing translated transcript ID'),
            ])

            // --- Update state once, after all promises are settled ---
            setAssets({
                video:
                    videoResult.status === 'fulfilled'
                        ? {
                              data: videoResult.value,
                              isLoading: false,
                              error: null,
                          }
                        : {
                              data: null,
                              isLoading: false,
                              error: 'Failed to load video.',
                          },
                originalAudioUrl:
                    originalAudioResult.status === 'fulfilled'
                        ? {
                              data: originalAudioResult.value.split('?')[0],
                              isLoading: false,
                              error: null,
                          }
                        : {
                              data: null,
                              isLoading: false,
                              error: 'Failed to load original audio.',
                          },
                translatedAudioUrl:
                    translatedAudioResult.status === 'fulfilled'
                        ? {
                              data: translatedAudioResult.value.split('?')[0],
                              isLoading: false,
                              error: null,
                          }
                        : {
                              data: null,
                              isLoading: false,
                              error: 'Failed to load translated audio.',
                          },
                originalText:
                    originalTextResult.status === 'fulfilled'
                        ? {
                              data: originalTextResult.value,
                              isLoading: false,
                              error: null,
                          }
                        : {
                              data: null,
                              isLoading: false,
                              error: 'Failed to load original transcript.',
                          },
                translatedText:
                    translatedTextResult.status === 'fulfilled'
                        ? {
                              data: translatedTextResult.value,
                              isLoading: false,
                              error: null,
                          }
                        : {
                              data: null,
                              isLoading: false,
                              error: 'Failed to load translated transcript.',
                          },
            })
        }

        fetchAllAssets()
    }, [progressData])

    return (
        <Box sx={{ width: '100%', mt: 2 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    aria-label="video result tabs"
                >
                    <Tab label="Translated Video" />
                    <Tab label="Assets & Transcript" />
                </Tabs>
            </Box>

            <TabPanel value={activeTab} index={0}>
                {assets.video.isLoading && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            my: 4,
                        }}
                    >
                        <CircularProgress />
                    </Box>
                )}
                {assets.video.error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {assets.video.error}
                    </Alert>
                )}
                {assets.video.data && (
                    <OriginalVideo videoUrl={assets.video.data.video_url} />
                )}
            </TabPanel>

            <TabPanel value={activeTab} index={1}>
                <RelatedOutput
                    splitTwoColumn={true}
                    childrenData={[
                        {
                            type: 'audio/video',
                            props: {
                                audioSrc: assets.originalAudioUrl.data ?? '',
                                audioTitle: 'Original Audio',
                                sourceType: 'audio',
                                isLoading: assets.originalAudioUrl.isLoading,
                                error: assets.originalAudioUrl.error,
                            },
                        },
                        {
                            type: 'audio/video',
                            props: {
                                audioSrc: assets.translatedAudioUrl.data ?? '',
                                audioTitle: 'Translated Audio',
                                sourceType: 'audio',
                                isLoading: assets.translatedAudioUrl.isLoading,
                                error: assets.translatedAudioUrl.error,
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                displayText: assets.originalText.data ?? '',
                                textTitle: 'Original Transcript',
                                isLoading: assets.originalText.isLoading,
                                error: assets.originalText.error,
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                displayText: assets.translatedText.data ?? '',
                                textTitle: 'Translated Transcript',
                                isLoading: assets.translatedText.isLoading,
                                error: assets.translatedText.error,
                            },
                        },
                    ]}
                />
            </TabPanel>
        </Box>
    )
}
