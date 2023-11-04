import { Box, CircularProgress, Container, Grid } from '@mui/material';
import React, { useMemo } from 'react';
import FormShipping from './component/FormShipping';
import Invoice from './component/Invoice';
import { useMutation, useQuery } from '@tanstack/react-query';
import cartService from '@App/services/cart.service';
import useAuth from '@App/hooks/useAuth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schemaShipping from './utils/yupShipping';
import { toDiscountedPrice } from '@Core/Helper/Price';
import billService from '@App/services/bill.service';
import { successMessage } from '@Core/Helper/Message';

function Shipping() {
   const { user } = useAuth();

   const { handleSubmit, ...form } = useForm({
      resolver: yupResolver(schemaShipping)
   });

   const {
      data: carts,
      isFetching: loading,
      refetch: getCart
   } = useQuery(['getCart'], async () => {
      const res = await cartService.getCart(user._id);
      return res.data;
   });

   const totalPrice = useMemo(() => {
      return carts?.data?.reduce((currentPrice, item) => {
         return currentPrice + toDiscountedPrice(item.price, item.sale) * item.quantity;
      }, 0);
   }, [carts]);

   const { mutate: createBill } = useMutation({
      mutationFn: async (data) => {
         const res = await billService.create(data);
         return res.data;
      },
      onSuccess: () => {
         successMessage('Đặt hàng thành công');
      }
   });

   const onSubmit = async (data) => {
      const newData = {
         ...data,
         user_id: user._id,
         total_money: totalPrice,
         products: carts?.data.map((cart) => {
            return {
               cart_id: cart.cart_id,
               product_id: cart.product_id,
               quantity: cart.quantity
            };
         })
      };

      createBill(newData);
      getCart();
   };

   console.log(carts);

   return (
      <Container maxWidth='lg' sx={{ py: 3 }}>
         {loading ? (
            <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}>
               <Box
                  sx={{
                     display: 'flex',
                     height: '100%',
                     width: '100%',
                     alignItems: 'center',
                     justifyContent: 'center',
                     backgroundColor: '#DADADA1A'
                  }}>
                  <CircularProgress />
               </Box>
            </Box>
         ) : (
            carts?.length > 0 && (
               <Grid container spacing={2}>
                  <Grid item xs={7}>
                     <FormShipping form={form} />
                  </Grid>
                  <Grid item xs={5}>
                     <Invoice handleSubmit={handleSubmit} onSubmit={onSubmit} cart={carts} totalPrice={totalPrice} />
                  </Grid>
               </Grid>
            )
         )}
      </Container>
   );
}

export default Shipping;
