import { Box, Container, Grid, InputAdornment, Stack, TextField, styled } from '@mui/material';
import Inventory2SharpIcon from '@mui/icons-material/Inventory2Sharp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, NavLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

import logo from '../../../../../assets/svg/logo.svg';
import discoveryou from '../../../../../assets/svg/discoveryou.svg';

const headerListAction = [
   {
      id: 1,
      title: 'Tra cứu đơn hàng',
      icon: Inventory2SharpIcon
   },
   {
      id: 2,
      icon: FavoriteIcon,
      title: 'Tìm cửa hàng'
   },
   {
      id: 3,
      icon: FavoriteIcon,
      title: 'Yêu thích'
   },
   {
      id: 4,
      icon: PersonIcon,
      title: 'Đăng nhập'
   },
   {
      id: 5,
      icon: ShoppingCartIcon,
      title: 'Giỏ hàng'
   }
];

const headerMenubar = [
   {
      title: 'Trang chủ',
      path: '/'
   },
   {
      title: 'Nam',
      path: '/products/nam'
   },
   {
      title: 'Nữ',
      path: '/products/nu'
   },
   {
      title: 'SALE OFF',
      path: '/products/nu'
   }
];

export default function Header() {
   return (
      <NavHeader>
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
         </FlexBox>
         <FlexBox sx={{ justifyContent: 'space-around', mt: 1, px: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }} component={Link} to='/'>
               <img src={logo} alt='' width='49.997px' height='86.92px' />
            </Box>
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
               {headerMenubar.map((item, index) => {
                  return (
                     <Box
                        key={index}
                        component={NavLink}
                        to={item.path}
                        sx={{
                           padding: '20px',
                           fontSize: '21px',
                           fontWeight: 600,
                           lineHeight: '20px',
                           textDecoration: 'none',
                           textTransform: 'uppercase',
                           color: '#000',
                           ':hover': {
                              color: '#f15e2c'
                           }
                        }}
                        onMouseOver={() => console.log('hover menu')}>
                        {item.title}
                     </Box>
                  );
               })}
               <NavLink>
                  <img src={discoveryou} alt='' />
               </NavLink>
            </Box>
            <Box>
               <TextField
                  id='input-with-icon-textfield'
                  variant='outlined'
                  placeholder='Tìm kiếm'
                  InputProps={{
                     startAdornment: (
                        <InputAdornment position='start'>
                           <SearchIcon />
                        </InputAdornment>
                     )
                  }}
               />
            </Box>
         </FlexBox>
         <FlexBox sx={{ padding: '14px 0px 13px 0px', backgroundColor: '#F1F1F1', justifyContent: 'center' }}>
            BUY 2 GET 10% OFF - ÁP DỤNG VỚI TẤT CẢ BASIC TEE
         </FlexBox>
      </NavHeader>
   );
}

const NavHeader = styled('nav')(({ theme }) => ({
   position: 'fixed',
   top: 0,
   left: 0,
   right: 0,
   width: '100%',
   height: theme.palette.education.header.height,
   backgroundColor: '#FFFFFF',
   zIndex: theme.palette.education.header.zIndex
}));

const FlexBox = styled(Stack)(({ theme }) => ({
   flexDirection: 'row',
   justifyContent: 'end',
   alignItems: 'center',
   gap: 24
}));
