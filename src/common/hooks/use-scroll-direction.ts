"use client";

import { useEffect, useState } from "react";

export function useScrollDirection(threshold = 60) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < threshold) {
          setCollapsed(false);
        } else if (y > lastY + 5) {
          setCollapsed(true);
        } else if (y < lastY - 5) {
          setCollapsed(false);
        }
        lastY = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return collapsed;
}
