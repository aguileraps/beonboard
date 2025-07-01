// onboarding-file contiene constantes contiene constantes contiene constantes contiene constantes contiene constantes contiene constantes contiene constantes contiene constantes contiene constantes contiene constantes contiene constantes

// onboarding-next-line listado de directorios que no se analizan
export const IGNORED_DIRS_PATTERNS = [
    /^\..*/,
    /^node_modules$/,
    /^dist$/
];

// onboarding-next-line extensiones de archivos que analiza en busca de directivas
export const INCLUDED_FILES_PATTERNS = [
    /\.js$/,
    /\.jsx$/,
    /\.ts$/,
];

// onboarding-next-line constantes de directivas que se buscan para armar el tree
export const DIRECTIVE_FILE = '// onboarding-file'
export const DIRECTIVE_NEXT_LINE = '// onboarding-next-line'
export const DIRECTIVE_LINE = '//'

