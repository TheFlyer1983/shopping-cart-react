import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import ProductCard from '../components/ProductCard';

import type { Product } from '../types/product';
import { useCart } from '../hooks/useCart';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const { dispatch, cart } = useCart();
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
  }, []);

  function addToCart(product: Product) {
    dispatch({ type: 'ADD_TO_CART', product });
  }

  return (
    <div className="px-5 pb-16">
      <div className="flex items-center justify-between gap-4">
        <h1>Products</h1>
        <Link
          to="/cart"
          className="shrink-0 rounded-md border-2 border-transparent bg-(--accent-bg) px-4 py-2 text-sm font-medium text-(--accent) no-underline transition-colors duration-300 hover:border-(--accent-border) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
        >
          View Cart
        </Link>
      </div>
      <div className="grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col overflow-hidden rounded-xl border border-(--border) bg-(--bg) transition-shadow duration-300 hover:shadow-(--shadow)"
          >
            <ProductCard product={product} addToCart={addToCart} />
          </div>
        ))}
      </div>
    </div>
  );
}
