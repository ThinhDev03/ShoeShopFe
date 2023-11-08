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

<<<<<<< HEAD
               <Stack mt={2} gap={2}>
                  <ProductCartItem />
                  <ProductCartItem />
                  <ProductCartItem />
               </Stack>
            </Grid>
            <Grid item xs={4}>
               <Stack gap='20px' sx={{ bgcolor: '#f1f1f1', pb: '20px', pt: '5px', px: 3 }}>
                  <Typography variant='h6' sx={{ fontWeight: 'bold', py: 1, borderBottom: '2px solid black' }}>
                     Đơn hàng
                  </Typography>
                  <Box>
                     <FormLabel sx={{ display: 'block', fontSize: '20px', fontWeight: 'bold', mb: 0.5 }}>
                        NHẬP MÃ KHUYẾN MÃI
                     </FormLabel>
                     <Box sx={{ display: 'flex', gap: 1 }}>
                        <TextField />
                        <Button>Áp dụng</Button>
                     </Box>
                  </Box>
                  <Box sx={{ borderBottom: '2px dashed #000', my: '2px' }}></Box>
                  <Stack
                     gap={2}
                     sx={{
                        color: '#808080',
                        fontWeight: 'bold',
                        fontSize: '18px'
                     }}>
                     <Box display='flex' justifyContent='space-between'>
                        <Box component='p' m={0}>
                           Đơn hàng
                        </Box>
                        <Box component='p' m={0}>
                           350.000 VND
                        </Box>
                     </Box>
                     <Box display='flex' justifyContent='space-between' >
                        <Box component='p' m={0}>
                           Giảm
                        </Box>
                        <Box component='p' m={0}>
                           0 VND
                        </Box>
                     </Box>
                  </Stack>
                  <Box sx={{ borderBottom: '2px dashed #000', my: '2px' }}></Box>
                  <Box
                     sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        color: '#000',
                        fontSize: '20px',
                        fontWeight: 'bold'
                     }}>
                     <Box component='p' m={0}>
                        Tạm tính
                     </Box>
                     <Box component='p' m={0}>
                        350.000 VND
                     </Box>
                  </Box>
                  <Button fullWidth sx={{ textTransform: 'uppercase', py: '10px', fontWeight: 'bold' }} >
                     Tiếp tục thanh toán
                  </Button>
               </Stack>
=======
                  <Stack mt={2} gap={2}>
                     {carts?.map((item) => {
                        return <CartProductItem data={item} key={item.product_id} getCart={getCart} />;
                     })}
                  </Stack>
               </Grid>
               <Grid item xs={4}>
                  <CartBill totalPrice={totalPrice} />
               </Grid>
>>>>>>> test
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
