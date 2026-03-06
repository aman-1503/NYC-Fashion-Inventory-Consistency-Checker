# Vogue Metrics Dashboard

Frontend analytics dashboard for the **NYC Fashion Inventory Consistency Checker**.

This dashboard visualizes inventory discrepancies, risk scores, and anomalies detected by the backend machine learning pipeline.

## Tech Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- shadcn-ui
- Recharts

## Features

- KPI overview of inventory health
- SKU risk ranking
- Discrepancy analytics
- Isolation Forest anomaly detection visualization
- Run inventory analysis directly from the UI

## Running Locally

Install dependencies:
npm install


Start the development server:


npm run dev


The dashboard will run on:


http://localhost:8080


## Backend API

The dashboard connects to the Flask API running at:


http://127.0.0.1:5000


Endpoints used:


GET /top_risks
GET /anomalies
POST /run_pipeline


## Project Structure


vogue-metrics
│
├── src
│ ├── components
│ ├── hooks
│ ├── pages
│ └── assets
│
├── package.json
├── vite.config.ts
└── README.md