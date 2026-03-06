import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { RiskRecord } from "@/hooks/useInventoryData";
import { Reveal } from "./EditorialLayout";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

interface DiscrepancyChartProps {
  data: RiskRecord[];
}

export function DiscrepancyChart({ data }: DiscrepancyChartProps) {
  const buckets: Record<string, number> = {};
  data.forEach((r) => {
    const bucket = `${Math.floor(r.discrepancy_score)}`;
    buckets[bucket] = (buckets[bucket] || 0) + 1;
  });

  const sortedKeys = Object.keys(buckets).sort((a, b) => Number(a) - Number(b));

  const chartData = {
    labels: sortedKeys.map((k) => `Δ${k}`),
    datasets: [
      {
        label: "SKU Count",
        data: sortedKeys.map((k) => buckets[k]),
        borderColor: "rgba(156, 175, 136, 0.85)",
        backgroundColor: "rgba(156, 175, 136, 0.06)",
        pointBackgroundColor: "rgba(156, 175, 136, 1)",
        pointBorderColor: "rgba(0,0,0,0.6)",
        pointBorderWidth: 1.5,
        pointRadius: 4,
        pointHoverRadius: 7,
        tension: 0.45,
        fill: true,
        borderWidth: 1.5,
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        callbacks: { label: (ctx: any) => ` ${ctx.parsed.y} SKUs` },
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
        ticks: { color: "#444", font: { family: "Inter", size: 10 }, stepSize: 1 },
        border: { color: "rgba(255,255,255,0.05)" },
      },
    },
  };

  return (
    <Reveal delay={0.1}>
      <div className="glass-panel rounded-sm p-8">
        <div className="mb-6">
          <p className="text-[10px] font-body font-medium tracking-[0.35em] uppercase text-muted-foreground mb-1.5">
            Distribution
          </p>
          <h3 className="font-editorial text-xl font-semibold text-foreground">
            Discrepancy Spread
          </h3>
        </div>
        <div style={{ height: "260px" }}>
          <Line data={chartData} options={options} />
        </div>
      </div>
    </Reveal>
  );
}
