from bs4 import BeautifulSoup
import requests
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time
import json
from tqdm import tqdm, trange


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
        selector = "#screenerDetail-0-Stream > ul > li:nth-child("+str(i)+") > div > div > div > h3 >a"
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


def get_keywords(urlset):
    if urlset == []:
        return 'url not exist'
    
    keywords = []
    headers = { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36" }
    for url in urlset:
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
        keyword = content['keywords']
        keywords.extend(keyword)
    keywords = list(set(keywords))

    return keywords
        


def main():
    keyword_file = 'keywords.json'
    keyword_dict = {}
    industries = ['ms_basic_materials', 'ms_communication_services', 'ms_consumer_cyclical', 'ms_consumer_defensive', 
              'ms_energy', 'ms_financial_services', 'ms_healthcare', 'ms_industrials', 'ms_real_estate', 'ms_technology', 'ms_utilities']
    
    for industry in tqdm(industries):
        src1 = "https://finance.yahoo.com/screener/predefined/"+industry+"/"
        src2 = "https://finance.yahoo.com/news/"
        output = "output_"+industry+".html"
        get_html(src1, output)
        urlset = get_url(output, src2)
        keywords = get_keywords(urlset)
        if industry not in keyword_dict:
            keyword_dict[industry] = keywords
    
    with open(keyword_file, 'w', encoding='utf-8') as f:
        json.dump(keyword_dict, f, ensure_ascii=False, indent='\t')


if __name__ == '__main__':
    main()