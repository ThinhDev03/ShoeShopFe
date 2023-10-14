import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';
import FormLabel from '@Core/Components/FormControl/FormLabel';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Divider, Stack, Typography, styled } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schemaLogin = yup.object({
   userName: yup.string().required('Tài khoản đăng nhập không được để trống'),
   phone: yup.number().required('Số điện thoại không được để trống'),
   password: yup.string().required('Mật khẩu không được để trống'),
   passwordConfirm: yup.string().required('Mật khẩu không được để trống')
});

function Register() {
   const { handleSubmit, control } = useForm({
      resolver: yupResolver(schemaLogin)
   });

   const handleSubmitForm = (data) => {
      console.log(data);
   };

   return (
      <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
         <Box width={500}>
            <Typography variant='h5' textAlign='center' mb={2}>
               Đăng Ký
            </Typography>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
               <Box mb={2}>
                  <FormLabel required title='Tên đăng nhập' />
                  <ControllerTextField name='userName' control={control} />
               </Box>
               <Box mb={2}>
                  <FormLabel required title='Số điện thoại' />
                  <ControllerTextField name='phone' control={control} />
               </Box>
               <Box mb={2}>
                  <FormLabel required title='Mật khẩu' />
                  <ControllerTextField name='password' control={control} />
               </Box>
               <Box mb={2}>
                  <FormLabel required title='Nhập lại mật khẩu' />
                  <ControllerTextField name='passwordConfirm' control={control} />
               </Box>
               <LoadingButton
                  fullWidth
                  type='submit'
                  variant='contained'
                  sx={({ palette }) => ({
                     backgroundColor: palette.education.text.black,
                     ':hover': {
                        backgroundColor: palette.education.text.black
                     }
                  })}>
                  Đăng ký
               </LoadingButton>
            </form>
            <Typography component='p' textAlign='center' mt={2}>
               Bạn đã có tài khoản? Hãy{' '}
               <Box
                  component={Link}
                  to={'/login'}
                  sx={({ palette }) => ({
                     color: palette.education.text.main,
                     textDecoration: 'none',
                     '&:hover': {
                        textDecoration: 'revert'
                     }
                  })}>
                  đăng nhập
               </Box>
            </Typography>
         </Box>
      </Stack>
   );
}

const ButtonLoginSocial = styled(Button)(({ theme }) => ({
   border: '1px solid rgba(0, 0, 0, 0.26)',
   color: theme.palette.education.text.black,
   ':hover': {
      border: '1px solid rgba(0, 0, 0, 0.26)',
      backgroundColor: 'transparent',
      color: theme.palette.education.text.black
   }
}));

export default Register;
