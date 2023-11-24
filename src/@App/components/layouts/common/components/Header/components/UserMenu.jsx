import { Avatar, Box, Menu, MenuItem, ListItemIcon, Divider, Stack } from '@mui/material';
import { Logout, Settings } from '@mui/icons-material';
import { Link, NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import useAuth from '@App/hooks/useAuth';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import { useConfirm } from '@Core/Components/Confirm/CoreConfirm';
import { routerPath } from '@App/configs/routerConfig';

function UserMenu() {
   const { user, isAuththentication, logout } = useAuth();
   const confirm = useConfirm();
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);

   const handleOptionClick = (option) => {
      const selected = option.currentTarget.outerText;

      switch (selected) {
         case 'logout':
            handleLogout;
            break;
         default:
            break;
      }
      handleClose();
   };

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   const handleLogout = async () => {
      handleClose();
      confirm({ title: 'Đăng xuất', content: 'Bạn có chắc muốn đăng xuất?', okText: 'Đăng xuất', onOk: logout });
   };

   return (
      <React.Fragment>
         {!isAuththentication ? (
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
               to='sign-in'>
               <LoginIcon sx={{ width: '14px', height: '14px' }} />
               <Box component='span'>{isAuththentication ? user.username : 'Đăng nhập'}</Box>
            </Stack>
         ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
               <Stack
                  sx={{
                     flexDirection: 'row',
                     alignItems: 'center',
                     gap: 0.5,
                     color: '#FFFFFF',
                     fontSize: 14,
                     textDecoration: 'none'
                  }}
                  onClick={handleClick}>
                  <PersonIcon sx={{ width: '14px', height: '14px' }} />
                  <Box component='span'>{user.username}</Box>
               </Stack>
               <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={PaperProps}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  getContentAnchorEl={null}>
                  <MenuItem key={'Profile'} component={Link} to={routerPath.PROFILE} onClick={handleClose}>
                     <Avatar /> Trang cá nhân
                  </MenuItem>
                  <Divider />
                  <MenuItem
                     key={'change-password'}
                     component={Link}
                     to={routerPath.CHANGE_PASSWORD}
                     onClick={handleClose}>
                     Đổi mật khẩu
                  </MenuItem>
                  <Divider />
                  <MenuItem key={'Logout'} onClick={handleLogout}>
                     <ListItemIcon>
                        <Logout fontSize='small' />
                     </ListItemIcon>
                     Đăng xuất
                  </MenuItem>
               </Menu>
            </Box>
         )}
      </React.Fragment>
   );
}

const PaperProps = {
   elevation: 0,
   sx: {
      overflow: 'visible',
      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
      mt: 1.5,
      '& .MuiAvatar-root': {
         width: 32,
         height: 32,
         ml: -0.5,
         mr: 1
      },
      '&:before': {
         content: '""',
         display: 'block',
         position: 'absolute',
         top: 0,
         right: 14,
         width: 10,
         height: 10,
         bgcolor: 'background.paper',
         transform: 'translateY(-50%) rotate(45deg)',
         zIndex: 0
      }
   }
};

export default UserMenu;
