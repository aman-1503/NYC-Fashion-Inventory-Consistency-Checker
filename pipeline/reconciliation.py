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


import numpy as np

def generate_stock_records(inventory, restock, sales):

    # merge inventory + restock
    recon = inventory.merge(restock, on="article_id", how="left")

    # expected stock
    recon["expected_stock"] = (
        recon["initial_stock"]
        + recon["quantity_added"]
        - recon["total_sales"]
    )

    # simulate recorded stock (introduce small errors)
    recon["recorded_stock"] = (
        recon["expected_stock"] - np.random.randint(0, 5, len(recon))
    )

    return recon