import os
import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler


def run_pipeline():

    base_dir = os.path.dirname(__file__)

    articles_path = os.path.join(base_dir, "data", "articles.csv")
    transactions_path = os.path.join(base_dir, "data", "transactions_sample.csv")

    articles = pd.read_csv(articles_path)
    transactions = pd.read_csv(transactions_path)

    # ------------------------------------------------
    # Compute how many times each item was sold
    # ------------------------------------------------
    sales = transactions.groupby("article_id").size().reset_index(name="recorded_stock")

    df = articles.merge(sales, on="article_id", how="left")

    df["recorded_stock"] = df["recorded_stock"].fillna(0)

    # ------------------------------------------------
    # Simulate expected stock
    # ------------------------------------------------
    np.random.seed(42)

    df["expected_stock"] = df["recorded_stock"] + np.random.randint(-3, 3, size=len(df))

    df["expected_stock"] = df["expected_stock"].clip(lower=0)

    # ------------------------------------------------
    # Inventory discrepancy
    # ------------------------------------------------
    df["discrepancy"] = abs(df["expected_stock"] - df["recorded_stock"])

    # risk score
    df["risk_score"] = (
        df["discrepancy"] * 0.7 +
        df["recorded_stock"] * 0.3
    )

    # ------------------------------------------------
    # ML features
    # ------------------------------------------------
    features = df[["expected_stock", "recorded_stock", "discrepancy"]]

    scaler = StandardScaler()
    X = scaler.fit_transform(features)

    # ------------------------------------------------
    # Isolation Forest
    # ------------------------------------------------
    model = IsolationForest(
        contamination=0.03,
        random_state=42
    )

    preds = model.fit_predict(X)

    df["anomaly"] = preds

    df["anomaly_flag"] = np.where(df["anomaly"] == -1, 1, 0)

    return df