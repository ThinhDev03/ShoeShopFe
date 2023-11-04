import FormLabel from '@Core/Components/FormControl/FormLabel';
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react';
import toFormatMoney, { toDiscountedPrice } from '@Core/Helper/Price';
import { errorMessage } from '@Core/Helper/Message';
import { useMutation } from '@tanstack/react-query';
import cartService from '@App/services/cart.service';
import useAuth from '@App/hooks/useAuth';

function CartProductItem({ data, getCart }) {
   console.log(data);
   const [quantity, setQuantity] = useState(data.quantity);
   const { user } = useAuth();

   const { mutate: updateCart } = useMutation({
      mutationFn: async (quantity) => {
         return await cartService.updateOne({ product_id: data.product_id, user_id: user._id, quantity }, data.cart_id);
      },
      onSuccess: () => {
         getCart();
      }
   });

   const { mutate: deleteCart } = useMutation({
      mutationFn: async () => {
         return await cartService.delete(data.cart_id);
      },
      onSuccess: () => {
         getCart();
      }
   });

   const handleSetQuantity = (e) => {
      const value = e.target.value;
      if (value <= data.totalQuantity && value > 0) {
         updateCart(value);
         setQuantity(value);
      }

      if (value == 0) {
         errorMessage('Số lượng sản phẩm không hợp lệ');
         setQuantity(1);
      }

      if (value > data.totalQuantity) {
         errorMessage('Số lượng sản phẩm quá lớn');
         setQuantity(1);
      }
   };

   return (
      <Grid container spacing={2}>
         <Grid item xs={3}>
            <img src={data.image} width='100%' height='100%' alt='' />
         </Grid>
         <Grid item xs={6}>
            <Stack height='100%' justifyContent='space-between'>
               <Typography variant='h5' sx={{ fontSize: '22px !important', fontWeight: 'bold' }}>
                  {data.name}
               </Typography>
               <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <Box>
                     <Box sx={{ my: 1, display: 'flex', alignItems: 'center', gap: 2, color: '#808080' }}>
                        <Typography>Giá: </Typography>
                        <Typography sx={{ fontSize: '18px !important', fontWeight: 'bold', color: 'red' }}>
                           {toFormatMoney(toDiscountedPrice(data.price, data.sale))}
                        </Typography>
                        <Typography sx={{ fontSize: '18px', fontWeight: 'bold', textDecoration: 'line-through' }}>
                           {toFormatMoney(data.price)}
                        </Typography>
                     </Box>
                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography sx={{ color: '#808080' }}>Size: </Typography>
                        <Typography>{data.size}</Typography>
                     </Box>
                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 1 }}>
                        <Typography sx={{ color: '#808080' }}>Color: </Typography>
                        <Box
                           sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexDirection: 'column',
                              gap: 1
                           }}>
                           <Box
                              sx={{
                                 position: 'relative',
                                 width: 28,
                                 height: 28,
                                 backgroundColor: data.color.color_code,
                                 borderRadius: '50%',
                                 border: '1px solid #E5E5E5'
                              }}></Box>
                        </Box>
                     </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2 }}>
                     <FormLabel title='Số lượng' gutterBottom required />
                     <TextField
                        type='number'
                        variant='standard'
                        sx={{ width: 40 }}
                        value={quantity}
                        onChange={handleSetQuantity}
                     />
                  </Box>
               </Stack>
            </Stack>
         </Grid>
         <Grid
            item
            xs={3}
            component={Stack}
            flexDirection='column'
            justifyContent='space-between'
            alignItems='flex-end'>
            <Box>
               <Typography
                  variant='h6'
                  sx={({ palette }) => ({
                     fontWeight: 'bold ',
                     color: palette.education.text.main
                  })}>
                  {toFormatMoney(toDiscountedPrice(data.price, data.sale) * data.quantity)}
               </Typography>
               <Box
                  component='p'
                  sx={({ palette }) => ({
                     textAlign: 'end',
                     fontSize: '20px',
                     color: palette.education.text.main
                  })}>
                  {data.totalQuantity > 0 ? `Còn hàng` : 'Hết hàng'}
               </Box>
            </Box>
            <Button
               fullWidth
               sx={({ palette }) => ({
                  py: 1,
                  bgcolor: palette.education.text.black,
                  ':hover': {
                     bgcolor: palette.education.text.black
                  }
               })}
               onClick={deleteCart}>
               <DeleteIcon />
            </Button>
         </Grid>
      </Grid>
   );
}

export default CartProductItem;
