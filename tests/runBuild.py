import requests

json_data = {
    'siteName': 'dragdrop/index',
}

response = requests.post('http://localhost:8889/runDragdLiteBuild', json=json_data)
print(response.text)
