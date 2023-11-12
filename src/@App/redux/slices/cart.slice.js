import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

export const CART_ACTION = ['ADD', 'DELETE', 'ADD_ALL', 'DELETE_ALL'];

export const cartSlice = createSlice({
   name: 'cart',
   initialState: [],
   reducers: {
      updateCartReducer: (state, { payload }) => {
         return handleCartUpdate(state, payload);
      }
   }
});

const handleCartUpdate = (state, { action, cart }) => {
   switch (action) {
      case CART_ACTION[0]:
         return [...state, cart];
      case CART_ACTION[1]:
         return state.filter((product_id) => product_id !== cart);
      case CART_ACTION[2]:
         return [...cart.map((item) => item.product_id)];
      case CART_ACTION[3]:
         return [];
      default:
         return state;
   }
};

export const { updateCartReducer } = cartSlice.actions;

export const useCart = () => {
   const dispatch = useDispatch();
   const cart = useSelector((state) => state.cart);

   const updateCart = (action, cart) => {
      dispatch(updateCartReducer({ action, cart }));
   };

   return { cart, updateCart };
};

export default cartSlice;
