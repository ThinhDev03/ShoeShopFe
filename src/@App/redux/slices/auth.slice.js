import authService from '@App/services/auth.service';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { setToastMessage } from './toastMessage.slice';
import axios from 'axios';

export const actionGetCurrentUser = createAsyncThunk('auth/actionGetCurrentUser', async (payload, action) => {
   const user = await authService.getCurrentUser();
   const getPermissionByRole = () => {
      return axios.get(import.meta.env.VITE_BASE_URL + '/permissions/get-by-roll?role=' + user.role, {
         withCredentials: true
      });
   };
   const userPermission = await getPermissionByRole();
   return {
      user,
      userPermission: userPermission.data
   };
});
export const actionLogout = createAsyncThunk('auth/actionLogout', async (_, action) => {
   try {
      const res = await authService.signout();
      action.dispatch(setToastMessage({ message: 'Đăng xuất thành công', status: 'success' }));
      return res;
   } catch (error) {
      console.log(error);
      action.dispatch(setToastMessage({ message: 'Có lỗi sảy ra vui lòng thử lại!', status: 'error' }));
      throw new Error();
   }
});

const authSlice = createSlice({
   name: 'auth',
   initialState: {
      user: null,
      isAuhthentication: false,
      isInitialized: false,
      userPermission: null,
      loading: false
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(actionGetCurrentUser.fulfilled, (state, { payload }) => {
            state.user = payload.user;
            state.userPermission = payload.userPermission;
            state.isAuhthentication = true;
            state.isInitialized = true;
         })
         .addCase(actionLogout.fulfilled, (state, action) => {
            state.user = null;
            state.isAuhthentication = false;
         })
         .addCase(actionGetCurrentUser.rejected, (state, action) => {
            state.isAuhthentication = false;
            state.isInitialized = true;
         })
         .addMatcher(
            (action) => action.type.endsWith('/pending'),
            (state, action) => {
               state.loading = true;
            }
         )
         .addMatcher(
            (action) => action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled'),
            (state, action) => {
               state.loading = false;
            }
         );
   }
});

export default authSlice;
