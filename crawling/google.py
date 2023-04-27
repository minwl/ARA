import feedparser
import time
from newspaper import Article
import requests
from bs4 import BeautifulSoup
import json

def get_url(keyword, output):
    # rss = 'https://news.google.com/rss/search?q=yahoo+finance+{}+when:1d&tbm=nws&tbs=qdr:d'.format(keyword)
    rss = 'https://news.google.com/rss/search?q={}+when:1d&hl=en-NG&gl=NG&ceid=NG:en'.format(keyword)
    news = feedparser.parse(rss).entries
    total = []
    for n in news:
        n_dict = {}
        url = n.link
        n_dict['title'] = n.title.split(' - ')[0]
        article = get_news_full(url)
        if not article : 
            continue
        try : n_dict['body'] = article.text
        except : n_dict['body'] = ''
        try : n_dict['keyword'] = article.meta_keywords
        except : n_dict['keyword'] = ''
        try : n_dict['section'] = article.meta_data['article']['section']
        except : n_dict['section'] = ''
        try : n_dict['provider'] = article.meta_data['og']['site_name']
        except : n_dict['provider'] = n.title.split(' - ')[1]
        total.append(n_dict)

    with open(output, 'w', encoding='utf-8') as f:
        json.dump(total, f, ensure_ascii=False, indent='\t')  

def get_news_full(url):
    article = Article(url)
    try : 
        article.download()
        article.parse()
    except : return False
    
    return article



def main():
    # keyword = input('Enter keyword : ')
    keyword = 'apple'
    output = 'google_test.json'
    start_time = time.time()
    get_url(keyword, output)
    print("---%s seconds ---" % (time.time() - start_time))


if __name__ == '__main__':
    main()