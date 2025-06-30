// onboarding-file aqui se analizan las directivas en el archivo

import fs from "fs";
import {
    DIRECTIVE_FILE,
    DIRECTIVE_LINE,
    DIRECTIVE_NEXT_LINE
} from "../commons/constants.js";

// onboarding-next-line procesa las directivas dentro de los archivos del proyecto
export function extractDirectives(filePath, onlyFiles = false) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split(/\r?\n/);

    const data = {
        onboarding: [],
        lines: []
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (data.onboarding.length === 0 && line.startsWith(DIRECTIVE_FILE)) {
            const {block, lastIndex} = captureNextLines(lines, i);
            data.onboarding = block;
            i = lastIndex;
            continue;
        }

        if (!onlyFiles && line.startsWith(DIRECTIVE_NEXT_LINE)) {
            const {block, lastIndex} = captureNextLines(lines, i);
            if (block.length > 0) {
                data.lines.push({
                    number: i + 1,
                    onboarding: block,
                    line: lines[lastIndex + 1] ?? ''
                });
            }
            i = lastIndex;
        }
    }

    if (data.lines.length > 0 && data.onboarding.length === 0) {
        data.onboarding.push(`contiene ${data.lines.length} lineas con descripciones`)
    }

    // console.log(JSON.stringify(data, null, 2));

    return data;
}

// onboarding-next-line busca todas las lineas comentadas debajo de la directiva
function captureNextLines(lines, startIndex) {
    const block = [];
    let i = startIndex;

    while (i < lines.length && lines[i].trim().startsWith(DIRECTIVE_LINE)) {
        block.push(lines[i].trim());
        i++;
    }

    return {
        block,
        lastIndex: i - 1
    };
}
