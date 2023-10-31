import { Box, FormHelperText, Grid, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useController } from 'react-hook-form';
import upload from '@App/assets/svg/upload.svg';
import LazyLoadingImage from '@App/components/customs/LazyLoadingImage';
import { useQuery } from '@tanstack/react-query';
import productService from '@App/services/product.service';
import { useSearchParams } from 'react-router-dom';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

function SelectImageDetail({ name, control, defaultValue, multiple = false, sx, title }) {
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const [imageUrl, setImageUrl] = useState('');

   let [searchParams] = useSearchParams();

   const product_id = searchParams.get('id');

   const {
      field: { onChange, value },
      fieldState: { error }
   } = useController({ name, control, defaultValue: defaultValue || '' });

   const { data, isFetched } = useQuery(
      ['getImageProduct', { product_id }],
      async () => {
         const rest = await productService.getImageProduct(product_id);
         return rest.data;
      },
      {
         onSuccess: (data) => {
            data.filter((item) => {
               if ((item._id = value)) {
                  setImageUrl(item.image_url);
               }
            });
         }
      }
   );

   const handleChangeImage = (image) => {
      onChange(image._id);
      setImageUrl(image.image_url);
   };

   const handleDelete = () => {
      onChange('');
      setImageUrl('');
   };

   console.log(imageUrl);

   return (
      <React.Fragment>
         <Box
            sx={{
               width: '100%',
               height: '80px',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               border: Boolean(error) ? '1px solid #d32f2f' : '1px solid #d0d7de',
               borderRadius: '5px',
               cursor: 'pointer'
            }}>
            {(imageUrl.length > 0 && (
               <Box sx={{ position: 'relative' }}>
                  <LazyLoadingImage src={imageUrl} />
                  <DeleteImage onClick={() => handleDelete()} />
               </Box>
            )) || (
               <Box onClick={handleOpen}>
                  <LazyLoadingImage src={upload} w={28} h={28} />
               </Box>
            )}
         </Box>
         {error?.message && (
            <FormHelperText variant='standard' sx={{ ml: 2, color: '#d32f2f' }}>
               {error.message}
            </FormHelperText>
         )}
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'>
            <Box sx={style}>
               <Typography id='modal-modal-title' variant='h6' component='h2'>
                  Hình ảnh sản phẩm
               </Typography>
               <Grid container spacing={2} sx={{ mt: 1 }}>
                  {data?.map((image) => {
                     return (
                        <Grid item xs={3} key={image._id}>
                           <Box onClick={() => handleChangeImage(image)}>
                              <LazyLoadingImage src={image.image_url} />
                           </Box>
                        </Grid>
                     );
                  })}
               </Grid>
            </Box>
         </Modal>
      </React.Fragment>
   );
}

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 500,
   height: 400,
   bgcolor: 'background.paper',
   px: 2,
   py: 2,
   outline: 'none'
};

export const DeleteImage = ({ onClick }) => {
   return (
      <Box
         sx={{
            position: 'absolute',
            top: '-5px',
            right: '-10px'
         }}
         onClick={onClick}>
         <RemoveCircleIcon />
      </Box>
   );
};

export default SelectImageDetail;
