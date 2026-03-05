import FileUploadIcon from '@mui/icons-material/FileUpload'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useGetUserDetails } from 'src/hooks/useGetUserDetails'
import {
    getPresignedImageURL,
    getPresignedVideoURL,
    postVideo,
} from '../../../../api/video.api'
import { VideoData } from '../../../../types/FileData'
import UploadNotification from '../../../UploadNotification'

const s3ApiClient = axios.create({})

const uploadImageToS3 = async (uploadUrl: string, file: File) => {
    try {
        const response = await s3ApiClient.put(uploadUrl, file, {
            headers: {
                'Content-Type': file.type,
            },
        })
        return response
    } catch (error) {
        console.error('Error uploading image to S3:', error)
        throw error
    }
}

const ResponsiveUploadButton = styled(Button)(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1),
    maxWidth: 100,
    padding: theme.spacing(0.5, 2),
    borderRadius: theme.spacing(1.2),
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
    transition: 'background-color 0.3s ease',

    /* base colors */
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,

    '&:hover': {
        backgroundColor: theme.palette.secondary.contrastText,
    },

    /* XS up through SM: full width */
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        fontSize: '0.8rem',
        height: 40,
    },

    /* MD and up: auto width, slightly larger */
    [theme.breakpoints.up('md')]: {
        width: 'auto',
        fontSize: '1rem',
        height: 48,
        minWidth: 160,
    },
}))

function UploadButton() {
    /** ────────────────  notification state  ──────────────── */
    const [notiOpen, setNotiOpen] = useState(false)
    const [notiStatus, setNotiStatus] = useState<
        'loading' | 'success' | 'fail'
    >('loading')
    const [notifMessage, setNotifMessage] = useState<string | null>(
        'Uploading…',
    )

    const { data: userDetails } = useGetUserDetails()
    const userId = userDetails?.user.id.toString() || ''

    const openNotification = (
        status: 'loading' | 'success' | 'fail',
        message: string,
    ) => {
        setNotiStatus(status)
        setNotifMessage(message)
        setNotiOpen(true)
    }

    let ref = useRef<VideoData>({
        title: 'My Video Title',
        duration: 300,
        description: 'A description of the video',
        file_name: 'vietnamese.mp4',
        folder: 'raw_videos',
        image: 'avatar.jpg',
        user_id: parseInt(userId || '0'),
    })
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            ref.current.file_name = file.name
            ref.current.user_id = parseInt(userId || '0')
            if (file) {
                if (file.type === 'video/mp4') {
                    const imageFile = await extractFirstFrame(file)
                    await uploadVideoImage(imageFile)
                }
                await uploadFile(file, file.type)
            }
        }
    }

    const extractFirstFrame = (videoFile: File): Promise<File> => {
        return new Promise((resolve, reject) => {
            const video = document.createElement('video')
            video.src = URL.createObjectURL(videoFile)
            video.currentTime = 0.1 // Seek to 0.1 seconds to capture the first frame

            video.onloadeddata = () => {
                const canvas = document.createElement('canvas')
                canvas.width = video.videoWidth
                canvas.height = video.videoHeight
                const context = canvas.getContext('2d')

                if (context) {
                    context.drawImage(video, 0, 0, canvas.width, canvas.height)

                    // Convert the canvas to a Blob in JPEG format
                    canvas.toBlob((blob) => {
                        if (blob) {
                            // Convert the Blob to a File
                            const imageName =
                                videoFile.name.split('.')[0] + '_thumbnail.jpg'
                            console.log(imageName)
                            const imageFile = new File([blob], imageName, {
                                type: 'image/jpeg',
                            })
                            resolve(imageFile) // Return the file

                            ref.current.image = imageName
                        } else {
                            reject(
                                new Error(
                                    'Could not generate image from canvas',
                                ),
                            )
                        }
                    }, 'image/jpeg')
                } else {
                    reject(new Error('Failed to get 2D context from canvas'))
                }
            }

            video.onerror = (error) => {
                reject(error)
            }
        })
    }

    const uploadVideoImage = async (file: File) => {
        try {
            const responseGeneratePresignedImageUpload =
                await getPresignedImageURL(file.name, file.type)
            if (responseGeneratePresignedImageUpload.status === 200) {
                console.log(
                    'Generate presigned url for image successfully:',
                    responseGeneratePresignedImageUpload.data,
                )
            }

            const s3UploadImageResponse = await uploadImageToS3(
                responseGeneratePresignedImageUpload.data.upload_url,
                file,
            )
            if (s3UploadImageResponse.status === 200) {
                console.log('Upload image to S3 successfully')
            }
        } catch (e) {
            console.error('Error uploading file: ' + e)
        }
    }

    const uploadFile = async (file: File, fileType: string) => {
        openNotification('loading', 'Uploading…')
        try {
            console.log(ref.current)
            const responseAdd = await postVideo(ref.current)

            if (responseAdd.status === 201) {
                console.log('File added successfully:', responseAdd.data)
            }

            const responseGeneratePresignedVideoUpload =
                await getPresignedVideoURL(file.name, fileType)

            if (responseGeneratePresignedVideoUpload.status === 200) {
                console.log(
                    'Generate presigned url for video successfully:',
                    responseGeneratePresignedVideoUpload.data,
                )

                const s3UploadVideoResponse = await axios.put(
                    responseGeneratePresignedVideoUpload.data.upload_url,
                    file,
                    {
                        headers: {
                            'Content-Type': fileType,
                        },
                    },
                )

                if (s3UploadVideoResponse.status === 200) {
                    console.log('Upload video to S3 successfully')
                }
                openNotification('success', 'Upload complete 🎉')
            }
        } catch (e) {
            console.error('Error uploading file: ' + e)
        }
    }

    const handleClick = () => {
        if (fileInputRef.current !== null) {
            fileInputRef.current.click()
        }
    }

    return (
        <>
            <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileInput}
            />
            <ResponsiveUploadButton onClick={handleClick}>
                <FileUploadIcon fontSize="small" />
                {'Upload'}
            </ResponsiveUploadButton>

            <UploadNotification
                isOpen={notiOpen}
                content={notifMessage}
                status={notiStatus}
                onClose={() => setNotiOpen(false)}
                title="Data Upload Status"
            />
        </>
    )
}

export default UploadButton
