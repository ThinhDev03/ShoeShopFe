import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useController } from 'react-hook-form';
import CheckIcon from '@mui/icons-material/Check';

function ControllerRadioColor({ data, name, setDetail }) {
   const [active, setActive] = useState(0);

   const handleClickCheck = (index) => {
      setDetail(index);
      setActive(index);
   };

   return (
      <Stack gap={5} flexDirection='row' mb={2}>
         {data.map((item, index) => {
            return (
               <Box
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, cursor: 'pointer' }}
                  key={item._id}>
                  <Box
                     sx={{
                        position: 'relative',
                        width: 28,
                        height: 28,
                        backgroundColor: item.color_id.color_code,
                        borderRadius: '50%'
                     }}
                     onClick={() => handleClickCheck(index)}>
                     <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate3d(-50%,-50%,0)' }}>
                        {index === active && <CheckIcon sx={{ color: '#FFFFFF', fontSize: '22px' }} />}
                     </Box>
                  </Box>
                  <Typography>{item.color_id.color_name}</Typography>
               </Box>
            );
         })}
      </Stack>
   );
}

export default React.memo(ControllerRadioColor);
