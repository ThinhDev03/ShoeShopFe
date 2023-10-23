import { ROLE } from '@App/configs/role';
import useAuth from '@App/hooks/useAuth';
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRouter({ children }) {
   const { isAuhthentication, isInitialized, userPermission } = useAuth();
   if (!isAuhthentication && isInitialized && userPermission !== ROLE[1]) {
      return <Navigate to='/signin' replace />;
   }
   return children;
}
