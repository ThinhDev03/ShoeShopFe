import { Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import BreadCrumbs from './@mui/BreadCrumbs';

export default function BasicPage({ currentPage, breadcrumbs, children }) {
   return (
      <>
         <BreadCrumbs sx={{ m: 3, mb: 0 }} currentPage={currentPage} breadcrumbs={breadcrumbs} />
         <Paper elevation={2} sx={{ height: '100%', flex: 1, m: 3, p: 3 }}>
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
   breadcrumbs: PropTypes.arrayOf(
      PropTypes.shape({
         link: PropTypes.string,
         name: PropTypes.string
      })
   )
};
