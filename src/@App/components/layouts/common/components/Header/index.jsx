import { Link, NavLink } from 'react-router-dom';
import {
   Box,
   Divider,
   Drawer,
   Grid,
   IconButton,
   List,
   ListItem,
   ListItemButton,
   ListItemText,
   Stack,
   styled
} from '@mui/material';
import Nav from './components/Nav';
import logo from '../../../../../assets/svg/logo.svg';
import discoveryou from '../../../../../assets/svg/discoveryou.svg';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Inventory2SharpIcon from '@mui/icons-material/Inventory2Sharp';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import useAuth from '@App/hooks/useAuth';
import { routerPath } from '@App/configs/routerConfig';
import ChangeUserLogin from './components/ChangeUserLogin';

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
const headerMenubar = [
   {
      title: 'Trang chủ',
      path: '/'
   },
   {
      title: 'Sản phẩm',
      path: '/products'
   },
   // {
   //    title: 'Nữ',
   //    path: '/products'
   // },
   {
      title: 'SALE OFF',
      path: '/sale'
   }
];

export default function Header() {
   const [openSidebar, setOpenSidebar] = useState(false);
   const { isAuththentication } = useAuth();
   return (
      <>
         <NavHeader>
            <Nav />
            <Grid container margin={0}>
               <Grid item xs={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }} component={Link} to='/'>
                     <img src={logo} alt='' width='39.997px' height='52.92px' />
                  </Box>
               </Grid>
               <Grid item xs={8}>
                  <Box
                     sx={{
                        display: 'flex',
                        gap: 3,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%'
                     }}>
                     {headerMenubar.map((item, index) => {
                        return (
                           <Box
                              key={index}
                              component={NavLink}
                              to={item.path}
                              sx={({ palette }) => ({
                                 padding: '20px',
                                 fontSize: '21px',
                                 fontWeight: 600,
                                 lineHeight: '20px',
                                 textDecoration: 'none',
                                 textTransform: 'uppercase',
                                 color: palette.education.text.black,
                                 ':hover': {
                                    color: palette.primary.main
                                 },
                                 '&.active': {
                                    color: palette.primary.main
                                 }
                              })}
                              // onMouseOver={() => console.log('hover menu')}
                           >
                              {item.title}
                           </Box>
                        );
                     })}
                     <Link to='/latest'>
                        <img src={discoveryou} alt='' />
                     </Link>
                  </Box>
               </Grid>

               {/* <Box>
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
               </Box> */}
               {/* </FlexBox> */}
            </Grid>
            <FlexBox
               sx={{
                  padding: '8px 0px 6px 0px',
                  backgroundColor: '#F1F1F1',
                  justifyContent: 'center',
                  fontSize: '12px'
               }}>
               BUY 2 GET 10% OFF - ÁP DỤNG VỚI TẤT CẢ BASIC TEE
            </FlexBox>
         </NavHeader>

         <NavMobile>
            <Stack direction='row' justifyContent='space-between' px={3} align='center'>
               <Stack align='center' justifyContent='center'>
                  <IconButton onClick={() => setOpenSidebar(true)}>
                     <MenuIcon />
                  </IconButton>
               </Stack>
               <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }} component={Link} to='/'>
                  <ChangeUserLogin />
               </Box>
            </Stack>
         </NavMobile>
         <Drawer anchor='left' open={openSidebar} onClose={() => setOpenSidebar(false)}>
            <Box width={280}>
               <List>
                  {headerMenubar.map((item, index) => (
                     <ListItem
                        onClick={() => setOpenSidebar(false)}
                        component={NavLink}
                        to={item.path}
                        key={item.path}
                        sx={{ display: 'block', color: '#242424' }}
                        disablePadding>
                        <ListItemButton>
                           <ListItemText primary={item.title} />
                        </ListItemButton>
                     </ListItem>
                  ))}
               </List>
               <Divider />
               <List>
                  {isAuththentication &&
                     headerListAction.map((item) => {
                        return (
                           <ListItem
                              onClick={() => setOpenSidebar(false)}
                              key={item.id}
                              sx={{
                                 color: '#242424',
                                 textDecoration: 'none',
                                 display: 'block',
                                 padding: 0
                              }}
                              component={NavLink}
                              to={item.href}>
                              <ListItemButton>
                                 <ListItemText primary={item.title} />
                              </ListItemButton>
                           </ListItem>
                        );
                     })}
                  <ListItem
                     onClick={() => setOpenSidebar(false)}
                     sx={{
                        color: '#242424',
                        textDecoration: 'none',
                        display: 'block',
                        padding: 0
                     }}
                     component={NavLink}
                     to={'/wishlist'}>
                     <ListItemButton>
                        <ListItemText primary={'Danh sách yêu thích'} />
                     </ListItemButton>
                  </ListItem>
                  {isAuththentication && (
                     <ListItem
                        onClick={() => setOpenSidebar(false)}
                        sx={{
                           color: '#242424',
                           textDecoration: 'none',
                           display: 'block',
                           padding: 0
                        }}
                        component={NavLink}
                        to={'/admin'}>
                        <ListItemButton>
                           <ListItemText primary={'Trang quản trị'} />
                        </ListItemButton>
                     </ListItem>
                  )}
               </List>
            </Box>
         </Drawer>
      </>
   );
}

const NavHeader = styled(Box)(({ theme }) => ({
   position: 'fixed',
   top: 0,
   left: 0,
   right: 0,
   width: '100%',
   // height: theme.palette.education.header.height,
   boxShadow: '0px 1px 1px 0px rgb(0 0 0 / 8%)',
   backgroundColor: '#FFFFFF',
   zIndex: theme.palette.education.header.zIndex,
   [theme.breakpoints.down('md')]: {
      display: 'none'
   }
}));

const NavMobile = styled(Box)(({ theme }) => ({
   position: 'fixed',
   top: 0,
   left: 0,
   right: 0,
   width: '100%',
   // height: theme.palette.education.header.height,
   boxShadow: '0px 1px 1px 0px rgb(0 0 0 / 8%)',
   backgroundColor: '#FFFFFF',
   zIndex: theme.palette.education.header.zIndex,
   [theme.breakpoints.up('md')]: {
      display: 'none'
   }
}));

const FlexBox = styled(Stack)(({ theme }) => ({
   flexDirection: 'row',
   justifyContent: 'end',
   alignItems: 'center',
   gap: 24
}));
