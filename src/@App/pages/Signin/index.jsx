import { useTheme } from '@emotion/react';
import { Box, Stack, Typography, styled } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';

const Signin = () => {
   const theme = useTheme();

   return (
      <FullScreenBackground>
         <Box
            sx={{
               maxWidth: '100%',
               width: '500px',
               padding: 3,
               backgroundColor: '#fff',
               borderRadius: 2,
               boxShadow: '0 0 24px #cbd5e1',
               position: 'relative'
            }}
            elevation={2}>
            <Stack direction='column' justifyContent='center' alignItems='center' gap={0}>
               <LogoImg
                  component='img'
                  alt=''
                  sx={{ maxWidth: '384px', objectFit: 'contain', margin: '0px auto 48px auto' }}
               />

               <Typography
                  variant='h6'
                  fontSize='18px !important'
                  marginBottom={0.5}
                  fontWeight={500}
                  color={theme.typography.color}>
                  Đăng nhập với tài khoản Google
               </Typography>

               <Box textAlign='center' display='flex' justifyContent='center' alignItems='center'></Box>
            </Stack>
         </Box>
         <Typography
            textAlign='center'
            sx={{
               textAlign: 'center',
               position: 'absolute',
               bottom: '16px',
               color: '#64748b'
            }}>
            @ {new Date().getFullYear()} Bot Xuyen primary school education. All rights reserved.
         </Typography>
      </FullScreenBackground>
   );
};

const LogoImg = styled(Box)(({ theme }) => ({
   maxWidth: '100%',
   margin: '0 auto',
   objectFit: 'cover'
}));

const FullScreenBackground = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   width: '100vw',
   height: '100vh',
   backgroundColor: theme.palette.background.default,
   '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',
      zIndex: -1,
      opacity: 0.1
   }
}));

export default Signin;
