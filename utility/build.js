require('dotenv').config();
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const { execSync, spawn } = require('child_process');

const app = express();
const port = 8888;
app.use(cors());
app.use(express.json());

const runOne = (line) => {
    execSync(line, { stdio: 'inherit' });
};

const changeDirectory = (dirLoc) => {
    console.log('Current directory', process.cwd());
    process.chdir(dirLoc);
    console.log('Changed directory', process.cwd());
};

const runPinataCommand = (args, callback) => {
    console.log('🦄 🦄 🦄 [Pinata CLI] 🦄 🦄 🦄');

    //   if (args[0] !== "get" && args[1] !== "file") {
    //     args.push("--raw");
    //     args.push("|");
    //     args.push("jq");
    //     args.push("-sr");
    //     args.push(".");
    //   }
    const line = args.join(' ');

    const child = spawn('sh', ['-c', `pinata-cli ${line}`]);

    let scriptOutput = '';

    child.stdout.setEncoding('utf8');
    child.stdout.on('data', function (data) {
        // console.log('stdout: ' + data);

        data = data.toString();
        scriptOutput += data;
    });

    child.stderr.setEncoding('utf8');
    child.stderr.on('data', function (data) {
        // console.log('stderr: ' + data);

        data = data.toString();
        scriptOutput += data;
    });

    child.on('close', function (code) {
        callback(scriptOutput, code);
    });
};

const runDragdToIpfsBuild = (siteName) => {
    // console.log('Logging into Pinata...');
    changeDirectory('../../../');
    runOne('rm -rf dragd-lite');
    runOne('git clone https://github.com/BroCorpLabs/dragd-lite');
    changeDirectory('dragd-lite');
    runOne('npm i');
    runOne('npm run libpull');
    changeDirectory('lib/react-dragdrop-ui');
    runOne('npm run libpull');
    runOne('npm i');
    changeDirectory('../../');
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
    runPinataCommand(['-u', 'out'], function (output, exitCode) {
        console.log(output, exitCode);
    });
    changeDirectory('../GitHub/dragd-lite/utility');
    // runOne('rm -rf dragd-lite')
};

app.post('/runDragdLiteBuild', (req, res) => {
    // res.send('Ack!');
    // brobotPost(req.body['message']);
    res.status(200).json({ siteName: req.body.siteName });
    runDragdToIpfsBuild(req.body.siteName);
});

app.listen(port, () => {
    console.log(`Edith listening at http://0.0.0.0:${port}`);
    (async () => {
        runPinataCommand(
            ['-a', `${process.env.PINATA_TOKEN}`],
            function (output, exitCode) {
                console.log(output, exitCode);
            },
        );
    })();
});
