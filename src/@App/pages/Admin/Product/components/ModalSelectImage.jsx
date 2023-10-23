import LazyLoadingImage from '@App/components/customs/LazyLoadingImage';
import { Box, Grid, Modal, Stack, Typography, styled } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import React, { useState } from 'react';

import uploadSvg from '@App/assets/svg/upload.svg';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import productService from '@App/services/product.service';

function ModalSelectImage({ setImage, onChange }) {
   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const { id } = useParams();

   const { isFetching, data: dataImage } = useQuery(['getImageProduct'], async () => {
      const rest = await productService.getImageProduct(id);
      return rest.data;
   });

   const handleClickSetImage = (data) => {
      setImage(data);
      onChange(data._id);
   };

   return (
      <React.Fragment>
         <Box
            sx={{
               width: '100%',
               height: '100%',
               minHeight: '300px',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               border: '1px solid #d0d7de',
               borderRadius: '5px',
               cursor: 'pointer'
            }}
            onClick={handleOpen}>
            <Box sx={{ width: 48, height: 48 }}>
               <LazyLoadingImage sx={{ borderRadius: '5px', width: '34px', height: '34px' }} src={uploadSvg} alt='' />
            </Box>
         </Box>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'>
            <WrapperModalContent>
               <Typography id='modal-modal-title' variant='h6' component='h2' sx={{ px: 3, py: 1 }}>
                  Lựa chọn hình ảnh
               </Typography>
               <Grid container spacing={2} sx={{ padding: '12px 6px', position: 'relative' }}>
                  {isFetching ? (
                     <Box
                        sx={{
                           position: 'absolute',
                           top: -10,
                           right: -10
                        }}
                        onClick={() => handleDeleteImage(value)}>
                        <RemoveCircleIcon />
                     </Box>
                  ) : (
                     dataImage.map((data, index) => {
                        return (
                           <Grid item xs={12} md={2} key={index}>
                              <Box
                                 sx={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    borderRadius: '5px'
                                 }}
                                 onClick={() => handleClickSetImage(data)}>
                                 <LazyLoadingImage src={data.image_url} alt='' sx={{ borderRadius: '5px' }} />
                              </Box>
                           </Grid>
                        );
                     })
                  )}
               </Grid>
            </WrapperModalContent>
         </Modal>
      </React.Fragment>
   );
}

const WrapperModalContent = styled(Box)(({ theme }) => ({
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 700,
   height: 500,
   backgroundColor: theme.palette.education.text.white,
   border: '2px solid transparent ',
   outline: 'none',
   borderRadius: '5px',
   zIndex: 10
}));

export default React.memo(ModalSelectImage);
