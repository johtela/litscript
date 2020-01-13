/**
 * # Translating Input Files
 * 
 * A translator splits a file into markdown and code blocks. It scans the 
 * source file using any means necessary and builds a block list that can
 * be then outputted to a file. 
 * 
 * For weavers, we have a concrete class for each output format (MD or HTML), 
 * whereas translator are specialized for input format. We have a separate 
 * translator for TypeScript, Markdown, CSS/Less, etc. You can even write a 
 * new translator for an additional input format.
 */
//#region -c translators imports and exports
import * as ts from 'typescript'
import * as bt from './base-translator'
import * as tt from './ts-translator'
import * as mt from './md-translator'
import * as tht from './ts-html-translator'
import * as jdt from './jsdoc-translator'
import * as cfg from '../config'

export * from './base-translator'
export * from './ts-translator'
export * from './md-translator'
export * from './ts-html-translator'
//#endregion
/**
 * ## Registering Translators
 * 
 * The constructor type is a function that returns a new translator.
 */
export type TranslatorConstuctor = () => bt.Translator
/**
 * Registered translators are stored in a dictionary whose key is a regex
 * that matches the file extension(s) that the translator supports. Values are
 * constructor functions.
 */
type TranslatorMap = {
    [match: string]: TranslatorConstuctor
}
/**
 * The built-in translators are already inserted to the dictionary.
 */
const translators: TranslatorMap = {
    "\.md$": () => new mt.MdTranslator(),
    "\.(c|le|sc)ss$": () => new jdt.JsDocTranslator()
}
/**
 * To register a new translator call the following function. It just adds the
 * constructor function to the dictionary.
 */
export function registerTranslator(match: RegExp | string,
    createTranslator: TranslatorConstuctor) {
    translators[match.toString()] = createTranslator
}
/**
 * ## Getting a Translator
 * 
 * To get an instance of a registered translator for a given input file call 
 * the `getTranslator` function. It handles TypeScript files separately, but
 * for all other file types, it just goes through the dictionary and matches
 * the file extension with the stored regex.
 */
export function getTranslator(outputFile: bt.OutputFile,
    checker?: ts.TypeChecker, outputMap?: bt.OutputFileMap): bt.Translator {
    if (outputFile.sourceKind == bt.SourceKind.other) {
        for (const match in translators) 
            if (translators.hasOwnProperty(match) &&
                new RegExp(match).test(outputFile.source.fileName))
                return translators[match]()
        throw new Error("Translator not registered for file: " + 
            outputFile.source.fileName)
    }
    else if (cfg.getOptions().outputFormat == 'html')
        return new tht.TsHtmlTranslator(checker, outputMap)
    else
        return new tt.TsTranslator()
}