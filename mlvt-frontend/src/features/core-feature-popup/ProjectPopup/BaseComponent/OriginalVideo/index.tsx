import { Box } from '@mui/material'
import { useEffect } from 'react'

import 'react-h5-audio-player/lib/styles.css'

export const OriginalVideo = ({ videoUrl }: { videoUrl: string | null }) => {
    useEffect(() => {
        console.log('Video url: ', videoUrl)
    })
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                paddingTop: '56.25%',
                backgroundColor: 'black',
                borderRadius: '10px',
                marginTop: '20px',
            }}
        >
            {videoUrl ? (
                <video
                    controls
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        borderRadius: '10px',
                    }}
                >
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <p>Loading video...</p>
            )}
        </Box>
    )
}
