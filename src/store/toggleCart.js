import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  isVisible: false,
}

const toggleCart = createSlice({
  name: "toggleCart",
  initialState,
  reducers: {
    toggleCart(state) {
      state.isVisible = !state.isVisible;
    }
  }
})


export const toggleCartActions = toggleCart.actions;
export default toggleCart.reducer;