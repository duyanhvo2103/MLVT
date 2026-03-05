import { Box, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface CustomAudioProps {
    handleRemoveFile: () => void;
    audioURL: string;
    fileName?: string;
}
export const CustomAudio: React.FC<CustomAudioProps> = ({ handleRemoveFile, audioURL, fileName }) => {
    return (
        <Box sx={{ position: 'relative' }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <audio src={audioURL} controls style={{ flex: '1', maxWidth: 'calc(100% - 50px)' }} />
                <IconButton
                    onClick={handleRemoveFile}
                    sx={{
                        marginLeft: '10px',
                        backgroundColor: 'grey',
                        color: 'white',
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </Box>
            {fileName && (
                <Typography
                    variant="body2"
                    align="center"
                    sx={{
                        marginTop: '5px',
                        fontFamily: 'Inter, Arial, sans-serif',
                    }}
                >
                    {fileName}
                </Typography>
            )}
        </Box>
    );
};
