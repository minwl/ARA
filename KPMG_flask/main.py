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

@app.route('/QA')
def QA():
    query = request.args.get("query")
    response = requests.get('http://41b8-35-232-204-199.ngrok.io/QA', {'input_text': query})
    answer = response.text
    
    return render_template('QA.html', QA=QA, answer=answer, query=query)

if __name__ == '__main__':
    webbrowser.open("http://127.0.0.1:5000")
    app.run(debug=True)