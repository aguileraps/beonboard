// onboarding-file helper para formateo de salidas en consola
import chalk from "chalk";

// onboarding-line formatea el arbol
import {
    DIRECTIVE_NEXT_LINE,
    DIRECTIVE_ONBOARDING_FILE,
    DIRECTIVE_ONBOARDING_LINE
} from "./constants.js";


export const COLUMN_WIDTH = 100;
export const DATA_LINE_WIDTH = 30;

export function printTree(nodes, prefix = '', isLast = true, oneline = false, onlyFiles = false) {
    nodes.forEach((node, index) => {
        const last = index === nodes.length - 1;
        const branch = last ? '└── ' : '├── ';
        const newPrefix = prefix + (last ? '    ' : '│   ');

        if (node.folder) {
            if (node.files.length > 0) {
                console.log(
                    chalk.dim(prefix + branch) +
                    chalk.yellow(node.folder + '/')
                );
                printTree(node.files, newPrefix, last, oneline, onlyFiles);
            }
        } else if (node.file) {
            const parts = node.file.split(/[/\\]/);
            const filename = parts[parts.length - 1];

            const prefixBranch = prefix + branch;

            if (node.onboarding.length > 0) {

                console.log(
                    chalk.dim(prefixBranch) +
                    chalk.cyan(filename)
                );

                node.onboarding.forEach((line, i) => {
                    console.log(
                        chalk.dim(newPrefix + '│') +
                        chalk.white(normalize(line))
                    );
                })

                console.log(chalk.dim(newPrefix + '    '));

            }

            // const fileOBNormalizado = node.onboarding?.replace(DIRECTIVE_ONBOARDING_FILE, '') || null;
            //
            // if (oneline) {
            //
            //     const fileOBOneLine = fileOBNormalizado?.length > COLUMN_WIDTH ?
            //         fileOBNormalizado.substring(0, COLUMN_WIDTH - 3 - prefixBranch.length) + '... ' :
            //         fileOBNormalizado
            //
            //     console.log(
            //         chalk.dim(prefixBranch) +
            //         // chalk.cyan(filename.padEnd(55 - prefixBranch.length, ' ')),
            //         chalk.cyan(filename),
            //         node.onboarding ?
            //             chalk.white('→ ') +
            //             chalk.gray(fileOBOneLine) :
            //             ''
            //     );
            // } else if (fileOBNormalizado) {
            //
            //     console.log(
            //         chalk.dim(prefixBranch) +
            //         chalk.cyan(filename)
            //     );
            //
            //
            //     for (let i = 0; i < fileOBNormalizado.length; i += COLUMN_WIDTH) {
            //         console.log(
            //             chalk.dim(prefix + '   │ ') +
            //             chalk.white(fileOBNormalizado.slice(i, i + COLUMN_WIDTH))
            //         );
            //     }
            //
            //     console.log(chalk.dim(prefix + '    '));
            //
            // }

            if (onlyFiles === true) {
                return;
            }

            if (node.lines) {
                node.lines.forEach((line, i) => {

                    const lastLine = i === node.lines.length - 1;
                    const branchLine = lastLine ? '└── ' : '├── ';

                    const prefixSubBranch = prefix + '    ' + branchLine;

                    const textLine = line.line.length > DATA_LINE_WIDTH ?
                        line.line.substring(0, DATA_LINE_WIDTH - 3) + '... ' :
                        line.line.padEnd(DATA_LINE_WIDTH + 3, ' ') + ' '

                    const normalizedOb = line.onboarding.replace(DIRECTIVE_ONBOARDING_LINE, '');

                    if (oneline) {
                        const maxLargo = COLUMN_WIDTH - textLine.length - prefixSubBranch.length - 6;
                        const obt = normalizedOb.length > maxLargo ?
                            normalizedOb.substring(0, maxLargo) + '...' :
                            normalizedOb;

                        console.log(
                            chalk.dim(prefixSubBranch) +
                            chalk.dim(line.number.padEnd(3, ' ') + ' - ') +
                            chalk.cyanBright(textLine) +
                            chalk.white(obt)
                        );
                    } else {
                        console.log(
                            chalk.dim(prefixSubBranch) +
                            chalk.dim(line.number.padEnd(3, ' ') + ' - ') +
                            chalk.cyanBright(line.line)
                        );
                        console.log(
                            chalk.dim(prefixSubBranch) +
                            chalk.white(normalizedOb)
                        );
                    }
                })
            }

        }
    });
}

function normalize(text) {
    return text.trim()
        .replace(DIRECTIVE_ONBOARDING_FILE, '')
        .replace(DIRECTIVE_ONBOARDING_LINE, '')
        .replace(DIRECTIVE_NEXT_LINE, '')
}
