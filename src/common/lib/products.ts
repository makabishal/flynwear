import { products } from "@data/products.mock";
import type { Product } from "@/common/types/product.types";

export function getAllProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function filterByPriceRange(
  items: Product[],
  min: number,
  max: number,
): Product[] {
  return items.filter((p) => p.price >= min && p.price <= max);
}

export function getPriceBounds(items: Product[] = products) {
  const prices = items.map((p) => p.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const step = 500;
  return {
    min: Math.floor(min / step) * step,
    max: Math.ceil(max / step) * step,
    step,
  };
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}
