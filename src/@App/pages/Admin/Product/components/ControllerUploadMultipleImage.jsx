import { useController } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Box, CircularProgress, FormHelperText, Grid, TextField, Typography, styled } from '@mui/material';

import upload from '@App/assets/svg/upload.svg';
import useFirebaseUpload from '@App/hooks/useFirebaseUpload';
import LazyLoadingImage from '@App/components/customs/LazyLoadingImage';

function ControllerUploadMultipleImage({ name, defaultValue, control }) {
   const { loading, uploadFirebaseImage, deleteFirebaseImage } = useFirebaseUpload();

   const {
      field: { onChange, value, ref },
      fieldState: { error }
   } = useController({ name, control, defaultValue: defaultValue || '', shouldUnregister: true });

   const handleChangeInputFile = async (event) => {
      try {
         const rest = await uploadFirebaseImage(event);
         onChange(rest);
      } catch (error) {}
   };

   const handleDeleteImageItem = async (srcImage) => {
      try {
         await deleteFirebaseImage(srcImage);

         const newListImage = value.filter((image) => image !== srcImage);
         onChange(newListImage);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <React.Fragment>
         <Box
            sx={{
               width: '100%',
               border: '1px solid #d0d7de',
               padding: 1.5,
               borderRadius: '5px',
               maxHeight: 200
            }}>
            <Grid container spacing={2}>
               <Grid item xs={2}>

                  <LabelUpload htmlFor={name + '-multiple_image'}>
                     {!loading ? (
                        <React.Fragment>
                           <ExtendTextFieldFile
                              id={name + '-multiple_image'}
                              type='file'
                              multiple
                              accept='image/*'
                              onChange={handleChangeInputFile}
                           />
                           <Box
                              sx={{
                                 position: 'absolute',
                                 display: 'flex',
                                 flexDirection: 'column',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 gap: 2
                              }}>

                              <Box sx={{ width: 32, height: 32 }}>
                                 <LazyLoadingImage src={upload} />
                              </Box>

                           </Box>
                        </React.Fragment>
                     ) : (
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
                  </LabelUpload>
               </Grid>
               {value.length > 0 &&
                  value.map((image, index) => {
                     return (

                        <Grid item xs={2} key={index} sx={{ position: 'relative', height: '160px' }}>
                           <Box sx={{ borderRadius: '5px', overflow: 'hidden', borderRadius: 3 }}>
                              <LazyLoadingImage src={image} w='100%' h='160px' />

                              <Box
                                 sx={{
                                    position: 'absolute',
                                    top: 10,
                                    right: -10
                                 }}
                                 onClick={() => handleDeleteImageItem(image)}>
                                 <RemoveCircleIcon />
                              </Box>
                           </Box>
                        </Grid>
                     );
                  })}
            </Grid>
         </Box>
         {error && error?.message && (
            <FormHelperText variant='standard' sx={{ ml: 2, color: '#d32f2f' }}>
               {error.message}
            </FormHelperText>
         )}
      </React.Fragment>
   );
}

const LabelUpload = styled('label')(({ theme }) => ({
   position: 'relative',
   border: '1px solid #d0d7de',
   borderRadius: '5px',
   height: 160,
   backgroundColor: '#d0d7de4a',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   flexDirection: 'column',
   gap: 12,
   cursor: 'pointer'

}));

const ExtendTextFieldFile = styled('input')(({ theme }) => ({
   position: 'absolute',
   opacity: 0,
   cursor: 'pointer'
}));

export default React.memo(ControllerUploadMultipleImage);
