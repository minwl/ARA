from flask import Flask, redirect, render_template, request, send_from_directory, url_for

app = Flask(__name__)

@app.route('/')
def index():
   print('Request for index page received')
   return render_template('index.html')

# @app.route('/api')
# def myapi():
#   args = request.args
#   query = args.get('query')
#   if query:  return dict(success=1, result=query)
#   else : return redirect(url_for('index'))

# @app.route('/result', methods=['POST'])
# def result():
#    query = request.form.get('query')

#    if query:
#        print('Request for hello page received with query=%s' % query)
#        return render_template('result.html', query = query)
#    else:
#        print('Request for hello page received with no name or blank name -- redirecting')
#        return redirect(url_for('index'))


if __name__ == '__main__':
   app.run(debug=True)