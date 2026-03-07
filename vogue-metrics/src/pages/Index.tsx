import { useInventoryData } from "@/hooks/useInventoryData";
import { HeroSection } from "@/components/HeroSection";
import { KPICard } from "@/components/KPICard";
import { TopRisksTable } from "@/components/TopRisksTable";
import { AnomaliesTable } from "@/components/AnomaliesTable";
import { RiskScoreChart } from "@/components/RiskScoreChart";
import { DiscrepancyChart } from "@/components/DiscrepancyChart";
import { SectionHeader, EditorialRule } from "@/components/EditorialLayout";
import { CollageSection } from "@/components/CollageSection";
import { Package, AlertTriangle, ShieldCheck, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const { topRisks, anomalies, loading, usingMock } = useInventoryData();

  const runAnalysis = async () => {
  try {
    const res = await fetch(
      "https://nyc-fashion-inventory-consistency-checker.onrender.com/run_pipeline",
      {
        method: "POST",
      }
    );

    const data = await res.json();
    console.log("Pipeline result:", data);

    // wait a bit for render cold start
    setTimeout(() => {
      window.location.reload();
    }, 2000);

  } catch (err) {
    console.error("Pipeline error:", err);
  }
};

  const totalSKUs = topRisks.length;
  const anomalyCount = anomalies.length;

  const avgExpected =
    topRisks.reduce((s, r) => s + r.expected_stock, 0) /
    Math.max(topRisks.length, 1);

  const avgRecorded =
    topRisks.reduce((s, r) => s + r.recorded_stock, 0) /
    Math.max(topRisks.length, 1);

  const accuracy =
    avgExpected > 0 ? ((avgRecorded / avgExpected) * 100).toFixed(1) : "—";

  return (
    <div className="min-h-screen bg-background text-foreground">

      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 h-12 flex items-center justify-between">

          <span className="italic text-sm text-foreground/40">
            Inventory Intelligence
          </span>

          <div className="flex items-center gap-6">

            <a href="#metrics" className="text-xs uppercase tracking-widest text-muted-foreground">
              Metrics
            </a>

            <a href="#analytics" className="text-xs uppercase tracking-widest text-muted-foreground">
              Analytics
            </a>

            <a href="#risks" className="text-xs uppercase tracking-widest text-muted-foreground">
              Risk Ranking
            </a>

            <a href="#anomalies" className="text-xs uppercase tracking-widest text-muted-foreground">
              Anomalies
            </a>

            <button
              onClick={runAnalysis}
              className="bg-matcha text-black px-3 py-1 rounded text-xs uppercase tracking-widest"
            >
              Run Analysis
            </button>

          </div>
        </div>
      </nav>

      <HeroSection />

      {loading && (
        <div className="flex items-center justify-center py-40">
          <RefreshCw className="h-5 w-5 animate-spin text-matcha" />
        </div>
      )}

      {!loading && (
        <>

          <section id="metrics" className="py-16 max-w-[1400px] mx-auto px-6">

            <SectionHeader
              index="01"
              label="Performance Metrics"
              title="At a Glance"
              subtitle="Inventory health indicators"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

              <KPICard
                label="Total SKUs"
                value={totalSKUs}
                icon={<Package className="h-5 w-5" />}
              />

              <KPICard
                label="Anomalies"
                value={anomalyCount}
                icon={<AlertTriangle className="h-5 w-5" />}
              />

              <KPICard
                label="Accuracy"
                value={`${accuracy}%`}
                icon={<ShieldCheck className="h-5 w-5" />}
              />

            </div>

          </section>

          <section id="analytics" className="py-16 max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

            <RiskScoreChart data={topRisks} />

            <DiscrepancyChart data={topRisks} />

          </section>

          <section id="risks" className="py-16 max-w-[1400px] mx-auto px-6">

            <SectionHeader
              index="02"
              label="Risk Ranking"
              title="Top Risky SKUs"
              subtitle="Highest risk items"
            />

            <TopRisksTable data={topRisks} />

          </section>

          <section id="anomalies" className="py-16 max-w-[1400px] mx-auto px-6">

            <SectionHeader
              index="03"
              label="Machine Learning"
              title="Flagged Anomalies"
              subtitle="Items detected by Isolation Forest"
            />

            <AnomaliesTable data={anomalies} />

          </section>

        </>
      )}

      <footer className="border-t border-border/30 py-10 text-center">

        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Isolation Forest · Risk Scoring v1.0
        </p>

        <p className="text-xs text-matcha mt-2">
          {usingMock ? "Sample Mode" : "● Live"}
        </p>

      </footer>

    </div>
  );
};

export default Index;
