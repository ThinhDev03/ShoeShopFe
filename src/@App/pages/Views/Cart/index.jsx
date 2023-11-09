import {
   Box,
   Button,
   CircularProgress,
   Container,
   FormLabel,
   Grid,
   InputAdornment,
   Stack,
   TextField,
   Typography
} from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import CartProductItem from './components/CartProductItem';
import CartBill from './components/CartBill';
import { useQuery } from '@tanstack/react-query';
import cartService from '@App/services/cart.service';
import useAuth from '@App/hooks/useAuth';
import { toDiscountedPrice } from '@Core/Helper/Price';
import { Link } from 'react-router-dom';

function Cart() {
   const { user } = useAuth();

   const {
      data: carts,
      isLoading: isLoading,
      refetch: getCart
   } = useQuery(['getCart'], async () => {
      const res = await cartService.getCart(user._id);
      return res.data;
   });

   const totalPrice = useMemo(() => {
      return carts?.reduce((currentPrice, item) => {
         return currentPrice + toDiscountedPrice(item.price, item.sale) * item.quantity;
      }, 0);
   }, [carts]);

   return (
      <Container maxWidth='lg' sx={{ py: 3 }}>
         {isLoading ? (
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
         ) : carts?.length > 0 ? (
            <Grid container spacing={2}>
               <Grid item xs={8}>
                  <Box sx={{ padding: '8px 12px', backgroundColor: '#f1f1f1' }}>
                     <Typography variant='h5' fontWeight='bold'>
                        Giỏ hàng
                     </Typography>
                  </Box>

                  <Stack mt={2} gap={2}>
                     {carts?.map((item, index) => {
                        return <CartProductItem data={item} key={item.product_id + index} getCart={getCart} />;
                     })}
                  </Stack>
               </Grid>
               <Grid item xs={4}>
                  <CartBill totalPrice={totalPrice} />
               </Grid>
            </Grid>
         ) : (
            <Stack gap={3}>
               <Typography variant='h4' fontWeight='bold' textAlign='center'>
                  Giỏ hàng của bạn
               </Typography>
               <Box sx={{ borderBottom: '1px solid #000', my: 2 }}></Box>

               <Box textAlign='center' fontSize='18px'>
                  Bạn đang không có sản phẩm nào trong giỏ hàng!
               </Box>
               <Box display='flex' justifyContent='center' mt={4}>
                  <Button
                     component={Link}
                     to='/products'
                     sx={({ palette }) => ({
                        padding: '10px 32px',
                        backgroundColor: palette.education.text.black,
                        ':hover': {
                           backgroundColor: palette.education.text.black
                        }
                     })}>
                     QUAY LẠI MUA HÀNG
                  </Button>
               </Box>
            </Stack>
         )}
      </Container>
   );
}

export default Cart;
