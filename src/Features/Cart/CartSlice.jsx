import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      //send item
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    },
    deleteItem(state, action) {
      //send id
      const newcart = state.cart.filter(
        (item) => item.pizzaId !== action.payload,
      );
      return {
        ...state,
        cart: newcart,
      };
    },
    increaseItem(state, action) {
      //send id
      const itemIndex = state.cart.findIndex(
        (item) => item.pizzaId === action.payload,
      );
      state.cart[itemIndex].quantity++;
      state.cart[itemIndex].totalPrice =
        state.cart[itemIndex].quantity * state.cart[itemIndex].unitPrice;

      // if (itemIndex !== -1) {
      //   const updatedCart = [...state.cart];
      //   updatedCart[itemIndex].quantity += 1;
      //   updatedCart[itemIndex].totalPrice =
      //     updatedCart[itemIndex].quantity * updatedCart[itemIndex].unitPrice;
      //   return {
      //     ...state,
      //     cart: updatedCart,
      //   };
      // }
    },
    decreseItem(state, action) {
      //send id
      const itemIndex = state.cart.findIndex(
        (item) => item.pizzaId === action.payload,
      );
      if (state.cart[itemIndex].totalPrice > 0) {
        state.cart[itemIndex].quantity--;

        state.cart[itemIndex].totalPrice =
          state.cart[itemIndex].quantity * state.cart[itemIndex].unitPrice;
      }
      if (state.cart[itemIndex].quantity === 0) {
        const newcart = state.cart.filter(
          (item) => item.pizzaId !== action.payload,
        );
        state.cart = newcart;
      }

      // const updatedcart = state.cart;
      // if (itemIndex !== -1) {
      //   updatedcart[itemIndex].quantity -= 1;
      //   updatedCart[itemIndex].totalPrice =
      //     updatedCart[itemIndex].quantity * updatedCart[itemIndex].unitPrice;
      //   return {
      //     ...state,
      //     cart: updatedcart,
      //   };
      // }
    },
    clearCart(state) {
      console.log("okkkk");
      return {
        ...state,
        cart: [],
      };
    },
  },
});

export const { addItem, clearCart, decreseItem, increaseItem, deleteItem } =
  cartReducer.actions;
export default cartReducer.reducer;

export const gettotalcartprice = (state) =>
  state.cart.cart.reduce((total, item) => total + item.totalPrice, 0);
export const gettotalcartquantity = (state) =>
  state.cart.cart.reduce((total, item) => total + item.quantity, 0);
export const getCart = (state) => state.cart.cart;

export const clear = (dispatch) => {
  dispatch(clearCart());
};

export const deleteitem = (dispatch, pizzaId) => {
  dispatch(deleteItem(pizzaId));
};

export const getquantitybyid = (state, id) => {
  const item = state.cart.cart.find((item) => item.pizzaId === id);
  console.log("item", item);
  const quantity = item?.quantity || 0;

  return quantity;
};
