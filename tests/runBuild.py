import requests

json_data = {
    'siteName': 'cryptodegen/index',
}

response = requests.post('http://localhost:3000/api/build', json=json_data)
print(response.text)
