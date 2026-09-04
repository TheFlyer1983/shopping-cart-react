import { createContext, type Dispatch } from 'react';
import type { CartState, CartAction } from '../reducers/cartReducer';

export const CartContext = createContext<{
  cart: CartState;
  dispatch: Dispatch<CartAction>;
}>({
  cart: [],
  dispatch: () => {}
});