# PROJECT-4-WEB-WIZARDS
# 🌐 AI-Powered Machine Learning Web Application

A full-stack web application that integrates multiple **Machine Learning prediction models** and an **AI chatbot** into a single platform.  
This project demonstrates how trained ML models can be deployed and accessed through a **user-friendly web interface**.

---

## 🚀 Project Overview

This web application allows users to interact with various machine learning models for real-world prediction tasks.  
All models are deployed on a live website using Flask, enabling real-time predictions without requiring technical expertise.

### 🔍 Features
- Flight Price Prediction
- Diabetes Prediction
- Customer Churn Prediction
- Movie Review Sentiment Analysis
- Spam Message Detection
- AI Chatbot (Google Gemini)

---

## 🧠 Machine Learning Models Used

| Model | Description |
|------|------------|
| Flight Price Prediction | Predicts flight ticket prices based on travel features |
| Diabetes Prediction | Predicts diabetes risk using medical parameters |
| Churn Prediction | Identifies customers likely to leave a service |
| Movie Review Analysis | Classifies reviews as positive or negative |
| Spam Detection | Detects spam messages |
| AI Chatbot | Provides conversational assistance using Gemini API |

---

## 🛠️ Tech Stack

### Machine Learning
- Python
- Pandas
- NumPy
- Scikit-learn
- Joblib / Pickle

### Web Development
- Flask
- HTML5
- CSS3
- JavaScript
- Jinja2

### Deployment & Tools
- Render (or similar cloud platform)
- Git & GitHub
- Environment Variables (`.env`)

---

## 🤖 Google Technologies Used

- **Google Gemini API** – AI chatbot integration
- REST API integration standards
- Secure environment variable management

---

## 🎯 Problem Statement

Machine learning models are often limited to research and notebooks.  
This project solves the problem of **making ML models accessible to real users** by deploying them on a web platform where predictions can be obtained instantly.

---

## 📂 Project Structure
├── static/ <br>
│ ├── css/ <br>
│ └── js/ <br>
├── templates/ <br>
│ ├── index.html <br>
│ └── ...  <br>
├── models/ <br>
│ ├── flight_model.pkl <br>
│ ├── diabetes_model.pkl <br>
│ └── ...  <br>
├── app.py <br>
├── requirements.txt <br>
├── .env.example <br>
└── README.md

## Link of the Website : https://project-4-web-wizards-3.onrender.com/



On deployment platforms, add these keys in the **Environment Variables** section.
<br>create a .env file locally and <br>
write GEMINI_API_KEY1='your own generated API key'
---

## ▶️ How to Run Locally

1. Clone the repository:
```bash
git clone https://github.com/Mr-Magic1/PROJECT-4-WEB-WIZARDS.git
```
2. Install dependencies: 
```
pip install -r requirements.txt
```
3. Run the application 
```
python app.py
```
4. Open in browser
```
http://127.0.0.1:5000
```
## 📜 License

This project is for educational and learning purposes.

## 🙌 Author

```
1. Kailash Vishwakarma (Team Leader) 
Managed - Backend and Machine Learning
Machine Learning & Web Development Enthusiast
```
```
2. Khushboo Yadav 
Managed - Frontend Design of the website
The Designer
```
```
3. Hartik Verma
Managed - Machine learning and team support