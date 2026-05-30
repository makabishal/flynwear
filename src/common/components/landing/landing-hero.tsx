"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

const IMAGES = [
  {
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png",
    bg: "#F4845F",
    panel: "#F79B7F",
  },
  {
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png",
    bg: "#6BBF7A",
    panel: "#85CC92",
  },
  {
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png",
    bg: "#E882B4",
    panel: "#ED9DC4",
  },
  {
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png",
    bg: "#6EB5FF",
    panel: "#8DC4FF",
  },
];

const GRAIN_DATA_URI = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PScwIDAgMjAwIDIwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZmlsdGVyIGlkPSdub2lzZUZpbHRlcic+PGZlVHVyYnVsZW5jZSB0eXBlPSdmcmFjdGFsTm9pc2UnIGJhc2VGcmVxdWVuY3k9JzAuNjUnIG51bU9jdGF2ZXM9JzMnIHN0aXRjaFRpbGVzPSdzdGl0Y2gnLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWx0ZXI9J3VybCgjbm9pc2VGaWx0ZXIpJy8+PC9zdmc+";

export function LandingHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    IMAGES.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useCallback(
    (direction: "next" | "prev") => {
      if (isAnimating) return;
      setIsAnimating(true);

      setActiveIndex((prev) => {
        if (direction === "next") return (prev + 1) % 4;
        return (prev + 3) % 4;
      });

      setTimeout(() => {
        setIsAnimating(false);
      }, 650);
    },
    [isAnimating]
  );

  const getRole = (index: number) => {
    if (index === activeIndex) return "center";
    if (index === (activeIndex + 3) % 4) return "left";
    if (index === (activeIndex + 1) % 4) return "right";
    return "back";
  };

  const getStyles = (role: string): React.CSSProperties => {
    const common: React.CSSProperties = {
      position: "absolute",
      transition:
        "transform 650ms cubic-bezier(0.4, 0, 0.2, 1), filter 650ms cubic-bezier(0.4, 0, 0.2, 1), opacity 650ms cubic-bezier(0.4, 0, 0.2, 1), left 650ms cubic-bezier(0.4, 0, 0.2, 1), bottom 650ms cubic-bezier(0.4, 0, 0.2, 1), height 650ms cubic-bezier(0.4, 0, 0.2, 1)",
      willChange: "transform, filter, opacity",
    };

    switch (role) {
      case "center":
        return {
          ...common,
          transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
          left: "50%",
          height: isMobile ? "60%" : "92%",
          bottom: isMobile ? "22%" : "0%",
          opacity: 1,
          filter: "blur(0px)",
          zIndex: 20,
        };
      case "left":
        return {
          ...common,
          transform: "translateX(-50%) scale(1)",
          left: isMobile ? "20%" : "30%",
          height: isMobile ? "16%" : "28%",
          bottom: isMobile ? "32%" : "12%",
          opacity: 0.85,
          filter: "blur(2px)",
          zIndex: 10,
        };
      case "right":
        return {
          ...common,
          transform: "translateX(-50%) scale(1)",
          left: isMobile ? "80%" : "70%",
          height: isMobile ? "16%" : "28%",
          bottom: isMobile ? "32%" : "12%",
          opacity: 0.85,
          filter: "blur(2px)",
          zIndex: 10,
        };
      case "back":
        return {
          ...common,
          transform: "translateX(-50%) scale(1)",
          left: "50%",
          height: isMobile ? "13%" : "22%",
          bottom: isMobile ? "32%" : "12%",
          opacity: 1,
          filter: "blur(4px)",
          zIndex: 5,
        };
      default:
        return common;
    }
  };

  if (!mounted) {
    return <section className="h-screen w-full bg-black" />;
  }

  return (
    <section
      className="relative h-[90vh] w-full overflow-hidden transition-colors duration-650 ease-in-out"
      style={{ backgroundColor: IMAGES[activeIndex].bg }}
    >
      <div 
        className="pointer-events-none absolute inset-0 z-50 opacity-[0.15]"
        style={{ 
          backgroundImage: `url("${GRAIN_DATA_URI}")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div
        className="absolute left-1/2 top-[18%] z-2 -translate-x-1/2 select-none font-display text-white uppercase leading-none tracking-tighter whitespace-nowrap opacity-100"
        style={{ fontSize: "clamp(10px, 28vw, 200px)" }}
      >
        Floryn wear
      </div>

      <div 
        className="absolute bottom-0 left-1/2 z-4 h-[60%] w-[80%] -translate-x-1/2 transition-all duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center bottom, ${IMAGES[activeIndex].panel}44 0%, transparent 70%)`,
        }}
      />

      <div className="absolute inset-0 z-10">
        {IMAGES.map((image, index) => {
          const role = getRole(index);
          return (
            <div
              key={image.src}
              className="absolute aspect-[0.6/1]"
              style={{ ...getStyles(role), width: isMobile ? "100%" : "auto" }}
            >
              <img
                src={image.src}
                alt={`Figurine ${index + 1}`}
                className="h-full w-full select-none object-contain object-bottom pointer-events-none"
                draggable={false}
              />
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-6 left-4 z-60 max-w-[320px] text-white sm:bottom-20 sm:left-24">
        <h2 className="text-base font-bold uppercase tracking-widest opacity-95 sm:text-[22px]">
          Wear Your Freedom
        </h2>
        <p className="mt-4 hidden text-sm leading-relaxed opacity-80 sm:block">
            Oversized streetwear. Dark luxury essentials. Built in Kathmandu.
        </p>
      </div>

      <div className="absolute bottom-6 left-1/2 z-70 flex -translate-x-1/2 gap-4 sm:bottom-12">
        <button
          onClick={() => navigate("prev")}
          disabled={isAnimating}
          className="group flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/40 text-white transition-all hover:scale-105 hover:border-white hover:bg-white/10 disabled:opacity-50 sm:h-16 sm:w-16"
          aria-label="Previous"
        >
          <ArrowLeft className="h-6 sm:h-8 w-6 sm:w-8" />
        </button>
        <button
          onClick={() => navigate("next")}
          disabled={isAnimating}
          className="group flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/40 text-white transition-all hover:scale-105 hover:border-white hover:bg-white/10 disabled:opacity-50 sm:h-16 sm:w-16"
          aria-label="Next"
        >
          <ArrowRight className="h-6 sm:h-8 w-6 sm:w-8" />
        </button>
      </div>

      <div className="absolute bottom-6 right-4 z-60 sm:bottom-20 sm:right-10">
        <Link
          href="/collections"
          className="group relative flex flex-col items-end font-display text-xl text-white uppercase sm:text-2xl"
        >
          <span>SHOP NOW</span>
          <div className="h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full" />
        </Link>
      </div>
    </section>
  );
}
