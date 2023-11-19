import LazyLoadingImage from '@App/components/customs/LazyLoadingImage';
import { Box, FormHelperText, styled } from '@mui/material';
import React from 'react';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import upload from '@App/assets/svg/upload.svg';
import { useController } from 'react-hook-form';
import useFirebaseUpload from '@App/hooks/useFirebaseUpload';
import { useMutation, useQuery } from '@tanstack/react-query';
import { errorMessage } from '@Core/Helper/Message';
import productService from '@App/services/product.service';

function UploadThumbnail({ name, control, multiple = false, sx, title, product_id, setIsChangeImages }) {
   const { uploadFirebaseImage, deleteFirebaseImage } = useFirebaseUpload();
   const {
      field: { onChange, value: imageOrImages },
      fieldState: { error }
   } = useController({ name, control });

   const { refetch: refetchImages } = useQuery(
      ['getImage', product_id, multiple, name],
      async () => {
         if (multiple) {
            const res = await productService.getImageProduct(product_id);

            return res.data;
         }
         return true;
      },
      {
         onSuccess: (data) => {
            multiple && onChange(data);
         },
         initialData: []
      }
   );

   const { mutate: callbackUploadImage, isLoading: uploadLoading } = useMutation({
      mutationKey: 'uploadImage',
      mutationFn: async (eventInputImage) => {
         const res = await uploadFirebaseImage(eventInputImage);
         const image = {
            image_url: res
         };
         if (multiple) {
            if (product_id) {
               await productService.createImage({ images: res, product_id });
               refetchImages();
            } else {
               console.log(res);
               if (typeof res === 'string') {
                  onChange([res, ...imageOrImages]);
               } else {
                  onChange([...res, ...imageOrImages]);
               }
            }
            setIsChangeImages((prev) => !prev);
         } else {
            onChange(res);
         }
      },
      onError: () => {
         errorMessage('Đã có lỗi xảy ra.');
      }
   });

   const { mutate: callbackDeleteImage, isLoading: deleteLoading } = useMutation({
      mutationKey: 'uploadImage',
      mutationFn: async ({ image, id }) => {
         if (product_id && multiple) {
            const res = await productService.deleteImage(id);
            if (res.success) {
               await deleteFirebaseImage(image);
               setIsChangeImages((prev) => !prev);
               refetchImages();
            } else {
               errorMessage('Hình ảnh đang được sử dụng.');
            }
         } else if (!multiple) {
            await deleteFirebaseImage(image);
            product_id && (await productService.deleteThumbnail(product_id));
            onChange('');
         }
      },
      onError: (error) => {
         errorMessage(error?.response?.data?.message || 'Đã có lỗi sảy ra!!');
      }
   });

   const handleChangeInputFile = (event) => callbackUploadImage(event);

   return (
      <React.Fragment>
         <WrapperUploadThumbnail error={Boolean(error)} multiple={multiple}>
            {/* change upload */}
            {multiple && (
               <React.Fragment>
                  <ImageItem sx={{ height: '180px', position: 'relative', ...sx }}>
                     <LazyLoadingImage src={upload} w={28} h={28} />
                     <Box component='p'>{(title && title) || 'Upload hình ảnh!'}</Box>

                     <InputFileUpload
                        disabled={uploadLoading}
                        id={name + '-input_file'}
                        type='file'
                        multiple={multiple}
                        accept='image/*'
                        onChange={handleChangeInputFile}
                     />
                  </ImageItem>
                  {imageOrImages.length > 0 &&
                     imageOrImages.map((image, index) => {
                        return (
                           <ImageItem key={index} xs={sx}>
                              <LazyLoadingImage src={image.image_url || image} style={{ borderRadius: '5px' }} />
                              <DeleteImage
                                 onClick={() =>
                                    callbackDeleteImage({
                                       image: image.image_url ? image.image_url : image,
                                       id: image?._id
                                    })
                                 }
                              />
                           </ImageItem>
                        );
                     })}
               </React.Fragment>
            )}
            {!multiple &&
               ((imageOrImages && (
                  <ImageItem sx={{ height: '180px', ...sx }}>
                     <LazyLoadingImage src={imageOrImages} style={{ borderRadius: '5px' }} />
                     <DeleteImage onClick={() => callbackDeleteImage({ image: imageOrImages, id: '' })} />
                  </ImageItem>
               )) || (
                  <ImageItem sx={{ height: '180px', position: 'relative', ...sx }}>
                     <LazyLoadingImage src={upload} w={28} h={28} />
                     <Box component='p'>{(title && title) || 'Upload hình ảnh!'}</Box>

                     <InputFileUpload
                        disabled={uploadLoading}
                        id={name + '-input_file'}
                        type='file'
                        multiple={multiple}
                        accept='image/*'
                        onChange={handleChangeInputFile}
                     />
                  </ImageItem>
               ))}
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
   width: !multiple ? '155.227px' : '100%',
   position: 'relative',
   display: 'flex',
   padding: multiple ? '6px 12px' : '0px',
   gap: multiple ? 6 : 0,
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

export const DeleteImage = ({ onClick }) => {
   return (
      <Box sx={{ position: 'absolute', top: '-5px', right: '-5px' }} onClick={onClick}>
         <RemoveCircleIcon />
      </Box>
   );
};

export default UploadThumbnail;
