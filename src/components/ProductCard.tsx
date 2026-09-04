import type { Product } from '../types/product';

type ProductProps = {
  product: Product;
  addToCart: (product: Product) => void;
}

export default function ProductCard({ product, addToCart }: ProductProps) {
  return (
    <>
      <div className="flex h-56 shrink-0 items-center justify-center bg-white p-6">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5 text-left">
        <div className="flex items-center justify-between gap-3 text-xs tracking-wide uppercase">
          <span className="truncate">{product.category}</span>
          <span className="shrink-0 text-(--accent)">
            ★ {product.rating.rate} ({product.rating.count})
          </span>
        </div>

        <h2 className="mb-0 line-clamp-2 text-lg leading-snug">{product.title}</h2>

        <p className="line-clamp-3 text-sm">{product.description}</p>

        <div className="mt-auto flex items-center justify-between gap-4 pt-4">
          <span className="text-lg font-medium text-(--text-h)">
            ${product.price.toFixed(2)}
          </span>
          <button
            type="button"
            className="w-32 shrink-0 cursor-pointer rounded-md border-2 border-transparent bg-(--accent-bg) px-4 py-2 text-sm font-medium text-(--accent) transition-colors duration-300 hover:border-(--accent-border) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
