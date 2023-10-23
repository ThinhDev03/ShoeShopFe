import authService from '@App/services/auth.service';
import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';
import FormLabel from '@Core/Components/FormControl/FormLabel';
import { errorMessage, successMessage } from '@Core/Helper/Message';
import { LoadingButton } from '@mui/lab';
import { Box, Grid } from '@mui/material';
import React, { useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';

function BaseFormRegister({ form }) {
   const { handleSubmit, control } = form;
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const handleSubmitForm = async (data) => {
      setLoading(true);
      try {
         await authService.register(data);
         successMessage('Đăng ký thành công!');
         navigate('/signin');
      } catch (error) {
         setLoading(false);
         errorMessage(error);
      }
   };

   return (
      <form onSubmit={handleSubmit(handleSubmitForm)}>
         <Grid container spacing={2}>
            <Grid item xs={6}>
               <Box mb={2}>
                  <FormLabel required title='UserName' />
                  <ControllerTextField name='username' control={control} />
               </Box>
            </Grid>
            <Grid item xs={6}>
               <Box mb={2}>
                  <FormLabel required title='FullName' />
                  <ControllerTextField name='fullname' control={control} />
               </Box>
            </Grid>
            <Grid item xs={6}>
               <Box mb={2}>
                  <FormLabel required title='Email' />
                  <ControllerTextField name='email' control={control} />
               </Box>
            </Grid>
            <Grid item xs={6}>
               <Box mb={2}>
                  <FormLabel required title='Phone Number' />
                  <ControllerTextField name='phone' control={control} />
               </Box>
            </Grid>
            <Grid item xs={12}>
               <Box mb={2}>
                  <FormLabel required title='Address' />
                  <ControllerTextField name='address' control={control} />
               </Box>
            </Grid>
            <Grid item xs={12}>
               <Box mb={2}>
                  <FormLabel required title='Password' />
                  <ControllerTextField name='password' control={control} />
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
