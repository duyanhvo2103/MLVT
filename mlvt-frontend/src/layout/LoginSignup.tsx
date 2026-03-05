import React, { ReactNode } from "react";
import { Box } from "@mui/material";
import img from '../assets/login_background.png';
import Footer from "../components/Footer";
import ThemeSwitchToggle from "../components/ThemeSwitchToggle";

interface LayoutProps {
    children: ReactNode;
}

const LoginSignup: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh"
        }}>
            {/* Main Content */}
            <Box sx={{
                flex: 1,
                display: "flex",
                flexDirection: "row"
            }}>
                {/* Left Side - Form */}
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: 4 }}>
                    <ThemeSwitchToggle />
                    <Box sx={{ maxWidth: 500, margin: "auto" }}>
                        {children}
                    </Box>
                </Box>

                {/* Right Side - Image */}
                <Box
                    sx={{
                        flex: 1,
                        backgroundImage: `url(${img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        overflow: "hidden",
                        minHeight: "100vh"
                    }}
                />
            </Box>

            {/* Footer */}
            <Footer />
        </Box>
    );
};

export default LoginSignup;
