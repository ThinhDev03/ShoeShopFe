import { routerPath } from '@App/configs/routerConfig';
import { Box, Button, Stack, Typography, styled } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoadingImage from '../../LazyLoadingImage';
import toFormatMoney from '@Core/Helper/Price';

function ProductCard({ data }) {
   return (
      <Stack
         sx={{
            boxShadow: '0 2px 4px 0 rgba(0,0,0,.12), 0 -2px 2px 0 rgba(0,0,0,.04)',
            borderRadius: '8px',
            overflow: 'hidden'
         }}>
         <Box
            component={Link}
            to={'/' + routerPath.PRODUCTS + '/' + data?._id}
            sx={{ position: 'relative', height: 276 }}>
            <LazyLoadingImage src={data?.thumbnail} width='100%' height='100%' alt='' />
            {/* <ProductStatus>HẾT HÀNG</ProductStatus> */}
         </Box>
         <Stack sx={{ mb: 0.5 }}>
            <Typography
               variant='h6'
               sx={{
                  padding: '8px 12px 0 12px ',
                  color: '#333333',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  fontWeight: 300
               }}
               component={Link}
               to={data?._id}>
               {data?.name}
            </Typography>
            {/* <Box sx={{ borderTop: '1px dashed #333', my: '4px' }}></Box> */}

            <Stack
               sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: '20px',
                  padding: '8px 12px ',
                  fontWeight: 'bold'
               }}>
               <Typography fontWeight={500} component='span'>
                  {toFormatMoney(data?.fromPrice, '.', '')}{' '}
               </Typography>
               {'-'}
               <Typography fontWeight={500} component='span' sx={{ fontSize: '16px' }}>
                  {toFormatMoney(data?.toPrice)}
               </Typography>
            </Stack>
         </Stack>
      </Stack>
   );
}

export default ProductCard;
