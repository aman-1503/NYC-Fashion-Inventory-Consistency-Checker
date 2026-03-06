from flask import Flask, jsonify
from flask_cors import CORS
from main import run_pipeline

app = Flask(__name__)
CORS(app)

# run pipeline once on server start
data = run_pipeline()


@app.route("/top_risks")
def top_risks():
    global data

    top = data.sort_values(
        by="risk_score",
        ascending=False
    ).head(20)

    return jsonify(top.to_dict(orient="records"))


@app.route("/anomalies")
def anomalies():
    global data

    anoms = data[data["anomaly_flag"] == 1]

    return jsonify(anoms.to_dict(orient="records"))


@app.route("/run_pipeline", methods=["POST"])
def run_pipeline_api():
    global data

    # re-run pipeline
    data = run_pipeline()

    return {
        "status": "Pipeline executed successfully",
        "total_skus": len(data),
        "anomalies": int((data["anomaly_flag"] == 1).sum())
    }


if __name__ == "__main__":
    app.run(debug=True)