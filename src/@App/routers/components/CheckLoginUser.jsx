import useAuth from '@App/hooks/useAuth';
import { useCart } from '@App/redux/slices/cart.slice';
import { Box, Container, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const CheckLoginUser = ({ children }) => {
   const { isAuththentication } = useAuth();
   let location = useLocation();
   const navigate = useNavigate();
   const { cart } = useCart();

   useEffect(() => {
      const checkRedirectShipping = () => {
         if (location.pathname === '/shipping') {
            return cart.length >= 1 ? children : navigate('/cart');
         }
         return children;
      };

      if (isAuththentication) {
         checkRedirectShipping();
      }
   }, [cart, children, isAuththentication, location.pathname, navigate]);

   return isAuththentication ? (
      children || <Outlet />
   ) : (
      <Container maxWidth='lg'>
         <Typography variant='h2' sx={{ color: '#555555', textAlign: 'center' }}>
            Bạn chưa đăng nhập!!!
         </Typography>
         <Box component='h4' sx={{ color: '#555555', textAlign: 'center' }}>
            Vui lòng đăng nhập để xem thông các thông tin cần thiết.
         </Box>
      </Container>
   );
};

export default CheckLoginUser;
