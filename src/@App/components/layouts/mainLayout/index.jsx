import { Stack } from '@mui/system';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';

export default function MainLayout() {
   const [openSidebar, setOpenSidebar] = useState(false);
   const props = {
      openSidebar,
      setOpenSidebar
   };
   return (
      <>
         <Header {...props} />
         <Flex direction='row'>
            <Sidebar {...props} />
            <Main>
               <Outlet />
               <Footer />
            </Main>
         </Flex>
      </>
   );
}

const Flex = styled(Stack)(({ theme }) => ({
   marginTop: theme.palette.education.header.height
}));
const Main = styled('main')(({ theme }) => ({
   flex: 1,
   display: 'flex',
   flexDirection: 'column',
   boxSizing: 'border-box',
   backgroundColor: theme.palette.background.default,
   minHeight: `calc(100vh - ${theme.palette.education.header.height}px)`,
   [theme.breakpoints.down('lg')]: {
      // padding: '10px',
      // margin: '10px',
      // minHeight: `calc(100vh - ${theme.palette.education.header.height + 20}px)`
   }
}));
