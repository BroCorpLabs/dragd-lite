import { runPinataCommand } from '../../utility/pinata';
import { runOne, changeDirectory } from '../../utility/edith';
import 'dotenv/config';
import fs from 'fs';

const runDragdToIpfsBuild = (siteName) => {
    // console.log('Logging into Pinata...');
    // runPinataCommand(
    //     ['-a', `${process.env.PINATA_TOKEN}`],
    //     function (output, exitCode) {
    //         console.log(output, exitCode);
    //     },
    // );
    changeDirectory('../../')
    runOne('git clone https://github.com/BroCorpLabs/dragd-lite');
    changeDirectory('dragd-lite')
    console.log('Change siteName in buildData.json, programatically...');
    const buildData = JSON.parse(
        fs.readFileSync('./buildData.json', {
            encoding: 'utf8',
            flag: 'r',
        }),
    );
    console.log('Hunk swap...');
    buildData['siteName'] = siteName;
    console.log('Triggering build...', buildData['siteName']);
    runOne('npm run export');
    changeDirectory('../')
    // runOne('rm -rf dragd-lite')
};

export default function handler(req, res) {
    //   console.log(req);
    if (req.method === 'POST') {
        // Process a POST request
        res.status(200).json({ siteName: req.body.siteName });
        runDragdToIpfsBuild(req.body.siteName);
    } else {
        // Handle any other HTTP method
    }
}
