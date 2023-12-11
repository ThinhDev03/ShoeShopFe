import { gender } from '@App/pages/Admin/User/utils';
import authService from '@App/services/auth.service';
import ControllerSelect from '@Core/Components/FormControl/ControllerSelect';
import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';
import FormLabel from '@Core/Components/FormControl/FormLabel';
import { errorMessage, successMessage } from '@Core/Helper/Message';
import { LoadingButton } from '@mui/lab';
import { Box, Grid } from '@mui/material';
import React, { useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';

function BaseFormRegister({ form }) {
   const { handleSubmit, control, setError } = form;
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const handleSubmitForm = async (data) => {
      setLoading(true);
      try {
         await authService.register(data);
         successMessage('Đăng ký thành công!');
         navigate('/sign-in');
      } catch (error) {
         setLoading(false);

         if (typeof error.response.data.message === 'object') {
            const key = Object.keys(error.response.data.message)[0];

            setError(key, { message: error.response.data.message[key] });
         }
         errorMessage(error);
      }
   };

   return (
      <form onSubmit={handleSubmit(handleSubmitForm)}>
         <Grid container spacing={2}>
            <Grid item xs={6}>
               <Box mb={1}>
                  <FormLabel required title='Tên đăng nhập' />
                  <ControllerTextField name='username' control={control} />
               </Box>
            </Grid>
            <Grid item xs={6}>
               <Box mb={1}>
                  <FormLabel required title='Họ và tên' />
                  <ControllerTextField name='fullname' control={control} />
               </Box>
            </Grid>
            <Grid item xs={6}>
               <Box mb={1}>
                  <FormLabel required title='Email' />
                  <ControllerTextField name='email' control={control} />
               </Box>
            </Grid>
            <Grid item xs={6}>
               <Box mb={1}>
                  <FormLabel required title='Số điện thoại' />
                  <ControllerTextField name='phone' control={control} />
               </Box>
            </Grid>
            <Grid item xs={12}>
               <Box mb={1}>
                  <FormLabel required title='Địa chỉ' />
                  <ControllerTextField name='address' control={control} />
               </Box>
            </Grid>
            <Grid item xs={12}>
               <Box mb={1}>
                  <FormLabel required title='Giới tính' />
                  <ControllerSelect options={gender} name='gender' control={control} />
               </Box>
            </Grid>
            <Grid item xs={6}>
               <Box mb={1}>
                  <FormLabel required title='Mật khẩu' />
                  <ControllerTextField type='password' name='password' control={control} />
               </Box>
            </Grid>
            <Grid item xs={6}>
               <Box mb={1}>
                  <FormLabel required title='Xác nhận mật khẩu' />
                  <ControllerTextField type='password' name='confirmPassword' control={control} />
               </Box>
            </Grid>
            <Grid item xs={12}>
               <LoadingButton
                  fullWidth
                  type='submit'
                  variant='contained'
                  loading={loading}
                  sx={({ palette }) => ({
                     backgroundColor: palette.education.text.black,
                     ':hover': {
                        backgroundColor: palette.education.text.black
                     }
                  })}>
                  Đăng ký
               </LoadingButton>
            </Grid>
         </Grid>
      </form>
   );
}

export default BaseFormRegister;
