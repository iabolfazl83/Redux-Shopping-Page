import {combineReducers, configureStore} from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import uiSlice from "./ui-slice";

const rootReducer = combineReducers({
  uiSlice,
  cartSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;