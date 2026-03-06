import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./EditorialLayout";

interface KPICardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon?: ReactNode;
  accent?: boolean;
  danger?: boolean;
  delay?: number;
}

export function KPICard({ label, value, sub, icon, accent, danger, delay = 0 }: KPICardProps) {
  return (
    <Reveal delay={delay}>
      <div
        className={cn(
          "relative rounded-sm overflow-hidden group transition-all duration-500",
          "glass-panel",
          accent ? "border-matcha/50 shadow-matcha" : danger ? "border-destructive/30" : "border-white/8"
        )}
      >
        {/* top glow line */}
        {accent && (
          <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-matcha via-matcha/50 to-transparent" />
        )}
        {danger && (
          <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-destructive via-destructive/50 to-transparent" />
        )}
        {!accent && !danger && (
          <div className="absolute top-0 left-0 h-[1px] w-0 bg-matcha group-hover:w-full transition-all duration-700 ease-out" />
        )}

        {/* subtle inner glow */}
        <div
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
            accent
              ? "bg-radial-matcha"
              : danger
              ? "bg-radial-danger"
              : "bg-radial-neutral"
          )}
        />

        <div className="relative z-10 p-8 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-2">
            <span className="text-[10px] font-body font-medium tracking-[0.35em] uppercase text-muted-foreground">
              {label}
            </span>
            {icon && (
              <span
                className={cn(
                  "opacity-40 group-hover:opacity-80 transition-opacity",
                  accent ? "text-matcha" : danger ? "text-destructive" : "text-silver"
                )}
              >
                {icon}
              </span>
            )}
          </div>

          <div>
            <p
              className={cn(
                "font-editorial text-5xl font-bold leading-none tracking-tight",
                accent ? "text-matcha" : danger ? "text-destructive" : "text-foreground"
              )}
            >
              {value}
            </p>
            {sub && (
              <p className="mt-3 text-xs font-body text-muted-foreground leading-relaxed">{sub}</p>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
