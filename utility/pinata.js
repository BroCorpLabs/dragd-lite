import { execSync, spawn } from 'child_process';

export const runPinataCommand = (args, callback) => {
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
