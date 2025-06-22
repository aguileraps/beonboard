import { Command } from "commander"
import init from "./commands/init.js";

const program = new Command();

program
    .option('-t, --tree', 'Muestra ael arbol de onboarding')
    .option('-f, --files', 'Solo archivos')
    .action(init);

program.parse();
