from flask import Flask, jsonify
from main import run_pipeline

app = Flask(__name__)

data = run_pipeline()


@app.route("/top_risks")
def top_risks():

    top = data.sort_values(
        by="risk_score",
        ascending=False
    ).head(20)

    return jsonify(top.to_dict(orient="records"))


@app.route("/anomalies")
def anomalies():

    anoms = data[data["anomaly"] == -1]

    return jsonify(anoms.to_dict(orient="records"))


if __name__ == "__main__":
    app.run(debug=True)