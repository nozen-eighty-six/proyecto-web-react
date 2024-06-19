import { TYPES } from "../actions/shoppingAction";

export const shoppingInitialState = {
  products: [],
  total: 0,
};

export function shoppingReducer(state, action) {
  switch (action.type) {
    case TYPES.ADD_TO_CART:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case TYPES.REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
    case TYPES.INCREASE_QUANTITY:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload
            ? { ...product, quantity: product.quantity + 1 }
            : product
        ),
      };
    case TYPES.DECREASE_QUANTITY:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload
            ? { ...product, quantity: product.quantity - 1 }
            : product
        ),
      };
    case TYPES.SET_TOTAL: {
      let totalCarrito = 0;
      state.products.map((product) => {
        totalCarrito += product.price * product.quantity;
      });
      return {
        ...state,
        total: totalCarrito,
      };
    }

    case TYPES.CLEAR:
      return {
        ...state,
        products: [],
        total: 0,
      };
    default:
      return state;
  }
}
