import numpy as np


def build_inventory(sales):

    inventory = sales.groupby("article_id")["quantity_sold"].sum().reset_index()
    inventory = inventory.rename(columns={"quantity_sold": "total_sales"})

    inventory["initial_stock"] = (
        inventory["total_sales"] + np.random.randint(20, 100, len(inventory))
    )

    return inventory


def generate_restock(inventory):

    restock = inventory.copy()

    restock["quantity_added"] = np.random.randint(20, 80, len(restock))
    restock["timestamp"] = "2018-09-15"

    return restock[["article_id", "quantity_added", "timestamp"]]


def generate_stock_records(inventory, restock, sales):

    sales_per_sku = sales.groupby("article_id")["quantity_sold"].sum().reset_index()
    sales_per_sku = sales_per_sku.rename(columns={"quantity_sold": "total_sales"})

    recon = inventory.merge(restock, on="article_id")
    recon = recon.merge(sales_per_sku, on="article_id")

    recon["expected_stock"] = (
        recon["initial_stock"] +
        recon["quantity_added"] -
        recon["total_sales"]
    )

    recon["recorded_stock"] = (
        recon["expected_stock"] - np.random.randint(0, 5, len(recon))
    )

    return recon