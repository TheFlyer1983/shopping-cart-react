import type { Product } from '../types/product';

export type CartAction = {
  type: 'ADD_TO_CART';
  product: Product;
} | {
  type: 'REMOVE_FROM_CART';
  productId: Product['id'];
} | {
  type: 'INCREASE_QUANTITY';
  productId: Product['id'];
} | {
  type: 'DECREASE_QUANTITY';
  productId: Product['id'];
} | {
  type: 'CLEAR_CART';
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CartState = CartItem[];

export const initialCart: CartState = [];

export function cartReducer(state: CartState, action: CartAction) {
  switch (action.type) {
    case 'ADD_TO_CART':
      if (state.some((item) => item.product.id === action.product.id)) {
        return state.map((item) =>
          item.product.id === action.product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...state, { product: action.product, quantity: 1 }];

    case 'REMOVE_FROM_CART':
      return state.filter((item) => item.product.id !== action.productId);
    
    case 'INCREASE_QUANTITY':
      return state.map((item) =>
        item.product.id === action.productId ? { ...item, quantity: item.quantity + 1 } : item
      );
    
    case 'DECREASE_QUANTITY':
      if (state.some((item) => item.product.id === action.productId && item.quantity === 1)) {
        return state.filter((item) => item.product.id !== action.productId);
      }

      return state.map((item) =>
        item.product.id === action.productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    
    case 'CLEAR_CART':
      return initialCart;

    default:
      return state;
  }
}
