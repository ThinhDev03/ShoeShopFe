import { routerPath } from '@App/configs/routerConfig';
import { Box, Button, Stack, Typography, styled } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoadingImage from '../../LazyLoadingImage';
import toFormatMoney from '@Core/Helper/Price';

function ProductCard({ data }) {
   return (
      <Stack>
         <Box
            component={Link}
            to={'/' + routerPath.PRODUCTS + '/' + data?._id}
            sx={{ position: 'relative', width: 276, height: 276 }}>
            <LazyLoadingImage src={data?.thumbnail} width='100%' height='100%' alt='' />
            {/* <ProductStatus>HẾT HÀNG</ProductStatus> */}
         </Box>
         <Stack>
            <Typography
               variant='h6'
               sx={{
                  py: 1,
                  textAlign: 'center',
                  color: '#ff5f17',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  fontWeight: 300
               }}
               component={Link}
               to={data?._id}>
               {data?.name}
            </Typography>
            <Box sx={{ borderTop: '1px dashed #333', my: '4px' }}></Box>

            <Stack
               sx={{
                  mt: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  fontSize: '20px'
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
