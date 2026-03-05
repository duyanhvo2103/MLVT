import { Box } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { getLanguageFromCode } from 'src/utils/ProcessTriggerPopup/VideoPopup.utils'
import { getTextFileContent } from '../../../../api/aws.api'
import { getTextById } from '../../../../api/text.api'
import { getOneVideoById } from '../../../../api/video.api'
import { NavInfo, TextGenerationProject } from '../../../../types/Project'
import ChangeViewBox from '../../ProcessTriggerPopup/BaseComponent/ChangeView'
import { InfoNav } from '../BaseComponent/InfomationNavBar'
import { OriginalVideo } from '../BaseComponent/OriginalVideo'
import { RelatedOutput } from '../BaseComponent/RelatedOutput'

interface ContentProps {
    inputProject: TextGenerationProject
}

export const TextGenerationContent: React.FC<ContentProps> = ({
    inputProject,
}) => {
    const [viewState, setViewState] = useState<
        'translated video' | 'related output'
    >('translated video')
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [text, setText] = useState<string | null>(null)
    const [videoUrl, setVideoUrl] = useState<string | null>(null)
    const [navInfo, setNavInfo] = useState<NavInfo>({
        created_at: inputProject.createdAt,
        language: 'none-detected',
    })

    useEffect(() => {
        const fetchVideoData = async () => {
            const videoPromise = getOneVideoById(inputProject.original_videoId)
            const textUrlPromise = getTextById(inputProject.extracted_textId)

            try {
                const videoResponse = await videoPromise
                setVideoUrl(videoResponse.video_url.split('?')[0])
                setImageUrl(videoResponse.image_url.split('?')[0])
            } catch (error) {
                console.error('Error fetching video URL:', error)
            }

            try {
                const textInfo = await textUrlPromise
                const text = await getTextFileContent(
                    textInfo.data.download_url,
                )
                setNavInfo((prev) => ({
                    ...prev,
                    language: getLanguageFromCode(
                        textInfo.data.transcription.lang,
                    ),
                }))
                setText(text)
            } catch (error) {
                console.error('Error fetching text content:', error)
            }
        }

        fetchVideoData()
    }, [inputProject, videoUrl, imageUrl])

    const changeViewState = (view: string) => {
        if (['translated video', 'related output'].includes(view)) {
            setViewState(view as 'translated video' | 'related output')
        }
    }

    const Views = useMemo(
        () => [
            {
                text: 'ORIGINAL VIDEO/AUDIO',
                viewState: 'translated video',
                component: <OriginalVideo videoUrl={videoUrl} />,
            },
            {
                text: 'TEXT GENERATION OUTPUT',
                viewState: 'related output',
                component: (
                    <RelatedOutput
                        splitTwoColumn={false}
                        childrenData={[
                            {
                                type: 'text',
                                props: {
                                    textTitle: "Text Generation's result",
                                    displayText: text || 'No output text',
                                },
                            },
                        ]}
                    />
                ),
            },
        ],
        [videoUrl, text],
    )

    const activeView = Views.find((view) => view.viewState === viewState)
    const ActiveComponent = activeView?.component || null

    return (
        <>
            <InfoNav
                CreatedAt={navInfo.created_at}
                Language={navInfo.language}
            />
            <Box
                sx={{
                    mt: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    mb: '15px',
                }}
            >
                <Box paddingX={1} sx={{ marginBottom: '20px' }}>
                    <ChangeViewBox
                        Views={Views}
                        setViewState={changeViewState}
                    />
                </Box>
                {ActiveComponent}
            </Box>
        </>
    )
}
