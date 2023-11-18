import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';
import FormLabel from '@Core/Components/FormControl/FormLabel';
import CoreRadioGroup from '@Core/Components/Input/CoreRadioGroup';
import { Box, Grid, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { bankCode, getDistricts, getProvinces, getWards, payment_methods } from '../utils';
import { useWatch } from 'react-hook-form';
import AutoComplateProvince from './AutoComplateProvince';

function FormShipping({ form }) {
   const { control, register, watch } = form;
   const watchProvince = useWatch({ control, name: 'province' });
   const watchDistrict = useWatch({ control, name: 'district' });
   // const [wards, setWards] = useState([]);

   const { data: provinces } = useQuery(['getProvinces'], async () => {
      const res = await getProvinces();
      return res.map((item) => ({ value: item.code + '-' + item.name, title: item.name }));
   });
   console.log(watchProvince);
   const { data: districts, mutate: queryDistricts } = useMutation({
      mutationFn: async (code) => {
         const res = await getDistricts(code);
         console.log(res);
         return res.map((item) => ({ value: item.code + '-' + item.name, title: item.name }));
      }
   });

   const { data: wards, mutate: queryWards } = useMutation({
      mutationFn: async (code) => {
         const res = await getWards(code);
         return res.map((item) => ({ value: item.code + '-' + item.name, title: item.name }));
      }
   });

   useEffect(() => {
      if (watchProvince) {
         const province_code = watchProvince.split('-');
         queryDistricts(province_code[0]);
      }
   }, [watchProvince]);

   useEffect(() => {
      if (watchDistrict) {
         const district_code = watchDistrict.split('-');
         queryWards(district_code[0]);
      }
   }, [watchDistrict]);

   const method = watch('payment_method');

   return (
      <Box component='form'>
         <Box sx={{ padding: '5px 20px', width: '100%', backgroundColor: '#f1f1f1', mb: '12px' }}>
            <Typography
               sx={{ display: 'block', fontSize: '20px !important', fontWeight: '400', lineHeight: '32px' }}
               variant='h6'>
               Thông tin giao hàng
            </Typography>
         </Box>
         <Box mb={2}>
            <FormLabel title='Tên người nhận hàng' gutterBottom required />
            <ControllerTextField name='receiver' control={control} />
         </Box>
         <Box mb={2}>
            <FormLabel title='Số điện thoại' gutterBottom required />
            <ControllerTextField name='phone_number' control={control} />
         </Box>
         <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
               <Box mb={2}>
                  <FormLabel title='Tỉnh/ thành phố' gutterBottom required />
                  <AutoComplateProvince
                     name='province'
                     valuePath='value'
                     labelPath='title'
                     returnValueType='enum'
                     control={control}
                     options={provinces || []}
                  />
               </Box>
            </Grid>
            <Grid item xs={12} md={4}>
               <Box mb={2}>
                  <FormLabel title='Quận/ Huyện' gutterBottom required />
                  <AutoComplateProvince
                     name='district'
                     valuePath='value'
                     labelPath='title'
                     returnValueType='enum'
                     control={control}
                     options={districts || []}
                  />
               </Box>
            </Grid>
            <Grid item xs={12} md={4}>
               <Box mb={2}>
                  <FormLabel title='Xã/ Phường' gutterBottom required />
                  <AutoComplateProvince
                     name='ward'
                     valuePath='value'
                     labelPath='title'
                     returnValueType='enum'
                     control={control}
                     options={wards || []}
                  />
               </Box>
            </Grid>
         </Grid>

         <Box mb={2}>
            <FormLabel title='Địa chỉ cụ thể' gutterBottom required />
            <ControllerTextField name='address' control={control} />
         </Box>
         <Box mb={2}>
            <FormLabel title='Ghi chú' gutterBottom />
            <Box
               component='textarea'
               sx={{
                  width: '100%',
                  height: '100px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '5px',
                  outline: 'none',
                  padding: 2
               }}
               {...register('note')}
            />
         </Box>

         <Box sx={{ mt: 2 }}>
            <Box sx={{ padding: '5px 20px', width: '100%', backgroundColor: '#f1f1f1', mb: '12px' }}>
               <Typography
                  sx={{ display: 'block', fontSize: '20px !important', fontWeight: '400', lineHeight: '32px' }}
                  variant='h6'>
                  PHƯƠNG THỨC THANH TOÁN
               </Typography>
            </Box>

            <Box sx={{ fontSize: '18px' }}>
               <CoreRadioGroup
                  name='payment_method'
                  defaultValue={payment_methods[0].value}
                  options={payment_methods}
                  control={control}
               />
            </Box>
         </Box>
      </Box>
   );
}

export default FormShipping;
