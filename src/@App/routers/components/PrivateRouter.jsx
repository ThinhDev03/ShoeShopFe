import useAuth from '@App/hooks/useAuth';
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRouter({ children }) {
   const { isAuththentication, isInitialized } = useAuth();
   if (!isAuththentication && isInitialized) {
      return <Navigate to='/sign-in' replace />;
   }

   return children;
}
