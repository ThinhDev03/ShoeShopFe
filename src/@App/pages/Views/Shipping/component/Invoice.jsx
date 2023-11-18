import toFormatMoney, { toDiscountedPrice } from '@Core/Helper/Price';
import { Box, Button, Stack, Typography, styled } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function Invoice({ handleSubmit, onSubmit, cart, totalPrice }) {
   return (
      <Stack gap={3} sx={{ bgcolor: '#f1f1f1', pb: '20px', pt: '5px', px: 3 }}>
         <Typography
            variant='h6'
            sx={{
               fontWeight: 'bold',
               padding: '10px  20px',
               borderBottom: '2px solid black',
               fontSize: '21px !important',
               fontWeight: '400',
               lineHeight: '32px'
            }}>
            Đơn hàng
         </Typography>
         {cart.map((item) => {
            return (
               <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }} key={item.cart_id}>
                  <Box sx={{ flex: 1 }}>
                     <Typography
                        variant='h3'
                        sx={{ fontSize: '14px !important', fontWeight: 'bold', color: '#808080' }}>
                        {item.name}
                     </Typography>
                     <Box
                        sx={{
                           mt: 0.5,
                           display: 'flex',
                           justifyContent: 'space-between',
                           color: '#808080',
                           fontSize: '14px'
                        }}>
                        <Box>
                           Size: <span>{item.size}</span>
                        </Box>
                        <Box>
                           x <span>{item.quantity}</span>
                        </Box>
                     </Box>
                  </Box>
                  <Typography display='block' width='25%' textAlign='end'>
                     {toFormatMoney(toDiscountedPrice(item.price, item.sale))}
                  </Typography>
               </Box>
            );
         })}
         <Box sx={{ borderBottom: '2px dashed #000', my: '2px' }}></Box>
         <Stack sx={{ fontSize: '18px', color: '#808080' }} gap={2}>
            <FlexBetween>
               <span>Đơn hàng:</span>
               <span>{toFormatMoney(totalPrice)} </span>
            </FlexBetween>
            {/* <FlexBetween>
               <span>Giảm:</span>
               <span>- 0 VND</span>
            </FlexBetween>
            <FlexBetween sx={{ color: 'black' }}>
               <span>Phí vận chuyển:</span>
               <span>0 VND</span>
            </FlexBetween>
            <FlexBetween sx={{ color: 'black' }}>
               <span>Phí thanh toán:</span>
               <span>0 VND</span>
            </FlexBetween> */}
         </Stack>
         <Box sx={{ borderBottom: '2px dashed #000', my: '2px' }}></Box>
         <FlexBetween sx={{ fontSize: '24px', fontWeight: 'bold' }}>
            <span>Tổng Cộng</span>
            <Box
               sx={({ palette }) => ({
                  color: palette.education.text.main
               })}>
               {toFormatMoney(totalPrice)}
            </Box>
         </FlexBetween>
         <Button
            fullWidth
            type='submit'
            onClick={handleSubmit(onSubmit)}
            sx={{ fontSize: 22, fontWeight: 'bold', mt: 2 }}>
            Hoàn Tất Thanh Toán
         </Button>
      </Stack>
   );
}

const FlexBetween = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between'
}));

export default Invoice;
