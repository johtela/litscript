/**
 * # Template API
 * 
 * When you want to create a template, you need implement the `Template`
 * interface. It is the main entry point to the library.
 */
//#region -c template.ts imports
import * as path from 'path'
import * as toc from './toc'
import * as fm from './front-matter'
import { HtmlTemplate, saveHtmlTemplate } from './html';
//#endregion
/**
 * ## Template Context
 * 
 * When generating HTML from a template a context is passed to the generator.
 * The context contains data needed for the outputted HTML and methods to add 
 * new files for the bundler.
 */
export class TemplateContext {
    private requires: string[] = []

    constructor(
        readonly frontMatter: fm.FrontMatter,
        readonly toc: toc.Toc,
        readonly contents: string,
        readonly relFilePath: string,
        readonly fullFilePath: string,
        readonly styles: string,
        readonly scripts: string) { }
    
    require(file: string) {
        this.requires.push(file)
    }
}
/**
 * ## Template Function
 * 
 * The main task of a template is to generate a HTML page for given content. 
 * A template is a function that gets the following data as argument in a 
 * TemplateContext object:
 * 
 * - Front matter as data structure.
 * - TOC as data structure.
 * - Contents of the page as string. This is already in HTML format.
 * - Additional style sheet imports in the `styles` string.
 * - Additional script imports in tje `scripts` string.
 * - The relative file path of the outputted page.
 * - The full, resolved file path of the outputted page.
 * 
 * The function returns a HtmlTemplate object which can be outputted to a file.
 */
export type Template = (ctx: TemplateContext) => HtmlTemplate

/**
 * ## Page Generator
 * 
 * HTML pages are built using template engine that you can find under 
 * the `components` directory. This is out of scope for the documentation,
 * but you can check the engine's implementation from code.
 * 
 * Depending on the front matter setting, we generate either a normal page
 * or landing page. They have separate templates.
 */    
export function generate(fm: fm.FrontMatter, toc: toc.Toc, contents: string, 
    styles: string, scripts: string, fullFilePath: string, relFilePath: string,
    jsOutDir: string) {
    let ctx = new TemplateContext(fm, toc, contents, relFilePath, fullFilePath,
        styles, scripts)
    let template = pageTemplate(jsOutDir, fm.pageTemplate)
    let htmlTemp = template(ctx)
    saveHtmlTemplate(htmlTemp, fullFilePath);
}

function pageTemplate(rootDir: string, name: string): Template {
    let tempFile = path.resolve(rootDir, "site/pages/", name)   
    return require(tempFile).default as Template
}