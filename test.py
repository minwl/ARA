import requests

url = "https://907a-35-223-201-67.ngrok-free.app/QA"

question = "What is Tesla's ~"
response = requests.get(url, params={'input_text': question})

print(response.text)