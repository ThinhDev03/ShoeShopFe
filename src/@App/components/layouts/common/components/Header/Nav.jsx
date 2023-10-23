import React from 'react';
import { Box, Stack, styled } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import Inventory2SharpIcon from '@mui/icons-material/Inventory2Sharp';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import useAuth from '@App/hooks/useAuth';
import { ROLE } from '@App/configs/role';
import { NavLink } from 'react-router-dom';

const headerListAction = [
   {
      id: 1,
      title: 'Tra cứu đơn hàng',
      icon: Inventory2SharpIcon
   },
   {
      id: 5,
      icon: ShoppingCartIcon,
      title: 'Giỏ hàng'
   }
];

function Nav() {
   const { user, isAuththentication, userPermission } = useAuth();
   return (
      <FlexBox
         sx={{
            backgroundColor: '#303030',
            padding: '6px 60px 4px 2px'
         }}>
         {headerListAction.map((item) => {
            const CompIcon = item.icon;

            return (
               <Stack
                  key={item.id}
                  sx={{
                     flexDirection: 'row',
                     alignItems: 'center',
                     gap: 0.5,
                     color: '#FFFFFF',
                     fontSize: 14,
                     textDecoration: 'none'
                  }}
                  component={NavLink}
                  to=''>
                  <CompIcon sx={{ width: '14px', height: '14px' }} />
                  <Box component='span'>{item.title}</Box>
               </Stack>
            );
         })}
         <Stack
            sx={{
               flexDirection: 'row',
               alignItems: 'center',
               gap: 0.5,
               color: '#FFFFFF',
               fontSize: 14,
               textDecoration: 'none'
            }}
            component={NavLink}
            to=''>
            {isAuththentication ? (
               <PersonIcon sx={{ width: '14px', height: '14px' }} />
            ) : (
               <LoginIcon sx={{ width: '14px', height: '14px' }} />
            )}
            <Box component='span'>{isAuththentication ? user.username : 'Đăng nhập'}</Box>
         </Stack>
         {isAuththentication && userPermission === ROLE[2] && (
            <Stack
               sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 0.5,
                  color: '#FFFFFF',
                  fontSize: 14,
                  textDecoration: 'none'
               }}
               component={NavLink}
               to='admin'>
               <PersonIcon sx={{ width: '14px', height: '14px' }} />

               <Box component='span'>Trang Quản trị</Box>
            </Stack>
         )}
      </FlexBox>
   );
}

const FlexBox = styled(Stack)(({ theme }) => ({
   flexDirection: 'row',
   justifyContent: 'end',
   alignItems: 'center',
   gap: 24
}));

export default React.memo(Nav);
