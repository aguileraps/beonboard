// onboarding-file Contiene lo referente al manejo por comando
import { Command } from "commander"
import init from "./commands/init.js";

const program = new Command();

// onboarding-line setea los comandos para que se pueda tener informacion de consola setea los comandos para que se pueda tener informacion de consola
program
    .option('-o, --oneline', 'Muestra las descripciones en una sola linea')
    .option('-f, --files', 'Solo archivos')
    .action(init);

// onboarding-line inicia
program.parse();
