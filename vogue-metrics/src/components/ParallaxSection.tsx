import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
  children: ReactNode;
  bgImage: string;
  /** 0–1 parallax intensity (default 0.35) */
  intensity?: number;
  /** Extra overlay darkness 0–1 (default 0.72) */
  overlayOpacity?: number;
  className?: string;
  id?: string;
}

export function ParallaxSection({
  children,
  bgImage,
  intensity = 0.35,
  overlayOpacity = 0.72,
  className = "",
  id,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Background moves slower than scroll → parallax
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={ref} id={id} className={`relative overflow-hidden ${className}`}>
      {/* ── Parallax background ── */}
      <motion.div
        aria-hidden
        style={{
          y: bgY,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-[-20%] will-change-transform"
      />

      {/* ── Overlay gradient ── */}
      <div
        aria-hidden
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(
            to bottom,
            hsl(var(--ink) / ${overlayOpacity + 0.1}),
            hsl(var(--ink) / ${overlayOpacity - 0.1}) 40%,
            hsl(var(--ink) / ${overlayOpacity}) 70%,
            hsl(var(--ink) / ${overlayOpacity + 0.08})
          )`,
        }}
      />

      {/* ── Noise grain texture ── */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-20">{children}</div>
    </section>
  );
}
