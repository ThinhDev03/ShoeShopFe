import LazyLoadingImage from '@App/components/customs/LazyLoadingImage';
import { Box, CircularProgress, Grid, Modal, Typography, styled } from '@mui/material';
import React, { useState } from 'react';

import uploadSvg from '@App/assets/svg/upload.svg';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import productService from '@App/services/product.service';

function ModalSelectImage({ setImage, onChange }) {
   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   let [searchParams] = useSearchParams();

   const id = searchParams.get('id');

   const { isLoading, data: dataImage } = useQuery(['getImageProduct'], async () => {
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
               maxHeight: '200px',
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
            <WrapperModalContent sx={{ position: 'absolute' }}>
               <Typography id='modal-modal-title' variant='h6' component='h2' sx={{ px: 3, py: 1 }}>
                  Lựa chọn hình ảnh
               </Typography>
               {isLoading ? (
                  <Box
                     sx={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                     }}>
                     <CircularProgress />
                  </Box>
               ) : (
                  <Grid container spacing={2} sx={{ padding: '12px 6px', position: 'relative' }}>
                     {dataImage.map((data, index) => {
                        return (
                           <Grid item xs={12} md={2} key={index}>
                              <Box
                                 sx={{
                                    position: 'relative',
                                    overflow: 'hidden',
                                    borderRadius: '5px'
                                 }}
                                 onClick={() => handleClickSetImage(data)}>
                                 <LazyLoadingImage src={data.image_url} alt='' sx={{ borderRadius: '5px' }} />
                              </Box>
                           </Grid>
                        );
                     })}
                  </Grid>
               )}
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
