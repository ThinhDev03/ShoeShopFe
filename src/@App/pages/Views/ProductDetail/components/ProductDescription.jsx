import { Box, Button, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import AccordionDescription from './AccordionDescription';
import { useParams } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import productDetail from '@App/services/product-detail.service';
import productService from '@App/services/product.service';
import ControllerRadioColor from './ControllerRadioColor';
import handlePrice from '@Core/Helper/Price';
import { yupResolver } from '@hookform/resolvers/yup';
import yupCard from '../utils/yup.card';
import { useForm } from 'react-hook-form';
import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';
import ControllerSelect from '@Core/Components/FormControl/ControllerSelect';

function ProductDescription() {
   const { id } = useParams();
   const [detail, setDetail] = useState(0);

   const form = useForm({
      mode: 'onChange',
      resolver: yupResolver(yupCard),
      defaultValues: yupCard.getDefault()
   });

   const { control, handleSubmit } = form;

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
                  {(details && handlePrice(details?.data?.[detail].sale)) || ''}
               </Typography>
               <Box sx={({ palette }) => ({ color: '#808080', fontSize: '20px', fontWeight: 500 })}>
                  {(details && handlePrice(details?.data?.[detail].price)) || ''}
               </Box>
            </Box>

            <Box sx={{ borderTop: '1px dashed #333', my: 1 }}></Box>

            <Box component='form' onSubmit={handleSubmit(onSubmit)}>
               <ControllerRadioColor
                  data={(details?.data && details.data) || []}
                  name='color_id'
                  setDetail={setDetail}
               />

               <Box sx={{ borderTop: '1px dashed #333', my: 3 }}></Box>

               <Stack flexDirection='row' alignItems='center' gap={2} mb={1}>
                  <Box sx={{ width: '50%', minHeight: '100px' }}>
                     <Typography sx={{ textTransform: 'uppercase', fontWeight: 600 }}>Size</Typography>
                     <ControllerSelect
                        options={(!details.isLoading && details?.data) || []}
                        _value='size_id._id'
                        _title='size_id.size_name'
                        name='size_id'
                        control={control}
                     />
                     {/* <MenuItem value=''></MenuItem>
                        {!details.isLoading &&
                          .map((item, index) => {
                              console.log(item.size_id._id);
                              return (
                                 <MenuItem value={item.size_id._id} key={item._id}>
                                    {item.size_id.size_name}
                                 </MenuItem>
                              );
                           })}
                     </ControllerSelect> */}
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
                  <Button fullWidth sx={{ textTransform: 'uppercase', py: '18px' }}>
                     Thanh toán
                  </Button>
               </Stack>
            </Box>

            <AccordionDescription />
         </Stack>
      </React.Fragment>
   );
}

export default React.memo(ProductDescription);
