import { Box, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
interface CustomAudioProps {
    videoURL: string;
    handleRemoveFile: () => void;
    customSx?: object;
    fileName?: string;
}
export const CustomVideo: React.FC<CustomAudioProps> = ({ videoURL, handleRemoveFile, customSx, fileName }) => {
    return (
        <Box sx={{ position: 'relative' }}>
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    paddingTop: '56.25%', // 16:9 aspect ratio (height/width * 100)
                    backgroundColor: 'black', // Optional: background for empty areas
                    borderRadius: '10px',
                    marginTop: '20px',
                    ...customSx,
                }}
            >
                <video
                    src={videoURL}
                    controls
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        borderRadius: '10px',
                    }}
                />
            </Box>
            <IconButton
                onClick={handleRemoveFile}
                sx={{
                    position: 'absolute',
                    top: '25px',
                    right: '15px',
                    backgroundColor: 'grey',
                    color: 'white',
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
                        fontFamily: 'Inter, Arial, sans-serif',
                    }}
                >
                    {fileName}
                </Typography>
            )}
        </Box>
    );
};
