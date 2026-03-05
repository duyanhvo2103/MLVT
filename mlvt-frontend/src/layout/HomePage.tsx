import { ReactNode } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Sidebar from "../components/SideBar";
import Footer from "../components/Footer";

interface HomepageProps {
    children: ReactNode;
}

const HomePage = ({ children }: HomepageProps) => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                padding: 0,
                gap: 0,
                overflowY: "scroll",
                height: "100vh",
            }}
        >
            {/* Layout of sidebar and content */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: {
                        xs: "column",
                        lg: "row",
                    },
                    flex: 1,
                }}
            >
                <Sidebar />
                <Box
                    sx={{
                        width: "100%",
                        overflowY: "scroll",
                        backgroundColor: theme.palette.background.default,
                    }}
                >
                    {children}
                </Box>
            </Box>
            {/* Footer */}
            <Footer />
            <Box
                sx={{
                    backgroundColor: theme.palette.background.default,
                    padding: "1rem",
                    textAlign: "center",
                }}
            >
                <Typography
                    variant="body2"
                    sx={{
                        color: theme.palette.text.secondary,
                        fontFamily: "Poppins, sans-serif",
                    }}
                >
                    © {new Date().getFullYear()} Graduation Company. All rights
                    reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default HomePage;
