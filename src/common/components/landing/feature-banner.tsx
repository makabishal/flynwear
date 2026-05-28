"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { siteContent } from "@data/site.mock";
import { Badge } from "@/common/components/ui/badge";

export function FeatureBanner() {
  const { banner } = siteContent;

  return (
    <motion.section
      className="mx-4 mb-16 rounded-sm border border-border bg-card p-6 sm:mx-6 sm:p-10 lg:mx-8"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Badge className="mb-3 bg-accent text-accent-foreground">{banner.badge}</Badge>
          <h2 className="font-heading text-3xl tracking-wide sm:text-4xl">
            {banner.title}
          </h2>
          <p className="mt-2 text-muted-foreground">{banner.description}</p>
        </div>
        <Link
          href={banner.ctaHref}
          className="inline-flex h-11 items-center justify-center rounded-sm bg-primary px-8 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          {banner.ctaLabel}
        </Link>
      </div>
    </motion.section>
  );
}
