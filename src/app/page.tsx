import Link from "next/link";
import { FeatureBanner } from "@/common/components/landing/feature-banner";
import { LandingHero } from "@/common/components/landing/landing-hero";
import { ProductGrid } from "@/common/components/layout/product-grid";
import {getAllProducts, getFeaturedProducts} from "@/common/lib/products";

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 3);
  const collection = getAllProducts();

  return (
    <>
      <LandingHero />
      <FeatureBanner />
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-heading text-3xl tracking-wide">Featured picks</h2>
          <Link
            href="/featured"
            className="text-sm uppercase tracking-widest text-muted-foreground hover:text-accent"
          >
            View all
          </Link>
        </div>
        <ProductGrid products={featured} variant="featured" />
      </section>
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between">
                <h2 className="font-heading text-3xl tracking-wide">Our Colllections</h2>
                <Link
                    href="/collections"
                    className="text-sm uppercase tracking-widest text-muted-foreground hover:text-accent"
                >
                    View all
                </Link>
            </div>
            <ProductGrid products={collection} variant="collection" />
        </section>
    </>
  );
}
