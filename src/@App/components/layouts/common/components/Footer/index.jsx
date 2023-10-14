import { Box, Grid, Stack, Typography } from '@mui/material';
import React from 'react';

import shopAnans from '../../../../../assets/svg/shopAnans.svg';
import { Link } from 'react-router-dom';

const footerListAcction = [
   {
      id: 1,
      head: 'SẢN PHẨM',
      children: ['Giày Nam', 'Giày Nữ', 'Thời trang & Phụ kiện', 'Sale-off']
   },
   {
      id: 2,
      head: 'VỀ CÔNG TY',
      children: ['Dứa tuyển dụng', 'Liên hệ nhượng quyền', 'Về Ananas']
   },
   {
      id: 3,
      head: 'HỖ TRỢ',
      children: ['FAQs', 'Bảo mật thông tin', 'Chính sách chung', 'Tra cứu đơn hàng']
   },
   {
      id: 4,
      head: 'LIÊN HỆ',
      children: ['Email góp ý', 'Hotline', '0963 429 749']
   }
];

export default function Footer() {
   return (
      <Grid
         container
         spacing={2}
         direction='row'
         alignItems='center'
         sx={{
            borderTop: '1px solid rgba(162, 162, 162, 0.4)',
            py: 15,
            backgroundColor: '#4C4C4C'
         }}>
         <Grid item xs={3}>
            <Box sx={{}}>
               <img src={shopAnans} width='100%' alt='' />
               <Box
                  component={Link}
                  to=''
                  sx={{
                     width: 'fit-content',
                     backgroundColor: '#F15E2C',
                     color: '#FFFFFF',
                     mx: 'auto',
                     padding: '6px 61.41px 4px 61.59px',
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                     textDecoration: 'none',
                     textTransform: 'uppercase',
                     fontWeight: 'bold'
                  }}>
                  Tìm cửa hàng
               </Box>
            </Box>
         </Grid>
         <Grid item xs={9}>
            <Grid container spacing={2}>
               {footerListAcction.map((item) => {
                  return (
                     <Grid item xs={3} key={item.id} component={Stack} gap={2} flexDirection='column'>
                        <Typography variant='h6' sx={{ color: '#FFF' }}>
                           {item.head}
                        </Typography>
                        {item.children.map((child, index) => {
                           return (
                              <Box sx={{ color: '#CCC' }} key={index}>
                                 {child}
                              </Box>
                           );
                        })}
                     </Grid>
                  );
               })}
            </Grid>
         </Grid>
      </Grid>
   );
}
