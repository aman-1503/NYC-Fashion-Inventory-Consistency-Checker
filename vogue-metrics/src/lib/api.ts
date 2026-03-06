const API_BASE = "http://localhost:5000";

export async function getTopRisks() {
  const res = await fetch(`${API_BASE}/top_risks`);
  return res.json();
}

export async function getAnomalies() {
  const res = await fetch(`${API_BASE}/anomalies`);
  return res.json();
}