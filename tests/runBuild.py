import requests

json_data = {
    'siteName': 'Article/index',
}


# api = '54.172.7.132'
api = 'localhost'

response = requests.post('http://' + api + ':8889/runDragdLiteBuild', json=json_data)
print(response.text)
