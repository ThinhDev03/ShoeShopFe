import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/auth.slice';
import toastMessageSlice from './slices/toastMessage.slice';
import cartSlice from './slices/cart.slice';

/**
 * @summary: create root reducer including others reducers
 */
const rootReducer = combineReducers({
    [authSlice.name]: authSlice.reducer,
    [toastMessageSlice.name]: toastMessageSlice.reducer,
    [cartSlice.name]: cartSlice.reducer
});

export default rootReducer;
