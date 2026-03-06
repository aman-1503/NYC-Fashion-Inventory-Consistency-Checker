import { RiskRecord } from "@/hooks/useInventoryData";
import { cn } from "@/lib/utils";
import { Reveal } from "./EditorialLayout";

interface AnomaliesTableProps {
  data: RiskRecord[];
}

export function AnomaliesTable({ data }: AnomaliesTableProps) {
  return (
    <Reveal>
      <div className="glass-panel rounded-sm overflow-hidden border-destructive/20">
        <div className="px-8 py-6 border-b border-destructive/15 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-body font-medium tracking-[0.35em] uppercase text-destructive/70 mb-1">
              Anomaly Detection
            </p>
            <h3 className="font-editorial text-xl font-semibold text-foreground">
              Flagged Inventory Items
            </h3>
            <p className="text-xs font-body text-muted-foreground mt-1">Isolation Forest · 5% contamination threshold</p>
          </div>
          <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/20 px-4 py-2 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-pulse" />
            <span className="text-[10px] font-body font-semibold text-destructive tracking-wider uppercase">
              {data.length} Flagged
            </span>
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="border-b border-destructive/10 bg-destructive/5">
                {["Article ID", "Expected", "Recorded", "Qty Added", "Sales", "Discrepancy", "Risk Score"].map((h) => (
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
                    "border-b border-destructive/8 transition-colors duration-200 hover:bg-destructive/5",
                    "animate-fade-in",
                    i % 2 === 0 ? "bg-transparent" : "bg-destructive/[0.04]"
                  )}
                  style={{ animationDelay: `${i * 40}ms`, animationFillMode: "both" }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-pulse flex-shrink-0" />
                      <span className="font-mono text-xs font-medium text-foreground/90">{row.article_id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{row.expected_stock}</td>
                  <td className="px-6 py-4 text-muted-foreground">{row.recorded_stock}</td>
                  <td className="px-6 py-4 text-muted-foreground">{row.quantity_added}</td>
                  <td className="px-6 py-4 text-muted-foreground">{row.total_sales}</td>
                  <td className="px-6 py-4 font-mono text-xs font-semibold text-destructive">
                    +{row.discrepancy}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs font-bold text-destructive">{row.risk_score.toFixed(1)}</span>
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
