import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/common/types/product.types";
import { formatNPR } from "@/common/lib/format";
import { Badge } from "@/common/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/common/components/ui/card";

type ProductCardProps = {
  product: Product;
  showFeaturedBadge?: boolean;
};

export function ProductCard({
  product,
  showFeaturedBadge = false,
}: ProductCardProps) {
  return (
    <Card className="group overflow-hidden border-border/80 bg-card transition-colors hover:border-accent/40">
      <Link href={`/products/${product.slug}`}>
        <CardHeader className="p-0">
          <div className="relative aspect-[3/4] overflow-hidden bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            {showFeaturedBadge && product.featured && (
              <Badge className="absolute left-3 top-3 bg-accent text-accent-foreground">
                Featured
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-1 p-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {product.category}
          </p>
          <h3 className="font-medium leading-snug">{product.name}</h3>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 pt-0">
          <span className="text-sm font-semibold text-accent">
            {formatNPR(product.price)}
          </span>
          <span className="text-xs uppercase tracking-widest text-muted-foreground group-hover:text-foreground">
            View
          </span>
        </CardFooter>
      </Link>
    </Card>
  );
}
