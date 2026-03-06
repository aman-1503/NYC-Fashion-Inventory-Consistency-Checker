import { RiskRecord } from "@/hooks/useInventoryData";
import { cn } from "@/lib/utils";
import { Reveal } from "./EditorialLayout";

interface TopRisksTableProps {
  data: RiskRecord[];
}

function RiskPill({ score }: { score: number }) {
  const level = score >= 6 ? "high" : score >= 3 ? "medium" : "low";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-body font-semibold tracking-wider uppercase",
        level === "high" && "bg-destructive/10 text-destructive border border-destructive/20",
        level === "medium" && "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
        level === "low" && "bg-matcha/10 text-matcha border border-matcha/20"
      )}
    >
      {level}
    </span>
  );
}

export function TopRisksTable({ data }: TopRisksTableProps) {
  return (
    <Reveal>
      <div className="glass-panel rounded-sm overflow-hidden border-white/8">
        <div className="px-8 py-6 border-b border-white/6 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-body font-medium tracking-[0.35em] uppercase text-muted-foreground mb-1">
              Inventory Risk
            </p>
            <h3 className="font-editorial text-xl font-semibold text-foreground">Top Risky SKUs</h3>
          </div>
          <span className="text-[10px] font-body font-semibold text-matcha bg-matcha/10 border border-matcha/20 px-3 py-1 rounded-full tracking-wider uppercase">
            {data.length} SKUs
          </span>
        </div>

        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="border-b border-white/5 bg-white/2">
                {["Article ID", "Total Sales", "Expected", "Recorded", "Discrepancy", "Risk Score", "Level"].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-left text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr
                  key={row.article_id}
                  className={cn(
                    "border-b border-white/4 transition-colors duration-200 hover:bg-white/4",
                    "animate-fade-in",
                    i % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"
                  )}
                  style={{ animationDelay: `${i * 30}ms`, animationFillMode: "both" }}
                >
                  <td className="px-6 py-4 font-mono text-xs font-medium text-foreground/90">{row.article_id}</td>
                  <td className="px-6 py-4 text-muted-foreground">{row.total_sales}</td>
                  <td className="px-6 py-4 text-muted-foreground">{row.expected_stock}</td>
                  <td className="px-6 py-4 text-muted-foreground">{row.recorded_stock}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "font-semibold font-mono text-xs",
                      row.discrepancy > 5 ? "text-destructive" : row.discrepancy > 2 ? "text-yellow-400" : "text-matcha"
                    )}>
                      +{row.discrepancy}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-px bg-border overflow-visible relative">
                        <div
                          className="absolute top-[-1px] left-0 h-[3px] rounded-full"
                          style={{
                            width: `${Math.min((row.risk_score / 12) * 100, 100)}%`,
                            background: row.anomaly_flag ? "hsl(var(--destructive))" : "hsl(var(--matcha))",
                          }}
                        />
                      </div>
                      <span className="font-mono text-xs text-foreground/80">{row.risk_score.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <RiskPill score={row.risk_score} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Reveal>
  );
}
