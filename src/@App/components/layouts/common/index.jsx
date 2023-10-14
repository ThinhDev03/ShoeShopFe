import { Stack } from '@mui/system';
import { styled } from '@mui/material/styles';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from '@mui/material';

export default function CommonLayout() {
   return (
      <>
         <Header />
         <Main maxWidth='lg'>
            <Outlet />
         </Main>
         <Footer />
      </>
   );
}

const Flex = styled(Stack)(({ theme }) => ({
   marginTop: theme.palette.education.header.height
}));
const Main = styled(Container)(({ theme }) => ({
   flex: 1,
   display: 'flex',
   flexDirection: 'column',
   boxSizing: 'border-box',
   paddingBottom: '48px',
   // backgroundColor: theme.palette.background.default,
   marginTop: theme.palette.education.header.height,
   minHeight: `calc(100vh - ${theme.palette.education.header.height}px)`
   // [theme.breakpoints.down('lg')]: {
   //    // padding: '10px',
   //    // margin: '10px',
   //    // minHeight: `calc(100vh - ${theme.palette.education.header.height + 20}px)`
   // }
}));
