"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { Slider } from "@/common/components/ui/slider";
import { formatNPR } from "@/common/lib/format";

type PriceFilterProps = {
  minBound: number;
  maxBound: number;
  step: number;
};

export function PriceFilter({ minBound, maxBound, step }: PriceFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const urlMin = Number(searchParams.get("min") ?? minBound);
  const urlMax = Number(searchParams.get("max") ?? maxBound);
  const [range, setRange] = useState([urlMin, urlMax]);

  useEffect(() => {
    setRange([urlMin, urlMax]);
  }, [urlMin, urlMax]);

  const commitRange = useCallback(
    (values: number[]) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("min", String(values[0]));
      params.set("max", String(values[1]));
      params.set("page", "1");
      startTransition(() => {
        router.push(`/collections?${params.toString()}`, { scroll: false });
        document.getElementById("collections-grid")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    },
    [router, searchParams],
  );

  return (
    <div className={isPending ? "opacity-60" : ""}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Price (NPR)
      </p>
      <Slider
        min={minBound}
        max={maxBound}
        step={step}
        value={range}
        onValueChange={(values) => {
          const v = Array.isArray(values) ? values : [values];
          if (v.length === 2) setRange([v[0], v[1]]);
        }}
        onValueCommitted={(values) => {
          const v = Array.isArray(values) ? values : [values];
          if (v.length === 2) commitRange([v[0], v[1]]);
        }}
        className="mb-4"
      />
      <p className="text-sm text-foreground">
        {formatNPR(range[0])} – {formatNPR(range[1])}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">Steps of Rs. 500</p>
    </div>
  );
}
