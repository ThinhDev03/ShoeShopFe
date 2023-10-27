import useAuth from '@App/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

export default function PublicRouter({ children }) {
   const { isAuththentication, isInitialized } = useAuth();

   if (isAuththentication && isInitialized) {
      return <Navigate to='/' replace />;
   }
   return <Outlet /> || children;
}
