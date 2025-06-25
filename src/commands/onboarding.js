// onboarding-file acá se hace toda la magia

import chalk from "chalk";

import {createRequire} from 'node:module';
import {readdir} from "../controllers/file-system.js";
import {treeDefault, treeOneLine} from "../commons/output.js";

const require = createRequire(import.meta.url);

const packageJson = require('../../package.json');


// onboarding-next-line comando principal cli
export default function onboarding(name, options, command) {

    const {oneline, files} = name;

    const filesAndDirs = readdir("./");
    console.log('');
    console.log(chalk.dim('-'.repeat(120)));
    console.log(chalk.green(`${packageJson.name} ${packageJson.version}`));
    console.log(chalk.dim('-'.repeat(120)));

    if(oneline){
        treeOneLine(filesAndDirs, '', false, files)
    } else {
        treeDefault(filesAndDirs)
    }

    console.log(chalk.dim('-'.repeat(120)));
    console.log('');
}




