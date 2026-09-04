import './App.css';
import Products from './pages/Products';
import Cart from './pages/Cart';
import { BrowserRouter, Routes, Route } from 'react-router';
import { CartProvider } from './providers/CartProvider';

function App() {
  return (
    <BrowserRouter>
    <CartProvider>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
