// onboarding-file helper para formateo de salidas en consola
import chalk from "chalk";
import {
    DIRECTIVE_FILE,
    DIRECTIVE_LINE,
    DIRECTIVE_NEXT_LINE
} from "./constants.js";


export const COLUMN_WIDTH = 100;
export const DATA_LINE_WIDTH = 30;

// onboarding-next-line formatea el arbol
export function treeDefault(nodes, prefix = '', isLast = true) {
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
                treeDefault(node.files, newPrefix, last);
            }
        } else if (node.file) {
            const parts = node.file.split(/[/\\]/);
            const filename = parts[parts.length - 1];

            const prefixBranch = prefix + branch;

            if (node.onboarding.length > 0) {
                console.log(chalk.dim(prefixBranch) + chalk.cyan(filename));

                node.onboarding.forEach((line, i) => {
                    console.log(
                        chalk.dim(newPrefix + '│ ') +
                        chalk.dim(normalize(line))
                    );
                })

                if (node.lines.length === 0) {
                    console.log(chalk.dim(newPrefix + '    '));
                } else {
                    console.log(chalk.dim(newPrefix + '│'));
                }
            }

            if (node.lines.length > 0) {

                const branchFileLine = last ? '    ' : '│   ';

                node.lines.forEach((line, i) => {

                    const col = '│ ';
                    const prefixSubBranch = prefix + branchFileLine + col;

                    const ln = line.number;
                    line.onboarding.forEach((line, i) => {
                        console.log(
                            chalk.dim(prefixSubBranch) +
                            chalk.dim(`${ln + i}`.padStart(3, ' ') + col) +
                            chalk.dim(normalize(line))
                        );
                    })

                    console.log(
                        chalk.dim(prefixSubBranch) +
                        chalk.white(`${line.number + line.onboarding.length}`.padStart(3, ' ')) +
                        chalk.dim(col) +
                        chalk.cyanBright(line.line)
                    );

                    console.log(
                        chalk.dim(prefixSubBranch) +
                        chalk.dim(`${line.number + line.onboarding.length + 1}`.padStart(3, ' ') + col) +
                        chalk.dim('...')
                    );
                })

                console.log(chalk.dim(prefix + branchFileLine + '    '));
            }

        }
    });
}

let filenameMaxLength = 0;

function getMaxPadLength(nodes) {
    nodes.forEach((node, index) => {
        if (node?.folder) {
            if (node.files.length > 0) {
                getMaxPadLength(node.files);
            }
        } else if (node?.file) {
            if (node.file.length > filenameMaxLength) {
                filenameMaxLength = node.file.length;
            }
        }
    })
}

export function treeOneLine(nodes, prefix = '', isLast = true, onlyFiles = false) {

    getMaxPadLength(nodes);

    const pad = filenameMaxLength
    const maxLine = 100 - pad

    nodes.forEach((node, index) => {
        const last = index === nodes.length - 1;
        const branch = last ? '└── ' : '├── ';
        const newPrefix = prefix + (last ? '    ' : '│   ');

        if (node?.folder) {
            if (node.files.length > 0) {
                console.log(
                    chalk.dim(prefix + branch) +
                    chalk.yellow(node.folder + '/')
                );
                treeOneLine(node.files, newPrefix, last, onlyFiles);
            }
        } else if (node?.file) {
            const parts = node.file.split(/[/\\]/);
            const filename = parts[parts.length - 1];

            const prefixBranch = prefix + branch;

            if (node.onboarding.length > 0) {

                const text = node.onboarding.map(l => normalize(l)).join(' ');
                const finalText = text.length > maxLine ?
                    `# ${text.substring(0, maxLine)} ...` :
                    `# ${text}`

                console.log(
                    chalk.dim(prefixBranch) +
                    chalk.cyan(filename.padEnd(pad - prefixBranch.length, ' ')) +
                    chalk.dim(finalText)
                );
            }

            if (onlyFiles) {
                return
            }

            if (node.lines.length > 0) {

                const branchFileLine = last ? '    ' : '│   ';

                node.lines.forEach((line, i) => {

                    const col = '│ ';
                    const prefixSubBranch = prefix + branchFileLine + col;

                    const ln = line.number;
                    line.onboarding.forEach((line, i) => {
                        console.log(
                            chalk.dim(prefixSubBranch) +
                            chalk.dim(`${ln + i}`.padStart(3, ' ') + col) +
                            chalk.white(normalize(line))
                        );
                    })

                    console.log(
                        chalk.dim(prefixSubBranch) +
                        chalk.white(`${line.number + line.onboarding.length}`.padStart(3, ' ')) +
                        chalk.dim(col) +
                        chalk.cyanBright(line.line)
                    );

                    console.log(
                        chalk.dim(prefixSubBranch) +
                        chalk.dim(`${line.number + line.onboarding.length + 1}`.padStart(3, ' ') + col) +
                        chalk.dim('...')
                    );
                })

                console.log(chalk.dim(prefix + branchFileLine + '    '));
            }

        }
    });
}

function normalize(text) {
    return text
        .replace(DIRECTIVE_FILE, '')
        .replace(DIRECTIVE_NEXT_LINE, '')
        .replace(DIRECTIVE_LINE, '')
        .trim()
}
