# **Student Performance Analytics, Rank-Prediction and College Prediction Software**

This project provides a service to analyze student quiz performance, predict NEET ranks, and suggest medical colleges based on predicted ranks.

## **Installation**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Abhigupta13/student-rank-predictor.git
   cd student-rank-predictor
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## **Start the Service**

To start the service, run:

```bash
node index.js
```

## **API Endpoints**

### **1. Analyze Student Performance**
- **Endpoint:** `GET http://localhost:3000/api/insights`
- **Description:** Analyzes quiz performance data to highlight weak areas, improvement trends, and performance gaps.

**Sample Response:**
```json
{
    "YcDFSO4ZukTJnnFMgRNVwZTE4j42": {
        "totalScore": 706.10,
        "totalQuestions": 777,
        "topicWise": {
            "Body Fluids and Circulation": { "correct": 65, "total": 300 },
            "Human Reproduction": { "correct": 10, "total": 89 }
        },
        "accuracy": 72.21,
        "weakAreas": [
            { "topic": "Human Reproduction", "accuracy": 11.23, "severity": "Critical" }
        ],
        "improvementTrends": [
            { "topic": "reproductive health ", "improvement": "27.27%" }
        ]
    }
}
```

---

### **2. Predict Student Rank**
- **Endpoint:** `GET http://localhost:3000/api/predict-rank`
- **Description:** Predicts the NEET rank based on a student's quiz performance.

**Sample Response:**
```json
{
    "YcDFSO4ZukTJnnFMgRNVwZTE4j42": {
        "predictedRank": 12000,
        "accuracy": 72.21,
        "totalScore": 706.10
    }
}
```

---

### **3. Suggest Colleges Based on Predicted Rank**
- **Endpoint:** `GET http://localhost:3000/api/suggest-colleges/:userId`
- **Description:** Suggests potential medical colleges a student might be admitted to based on their predicted NEET rank.

**Sample Response:**
```json
{
    "userId": "YcDFSO4ZukTJnnFMgRNVwZTE4j42",
    "predictedRank": 12000,
    "suggestedColleges": [
        "Government Medical College Nagpur",
        "Sardar Patel Medical College, Bikaner",
        "Indira Gandhi Medical College, Shimla",
        "Shri B. M. Patil Medical College, Bijapur",
        "Jawaharlal Nehru Medical College, Belgaum"
    ]
}
```

## **Data Sources**
The service fetches quiz data from the following sources:

- **Quiz Data:** [`https://www.jsonkeeper.com/b/LLQT`](https://www.jsonkeeper.com/b/LLQT)
- **Quiz Submission Data:** [`https://api.jsonserve.com/rJvd7g`](https://api.jsonserve.com/rJvd7g)
- **Historical Quiz Data:** [`https://api.jsonserve.com/XgAgFJ`](https://api.jsonserve.com/XgAgFJ)
