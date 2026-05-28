import { Suspense } from "react";
import { PriceFilter } from "@/common/components/filters/price-filter";
import { PaginationControls } from "@/common/components/layout/pagination-controls";
import { ProductGrid } from "@/common/components/layout/product-grid";
import { paginate } from "@/common/lib/pagination";
import {
  filterByPriceRange,
  getAllProducts,
  getPriceBounds,
} from "@/common/lib/products";

type PageProps = {
  searchParams: Promise<{
    page?: string;
    min?: string;
    max?: string;
  }>;
};

export default async function CollectionsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const bounds = getPriceBounds();
  const min = Number(params.min ?? bounds.min);
  const max = Number(params.max ?? bounds.max);
  const page = Number(params.page ?? 1);

  const filtered = filterByPriceRange(getAllProducts(), min, max);
  const { items, page: safePage, totalPages } = paginate(filtered, page);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="font-heading text-4xl tracking-wide sm:text-5xl">
          Collections
        </h1>
        <p className="mt-2 text-muted-foreground">
          All pieces — filter by price in NPR (500 step increments).
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-sm border border-border bg-card p-6">
            <Suspense fallback={<p className="text-sm text-muted-foreground">Loading filter…</p>}>
              <PriceFilter
                minBound={bounds.min}
                maxBound={bounds.max}
                step={bounds.step}
              />
            </Suspense>
          </div>
        </aside>

        <div id="collections-grid">
          <div className="mb-6 lg:hidden">
            <Suspense fallback={null}>
              <PriceFilter
                minBound={bounds.min}
                maxBound={bounds.max}
                step={bounds.step}
              />
            </Suspense>
          </div>
          <p className="mb-6 text-sm text-muted-foreground">
            Showing {items.length} of {filtered.length} products
          </p>
          <ProductGrid products={items} showFeaturedBadge />
          <Suspense fallback={null}>
            <PaginationControls
              page={safePage}
              totalPages={totalPages}
              scrollTargetId="collections-grid"
            />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
