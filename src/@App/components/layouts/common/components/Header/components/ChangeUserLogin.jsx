import useAuth from '@App/hooks/useAuth';
import { Box, Stack, useMediaQuery } from '@mui/material';
import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { NavLink } from 'react-router-dom';
import UserMenu from './UserMenu';
import { ROLE } from '@App/configs/role';
function ChangeUserLogin() {
   const { isAuththentication, userPermission } = useAuth();
   return (
      <React.Fragment>
         <UserMenu />

         {isAuththentication && (userPermission === ROLE[1] || userPermission === ROLE[2]) && (
            <Stack
               sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 0.5,
                  fontSize: 14,
                  textDecoration: 'none',
                  color: { md: '#FFFFFF', xs: '#000' },
                  display: { md: 'block', xs: 'none' }
               }}
               component={NavLink}
               to={userPermission === ROLE[1] ? 'admin' : 'admin/home'}>
               <PersonIcon sx={{ width: '14px', height: '14px' }} />
               <Box component='span'>Trang Quản trị</Box>
            </Stack>
         )}
      </React.Fragment>
   );
}

export default React.memo(ChangeUserLogin);
