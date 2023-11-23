import { routerPath } from '@App/configs/routerConfig';
import { Box, Button, Stack, Typography, styled } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoadingImage from '../../LazyLoadingImage';
import toFormatMoney from '@Core/Helper/Price';

function ProductCard({ data, sale }) {

   return (
      <Stack
         sx={{ overflow: 'hidden', backgroundColor: '#FFFFFF', textAlign: 'left !important', position: 'relative' }}>
         {sale && sale !== 0 ? (
            <Box
               sx={({ palette }) => {
                  return {
                     height: '36px',
                     width: '36px',
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                     borderRadius: '50%',
                     position: 'relative',
                     top: '45px',
                     left: '10px',
                     color: '#fff',
                     fontWeight: 500,
                     fontSize: '13px',
                     backgroundColor: palette.primary.main,
                     zIndex: 50
                  };
               }}>
               -{sale}%
            </Box>
         ) : null}
         <Box
            component={Link}
            to={'/' + routerPath.PRODUCTS + '/' + data?._id}
            sx={{ position: 'relative', height: 276 }}>
            <LazyLoadingImage src={data?.thumbnail} width='100%' height='100%' alt='' />
            {/* <ProductStatus>HẾT HÀNG</ProductStatus> */}
         </Box>
         <Stack sx={{ mb: 0.5 }}>
            <Stack sx={{ fontSize: '16px !important', px: '12px', py: 1, gap: 1 }}>
               <Box sx={{ color: '#9E3500' }}>{data?.category_id?.category_name}</Box>
               <Box
                  sx={{
                     color: '#333333',
                     textOverflow: 'ellipsis',
                     whiteSpace: 'nowrap',
                     overflow: 'hidden',
                     fontWeight: 600
                  }}
                  component={Link}
                  to={data?._id}>
                  {data?.name}
               </Box>
               <Box sx={{ color: '#707072' }}>{data?.brand_id?.brand_name}</Box>
            </Stack>
            {/* <Box sx={{ borderTop: '1px dashed #333', my: '4px' }}></Box> */}

            <Stack
               sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: '20px',
                  padding: '0 12px 8px 12px ',
                  fontWeight: 'bold'
               }}>
               <Box
                  sx={{
                     display: 'flex',
                     gap: 2,
                     alignItems: 'center',
                     color: '#111111',
                     fontWeight: 600,
                     fontSize: '17px'
                  }}>
                  {toFormatMoney(data?.fromPrice) === toFormatMoney(data?.toPrice) ? (
                     <Box>{toFormatMoney(data?.fromPrice)}</Box>
                  ) : (
                     <>
                        <Box>{toFormatMoney(data?.fromPrice)}</Box>
                        {' - '}
                        <Box>{toFormatMoney(data?.toPrice)}</Box>
                     </>
                  )}
               </Box>
            </Stack>
         </Stack>
      </Stack>
   );
}

export default ProductCard;
