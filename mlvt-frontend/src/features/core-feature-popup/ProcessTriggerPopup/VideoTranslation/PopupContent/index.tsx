import { Box, Typography } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useGetUserDetails } from 'src/hooks/useGetUserDetails'
import { VideoData } from '../../../../../types/FileData'
import { VideoFileType } from '../../../../../types/FileType'
import { Project, ProjectType, RawVideo } from '../../../../../types/Project'
import { S3Folder } from '../../../../../types/S3FolderStorage'
import { TranslateLanguage } from '../../../../../types/Translation'
import { checkValidGenerate } from '../../../../../utils/ProcessTriggerPopup/CheckValidGenerate'
import { uploadVideo } from '../../../../../utils/ProcessTriggerPopup/VideoService'
import { BrowseFile } from '../../BaseComponent/BrowseMLVTFile'
import ChangeViewBox from '../../BaseComponent/ChangeView'
import { GenerateButton } from '../../BaseComponent/GenerateButton'
import { SingleOptionBox } from '../../BaseComponent/SingleOptionBox'
import { UploadFileFromDevice } from '../../BaseComponent/UploadFileFromDevice'

export interface GenerateVideoData {
    viewState: 'upload' | 'url' | 'browse'
    deviceFile: File | null
    MLVTVideo: RawVideo | null
    sourceLanguage: TranslateLanguage | null
    targetLanguage: TranslateLanguage | null
    fileData: VideoData
}

interface DialogContentProps {
    onGenerate: (data: GenerateVideoData) => void
}

export const DialogContent: React.FC<DialogContentProps> = ({ onGenerate }) => {
    const { data: userDetails } = useGetUserDetails()
    const userId = userDetails?.user.id.toString() || ''
    const parsedUserId = userId ? parseInt(userId) : 0
    const [viewState, setViewState] = useState<'upload' | 'url' | 'browse'>(
        'upload',
    )
    const [sourceLanguage, setSourceLanguage] = useState<TranslateLanguage>(
        TranslateLanguage.English,
    )

    const [deviceFile, setDeviceFile] = useState<File | null>(null)
    const [MLVTVideo, setMLVTVideo] = useState<RawVideo | null>(null)
    const [targetLanguage, setTargetLanguage] = useState<TranslateLanguage>(
        TranslateLanguage.Vietnamese,
    )
    const [disableGenerate, setDisableGenerate] = useState<boolean>(true)

    const [fileData, setFileData] = useState<VideoData>({
        title: 'My Video Title',
        duration: 300,
        description: 'A description of the video',
        file_name: '',
        folder: S3Folder.video,
        image: 'avatar.jpg',
        user_id: parsedUserId,
    })

    const handleChangeSourceLanguage = (value: string) => {
        if (
            Object.values(TranslateLanguage).includes(
                value as TranslateLanguage,
            )
        ) {
            setSourceLanguage(value as TranslateLanguage)
        }
    }

    const handleChangeTargetLanguage = (value: string) => {
        if (
            Object.values(TranslateLanguage).includes(
                value as TranslateLanguage,
            )
        ) {
            setTargetLanguage(value as TranslateLanguage)
        }
    }

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

    const changeViewState = (view: string) => {
        if (['upload', 'url', 'browse'].includes(view)) {
            setViewState(view as 'upload' | 'url' | 'browse')
        }
    }

    const uploadVideoFromDevice = useCallback(async (): Promise<number> => {
        if (deviceFile) {
            try {
                const videoId = await uploadVideo(deviceFile, fileData)
                return videoId
            } catch (error) {
                throw error
            }
        } else {
            throw new Error('Failed uploading Video file to Server')
        }
    }, [deviceFile, fileData])

    const Views = useMemo(
        () => [
            {
                text: 'UPLOAD',
                viewState: 'upload',
                handleSubmit: uploadVideoFromDevice,
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
                handleSubmit:
                    MLVTVideo !== null
                        ? () => Promise.resolve(MLVTVideo.id)
                        : undefined,
                component: (
                    <BrowseFile
                        allowTypes={[ProjectType.Video]}
                        handleChangeSelectedProject={handleChangeMLVTVideo}
                        selectedProject={MLVTVideo}
                    />
                ),
            },
        ],
        [
            deviceFile,
            handleChangeFileData,
            handleChangeMLVTVideo,
            MLVTVideo,
            uploadVideoFromDevice,
        ],
    )

    useEffect(() => {
        if (
            !checkValidGenerate(viewState, deviceFile, MLVTVideo) ||
            !sourceLanguage ||
            !targetLanguage
        ) {
            setDisableGenerate(true)
        } else {
            setDisableGenerate(false)
        }
    }, [viewState, deviceFile, sourceLanguage, targetLanguage, MLVTVideo])

    const activeView = Views.find((view) => view.viewState === viewState)
    const ActiveComponent = activeView?.component || null

    const handleGenerate = useCallback(async () => {
        const generationData: GenerateVideoData = {
            viewState,
            deviceFile,
            MLVTVideo,
            sourceLanguage,
            targetLanguage,
            fileData,
        }

        // Call the function passed down from the parent
        onGenerate(generationData)
    }, [
        viewState,
        deviceFile,
        MLVTVideo,
        sourceLanguage,
        targetLanguage,
        fileData,
        onGenerate,
    ])

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
            <Box
                marginTop="10px"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 30,
                }}
            >
                <Box flex={1}>
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
                    />
                </Box>
                <Box flex={1}>
                    <Typography
                        sx={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 500,
                            fontSize: '0.9rem',
                        }}
                    >
                        Translate to:
                    </Typography>
                    <SingleOptionBox
                        choices={[
                            TranslateLanguage.English,
                            TranslateLanguage.Vietnamese,
                        ]}
                        handleChangeOption={handleChangeTargetLanguage}
                        value={TranslateLanguage.Vietnamese}
                    />
                </Box>
            </Box>

            <GenerateButton
                isDisable={disableGenerate}
                handleGenerate={handleGenerate}
            />
        </>
    )
}
