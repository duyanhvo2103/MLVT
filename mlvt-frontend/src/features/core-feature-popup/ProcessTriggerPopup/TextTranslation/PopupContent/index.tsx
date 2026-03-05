import { Box, Typography } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useGetUserDetails } from 'src/hooks/useGetUserDetails'
import { TextData } from '../../../../../types/FileData'
import { TextFileType } from '../../../../../types/FileType'
import { Project, ProjectType, RawText } from '../../../../../types/Project'
import { S3Folder } from '../../../../../types/S3FolderStorage'
import { TranslateLanguage } from '../../../../../types/Translation'
import { BrowseFile } from '../../BaseComponent/BrowseMLVTFile'
import ChangeViewBox from '../../BaseComponent/ChangeView'
import { GenerateButton } from '../../BaseComponent/GenerateButton'
import { InputTextBox } from '../../BaseComponent/InputTextBox'
import { SingleOptionBox } from '../../BaseComponent/SingleOptionBox'
import { UploadFileFromDevice } from '../../BaseComponent/UploadFileFromDevice'

export interface TextTranslationData {
    viewState: 'upload' | 'enter text' | 'browse'
    deviceFile: File | null
    MLVTText: RawText | null
    inputText: string
    sourceLanguage: TranslateLanguage | null
    targetLanguage: TranslateLanguage | null
    textData: TextData
}

interface DialogContentProps {
    onGenerate: (data: TextTranslationData) => void
}

export const DialogContent: React.FC<DialogContentProps> = ({ onGenerate }) => {
    const { data: userDetails } = useGetUserDetails()
    const userId = userDetails?.user.id.toString() || ''
    const parsedUserId = userId ? parseInt(userId) : 0

    const [viewState, setViewState] = useState<
        'upload' | 'enter text' | 'browse'
    >('enter text')
    const [deviceFile, setDeviceFile] = useState<File | null>(null)
    const [MLVTText, setMLVTText] = useState<RawText | null>(null)
    const [inputText, setInputText] = useState<string>('')
    const [disableGenerate, setDisableGenerate] = useState<boolean>(true)
    const [sourceLanguage, setSourceLanguage] = useState<TranslateLanguage>(
        TranslateLanguage.English,
    )
    const [targetLanguage, setTargetLanguage] = useState<TranslateLanguage>(
        TranslateLanguage.Vietnamese,
    )
    const [textData, setTextData] = useState<TextData>({
        file_name: '',
        folder: S3Folder.text,
        user_id: parsedUserId,
        lang: '',
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

    const handleChangeTextData = useCallback((update: Partial<TextData>) => {
        setTextData((prevData) => ({
            ...prevData,
            ...update,
        }))
    }, [])

    const handleChangeDeviceFile = (file: File | null) => {
        setDeviceFile(file)
    }

    const handleChangeMLVTText = useCallback(
        (input: Project | null) => {
            if (input && input.type_project !== ProjectType.Text) return // Ensure it's an audio project
            setMLVTText(input as RawText | null)
        },
        [setMLVTText],
    )

    const changeViewState = (view: string) => {
        if (['upload', 'enter text', 'browse'].includes(view)) {
            setViewState(view as 'upload' | 'enter text' | 'browse')
        }
    }

    const Views = useMemo(
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
                        selectedFile={deviceFile}
                        handleChangeSelectedFile={handleChangeDeviceFile}
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
            deviceFile,
            handleChangeTextData,
            handleChangeMLVTText,
            inputText,
            MLVTText,
        ],
    )

    useEffect(() => {
        const isInputValid =
            (viewState === 'enter text' && !!inputText) ||
            (viewState === 'upload' && !!deviceFile) ||
            (viewState === 'browse' && !!MLVTText)

        if (!isInputValid || !sourceLanguage || !targetLanguage) {
            setDisableGenerate(true)
        } else {
            setDisableGenerate(false)
        }
    }, [
        viewState,
        inputText,
        deviceFile,
        MLVTText,
        sourceLanguage,
        targetLanguage,
    ])

    const activeView = Views.find((view) => view.viewState === viewState)
    const ActiveComponent = activeView?.component ?? null

    const handleGenerate = useCallback(async () => {
        const data: TextTranslationData = {
            viewState,
            deviceFile,
            MLVTText,
            inputText,
            sourceLanguage,
            targetLanguage,
            textData,
        }
        onGenerate(data)
    }, [
        onGenerate,
        viewState,
        deviceFile,
        MLVTText,
        inputText,
        sourceLanguage,
        targetLanguage,
        textData,
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
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                {/* Choosing audio language seciton */}
                <Box paddingX={2}>
                    <Typography
                        sx={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 500,
                            fontSize: '0.9rem',
                        }}
                    >
                        Text language:
                    </Typography>
                    <SingleOptionBox
                        choices={[
                            TranslateLanguage.English,
                            TranslateLanguage.Vietnamese,
                        ]}
                        customSx={{}}
                        handleChangeOption={handleChangeSourceLanguage}
                        value={TranslateLanguage.English}
                    />
                </Box>
                {/* choosing model section */}
                <Box>
                    <Typography
                        sx={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 500,
                            fontSize: '0.9rem',
                        }}
                    >
                        Translate to Language:
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
