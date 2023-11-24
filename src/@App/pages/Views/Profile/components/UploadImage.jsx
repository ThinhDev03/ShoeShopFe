import LazyLoadingImage from '@App/components/customs/LazyLoadingImage';
import useAuth from '@App/hooks/useAuth';
import useFirebaseUpload from '@App/hooks/useFirebaseUpload';
import authService from '@App/services/auth.service';
import { errorMessage } from '@Core/Helper/Message';
import { Box, Button, CircularProgress } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';

const UploadImage = () => {
   const { user } = useAuth();
   const [image, setImage] = useState(user?.avatar);
   const { uploadFirebaseImage, deleteFirebaseImage } = useFirebaseUpload();

   const { mutate: callbackUploadImage, isLoading: loading } = useMutation({
      mutationFn: async (eventInputImage) => {
         const res = await uploadFirebaseImage(eventInputImage);
         return res;
      },
      onSuccess: async (data) => {
         await authService.updateUser(user._id, { avatar: data });
         user?.avatar && deleteFirebaseImage(user?.avatar);
         setImage(data);
      },
      onError: () => {
         errorMessage('Đã có lỗi xảy ra.');
      }
   });

   return (
      <Box sx={{ py: '30px' }}>
         <Box
            sx={{
               height: '100%',
               borderLeft: '.0625rem solid #efefef',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               flexDirection: 'column'
            }}>
            <Box sx={{ width: 100, height: 100, borderRadius: '50%', position: 'relative' }}>
               <Box
                  component={LazyLoadingImage}
                  sx={{ borderRadius: '50%', border: '1px solid rgba(0,0,0,.09)' }}
                  src={image || 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'}
               />
               {loading && (
                  <Box
                     sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: 'rgb(0 0 0 / 23%)'
                     }}>
                     <CircularProgress />
                  </Box>
               )}
            </Box>
            <Box sx={{ mt: 2 }}>
               <Button variant='outlined' sx={{ position: 'relative' }} component='label' htmlFor='avatar'>
                  Chọn Ảnh
                  <Box
                     sx={{ position: 'absolute', opacity: 0, width: 0 }}
                     component='input'
                     type='file'
                     id='avatar'
                     onChange={callbackUploadImage}
                  />
               </Button>
            </Box>
         </Box>
      </Box>
   );
};

export default UploadImage;
