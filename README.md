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

## flask
- templates for webpage(html)
- javascript and css in static folder
- app.py is deployed in [testserverfords.](https://testserverfords.azurewebsites.net/)
  - synced with this repo (update the web app automatically when committed has happened)
