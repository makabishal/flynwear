import { Suspense } from "react";
import { PaginationControls } from "@/common/components/layout/pagination-controls";
import { ProductGrid } from "@/common/components/layout/product-grid";
import { paginate } from "@/common/lib/pagination";
import { getFeaturedProducts } from "@/common/lib/products";

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function FeaturedPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const featured = getFeaturedProducts();
  const { items, page: safePage, totalPages } = paginate(featured, page);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="font-heading text-4xl tracking-wide sm:text-5xl">
          Featured
        </h1>
        <p className="mt-2 text-muted-foreground">
          Curated drops and standout pieces from the current season.
        </p>
      </div>

      <div id="featured-grid">
        <ProductGrid products={items} variant="featured" />
        <Suspense fallback={null}>
          <PaginationControls
            page={safePage}
            totalPages={totalPages}
            scrollTargetId="featured-grid"
          />
        </Suspense>
      </div>
    </main>
  );
}
