# How do I run this?

# Steps:
# 1. Run `cd utility`
# 2. Run `node build.js`

# On a seperate terminal
# 1. Run `cd tests`
# 2. Run `python3 runBuild.py`

import requests

json_data = {
    "siteName": "loki.sol/index",
}

# `siteName` is essentially a ref to your site hosted on web2 dra.gd
# (you can make this by signing up for a free account on dra.gd)

# api = '54.172.7.132' # production
api = "localhost"  # local

response = requests.post(f"http://{api}:8889/runDragdLiteBuild", json=json_data)
print(response.text)

# You're mostly interested in the `ipfsHash` as you need to link that to your `.sol` domain

# Steps:
# In your bonfida metadata, 
# you can set `ipfs=<cid>` 
# where `<cid>` is the `ipfsHash` you get from the `runDragdLiteBuild` endpoint
# (you can get the `ipfsHash` by running `node build.js` followed by `python3 runBuild.py`)