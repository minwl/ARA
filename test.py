import requests

url = "https://c8fa-35-224-221-240.ngrok-free.app/QA"

question = "What is Tesla's ~"
response = requests.get(url, params={'input_text': question})

print(response.text)