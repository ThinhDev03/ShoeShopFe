import { Box, CircularProgress, FormHelperText, TextField, Typography, styled } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import React, { useEffect, useState } from 'react';

import upload from '@App/assets/svg/upload.svg';
import { Controller, useController, useWatch } from 'react-hook-form';
import useFirebaseUpload from '@App/hooks/useFirebaseUpload';
import LazyLoadingImage from '@App/components/customs/LazyLoadingImage';

function ControllerInputFile({ name, defaultValue, disabled, placeholder, control }) {
   const { loading, uploadFirebaseImage, deleteFirebaseImage } = useFirebaseUpload();
   const [preview, setPreview] = useState('');

   const {
      field: { onChange, value, ref },
      fieldState: { error }
   } = useController({ name, control, defaultValue: defaultValue || '' });

   const handleChangeInputFile = async (event) => {
      const rest = await uploadFirebaseImage(event);
      setPreview(rest);
      onChange(rest);
   };

   const handleDeleteImage = async (srcImage) => {
      try {
         await deleteFirebaseImage(srcImage);
         setPreview('');
         onChange('');
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <React.Fragment>
         <WrapperLabelFile htmlFor={name + '-input_file'} error={Boolean(error)}>
            {!value ? (
               <Box
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center'
                  }}>
                  <ExtendTextField id={name + '-input_file'} type='file' onChange={handleChangeInputFile} />
                  <Box
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        gap: 2
                     }}>
                     <Box sx={{ width: 48, height: 48 }}>
                        <LazyLoadingImage src={upload} />
                     </Box>
                     <Typography>{placeholder || 'No files are selected!'}</Typography>
                  </Box>
               </Box>
            ) : (
               <Box sx={{ position: 'absolute', width: '100%', height: '100%' }}>
                  <LazyLoadingImage src={value} styled={{ borderRadius: 1 }} />
                  <Box
                     sx={{
                        position: 'absolute',
                        top: -10,
                        right: -10
                     }}
                     onClick={() => handleDeleteImage(value)}>
                     <RemoveCircleIcon />
                  </Box>
               </Box>
            )}

            {loading && (
               <Box
                  sx={{
                     position: 'absolute',
                     top: 0,
                     left: 0,
                     right: 0,
                     bottom: 0,
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                     backgroundColor: '#d0d7de8a'
                  }}>
                  <CircularProgress />
               </Box>
            )}
         </WrapperLabelFile>
         {error?.message && (
            <FormHelperText variant='standard' sx={{ ml: 2, color: '#d32f2f' }}>
               {error.message}
            </FormHelperText>
         )}
      </React.Fragment>
   );
}

const WrapperLabelFile = styled('label')(({ theme, error }) => ({
   position: 'relative',
   width: '100%',
   height: '100%',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   borderRadius: 5,
   border: `1px solid ${error ? '#d32f2f' : '#d0d7de'}`,
   backgroundColor: '#d0d7de4a',
   cursor: 'pointer',
   zIndex: 2
}));

const ExtendTextField = styled(TextField)(({ theme }) => ({
   position: 'absolute',
   opacity: 0,
   cursor: 'pointer'
}));

export default React.memo(ControllerInputFile);
