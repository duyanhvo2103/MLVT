import React, { useEffect, useState } from 'react'
import { NavInfo } from 'src/types/Project'
import { getOneVideoById } from '../../../../api/video.api'
import { InfoNav } from '../BaseComponent/InfomationNavBar'
import { OriginalVideo } from '../BaseComponent/OriginalVideo'

interface ContentProps {
    videoId: number
    hideNavBar?: boolean
}

export const RawVideoContent: React.FC<ContentProps> = ({
    videoId,
    hideNavBar = false,
}) => {
    const [videoUrl, setVideoUrl] = useState<string | null>(null)
    const [navInfo, setNavInfo] = useState<NavInfo>({
        created_at: 'none-detected',
        language: 'none-detected',
    })

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const response = await getOneVideoById(videoId)
                setVideoUrl(response.video_url.split('?')[0])
                setNavInfo({
                    created_at: new Date(response.video.created_at),
                    language: 'None-detected',
                })
            } catch (error) {
                console.error('Error fetching video URL:', error)
            }
        }

        fetchVideoData()
    }, [videoId])

    return (
        <>
            {!hideNavBar && <InfoNav CreatedAt={navInfo.created_at} />}
            <OriginalVideo videoUrl={videoUrl}></OriginalVideo>
        </>
    )
}
