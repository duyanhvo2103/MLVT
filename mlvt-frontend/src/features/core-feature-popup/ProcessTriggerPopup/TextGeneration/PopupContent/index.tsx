import { Box, Typography } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useGetUserDetails } from 'src/hooks/useGetUserDetails'
import { VideoData } from '../../../../../types/FileData'
import { VideoFileType } from '../../../../../types/FileType'
import { Project, ProjectType, RawVideo } from '../../../../../types/Project'
import { S3Folder } from '../../../../../types/S3FolderStorage'
import { TranslateLanguage } from '../../../../../types/Translation'
import { checkValidGenerate } from '../../../../../utils/ProcessTriggerPopup/CheckValidGenerate'
import { BrowseFile } from '../../BaseComponent/BrowseMLVTFile'
import ChangeViewBox from '../../BaseComponent/ChangeView'
import { GenerateButton } from '../../BaseComponent/GenerateButton'
import { SingleOptionBox } from '../../BaseComponent/SingleOptionBox'
import { UploadFileFromDevice } from '../../BaseComponent/UploadFileFromDevice'

export interface TextGenerationData {
    deviceFile: File | null
    MLVTVideo: RawVideo | null
    sourceLanguage: TranslateLanguage | null
    viewState: 'upload' | 'url' | 'browse'
    fileData: VideoData
}

interface DialogContentProps {
    onGenerate: (data: TextGenerationData) => Promise<void>
}

export const DialogContent: React.FC<DialogContentProps> = ({ onGenerate }) => {
    const { data: userDetails } = useGetUserDetails()
    const userId = userDetails?.user.id.toString() || ''
    const parsedUserId = userId ? parseInt(userId) : 0

    const [viewState, setViewState] = useState<'upload' | 'url' | 'browse'>(
        'upload',
    )
    const [deviceFile, setDeviceFile] = useState<File | null>(null)
    const [MLVTVideo, setMLVTVideo] = useState<RawVideo | null>(null)
    const [disableGenerate, setDisableGenerate] = useState<boolean>(true)
    const [sourceLanguage, setSourceLanguage] = useState<TranslateLanguage>(
        TranslateLanguage.English,
    )

    const [fileData, setFileData] = useState<VideoData>({
        title: 'My Video Title',
        duration: 300,
        description: 'A description of the video',
        file_name: '',
        folder: S3Folder.video,
        image: 'avatar.jpg',
        user_id: parsedUserId,
    })

    const handleChangeFileData = useCallback((update: Partial<VideoData>) => {
        setFileData((prevData) => ({
            ...prevData,
            ...update,
        }))
    }, [])

    const handleChangeDeviceFile = (file: File | null) => {
        setDeviceFile(file)
    }

    const handleChangeMLVTVideo = useCallback(
        (input: Project | null) => {
            if (input && input.type_project !== ProjectType.Video) return
            setMLVTVideo(input as RawVideo | null)
        },
        [setMLVTVideo],
    )

    const handleChangeSourceLanguage = (value: string) => {
        if (
            Object.values(TranslateLanguage).includes(
                value as TranslateLanguage,
            )
        ) {
            setSourceLanguage(value as TranslateLanguage)
        }
    }

    const changeViewState = (view: string) => {
        if (['upload', 'url', 'browse'].includes(view)) {
            setViewState(view as 'upload' | 'url' | 'browse')
        }
    }

    const Views = useMemo(
        () => [
            {
                text: 'UPLOAD',
                viewState: 'upload',
                component: (
                    <UploadFileFromDevice
                        selectedFile={deviceFile}
                        handleChangeSelectedFile={handleChangeDeviceFile}
                        handleChangeFileData={handleChangeFileData}
                        fileTypeList={[VideoFileType.MP4]}
                    />
                ),
            },
            {
                text: 'BROWSE MLVT',
                viewState: 'browse',
                component: (
                    <BrowseFile
                        allowTypes={[ProjectType.Video]}
                        handleChangeSelectedProject={handleChangeMLVTVideo}
                        selectedProject={MLVTVideo}
                    />
                ),
            },
        ],
        [deviceFile, handleChangeFileData, handleChangeMLVTVideo, MLVTVideo],
    )

    useEffect(() => {
        const isInputValid = checkValidGenerate(
            viewState,
            deviceFile,
            MLVTVideo,
        )
        if (!isInputValid || !sourceLanguage) {
            setDisableGenerate(true)
        } else {
            setDisableGenerate(false)
        }
    }, [viewState, deviceFile, MLVTVideo, sourceLanguage])

    const activeView = Views.find((view) => view.viewState === viewState)
    const ActiveComponent = activeView?.component || null

    const handleGenerate = useCallback(() => {
        const data: TextGenerationData = {
            deviceFile,
            MLVTVideo,
            sourceLanguage,
            viewState,
            fileData,
        }
        onGenerate(data)
    }, [onGenerate, deviceFile, MLVTVideo, sourceLanguage, viewState, fileData])

    return (
        <>
            <Box
                sx={{
                    padding: 1.5,
                    borderRadius: 1.5,
                    backgroundColor: (theme) => theme.palette.background.paper,
                }}
            >
                <ChangeViewBox Views={Views} setViewState={changeViewState} />
                {ActiveComponent}
            </Box>
            <Box sx={{ marginTop: '15px', paddingLeft: '10px' }}>
                <Typography
                    sx={{
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 500,
                        fontSize: '0.9rem',
                    }}
                >
                    Video's language:
                </Typography>
                <SingleOptionBox
                    choices={[
                        TranslateLanguage.English,
                        TranslateLanguage.Vietnamese,
                    ]}
                    handleChangeOption={handleChangeSourceLanguage}
                    value={TranslateLanguage.English}
                    customSx={{ width: '30%' }}
                />
            </Box>
            <GenerateButton
                isDisable={disableGenerate}
                handleGenerate={handleGenerate}
            />
        </>
    )
}
