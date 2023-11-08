import ControllerSelect from '@Core/Components/FormControl/ControllerSelect';
import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';
import FormLabel from '@Core/Components/FormControl/FormLabel';
import CoreRadioGroup from '@Core/Components/Input/CoreRadioGroup';
import { Box, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import { payment_method } from '../utils';

function FormShipping({ form }) {
   const { control, register } = form;

   // const { data: provinces } = useQuery(['getProvinces'], async () => {
   //    return await getProvinces();
   // });

   // const { data: districts, mutate: queryDistricts } = useMutation({
   //    mutationFn: async (code) => {
   //       return await getDistricts(code);
   //    }
   // });

   // const { data: wards, mutate: queryWards } = useMutation({
   //    mutationFn: async (code) => {
   //       return await getWards(code);
   //    }
   // });

   // useEffect(() => {
   //    if (watch('province')) {
   //       queryDistricts(watch('province'));
   //    }

   //    if (watch('district')) {
   //       queryWards(watch('district'));
   //    }
   // }, [watch('province'), watch('district')]);

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
<<<<<<< HEAD
         <Box mb={2}>
            <FormLabel title='Email' gutterBottom required />
            <ControllerTextField name='Email' control={control} />
         </Box>
         <Box mb={2}>
            <FormLabel title='Tỉnh/ Thành phố' gutterBottom required />
            <ControllerSelect name='' control={control} />
         </Box>
         <Box mb={2}>
            <FormLabel title='Quận/ Huyện' gutterBottom required />
            <ControllerSelect name='' control={control} />
         </Box>
         <Box mb={2}>
            <FormLabel title='Phường/ Xã' gutterBottom required />
            <ControllerSelect name='' control={control} />
=======
         {/* <Box mb={2}>
            <FormLabel title='Tỉnh/ thành phố' gutterBottom required />
            <CoreAutoComplete
               name='province'
               valuePath='code'
               labelPath='name'
               filterOptions={(options) => options}
               onChangeSelect={(value) => console.log(value)}
               returnValueType='enum'
               control={control}
               options={provinces}
            />
         </Box> */}
         {/* <Box mb={2}>
            <FormLabel title='Quận/ Huyện' gutterBottom required />
            <ControllerSelect name='district' _value='code' _title='name' options={districts || []} control={control} />
         </Box>
         <Box mb={2}>
            <FormLabel title='Phường Xã' gutterBottom required />
            <ControllerSelect name='ward' _value='code' _title='name' options={wards || []} control={control} />
         </Box> */}
         <Box mb={2}>
            <FormLabel title='Địa chỉ cụ thể' gutterBottom required />
            <ControllerTextField name='address' control={control} />
         </Box>
         <Box mb={2}>
            <FormLabel title='Ghi chú' gutterBottom required />
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
                  defaultValue={payment_method[0].value}
                  options={payment_method}
                  control={control}
               />
            </Box>
>>>>>>> test
         </Box>
      </Box>
   );
}

export default FormShipping;
