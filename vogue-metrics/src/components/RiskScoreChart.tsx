import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { RiskRecord } from "@/hooks/useInventoryData";
import { Reveal } from "./EditorialLayout";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface RiskScoreChartProps {
  data: RiskRecord[];
}

export function RiskScoreChart({ data }: RiskScoreChartProps) {
  const top10 = data.slice(0, 10);

  const chartData = {
    labels: top10.map((r) => `…${String(r.article_id).slice(-5)}`),
    datasets: [
      {
        label: "Risk Score",
        data: top10.map((r) => parseFloat(r.risk_score.toFixed(2))),
        backgroundColor: top10.map((r) =>
          r.anomaly_flag === 1
            ? "rgba(239, 68, 68, 0.55)"
            : "rgba(156, 175, 136, 0.45)"
        ),
        borderColor: top10.map((r) =>
          r.anomaly_flag === 1
            ? "rgba(239, 68, 68, 0.85)"
            : "rgba(156, 175, 136, 0.75)"
        ),
        borderWidth: 1,
        borderRadius: 2,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(10,10,10,0.92)",
        titleColor: "#F5F5F5",
        bodyColor: "#888",
        borderColor: "rgba(255,255,255,0.08)",
        borderWidth: 1,
        padding: 12,
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: (ctx: any) => {
            const row = top10[ctx.dataIndex];
            return [` Risk: ${ctx.parsed.y}`, ` Anomaly: ${row.anomaly_flag === 1 ? "Yes" : "No"}`];
          },
        },
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(255,255,255,0.03)" },
        ticks: { color: "#444", font: { family: "Inter", size: 10 } },
        border: { color: "rgba(255,255,255,0.05)" },
      },
      y: {
        grid: { color: "rgba(255,255,255,0.03)" },
        ticks: { color: "#444", font: { family: "Inter", size: 10 } },
        border: { color: "rgba(255,255,255,0.05)" },
      },
    },
  };

  return (
    <Reveal>
      <div className="glass-panel rounded-sm p-8">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="text-[10px] font-body font-medium tracking-[0.35em] uppercase text-muted-foreground mb-1.5">
              Risk Analytics
            </p>
            <h3 className="font-editorial text-xl font-semibold text-foreground">
              Risk Score by SKU
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-matcha" />
              <span className="text-[10px] font-body text-muted-foreground uppercase tracking-wider">Normal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
              <span className="text-[10px] font-body text-muted-foreground uppercase tracking-wider">Anomaly</span>
            </div>
          </div>
        </div>
        <div style={{ height: "260px" }}>
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </Reveal>
  );
}
