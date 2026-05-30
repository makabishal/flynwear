"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useScrollDirection } from "@/common/hooks/use-scroll-direction";
import { BrandLogo } from "@/common/components/layout/brand-logo";
import { cn } from "@/common/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Featured", href: "/featured" },
  { label: "Collections", href: "/collections" },
  { label: "About Us", href: "/about" },
  { label: "Account", href: "/account" },
] as const;

export function StoreHeader() {
  const pathname = usePathname();
  const collapsed = useScrollDirection();

  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md"
      animate={{
        paddingTop: collapsed ? 8 : 16,
        paddingBottom: collapsed ? 8 : 16,
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <Link href="/" className="group flex items-center gap-3 shrink-0">
          <BrandLogo size="sm" priority />
          <div className="flex flex-col">
            <span className="font-heading text-2xl font-bold tracking-[0.2em] sm:text-3xl">
              FLYNWEAR
            </span>
          </div>
        </Link>

        {/* Navigation Section */}
        <motion.nav
          className="flex flex-wrap items-center justify-end gap-1 sm:gap-2"
          animate={{ scale: collapsed ? 0.98 : 1 }}
        >
          {navItems.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-sm px-3 py-2 text-xs font-medium uppercase tracking-widest transition-colors sm:text-sm",
                  active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </motion.nav>
      </div>
    </motion.header>
  );
}
