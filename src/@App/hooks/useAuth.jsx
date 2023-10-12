import { actionGetCurrentUser, actionLogout } from '@App/redux/slices/auth.slice';
import { useDispatch, useSelector } from 'react-redux';

export default function useAuth() {
   const dispatch = useDispatch();
   const state = useSelector((state) => state.auth);
   const getUser = () => {
      dispatch(actionGetCurrentUser());
   };
   const logout = () => {
      dispatch(actionLogout());
   };
   return {
      ...state,
      logout,
      getUser
   };
}
