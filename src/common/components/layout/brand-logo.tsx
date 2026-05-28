import Image from "next/image";
import { BRAND_LOGO_SRC } from "@/common/constants/brand";
import { cn } from "@/common/lib/utils";

type BrandLogoProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
  priority?: boolean;
};

/** Logo image is black-on-white — use a light container on dark UI */
const sizeMap = {
  sm: "h-10 w-[4.5rem]",
  md: "h-12 w-[5.5rem]",
  lg: "h-14 w-[6.5rem]",
};

export function BrandLogo({
  size = "md",
  className,
  priority = false,
}: BrandLogoProps) {
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-sm border border-border bg-white",
        sizeMap[size],
        className,
      )}
    >
      <Image
        src={BRAND_LOGO_SRC}
        alt="FLYNWEAR logo"
        fill
        sizes="(max-width: 640px) 72px, 88px"
        className="object-contain object-center p-0.5"
        priority={priority}
        unoptimized
      />
    </div>
  );
}
