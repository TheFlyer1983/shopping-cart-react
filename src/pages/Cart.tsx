import { Link } from 'react-router';
import type { Product } from '../types/product';
import { useCart } from '../hooks/useCart';

export default function Cart() {
  const { cart, dispatch } = useCart();

  function removeFromCart(productId: Product['id']) {
    dispatch({ type: 'REMOVE_FROM_CART', productId });
  }

  function increaseQuantity(productId: Product['id']) {
    dispatch({ type: 'INCREASE_QUANTITY', productId });
  }

  function decreaseQuantity(productId: Product['id']) {
    dispatch({ type: 'DECREASE_QUANTITY', productId });
  }

  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="px-5 pb-16">
      <div className="flex items-center justify-between gap-4">
        <h1>Cart</h1>
        <Link
          to="/"
          className="shrink-0 rounded-md border-2 border-transparent bg-(--accent-bg) px-4 py-2 text-sm font-medium text-(--accent) no-underline transition-colors duration-300 hover:border-(--accent-border) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
        >
          Continue Shopping
        </Link>
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-xl border-2 border-dashed border-(--border) px-6 py-20 text-center">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-16 w-16 opacity-40"
          >
            <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>

          <h2 className="mb-0">Your cart is empty</h2>

          <p className="max-w-sm text-sm">
            You haven&apos;t added anything yet. Browse the products and add something you like.
          </p>

          <Link
            to="/"
            className="mt-2 rounded-md border-2 border-transparent bg-(--accent-bg) px-5 py-2.5 text-sm font-medium text-(--accent) no-underline transition-colors duration-300 hover:border-(--accent-border) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          <ul className="flex list-none flex-col gap-4 p-0">
            {cart.map((item) => (
              <li
                key={item.product.id}
                className="flex flex-wrap items-center gap-4 rounded-xl border border-(--border) bg-(--bg) p-4"
              >
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-md bg-white p-2">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    loading="lazy"
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="min-w-0 flex-1 basis-40 text-left">
                  <h2 className="mb-1 line-clamp-2 text-base leading-snug">{item.product.title}</h2>
                  <p className="text-sm">${item.product.price.toFixed(2)} each</p>
                </div>

                <div className="ml-auto flex items-center gap-4">
                  <div className="flex items-center gap-1 rounded-md border border-(--border) p-1">
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${item.product.title}`}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded text-lg leading-none text-(--text-h) transition-colors duration-200 hover:bg-(--accent-bg) hover:text-(--accent) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
                      onClick={() => decreaseQuantity(item.product.id)}
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-(--text-h)">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label={`Increase quantity of ${item.product.title}`}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded text-lg leading-none text-(--text-h) transition-colors duration-200 hover:bg-(--accent-bg) hover:text-(--accent) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
                      onClick={() => increaseQuantity(item.product.id)}
                    >
                      +
                    </button>
                  </div>

                  <span className="w-20 text-right text-lg font-medium text-(--text-h)">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>

                  <button
                    type="button"
                    aria-label={`Remove ${item.product.title} from cart`}
                    onClick={() => removeFromCart(item.product.id)}
                    className="shrink-0 cursor-pointer rounded-md border-2 border-transparent px-3 py-1.5 text-sm transition-colors duration-300 hover:border-(--border) hover:text-(--text-h) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-(--border) pt-6">
            <button
              type="button"
              className="cursor-pointer rounded-md border-2 border-transparent px-3 py-1.5 text-sm transition-colors duration-300 hover:border-(--border) hover:text-(--text-h) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
              onClick={() => dispatch({ type: 'CLEAR_CART' })}
            >
              Clear Cart
            </button>

            <div className="flex items-center gap-4">
              <span className="text-sm">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </span>
              <span className="text-2xl font-medium text-(--text-h)">${total.toFixed(2)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
