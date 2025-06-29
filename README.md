 Credit Card Fraud Detection System

🧠 Overview
This project is a machine learning-based web application that detects fraudulent credit card transactions. It combines data preprocessing, anomaly detection, supervised classification, and a web interface to identify and flag potentially fraudulent activities.

---

 📦 Dataset
- Source**: [Kaggle - Credit Card Fraud Detection](https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud)
- Description**: Contains transactions made by European cardholders in September 2013. It includes 284,807 transactions, 492 of which are frauds.

---

 ⚙️ Tech Stack
- Backend: Flask, scikit-learn, XGBoost, joblib
- Frontend: Built using Workik/BOLT generated UI (HTML/CSS/JS)
- ML Models:
  - XGBoost Classifier (Supervised Learning)
  - Isolation Forest & LOF (Anomaly Detection - Optional)

---

 🛠 Features
- Predict if a transaction is "Legitimate" or "Fraudulent"
- Displays prediction probability
- Color-coded feedback (Red = Fraud, Green = Legitimate)
- Clean and responsive UI for users

---

🚀 How to Run
1. Clone this repo
```bash
git clone https://github.com/your-username/fraud-detection-system.git
cd fraud-detection-system
```

 2. Set up Python environment
```bash
pip install -r requirements.txt
```

 3. Train and Save Model *(if not already)*
```python
# Run training script to generate xgb_fraud_model.pkl and scaler.pkl
python train_model.py
```

 4. Start Flask Server
```bash
python app.py
```

 5. Open the Frontend
- Open `index.html` in your browser or deploy it using a simple HTTP server

---

 📊 Model Details
- Algorithm: XGBoost Classifier
- Evaluation:
  - Accuracy, Precision, Recall
  - ROC-AUC Score
- Handling Imbalance:
  - Undersampling of majority class (legit)
  - StandardScaler applied to 'Amount'

---

📎 Folder Structure
```
├── backend
│   ├── app.py
│   ├── xgb_fraud_model.pkl
│   ├── scaler.pkl
├── frontend
│   ├── index.html
│   ├── style.css
│   └── script.js
├── train_model.py
├── requirements.txt
└── README.md
```

---

 ✅ Future Improvements
- Deploy with Streamlit or Flask + hosting (e.g., Heroku, Render)
- Add login/authentication for admin tracking
- Save transaction logs to a database

---

 📌 Acknowledgements
- Elevate Lab Internship Team
- Kaggle Community for open datasets

---

_This project was developed as part of the Elevate Lab AI/ML Internship Final Project._
