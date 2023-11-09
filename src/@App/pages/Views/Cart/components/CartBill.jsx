import toFormatMoney from '@Core/Helper/Price';
import { Box, Button, FormLabel, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const CartBill = ({ totalPrice }) => {
   return (
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
                  {toFormatMoney(totalPrice)}
               </Box>
            </Box>
            <Box display='flex' justifyContent='space-between'>
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
               {toFormatMoney(totalPrice)}
            </Box>
         </Box>
         <Button
            component={Link}
            to='/shipping'
            fullWidth
            sx={{ textTransform: 'uppercase', py: '10px', fontWeight: 'bold' }}>
            Tiếp tục thanh toán
         </Button>
      </Stack>
   );
};

export default CartBill;
