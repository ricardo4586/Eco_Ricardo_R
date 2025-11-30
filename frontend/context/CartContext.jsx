// frontend/context/CartContext.jsx
"use client";

import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

// Estado inicial
const initialState = {
  cart: [],
  favorites: [],
  cartCount: 0
};

// Reducer para manejar las acciones
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.barcode === action.payload.barcode);
      
      if (existingItem) {
        // Si ya existe, incrementar cantidad
        return {
          ...state,
          cart: state.cart.map(item =>
            item.barcode === action.payload.barcode
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          cartCount: state.cartCount + 1
        };
      } else {
        // Si no existe, agregar nuevo item
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
          cartCount: state.cartCount + 1
        };
      }

    case 'REMOVE_FROM_CART':
      const itemToRemove = state.cart.find(item => item.barcode === action.payload);
      return {
        ...state,
        cart: state.cart.filter(item => item.barcode !== action.payload),
        cartCount: state.cartCount - (itemToRemove?.quantity || 0)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.barcode === action.payload.barcode
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        cartCount: state.cart.reduce((total, item) => total + item.quantity, 0)
      };

    case 'TOGGLE_FAVORITE':
      const isFavorite = state.favorites.find(fav => fav.barcode === action.payload.barcode);
      
      if (isFavorite) {
        // Remover de favoritos
        return {
          ...state,
          favorites: state.favorites.filter(fav => fav.barcode !== action.payload.barcode)
        };
      } else {
        // Agregar a favoritos
        return {
          ...state,
          favorites: [...state.favorites, action.payload]
        };
      }

    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
        cartCount: 0
      };

    case 'LOAD_STATE':
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Cargar estado desde localStorage al inicializar
  useEffect(() => {
    const savedState = localStorage.getItem('cartState');
    if (savedState) {
      dispatch({ type: 'LOAD_STATE', payload: JSON.parse(savedState) });
    }
  }, []);

  // Guardar estado en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('cartState', JSON.stringify(state));
  }, [state]);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { barcode: productId, quantity } });
    }
  };

  const toggleFavorite = (product) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: product });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const isInCart = (productId) => {
    return state.cart.some(item => item.barcode === productId);
  };

  const isFavorite = (productId) => {
    return state.favorites.some(fav => fav.barcode === productId);
  };

  const getCartTotal = () => {
    return state.cart.reduce((total, item) => total + (item.precio * item.quantity), 0);
  };

  const value = {
    cart: state.cart,
    favorites: state.favorites,
    cartCount: state.cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleFavorite,
    clearCart,
    isInCart,
    isFavorite,
    getCartTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
}