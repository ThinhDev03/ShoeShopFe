// import { getCurrentUser } from '@App/redux/slices/auth.slice';
import useAuth from '@App/hooks/useAuth';
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export default function GetCurrentUser() {
   const { getUser, isAuthenticated } = useAuth();
   if (!isAuthenticated) {
      return <Navigate to='/signin' replace />;
   }
   useEffect(() => {
      getUser();
   }, []);
   return <div>GetCurrentUser</div>;
}
