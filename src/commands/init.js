import fs from 'fs';
import path from 'path';

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

export default function init(name, options, command) {
    const filesAndDirs = listFiles("./");

    console.log('');
    console.log('Listado:');

    console.log(JSON.stringify(filesAndDirs, null, 2));


    // filesAndDirs.forEach(item => console.log(item));

}


function listFiles(dir, baseDir = dir) {
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

            const dir = {}
            dir[entry.name] = listFiles(fullPath, baseDir)

            results.push(dir);
            continue;
        }

        results.push(path.relative(baseDir, fullPath));

    }

    return results;
}
