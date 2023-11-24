/**
 * # Outputting Errors And Progress to Console
 * 
 * This module contains helper functions that format and output errors and
 * information to the console.
 */
//#region -c logging imports
import * as ts from 'typescript'
import * as eb from 'esbuild'
import * as tr from './translators/translators'
import * as cfg from './config'
//#endregion
/**
 * ## Color Output
 * 
 * To enable colors in console output we define the control codes for various
 * colors in an enumeration.
 */
export enum Colors {
    Reset = "\x1b[0m",
    Black = "\x1b[30m",
    Red = "\x1b[31m",
    Green = "\x1b[32m",
    Yellow = "\x1b[33m",
    Blue = "\x1b[34m",
    Magenta = "\x1b[35m",
    Cyan = "\x1b[36m",
    White = "\x1b[37m",
    Gray = "\x1b[90m",
}
/**
 * ## Cursor Movement
 * 
 * To move the cursor in the console window we need to define some more control 
 * codes.
 */
export enum Cursor {
    Up = "\u001b[1A",
    Down = "\u001b[1B",
    Save = "\u001b[s",
    Restore = "\u001b[u",
    DeleteEOL = "\u001b[K"
}
/**
 * ## TypeScript Diagnostics
 * 
 * The following interface is needed by the TypeScript API to format a 
 * diagnostics message.
 */
const formatHost: ts.FormatDiagnosticsHost = {
    getCanonicalFileName: path => path,
    getCurrentDirectory: ts.sys.getCurrentDirectory,
    getNewLine: () => ts.sys.newLine
}
/**
 * This function formats and outputs a diagnostic message in the same way as
 * TypeScript compiler. So, you can use the standard `$tsc` problem matcher
 * is VS Code to extract the errors from the output. 
 */
export function reportDiagnostic(diag: ts.Diagnostic) {
    if (diag.file) {
        let { line, character } = diag.file.getLineAndCharacterOfPosition(
            diag.start!)
        let fileName = `${Colors.Cyan}${diag.file.fileName}`
        let msg = `${Colors.Reset}${ts.flattenDiagnosticMessageText(
            diag.messageText, "\n")}`
        let colon = `${Colors.Reset}:`
        let num = (num: number) => `${Colors.Yellow}${num + 1}`
        let code = `${Colors.Reset} - ${diagTypeStr(
            diag.category)} ${Colors.Gray}TS${diag.code}: `
        console.log(
            `${fileName}${colon}${num(line)}${colon}${num(character)}${code}${msg}`)
    } else
        console.error(
            `${ts.flattenDiagnosticMessageText(diag.messageText, "\n")}`)
}
/**
 * We use red, yellow, or green to express errors, warnings and information.
 */
function diagTypeStr(category: ts.DiagnosticCategory) {
    switch (category) {
        case ts.DiagnosticCategory.Error: return `${Colors.Red}error`
        case ts.DiagnosticCategory.Warning: return `${Colors.Yellow}warning`
        default: return `${Colors.Green}info`
    }
}
/**
 * This function prints a diagnostic every time the watch status changes.
 * This is mainly for messages like "Starting compilation" or 
 * "Compilation completed".
 */
export function reportWatchStatusChanged(diag: ts.Diagnostic) {
    if (cfg.getOptions().silent)
        return
    let code = `${diagTypeStr(diag.category)} ${Colors.Gray}TS${diag.code}: `
    let msg = `${Colors.Reset}${ts.flattenDiagnosticMessageText(
        diag.messageText, "\n")}`
    console.log(`${code}${msg}${Cursor.DeleteEOL}${diag.code == 6194 ? "" :
        Cursor.Up}`)
}
/**
 * ## Build Results
 * 
 * The following function reports esbuild results, status and errors. If there
 * were no errors we overwrite the previous message and print just running
 * number, how many times the bundle has been created.
 */
let okCount = 0

export function reportBuildResults(result: eb.BuildResult) {
    let errors = eb.formatMessagesSync(result.errors, { 
        kind: "error", color: true })
    errors.forEach(console.error)
    let warnings = eb.formatMessagesSync(result.warnings, { 
        kind: "warning", color: true })
    okCount = errors.length > 0 || warnings.length > 0 ? 0 : okCount + 1
    if (cfg.getOptions().silent)
        return
    let msg = "Bundle completed."
    console.log(okCount > 1 ?
        `${Cursor.Up}${Colors.Cyan}${msg}[${okCount}]${Cursor.DeleteEOL}` :
        `${Colors.Cyan}${msg}`)
}
/**
 * ## Weaver Status
 * 
 * Weaver progress is reported by this function. It uses colors to distinguish
 * input and output file names from the rest of the message. It also shortens
 * the file paths to make them more readable.
 */
export function reportWeaverProgress(outputFile: tr.OutputFile) {
    if (cfg.getOptions().silent)
        return
    let outFile = Colors.Blue + cfg.getBaseRelativePath(
        outputFile.fullTargetPath)
    console.log(`${Colors.Reset}Weaving file ${outFile}${Cursor.DeleteEOL}${
        Cursor.Up}`)
}
/**
 * ## Other Messages
 *
 * Errors, warnings, and info messages can be outputted using the functions 
 * below. Exceptions are printed in red and the stack trace in gray.
 */
export function error(err: Error) {
    console.error(`${Colors.Red}${err}${Colors.Reset}`)
    if (err.stack)
        console.error(`${Colors.Gray}${err.stack}${Colors.Reset}`)
}
/**
 * Warnings are printed in yellow.
 */
export function warn(output: string) {
    if (!cfg.getOptions().silent)
       console.warn(`${Colors.Yellow}${output}${Colors.Reset}`)
}
/**
 * Info messages are printed in the default color and cursor is moved to the
 * previous line. So, the next message will overwrite the previous one.
 */
export function info(output: string) {
    if (!cfg.getOptions().silent)
        console.log(`${Colors.Reset}${output}${Cursor.DeleteEOL}${Cursor.Up}`)
}