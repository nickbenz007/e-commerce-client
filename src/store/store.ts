import { configureStore } from "@reduxjs/toolkit";
import productReducere from "../store/productSlice";
import userReducer from "../store/userSlice";
import cartReducer from "../store/cartSlice";

export const store = configureStore({
  reducer: {
    product: productReducere,
    user: userReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
