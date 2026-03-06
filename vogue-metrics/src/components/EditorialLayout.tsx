import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}

export function Reveal({ children, delay = 0, className = "", direction = "up" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const initial =
    direction === "up"
      ? { opacity: 0, y: 40 }
      : direction === "left"
      ? { opacity: 0, x: -40 }
      : direction === "right"
      ? { opacity: 0, x: 40 }
      : { opacity: 0 };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface SectionHeaderProps {
  index: string;
  label: string;
  title: string;
  subtitle?: string;
}

export function SectionHeader({ index, label, title, subtitle }: SectionHeaderProps) {
  return (
    <Reveal className="mb-10">
      <div className="flex items-start gap-6">
        <span className="font-editorial text-5xl font-bold text-border leading-none select-none mt-1">
          {index}
        </span>
        <div>
          <p className="text-xs font-body font-medium tracking-[0.4em] uppercase text-matcha mb-2">
            {label}
          </p>
          <h2 className="font-editorial text-3xl md:text-4xl font-semibold text-foreground leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm font-body text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export function EditorialRule({ label }: { label?: string }) {
  return (
    <Reveal className="py-4" direction="none">
      {label ? (
        <div className="editorial-divider">
          <span className="text-xs font-body tracking-[0.4em] uppercase text-muted-foreground whitespace-nowrap">
            {label}
          </span>
        </div>
      ) : (
        <div className="w-full h-px bg-border" />
      )}
    </Reveal>
  );
}
