import './App.css';
import Products from './pages/Products';
import Cart from './pages/Cart';
import { useReducer, useEffect } from 'react';
import { cartReducer, initialCart } from './reducers/cartReducer';
import { BrowserRouter, Routes, Route } from 'react-router';

function App() {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products dispatch={dispatch} />} />
        <Route path="/cart" element={<Cart cart={cart} dispatch={dispatch} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
