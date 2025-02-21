import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalItems: 0,
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
      state.totalItems += 1;
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.totalPrice + item.price;
      } else {
        state.cartItems.push({
          ...item,
          totalPrice: item.price,
          quantity: 1,
        });
      }
    },

    removeFromCart(state, action) {
      const itemId = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === itemId);

      if (!existingItem) return;

      state.totalItems -= 1;

      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      } else {
        existingItem.quantity -= 1;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },

    clearCart(state) {
      state.cartItems = [];
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
