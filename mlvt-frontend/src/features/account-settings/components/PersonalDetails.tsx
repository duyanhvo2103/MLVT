import { Edit } from '@mui/icons-material'
import { Avatar, Box, Grid, TextField, Typography } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useGetUserDetails } from 'src/hooks/useGetUserDetails'
import { getPresignedImageURL } from '../../../api/video.api'
import { CustomButton } from '../../../components/CustomButton'
import SuccessPopup from '../../../components/SuccessPopup'
import { UserUpdateData, UserWithAvatar } from '../../../types/Response/User'
import { updateAvatar, updateUser } from '../apis/user.api'

interface UserDetails {
    user: UserWithAvatar
}
interface EditableUserData {
    firstName: string
    lastName: string
    username?: string
    email?: string
    status?: number
    role?: string
    premium?: boolean
    avatar?: string
}

const s3ApiClient = axios.create({
    // No base URL, timeouts, or headers needed here
})

const uploadImageToS3 = async (uploadUrl: string, file: File) => {
    try {
        console.log(uploadUrl)
        console.log(file.type)
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

const PersonalDetails: React.FC<UserDetails> = ({ user }) => {
    const [userData, setUserData] = useState<EditableUserData>({
        firstName: user.first_name,
        lastName: user.last_name,
        username: user.username,
        email: user.email,
        status: user.status,
        role: user.role,
        premium: user.premium,
        avatar: user.avatar?.split('?X-Amz-Algorithm')[0] || '',
    })

    console.log('User Data:', userData)

    const fileInputRef = useRef<HTMLInputElement>(null)
    const [showSuccessPopup, setShowSuccessPopup] = useState(false)

    const theme = useTheme()
    const { data: userDetails } = useGetUserDetails()
    const userId = userDetails?.user.id.toString() || ''

    const [avatarPreview, setAvatarPreview] = useState<string>(
        user.avatar?.split('?X-Amz-Algorithm')[0] || '',
    )

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0]
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.result) {
                    setAvatarPreview(reader.result as string)
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target
        setUserData((prev) => ({ ...prev, [name]: value }))
    }

    const handleClick = () => fileInputRef.current?.click()

    const handleSave = async () => {
        if (!userId) {
            console.error('User ID is null. Cannot update user data.')
            return
        }
        try {
            const updatedData: UserUpdateData = {
                first_name: userData.firstName,
                last_name: userData.lastName,
                username: userData.username,
                email: userData.email,
                status: userData.status,
                premium: false,
                role: userData.role,
            }

            const updatedDataResponse = await updateUser(userId, updatedData)
            console.log('Updated user data:', updatedDataResponse)

            const file = fileInputRef.current?.files?.[0]
            console.log('File Name: ', file?.name)
            if (file) {
                await uploadAvatar(file)
                const updateAvatarDb = await updateAvatar(
                    String(userId),
                    file.name,
                )
                console.log('Update avatar in DB response: ', updateAvatarDb)
            }

            setShowSuccessPopup(true)

            setTimeout(() => {
                window.location.reload()
            }, 3000)
        } catch (error) {
            console.error('Failed to update user data:', error)
        }
    }

    const uploadAvatar = async (file: File) => {
        try {
            const responseGeneratePresignedImageUpload =
                await getPresignedImageURL(file.name, file.type)
            if (responseGeneratePresignedImageUpload.status === 200) {
                console.log(
                    'Generate presigned url for image successfully:',
                    responseGeneratePresignedImageUpload.data,
                )
                const avatarUploadUrl =
                    responseGeneratePresignedImageUpload.data.upload_url
                        .split('?X-Amz-Algorithm')[0]
                        .replace('video_frames', 'avatars')
                console.log('Avatar upload URL:', avatarUploadUrl)

                const s3UploadImageResponse = await uploadImageToS3(
                    avatarUploadUrl,
                    file,
                )
                if (s3UploadImageResponse.status === 200) {
                    console.log('Avatar uploaded to S3 successfully')
                } else {
                    console.error(
                        'Failed to upload avatar to S3:',
                        s3UploadImageResponse,
                    )
                }
            } else {
                console.log('Failed to generate presigned image')
                console.log(responseGeneratePresignedImageUpload)
            }
        } catch (e) {
            console.error('Error uploading file: ' + e)
        }
    }

    return (
        <>
            <Box p={4}>
                <Typography
                    sx={{
                        marginBottom: 1,
                        fontWeight: 600,
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '2rem',
                        color: theme.palette.primary.main,
                    }}
                >
                    Personal details
                </Typography>
                <Typography
                    sx={{
                        marginBottom: 4,
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '0.9rem',
                        fontWeight: 400,
                        color: theme.palette.text.secondary,
                    }}
                >
                    Update your personal information and profile settings
                </Typography>
                <Box
                    sx={{
                        position: 'relative',
                        width: 130,
                        height: 130,
                        mb: 4,
                    }}
                >
                    <Avatar
                        src={avatarPreview}
                        alt="Profile Avatar"
                        sx={{ width: '100%', height: '100%' }}
                    />
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                    <Box
                        onClick={handleClick}
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            bgcolor: 'rgba(0,0,0,0.5)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            opacity: 0,
                            transition: 'opacity 0.3s',
                            cursor: 'pointer',
                            '&:hover': { opacity: 1 },
                            gap: 0.7,
                        }}
                    >
                        <Edit sx={{ fontSize: '1.2rem' }} />
                        <Typography
                            sx={{
                                fontWeight: 500,
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '0.85rem',
                            }}
                        >
                            Edit Avatar
                        </Typography>
                    </Box>
                </Box>

                {/* User Information Fields */}
                <Grid
                    container
                    rowSpacing={2}
                    columnSpacing={3}
                    paddingRight={20}
                >
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0.5,
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 400,
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '0.8rem',
                                color: theme.palette.text.primary,
                            }}
                        >
                            First name
                        </Typography>
                        <TextField
                            fullWidth
                            size="small"
                            name="firstName"
                            value={userData.firstName}
                            onChange={handleChange}
                            sx={{
                                '& .MuiInputBase-input': {
                                    color: theme.palette.text.primary,
                                    fontFamily: 'Poppins, sans-serif',
                                },
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0.5,
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 400,
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '0.8rem',
                                color: theme.palette.text.primary,
                            }}
                        >
                            Last name
                        </Typography>
                        <TextField
                            fullWidth
                            size="small"
                            name="lastName"
                            value={userData.lastName}
                            onChange={handleChange}
                            sx={{
                                '& .MuiInputBase-input': {
                                    color: theme.palette.text.primary,
                                    fontFamily: 'Poppins, sans-serif',
                                },
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0.5,
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 400,
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '0.8rem',
                                color: theme.palette.text.primary,
                            }}
                        >
                            Email address
                        </Typography>
                        <TextField
                            fullWidth
                            size="small"
                            name="email"
                            variant="outlined"
                            InputProps={{ readOnly: true }}
                            value={user.email}
                            onChange={handleChange}
                            sx={{
                                backgroundColor: alpha(
                                    theme.palette.text.disabled,
                                    0.15,
                                ),
                                borderRadius: '8px',
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'transparent',
                                    borderWidth: '0px',
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                                    {
                                        borderColor: 'transparent',
                                        borderWidth: '0px',
                                    },
                                '& .MuiInputBase-input': {
                                    color: theme.palette.text.primary,
                                    fontFamily: 'Poppins, sans-serif',
                                },
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0.5,
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 400,
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '0.8rem',
                                color: theme.palette.text.primary,
                            }}
                        >
                            Username
                        </Typography>
                        <TextField
                            fullWidth
                            size="small"
                            name="username"
                            value={user.username}
                            onChange={handleChange}
                            sx={{
                                '& .MuiInputBase-input': {
                                    color: theme.palette.text.primary,
                                    fontFamily: 'Poppins, sans-serif',
                                },
                            }}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0.5,
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 400,
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '0.8rem',
                                color: theme.palette.text.primary,
                            }}
                        >
                            Created date
                        </Typography>
                        <TextField
                            fullWidth
                            size="small"
                            value={user.created_at}
                            // value={dayjs(userData.createdDate).format('DD MMM YYYY HH:mm')}
                            InputProps={{ readOnly: true }}
                            sx={{
                                backgroundColor: alpha(
                                    theme.palette.text.disabled,
                                    0.15,
                                ),
                                borderRadius: '8px',
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'transparent',
                                    borderWidth: '0px',
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                                    {
                                        borderColor: 'transparent',
                                        borderWidth: '0px',
                                    },
                                '& .MuiInputBase-input': {
                                    color: theme.palette.text.primary,
                                    fontFamily: 'Poppins, sans-serif',
                                },
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0.5,
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 400,
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '0.8rem',
                                color: theme.palette.text.primary,
                            }}
                        >
                            User role
                        </Typography>
                        <TextField
                            fullWidth
                            size="small"
                            value={user.role}
                            InputProps={{ readOnly: true }}
                            sx={{
                                backgroundColor: alpha(
                                    theme.palette.text.disabled,
                                    0.15,
                                ),
                                borderRadius: '8px',
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'transparent',
                                    borderWidth: '0px',
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                                    {
                                        borderColor: 'transparent',
                                        borderWidth: '0px',
                                    },
                                '& .MuiInputBase-input': {
                                    color: theme.palette.text.primary,
                                    fontFamily: 'Poppins, sans-serif',
                                },
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0.5,
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 400,
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '0.8rem',
                                color: theme.palette.text.primary,
                            }}
                        >
                            Premium expired date
                        </Typography>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            value={user.premium}
                            InputProps={{ readOnly: true }}
                            sx={{
                                backgroundColor: alpha(
                                    theme.palette.text.disabled,
                                    0.15,
                                ),
                                borderRadius: '8px',
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'transparent',
                                    borderWidth: '0px',
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                                    {
                                        borderColor: 'transparent',
                                        borderWidth: '0px',
                                    },
                                '& .MuiInputBase-input': {
                                    color: theme.palette.text.primary,
                                    fontFamily: 'Poppins, sans-serif',
                                },
                            }}
                        />
                    </Grid>
                </Grid>

                {/* Save Button */}
                <CustomButton
                    text="Save Changes"
                    height={40}
                    onClick={handleSave}
                    sx={{
                        marginTop: 5,
                        width: 'fit-content',
                    }}
                />
            </Box>

            {/* Success Popup */}
            <SuccessPopup
                open={showSuccessPopup}
                onClose={() => setShowSuccessPopup(false)}
                message="User details updated successfully!"
            />
        </>
    )
}

export default PersonalDetails
