import { createSlice } from "@reduxjs/toolkit";

const shoppingSlice = createSlice({
  name: "carrito",
  initialState: {
    products: [],
    totalPrice: 0,
  },
  reducers: {
    uploadProducts: (state, action) => {
      state.products = action.payload;
    },

    addProductToCart: (state, action) => {},
    removeProductFromCart: (state, action) => {
      state.products = state.products.filter(
        (prod) => prod.id !== action.payload
      );
    },
    increaseQuantity: (state, action) => {
      state.products = state.products.map((prod) =>
        prod.id == action.payload
          ? { ...prod, cantidad: prod.cantidad + 1 }
          : prod
      );
    },
    decreaseQuantity: (state, action) => {
      state.products = state.products.map((prod) =>
        prod.id == action.payload
          ? { ...prod, cantidad: prod.cantidad - 1 }
          : prod
      );
    },
    clearCart: (state) => {
      state.products = [];
      state.totalPrice = 0;
    },
    verifeProduct: (state, action) => {
      let product = state.products.find((prod) => prod.id == action.payload);
      if (product) {
        return true;
      } else {
        return false;
      }
    },
    updateTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
  },
});

export const {
  uploadProducts,
  addProductToCart,
  removeProductFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  updateTotalPrice,
  verifeProduct,
} = shoppingSlice.actions;

export default shoppingSlice.reducer;
