import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const initialState = {
   messageState: { message: null, status: 'info' }
};

export const toastMessageSlice = createSlice({
   name: 'toastMessage',
   initialState,
   reducers: {
      setToastMessage: (state, { payload }) => {
         state.messageState = payload;
      }
   }
});

export const { setToastMessage } = toastMessageSlice.actions;

export const useSetNotifyState = () => {
   const dispatch = useDispatch();
   const setToastInformation = (infoToast) => {
      dispatch(setToastMessage({ ...infoToast }));
   };
   return { setToastInformation };
};

export default toastMessageSlice;
