import React from 'react';
import { Box, Stack, styled } from '@mui/material';

import Inventory2SharpIcon from '@mui/icons-material/Inventory2Sharp';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import useAuth from '@App/hooks/useAuth';
import { ROLE } from '@App/configs/role';
import { NavLink } from 'react-router-dom';
import ChangeUserLogin from './ChangeUserLogin';
import { routerPath } from '@App/configs/routerConfig';

const headerListAction = [
   {
      id: 1,
      title: 'Danh sách đơn hàng',
      icon: Inventory2SharpIcon,
      href: 'bill'
   },
   {
      id: 5,
      icon: ShoppingCartIcon,
      title: 'Giỏ hàng',
      href: routerPath.CART
   }
];

function Nav() {
   const { isAuththentication } = useAuth();

   return (
      <FlexBox
         sx={{
            backgroundColor: '#303030',
            padding: '6px 60px 4px 2px'
         }}>
         {isAuththentication &&
            headerListAction.map((item) => {
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
                     to={item.href}>
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
            to={'/wishlist'}>
            <FavoriteIcon sx={{ width: '14px', height: '14px' }} />
            <Box component='span'>Danh sách yêu thích</Box>
         </Stack>
         <ChangeUserLogin />
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
