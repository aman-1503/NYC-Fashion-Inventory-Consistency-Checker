from sklearn.ensemble import IsolationForest


def detect_anomalies(recon):

    features = recon[
        ["expected_stock", "recorded_stock", "total_sales", "quantity_added"]
    ]

    model = IsolationForest(
        contamination=0.05,
        random_state=42
    )

    recon["anomaly"] = model.fit_predict(features)

    return recon