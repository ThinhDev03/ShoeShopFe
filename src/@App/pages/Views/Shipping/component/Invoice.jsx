import { Box, Button, Stack, Typography, styled } from '@mui/material';
import React from 'react';

function Invoice() {
   return (
      <Stack gap={3} sx={{ bgcolor: '#f1f1f1', pb: '20px', pt: '5px', px: 3 }}>
         <Typography variant='h6' sx={{ fontWeight: 'bold', py: 1, borderBottom: '2px solid black' }}>
            Đơn hàng
         </Typography>
         <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 3 }}>
            <Box>
               <Typography variant='h3' sx={{ fontSize: '18px !important', fontWeight: 'bold', color: '#808080' }}>
                  Graphic Tee - Skate 4p - Snow White
               </Typography>
               <Box
                  sx={{
                     mt: 2,
                     display: 'flex',
                     justifyContent: 'space-between',
                     color: '#808080',
                     fontSize: '18px'
                  }}>
                  <Box>
                     Size: <span>L</span>
                  </Box>
                  <Box>
                     x <span>1</span>
                  </Box>
               </Box>
            </Box>
            <Typography display='block' width='50%' textAlign='end'>
               350.000 VND
            </Typography>
         </Box>
         <Box sx={{ borderBottom: '2px dashed #000', my: '2px' }}></Box>
         <Stack sx={{ fontSize: '18px', color: '#808080' }} gap={2}>
            <FlexBetween>
               <span>Đơn hàng:</span>
               <span>350.000 VND</span>
            </FlexBetween>
            <FlexBetween>
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
            </FlexBetween>
         </Stack>
         <Box sx={{ borderBottom: '2px dashed #000', my: '2px' }}></Box>
         <FlexBetween sx={{ fontSize: '24px', fontWeight: 'bold' }}>
            <span>Tổng Cộng</span>
            <Box
               sx={({ palette }) => ({
                  color: palette.education.text.main
               })}>
               350.000 VND
            </Box>
         </FlexBetween>
         <Button fullWidth sx={{ fontSize: 28, fontWeight: 'bold', mt: 2 }}>
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
