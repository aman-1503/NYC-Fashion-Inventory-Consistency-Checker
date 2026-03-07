import { useState, useEffect } from "react";

export interface RiskRecord {
  article_id: number;
  total_sales: number;
  initial_stock: number;
  quantity_added: number;
  expected_stock: number;
  recorded_stock: number;
  timestamp: string;
  anomaly: number;
  discrepancy: number;
  discrepancy_score: number;
  anomaly_flag: number;
  risk_score: number;
}

// Mock data if API completely fails
const generateMockRisks = (): RiskRecord[] => {
  const ids = [
    108775015, 372860001, 524012001, 693212001, 759347002,
    819930002, 875036001, 899948001, 923528001, 940456001,
    110065001, 222222002, 333333003, 444444004, 555555005,
    666666006, 777777007, 888888008, 999999009, 101010101
  ];

  return ids.map((id, i) => ({
    article_id: id,
    total_sales: 30 + Math.floor(Math.random() * 120),
    initial_stock: 150 + Math.floor(Math.random() * 100),
    quantity_added: 20 + Math.floor(Math.random() * 60),
    expected_stock: 80 + Math.floor(Math.random() * 80),
    recorded_stock: 75 + Math.floor(Math.random() * 75),
    timestamp: "2018-09-15",
    anomaly: i < 5 ? -1 : 1,
    discrepancy: 1 + Math.floor(Math.random() * 8),
    discrepancy_score: 1 + Math.floor(Math.random() * 8),
    anomaly_flag: i < 5 ? 1 : 0,
    risk_score: (3 + Math.random() * 7) * (i < 5 ? 2 : 1),
  })).sort((a, b) => b.risk_score - a.risk_score);
};

const generateMockAnomalies = (): RiskRecord[] => {
  return generateMockRisks().filter((r) => r.anomaly === -1);
};

export function useInventoryData() {
  const [topRisks, setTopRisks] = useState<RiskRecord[]>([]);
  const [anomalies, setAnomalies] = useState<RiskRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMock, setUsingMock] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      try {

        const risksRes = await fetch(
          "https://nyc-fashion-inventory-consistency-checker.onrender.com/top_risks"
        );

        const anomaliesRes = await fetch(
          "https://nyc-fashion-inventory-consistency-checker.onrender.com/anomalies"
        );

        if (!risksRes.ok || !anomaliesRes.ok) {
          throw new Error("API response not OK");
        }

        const risks = await risksRes.json();
        const anoms = await anomaliesRes.json();

        setTopRisks(risks);
        setAnomalies(anoms);
        setUsingMock(false);

      } catch (err) {

        console.error("API error:", err);

        // fallback only if API truly fails
        setTopRisks(generateMockRisks());
        setAnomalies(generateMockAnomalies());
        setUsingMock(true);
        setError("API unavailable — displaying sample data");

      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, []);

  return { topRisks, anomalies, loading, error, usingMock };
}
