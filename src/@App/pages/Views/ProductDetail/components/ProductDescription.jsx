import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, MenuItem, Stack, Typography, styled } from '@mui/material';

import yupCard from '../utils/yup.card';
import productService from '@App/services/product.service';
import toFormatMoney from '@Core/Helper/Price';
import productDetail from '@App/services/product-detail.service';
import ControllerSelect from '@Core/Components/FormControl/ControllerSelect';
import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';
import ColorRender from './ColorRender';

function ProductDescription() {
   const { id } = useParams();
   const [indexActive, setIndexActive] = useState(0);

   const { control, handleSubmit, setValue } = useForm({
      mode: 'onChange',
      resolver: yupResolver(yupCard),
      defaultValues: yupCard.getDefault()
   });

   const results = useQueries({
      queries: [
         {
            queryKey: ['getProduct'],
            queryFn: async () => {
               const rest = await productService.getOne(id);
               return rest.data;
            }
         },
         {
            queryKey: ['getProductDetai'],
            queryFn: async () => {
               const rest = await productDetail.getOne(id);
               return rest.data;
            }
         }
      ]
   });

   const [product, details] = results;

   const onSubmit = async (data) => {
      console.log(data);
   };

   function getUniqueListBy(arr) {
      const newSet = new Map();
      arr.forEach((item) => {
         newSet.set(item.color_id._id, item.color_id);
      });

      return Array.from(newSet);
   }

   // useEffect(() => {
   //    const size = details?.data?.filter((item) => item.color_id._id === '653728be9b05ef0df28823a0');
   // }, []);

   return (
      <React.Fragment>
         <Stack sx={{ padding: '0 24px', gap: '30px' }}>
            <Typography variant='h5'>{!results[0].isLoading && results[0]?.data?.name}</Typography>
            <Stack flexDirection='row' justifyContent='space-between'>
               <Box sx={{ display: 'flex', gap: 2, fontSize: '18px' }}>
                  Mã sản phẩm:
                  <strong>AV00180</strong>
               </Box>
               <Box sx={{ display: 'flex', gap: 2, fontSize: '18px' }}>
                  Tình trạng:
                  <strong>New Arrival</strong>
               </Box>
            </Stack>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
               <Typography variant='h5' sx={({ palette }) => ({ color: palette.education.text.main, fontWeight: 600 })}>
                  {(details && toFormatMoney(details?.data?.[indexActive].sale)) || ''}
               </Typography>
               <Box sx={{ color: '#808080', fontSize: '20px', fontWeight: 500 }}>
                  {(details && toFormatMoney(details?.data?.[indexActive].price)) || ''}
               </Box>
            </Box>

            <Divider />

            <Box component='form' onSubmit={handleSubmit(onSubmit)}>
               <Stack gap={3} flexDirection='row' alignItems='center'>
                  {getUniqueListBy(details?.data || [], '_id').map((color) => {
                     console.log(color[1].color_code);
                     return <ColorRender color={color[1]} check={} onClick={setIndexActive} />;
                  })}
               </Stack>

               <Divider />

               <Stack flexDirection='row' alignItems='center' gap={2} mb={1}>
                  <Box sx={{ width: '50%', minHeight: '100px' }}>
                     <Typography sx={{ textTransform: 'uppercase', fontWeight: 600 }}>Size</Typography>
                     <ControllerSelect
                        options={(!details.isLoading && details?.data) || []}
                        _value='size_id._id'
                        _title='size_id.size_name'
                        name='size_id'
                        control={control}>
                        {!details.isLoading &&
                           details?.data.map((item) => {
                              return (
                                 <MenuItem value={item.size_id._id} key={item._id}>
                                    {item.size_id.size_name}
                                 </MenuItem>
                              );
                           })}
                     </ControllerSelect>
                  </Box>
                  <Box sx={{ width: '50%', minHeight: '100px' }}>
                     <Typography sx={{ textTransform: 'uppercase', fontWeight: 600 }}>Số lượng</Typography>
                     <ControllerTextField name='quantity' control={control} />
                  </Box>
               </Stack>
               <Stack gap={1}>
                  <Button
                     type='submit'
                     fullWidth
                     sx={({ palette }) => ({
                        textTransform: 'uppercase',
                        py: '18px',
                        bgcolor: palette.education.text.black,
                        ':hover': {
                           bgcolor: palette.education.text.black
                        }
                     })}>
                     Thêm vào giỏ hàng
                  </Button>
                  <Button type='submit' fullWidth sx={{ textTransform: 'uppercase', py: '18px' }}>
                     Thanh toán
                  </Button>
               </Stack>
            </Box>

            {/* <AccordionDescription product={product} /> */}
         </Stack>
      </React.Fragment>
   );
}

const Divider = styled(Box)(({ theme }) => ({
   margin: '32px 0px 15px 0',
   backgroundColor: theme.palette.education.text.white,
   background: 'url(https://ananas.vn/wp-content/themes/ananas/fe-assets/images/bg_divider.png) repeat-x 7px',
   height: '2px'
}));

export default React.memo(ProductDescription);
