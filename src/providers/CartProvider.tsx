import { CartContext } from '../context/CartContext';
import { useReducer } from 'react';
import { cartReducer, initialCart } from '../reducers/cartReducer';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  return (
    <CartContext.Provider
      value={{
        cart,
        dispatch
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
