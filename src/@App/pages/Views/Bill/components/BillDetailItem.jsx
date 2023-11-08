import toFormatMoney, { toDiscountedPrice } from '@Core/Helper/Price';
import { Box, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';

const STATUS_PRODUCT = ['Còn hàng', 'Hết hàng'];

const BillDetailItem = ({ data }) => {
   console.log(data);
   return (
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, p: 1 }}>
         <Box>
            <img src={data.image} width='70' height='70' alt='' style={{ borderRadius: '5px' }} />
         </Box>
         <Box sx={{ flex: 1 }}>
            <Stack flexDirection='row'>
               <Typography
                  component={Link}
                  to={'/products/' + data._id}
                  variant='h5'
                  sx={{ fontSize: '22px !important', fontWeight: 'bold', color: 'black' }}>
                  {data.product_name}
               </Typography>
               <Stack
                  sx={{
                     flex: 1,
                     flexDirection: 'row',
                     justifyContent: 'end',
                     alignItems: 'center',
                     gap: 2,
                     color: '#808080'
                  }}>
                  <Typography>Giá: </Typography>
                  <Typography sx={{ fontSize: '18px !important', fontWeight: 'bold', color: 'red' }}>
                     {toFormatMoney(toDiscountedPrice(data.price, data.sale))}
                  </Typography>
                  <Typography sx={{ fontSize: '18px', fontWeight: 'bold', textDecoration: 'line-through' }}>
                     {toFormatMoney(data.price)}
                  </Typography>
               </Stack>
            </Stack>
            <Box display='flex' alignItems='center' gap={4}>
               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography sx={{ color: '#808080' }}>Size: </Typography>
                  <Typography>{data.size}</Typography>
               </Box>
               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 1 }}>
                  <Typography sx={{ color: '#808080' }}>Color: </Typography>
                  <Box
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        gap: 1
                     }}>
                     <Box
                        sx={{
                           position: 'relative',
                           width: 28,
                           height: 28,
                           backgroundColor: data.color.color_code,
                           borderRadius: '50%',
                           border: '1px solid #E5E5E5'
                        }}></Box>
                  </Box>
               </Box>
               <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2 }}>
                  <Typography>x {data.quantity}</Typography>
               </Box>
               <Box sx={{ flex: 1, display: 'flex', justifyContent: 'end' }}>
                  <Typography sx={{ color: '#808080' }}>
                     Ngày đặt: {format(new Date(data.createdAt), 'mm-dd-yyyy')}
                  </Typography>
               </Box>
            </Box>
         </Box>
      </Box>
   );
};

export default BillDetailItem;
