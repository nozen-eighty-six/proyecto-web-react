import { configureStore } from "@reduxjs/toolkit";
import carritoReducer from "./shoppingSlice";
import tokenReducer from "./tokenSlice";
import userReducer from "./userSlice";
import menuReducer from "./reponsiveOpSlice";
const store = configureStore({
  reducer: {
    carrito: carritoReducer,
    token: tokenReducer,
    user: userReducer,
    menu: menuReducer,
  },
});

export default store;
