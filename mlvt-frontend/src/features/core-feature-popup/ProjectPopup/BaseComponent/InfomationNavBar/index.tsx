import { Grid, Box, Typography, Divider, IconButton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplayIcon from "@mui/icons-material/Replay";
import { useTheme } from "@mui/material/styles";

interface InfoNavProps {
    CreatedAt?: Date | string;
    Language?: string;
}

export const InfoNav: React.FC<InfoNavProps> = ({
    CreatedAt = "None-detected",
    Language = "None-detected",
}) => {
    const theme = useTheme();
    return (
        <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{
                paddingBottom: "10px",
                borderRadius: "8px",
            }}
        >
            {/* Created section */}
            <Grid item xs={4}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "rpw",
                        gap: 1,
                        backgroundColor: theme.palette.action.hover,
                        padding: "10px 10px",
                        borderRadius: "10px",
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: "500",
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "0.8rem",
                            color: theme.palette.text.primary,
                        }}
                    >
                        Created
                    </Typography>
                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ backgroundColor: "white", width: "1px" }}
                    />
                    <Typography
                        sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: "400",
                            fontSize: "0.8rem",
                            color: theme.palette.text.primary,
                        }}
                    >
                        {CreatedAt.toLocaleString()}
                    </Typography>
                </Box>
            </Grid>

            {/* Translate To section */}
            <Grid item xs={4}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                        backgroundColor: theme.palette.action.hover,
                        padding: "10px 10px",
                        borderRadius: "10px",
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: "500",
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "0.8rem",
                            color: theme.palette.text.primary,
                        }}
                    >
                        {" "}
                        Language
                    </Typography>
                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ backgroundColor: "white", width: "1px" }}
                    />
                    <Typography
                        sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: "400",
                            fontSize: "0.8rem",
                            color: theme.palette.text.primary,
                        }}
                    >
                        {Language}
                    </Typography>
                </Box>
            </Grid>

            {/* Action Buttons */}
            <Grid
                item
                xs={4}
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: 1,
                }}
            >
                <IconButton
                    size="medium"
                    sx={{ color: theme.palette.text.primary }}
                >
                    <ShareIcon />
                </IconButton>
                <IconButton
                    size="medium"
                    sx={{ color: theme.palette.text.primary }}
                >
                    <ReplayIcon />
                </IconButton>
                <IconButton
                    size="medium"
                    sx={{ color: theme.palette.text.primary }}
                >
                    <DeleteIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
};
