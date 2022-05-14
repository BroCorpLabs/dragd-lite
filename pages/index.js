import Head from 'next/head';

import Post from '../components/post';
import { useState } from 'react';
import { connectWallet } from '../utility/sol';
import buildConfig from '../buildData.json';
import DragDrop from '../lib/react-dragdrop-ui/src/DragDrop';
const apiEndpoint = 'http://127.0.0.1:3000';

export async function getStaticProps() {
    var sitePath = buildConfig['siteName'];

    let data;
    try {
        const fetchRes = await fetch(
            apiEndpoint + `/api/item-get-public?name=${sitePath}`,
        );
        data = await fetchRes.json();

        data.preload = true;
    } catch (e) {}
    return {
        props: { data: data?.data ? data.data : null },
        revalidate: 60,
    };
}

export default function IndexPage({ data }) {
    let itemData = data;
    console.log(itemData);
    const [wallet, setWallet] = useState(null);

    // For Dra.gd Lite Build Hunks

    return (
        <main className="bg-white text-black">
            <DragDrop 
                immutable={false}
                saveCallback={(data) => {console.log(data)}}
                onChangedCallback={(data) => {console.log(data)}}
                initialState={itemData}
                pending
            />
            <div style={{position: 'fixed', right: "20px", top: "20px"}}>

                <div className="flex items-center justify-end">
                            {<button
                                className="bg-blue-500 hover:bg-blue-700 max-w-xs truncate text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={async () => {
                                    !wallet && setWallet(await connectWallet());
                                }}
                            >
                                {!wallet && `Connect Wallet`}
                                {wallet && wallet}
                            </button>}
                </div>
            </div>

            <Head>
                <title>Dra.gd - Launch A dApp on Solana</title>
            </Head>

            <div className="container max-w-4xl mx-auto pt-16 md:pt-32 text-center break-normal">
                <p className="text-xl md:text-2xl text-gray-500">
                    Deploy a website on .sol
                </p>
            </div>

            <div className="max-w-md mx-auto bg-black rounded-xl overflow-hidden md:max-w-2xl">
                <div className="md:flex">
                    <div className="md:shrink-0">
                        <img
                            className="h-48 w-full object-cover md:h-full md:w-48"
                            src="/satellite.png"
                            alt="Man looking at item at a store"
                        ></img>
                    </div>
                    <div className="p-8">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                            Make your page
                        </div>
                        <a
                            href="#"
                            className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
                        >
                            Finding customers for your new business
                        </a>
                        <p className="mt-2 text-slate-500">
                            Getting a new business off the ground is a lot of
                            hard work.
                        </p>
                    </div>
                </div>
            </div>
            {/* <section>
          {postList.map((post) => (
            <Post {...post} key={post.id} />
          ))}
        </section> */}
        </main>
    );

    // For Dra.gd Hunks

    // return (
    //     <>
    //         {itemData && (
    //             <BCDragDrop
    //                 initialState={itemData?.page || {}}
    //                 saveCallback={(data) => {
    //                     console.log('got data to save:');
    //                     console.log(data);
    //                 }}
    //                 onChangedCallback={(data) => {}}
    //                 immutable={false}
    //                 pending={false}
    //             />
    //         )}
    //     </>
    // );
}
