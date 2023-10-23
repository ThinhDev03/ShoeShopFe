import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';
import FormLabel from '@Core/Components/FormControl/FormLabel';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Divider, Stack, Typography, styled } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import authService from '@App/services/auth.service';
import { errorMessage, successMessage } from '@Core/Helper/Message';
import useAuth from '@App/hooks/useAuth';
import useLocalStorage from '@App/hooks/useLocalStorage';

const schemaLogin = yup.object({
   username: yup.string().required('Tài khoản đăng nhập không được để trống'),
   password: yup.string().required('Mật khẩu không được để trống')
});

function Signin() {
   const [loading, setLoading] = useState(false);
   const { authLogin } = useAuth();
   const {} = useLocalStorage();
   const { handleSubmit, control } = useForm({
      resolver: yupResolver(schemaLogin)
   });

   const handleSubmitForm = async (data) => {
      setLoading(true);
      try {
         const rest = await authService.login(data);
         authLogin(rest.user);
         localStorage.setItem('token', rest.token);
         successMessage('Đăng nhập thành công!');
      } catch (error) {
         errorMessage('Đăng nhập thất bại!');
      }
      setLoading(false);
   };

   return (
      <Stack sx={{ justifyContent: 'center', alignItems: 'center', py: 3 }}>
         <Box width={500}>
            <Typography variant='h5' textAlign='center' mb={4}>
               Đăng nhập
            </Typography>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
               <Box mb={2}>
                  <FormLabel required title='Tên đăng nhập' />
                  <ControllerTextField name='username' control={control} />
               </Box>
               <Box mb={2}>
                  <FormLabel required title='Mật khẩu' />
                  <ControllerTextField name='password' control={control} />
               </Box>
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
                  Đăng nhập
               </LoadingButton>
            </form>
            <Divider sx={{ my: 2, opacity: 0.5, fontWeight: 'medium' }}>Hoặc</Divider>
            <Stack flexDirection='row' gap={2}>
               <ButtonLoginSocial fullWidth variant='outlined' startIcon={<FacebookIcon sx={{ color: '#1877f2' }} />}>
                  Facebook
               </ButtonLoginSocial>
               <ButtonLoginSocial fullWidth variant='outlined' startIcon={<GoogleIcon sx={{ color: '#1877f2' }} />}>
                  Google
               </ButtonLoginSocial>
            </Stack>
            <Typography component='p' textAlign='center' mt={2}>
               Bạn không có tài khoản? Hãy{' '}
               <Box
                  component={Link}
                  to={'/register'}
                  sx={({ palette }) => ({
                     color: palette.education.text.main,
                     textDecoration: 'none',
                     '&:hover': {
                        textDecoration: 'revert'
                     }
                  })}>
                  đăng ký
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

export default Signin;
