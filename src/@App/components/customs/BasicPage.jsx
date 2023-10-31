import { Box, Button, Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import BreadCrumbs from './@mui/BreadCrumbs';
import { Link } from 'react-router-dom';

export default function BasicPage({ currentPage, breadcrumbs, createTitle = '', children }) {
   return (
      <>
         <Box sx={{ display: 'flex', justifyContent: createTitle ? 'space-between' : 'start' }}>
            <BreadCrumbs sx={{ m: 3, mb: 0 }} currentPage={currentPage} breadcrumbs={breadcrumbs} />
            {createTitle && (
               <Box display='flex' alignItems='flex-end' mr={3}>
                  <Button color='secondary' component={Link} to='create'>
                     {createTitle}
                  </Button>
               </Box>
            )}
         </Box>
         <Paper elevation={2} sx={{ flex: 1, m: 3, p: 3, display: 'flex', flexDirection: 'column' }}>
            {children}
         </Paper>
      </>
   );
}
BasicPage.defaultProps = {
   breadcrumbs: [
      {
         name: 'Trang chủ',
         link: '/'
      }
   ]
};

BasicPage.propTypes = {
   children: PropTypes.node.isRequired,
   currentPage: PropTypes.string,
   createTitle: PropTypes.string,
   breadcrumbs: PropTypes.arrayOf(
      PropTypes.shape({
         link: PropTypes.string,
         name: PropTypes.string
      })
   )
};
