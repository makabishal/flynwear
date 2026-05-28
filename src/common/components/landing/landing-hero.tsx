"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/common/components/ui/button";
import { siteContent } from "@data/site.mock";

export function LandingHero() {
  const { banner, slogan } = siteContent;

  return (
    <section className="relative flex min-h-[85vh] flex-col justify-end overflow-hidden px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, oklch(0.78 0.09 85 / 0.15), transparent 50%)",
        }}
      />
      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-accent">
          {banner.badge}
        </p>
        <h1 className="font-heading max-w-3xl text-5xl leading-none tracking-wide sm:text-7xl lg:text-8xl">
          {slogan.toUpperCase()}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Oversized streetwear. Dark luxury essentials. Built in Kathmandu.
        </p>
          <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/featured">
                  <Button variant="outline" size="lg">
                      View Featured
                  </Button>
              </Link>
              <Link href="/collections">
              <Button size="lg">Shop Collections</Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
