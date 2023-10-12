import useAuth from '@App/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

export default function PublicRouter({ children }) {
   const { isAuhthentication } = useAuth();
   if (isAuhthentication) {
      return <Navigate to='/' replace />;
   }
   return <Outlet /> || children;
}
