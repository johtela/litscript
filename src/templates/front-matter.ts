/**
 * ---
 * { "useMath": true }
 * ---
 * # Front Matter
 * 
 * The settings used in generating HTML pages are defined in an interface called 
 * front matter. Users can edit the front matter by modifying the 
 * `litsconfig.json` file or by adding it in front of a source file. Below is 
 * an example showing how to include a front matter in a markdown file.
 * ```markdown
 * ---
 * { "useMath": true }
 * ---
 * ```
 */
//#region -c front-matter.ts imports
import * as path from 'path'
//#endregion
/**
 * ## Included TS Modules
 * 
 * the `FrontMatter` interface. It contains only the list of visualizer
 * modules referenced in the documentation.
 */
export interface FrontMatter {
    /**
     * To create interactive documentation pages you need to be able to call 
     * your code dynamically and show the results on the page. The `modules`
     * setting contains the name of your root code file that is included in
     * the generated HTML pages. The file path is relative to the project base 
     * directory.
     */
    modules: string[]
    /**
     * ### Page Template
     * 
     * Name of the page template used for rendering the HTML. This maps to a 
     * file in the `site/pages` folder.
     */
    pageTemplate: string
    /**
     * ### Project Name
     * 
     * The project name is displayed everywhere where a title is needed; in the 
     * navigation bar, in the page title (browser tab), and so on.
     */
    projectName: string
    /**
     * ### Project URLs
     * 
     * Following settings contain links used in the navigation bar. They can be 
     * absolute URLs to external web sites, or relative paths to pages in the 
     * project. If you use relative paths, always remember to add the `/` 
     * character at the front. The forward slash character points to the root 
     * of the generated web site.
     * 
     * The repository field contains the URL of the git repo that hosts the 
     * project sources.
     */
    repository: string
    /**
     * The download field contains the URL of the download site, typically NPM 
     * home page.
     */
    download: string
    /**
     * The URL of the license info page.
     */
    license: string
    /**
     * Link to the logo image used in the navigation bar. This should be an 
     * icon, a small bitmap, or a SVG file.
     */
    logo: string
    /**
     * ### Syntax Highlighting
     * 
     * There are multiple syntax highlight schemes to choose from. These should 
     * be familiar from popular text editors.
     */
    syntaxHighlight: "coding-horror" | "monokai" | "solarized-light" | "son-of-obsidian" 
    /**
     * ### Math Notation
     * 
     * LiTScript uses [KaTeX][] to layout mathematical formulas. By turning the 
     * `useMath` field on, KaTeX is loaded from an external CDN. If you need a 
     * different version of CDN package, change the link in `katexCdn`.
     * 
     * You can include formulas in markdown with [LaTeX][] notation by 
     * surrounding them by single `$` (inline) or double `$$` (block) dollar 
     * signs. For example the block
     * 
     *    $$x = { -b \pm \sqrt{b^2 - 4ac} \over 2a }$$ 
     * 
     * renders like this:
     * 
     * $$x = { -b \pm \sqrt{b^2 - 4ac} \over 2a }$$
     */
    useMath: boolean
    katexCdn: string
    /**
     * ### Customizing Menu Headers
     * 
     * You can change the text in the menu headers, if you don't like the 
     * defaults, or if you want to localize them. 
     */
    tocMenuHeader: string
    pageMenuHeader: string
    /**
     * ### Footer
     * 
     * The best place for copyright and other general information is the footer.
     * You can show it in page menu, content area, or TOC menu. 
     */
    footer: string
}
/**
 * [Katex]: https://katex.org/
 * [LaTeX]: https://en.wikibooks.org/wiki/LaTeX/Mathematics
 * 
 * ## Defaults
 * 
 * Default values are defined here. These are used, if a property is not present 
 * in the configuration file.
 */
export const defaults: FrontMatter = {
    modules: [],
    pageTemplate: "normal",
    projectName: "Project",
    repository: "",
    download: "",
    license: "",
    logo: "",
    syntaxHighlight: "monokai",
    useMath: false,
    katexCdn: "https://cdn.jsdelivr.net/npm/katex@0.13.13/dist/katex.min.css",
    tocMenuHeader: "Table of Contents",
    pageMenuHeader: "On This Page",
    footer: "Copyright © 2023"
}