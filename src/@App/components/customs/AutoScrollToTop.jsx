import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function AutoScrollToTop() {
   const pathName = useLocation();
   useEffect(() => {
      window.scroll({
         behavior: 'smooth',
         top: 0
      });
   }, [pathName.pathname]);
   return <></>;
}

export default AutoScrollToTop;
