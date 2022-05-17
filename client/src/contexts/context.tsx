import React, { createContext, useReducer } from "react";
import { CartReducer, sumItems } from "./reducer";

export const CartContext = createContext<any>({});

const storage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") as string)
  : [];
const initialState = {
  cartItems: storage,
  ...sumItems(storage),
  isLogin: false,
  isAdmin: false,
  user: {},
};

export const CartContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);
  const isInCart = (product: any) => {
    return !!state.cartItems?.find((item: any) => item.id === product.id);
  };

  const login = (payload: any) => {
    dispatch({ type: "LOGIN", payload });
  };

  const increase = (payload: any) => {
    dispatch({ type: "INCREASE", payload });
  };

  const decrease = (payload: any) => {
    dispatch({ type: "DECREASE", payload });
  };

  const addProduct = (payload: any) => {
    dispatch({ type: "ADD_ITEM", payload });
  };

  const removeProduct = (payload: any) => {
    dispatch({ type: "REMOVE_ITEM", payload });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR" });
  };

  const handleCheckout = () => {
    console.log("CHECKOUT", state);
    dispatch({ type: "CHECKOUT" });
  };

  const contextValues = {
    removeProduct,
    addProduct,
    increase,
    decrease,
    clearCart,
    handleCheckout,
    isInCart,
    login,
    ...state,
  };

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
};
