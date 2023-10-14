import { routerPath } from '@App/configs/routerConfig';
import { Box, Button, Stack, Typography, styled } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard() {
   return (
      <Stack>
         <Box component={Link} to={'/' + routerPath.PRODUCTDETAIL} sx={{ position: 'relative' }}>
            <img
               src='https://ananas.vn/wp-content/uploads/Pro_AV00020_1-500x500.jpg'
               width='100%'
               height='100%'
               alt=''
            />
            <ProductStatus>HẾT HÀNG</ProductStatus>
         </Box>
         <Stack>
            <Typography sx={{ py: 1, textAlign: 'center', color: '#ff5f17', fontSize: 2 }} component={Link} to=''>
               Online Only
            </Typography>
            <Box sx={{ borderTop: '1px dashed #333', height: '20px', my: '4px' }}></Box>
            <Typography
               sx={{
                  fontWeight: 600,
                  color: '#000',
                  textAlign: 'center',
                  ':hover': {
                     color: '#f15e2c'
                  }
               }}
               component={Link}
               to={'/' + routerPath.PRODUCTDETAIL}>
               Basas Simple Life NE - High Top
            </Typography>
            <Stack sx={{ mt: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
               <Box component='span'>510.000 VND</Box>
               <Box component='span' sx={{ color: '#808080', fontSize: '14px' }}>
                  650.000 VND
               </Box>
            </Stack>
         </Stack>
      </Stack>
   );
}

const ProductStatus = styled('span')(({ theme }) => ({
   position: 'absolute',
   top: 0,
   left: 0,
   width: '100%',
   height: '99%',
   backgroundColor: '#00000059',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   color: theme.palette.education.text.white
}));

const AddtoCard = styled(Button)(({ theme }) => ({
   position: 'absolute',
   bottom: 3,
   left: 0,
   width: '100%',
   display: 'none'
}));

export default ProductCard;
