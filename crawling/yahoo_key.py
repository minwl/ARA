import feedparser
import time
from newspaper import Article
import requests
from bs4 import BeautifulSoup
import json


def get_url(keyword):
    rss = 'https://news.google.com/rss/search?q=yahoo+finance+{}+when:1d&tbm=nws&tbs=qdr:d'.format(keyword) #yahoo news with keyword
    # rss = 'https://news.google.com/rss/search?q={}+when:1d&hl=en-NG&gl=NG&ceid=NG:en'.format(keyword) #google news with keyword
    news = feedparser.parse(rss).entries
    urlset = []
    for n in news:
        urlset.append(n.link)
    return urlset

def get_news(urlset, final):
    if urlset == []:
        return 'url not exist'
    print(len(urlset))
    
    total_news = []
    headers = { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36" }
    for url in urlset:
        news={}
        try:
            raw = requests.get(url, headers)
            raw.raise_for_status()
            html = BeautifulSoup(raw.text, "html.parser")
        except requests.exceptions.HTTPError as err:
            print(err)
            continue
        # print(html.select('#module-article > div'))
        
        try : html.select('#module-article > div')[0]
        except :
            print("newsid", url)
            continue

        newsid = html.select('#module-article > div')[0].attrs['id']
        # print(newsid)
        info = html.select("#{} > article > script:nth-child(1)".format(newsid))
        try : info[0]
        except : 
            try : info = html.select("#{} > article > script:nth-child(2)".format(newsid))
            except : continue
        
        if info != []: 
            content = json.loads(info[0].contents[0])
            title = content['headline']
            keyword = content['keywords']
            provider = content['provider']['name']
            datepublished = content['datePublished']
            newurl = content['mainEntityOfPage']
            body = get_news_full(newurl)
            news['title'] = title
            news['keyword'] = keyword
            news['provider'] = provider
            news['datepublished'] = datepublished
            news['content'] = body
            total_news.append(news)
        
        else: continue
        
    with open(final, 'w', encoding='utf-8') as f:
        json.dump(total_news, f, ensure_ascii=False, indent='\t')

def get_news_full(url):
    article = Article(url, language='en')
    article.download()
    article.parse()
    return article.text


def main():
    start_time = time.time()
    final = 'yahoo_keyword.json'
    keyword = 'apple'
    urlset = get_url(keyword)
    print("---%s seconds ---" % (time.time() - start_time))
    get_news(urlset, final)
    print("---%s seconds ---" % (time.time() - start_time))

if __name__ == '__main__':
    main()