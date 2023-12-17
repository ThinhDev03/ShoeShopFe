import React from 'react';
import LazyLoadingImage from '@App/components/customs/LazyLoadingImage';
import { Box, Button, Grid, IconButton, Paper, Stack, TextField, Typography } from '@mui/material';
import toFormatMoney, { toDiscountedPrice } from '@Core/Helper/Price';
import DeleteIcon from '@mui/icons-material/Delete';
import { routerPath } from '@App/configs/routerConfig';
import { Link } from 'react-router-dom';
import { WISHLIST_ACTION, useWishlist } from '@App/redux/slices/wishlist.slice';
import { successMessage } from '@Core/Helper/Message';

function ProductWishlist({ data }) {
   const { updateWishlist } = useWishlist();

   const handleDeleteWishlist = (id) => {
      updateWishlist(WISHLIST_ACTION.remove, id);
      successMessage('Đã xóa khỏi danh sách yêu thích');
   };
   return (
      <Paper elevation={4} sx={{ mb: 3 }}>
         <Grid container spacing={2} sx={{ p: 1 }}>
            <Grid item xs={3}>
               <Box sx={{ height: 100 }}>
                  <Box component={LazyLoadingImage} src={data?.thumbnail} sx={{ height: 100 }} />
               </Box>
            </Grid>
            <Grid item xs={6}>
               <Stack height='100%' justifyContent='space-between'>
                  <Typography
                     component={Link}
                     to={'/' + routerPath.PRODUCTS + '/' + data?._id}
                     variant='h5'
                     sx={{ fontSize: '22px !important', fontWeight: 'bold' }}>
                     {data?.name}
                  </Typography>
                  <Typography variant='p' sx={{ fontSize: '16px !important', color: '#808080' }}>
                     Thương hiệu: {data?.brand_id?.brand_name}
                  </Typography>

                  <Box sx={{ my: 1, display: 'flex', alignItems: 'center', gap: 2, color: '#808080' }}>
                     <Typography>Giá: </Typography>
                     <Typography sx={{ fontSize: '18px !important', fontWeight: 'bold' }}>
                        {toFormatMoney(toDiscountedPrice(data?.fromPrice, data?.sale))}
                     </Typography>
                     {' - '}
                     <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>
                        {toFormatMoney(data?.toPrice)}
                     </Typography>
                  </Box>
               </Stack>
            </Grid>
            <Grid item xs={3} component={Stack} flexDirection='column' justifyContent='center' alignItems='flex-end'>
               <IconButton onClick={() => handleDeleteWishlist(data._id)} size='small' color='error'>
                  <DeleteIcon color='error' />
               </IconButton>
            </Grid>
         </Grid>
      </Paper>
   );
}

export default ProductWishlist;
