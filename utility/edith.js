import { execSync, spawn } from 'child_process';

export const runOne = (line) => {
    execSync(line, { stdio: 'inherit' });
};

export const changeDirectory = (dirLoc) => {
    console.log('Current directory', process.cwd());
    process.chdir(dirLoc);
    console.log('Changed directory', process.cwd());
};
