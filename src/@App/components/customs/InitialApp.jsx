import useAuth from '@App/hooks/useAuth';
import { useEffect } from 'react';

export default function InitialApp({ children }) {
   const { getUser } = useAuth();
   useEffect(() => {
      getUser();
   }, []);
   return children;
}
