import { Box, Button, CircularProgress, Container, Grid } from '@mui/material';
import React, { useMemo, useRef } from 'react';
import FormShipping from './component/FormShipping';
import Invoice from './component/Invoice';
import { useQuery } from '@tanstack/react-query';
import cartService from '@App/services/cart.service';
import useAuth from '@App/hooks/useAuth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schemaShipping from './utils/yupShipping';
import { toDiscountedPrice } from '@Core/Helper/Price';
import billService from '@App/services/bill.service';
import { successMessage } from '@Core/Helper/Message';
import paymentService from '@App/services/payment.service';
import { payment_methods } from './utils';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@App/redux/slices/cart.slice';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

function Shipping() {
   const { user } = useAuth();
   const { cart } = useCart();

   const button = useRef();
   const navigate = useNavigate();
   const refOrderId = useRef();
   const refPrice = useRef();
   const { handleSubmit, ...form } = useForm({
      resolver: yupResolver(schemaShipping),
      defaultValues: schemaShipping.getDefault()
   });

   const {
      data: carts,
      isLoading: loading,
      refetch: getCart
   } = useQuery(['getCart'], async () => {
      const res = await cartService.getCart(user._id);
      return res.data;
   });

   const newCart = carts ? carts.filter((item) => cart.includes(item.product_id)) : [];

   const totalPrice = useMemo(() => {
      return newCart?.reduce((currentPrice, item) => {
         return currentPrice + toDiscountedPrice(item.price, item.sale) * item.quantity;
      }, 0);
   }, [carts, cart]);
   if (!refPrice.current) {
      refPrice.current = !refPrice.current && totalPrice;
   }
   const onSubmit = async (data) => {
      const { province, district, ward, ...shipmentDetails } = {
         ...data,
         address:
            form.watch('province').split('-')[1] +
            ' - ' +
            form.watch('district').split('-')[1] +
            ' - ' +
            form.watch('ward').split('-')[1] +
            ' - ' +
            data.address
      };
      const newCart = carts ? carts.filter((item) => cart.includes(item.product_id)) : [];

      const orderInfo = {
         ...shipmentDetails,
         user_id: user._id,
         total_money: totalPrice,
         products: newCart?.map((cart) => {
            return {
               cart_id: cart.cart_id,
               product_id: cart.product_id,
               quantity: cart.quantity
            };
         })
      };

      const res = await billService.create(orderInfo);
      const paymentMethod = data.payment_method;
      successMessage('Đặt hàng thành công');
      if (paymentMethod === payment_methods[1].value) {
         //case thanh toán trước khi đặt hàng
         refOrderId.current.value = res.data.payment_id._id;
         button.current.click();
      } else {
         await getCart();
         //case thanh toán sau khi nhận hàng
         navigate('/bill');
      }
   };

   return (
      <Container maxWidth='lg' sx={{ py: 3 }}>
         {loading && (
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
         )}
         {!loading && (
            <Grid container spacing={2}>
               <Grid item xs={12}>
                  <Box
                     component={Link}
                     to='/cart'
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: '#111',
                        '&:hover': { textDecoration: 'underline' }
                     }}>
                     <KeyboardArrowLeftIcon /> Về giỏ hàng
                  </Box>
               </Grid>
               <Grid item xs={7}>
                  <FormShipping form={form} />
               </Grid>
               <Grid item xs={5}>
                  <Invoice handleSubmit={handleSubmit} onSubmit={onSubmit} cart={newCart} totalPrice={totalPrice} />
               </Grid>
            </Grid>
         )}
         <Box
            component='form'
            sx={{ visibility: 'hidden', opacity: 0 }}
            action={paymentService.getUrlPayment()}
            method='post'>
            <input name='amount' type='number' value={refPrice.current} />
            <input type='text' name='paymentId' ref={refOrderId} />
            <button ref={button} type='submit'>
               purchase
            </button>
         </Box>
      </Container>
   );
}

export default Shipping;
