import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Features/Users/userSlice";
import cartReducer from "./Features/Cart/CartSlice"
const store = configureStore({
  reducer: {
    user: userReducer,
    cart : cartReducer,
  },
});
export default store;
