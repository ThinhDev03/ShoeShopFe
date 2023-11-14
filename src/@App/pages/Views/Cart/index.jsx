import { Box, Button, Checkbox, Container, Divider, Grid, Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import CartProductItem from './components/CartProductItem';
import CartBill from './components/CartBill';
import { useQuery } from '@tanstack/react-query';
import cartService from '@App/services/cart.service';
import useAuth from '@App/hooks/useAuth';
import { toDiscountedPrice } from '@Core/Helper/Price';
import { Link } from 'react-router-dom';
import { CART_ACTION, useCart } from '@App/redux/slices/cart.slice';
import { compareArrays } from './helper';

function Cart() {
   const { user } = useAuth();
   const { cart, updateCart } = useCart();

   const {
      data: carts,
      isFetching: loading,
      refetch: getCart
   } = useQuery(['getCart'], async () => {
      const res = await cartService.getCart(user._id);
      return res.data;
   });

   const totalPrice = useMemo(() => {
      const newCart = carts ? carts?.filter((item) => cart.includes(item.product_id)) : [];

      return newCart?.reduce((currentPrice, item) => {
         return currentPrice + toDiscountedPrice(item.price, item.sale) * item.quantity;
      }, 0);
   }, [carts, cart]);

   const handleChangeCart = (product_id) => {
      if (cart.includes(product_id)) {
         updateCart(CART_ACTION[1], product_id);
      } else {
         console.log(product_id);
         updateCart(CART_ACTION[0], product_id);
      }
   };

   const handleCheckAllCart = () => {
      if (compareArrays(carts, cart)) {
         updateCart(CART_ACTION[3], []);
      } else {
         updateCart(CART_ACTION[2], carts);
      }
   };

   return (
      <Container maxWidth='lg'>
         {carts && carts?.length > 0 ? (
            <Grid container spacing={2}>
               <Grid item xs={8}>
                  <Box sx={{ padding: '8px 12px', backgroundColor: '#f1f1f1' }}>
                     <Typography variant='h5' fontWeight='bold'>
                        Giỏ hàng
                     </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                     <Checkbox checked={carts.length === cart.length} onChange={handleCheckAllCart} />
                     <Typography variant='h6' sx={{ fontSize: '18px !important', fontWeight: 600, color: '#808080' }}>
                        Sản phẩm
                     </Typography>
                  </Box>

                  <Stack mt={2} gap={2}>
                     {carts?.map((item, index) => {
                        return (
                           <Box
                              key={item.product_id + index}
                              sx={{ backgroundColor: item?.totalQuantity === 0 && '#f1f1f1', borderRadius: '5px' }}>
                              <Box display='flex' alignItems='center' mb={1}>
                                 <Box>
                                    <Checkbox
                                       disabled={item.totalQuantity === 0}
                                       checked={item.totalQuantity > 0 && cart.includes(item.product_id)}
                                       onChange={() => item.totalQuantity > 0 && handleChangeCart(item.product_id)}
                                    />
                                 </Box>
                                 <CartProductItem data={item} getCart={getCart} />
                              </Box>
                              <Divider />
                           </Box>
                        );
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
