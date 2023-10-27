import authService from '@App/services/auth.service';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { setToastMessage } from './toastMessage.slice';
import axios from 'axios';
import { errorMessage, successMessage } from '@Core/Helper/Message';

export const actionGetCurrentUser = createAsyncThunk('auth/actionGetCurrentUser', async (payload, action) => {
   const user = await authService.getCurrentUser();
   // const getPermissionByRole = () => {
   //    return axios.get(import.meta.env.VITE_BASE_URL + '/permissions/get-by-roll?role=' + user.role, {
   //       withCredentials: true
   //    });
   // };
   // const userPermission = await getPermissionByRole();
   // return {
   //    user
   //    // userPermission: userPermission.data
   // };

   return user;
});

const authSlice = createSlice({
   name: 'auth',
   initialState: {
      user: null,
      isAuththentication: false,
      isInitialized: false,
      userPermission: null,
      loading: false
   },
   reducers: {
      actionLoginReducer: (state, action) => {
         const { role, ...user } = action.payload;
         state.user = user;
         state.isAuththentication = true;
         state.userPermission = role;
      },
      actionLogoutReducer: (state, action) => {
         localStorage.removeItem('token');
         successMessage('Đăng xuất thành công');
         state.user = null;
         state.isAuththentication = false;
         state.userPermission = null;
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(actionGetCurrentUser.fulfilled, (state, { payload }) => {
            const { role, ...user } = payload.data;
            state.user = user;
            state.userPermission = role;
            state.isAuththentication = true;
            state.isInitialized = true;
         })
         .addCase(actionGetCurrentUser.rejected, (state, action) => {
            state.isAuththentication = false;
            state.userPermission = null;
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
