"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { buttonVariants } from "@/common/components/ui/button";
import { cn } from "@/common/lib/utils";

type PaginationControlsProps = {
  page: number;
  totalPages: number;
  scrollTargetId?: string;
};

export function PaginationControls({
  page,
  totalPages,
  scrollTargetId,
}: PaginationControlsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hrefFor = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    return `${pathname}?${params.toString()}`;
  };

  const scrollToGrid = () => {
    if (scrollTargetId) {
      setTimeout(() => {
        document.getElementById(scrollTargetId)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 0);
    }
  };

  if (totalPages <= 1) return null;

  const btnClass = buttonVariants({ variant: "outline", size: "sm" });

  return (
    <div className="mt-10 flex items-center justify-center gap-4">
      {page > 1 ? (
        <Link
          href={hrefFor(page - 1)}
          onClick={scrollToGrid}
          className={cn(btnClass)}
        >
          Previous
        </Link>
      ) : (
        <span className={cn(btnClass, "pointer-events-none opacity-50")}>
          Previous
        </span>
      )}
      <span className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </span>
      {page < totalPages ? (
        <Link
          href={hrefFor(page + 1)}
          onClick={scrollToGrid}
          className={cn(btnClass)}
        >
          Next
        </Link>
      ) : (
        <span className={cn(btnClass, "pointer-events-none opacity-50")}>
          Next
        </span>
      )}
    </div>
  );
}
