// onboarding-file lectura de archivos
// siguente texto para testear multiples lineas
// otra linea
import fs from 'fs';
import {IGNORED_DIRS, INCLUDED_FILES_PATTERNS} from "../commons/constants.js";
import {extractDirectives} from "./text-analysis.js";
import * as path from "node:path";


// onboarding-next-line hace la lectura del directorio
export function readdir(dir, baseDir = dir) {
    return fs.readdirSync(dir, {withFileTypes: true})
        .filter(entry => isAllowed(entry))
        // .filter(entry => hasDirective(entry))
        .map(entry => processEntry(entry, dir, baseDir))
        .flat();
}

function processEntry(entry, dir, baseDir) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
        return [{
            folder: entry.name,
            files: readdir(fullPath, baseDir)
        }];
    }

    if (entry.isFile()) {
        const filePath = path.relative(baseDir, fullPath);
        return [{
            file: filePath,
            ...extractDirectives(filePath)
        }];
    }
}

function isAllowed(entry) {
    if (entry.isDirectory()) {
        return !IGNORED_DIRS.includes(entry.name);
    }
    if (entry.isFile()) {
        return INCLUDED_FILES_PATTERNS.some(pattern => {
            return pattern.test(entry.name)
        });
    }
}
