// onboarding-file acá se hace toda la magia

import chalk from "chalk";

import {createRequire} from 'node:module';
import {readdir} from "../controllers/file-system.js";
import {printTree} from "../commons/output.js";

const require = createRequire(import.meta.url);

const packageJson = require('../../package.json');


// onboarding-line imprime en consola
export default function init(name, options, command) {

    const {oneline, files} = name;

    const filesAndDirs = readdir("./");
    console.log('');
    console.log(chalk.dim('-'.repeat(120)));
    console.log(chalk.green(`${packageJson.name} ${packageJson.version}`));
    console.log(chalk.dim('-'.repeat(120)));

    printTree(filesAndDirs, '', false, oneline, files)

    console.log(chalk.dim('-'.repeat(120)));
    console.log('');
}




