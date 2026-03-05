import { Box, Typography } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useGetUserDetails } from 'src/hooks/useGetUserDetails'
import { AudioData, TextData } from '../../../../../types/FileData'
import { AudioFileType, TextFileType } from '../../../../../types/FileType'
import {
    Project,
    ProjectType,
    RawAudio,
    RawText,
} from '../../../../../types/Project'
import { S3Folder } from '../../../../../types/S3FolderStorage'
import { TranslateLanguage } from '../../../../../types/Translation'
import { BrowseFile } from '../../BaseComponent/BrowseMLVTFile'
import ChangeViewBox from '../../BaseComponent/ChangeView'
import { GenerateButton } from '../../BaseComponent/GenerateButton'
import { InputTextBox } from '../../BaseComponent/InputTextBox'
import { SingleOptionBox } from '../../BaseComponent/SingleOptionBox'
import { UploadFileFromDevice } from '../../BaseComponent/UploadFileFromDevice'

export interface VoiceGenerationData {
    textViewState: 'upload' | 'enter text' | 'browse'
    audioViewState: 'browse' | 'custom'
    deviceAudioFile: File | null
    deviceTextFile: File | null
    inputText: string
    MLVTVoice: RawAudio | null
    textLanguage: TranslateLanguage | null
    MLVTText: RawText | null
    textData: TextData
    audioData: AudioData
}

interface DialogContentProps {
    onGenerate: (data: VoiceGenerationData) => void
}

export const DialogContent: React.FC<DialogContentProps> = ({ onGenerate }) => {
    const { data: userDetails } = useGetUserDetails()
    const userId = userDetails?.user.id.toString() || ''
    const parsedUserId = userId ? parseInt(userId) : 0
    const [audioViewState, setAudioViewState] = useState<'browse' | 'custom'>(
        'browse',
    )
    const [textViewState, setTextViewState] = useState<
        'upload' | 'enter text' | 'browse'
    >('enter text')
    const [deviceAudioFile, setDeviceAudioFile] = useState<File | null>(null)
    const [deviceTextFile, setDeviceTextFile] = useState<File | null>(null)
    const [MLVTText, setMLVTText] = useState<RawText | null>(null)
    const [inputText, setInputText] = useState<string>('')
    const [disableGenerate, setDisableGenerate] = useState<boolean>(true)
    const [textLanguage, setTextLanguage] = useState<TranslateLanguage | null>(
        TranslateLanguage.English,
    )

    const [MLVTVoice, setMLVTVoice] = useState<RawAudio | null>(null)

    const [textData, setTextData] = useState<TextData>({
        file_name: '',
        folder: S3Folder.text,
        user_id: parsedUserId,
        lang: '',
    })

    const [audioData, setAudioData] = useState<AudioData>({
        file_name: '',
        folder: S3Folder.audio,
        user_id: parsedUserId,
        duration: 0,
    })

    const handleChangeTextLanguage = (value: string) => {
        if (
            Object.values(TranslateLanguage).includes(
                value as TranslateLanguage,
            )
        ) {
            setTextLanguage(value as TranslateLanguage)
        }
    }

    const handleChangeTextData = useCallback((update: Partial<TextData>) => {
        setTextData((prevData) => ({
            ...prevData,
            ...update,
        }))
    }, [])

    const handleChangeAudioData = useCallback((update: Partial<AudioData>) => {
        setAudioData((prevData: AudioData) => ({
            ...prevData,
            ...update,
        }))
    }, [])

    const handleChangeMLVTText = useCallback(
        (input: Project | null) => {
            if (input && input.type_project !== ProjectType.Text) return
            setMLVTText(input as RawText | null)
        },
        [setMLVTText],
    )

    const handleChangeDeviceTextFile = (file: File | null) => {
        setDeviceTextFile(file)
    }
    const handleChangeDeviceAudioFile = useCallback((file: File | null) => {
        setDeviceAudioFile(file)
    }, [])
    const handleChangeAudioViewState = (view: string) => {
        if (['browse', 'custom'].includes(view)) {
            setAudioViewState(view as 'browse' | 'custom')
        }
    }

    const handleChangeTextViewState = (view: string) => {
        if (['upload', 'enter text', 'browse'].includes(view)) {
            setTextViewState(view as 'upload' | 'enter text' | 'browse')
        }
    }

    const handleChangeMLVTVoice = useCallback(
        (input: Project | null) => {
            if (input && input.type_project !== ProjectType.Audio) return
            setMLVTVoice(input as RawAudio | null)
        },
        [setMLVTVoice],
    )

    const TextViews = useMemo(
        () => [
            {
                text: 'ENTER TEXT',
                viewState: 'enter text',
                component: (
                    <InputTextBox
                        inputTextFromParent={inputText}
                        handleChangeText={setInputText}
                    />
                ),
            },
            {
                text: 'UPLOAD',
                viewState: 'upload',
                component: (
                    <UploadFileFromDevice
                        selectedFile={deviceTextFile}
                        handleChangeSelectedFile={handleChangeDeviceTextFile}
                        handleChangeFileData={handleChangeTextData}
                        fileTypeList={[TextFileType.PlainText]}
                    />
                ),
            },
            {
                text: 'BROWSE MLVT',
                viewState: 'browse',
                component: (
                    <BrowseFile
                        allowTypes={[ProjectType.Text]}
                        handleChangeSelectedProject={handleChangeMLVTText}
                        selectedProject={MLVTText}
                    />
                ),
            },
        ],
        [
            deviceTextFile,
            handleChangeTextData,
            handleChangeMLVTText,
            inputText,
            MLVTText,
        ],
    )

    const AudioViews = useMemo(
        () => [
            {
                text: 'CUSTOM VOICE',
                viewState: 'custom',
                component: (
                    <UploadFileFromDevice
                        handleChangeFileData={handleChangeAudioData}
                        selectedFile={deviceAudioFile}
                        fileTypeList={[AudioFileType.MP3, AudioFileType.WAV]}
                        handleChangeSelectedFile={handleChangeDeviceAudioFile}
                    />
                ),
            },
            {
                text: 'BROWSE MLVT',
                viewState: 'browse',
                component: (
                    <BrowseFile
                        allowTypes={[ProjectType.Audio]}
                        handleChangeSelectedProject={handleChangeMLVTVoice}
                        selectedProject={MLVTVoice}
                    />
                ),
            },
        ],
        [
            deviceAudioFile,
            handleChangeAudioData,
            handleChangeMLVTVoice,
            handleChangeDeviceAudioFile,
            MLVTVoice,
        ],
    )

    useEffect(() => {
        const isTextValid =
            (textViewState === 'enter text' && !!inputText) ||
            (textViewState === 'upload' && !!deviceTextFile) ||
            (textViewState === 'browse' && !!MLVTText)
        const isAudioValid =
            (audioViewState === 'browse' && !!MLVTVoice) ||
            (audioViewState === 'custom' && !!deviceAudioFile)

        if (!isTextValid || !isAudioValid || !textLanguage) {
            setDisableGenerate(true)
        } else {
            setDisableGenerate(false)
        }
    }, [
        textViewState,
        inputText,
        deviceTextFile,
        MLVTText,
        audioViewState,
        MLVTVoice,
        deviceAudioFile,
        textLanguage,
    ])

    const handleGenerate = useCallback(() => {
        const data: VoiceGenerationData = {
            textViewState,
            audioViewState,
            deviceAudioFile,
            deviceTextFile,
            inputText,
            textLanguage,
            MLVTText,
            textData,
            audioData,
            MLVTVoice,
        }
        onGenerate(data)
    }, [
        textViewState,
        audioViewState,
        deviceAudioFile,
        deviceTextFile,
        inputText,
        textLanguage,
        MLVTText,
        textData,
        audioData,
        MLVTVoice,
        onGenerate,
    ])

    const activeAudioView = AudioViews.find(
        (view) => view.viewState === audioViewState,
    )
    const ActiveAudioComponent = activeAudioView?.component || null

    const activeTextView = TextViews.find(
        (view) => view.viewState === textViewState,
    )
    const ActiveTextComponent = activeTextView?.component || null

    return (
        <>
            {/* Box for user to enter text */}
            <Box
                sx={{
                    padding: 1.5,
                    borderRadius: 1.5,
                    backgroundColor: (theme) => theme.palette.background.paper,
                    marginBottom: '10px',
                }}
            >
                <ChangeViewBox
                    Views={TextViews}
                    setViewState={handleChangeTextViewState}
                />
                {ActiveTextComponent}
            </Box>

            {/* Translation to section */}
            <Box paddingInline={1.5}>
                <Typography
                    variant="body2"
                    sx={{
                        fontFamily:
                            'Poppins, Araboto, Roboto, Arial, sans-serif',
                        fontWeight: 500,
                        marginTop: '10px',
                    }}
                >
                    Text Language
                </Typography>
                <SingleOptionBox
                    choices={[
                        TranslateLanguage.English,
                        TranslateLanguage.Vietnamese,
                    ]}
                    handleChangeOption={handleChangeTextLanguage}
                    customSx={{ width: '30%' }}
                    value={TranslateLanguage.English}
                />
            </Box>

            <Typography
                variant="body2"
                sx={{
                    fontFamily: 'Poppins, Araboto, Roboto, Arial, sans-serif',
                    fontWeight: 500,
                    paddingLeft: 1.5,
                    marginTop: '20px',
                }}
            >
                Voice Generation option:
            </Typography>

            <Box
                sx={{
                    padding: 1.5,
                    borderRadius: 1.5,
                    backgroundColor: (theme) => theme.palette.background.paper,
                    marginBottom: '10px',
                }}
            >
                <ChangeViewBox
                    Views={AudioViews}
                    setViewState={handleChangeAudioViewState}
                />
                {ActiveAudioComponent}
            </Box>
            <GenerateButton
                isDisable={disableGenerate}
                handleGenerate={handleGenerate}
            />
        </>
    )
}
