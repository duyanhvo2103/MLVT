import React, { useEffect, useState, ChangeEvent } from "react";
import { Box, TextField, Button, Typography, Checkbox, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Authentication from '../../layouts/authen-layout';
import { useTheme } from '../../theme';
import { useSnackbar } from "notistack";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/auth-context';
import { loginUser } from '../../api/account.api'; 
import axios from "axios";

interface FormData {
    email: string;
    password: string;
    rememberMe: boolean;
    showPassword: boolean;
}

interface Errors {
    emailError: boolean;
    passwordError: boolean;
    errorMessage: string;
}

const InputStyles = (theme: any) => ({
    sx: {
        '& input::placeholder': {
            fontSize: '0.9rem',
            color: theme.fontColor.gray,
        },
        borderRadius: 2,
    }
});

interface CustomTextFieldProps {
    label: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    error: boolean;
    helperText: string;
    type?: string;
    showPassword?: boolean;
    togglePasswordVisibility?: () => void;
}

const getEndAdornment = (showPassword: boolean, togglePasswordVisibility: () => void) => (
    <InputAdornment position="end">
        <IconButton
            onClick={togglePasswordVisibility}
            onMouseDown={(event) => event.preventDefault()}
            edge="end"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
            {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
    </InputAdornment>
);

const CustomTextField: React.FC<CustomTextFieldProps> = ({ label, value, onChange, onBlur, error, helperText, type = "text", showPassword, togglePasswordVisibility }) => {
    const theme = useTheme();
    return (
        <Box>
            <Typography sx={{
                fontFamily: theme.typography.body1.fontFamily,
                color: theme.fontColor.black,
                fontSize: 14,
                fontWeight: 500,
                marginTop: 0.5,
            }}>
                {label}
            </Typography>
            <TextField
                placeholder={`Enter your ${label.toLowerCase()}`}
                type={type === "password" && showPassword ? "text" : type}
                fullWidth
                margin="normal"
                size="small"
                required
                slotProps={{
                    input: {
                        ...InputStyles(theme),
                        endAdornment: type === "password" ? getEndAdornment(showPassword!, togglePasswordVisibility!) : undefined,
                    },
                    formHelperText: {
                        sx: {
                            fontFamily: theme.typography.body1.fontFamily,
                            fontColor: theme.status.failed.fontColor,
                            marginLeft: 0,
                            fontSize: 12,
                        },
                    }
                }}
                sx={{
                    marginTop: 0.6,
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: theme.background.main
                        },
                    },
                    '& .MuiInputBase-input': {
                        fontFamily: theme.typography.body1.fontFamily,
                        fontSize: 14,
                    }
                }}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={error}
                helperText={helperText}
            />
        </Box>
    );
};

const Login: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();
    const { login } = useAuth();
    const location = useLocation();

    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        rememberMe: false,
        showPassword: false,
    });

    const [errors, setErrors] = useState<Errors>({
        emailError: false,
        passwordError: false,
        errorMessage: '',
    });

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            navigate('/', { replace: true });
        }
    }, [navigate]);

    useEffect(() => {
        if (location.state?.successMessage) {
            enqueueSnackbar(location.state.successMessage, { variant: 'success' });
        }
    }, [location.state, enqueueSnackbar]);

    const validateFields = (): boolean => {
        const emailError = !formData.email;
        const passwordError = !formData.password;
        setErrors({ ...errors, emailError, passwordError });
        return !emailError && !passwordError;
    };

    const handleLogin = async () => {
        if (!validateFields()) return;
        setLoading(true);

        try {
            const response = await loginUser({
                email: formData.email,
                password: formData.password
            });

            login(response.token, response.user_id);
            navigate('/dashboard');
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const errorMessage = err.response?.status === 400
                    ? "Validation error. Please check your inputs."
                    : err.response?.status === 401
                        ? "Invalid credentials. Please try again."
                        : "Failed to login. Please try again.";
                setErrors({ ...errors, errorMessage });
            } else {
                setErrors({ ...errors, errorMessage: "Failed to login. Please check your connection." });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field: keyof FormData) => (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setFormData({ ...formData, showPassword: !formData.showPassword });
    };

    return (
        <Authentication>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 4 }}>
                <Typography variant="h4" gutterBottom sx={{
                    color: theme.fontColor.black,
                    fontFamily: theme.typography.h1.fontFamily,
                    fontWeight: theme.typography.fontWeightBold,
                    fontSize: 60,
                    marginTop: 1,
                }}>
                    Welcome back!
                </Typography>
                <Typography variant="body1" sx={{
                    marginBottom: 3,
                    color: theme.fontColor.black,
                    fontFamily: theme.typography.body1.fontFamily,
                    fontWeight: 500,
                    fontSize: 15,
                }}>
                    Enter your Credentials to access your account
                </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
                <CustomTextField
                    label="Email address"
                    value={formData.email}
                    onChange={handleChange('email')}
                    onBlur={() => setErrors({ ...errors, emailError: !formData.email })}
                    error={errors.emailError}
                    helperText={errors.emailError ? 'Email is required' : ''}
                />
                <CustomTextField
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange('password')}
                    onBlur={() => setErrors({ ...errors, passwordError: !formData.password })}
                    error={errors.passwordError}
                    helperText={errors.passwordError ? 'Password is required' : ''}
                    showPassword={formData.showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                />
            </Box>

            {errors.errorMessage && (
                <Typography color="error" sx={{ marginTop: 2, fontSize: 14, fontFamily: theme.typography.body1.fontFamily }}>
                    {errors.errorMessage}
                </Typography>
            )}

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2, marginTop: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox
                        id="rememberMe"
                        size="small"
                        sx={{
                            padding: 0,
                            '&.Mui-checked': {
                                color: theme.background.main,
                            }
                        }}
                        checked={formData.rememberMe}
                        onChange={() => setFormData({ ...formData, rememberMe: !formData.rememberMe })}
                    />
                    <Typography
                        htmlFor="rememberMe"
                        component="label"
                        sx={{
                            marginLeft: 1,
                            fontSize: '0.8rem',
                            color: theme.fontColor.gray,
                            display: 'flex',
                            alignItems: 'center',
                            fontFamily: theme.typography.body1.fontFamily,
                        }}
                    >
                        Remember for 30 days
                    </Typography>
                </Box>
                <Typography variant="body2" sx={{
                    cursor: "pointer",
                    color: theme.status.inProgress.fontColor,
                    fontFamily: theme.typography.body1.fontFamily,
                    fontSize: '0.8rem',
                    '&:hover': {
                        textDecoration: 'underline',
                    },
                }}>
                    Forgot password?
                </Typography>
            </Box>

            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleLogin}
                sx={{
                    marginBottom: 2,
                    marginTop: 3.5,
                    borderRadius: 2.5,
                    backgroundColor: theme.background.main,
                    fontFamily: theme.typography.h1.fontFamily,
                    fontWeight: theme.typography.fontWeightBold,
                    fontSize: '1rem',
                    height: '2.5rem',
                    '&:hover': {
                        backgroundColor: theme.background.main,
                    },
                }}
                disabled={loading}
            >
                {loading ? 'Logging in...' : 'LOG IN'}
            </Button>
        </Authentication>
    );
};

export default Login;