import authSlice, { actionGetCurrentUser } from '@App/redux/slices/auth.slice';
import { useDispatch, useSelector } from 'react-redux';

const { actionLoginReducer, actionLogoutReducer } = authSlice.actions;

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
      dispatch(actionLogoutReducer());
   };

   return { ...state, logout, getUser, authLogin };
}
