import fs from "fs";
import {
    DIRECTIVE_NEXT_LINE,
    DIRECTIVE_ONBOARDING_FILE,
    DIRECTIVE_ONBOARDING_LINE
} from "../commons/constants.js";

// onboarding-line procesa las directivas dentro de los archivos del proyecto
export function extractDirectives(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split(/\r?\n/);

    const data = {
        onboarding: [],
        lines: []
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (data.onboarding.length === 0 && line.startsWith(DIRECTIVE_ONBOARDING_FILE)) {
            const onboardingLines = [
                line
            ];

            let j = i + 1;
            while (j < lines.length && lines[j].trim().startsWith(DIRECTIVE_NEXT_LINE)) {
                onboardingLines.push(lines[j]);
                j++;
            }

            data.onboarding = onboardingLines;

            i = j - 1;
        }

        // Extraer líneas específicas si corresponde
        if (line.startsWith(DIRECTIVE_ONBOARDING_LINE)) {
            const nextLine = lines[i + 1] ?? '';
            data.lines.push({
                number: String(i + 2),
                line: nextLine,
                onboarding: line
            });
        }
    }

    return data;
}
