import React from 'react';
import { Box, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

function ColorRender({ color, check, onClick }) {
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
            onClick={() => setIndexActive(color._id)}>
            {check === color._id && (
               <CheckIcon
                  sx={{
                     position: 'absolute',
                     width: 18,
                     height: 28,
                     color: color.color_code === '#FFFFF' ? '#000' : '#FFFFF',
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

export default ColorRender;
