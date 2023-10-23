import ControllerSelect from '@Core/Components/FormControl/ControllerSelect';
import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';
import FormLabel from '@Core/Components/FormControl/FormLabel';
import { Box } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

function FormShipping() {
   const { control } = useForm();

   return (
      <Box component='form'>
         <Box mb={2}>
            <FormLabel title='Họ và tên' gutterBottom required />
            <ControllerTextField name='name' control={control} />
         </Box>
         <Box mb={2}>
            <FormLabel title='Số điện thoại' gutterBottom required />
            <ControllerTextField name='phone' control={control} />
         </Box>
         <Box mb={2}>
            <FormLabel title='Email' gutterBottom required />
            <ControllerTextField name='Email' control={control} />
         </Box>
         <Box mb={2}>
            <FormLabel title='Tỉnh/ thành phố' gutterBottom required />
            <ControllerTextField name='' control={control} />
         </Box>
         <Box mb={2}>
            <FormLabel title='Quận/ Huyện' gutterBottom required />
            {/* <ControllerSelect name='' control={control} /> */}
         </Box>
         <Box mb={2}>
            <FormLabel title='Phường Xã' gutterBottom required />
            {/* <ControllerSelect name='' control={control} /> */}
         </Box>
      </Box>
   );
}

export default FormShipping;
