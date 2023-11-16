import toFormatMoney, { toDiscountedPrice } from '@Core/Helper/Price';
import { Box, Divider, FormLabel, Grid, Paper, Stack, TextField, Typography, styled } from '@mui/material';
import { format } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';

const STATUS_PRODUCT = ['Còn hàng', 'Hết hàng'];

const BillDetailItem = ({ data }) => {
   return (
      <React.Fragment>
         <Flex sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <Box flex={1}>
               <Box
                  component='img'
                  src={data.image}
                  sx={{ width: '100%', height: '82.921px', borderRadius: '5px' }}
                  alt=''
               />
            </Box>
            <Flex sx={{ flex: 4, flexDirection: 'column', alignItems: 'start', gap: 1 }}>
               <Flex sx={{ justifyContent: 'space-between', width: '100%' }}>
                  <Typography
                     component={Link}
                     to={'/products/' + data._id}
                     variant='h5'
                     sx={{ fontSize: '18px !important', fontWeight: 'bold', color: '#111' }}>
                     {data.product_name}
                  </Typography>
                  <Flex>
                     <TitleCartItemDetail sx={{ fontSize: '12px' }}>Ngày đặt: </TitleCartItemDetail>
                     <TitleCartItemDetail sx={{ fontSize: '12px' }}>
                        {format(new Date(data.createdAt), 'mm-dd-yyyy')}
                     </TitleCartItemDetail>
                  </Flex>
               </Flex>

               <Flex>
                  <TitleCartItemDetail>Giá: </TitleCartItemDetail>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                     <Box sx={{ fontSize: '16px', fontWeight: 'bold', color: 'red' }}>
                        {toFormatMoney(toDiscountedPrice(data.price, data.sale))}
                     </Box>
                     <Box
                        sx={{ fontSize: '12px', fontWeight: 'bold', textDecoration: 'line-through', color: '#808080' }}>
                        {toFormatMoney(data.price)}
                     </Box>
                  </Box>
               </Flex>
               <Box display='flex' alignItems='center' gap={4}>
                  <Flex>
                     <TitleCartItemDetail>Size: </TitleCartItemDetail>
                     <Typography>{data.size}</Typography>
                  </Flex>
                  <Flex sx={{ my: 1 }}>
                     <TitleCartItemDetail>Color: </TitleCartItemDetail>
                     <Box
                        sx={{
                           position: 'relative',
                           width: 24,
                           height: 24,
                           backgroundColor: data.color,
                           borderRadius: '50%',
                           border: '1px solid #E5E5E5'
                        }}></Box>
                  </Flex>
                  <Flex>
                     <Typography>x {data.quantity}</Typography>
                  </Flex>
               </Box>
            </Flex>
         </Flex>
         <Divider />
      </React.Fragment>
   );
};

const TitleCartItemDetail = styled('div')(({ theme }) => ({
   color: '#808080',
   fontSize: '14px'
}));

const Flex = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   gap: 12
}));

export default BillDetailItem;
