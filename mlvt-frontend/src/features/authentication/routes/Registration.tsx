import React, { useState } from "react";
import {
    Box,
    TextField,
    Typography,
    Divider,
    IconButton,
    InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoginSignup from "../../../layout/LoginSignup";
import { useTheme } from "@mui/material/styles";
import GoogleLoginButton from "../components/SocialLoginButton/GoogleLoginButton";
import FacebookLoginButton from "../components/SocialLoginButton/FacebookLoginButton";
import { register } from "../api/auth.api";
import { CustomButton } from "../../../components/CustomButton";
import CustomLoadingDot from "../../../components/CustomLoadingDot";
import SignupSuccess from "../components/RegisterSuccess";

const formFieldsConfig = [
    {
        name: "firstName",
        label: "First Name",
        placeholder: "Enter your first name",
        type: "text",
    },
    {
        name: "lastName",
        label: "Last Name",
        placeholder: "Enter your last name",
        type: "text",
    },
    {
        name: "username",
        label: "Username",
        placeholder: "Enter your username",
        type: "text",
    },
    {
        name: "email",
        label: "Email Address",
        placeholder: "Enter your email address",
        type: "email", // Use type="email" for better semantics and mobile keyboards
    },
    {
        name: "password",
        label: "Password",
        placeholder: "Enter your password",
        type: "password",
    },
    {
        name: "confirmPassword",
        label: "Confirm Password",
        placeholder: "Confirm your password",
        type: "password",
    },
];

const toSnakeCase = (obj: any) => {
    const newObj: any = {};
    for (const key in obj) {
        const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
        newObj[snakeKey] = obj[key];
    }
    return newObj;
};

interface FormState {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Registration: React.FC = () => {
    const theme = useTheme();

    const [formData, setFormData] = useState<FormState>({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<Partial<FormState>>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isRegistrationSuccessful, setIsRegistrationSuccessful] =
        useState(false);

    const handleChange =
        (field: keyof FormState) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, [field]: e.target.value });
            setErrors({ ...errors, [field]: "" });
            setError("");
        };

    // Toggle password visibility
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () =>
        setShowConfirmPassword(!showConfirmPassword);

    // Validate form data
    const validate = (): boolean => {
        const newErrors: Partial<FormState> = {};
        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        if (!formData.username) newErrors.username = "Username is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = "Password does not match";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Signup handler
    const handleSignup = async () => {
        if (!validate()) return;

        setLoading(true);
        setError("");
        const requestData = toSnakeCase(formData);
        try {
            const responseData = await register(requestData);
            console.log("Registration successful:", responseData.message);

            setIsRegistrationSuccessful(true);
        } catch (err: any) {
            const errorMessage =
                err.response?.data?.message || "Failed to register.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const InputStyles = {
        "& input::placeholder": {
            fontSize: "0.9rem",
            color: theme.palette.text.secondary,
            fontFamily: "Poppins, sans-serif",
            borderRadius: 2.5,
        },
    };

    const renderContent = () => {
        if (isRegistrationSuccessful) {
            return <SignupSuccess />;
        }

        if (loading) {
            return <CustomLoadingDot content="Signing up..." />;
        }
        return (
            <>
                <Typography
                    gutterBottom
                    sx={{
                        color: theme.palette.text.primary,
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 600,
                        fontSize: {
                            xs: "1.8rem",
                            sm: "2.5rem",
                            md: "3rem",
                            lg: "3.5rem",
                        },
                        mt: 3,
                    }}
                >
                    Get Started Now!
                </Typography>

                {formFieldsConfig.map((field) => (
                    <Box key={field.name} marginBottom={2}>
                        <Typography
                            sx={{
                                fontFamily: "Poppins, sans-serif",
                                fontSize: 14,
                                display: "flex",
                                flexDirection: "row",
                                gap: 0.7,
                                fontWeight: 550,
                            }}
                        >
                            {field.label}
                            <Typography
                                sx={{
                                    color: theme.palette.error.contrastText,
                                    fontWeight: 550,
                                }}
                            >
                                *
                            </Typography>
                        </Typography>
                        <TextField
                            placeholder={field.placeholder}
                            // type={field.type}
                            fullWidth
                            margin="normal"
                            size="small"
                            required
                            value={formData[field.name as keyof FormState]}
                            onChange={handleChange(
                                field.name as keyof FormState
                            )}
                            error={!!errors[field.name as keyof FormState]}
                            helperText={errors[field.name as keyof FormState]}
                            type={
                                field.type === "password"
                                    ? field.name === "password"
                                        ? showPassword
                                            ? "text"
                                            : "password"
                                        : showConfirmPassword
                                        ? "text"
                                        : "password"
                                    : field.type
                            }
                            InputProps={{
                                sx: InputStyles,
                                style: {
                                    fontFamily: "Poppins, sans-serif",
                                    fontSize: "0.9rem",
                                },
                                ...(field.type === "password" && {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={
                                                    field.name === "password"
                                                        ? togglePasswordVisibility
                                                        : toggleConfirmPasswordVisibility
                                                }
                                                edge="end"
                                            >
                                                {field.name === "password" ? (
                                                    showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )
                                                ) : showConfirmPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}{" "}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }),
                            }}
                            sx={{
                                marginTop: 0.6,
                                "& .MuiOutlinedInput-root": {
                                    "&.Mui-focused fieldset": {
                                        borderColor: theme.palette.text.primary,
                                    },
                                },
                            }}
                            FormHelperTextProps={{
                                sx: {
                                    color:
                                        theme.palette.error.contrastText ||
                                        "red",
                                    fontFamily: "Poppins, sans-serif",
                                    marginLeft: "0px",
                                    fontSize: "12px",
                                    marginTop: "4px",
                                    lineHeight: "1.5",
                                },
                            }}
                        />
                    </Box>
                ))}

                {/* Error Message */}
                {error && (
                    <Typography
                        sx={{
                            color: theme.palette.error.contrastText,
                            fontFamily: "Poppins, sans-serif",
                        }}
                    >
                        {error}
                    </Typography>
                )}

                {/* Sign Up Button */}
                <CustomButton
                    text="SIGN UP"
                    onClick={handleSignup}
                    loading={loading}
                    sx={{
                        marginBottom: 2,
                        marginTop: 2,
                        borderRadius: 1.25,
                        width: "100%",
                    }}
                />

                {/* Divider */}
                <Divider
                    sx={{
                        my: 1.5,
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "0.8rem",
                    }}
                >
                    Or
                </Divider>

                {/* Social Login Buttons */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 2,
                    }}
                >
                    <GoogleLoginButton />
                    <FacebookLoginButton />
                </Box>

                {/* Signup Link */}
                <Box
                    sx={{
                        textTransform: "none",
                        color: theme.palette.text.secondary,
                        fontSize: "0.8rem",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            marginTop: 3,
                            alignItems: "center",
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "0.9rem",
                        }}
                    >
                        Have an account?{" "}
                        <a
                            href="/login"
                            style={{
                                color: theme.palette.secondary.contrastText,
                                fontFamily: "Poppins, sans-serif",
                                fontWeight: 600,
                            }}
                        >
                            Log in
                        </a>
                    </Typography>
                </Box>
            </>
        );
    };

    return <LoginSignup>{renderContent()}</LoginSignup>;
};

export default Registration;
