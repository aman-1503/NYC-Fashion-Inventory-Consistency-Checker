# NYC Fashion Inventory Consistency Checker

A full-stack inventory monitoring system that detects stock inconsistencies and anomalies in retail supply chains.

## Features
- Inventory reconciliation across sales, restocks, and stock records
- ML-based anomaly detection using Isolation Forest
- Risk scoring for inventory discrepancies
- REST API exposing analytics endpoints
- React dashboard (coming next)

## API Endpoints

GET /top_risks  
Returns SKUs with highest inventory risk scores.

GET /anomalies  
Returns detected inventory anomalies.

## Tech Stack

Python  
Pandas  
Scikit-learn  
Flask  
React (dashboard)

## Architecture

Dataset → ML Pipeline → Flask API → Dashboard
