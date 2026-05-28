import type { Product } from "@/common/types/product.types";
import { ProductCard } from "@/common/components/layout/product-card";

type ProductGridProps = {
  products: Product[];
  showFeaturedBadge?: boolean;
  variant?: "featured" | "collection";
};

export function ProductGrid({
  products,
  showFeaturedBadge = false,
  variant = "collection",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="py-16 text-center text-muted-foreground">
        No products match your filters.
      </p>
    );
  }

  return (
    <div
      className={
        variant === "featured"
          ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      }
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          showFeaturedBadge={showFeaturedBadge}
        />
      ))}
    </div>
  );
}
