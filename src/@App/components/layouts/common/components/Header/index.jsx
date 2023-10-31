import { Link, NavLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Grid, InputAdornment, Stack, TextField, styled } from '@mui/material';

import Nav from './components/Nav';
import logo from '../../../../../assets/svg/logo.svg';
import discoveryou from '../../../../../assets/svg/discoveryou.svg';

const headerMenubar = [
   {
      title: 'Trang chủ',
      path: '/'
   },
   {
      title: 'Nam',
      path: '/products'
   },
   // {
   //    title: 'Nữ',
   //    path: '/products'
   // },
   {
      title: 'SALE OFF',
      path: '/products'
   }
];

export default function Header() {
   return (
      <NavHeader>
         <Nav />
         <Grid container spacing={2} margin={0}>
            <Grid item xs={2}>
               <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }} component={Link} to='/'>
                  <img src={logo} alt='' width='39.997px' height='66.92px' />
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
                              }
                           })}
                           onMouseOver={() => console.log('hover menu')}>
                           {item.title}
                        </Box>
                     );
                  })}
                  <Link to=''>
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
