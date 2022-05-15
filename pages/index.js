import Head from 'next/head';

import { useState } from 'react';
import { connectWallet } from '../utility/sol';
import buildConfig from '../buildData.json';

// ^^ Build config that allows you to staticly export a site and generate static html/css/js artifacts
// that can be pinned on ipfs and served up as a static site.

import DragDrop from '../lib/react-dragdrop-ui/src/DragDrop';
// ^^ That's the DragDrop lib, soon to be hosted on https://github.com/BroCorpLabs/react-dragdrop-ui
// TODO: Fix this, it's a bit of a hack, but it works for now.

const apiEndpoint = 'http://127.0.0.1:3000';
// ^^ This is the default endpoint for the Next API server. (refers to self)


export async function getStaticProps() {
    // Get the site you want to build from the build config
    // If you check the tests folder, you'll see we bring this in ondemand
    // from an endpoint on the build server (see build.js => /runDragdLiteBuild)

    var sitePath = buildConfig['siteName'];

    let data;
    try {
        // Retrieve the entire hunk of data for the site
        const fetchRes = await fetch(
            apiEndpoint + `/api/item-get-public?name=${sitePath}`,
        );
        data = await fetchRes.json();
        console.log(data.data);

        data.preload = true;
    } catch (e) {}
    return {
        // hydrated props are passed to the page component, revalidate isn't used here
        // as we're not using server side rendering (SSR) (yet)
        // https://nextjs.org/blog/next-12-1 (TODO: scope -> on demand incremental static regeneration)
        props: { data: data?.data ? data.data : null },
        revalidate: 60,
    };
}

export default function IndexPage({ data }) {
    // console.log(data);
    buildConfig['elemData'] = [];
    if (data) {
        Object.keys(data['page']).forEach((eachKey) => {
            buildConfig['elemData'].push(data['page'][eachKey]);
        });
    }

    // By now, we should have the data we need to render the site.
    // We'll use the DragDrop lib to render the site.
    let itemData = buildConfig['elemData'];
    

    console.log(itemData);
    const [wallet, setWallet] = useState(null);

    // For Dra.gd Lite Build Hunks

    return (
        <main className="bg-white text-black">
            <DragDrop
                immutable={false}
                saveCallback={(data) => {
                    console.log(data);
                }}
                onChangedCallback={(data) => {
                    console.log(data);
                }}
                initialState={itemData}
                pending
            />
            <div style={{ position: 'fixed', right: '20px', top: '20px' }}>
                <div className="flex items-center justify-end">
                    {
                        <button
                            className="bg-blue-500 hover:bg-blue-700 max-w-xs truncate text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={async () => {
                                !wallet && setWallet(await connectWallet());
                            }}
                        >
                            {!wallet && `Connect Wallet`}
                            {wallet && wallet}
                        </button>
                    }
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
