import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({...item, quantity: 1});
      }
    },

    removeFromCart(state, action) {
      const itemId = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === itemId);

      if (!existingItem) return;

      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      } else {
        existingItem.quantity -= 1;
      }
    },

    clearCart(state) {
      state.cartItems = [];
    },
  },
});

export const cartSliceActions = cartSlice.actions;
export default cartSlice.reducer;
