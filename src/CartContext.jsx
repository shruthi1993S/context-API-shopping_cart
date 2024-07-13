// CartContext.js
import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingProduct = state.find(item => item.id === action.product.id);
      if (existingProduct) {
        return state.map(item =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...state, { ...action.product, quantity: 1 }];
      }
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.id);
    case 'INCREASE_QUANTITY':
      return state.map(item =>
        item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    case 'DECREASE_QUANTITY':
      return state.map(item =>
        item.id === action.id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      );
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = product => dispatch({ type: 'ADD_TO_CART', product });
  const removeFromCart = id => dispatch({ type: 'REMOVE_FROM_CART', id });
  const increaseQuantity = id => dispatch({ type: 'INCREASE_QUANTITY', id });
  const decreaseQuantity = id => dispatch({ type: 'DECREASE_QUANTITY', id });

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
