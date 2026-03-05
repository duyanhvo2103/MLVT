import { Button, Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

interface GenerateButtonProps {
    isDisable: boolean;
    buttonContent?: string;
    handleGenerate: () => void;
    customSx?: object;
}
export const GenerateButton: React.FC<GenerateButtonProps> = ({
    isDisable,
    handleGenerate,
    buttonContent = 'GENERATE',
    customSx,
}) => {
    return (
        <Button
            disabled={isDisable}
            sx={{
                marginTop: '20px',
                width: '200px',
                height: '40px',
                backgroundColor: !isDisable ? (theme) => theme.palette.secondary.contrastText : '#EBEBEB',
                color: !isDisable ? 'white' : '#A3A3A3',
                borderRadius: '10px',
                textTransform: 'none',
                boxShadow: 'none',
                padding: '0px',
                '&:hover': {
                    backgroundColor: (theme) => theme.palette.action.hover,
                    boxShadow: 'none',
                    border: 'none',
                },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 'auto',
                marginRight: 'auto',
                cursor: isDisable ? 'not-allowed' : 'pointer',
                customSx,
            }}
            startIcon={<AutoAwesomeIcon />}
            onClick={() => {
                handleGenerate();
            }}
        >
            <Typography
                variant="subtitle1"
                sx={{ fontWeight: 650, fontFamily: 'Poppins, sans-serif' }}
            >
                {buttonContent}
            </Typography>
        </Button>
    );
};
