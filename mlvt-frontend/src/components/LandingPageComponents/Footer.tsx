import React from "react";
import {
    Box,
    Container,
    Grid,
    Typography,
    Link,
    Divider,
    Stack,
} from "@mui/material";
import fitHcmusLogo from "../../assets/fithcmus.png";

const Footer: React.FC = () => {
    const primaryTextColor = "#FFFFFF";
    const secondaryTextColor = "#B0B0B0";
    const linkColor = "#E0E0E0";
    const linkHoverColor = "#906bff";

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "transparent",
                color: secondaryTextColor,
                py: { xs: 4, md: 6 },
                px: { xs: 2, md: 0 },
                fontSize: "0.875rem",
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 4, md: 5 }}>
                    {/* Column 1: Project Info */}
                    <Grid item xs={12} sm={6} md={5}>
                        <Typography
                            variant="h6"
                            component="div"
                            gutterBottom
                            sx={{
                                color: primaryTextColor,
                                fontWeight: "bold",
                                mb: 2,
                                fontFamily: "Poppins, sans-serif",
                            }}
                        >
                            MLVT@HCMUS
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ mb: 1, fontFamily: "Poppins, sans-serif" }}
                        >
                            Multi Language Video Translation Project
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ mb: 0.5, fontFamily: "Poppins, sans-serif" }}
                        >
                            227 Nguyen Van Cu Str., HCMC, VN
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            <Link
                                href="mailto:MLVT.HCMUS@gmail.com"
                                sx={{
                                    color: linkColor,
                                    "&:hover": {
                                        color: linkHoverColor,
                                        textDecorationColor: linkHoverColor,
                                    },
                                    fontFamily: "Poppins, sans-serif",
                                }}
                            >
                                MLVT.HCMUS@gmail.com
                            </Link>
                            {" | "}
                            <Link
                                href="tel:+842862884499"
                                sx={{
                                    color: linkColor,
                                    "&:hover": {
                                        color: linkHoverColor,
                                        textDecorationColor: linkHoverColor,
                                    },
                                    fontFamily: "Poppins, sans-serif",
                                }}
                            >
                                +84 286 288 4499
                            </Link>
                        </Typography>
                        <Link
                            href="#"
                            underline="always"
                            sx={{
                                color: linkColor,
                                textDecorationColor: "rgba(224, 224, 224, 0.5)",
                                "&:hover": {
                                    color: linkHoverColor,
                                    textDecorationColor: linkHoverColor,
                                },
                            }}
                        >
                            Team Conditional & Policy
                        </Link>
                    </Grid>

                    {/* Column 2: Pages Links */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography
                            variant="subtitle1"
                            component="div"
                            gutterBottom
                            sx={{
                                color: primaryTextColor,
                                fontWeight: "bold",
                                mb: 2,
                                fontFamily: "Poppins, sans-serif",
                            }}
                        >
                            Pages
                        </Typography>
                        <Stack spacing={1}>
                            {" "}
                            {/* This is where Stack is used */}
                            <Link
                                href="#"
                                sx={{
                                    color: linkColor,
                                    "&:hover": { color: linkHoverColor },
                                }}
                            >
                                Sample
                            </Link>
                            <Link
                                href="#"
                                sx={{
                                    color: linkColor,
                                    "&:hover": { color: linkHoverColor },
                                }}
                            >
                                Document
                            </Link>
                            <Link
                                href="#"
                                sx={{
                                    color: linkColor,
                                    "&:hover": { color: linkHoverColor },
                                }}
                            >
                                Resource
                            </Link>
                            <Link
                                href="#"
                                sx={{
                                    color: linkColor,
                                    "&:hover": { color: linkHoverColor },
                                }}
                            >
                                Help
                            </Link>
                        </Stack>
                    </Grid>

                    {/* Column 3: Powered By */}
                    <Grid item xs={12} md={4}>
                        <Typography
                            variant="subtitle1"
                            component="div"
                            gutterBottom
                            sx={{
                                color: primaryTextColor,
                                fontWeight: "bold",
                                mb: 2,
                                fontFamily: "Poppins, sans-serif",
                            }}
                        >
                            Powered by
                        </Typography>
                        <Box
                            component="a"
                            href="http://fit.hcmus.edu.vn"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                display: "inline-block",
                                "&:hover img": { opacity: 0.85 },
                            }}
                        >
                            <img
                                src={fitHcmusLogo}
                                alt="FIT@HCMUS Logo"
                                style={{
                                    maxHeight: "50px",
                                    width: "auto",
                                    display: "block",
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>

                <Divider
                    sx={{ my: 4, borderColor: "rgba(255, 255, 255, 0.1)" }}
                />

                <Typography
                    variant="body2"
                    textAlign="center"
                    fontFamily={"Poppins, sans-serif"}
                    sx={{ color: secondaryTextColor }}
                >
                    © {new Date().getFullYear()} Graduation Company. All rights
                    reserved.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
