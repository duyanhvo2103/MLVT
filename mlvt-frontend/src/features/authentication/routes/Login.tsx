import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Checkbox, Divider, TextField, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useSnackbar } from 'notistack'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CustomButton } from '../../../components/CustomButton'
import { useAuth } from '../../../contexts/AuthContext'
import LoginSignup from '../../../layout/LoginSignup'
import { login as apiLogin } from '../api/auth.api'
import FacebookLoginButton from '../components/SocialLoginButton/FacebookLoginButton'
import GoogleLoginButton from '../components/SocialLoginButton/GoogleLoginButton'

const InputStyles = (theme: any) => ({
    sx: {
        '& input::placeholder': {
            fontSize: '0.9rem',
            color: theme.palette.text.primary,
            fontFamily: 'Poppins, sans-serif',
            borderRadius: 2.5,
        },
    },
    style: {
        fontFamily: 'Poppins, sans-serif',
        fontSize: '0.9rem',
    },
})

const Login = () => {
    const navigate = useNavigate()
    const { login: setAuthData } = useAuth()
    const authToken = localStorage.getItem('authToken')

    useEffect(() => {
        if (authToken) {
            navigate('/', { replace: true })
        }
    }, [authToken, navigate])

    const theme = useTheme()
    const { enqueueSnackbar } = useSnackbar()

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState('')
    const [emailError, setEmailError] = React.useState(false)
    const [passwordError, setPasswordError] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [rememberMe, setRememberMe] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)
    const location = useLocation()

    useEffect(() => {
        if (location.state?.successMessage) {
            enqueueSnackbar(location.state.successMessage, {
                variant: 'success',
            })
        }
    }, [location.state, enqueueSnackbar])

    const validateEmail = () => setEmailError(!email)
    const validatePassword = () => setPasswordError(!password)

    const handleLogin = async () => {
        setError('')
        let valid = true

        if (!email) {
            setEmailError(true)
            valid = false
        }

        if (!password) {
            setPasswordError(true)
            valid = false
        }

        if (!valid) return

        setLoading(true)

        try {
            const responseData = await apiLogin({
                email: email,
                password: password, // Send the raw password
            })

            setAuthData(responseData.token, responseData.user_id)
            navigate('/')
        } catch (err: any) {
            const errorMessage =
                err.response?.data?.message ||
                'Invalid credentials. Please try again.'
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return (
        <LoginSignup>
            <Typography
                gutterBottom
                sx={{
                    color: theme.palette.text.primary,
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 600,
                    fontSize: {
                        xs: '1.8rem',
                        sm: '2.5rem',
                        md: '3rem',
                        lg: '3.5rem',
                    },
                    mt: 3,
                }}
            >
                Welcome back !
            </Typography>
            <Typography
                sx={{
                    marginBottom: 5,
                    color: theme.palette.text.primary,
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 500,
                    fontSize: 16,
                    textAlign: 'center',
                }}
            >
                Enter your Credentials to access your account
            </Typography>

            {/* Email Input */}
            <Typography
                sx={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 14,
                    fontWeight: 500,
                    marginTop: 2.5,
                }}
            >
                Email address
            </Typography>
            <TextField
                placeholder="Enter your email"
                type="email"
                fullWidth
                margin="normal"
                size="small"
                required
                InputProps={InputStyles(theme)}
                sx={{
                    marginTop: 1.5,
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: theme.palette.text.primary,
                        },
                    },
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
                error={emailError}
                helperText={emailError ? 'Email is required' : ''}
                FormHelperTextProps={{
                    sx: {
                        fontFamily: 'Poppins, sans-serif',
                        marginLeft: 0,
                        fontSize: 12,
                        color: `${theme.palette.error.contrastText} !important`,
                    },
                }}
            />

            {/* Password Input */}
            <Typography
                sx={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 14,
                    fontWeight: 500,
                    marginTop: 1.5,
                }}
            >
                Password
            </Typography>
            <TextField
                placeholder="Enter your password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                margin="normal"
                size="small"
                required
                InputProps={{
                    ...InputStyles(theme),
                    endAdornment: (
                        <Box
                            sx={{
                                cursor: 'pointer',
                                color: theme.palette.text.secondary,
                                marginRight: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </Box>
                    ),
                }}
                sx={{
                    marginTop: 1.5,
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: theme.palette.text.primary,
                        },
                    },
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword}
                error={passwordError}
                helperText={passwordError ? 'Password is required' : ''}
                FormHelperTextProps={{
                    sx: {
                        fontFamily: 'Poppins, sans-serif',
                        color: `${theme.palette.error.contrastText} !important`,
                        marginLeft: 0,
                        fontSize: 12,
                    },
                }}
            />

            {/* Error Message */}
            {error && (
                <Typography
                    color="error"
                    sx={{
                        marginTop: 2,
                        fontSize: 14,
                        fontFamily: 'Poppins, sans-serif',
                    }}
                >
                    {error}
                </Typography>
            )}

            {/* Remember Me and Forgot Password */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 2,
                    marginTop: 2,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox
                        id="rememberMe"
                        size="medium"
                        sx={{
                            color: theme.palette.secondary.contrastText,
                            padding: 0,
                            '&.Mui-checked': {
                                color: theme.palette.secondary.contrastText,
                            },
                        }}
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                    />
                    <Typography
                        htmlFor="rememberMe"
                        component="label"
                        sx={{
                            marginLeft: 1,
                            fontSize: '0.8rem',
                            color: theme.palette.text.secondary,
                            fontFamily: 'Poppins, sans-serif',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        Remember for 30 days
                    </Typography>
                </Box>
                <Typography
                    variant="body2"
                    sx={{
                        cursor: 'pointer',
                        color: theme.palette.neutral.main,
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '0.8rem',
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    }}
                >
                    Forgot password?
                </Typography>
            </Box>

            {/* Login Button */}
            <CustomButton
                text="LOG IN"
                onClick={handleLogin}
                loading={loading}
                sx={{
                    marginBottom: 2,
                    marginTop: 2,
                    borderRadius: 1.25,
                    width: '100%',
                }}
            />

            {/* Divider */}
            <Divider
                sx={{
                    my: 1.5,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '0.8rem',
                }}
            >
                Or
            </Divider>

            {/* Social Login Buttons */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 2,
                }}
            >
                <GoogleLoginButton />
                <FacebookLoginButton />
            </Box>

            {/* Signup Link */}
            <Box
                sx={{
                    textTransform: 'none',
                    color: theme.palette.text.secondary,
                    fontSize: '0.8rem',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    sx={{
                        marginTop: 3,
                        alignItems: 'center',
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '0.9rem',
                    }}
                >
                    Don’t have an account?{' '}
                    <a
                        href="/signup"
                        style={{
                            color: theme.palette.secondary.contrastText,
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 600,
                        }}
                    >
                        Sign Up
                    </a>
                </Typography>
            </Box>
        </LoginSignup>
    )
}

export default Login
