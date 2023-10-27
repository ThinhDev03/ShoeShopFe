import React from 'react';
import PropTypes from 'prop-types';
import { Box, TextField } from '@mui/material';
import { useWatch } from 'react-hook-form';
import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';
import { Label } from '@mui/icons-material';

const ControllerColor = (props) => {
   const { control, name, setValue, ...rest } = props;
   const color = useWatch({ control, name });

   return (
      <Box sx={{ display: 'flex', gap: 2 }}>
         <ControllerTextField name={name} control={control} {...rest} />
         <Box
            component={'label'}
            htmlFor={name}
            sx={{
               position: 'relative',
               display: 'block',
               width: '100px',
               height: '40px',
               border: '1px solid #ccc',
               borderRadius: 1,
               overflow: 'hidden',
               bgcolor: color,
               zIndex: 1000
            }}>
            <Box
               component={'input'}
               type='color'
               value={color}
               onChange={(e) => setValue(name, e.target.value)}
               sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0 }}></Box>
         </Box>
      </Box>
   );
};

ControllerColor.propTypes = {
   control: PropTypes.object.isRequired,
   name: PropTypes.string.isRequired,
   placeholder: PropTypes.string,
   disabled: PropTypes.bool,
   setValue: PropTypes.func.isRequired
};

export default ControllerColor;
