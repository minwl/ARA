from flask import Flask, redirect, render_template, request, send_from_directory, url_for
import requests

app = Flask(__name__)

@app.route('/')
def welcome():
   print('Request for welcome page received')
   return render_template('welcome.html')

@app.route('/howto')
def howto():
   print('Request for how to page received')
   return render_template('howto.html')

@app.route('/index')
def index():
   print('Request for index page received')
   return render_template('index.html')

@app.route('/price')
def price():
   print('Request for price page received')
   return render_template('price.html')

@app.route('/api')
def myapi():
  query = request.args.get('query')
  if query:
   sector = query.split(';')[0]
   question = query.split(';')[1]  
   # response = requests.get('http://41b8-35-232-204-199.ngrok.io/QA', {'input_text': query})
   # answer = response.text
   return dict(success=1, result=[sector, question])

@app.route('/api2')
def myapi2():
  rate = request.args.get('rate')
  if rate:
   print(rate)
   # response = requests.get('http://41b8-35-232-204-199.ngrok.io/QA', {'input_text': query})
   # answer = response.text
   return dict(success=1, result=rate)


if __name__ == '__main__':
   app.run(debug=True)



# @app.route('/result', methods=['POST'])
# def result():
#    query = request.form.get('query')

#    if query:
#        print('Request for hello page received with query=%s' % query)
#        return render_template('result.html', query = query)
#    else:
#        print('Request for hello page received with no name or blank name -- redirecting')
#        return redirect(url_for('index'))   