// onboarding-file Contiene lo referente al manejo por comando
import { Command } from "commander"
import init from "./commands/init.js";

const program = new Command();

// onboarding-line setea los comandos
program
    .option('-t, --tree', 'Muestra ael arbol de onboarding')
    .option('-f, --files', 'Solo archivos')
    .action(init);

// onboarding-line inicia
program.parse();
