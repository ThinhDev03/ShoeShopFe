import { Box, Button, Container, Stack, Typography, styled } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import BaseFormRegister from './component/BaseFormRegister';
import schemaRegister from './utils/yupRegister';

function Register() {
   const form = useForm({
      resolver: yupResolver(schemaRegister)
   });

   return (
      <Container maxWidth='lg' sx={{ py: 3 }}>
         <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <Box width={500}>
               <Typography variant='h5' textAlign='center' mb={2}>
                  Đăng Ký
               </Typography>
               <BaseFormRegister form={form} />
               <Typography component='p' textAlign='center' mt={2}>
                  Bạn đã có tài khoản? Hãy
                  <Box
                     component={Link}
                     to={'/signin'}
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
      </Container>
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
