import FileUploadIcon from '@mui/icons-material/FileUpload'
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useGetUserDetails } from 'src/hooks/useGetUserDetails'
import { FileData } from '../../../../types/FileData'
import {
    AudioFileType,
    TextFileType,
    VideoFileType,
} from '../../../../types/FileType'
import { getMediaDuration } from '../../../../utils/ProcessTriggerPopup/VideoService'
import { CustomAudio } from './CustomAudio'
import { CustomText } from './CustomText'
import { CustomVideo } from './CustomVideo'

type AllowedFileType = VideoFileType | TextFileType | AudioFileType

interface UploadVideoFromDeviceProps {
    handleChangeFileData: (update: Partial<FileData>) => void
    selectedFile: File | null
    fileTypeList: AllowedFileType[]
    handleChangeSelectedFile: (file: File | null) => void
}

// Utility Function
const checkFileType = (fileType: string): 'video' | 'audio' | 'text' | null => {
    if (Object.values(VideoFileType).includes(fileType as VideoFileType))
        return 'video'
    if (Object.values(TextFileType).includes(fileType as TextFileType))
        return 'text'
    if (Object.values(AudioFileType).includes(fileType as AudioFileType))
        return 'audio'
    return null
}

// Component
export const UploadFileFromDevice: React.FC<UploadVideoFromDeviceProps> = ({
    selectedFile,
    handleChangeSelectedFile,
    handleChangeFileData,
    fileTypeList,
}) => {
    const { data: userDetails } = useGetUserDetails()
    const userId = userDetails?.user.id.toString() || ''
    const [isDragActive, setIsDragActive] = useState(false)
    const [localURL, setLocalURL] = useState<string | null>(null)
    const [localFileType, setLocalFileType] = useState<
        'video' | 'audio' | 'text' | null
    >(null)
    const [fileContent, setFileContent] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const joinedFileTypes = fileTypeList.map((fileType) => fileType).join(', ')

    useEffect(() => {
        if (selectedFile) {
            const fileType = checkFileType(selectedFile.type)
            setLocalFileType(fileType)

            if (fileType === 'video' || fileType === 'audio') {
                const url = URL.createObjectURL(selectedFile)
                setLocalURL(url)
                return () => URL.revokeObjectURL(url)
            }

            if (fileType === 'text') {
                const reader = new FileReader()
                reader.onload = (e) =>
                    setFileContent(e.target?.result as string)
                reader.readAsText(selectedFile)
            }
        } else {
            setLocalURL(null)
            setFileContent(null)
            setLocalFileType(null)
        }
    }, [selectedFile])

    const { getRootProps, getInputProps } = useDropzone({
        onDragEnter: () => setIsDragActive(true),
        onDragLeave: () => setIsDragActive(false),
        onDrop: async (acceptedFiles) => {
            const file = acceptedFiles[0]
            if (file && fileTypeList.includes(file.type as AllowedFileType)) {
                setErrorMessage(null)
                handleChangeSelectedFile(file)
                setIsDragActive(false)
                const fileExtension = file.name.includes('.')
                    ? file.name.substring(file.name.lastIndexOf('.'))
                    : ''

                // Generate new filename while preserving extension
                const newFileName = `${userId}_${Math.floor(Date.now() / 1000)}`
                const newVideoName = newFileName + fileExtension

                if (checkFileType(file.type) === 'video') {
                    try {
                        const duration = await getMediaDuration(file)

                        handleChangeFileData({
                            file_name: newVideoName,
                            image: `${newFileName}_thumbnail.jpg`,
                            duration: duration,
                            folder: 'raw_videos',
                        })
                    } catch (error) {
                        console.error('Error getting video duration', error)
                    }
                } else if (checkFileType(file.type) === 'text') {
                    handleChangeFileData({
                        file_name: newFileName,
                        folder: 'transcriptions',
                    })
                } else if (checkFileType(file.type) === 'audio') {
                    try {
                        const duration = await getMediaDuration(file)
                        handleChangeFileData({
                            file_name: newFileName,
                            duration: duration,
                            folder: 'audios',
                        })
                    } catch (error) {
                        console.error('Error getting audio duration', error)
                    }
                }
            } else {
                setErrorMessage(`Wrong input file type`)
            }
        },
    })

    const handleRemoveFile = () => {
        setLocalURL(null)
        setFileContent(null)
        setLocalFileType(null)
        handleChangeSelectedFile(null)
    }

    // Render Components for Each File Type
    /**const renderFileContent = () => {
        if (localFileType === "video" && localURL) {
            return (
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        paddingTop: "56.25%",
                        backgroundColor: "black",
                        borderRadius: "10px",
                        marginTop: "20px",
                    }}
                >
                    <video
                        src={localURL}
                        controls
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            borderRadius: "10px",
                        }}
                    />
                </Box>
            );
        }

        if (localFileType === "audio" && localURL) {
            return (
                <CustomAudio
                    audioURL={localURL}
                    handleRemoveFile={handleRemoveFile}
                />
            );
        }

        if (localFileType === "text" && fileContent) {
            return (
                <pre
                    style={{
                        whiteSpace: "pre-wrap",
                        backgroundColor: "#f4f4f4",
                        padding: "10px",
                        borderRadius: "8px",
                        overflowY: "auto",
                        maxHeight: "300px",
                        overflowX: "hidden",
                    }}
                >
                    {fileContent}
                </pre>
            );
        }

        return null;
    };**/

    return (
        <>
            <Typography
                variant="body2"
                sx={{
                    marginBottom: '10px',
                    marginTop: '15px',
                    fontFamily: 'Poppins, sans-serif',
                }}
            >
                Drag and drop a file or click to browse your files.
            </Typography>
            {localURL === null && fileContent === null ? (
                <>
                    <Box
                        {...getRootProps()}
                        sx={{
                            border: '1.5px dashed grey',
                            padding: '10px',
                            textAlign: 'center',
                            justifyContent: 'center',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            minHeight: '150px',
                            height: '20vh',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            ...(isDragActive && { backgroundColor: 'white' }),
                        }}
                    >
                        <input {...getInputProps()} />
                        <FileUploadIcon sx={{ fontSize: '3rem' }} />
                        <Typography
                            sx={{
                                marginTop: '5px',
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '0.75rem',
                            }}
                        >
                            {selectedFile ? (
                                selectedFile.name
                            ) : (
                                <>
                                    Drag and drop a file here <br />
                                    Supported{' '}
                                    <span
                                        style={{
                                            fontWeight: 550,
                                        }}
                                    >
                                        {joinedFileTypes}
                                    </span>
                                </>
                            )}
                        </Typography>
                    </Box>
                    {errorMessage && (
                        <Typography
                            variant="body2"
                            // color={theme.palette.error.main}
                            align="center"
                            sx={{
                                color: '#FF1E00',
                                marginTop: '8px',
                                fontWeight: '450',
                                fontFamily: 'Poppins, sans-serif',
                            }}
                        >
                            {errorMessage}
                        </Typography>
                    )}
                </>
            ) : (
                <>
                    {localFileType === 'audio' && localURL && (
                        <CustomAudio
                            handleRemoveFile={handleRemoveFile}
                            audioURL={localURL}
                        />
                    )}
                    {localFileType === 'video' && localURL && (
                        <CustomVideo
                            handleRemoveFile={handleRemoveFile}
                            videoURL={localURL}
                        />
                    )}
                    {localFileType === 'text' && fileContent && (
                        <CustomText
                            handleRemoveFile={handleRemoveFile}
                            textContent={fileContent}
                        />
                    )}
                </>
            )}
        </>
    )
}
