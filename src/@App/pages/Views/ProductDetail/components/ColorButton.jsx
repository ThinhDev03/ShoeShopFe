import React from 'react';
import { Box, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

function ColorButton({ color, colorSelected, setColorSelected }) {
   return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 1 }}>
         <Box
            sx={{
               position: 'relative',
               width: 28,
               height: 28,
               backgroundColor: color.color_code,
               borderRadius: '50%',
               border: '1px solid #E5E5E5'
            }}
            onClick={() => setColorSelected(color._id)}>
            {colorSelected === color._id && (
               <CheckIcon
                  sx={{
                     position: 'absolute',
                     width: 18,
                     height: 28,
                     color: color.color_code === '#FFFFF' ? '#000' : '#FFFFFF',
                     top: '50%',
                     left: '50%',
                     transform: 'translate(-50%, -50%)'
                  }}
               />
            )}
         </Box>
         <Typography>{color.color_name}</Typography>
      </Box>
   );
}

export default ColorButton;
