import { Box, Typography } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useGetUserDetails } from 'src/hooks/useGetUserDetails'
import { AudioData, VideoData } from '../../../../../types/FileData'
import { AudioFileType, VideoFileType } from '../../../../../types/FileType'
import {
    Project,
    ProjectType,
    RawAudio,
    RawVideo,
} from '../../../../../types/Project'
import { S3Folder } from '../../../../../types/S3FolderStorage'
import { uploadAudio } from '../../../../../utils/ProcessTriggerPopup/AudioService'
import { checkValidGenerate } from '../../../../../utils/ProcessTriggerPopup/CheckValidGenerate'
import { uploadVideo } from '../../../../../utils/ProcessTriggerPopup/VideoService'
import { BrowseFile } from '../../BaseComponent/BrowseMLVTFile'
import ChangeViewBox from '../../BaseComponent/ChangeView'
import { GenerateButton } from '../../BaseComponent/GenerateButton'
import { UploadFileFromDevice } from '../../BaseComponent/UploadFileFromDevice'
export interface GenerateLipsyncData {
    videoViewState: 'upload' | 'browse'
    deviceVideo: File | null
    MLVTVideo: RawVideo | null
    videoData: VideoData
    audioViewState: 'upload' | 'browse'
    deviceAudio: File | null
    MLVTAudio: RawAudio | null
    audioData: AudioData
}

interface DialogContentProps {
    onGenerate: (data: GenerateLipsyncData) => void
}

export const DialogContent: React.FC<DialogContentProps> = ({ onGenerate }) => {
    const { data: userDetails } = useGetUserDetails()
    const userId = userDetails?.user.id.toString() || ''
    const parsedUserId = userId ? parseInt(userId) : 0

    const [videoViewState, setVideoViewState] = useState<'upload' | 'browse'>(
        'upload',
    )
    const [audioViewState, setAudioViewState] = useState<'upload' | 'browse'>(
        'upload',
    )

    const [deviceVideo, setDeviceVideo] = useState<File | null>(null)
    const [deviceAudio, setDeviceAudio] = useState<File | null>(null)

    const [MLVTAudio, setMLVTAudio] = useState<RawAudio | null>(null)
    const [MLVTVideo, setMLVTVideo] = useState<RawVideo | null>(null)

    const [disableGenerate, setDisableGenerate] = useState<boolean>(true)

    const [videoData, setVideoData] = useState<VideoData>({
        title: 'My Video Title',
        duration: 300,
        description: 'A description of the video',
        file_name: '',
        folder: S3Folder.video,
        image: 'avatar.jpg',
        user_id: parsedUserId,
    })

    const [audioData, setAudioData] = useState<AudioData>({
        file_name: '',
        folder: S3Folder.audio,
        user_id: parsedUserId,
        duration: 0,
    })

    const handleChangeVideoData = useCallback((update: Partial<VideoData>) => {
        setVideoData((prevData) => ({
            ...prevData,
            ...update,
        }))
    }, [])

    const handleChangeAudioData = useCallback((update: Partial<AudioData>) => {
        setAudioData((prevData) => ({
            ...prevData,
            ...update,
        }))
    }, [])

    const handleChangeMLVTAudio = useCallback(
        (input: Project | null) => {
            if (input && input.type_project !== ProjectType.Audio) return
            setMLVTAudio(input as RawAudio | null)
        },
        [setMLVTAudio],
    )

    const handleChangeMLVTVideo = useCallback(
        (input: Project | null) => {
            if (input && input.type_project !== ProjectType.Video) return
            setMLVTVideo(input as RawVideo | null)
        },
        [setMLVTVideo],
    )

    const handleChangeDeviceVideo = (file: File | null) => {
        setDeviceVideo(file)
    }

    const handleChangeDeviceAudio = (file: File | null) => {
        setDeviceAudio(file)
    }

    const changeVideoViewState = (view: string) => {
        if (['upload', 'browse'].includes(view)) {
            setVideoViewState(view as 'upload' | 'browse')
        }
    }

    const changeAudioViewState = (view: string) => {
        if (['upload', 'browse'].includes(view)) {
            setAudioViewState(view as 'upload' | 'browse')
        }
    }

    const uploadAudioFromDevice = useCallback(async (): Promise<number> => {
        if (deviceAudio) {
            try {
                const audioId = await uploadAudio(deviceAudio, audioData)
                return audioId
            } catch (error) {
                throw error
            }
        } else {
            throw new Error('Failed uploading Audio file to Server')
        }
    }, [deviceAudio, audioData])

    const uploadVideoFromDevice = useCallback(async (): Promise<number> => {
        if (deviceVideo) {
            try {
                const videoId = await uploadVideo(deviceVideo, videoData)
                return videoId
            } catch (error) {
                throw error
            }
        } else {
            throw new Error('Failed uploading Video file to Server')
        }
    }, [deviceVideo, videoData])

    const videoViews = useMemo(
        () => [
            {
                text: 'UPLOAD',
                viewState: 'upload',
                handleSubmit: uploadVideoFromDevice,
                component: (
                    <UploadFileFromDevice
                        selectedFile={deviceVideo}
                        handleChangeSelectedFile={handleChangeDeviceVideo}
                        handleChangeFileData={handleChangeVideoData}
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
                handleSubmit:
                    MLVTVideo !== null
                        ? () => Promise.resolve(MLVTVideo.id)
                        : undefined,
            },
        ],
        [
            deviceVideo,
            handleChangeVideoData,
            uploadVideoFromDevice,
            handleChangeMLVTVideo,
            MLVTVideo,
        ],
    )

    const audioViews = useMemo(
        () => [
            {
                text: 'UPLOAD',
                viewState: 'upload',
                handleSubmit: uploadAudioFromDevice,
                component: (
                    <UploadFileFromDevice
                        selectedFile={deviceAudio}
                        handleChangeSelectedFile={handleChangeDeviceAudio}
                        handleChangeFileData={handleChangeAudioData}
                        fileTypeList={[AudioFileType.MP3, AudioFileType.WAV]}
                    />
                ),
            },
            {
                text: 'BROWSE MLVT',
                viewState: 'browse',
                component: (
                    <BrowseFile
                        allowTypes={[ProjectType.Audio]}
                        handleChangeSelectedProject={handleChangeMLVTAudio}
                        selectedProject={MLVTAudio}
                    />
                ),
                handleSubmit:
                    MLVTAudio !== null
                        ? () => Promise.resolve(MLVTAudio.id)
                        : undefined,
            },
        ],
        [
            deviceAudio,
            handleChangeAudioData,
            uploadAudioFromDevice,
            handleChangeMLVTAudio,
            MLVTAudio,
        ],
    )

    useEffect(() => {
        if (
            !checkValidGenerate(audioViewState, deviceAudio, MLVTAudio) ||
            !checkValidGenerate(videoViewState, deviceVideo, MLVTVideo)
        ) {
            setDisableGenerate(true)
        } else {
            setDisableGenerate(false)
        }
    }, [
        deviceAudio,
        audioViewState,
        videoViewState,
        deviceVideo,
        MLVTAudio,
        MLVTVideo,
    ])

    const activeVideoView = videoViews.find(
        (view) => view.viewState === videoViewState,
    )
    const activeVideoComponent = activeVideoView?.component || null

    const activeAudioView = audioViews.find(
        (view) => view.viewState === audioViewState,
    )
    const activeAudioComponent = activeAudioView?.component || null

    const handleGenerate = useCallback(() => {
        // Package all the relevant state into one object
        const generationData: GenerateLipsyncData = {
            videoViewState,
            deviceVideo,
            MLVTVideo,
            videoData,
            audioViewState,
            deviceAudio,
            MLVTAudio,
            audioData,
        }
        // Call the function passed down from the parent
        onGenerate(generationData)
    }, [
        onGenerate,
        videoViewState,
        deviceVideo,
        MLVTVideo,
        videoData,
        audioViewState,
        deviceAudio,
        MLVTAudio,
        audioData,
    ])

    return (
        <>
            {/* Upload video section */}
            <Typography
                variant="body2"
                sx={{
                    fontFamily:
                        'Poppins, Inter, Araboto, Roboto, Arial, sans-serif',
                    fontWeight: 500,
                    marginBottom: '10px',
                }}
            >
                Upload a video
            </Typography>
            <Box
                sx={{
                    padding: 1.5,
                    borderRadius: 1.5,
                    backgroundColor: (theme) => theme.palette.background.paper,
                }}
            >
                <ChangeViewBox
                    Views={videoViews}
                    setViewState={changeVideoViewState}
                />
                {activeVideoComponent}
            </Box>

            {/* Upload audio section */}
            <Typography
                variant="body2"
                sx={{
                    fontFamily:
                        'Poppins, Inter, Araboto, Roboto, Arial, sans-serif',
                    fontWeight: 500,
                    marginBottom: '10px',
                    marginTop: '10px',
                }}
            >
                Upload an audio
            </Typography>
            <Box
                sx={{
                    padding: 1.5,
                    borderRadius: 1.5,
                    backgroundColor: (theme) => theme.palette.background.paper,
                }}
            >
                <ChangeViewBox
                    Views={audioViews}
                    setViewState={changeAudioViewState}
                />
                {activeAudioComponent}
            </Box>

            {/* Generate button */}
            <GenerateButton
                isDisable={disableGenerate}
                handleGenerate={handleGenerate}
            />
        </>
    )
}
