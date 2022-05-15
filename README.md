# Dra.gd Lite 💡

Drag and Drop Low code UI Builder ⛏ -> [dra.gd](dra.gd) built on [Next.js](https://nextjs.org/)  

## Deploy your own ✈️

You would need to bring up two services, [Moser](https://github.com/fega/mongo-server) and [Dra.gd Lite](https://github.com/BroCorpLabs/dragd-lite) 

### Moser 🧰

1. Installing dependencies
`npm i -g moser`

2. Running [Moser](https://github.com/fega/mongo-server)
`moser -p 3001 --mongo mongodb+srv://username:password@cluster0.js6zy.mongodb.net/cluster2.js6zy.mongodb.net?retryWrites=true&w=majority`


### Dragd-Lite ⛏

1. Installing dependencies
`git clone https://github.com/BroCorpLabs/dragd-lite`
`cd dragd-lite`
`npm i`

2. Running the builder service
`cd utility`
`node build.js`

3. Testing your site
`cd tests`
`python3 runBuild.py`


## How to use 📚

Create a site, example: `cryptodegen/index` where [cryptodegen](https://dra.gd/cryptozoo/index) is your site, and index is a sub route of your site.

Click on the edit button to the bottom right corner of your screen, add rich media to your heart's content and build out your site. 

`cd tests`
`nano runBuild.py` and change `siteName` to your `site` and `subRoute` for example `cryptodegen/index` 
`python3 runBuild.py`

Collect your `ipfsHash` from the response of the builder, you will use it to link your site to ENS (Ethereum) / SNS (Solana) 

### Solana 🔗

Head over to your domain on Bonfida, click `Edit Content`, specify: 
`ipfs=<ipfsHash>` you got in the above step, save, gas your transaction, and take your domain for a spin!

### Ethereum 🔗

WIP
TODO: Write docs for linking your domain to IPNS, and subsequently linking that property to ENS

## Roadmap 🏹

[ ] Automate `.sol` domain metadata linking on bonfida, [ref](https://github.com/BroCorpLabs/dragd-lite/issues/4)
[ ] Automate `.eth` domain metadata linking on IPNS, and subsequently documenting the same, [ref](https://github.com/BroCorpLabs/dragd-lite/issues/5)
