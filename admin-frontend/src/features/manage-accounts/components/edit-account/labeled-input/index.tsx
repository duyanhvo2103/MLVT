import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

interface LabeledInputProps
  extends React.ComponentProps<typeof TextField> {
  label: string;
  layout?: 'vertical' | 'horizontal';
  readOnly?: boolean;          
}

export const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  layout = 'horizontal',
  readOnly = false,
  sx,
  ...textfieldProps
}) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: layout === 'horizontal' ? 'row' : 'column',
      alignItems: layout === 'horizontal' ? 'center' : 'stretch',
      gap: 0.5,
      ...sx,
    }}
  >
    <Typography
      sx={{
        minWidth: 120,
        fontWeight: 500,
        fontFamily: 'Poppins, Sora',
        color: 'white',
        fontSize: '0.875rem',
        opacity: readOnly ? 0.7 : 1,
      }}
    >
      {label}
    </Typography>

    <TextField
      {...textfieldProps}
      slotProps={{ input: { readOnly } }}      
      fullWidth
      size="small"
      tabIndex={readOnly ? -1 : undefined}          
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: readOnly
              ? 'rgba(255,255,255,0.3)'
              : 'rgba(255,255,255,0.5)',
          },

          ...(readOnly
            ? {
              pointerEvents: 'none',             
              '&:hover fieldset': {               
                borderColor: 'rgba(255,255,255,0.3)',
              },
            }
            : {
              '&:hover fieldset': {
                borderColor: 'rgba(255,255,255,0.7)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'rgba(255,255,255,0.7)',
              },
            }),
        },

        '& .MuiInputBase-input': {
          color: 'white',
          fontFamily: 'Poppins, Sora',
          userSelect: readOnly ? 'none' : 'text',   
          cursor: readOnly ? 'default' : 'text',
          opacity: readOnly ? 0.7 : 1,
        },
      }}
    />
  </Box>
);
