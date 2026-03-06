from pipeline.data_loader import load_sales_data
from pipeline.reconciliation import (
    build_inventory,
    generate_restock,
    generate_stock_records
)
from pipeline.anomaly_detection import detect_anomalies
from pipeline.risk_scoring import compute_risk_score


def run_pipeline():

    sales, articles = load_sales_data()

    inventory = build_inventory(sales)

    restock = generate_restock(inventory)

    recon = generate_stock_records(inventory, restock, sales)

    recon = detect_anomalies(recon)

    recon = compute_risk_score(recon)

    print("Pipeline completed")
    print("Total SKUs:", len(recon))
    print("Anomalies:", len(recon[recon["anomaly"] == -1]))

    return recon


if __name__ == "__main__":
    run_pipeline()