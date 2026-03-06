def compute_risk_score(recon):

    recon["discrepancy"] = (
        recon["expected_stock"] - recon["recorded_stock"]
    )

    recon["discrepancy_score"] = recon["discrepancy"].abs()

    recon["anomaly_flag"] = recon["anomaly"].apply(
        lambda x: 1 if x == -1 else 0
    )

    recon["risk_score"] = (
        recon["discrepancy_score"] * 0.7 +
        recon["anomaly_flag"] * 3
    )

    return recon