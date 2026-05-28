"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/common/types/product.types";
import { cn } from "@/common/lib/utils";

type ProductDetailGalleryProps = {
  product: Product;
};

export function ProductDetailGallery({ product }: ProductDetailGalleryProps) {
  const [active, setActive] = useState(0);
  const images = product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="space-y-4">
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-muted">
        <AnimatePresence mode="wait">
          <motion.div
            key={images[active]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={images[active]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative h-20 w-16 overflow-hidden rounded-sm border-2 transition-colors",
                i === active ? "border-accent" : "border-transparent opacity-60",
              )}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
