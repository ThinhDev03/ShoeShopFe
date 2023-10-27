import React, { useEffect, useState } from 'react';
import { Box, FormHelperText, Grid } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import ModalSelectImage from './ModalSelectImage';
import LazyLoadingImage from '@App/components/customs/LazyLoadingImage';
import { Controller, useController } from 'react-hook-form';

function SelectMultipleImageProductDetail({ name, control, defaultValue }) {
   const {
      field: { onChange, value },
      fieldState: { error }
   } = useController({ name, control, defaultValue: defaultValue || '' });

   const [image, setImage] = useState('');

   const handleClickDeleteImage = () => {
      setImage('');
      onChange('');
   };

   useEffect(() => {
      if (value === '') {
         setImage('');
      }
   }, [value]);

   return (
      <React.Fragment>
         {(!image && <ModalSelectImage setImage={setImage} onChange={onChange} />) || (
            <Box
               sx={{
                  width: '100%',
                  height: '100%',
                  maxHeight: 300,
                  position: 'relative',
                  borderRadius: '5px'
               }}>
               <LazyLoadingImage src={image.image_url} alt='' sx={{ borderRadius: '5px' }} />
               <Box sx={{ position: 'absolute', top: -10, right: -10 }} onClick={() => handleClickDeleteImage('')}>
                  <RemoveCircleIcon
                     sx={{
                        cursor: 'pointer',
                        ':hover': {
                           color: '#d32f2f'
                        }
                     }}
                  />
               </Box>
            </Box>
         )}
         {error?.message && (
            <FormHelperText variant='standard' sx={{ color: '#d32f2f' }}>
               {error.message}
            </FormHelperText>
         )}
      </React.Fragment>
   );
}

export default React.memo(SelectMultipleImageProductDetail);
