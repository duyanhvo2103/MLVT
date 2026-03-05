import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
    Box,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
    useTheme,
} from '@mui/material'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useGetUserDetails } from 'src/hooks/useGetUserDetails'
import { CustomButton } from '../../../components/CustomButton'
import SuccessPopup from '../../../components/SuccessPopup'
import { changePassword } from '../apis/user.api'

type FieldKey = 'current' | 'new' | 'confirm'

const labels: Record<FieldKey, string> = {
    current: 'Current Password',
    new: 'New Password',
    confirm: 'Confirm Password',
}

const ids: Record<FieldKey, string> = {
    current: 'current-password',
    new: 'new-password',
    confirm: 'confirm-password',
}

const ChangePassword: React.FC = () => {
    const theme = useTheme()
    const { data: userDetails } = useGetUserDetails()
    const userId = userDetails?.user.id.toString() || ''
    const [values, setValues] = useState<Record<FieldKey, string>>({
        current: '',
        new: '',
        confirm: '',
    })
    const [show, setShow] = useState<Record<FieldKey, boolean>>({
        current: false,
        new: false,
        confirm: false,
    })
    const [errors, setErrors] = useState<Record<FieldKey, string>>({
        current: '',
        new: '',
        confirm: '',
    })
    const currentRef = useRef<HTMLInputElement>(null)
    const newRef = useRef<HTMLInputElement>(null)
    const confirmRef = useRef<HTMLInputElement>(null)
    const refs = useMemo(
        () => ({
            current: currentRef,
            new: newRef,
            confirm: confirmRef,
        }),
        [],
    )

    const [successPopup, setSuccessPopup] = useState(false)

    const handleToggleShow = useCallback((key: FieldKey) => {
        setShow((s) => ({ ...s, [key]: !s[key] }))
    }, [])

    const handleChange = useCallback((key: FieldKey, v: string) => {
        setValues((prev) => ({ ...prev, [key]: v }))
        setErrors((e) => ({ ...e, [key]: '' }))
    }, [])

    const validate = useCallback((): boolean => {
        const newErrs: Record<FieldKey, string> = {
            current: '',
            new: '',
            confirm: '',
        }
        let focusKey: FieldKey | null = null

        // required
        ;(['current', 'new', 'confirm'] as FieldKey[]).forEach((k) => {
            if (!values[k].trim()) {
                newErrs[k] = 'This field is required'
                focusKey = focusKey || k
            }
        })

        // new ≠ current
        if (!newErrs.new && values.new && values.new === values.current) {
            newErrs.new = 'New password must differ from current'
            focusKey = focusKey || 'new'
        }

        // confirm matches new
        if (
            !newErrs.confirm &&
            values.confirm.trim() &&
            values.confirm !== values.new
        ) {
            newErrs.confirm = 'Passwords do not match'
            focusKey = focusKey || 'confirm'
        }

        setErrors(newErrs)
        if (focusKey) refs[focusKey].current?.focus()

        return Object.values(newErrs).every((msg) => msg === '')
    }, [values, refs])

    const handleSave = useCallback(async () => {
        if (!validate()) return
        if (!userId) {
            console.error('No user ID; cannot change password')
            return
        }
        try {
            await changePassword(userId, values.current, values.new)
            setSuccessPopup(true)
            setTimeout(() => window.location.reload(), 3000)
        } catch (err: any) {
            console.error(err)
            const status = err?.response?.status
            const msg = err?.response?.data?.message || 'Unexpected error.'
            if (status === 400 || status === 401) alert(msg)
            else
                alert(
                    'An error occurred while changing password. Please try again.',
                )
        }
    }, [userId, validate, values])

    return (
        <Box>
            <Box p={4}>
                <Typography
                    sx={{
                        mb: 1,
                        fontWeight: 600,
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '2rem',
                        color: theme.palette.primary.main,
                    }}
                >
                    Change password
                </Typography>
                <Typography
                    sx={{
                        mb: 4,
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '0.9rem',
                        fontWeight: 400,
                        color: theme.palette.text.secondary,
                    }}
                >
                    Change password and remember to ensure your security.
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        maxWidth: '50%',
                    }}
                >
                    {(['current', 'new', 'confirm'] as FieldKey[]).map(
                        (key) => {
                            const isConfirm = key === 'confirm'
                            const isMismatch =
                                isConfirm &&
                                values.confirm.length > 0 &&
                                values.new !== values.confirm

                            // An error exists if it comes from validation OR there's a live mismatch.
                            const hasError = !!errors[key] || isMismatch
                            // The helper text should prioritize the validation message.
                            const helperText =
                                errors[key] ||
                                (isMismatch ? 'Passwords do not match' : '')

                            return (
                                <Box
                                    key={key}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 1,
                                        width: '100%',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily: 'Poppins, sans-serif',
                                            fontSize: '0.9rem',
                                            fontWeight: 450,
                                            color: theme.palette.text.primary,
                                        }}
                                    >
                                        {labels[key]}
                                    </Typography>
                                    <TextField
                                        id={ids[key]}
                                        inputRef={refs[key]}
                                        fullWidth
                                        size="small"
                                        type={show[key] ? 'text' : 'password'}
                                        value={values[key]}
                                        onChange={(e) =>
                                            handleChange(key, e.target.value)
                                        }
                                        InputProps={{
                                            style: {
                                                fontFamily:
                                                    'Poppins, sans-serif',
                                                fontSize: '0.9rem',
                                            },
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() =>
                                                            handleToggleShow(
                                                                key,
                                                            )
                                                        }
                                                        edge="end"
                                                        sx={{
                                                            color: theme.palette
                                                                .text.secondary,
                                                            '&:hover': {
                                                                color: theme
                                                                    .palette
                                                                    .primary
                                                                    .main,
                                                            },
                                                        }}
                                                    >
                                                        {show[key] ? (
                                                            <Visibility />
                                                        ) : (
                                                            <VisibilityOff />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        error={hasError}
                                        helperText={helperText}
                                        sx={{
                                            '& .MuiFormHelperText-root.Mui-error':
                                                {
                                                    color: theme.palette.error
                                                        .contrastText,
                                                    fontFamily:
                                                        'Poppins, sans-serif',
                                                    fontWeight: 500,
                                                    mt: 0.5,
                                                    border: theme.palette.error
                                                        .contrastText,
                                                },
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '8px',
                                                '&.Mui-error .MuiOutlinedInput-notchedOutline':
                                                    {
                                                        borderColor:
                                                            theme.palette.error
                                                                .contrastText,
                                                        borderWidth: '1.5px',
                                                    },
                                            },
                                        }}
                                        required
                                    />
                                </Box>
                            )
                        },
                    )}
                </Box>

                <Box mt={5} width="fit-content">
                    <CustomButton
                        text="Save Changes"
                        onClick={handleSave}
                        height={40}
                    />
                </Box>
            </Box>

            <SuccessPopup
                open={successPopup}
                onClose={() => setSuccessPopup(false)}
                message="Password changed successfully!"
            />
        </Box>
    )
}

export default ChangePassword
