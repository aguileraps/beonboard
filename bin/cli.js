#!/usr/bin/env node
import '../src/index.js'

// #!/usr/bin/env node
// // onboarding este archivo es el inicial del programa
// import {createRequire} from "module";
//
// // onboarding estas lineas improtan paquetes
// const require = createRequire(import.meta.url);
//
// require('../src');
//
// // const fs = require('fs');
// // const path = require('path');
// // const packageJson = require("../package.json");
// //
// // // onboarding se imprime la info
// // console.log("Hello World!");
// // console.log(`Version number of the package is ${packageJson.version}`);
// //
// //
// // const IGNORED_DIRS = [
// //     'node_modules',
// //     '.git',
// //     'dist'
// // ];
// //
// // function listFiles(dir, baseDir = dir) {
// //     const results = [];
// //
// //     const entries = fs.readdirSync(dir, { withFileTypes: true });
// //
// //     for (const entry of entries) {
// //         const fullPath = path.join(dir, entry.name);
// //
// //         // Ignora los directorios especificados
// //         if (entry.isDirectory() && IGNORED_DIRS.includes(entry.name)) {
// //             continue;
// //         }
// //
// //         // Agrega el archivo o directorio a la lista
// //         results.push(path.relative(baseDir, fullPath));
// //
// //         // Si es un directorio, entra recursivamente
// //         if (entry.isDirectory()) {
// //             results.push(...listFiles(fullPath, baseDir));
// //         }
// //     }
// //
// //     return results;
// // }
// //
// // const filesAndDirs = listFiles("./");
// //
// // console.log('Archivos y carpetas encontrados (ignorando algunos):');
// // filesAndDirs.forEach(item => console.log(item));
// //
// // // listarContenidoRecursivo('./').then( );
// // //
// // // async function listarContenidoRecursivo(dir: string, nivel: number = 0): Promise<void> {
// // //     try {
// // //         const items = await fs.readdir(dir, { withFileTypes: true });
// // //
// // //         for (const item of items) {
// // //             const fullPath = path.join(dir, item.name);
// // //
// // //             if (item.isDirectory()) {
// // //                 if (IGNORED_DIRS.includes(item.name)) {
// // //                     continue;
// // //                 }
// // //
// // //                 console.log(`${' '.repeat(nivel * 2)}📁 ${item.name}`);
// // //                 await listarContenidoRecursivo(fullPath, nivel + 1); // recursión
// // //             } else {
// // //                 console.log(`${' '.repeat(nivel * 2)}📄 ${item.name}`);
// // //             }
// // //         }
// // //     } catch (err) {
// // //         console.error(`Error al leer ${dir}:`, err);
// // //     }
// // // }
