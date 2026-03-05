import { Box, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
interface CustomAudioProps {
    textContent: string;
    handleRemoveFile: () => void;
    customSx?: object;
    fileName?: string;
}
export const CustomText: React.FC<CustomAudioProps> = ({ textContent, handleRemoveFile, customSx, fileName }) => {
    return (
        <Box sx={{ position: 'relative' }}>
            <Box
                sx={{
                    whiteSpace: 'pre-wrap',
                    backgroundColor: (theme) => theme.palette.action.active,
                    padding: '10px',
                    borderRadius: '8px',
                    overflowY: 'auto',
                    maxHeight: '300px',
                    overflowX: 'hidden',
                    fontFamily: 'Be Vietnam Pro, Poppins, Inter, Arial, sans-serif',
                    color: (theme) => theme.palette.text.primary,
                }}
                component="pre"
            >
                {textContent}
            </Box>
            <IconButton
                onClick={handleRemoveFile}
                sx={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    backgroundColor: (theme) => theme.palette.tertiary.main,
                    color: (theme) => theme.palette.text.primary,
                }}
            >
                <DeleteIcon />
            </IconButton>
            {fileName && (
                <Typography
                    variant="body2"
                    align="center"
                    sx={{
                        marginTop: '5px',
                        fontFamily: 'Poppins, Inter, Arial, sans-serif',
                    }}
                >
                    {fileName}
                </Typography>
            )}
        </Box>
    );
};
