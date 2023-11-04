import { ROLE } from '@App/configs/role';
import useAuth from '@App/hooks/useAuth';
import cartService from '@App/services/cart.service';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ROUTE_PRIVATE = ['/shipping'];

export default function PrivateRouter({ children }) {
   // const location = useLocation();
   // const currentPathname = location.pathname;
   const { isAuhthentication, isInitialized, userPermission, user } = useAuth();

   if (!isAuhthentication && isInitialized && userPermission !== ROLE[1]) {
      return <Navigate to='/signin' replace />;
   }

   // if (ROUTE_PRIVATE.includes(currentPathname)) {
   //    const { data: carts } = useQuery(['getCart'], async () => await cartService.getCart(user._id));
   //    if (carts && carts?.data?.length > 0) {
   //       return children;
   //    }

   //    return <Navigate to='/' replace />;
   // }

   return children;
}
