import pandas as pd
import numpy as np


def load_sales_data():

    tx = pd.read_csv("data/transactions_sample.csv")
    art = pd.read_csv("data/articles.csv")

    # rename column
    tx = tx.rename(columns={"t_dat": "timestamp"})

    # each row = 1 sale
    tx["quantity_sold"] = 1

    # simulate store ids
    stores = [
        "NYC_STORE_1",
        "NYC_STORE_2",
        "NYC_STORE_3",
        "NYC_STORE_4",
        "NYC_STORE_5"
    ]

    tx["store_id"] = np.random.choice(stores, len(tx))

    sales = tx[[
        "timestamp",
        "article_id",
        "quantity_sold",
        "price",
        "store_id"
    ]]

    return sales, art