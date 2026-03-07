from flask import Flask, jsonify
from flask_cors import CORS
from main import run_pipeline
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


# run pipeline once on server start
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
    anoms = data[data["anomaly_flag"] == 1]

    return jsonify(anoms.to_dict(orient="records"))


@app.route("/run_pipeline", methods=["POST"])
def run_pipeline_api():
    global data

    # re-run pipeline and update dataset
    data = run_pipeline()

    return {
        "status": "Pipeline executed successfully",
        "total_skus": len(data),
        "anomalies": int((data["anomaly_flag"] == 1).sum())
    }


@app.route("/")
def health():
    return {"status": "API running"}


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
