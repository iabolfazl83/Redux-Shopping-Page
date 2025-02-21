import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  isVisible: false,
}

const uiSlice = createSlice({
  name: "toggleCart",
  initialState,
  reducers: {
    toggleCart(state) {
      state.isVisible = !state.isVisible;
    }
  }
})


export const uiActions = uiSlice.actions;
export default uiSlice.reducer;