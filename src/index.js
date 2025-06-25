// onboarding-file Contiene lo referente al manejo por comando
import { Command } from "commander"
import onboarding from "./commands/onboarding.js";

const program = new Command();

// onboarding-next-line setea los comandos para que se pueda tener informacion de consola
// otra linea setea los comandos para que se pueda tener informacion de consola
program
    .option('-o, --oneline', 'Muestra las descripciones en una sola linea')
    .option('-f, --files', 'Solo archivos')
    .action(onboarding);

// onboarding-next-line inicia
program.parse();
