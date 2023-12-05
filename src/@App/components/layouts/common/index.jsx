import { Stack } from '@mui/system';
import { styled } from '@mui/material/styles';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Box } from '@mui/material';
export default function CommonLayout() {
   return (
      <>
         <Header />
         <Main>
            <Outlet />
         </Main>
         <Footer />
      </>
   );
}

const Main = styled(Box)(({ theme }) => ({
   flex: 1,
   display: 'flex',
   flexDirection: 'column',
   boxSizing: 'border-box',
   paddingBottom: '48px',
   // backgroundColor: theme.palette.background.default,
   // backgroundColor: '#F8F9FA',
   marginTop: theme.palette.education.header.height,
   paddingTop: 12,
   minHeight: `calc(100vh - ${theme.palette.education.header.height}px)`
   // [theme.breakpoints.down('lg')]: {
   //    // padding: '10px',
   //    // margin: '10px',
   //    // minHeight: `calc(100vh - ${theme.palette.education.header.height + 20}px)`
   // }
}));
