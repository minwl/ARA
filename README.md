# ARA

## How to use
clone this repo on your local, feel free to commit anytime
```
git init
git add .
git commit . -m 'comment'
git push -u origin main

```

## Crawling
- **yahoo_latest.py** : crawiling the 'latest news without keyword' from yahoo finance (max 170)
- **yahoo_key.py** : crawiling the 'latest news with yahoo finance + keyword' from google search (max 100)
- **google.py** : crawiling the 'latest news with keyword' from google search (max 100)
- output examples of each py file

## Flask
- templates for webpage(html)
- javascript and css in static folder
- app.py is deployed in [testserverfords](https://testserverfords.azurewebsites.net/)
  - synced with this repo (update the web app automatically when commit is pushed on flask folder)

## Connect to Mongo DB (Azure Cosmos DB for Mongo DB)
 - Python에서 MongoDB로 연결하는 코드
 - 아래 사용된 Url은 Azure에서 생성한 Mongo DB로 연결하는 url
   - 개인 계정 Mongo DB에 연결하고 싶다면 url주소를 바꾸면 됨
 - User Info, Feedback은 Azure로 연결해두었고, testDB 내에 USER_INFO, FEEDBACK collection에 각각 따로 저장
```python
import pymongo

db_url = 'mongodb://acc0:yNof9Ynp06JlBUUHTAJ4tkXF5AotOndftrTnlZDSvoM4ugAMSdiY9myIWiz3yZbdzPfgNGtiNg6dACDbRyoj9A==@acc0.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@acc0@'
DB_NAME = 'testDB'
USER_COLLECTION = 'USER_INFO'

client = pymongo.MongoClient(db_url)  #python - Mongo DB connect
db = client[DB_NAME]

if DB_NAME not in client.list_database_names():  
    # Create a database with 400 RU throughput that can be shared across
    # the DB's collections
    db.command({"customAction": "CreateDatabase", "offerThroughput": 400})
    print("Created db '{}' with shared throughput.\n".format(DB_NAME))
else:
    print("Using database: '{}'.\n".format(DB_NAME))

user_db = db[USER_COLLECTION]

if USER_COLLECTION not in db.list_collection_names():
    # Creates a unsharded collection that uses the DBs shared throughput
    db.command(
        {"customAction": "CreateCollection", "collection": USER_COLLECTION}
    )
    print("Created collection '{}'.\n".format(USER_COLLECTION))
else:
    print("Using collection: '{}'.\n".format(USER_COLLECTION))

```

