import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { NavInfo } from 'src/types/Project'
import { getLanguageFromCode } from 'src/utils/ProcessTriggerPopup/VideoPopup.utils'
import { getAudioById } from '../../../../api/audio.api'
import { InfoNav } from '../BaseComponent/InfomationNavBar'
import { CustomAudioPlayer } from '../BaseComponent/RelatedOutput/CustomizedVideoBox'

interface ContentProps {
    audioId: number
    hideNavBar?: boolean
}

export const RawAudioContent: React.FC<ContentProps> = ({
    audioId,
    hideNavBar = false,
}) => {
    const [audioUrl, setAudioUrl] = useState<string | null>(null)
    const [navInfo, setNavInfo] = useState<NavInfo>({
        created_at: 'none-detected',
        language: 'none-detected',
    })

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const response = await getAudioById(audioId)
                setAudioUrl(response.download_url.split('?')[0])
                setNavInfo({
                    created_at: new Date(response.audio.created_at),
                    language: getLanguageFromCode(response.audio.lang),
                })
            } catch (error) {
                console.error('Error fetching video URL:', error)
            }
        }

        fetchVideoData()
    }, [audioId])

    return (
        <>
            {!hideNavBar && (
                <InfoNav
                    CreatedAt={navInfo.created_at}
                    Language={navInfo.language}
                />
            )}

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '20px',
                    padding: '10px',
                    paddingTop: '0',
                }}
            >
                <CustomAudioPlayer
                    audioSrc={audioUrl || ''}
                    audioTitle={'Raw Audio'}
                    sourceType="audio"
                    customizeSx={{ width: '60%', height: '100%' }}
                    disableDownload={true}
                />
            </Box>
        </>
    )
}
