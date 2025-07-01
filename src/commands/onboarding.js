// onboarding-file acá se hace toda la magia

import chalk from "chalk";
import fs from "fs";
import {readdir} from "../controllers/file-system.js";
import {treeDefault, treeOneLine} from "../commons/output.js";

// onboarding-next-line comando principal cli
export default function onboarding(name, options, command) {

    const {oneline, files} = name;

    const directory = "./"
    const file = fs.readFileSync(`${directory}/package.json`, 'utf8');
    const packageJson = JSON.parse(file)
    const filesAndDirs = readdir(directory, directory, files);

    console.log('');
    console.log(chalk.dim('-'.repeat(100)));
    console.log(chalk.green(`${packageJson.name} ${packageJson.version}`));
    console.log(chalk.dim('-'.repeat(100)));

    if (oneline) {
        treeOneLine(filesAndDirs, '', false, files)
    } else {
        treeDefault(filesAndDirs)
    }

    console.log(chalk.dim('-'.repeat(100)));
    console.log('');
}




