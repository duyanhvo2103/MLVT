import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { InfoNav } from '../BaseComponent/InfomationNavBar'
import { TextView } from '../BaseComponent/RelatedOutput/CustomizedTextBox'
// import { Text } from '../../../types/Response/Text';
import { NavInfo } from 'src/types/Project'
import { getLanguageFromCode } from 'src/utils/ProcessTriggerPopup/VideoPopup.utils'
import { getTextContent } from '../../../../utils/ProcessTriggerPopup/TextService'

interface ContentProps {
    textId: number
    hideNavBar?: boolean
    customSx?: object
    centerTitle?: boolean
    hideDownloadButton?: boolean
}

export const RawTextContent: React.FC<ContentProps> = ({
    textId,
    hideNavBar = false,
    centerTitle = false,
    customSx,
    hideDownloadButton = false,
}) => {
    const [textContent, setTextContent] = useState<string>(
        'Some text will be display here',
    )
    const [navInfo, setNavInfo] = useState<NavInfo>({
        created_at: 'none-detected',
        language: 'none-detected',
    })
    // const [textInfomation, setTextInfomation] = useState<Text | null>(null);

    useEffect(() => {
        const fetchTextData = async () => {
            try {
                const [textInfo, content] = await getTextContent(textId)
                // setTextInfomation(information);
                setTextContent(content)
                setNavInfo({
                    created_at: new Date(textInfo.created_at),
                    language: getLanguageFromCode(textInfo.lang),
                })
            } catch (error) {
                console.error('Error fetching video URL:', error)
            }
        }

        fetchTextData()
    }, [textId])

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
                    height: '90%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '20px',
                    padding: '10px',
                    paddingTop: '0',
                }}
            >
                <TextView
                    displayText={textContent}
                    textTitle="Text"
                    customizeSx={customSx}
                    centerTitle={centerTitle}
                    disableDownload={hideDownloadButton}
                />
            </Box>
        </>
    )
}
