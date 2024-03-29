from bs4 import BeautifulSoup
import requests
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time
import json


def get_html (src, output): 
    driver = webdriver.Chrome()

    driver.get(src)

    new_height = driver.execute_script("return window.pageYOffset")
    prev_height = driver.execute_script("return document.body.scrollHeight")

    while True:
        driver.execute_script("window.scrollTo(0,{})".format(new_height + 50000))
        time.sleep(3)
        new_height = driver.execute_script("return window.pageYOffset")
        if prev_height == new_height: break
        else: prev_height = new_height

    with open(output, 'w') as f:
        f.write(driver.page_source)

    driver.close()

def get_url(file, src):
    cont = open(file, 'r')
    html = BeautifulSoup(cont, 'html.parser')
    urlset = []
    for i in range(1, 173):
        selector = "#Fin-Stream > ul > li:nth-child("+str(i)+") > div > div > div > h3 >a"
        item = html.select(selector)
        if item != [] : 
            url = item[0].attrs['href']
            if 'beap.gemini' in url: continue #skip ads
            else:
                srcurl = src + url
                urlset.append(srcurl)
        else : break
    print(len(urlset))
    return urlset

def get_news(urlset, final):
    if urlset == []:
        return 'url not exist'
    
    total_news = []
    headers = { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36" }
    for url in urlset:
        news={}

        try:
            raw = requests.get(url,headers=headers)
            html = BeautifulSoup(raw.text, "html.parser")
        except requests.exceptions.RequestException as e:
            print("Error occurred: ", e)
            continue
        
        try : html.select('#module-article > div')[0]
        except IndexError:
            print(url)
            break

        newsid = html.select('#module-article > div')[0].attrs['id']
        info = html.select("#{} > article > script:nth-child(1)".format(newsid))
        content = json.loads(info[0].contents[0])
        title = content['headline']
        keyword = content['keywords']
        provider = content['provider']['name']
        datepublished = content['datePublished']
        body = get_news_full(html, newsid)
        news['title'] = title
        news['keyword'] = keyword
        news['provider'] = provider
        news['datepublished'] = datepublished
        news['content'] = body
        total_news.append(news)
        

    with open(final, 'w', encoding='utf-8') as f:
        json.dump(total_news, f, ensure_ascii=False, indent='\t')

def get_news_full(html, newsid):
    full= html.select("#{} > article > div > div > div > div > div > div >div.caas-body".format(newsid))
    body=[]
    for line in full[0].contents:
        if line.attrs == {}:
            try:
                line = str(line).split('<p>')[1].split('</p>')[0]
                if 'Most Read from' in line : continue #skip ads
                else : body.append(line)
            except Exception as e:
                # print("error :" ,e)
                continue
    return body

def main():
    start_time = time.time()
    src = "https://finance.yahoo.com/news/"
    output = 'output.html'
    final = 'total_news.json'
    get_html (src, output)
    print("---%s seconds ---" % (time.time() - start_time))
    urlset = get_url(output, src)
    print("---%s seconds ---" % (time.time() - start_time))
    get_news(urlset, final)
    print("---%s seconds ---" % (time.time() - start_time))

if __name__ == '__main__':
    main()