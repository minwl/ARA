from flask import Flask, redirect, render_template, request, send_from_directory, url_for
import requests
import pymongo

# db_url = 'mongodb://acc0:yNof9Ynp06JlBUUHTAJ4tkXF5AotOndftrTnlZDSvoM4ugAMSdiY9myIWiz3yZbdzPfgNGtiNg6dACDbRyoj9A==@acc0.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@acc0@'
db_url = "mongodb://ara-prod:LDBvT8AQvOdptEbDX2GU8sAL5ogUzDqpdvCHPQJgfSMmfLPqhWoLTXvuY8DTE0PPMuCLwOMgyGczACDbUJztYw==@ara-prod.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@ara-prod@"
DB_NAME = 'ARA_DB'
USER_COLLECTION = 'USER_INFO'
FEEDBACK_COLLECTION = 'FEEDBACK'

app = Flask(__name__)

client = pymongo.MongoClient(db_url)
db = client[DB_NAME]

sectors = ['MS_BASIC_MATERIALS', 'MS_COMMUNICATION_SERVICES', 'MS_CONSUMER_CYCLICAL', 'MS_CONSUMER_DEFENSIVE','MS_ENERGY','MS_FINANCIAL_SERVICES','MS_HEALTHCARE','MS_INDUSTRIALS','MS_REAL_ESTATE', 'MS_TECHNOLOGY','MS_UTILITIES']

if DB_NAME not in client.list_database_names():
    # Create a database with 400 RU throughput that can be shared across
    # the DB's collections
    db.command({"customAction": "CreateDatabase", "offerThroughput": 400})
    print("Created db '{}' with shared throughput.\n".format(DB_NAME))
else:
    print("Using database: '{}'.\n".format(DB_NAME))

user_db = db[USER_COLLECTION]
feedback_db = db[FEEDBACK_COLLECTION]

if USER_COLLECTION not in db.list_collection_names():
    # Creates a unsharded collection that uses the DBs shared throughput
    db.command(
        {"customAction": "CreateCollection", "collection": USER_COLLECTION}
    )
    print("Created collection '{}'.\n".format(USER_COLLECTION))
else:
    print("Using collection: '{}'.\n".format(USER_COLLECTION))

if FEEDBACK_COLLECTION not in db.list_collection_names():
    # Creates a unsharded collection that uses the DBs shared throughput
    db.command(
        {"customAction": "CreateCollection", "collection": FEEDBACK_COLLECTION}
    )
    print("Created collection '{}'.\n".format(FEEDBACK_COLLECTION))
else:
    print("Using collection: '{}'.\n".format(FEEDBACK_COLLECTION))


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

@app.route('/latest')
def latest():
    latest_json=[]
    for sector in sectors:
       sector_db = db[sector]
       cursor = sector_db.find().sort("_id", -1).limit(3)
       latest=list(cursor)
       titles = []
       for i in range(len(latest)):
           news = latest[i]
           titles.append(news['title'])

       sector_json = {
           'sector' : sector,
           'titles' : titles
       }
       latest_json.append(sector_json)
    return dict(success = 1, result = latest_json)

@app.route('/ask/<sector>/<query>', methods=['GET']) #여기서 sector query answer -> db로 저장, key_id값 받아서 html에 숨겨놓기
def ask(sector, query):
    if query:
        #    sector = query.split(';')[0]
        #    question = query.split(';')[1]

        #    connect to model output
        url = "https://ebf2-35-196-222-12.ngrok-free.app/QA"
        response = requests.get(url, {'input_text': query})
        answer = response.text

            #sample answer for test
        answer = 'this is sample answer'
        feedback = {
            'sector' : sector,
            'query' : query,
            'answer' : answer,
            'rate' : None
        }
        p = feedback_db.insert_one(feedback)
        key = str(p.inserted_id)
        
    return dict(success=1, result=[query, answer, key])
  
#db에 key 찾아서 rate항목 update
@app.route('/feedback/<key>/<rate>', methods=['GET'])
def feedback(key, rate):
   feedback_db.update_one({'_id': key}, {"$set": {'rate' : rate}})
   return dict(success=1, result=rate)


@app.route('/register/<newid>/<newpwd>/<newFirst>/<newLast>/<newEmail>', methods=['GET'])
def insertOne(newid, newpwd, newFirst, newLast, newEmail):
    queryObject = {
        'ID': newid,
        'PWD': newpwd,
        'Name' : {'First' : newFirst, 'Last' : newLast},
        'newEmail': newEmail
    }
    val = user_db.find_one({"ID" :newid})
    if val:
       return dict(success=0)
    else:
        query = user_db.insert_one(queryObject)
        return dict(success=1)

@app.route('/valid/<id>/<pwd>', methods=['GET'])
def validate(id, pwd):
    query = user_db.find_one({"ID" :id })
    if query:
        if query['PWD'] == pwd:
            return dict(success=1, username = query['Name']['First'])
        else:
           return dict(success=0, username = 1)
    else: return dict(success=0, username = 0)



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