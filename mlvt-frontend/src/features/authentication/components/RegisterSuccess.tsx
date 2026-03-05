import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";

const linkStyle = {
    color: "#1976d2",
    textDecoration: "underline",
    fontWeight: "600",
    cursor: "pointer",
};

const SignupSuccess = () => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                paddingTop: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                margin: 0,
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    color: theme.palette.primary.main,
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: theme.typography.fontWeightBold,
                    fontSize: { xs: "2rem", md: "3rem" },
                    marginBottom: 3,
                }}
            >
                Get Started Now!
            </Typography>
            <CheckCircleIcon
                sx={{
                    fontSize: { xs: 120, md: 200 },
                    color: theme.palette.success.contrastText,
                    alignSelf: "center",
                }}
            />

            <Typography
                sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: theme.typography.fontWeightBold,
                    fontSize: { xs: "1.5rem", md: "2rem" },
                    marginTop: 5,
                    color: theme.palette.success.contrastText,
                }}
            >
                REGISTRATION SUCCESSFUL
            </Typography>
            <Typography
                sx={{
                    fontSize: "1rem",
                    fontFamily: "Poppins, sans-serif",
                    marginTop: 7,
                }}
            >
                Thank you for joining us!
            </Typography>
            <Typography
                sx={{
                    fontSize: "1rem",
                    fontFamily: "Poppins, sans-serif",
                    marginTop: 1,
                }}
            >
                You can now start your experience.{" "}
                <Link to="/login" style={linkStyle}>
                    Login here
                </Link>
            </Typography>
        </Box>
    );
};

export default SignupSuccess;
