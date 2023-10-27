import { Stack } from '@mui/system';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './components/footer';
import Sidebar from './components/sidebar';
import Header from './components/header';

export default function AdminLayout() {
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
   marginTop: theme.palette.education.header.heightAdmin
}));
const Main = styled('main')(({ theme }) => ({
   flex: 1,
   display: 'flex',
   flexDirection: 'column',
   boxSizing: 'border-box',
   backgroundColor: theme.palette.background.default,
   minHeight: `calc(100vh - ${theme.palette.education.header.heightAdmin}px)`,
   maxWidth: `calc(100% - ${theme.palette.education.sidebar.width}px)`,
   [theme.breakpoints.down('lg')]: {
      padding: '10px',
      margin: '10px',
      minHeight: `calc(100vh - ${theme.palette.education.header.heightAdmin + 20}px)`
   }
}));
