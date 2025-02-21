import {combineReducers, configureStore} from "@reduxjs/toolkit";
import toggleCart from "./toggleCart";

const rootReducer = combineReducers({
  toggleCart,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;