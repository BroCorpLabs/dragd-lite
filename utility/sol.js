import * as web3 from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, AccountLayout, u64 } from "@solana/spl-token";

// import { getPhantomWallet } from "@solana/wallet-adapter-wallets";
// import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";

var connectedWallet = null;
var web3connection = null;

const getProvider = async () => {
    if ("solana" in window) {
      const provider = window.solana;
      if (provider.isPhantom) {
        console.log("Is Phantom installed?  ", provider.isPhantom);
        return provider;
      }
    } else {
      window.open("https://www.phantom.app/", "_blank");
    }
  };

export const connectWallet = async () => {
    try {
        const provider = await getProvider();
        const resp = await provider.connect();
        connectedWallet = resp;

        // Establishing connection
        web3connection = new web3.Connection(
            web3.clusterApiUrl('mainnet-beta'), "confirmed"
        );

        // var pk = new web3.PublicKey(connectedWallet.publicKey);

        getNFTS();
        return resp.publicKey.toString();
    } catch (err) {
        // { code: 4001, message: 'User rejected the request.' }
    }
}

export async function getNFTS()
{
    var tokenAccounts = await getTokenAccountsByOwner(web3connection,new web3.PublicKey(connectedWallet.publicKey));
    console.log(JSON.stringify(tokenAccounts));
}

export async function getTokenAccountsByOwner (conn, publicKey) {
    let res = await conn.getParsedTokenAccountsByOwner(publicKey, { programId: TOKEN_PROGRAM_ID })
    return res.value.reduce((r, acc) => {
        let { account, pubkey } = acc
        let { mint, tokenAmount } = account.data.parsed.info
        if (r[mint]) {
            console.log("Duplicate Account", mint, tokenAmount, pubkey.toBase58())
            console.log(r[mint])
        }

        r[mint] = {
            mint,
            pubkey,
            amount: tokenAmount
        }
        return r
    }, {})
}

export const getWalletOfNft = async (nft) => {
    const provider = await getProvider();
    const resp = await provider.getTokenLargestAccounts(nft);
    return resp;
}