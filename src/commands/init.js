// onboarding-file acá se hace toda la magia
import fs from 'fs';
import path from 'path';
import chalk from "chalk";

import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);

const packageJson = require('../../package.json');

const IGNORED_DIRS = [
    'node_modules',
    '.git',
    'dist'
];

const INCLUDED_PATTERNS = [
    /\.js$/,
    /\.jsx$/,
    /\.ts$/,
];

const ONBOARDING_FILE = '// onboarding-file '
const ONBOARDING_LINE = '// onboarding-line '

const COLUMN_WIDTH = 30;
const DATA_LINE_WIDTH = 30;

// onboarding-line imprime en consola
export default function init(name, options, command) {
    const filesAndDirs = readdir("./");

    console.log('');
    console.log(chalk.dim('-'.repeat(120)));
    console.log(chalk.green(`${packageJson.name} ${packageJson.version}`));
    console.log(chalk.dim('-'.repeat(120)));

    printTree(filesAndDirs)

    console.log(chalk.dim('-'.repeat(120)));
    console.log('');
}

// onboarding-line formatea el arbol
function printTree(nodes, prefix = '', isLast = true) {
    nodes.forEach((node, index) => {
        const last = index === nodes.length - 1;
        const branch = last ? '└── ' : '├── ';
        const newPrefix = prefix + (last ? '    ' : '│   ');

        if (node.folder) {
            console.log(
                chalk.dim(prefix + branch) +
                chalk.yellow(node.folder + '/')
            );
            printTree(node.files, newPrefix, last);
        } else if (node.file) {
            const parts = node.file.split(/[/\\]/);
            const filename = parts[parts.length - 1];

            const prefixBranch = prefix + branch;

            console.log(
                chalk.dim(prefixBranch) +
                // chalk.cyan(filename.padEnd(55 - prefixBranch.length, ' ')),
                chalk.cyan(filename),
                node.onboarding ?
                    chalk.white('→ ') +
                    chalk.gray(node.onboarding?.replace(ONBOARDING_FILE, '')) :
                    ''
            );

            if (node.lines) {
                node.lines.forEach((line, i) => {

                    const lastLine = i === node.lines.length - 1;
                    const branchLine = lastLine ? '└── ' : '├── ';
                    const lastL = lastLine ? '        ' : '    │   ';

                    // console.log(
                    //     chalk.dim(prefix + '    ' + branchLine) +
                    //     chalk.white(line.onboarding.replace(ONBOARDING_LINE, ''))
                    // );


                    const prefixSubBranch = prefix + '    ' + branchLine;

                    const textLine = line.line.length > DATA_LINE_WIDTH ?
                        line.line.substring(0, DATA_LINE_WIDTH) + '... ' :
                        line.line.padEnd(DATA_LINE_WIDTH + 3 , ' ') + ' '

                    console.log(
                        chalk.dim(prefixSubBranch) +
                        chalk.dim(line.number.padEnd(3, ' ') + ' - ') +
                        chalk.cyanBright(textLine) +
                        chalk.white(line.onboarding.replace(ONBOARDING_LINE, ''))
                    );

                    // console.log(
                    //     chalk.dim(prefix + lastL)
                    // )
                })
            }

            // if (node.lines) {
            //     node.lines.forEach((line, i) => {
            //
            //         const lastLine = i === node.lines.length - 1;
            //         const branchLine = lastLine ? '└── ' : '├── ';
            //         const lastL = lastLine ? '        ' : '    │   ';
            //
            //         console.log(
            //             chalk.dim(prefix + '    ' + branchLine) +
            //             chalk.white(line.onboarding.replace(ONBOARDING_LINE, ''))
            //         );
            //         console.log(
            //             chalk.dim(prefix + lastL ) +
            //             chalk.dim(line.number.padEnd(3, ' ') + ' - ') +
            //             chalk.cyanBright(line.line)
            //         );
            //
            //         console.log(
            //             chalk.dim(prefix + lastL)
            //         )
            //     })
            // }

            // if (node.onboarding) {
            //
            //     const obBranch = node.lines.length > 0 ? '├── ' : '└── '
            //
            //     console.log(
            //         chalk.dim(prefix + '    ' + obBranch) +
            //         chalk.white(node.onboarding.replace(ONBOARDING_FILE, ''))
            //     );
            // }

            // if (node.lines) {
            //     node.lines.forEach((line, i) => {
            //
            //         const lastLine = i === node.lines.length - 1;
            //         const branchLine = lastLine ? '└── ' : '├── ';
            //         const lastL = lastLine? '        ':'    │   ';
            //
            //         console.log(
            //             chalk.dim(prefix + '    ' + branchLine) +
            //             chalk.cyanBright(line.line)
            //         );
            //         console.log(
            //             chalk.dim(prefix + lastL + '' + '└── ') +
            //             chalk.white(line.onboarding.replace(ONBOARDING_LINE, ''))
            //         );
            //
            //         console.log(
            //             chalk.dim(prefix + lastL)
            //         )
            //     })
            // }

        }
    });
}

// onboarding-line hace la lectura del directorio
function readdir(dir, baseDir = dir) {
    const results = [];

    const entries = fs.readdirSync(dir, {withFileTypes: true});

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory() && IGNORED_DIRS.includes(entry.name)) {
            continue;
        }

        if (!entry.isDirectory() && !INCLUDED_PATTERNS.some(pattern => pattern.test(entry.name))) {
            continue;
        }

        if (entry.isDirectory()) {
            results.push({
                folder: entry.name,
                files: readdir(fullPath, baseDir)
            });
            continue;
        }

        const filePath = path.relative(baseDir, fullPath);
        const file = {
            file: filePath
        }

        const contenido = fs.readFileSync(filePath, 'utf8');
        const lineas = contenido.split(/\r?\n/); // Divide por líneas (compatible con Windows y Unix)

        file.lines = []

        for (let i = 0; i < lineas.length; i++) {
            const linea = lineas[i];
            const siguiente = lineas[i + 1];

            if (linea.startsWith(ONBOARDING_FILE)) {
                file.onboarding = linea;
            }

            if (linea.startsWith(ONBOARDING_LINE)) {
                console.log(`Línea encontrada: ${linea}`);

                const line = {
                    number: `${i + 2}`,
                    line: siguiente,
                    onboarding: linea,
                }

                file.lines.push(line)
            }
        }

        console.log(file)

        results.push(file);

    }

    return results;
}
