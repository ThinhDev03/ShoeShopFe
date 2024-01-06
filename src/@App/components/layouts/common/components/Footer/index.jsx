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
      <Box
         sx={{
            borderTop: '1px solid rgba(162, 162, 162, 0.4)',
            py: 10,
            backgroundColor: '#4C4C4C',
            display: 'flex',
            justifyContent: 'center',
            px: 2
         }}>
         <Grid container maxWidth='lg' spacing={2} direction='row' alignItems='center'>
            <Grid item xs={12} md={4}>
               <Box sx={{}}>
                  <iframe
                     src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8354772940993!2d105.72923707500655!3d21.03926798061272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345550b525aa03%3A0x3fdefc40f69a023a!2zQ2FvIMSR4bqzbmcgRlBUIFBo4buRIFRy4buLbmggVsSDbiBCw7QgLCBQaMaw4budbmcgUGjGsMahbmcgQ2FuaCAsIHF14bqtbiBU4burIExpw6pt!5e0!3m2!1svi!2s!4v1699770551944!5m2!1svi!2s'
                     style={{ border: 0, width: '100%', height: '250px' }}
                     loading='lazy'
                     referrerPolicy='no-referrer-when-downgrade'></iframe>
               </Box>
            </Grid>
            <Grid item xs={12} md={8}>
               <Grid container spacing={2}>
                  {footerListAcction.map((item) => {
                     return (
                        <Grid item xs={12} sm={6} md={3} key={item.id} component={Stack} gap={2} flexDirection='column'>
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
      </Box>
   );
}
