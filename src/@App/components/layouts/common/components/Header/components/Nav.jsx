import React from 'react';
import { Box, Stack, styled } from '@mui/material';

import Inventory2SharpIcon from '@mui/icons-material/Inventory2Sharp';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import useAuth from '@App/hooks/useAuth';
import { ROLE } from '@App/configs/role';
import { NavLink } from 'react-router-dom';
import ChangeUserLogin from './ChangeUserLogin';

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
