import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

export const WISHLIST_ACTION = {
   add: 'ADD',
   remove: 'REMOVE'
};

const getWishlist = () => {
   const list = localStorage.getItem('shoe_wishlist');
   return list ? JSON.parse(list) : [];
};

export const wishlistSlice = createSlice({
   name: 'wishlist',
   initialState: getWishlist(),
   reducers: {
      updateWishlistReducer: (state, { payload }) => {
         return handleWishlistUpdate(state, payload);
      }
   }
});

const handleWishlistUpdate = (state, { action, payload }) => {
   const wishlist = getWishlist();
   console.log(payload);
   switch (action) {
      case WISHLIST_ACTION.add:
         const list = [...wishlist, payload];

         localStorage.setItem('shoe_wishlist', JSON.stringify(list));
         return [...state, payload];

      case WISHLIST_ACTION.remove:
         const newList = wishlist.filter((product) => product._id !== payload);
         console.log(newList);

         localStorage.setItem('shoe_wishlist', JSON.stringify(newList));
         return state.filter((product) => product._id !== payload);

      default:
         return state;
   }
};

export const { updateWishlistReducer } = wishlistSlice.actions;

export const useWishlist = () => {
   const dispatch = useDispatch();
   const wishlist = useSelector((state) => state.wishlist);

   const updateWishlist = (action, payload) => {
      dispatch(updateWishlistReducer({ action, payload }));
   };

   return { wishlist, updateWishlist };
};

export default wishlistSlice;
