import { ROLE } from '@App/configs/role';
import useAuth from '@App/hooks/useAuth';
import cartService from '@App/services/cart.service';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ROUTE_PRIVATE = ['/shipping'];

export default function PrivateRouter({ children }) {
   const { isAuhthentication, isInitialized, userPermission, user } = useAuth();

   if (!isAuhthentication && isInitialized && userPermission !== ROLE[1]) {
      return <Navigate to='/sign-in' replace />;
   }

   return children;
}
