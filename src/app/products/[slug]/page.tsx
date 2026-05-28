import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetailGallery } from "@/common/components/product/product-detail-gallery";
import { ProductGrid } from "@/common/components/layout/product-grid";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/common/components/ui/breadcrumb";
import { Badge } from "@/common/components/ui/badge";
import { Button } from "@/common/components/ui/button";
import { Separator } from "@/common/components/ui/separator";
import { formatNPR } from "@/common/lib/format";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/common/lib/products";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} | FLYNWEAR`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/collections">Collections</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductDetailGallery product={product} />
        <div className="flex flex-col">
          <Badge variant="outline" className="mb-3 w-fit uppercase tracking-widest">
            {product.category}
          </Badge>
          <h1 className="font-heading text-4xl tracking-wide sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 text-2xl font-semibold text-accent">
            {formatNPR(product.price)}
          </p>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            {product.description}
          </p>
          <Separator className="my-8" />
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Select size
          </p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <Button key={size} variant="outline" size="sm" className="min-w-12">
                {size}
              </Button>
            ))}
          </div>
          <Button className="mt-8 w-full sm:w-auto" size="lg" disabled>
            Add to bag — Coming soon
          </Button>
          <ul className="mt-8 space-y-2 text-sm text-muted-foreground">
            {product.details.map((d) => (
              <li key={d}>· {d}</li>
            ))}
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-heading mb-8 text-3xl tracking-wide">
            You may also like
          </h2>
          <ProductGrid products={related} />
        </section>
      )}
    </main>
  );
}
