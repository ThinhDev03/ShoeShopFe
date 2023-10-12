import { LinearProgress, Typography, Box } from '@mui/material';
import NProgress from 'nprogress';
import { useEffect } from 'react';

export default function LazyLoadingFullScreen() {
   NProgress.configure({ showSpinner: false });
   useEffect(() => {
      NProgress.start();
      return () => {
         NProgress.done();
      };
   }, []);
   return (
      <Box sx={{ width: '100vw', height: '100vh' }}>
         <Box sx={{ display: 'flex', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ width: '400px' }}>
               <Typography textAlign='center' marginBottom={1}>
                  Loading
               </Typography>
               <LinearProgress color='primary' />
            </Box>
         </Box>
      </Box>
   );
}
