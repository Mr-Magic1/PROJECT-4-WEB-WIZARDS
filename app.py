from flask import Flask,render_template,request,jsonify
import joblib
import os
from dotenv import load_dotenv

#movie
model_review=joblib.load("model_review.pkl")
vectorizer=joblib.load("vectorizer.pkl")
#spam
model_spam = joblib.load("model_spam.pkl")
tfidfvectorizer = joblib.load("TfidfVectorizer")
#diabetes
import pandas as pd
model_diabetes=joblib.load('model_diabetes.pkl')
scaler_diabetes=joblib.load('scaler_diabetes.pkl')
#churn
import pandas as pd
import pickle
import numpy as np
model_churn=joblib.load('model_churn.pkl')
scaler_churn=joblib.load('scaler_churn.pkl')
label_encoder_churn=joblib.load('label_encoders_churn.pkl')
#CHAT BOT
import google.generativeai as genai

# Flight 

model=joblib.load('model_flight.pkl')
feature_columns=joblib.load('feature_columns.pkl')

app=Flask(__name__)

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/about")
def about():
    return render_template("chiku.html")

# MOVIE REVIEW PREDICTION

@app.route("/review")
def review():
    return render_template('index_review.html')

@app.route("/review/predict",methods=["POST"])
def predict_review():
    data=request.get_json()
    review=data.get('message')
    review_tfidf=vectorizer.transform([review])
    prediction=model_review.predict(review_tfidf)[0].upper()
    return jsonify({"prediction":prediction})

# SPAM PREDICTION

@app.route('/spam')
def spam():
    return render_template('index_spam.html')

@app.route("/spam/predict", methods=["POST"])
def predict_spam():
    data = request.get_json()
    email = [data.get('email')]

    email_vec = tfidfvectorizer.transform(email)
    prediction = model_spam.predict(email_vec)

    result = "SPAM EMAIL" if prediction[0] == 1 else "NON-SPAM EMAIL"
    return jsonify({"prediction": result})


# DIABETES PREDICTION

@app.route("/diabetes")
def diabetes():
    return render_template('index_diabetes.html')

@app.route('/diabetes/predict',methods=['GET','POST'])
def predict_diabetes():
    data=request.get_json()
    pregnancies=int(data.get('pregnancies'))
    glucose=float(data.get('glucose'))
    bp=float(data.get('bp'))
    skin=float(data.get('skin'))
    insulin=float(data.get('insulin'))
    bmi=float(data.get('bmi'))
    dpf=float(data.get('dpf'))
    age=int(data.get('age'))

    user_input = pd.DataFrame([[pregnancies, glucose, bp, skin, insulin, bmi, dpf,age]],columns=['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 'Insulin','BMI', 'DiabetesPedigreeFunction', 'Age'])
    user_input_scaled = scaler_diabetes.transform(user_input)
    prediction = model_diabetes.predict(user_input_scaled)
    result="The patient is likely to have disease" if prediction[0]==1 else "The Patient is not likely to have disease"
    prob=model_diabetes.predict_proba(user_input_scaled)
    return jsonify({'prediction':result,'probability':prob[0][1]*100})


# CHURN PREDICTION



@app.route('/churn')
def churn():
    return render_template('index_churn.html')

@app.route('/churn/predict', methods=['POST'])
def predict_churn():

    input_data = {}
    # Get data from form
    data=request.get_json()
    for col in data:
        val = data.get(col)
        if col in label_encoder_churn:
            # Transform categorical input
            input_data[col] = label_encoder_churn[col].transform([val])[0]
        else:
            # Convert numeric input
            input_data[col] = float(val)

    # Convert to DataFrame in the correct order
    user_df = pd.DataFrame([input_data])
    user_scaled = scaler_churn.transform(user_df)
    
    prediction = model_churn.predict(user_scaled)
    result = "CHURN" if prediction[0] == 1 else "NOT CHURN"
    prob=model_churn.predict_proba(user_scaled)
    return jsonify({'prediction':result,'probability':prob[0][1]*100})


# CHAT BOT
load_dotenv()


def attempt(api):
    genai.configure(api_key=api)
    model_gemini = genai.GenerativeModel("gemini-2.5-flash")
    try:
        data=request.get_json()
        response = model_gemini.generate_content(data.get('ques'))
        return response.text
    except:
        return "exceeded"

@app.route('/chat')
def chat():
    return render_template('index_gemini.html')

@app.route("/chat/gemini", methods=["GET","POST"])
def gemini():
    for i in range(1,6):
        if i==1:
            response=attempt(os.getenv("GEMINI_API_KEY1"))
            if (response!="exceeded"):
                return ({'reply':response})
        elif i==2:
            response=attempt(os.getenv("GEMINI_API_KEY2"))
            if (response!="exceeded"):
                return ({'reply':response})
        elif i==3:
            response=attempt(os.getenv("GEMINI_API_KEYK"))
            if (response!="exceeded"):
                return ({'reply':response})
        elif i==4:
            response=attempt(os.getenv("GEMINI_API_KEYH"))
            if (response!="exceeded"):
                return ({'reply':response})
        elif i==5:
            response=attempt(os.getenv("GEMINI_API_KEYM"))
            if (response!="exceeded"):
                return ({'reply':response})
        else:
            return ({'reply':"Sorry, API key limit exceeded,Please try again later after some time"})


@app.route('/flight')
def flight():
    return render_template('index_flight.html')

@app.route('/flight/predict' ,methods=['POST'])
def predict_flight():
    data=request.get_json()
    airline=data.get('airline')
    source_city=data.get('source_city')
    destination_city=data.get('destination_city')
    stops=data.get('stops')
    duration=float(data.get('duration'))
    input=[airline,source_city,destination_city,stops,duration]
    input_data = pd.DataFrame( np.zeros((1, len(feature_columns))),columns=feature_columns ) 
    input_data["duration"] = duration 
    if f"airline_{airline}" in input_data.columns: 
        input_data[f"airline_{airline}"] = 1 
    if f"source_city_{source_city}" in input_data.columns: 
        input_data[f"source_city_{source_city}"] = 1 
    if f"destination_city_{destination_city}" in input_data.columns: 
        input_data[f"destination_city_{destination_city}"] = 1 
    if f"stops_{stops}" in input_data.columns: 
        input_data[f"stops_{stops}"] = 1 
    
    price=model.predict(input_data)[0]
    return jsonify({'reply':price})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

