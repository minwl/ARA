from flask import Flask, render_template
from flask import request
from flask import g
import requests
import psycopg2
import pandas as pd
import webbrowser

app = Flask(__name__)

@app.route('/')

def index():
    return render_template('index.html')

@app.route('/second_diag')
def second_diag():
    query = request.args.get("query")
    response = requests.get('http://03c6-35-240-254-151.ngrok.io/predict', {'input_text': query})
    summarized_text = response.text
    
    return render_template('second_diag.html', second_diag=second_diag, summarized_text = summarized_text)

if __name__ == '__main__':
    webbrowser.open("http://127.0.0.1:5000")
    app.run(debug=True)