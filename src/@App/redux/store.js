import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

/**
 * @summary: Setup redux toolkit store & redux persist
 */

// config redux persist to sync data from redux to localstorage

const store = configureStore({
   reducer: rootReducer
});

export const { dispatch } = store;
export default store;
