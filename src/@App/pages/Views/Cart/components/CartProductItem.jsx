import FormLabel from '@Core/Components/FormControl/FormLabel';
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react';
import toFormatMoney, { toDiscountedPrice } from '@Core/Helper/Price';
import { errorMessage } from '@Core/Helper/Message';
import { useMutation } from '@tanstack/react-query';
import cartService from '@App/services/cart.service';
import useAuth from '@App/hooks/useAuth';
import LazyLoadingImage from '@App/components/customs/LazyLoadingImage';
import { MAX_QUANTITY } from '../../ProductDetail/components/ProductDescription';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ControllerInputNumber from '@Core/Components/FormControl/ControllerInputNumber';
import { error } from 'highcharts';

function CartProductItem({ data, getCart }) {
   const { user } = useAuth();
   const [errorQuantity, setErrorQuantity] = useState('');

   const { control, watch } = useForm({
      defaultValues: {
         quantity: data?.quantity
      }
   });

   const quantityProduct = watch('quantity');

   const { mutate: updateCart } = useMutation({
      mutationFn: async () => {
         if (Number(quantityProduct) < 1) {
            return setErrorQuantity('Số lượng không hợp lệ');
         }

         if (Number(quantityProduct) > MAX_QUANTITY) {
            return setErrorQuantity('Vượt quá số lượng cho phép');
         }

         if (Number(quantityProduct) > data?.totalQuantity) {
            return setErrorQuantity('Vượt quá số lượn trong kho');
         }

         // Update cart only if there are no errors
         setErrorQuantity('');
         return await cartService.updateOne(
            { product_id: data?.product_id, user_id: user._id, quantity: quantityProduct },
            data?.cart_id
         );
      },
      onSuccess: () => {
         getCart();
      }
   });

   useEffect(() => updateCart(), [quantityProduct]);

   const { mutate: deleteCart } = useMutation({
      mutationFn: async () => {
         return await cartService.delete(data?.cart_id);
      },
      onSuccess: () => {
         getCart();
      }
   });

   return (
      <Grid container spacing={2} sx={{ px: 2, py: 1 }}>
         <Grid item xs={3}>
            <Box sx={{ maxHeight: 150 }}>
               <Box component={LazyLoadingImage} src={data?.image} sx={{ height: 150 }} />
            </Box>
         </Grid>
         <Grid item xs={6}>
            <Stack height='100%' justifyContent='space-between'>
               <Typography variant='h5' sx={{ fontSize: '22px !important', fontWeight: 'bold' }}>
                  {data?.name}
               </Typography>
               <Box sx={{ my: 1, display: 'flex', alignItems: 'center', gap: 2, color: '#808080' }}>
                  <Typography>Giá: </Typography>
                  <Typography sx={{ fontSize: '18px !important', fontWeight: 'bold', color: 'red' }}>
                     {toFormatMoney(toDiscountedPrice(data?.price, data?.sale))}
                  </Typography>
                  <Typography sx={{ fontSize: '18px', fontWeight: 'bold', textDecoration: 'line-through' }}>
                     {toFormatMoney(data?.price)}
                  </Typography>
               </Box>
               <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <Box>
                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography sx={{ color: '#808080' }}>Size: </Typography>
                        <Typography>{data?.size}</Typography>
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
                                 backgroundColor: data?.color,
                                 borderRadius: '50%',
                                 border: '1px solid #E5E5E5'
                              }}></Box>
                        </Box>
                     </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2 }}>
                     <FormLabel title='Số lượng' gutterBottom />

                     <Box component='form' width={50}>
                        <ControllerInputNumber disabled={data.totalQuantity === 0} name='quantity' control={control} />
                     </Box>
                  </Box>
               </Stack>
               {errorQuantity && (
                  <Box sx={{ textAlign: 'end', mt: 0.5, fontSize: '13px', color: 'red' }}>{errorQuantity}</Box>
               )}
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
                  {toFormatMoney(toDiscountedPrice(data?.price, data?.sale) * data?.quantity)}
               </Typography>
               <Box
                  component='p'
                  sx={({ palette }) => ({
                     textAlign: 'end',
                     fontSize: '20px',
                     color: palette.education.text.main
                  })}>
                  {data?.totalQuantity > 0 ? `Còn hàng` : 'Hết hàng'}
               </Box>
            </Box>
            <Button
               sx={({ palette }) => ({
                  py: 1,
                  width: '90px',
                  maxWidth: '100%',
                  bgcolor: palette.education.text.black,
                  ':hover': {
                     bgcolor: palette.education.text.black
                  }
               })}
               onClick={() => deleteCart()}>
               <DeleteIcon />
            </Button>
         </Grid>
      </Grid>
   );
}

export default CartProductItem;
