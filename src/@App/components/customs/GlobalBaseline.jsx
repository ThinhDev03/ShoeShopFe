import GlobalStyles from '@mui/material/GlobalStyles';
import { memo } from 'react';

const GlobalBaseline = () => {
   return (
      <GlobalStyles
         styles={{
            'html, body, #root': {
               boxSizing: 'border-box'
            },
            '#nprogress': {
               pointerEvents: 'none'
            },
            '#nprogress .bar': {
               backgroundColor: '#00AB55',
               position: 'fixed',
               zIndex: 1998,
               top: 0,
               left: 0,
               width: '100%',
               height: 3
            }
         }}
      />
   );
};

export default memo(GlobalBaseline);
