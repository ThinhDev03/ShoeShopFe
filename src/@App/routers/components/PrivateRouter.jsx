import useAuth from '@App/hooks/useAuth';
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRouter({ children }) {
   const { isAuhthentication, isInitialized } = useAuth();
   if (!isAuhthentication && isInitialized) {
      return <Navigate to='/signin' replace />;
   }
   return children;
}
