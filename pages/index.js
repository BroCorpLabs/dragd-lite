import Head from 'next/head'

import Post from '../components/post'
import { useState } from 'react'
import {connectWallet} from '../utility/sol'

export async function getStaticProps() {
  // fetch list of posts
  // const response = await fetch(
  //   'https://jsonplaceholder.typicode.com/posts?_page=1'
  // )
  // const postList = await response.json()
  return {
    props: {
      // postList,
    },
  }
}

export default function IndexPage({ 
  // postList
  }) {

  const [wallet, setWallet] = useState(null)
  return (
    <main className="bg-black text-white">
      <Head>
        <title>Dra.gd - Launch A dApp on Solana</title>
      </Head>

      <div className="container max-w-4xl mx-auto pt-16 md:pt-32 text-center break-normal">
        <p className="text-xl md:text-2xl text-gray-500"> Deploy a website on .sol </p>
      </div>

      <div className="max-w-md mx-auto bg-black rounded-xl overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:shrink-0">
          <img className="h-48 w-full object-cover md:h-full md:w-48" src="/satellite.png" alt="Man looking at item at a store"></img>
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Make your page</div>
          <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Finding customers for your new business</a>
          <p className="mt-2 text-slate-500">Getting a new business off the ground is a lot of hard work.</p>
        </div>
      </div>
    </div>

    <div className="py-8"></div>


  <div className="w-full mx-auto max-w-md">
  <form className="bg-white shadow-md text-black rounded px-8 pt-6 pb-8 mb-4">
<div className="flex items-center justify-center">
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={async ()=>{setWallet(await connectWallet())}}>
    Connect Wallet
  </button>  
</div>
<div>
  {wallet && wallet}
</div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
        Solana domain
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="simple.sol">
      </input>
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
        Elemdata
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="{}">
      </input>
    </div>

    {/* <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
        Your NFTs
      </label>
      select your nfts
    </div> */}

    <div className="flex items-center justify-between">
      
      <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Clear
      </a>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Next
      </button>
    </div>
    </form>
    </div>

      {/* <section>
        {postList.map((post) => (
          <Post {...post} key={post.id} />
        ))}
      </section> */}
    </main>
  )
}
