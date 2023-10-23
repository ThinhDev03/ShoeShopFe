import authSlice, { actionGetCurrentUser, actionLogout } from '@App/redux/slices/auth.slice';
import { useDispatch, useSelector } from 'react-redux';

const { actionLoginReducer } = authSlice.actions;

export default function useAuth() {
   const dispatch = useDispatch();
   const state = useSelector((state) => state.auth);

   const getUser = () => {
      dispatch(actionGetCurrentUser());
   };

   const authLogin = (data) => {
      dispatch(actionLoginReducer(data));
   };

   const logout = () => {
      dispatch(actionLogout());
   };

   return { ...state, logout, getUser, authLogin };
}
