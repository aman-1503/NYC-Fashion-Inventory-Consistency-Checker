import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ─── Types ──────────────────────────────────── */
export interface CutoutDef {
  src: string;
  /** Tailwind positional classes  e.g. "top-8 left-4" */
  pos: string;
  /** Width in px */
  w: number;
  /** Base rotation in deg */
  rotate: number;
  /** 0–1 opacity of the finished element */
  opacity: number;
  /** "portrait" | "landscape" | "square" */
  aspect?: "portrait" | "landscape" | "square";
  /** Caption below polaroid */
  caption?: string;
  /** Polaroid frame */
  polaroid?: boolean;
  /** Hidden on mobile */
  mdOnly?: boolean;
  /** Flip horizontally */
  flipX?: boolean;
  /** Parallax Y scroll multiplier — positive = moves down, negative = up */
  parallaxFactor?: number;
}

interface CollageSectionProps {
  children: ReactNode;
  cutouts: CutoutDef[];
  id?: string;
  className?: string;
}

/* Gentle ambient float */
function useFloatAnim(i: number) {
  const yAmt = 5 + (i % 3) * 3;
  const dur  = 5.5 + (i % 5) * 0.9;
  return {
    animate: { y: [0, -yAmt, 0], rotate: [0, (i % 2 === 0 ? 0.35 : -0.35), 0] },
    transition: { duration: dur, repeat: Infinity, ease: "easeInOut" as const, delay: i * 0.65 },
  };
}

/* Single parallax cutout */
function ParallaxCutout({ cut, index, sectionProgress }: {
  cut: CutoutDef;
  index: number;
  sectionProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const factor = cut.parallaxFactor ?? (index % 2 === 0 ? 0.12 : -0.08);
  const y = useTransform(sectionProgress, [0, 1], [`${-factor * 100}%`, `${factor * 100}%`]);

  const { pos, w, rotate, opacity, aspect = "portrait", caption, polaroid, mdOnly, flipX, src } = cut;
  const h = aspect === "portrait" ? Math.round(w * 1.35) : aspect === "landscape" ? Math.round(w * 0.65) : w;

  const float = useFloatAnim(index);

  const imgBlock = (
    <div className="relative overflow-hidden" style={{ width: w, height: h }}>
      <img
        src={src}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
        style={{ transform: flipX ? "scaleX(-1)" : undefined }}
      />
      {/* edge vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </div>
  );

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: opacity, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1.2, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ y, rotate: `${rotate}deg`, position: "absolute" }}
      className={`z-10 select-none pointer-events-none ${pos} ${mdOnly ? "hidden md:block" : ""}`}
    >
      <motion.div animate={float.animate} transition={float.transition}>
        {polaroid ? (
          <div
            className="shadow-2xl"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(2px)",
              padding: "6px 6px 26px 6px",
            }}
          >
            {imgBlock}
            {caption && (
              <p
                className="text-center font-editorial italic text-white/35 mt-1"
                style={{ fontSize: 9, letterSpacing: "0.1em" }}
              >
                {caption}
              </p>
            )}
          </div>
        ) : (
          <div className="shadow-xl">{imgBlock}</div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─── Main export ─────────────────────────────── */
export function CollageSection({ children, cutouts, id, className = "" }: CollageSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={sectionRef} id={id} className={`relative bg-background overflow-hidden ${className}`}>
      {cutouts.map((cut, i) => (
        <ParallaxCutout key={i} cut={cut} index={i} sectionProgress={scrollYProgress} />
      ))}
      <div className="relative z-20">{children}</div>
    </section>
  );
}
