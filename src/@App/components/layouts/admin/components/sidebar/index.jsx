import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import SidebarItem from './SidebarItem';
import { Drawer } from '@mui/material';
import { styled } from '@mui/material/styles';

export default function Sidebar({ openSidebar, setOpenSidebar }) {
   const theme = useTheme();
   const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

   return (
      <>
         {lgUp && (
            <Wrap>
               <Aside>
                  <SidebarItem />
               </Aside>
            </Wrap>
         )}
         {!lgUp && (
            <Drawer anchor='left' open={openSidebar} onClose={() => setOpenSidebar(false)}>
               <SidebarItem setOpenSidebar={setOpenSidebar} />
            </Drawer>
         )}
      </>
   );
}

const Wrap = styled('div')(({ theme }) => ({
   boxSizing: 'border-box',
   width: theme.palette.education.sidebar.width
}));

const Aside = styled('aside')(({ theme }) => ({
   position: 'fixed',
   top: theme.palette.education.header.heightAdmin,
   width: theme.palette.education.sidebar.width,
   left: 0,
   zIndex: 600
}));
