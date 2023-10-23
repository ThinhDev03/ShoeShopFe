import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Badge, IconButton, Box, Menu, MenuItem, ListItemIcon, Divider } from '@mui/material';
import { Stack } from '@mui/system';
import { Logout, Settings } from '@mui/icons-material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import useAuth from '@App/hooks/useAuth';
import { useConfirm } from '@Core/Components/Confirm/CoreConfirm';
import { useState } from 'react';

export default function Header(props) {
   const { setOpenSidebar } = props;
   const { user, logout } = useAuth();
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

   const confirm = useConfirm();
   const handleLogout = async () => {
      confirm({ title: 'Đăng xuất', content: 'Bạn có chắc muốn đăng xuất?', okText: 'Đăng xuất', onOk: logout });
   };
   return (
      <WrapHeader>
         <Stack justifyContent='space-between' direction='row' height='100%' alignItems='center'>
            <Stack direction='row' alignItems='center' gap={4}>
               <MenuButton onClick={() => setOpenSidebar(true)}>
                  <MenuIcon sx={{ width: '100%' }} />
               </MenuButton>
               <Stack alignItems='center' direction='row'>
                  <Box sx={{ width: '245px', height: '100px', m: '0 auto' }}>
                     <LogoImage src='' alt='' />
                  </Box>
               </Stack>
            </Stack>
            <Stack direction='row' gap={2} alignItems='center'>
               <IconButton>
                  <Badge badgeContent={4} color='primary'>
                     <NotificationsIcon sx={{ width: '24px' }} color='action' />
                  </Badge>
               </IconButton>
               <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ width: 32, height: 32 }} alt='Avatar' src={user?.picture} onClick={handleClick} />
                  <Menu
                     anchorEl={anchorEl}
                     open={open}
                     onClose={handleClose}
                     PaperProps={PaperProps}
                     anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                     transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                     getContentAnchorEl={null}>
                     <MenuItem key={'Profile'} onClick={handleClose}>
                        <Avatar /> Profile
                     </MenuItem>
                     <Divider />
                     <MenuItem key={'Settings'} onClick={handleOptionClick}>
                        <ListItemIcon>
                           <Settings fontSize='small' />
                        </ListItemIcon>
                        Settings
                     </MenuItem>
                     <MenuItem key={'Logout'} onClick={handleLogout}>
                        <ListItemIcon>
                           <Logout fontSize='small' />
                        </ListItemIcon>
                        Logout
                     </MenuItem>
                  </Menu>
               </Box>
            </Stack>
         </Stack>
      </WrapHeader>
   );
}
const WrapHeader = styled('nav')(({ theme }) => ({
   boxSizing: 'border-box',
   width: '100%',
   position: 'fixed',
   height: theme.palette.education.header.heightAdmin,
   top: 0,
   left: 0,
   backgroundColor: '#fff',
   borderBottom: '1px solid rgba(162, 162, 162, 0.4)',
   paddingRight: theme.spacing(2),
   paddingLeft: theme.spacing(2),
   zIndex: 600
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
   cursor: 'pointer',
   color: '#0c0c0c',
   [theme.breakpoints.up('lg')]: {
      display: 'none'
   }
}));

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

const LogoImage = styled('img')(({ theme }) => ({
   width: '100%'
}));
