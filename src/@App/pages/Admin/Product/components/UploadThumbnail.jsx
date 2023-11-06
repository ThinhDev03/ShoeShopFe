import LazyLoadingImage from '@App/components/customs/LazyLoadingImage';
import { Box, CircularProgress, FormHelperText, styled } from '@mui/material';
import React from 'react';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import upload from '@App/assets/svg/upload.svg';
import { useController } from 'react-hook-form';
import useFirebaseUpload from '@App/hooks/useFirebaseUpload';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import { errorMessage } from '@Core/Helper/Message';
import productService from '@App/services/product.service';
import { useSearchParams } from 'react-router-dom';

function UploadThumbnail({ name, control, defaultValue, multiple = false, sx, title }) {
   let [searchParams] = useSearchParams();

   const product_id = searchParams.get('id');

   const { uploadFirebaseImage, deleteFirebaseImage } = useFirebaseUpload();

   const {
      field: { onChange, value },
      fieldState: { error }
   } = useController({ name, control, defaultValue: defaultValue || '' });

   const { mutate: callbackUploadImage, isLoading: uploadLoading } = useMutation({
      mutationKey: 'uploadImage',
      mutationFn: async (eventInputImage) => {
         const res = await uploadFirebaseImage(eventInputImage);
         const newValue = multiple ? (Array.isArray(res) ? [...value, ...res] : [...value, res]) : res;
         onChange(newValue);
      },
      onError: () => {
         errorMessage('Đã có lỗi xảy ra.');
      }
   });

   useQuery(
      ['getImage', { product_id }],
      async () => {
         try {
            const rest = await productService.getImageProduct(product_id);
            return rest.data;
         } catch (error) {
            errorMessage();
         }
      },
      {
         onSuccess: (data) => {
            onChange(data);
         }
      }
   );

   const { mutate: callbackDeleteImage, isLoading: deleteLoading } = useMutation({
      mutationKey: 'uploadImage',
      mutationFn: async (data) => {
         const res = await deleteFirebaseImage(data);

         if (res) {
            const newValue = value.filter((image) => image !== data);
            onChange(newValue);
         }
      },
      onError: () => {
         errorMessage('Đã có lỗi xảy  ra.');
      }
   });

   const handleChangeInputFile = (event) => callbackUploadImage(event);

   const handleDelete = (data) => callbackDeleteImage(data);

   return (
      <React.Fragment>
         <WrapperUploadThumbnail error={Boolean(error)} multiple={multiple}>
            {/* change upload */}
            {multiple ? (
               <React.Fragment>
                  <ImageItem sx={{ height: '180px', position: 'relative', ...sx }}>
                     <LazyLoadingImage src={upload} w={28} h={28} />
                     <Box component='p'>{(title && title) || 'Upload hình ảnh!'}</Box>
                     {uploadLoading ? (
                        <ExtendCircularProgress />
                     ) : (
                        <InputFileUpload
                           id={name + '-input_file'}
                           type='file'
                           multiple={multiple}
                           accept='image/*'
                           onChange={handleChangeInputFile}
                        />
                     )}
                  </ImageItem>
                  {Array.isArray(value) &&
                     value.length > 0 &&
                     value?.map((image, index) => {
                        console.log(image.image_url);
                        return (
                           <ImageItem key={index} xs={sx}>
                              <LazyLoadingImage src={image.image_url || image} style={{ borderRadius: '5px' }} />
                              {deleteLoading && <ExtendCircularProgress />}
                              <DeleteImage onClick={() => handleDelete(image.image_url ? image.image_url : image)} />
                           </ImageItem>
                        );
                     })}
               </React.Fragment>
            ) : (
               (value && (
                  <ImageItem sx={{ height: '180px', ...sx }}>
                     <LazyLoadingImage src={value} style={{ borderRadius: '5px' }} />
                     <DeleteImage onClick={() => handleDelete(value)} />
                     {deleteLoading && <ExtendCircularProgress />}
                  </ImageItem>
               )) || (
                  <ImageItem sx={{ height: '180px', position: 'relative', ...sx }}>
                     <LazyLoadingImage src={upload} w={28} h={28} />
                     <Box component='p'>{(title && title) || 'Upload hình ảnh!'}</Box>
                     {uploadLoading ? (
                        <ExtendCircularProgress />
                     ) : (
                        <InputFileUpload
                           id={name + '-input_file'}
                           type='file'
                           multiple={multiple}
                           accept='image/*'
                           onChange={handleChangeInputFile}
                        />
                     )}
                  </ImageItem>
               )
            )}
         </WrapperUploadThumbnail>
         {error?.message && (
            <FormHelperText variant='standard' sx={{ ml: 2, color: '#d32f2f' }}>
               {error.message}
            </FormHelperText>
         )}
      </React.Fragment>
   );
}

const ImageItem = styled('label')({
   position: 'relative',
   width: '155.227px',

   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   flexDirection: 'column',
   border: `1px solid #d0d7de`,
   borderRadius: '5px',
   cursor: 'pointer'
});

const WrapperUploadThumbnail = styled('div')(({ error, multiple }) => ({
   width: '100%',
   position: 'relative',
   display: 'flex',
   padding: multiple ? '6px 12px' : '0px',
   gap: multiple ? 6 : 0,
   width: '100%',
   backgroundColor: '#f5f6f7',
   borderRadius: '5px',
   border: `1px solid ${error ? '#d32f2f' : '#d0d7de'}`,
   zIndex: 2,
   overflow: multiple ? 'auto' : ''
}));

const InputFileUpload = styled('input')({
   position: 'absolute',
   opacity: 0,
   cursor: 'pointer'
});

const ExtendCircularProgress = () => {
   return (
      <Box
         sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#d0d7de8a'
         }}>
         <CircularProgress />
      </Box>
   );
};

export const DeleteImage = ({ onClick }) => {
   return (
      <Box sx={{ position: 'absolute', top: '-5px', right: '-5px' }} onClick={onClick}>
         <RemoveCircleIcon />
      </Box>
   );
};

export default React.memo(UploadThumbnail);
