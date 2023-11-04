/**
 * ---
 * { "useMath": true }
 * ---
 * # Front Matter
 * 
 * Settings used in generating HTML pages are defined in an object called 
 * front matter. Users can edit the front matter by modifying the 
 * `litsconfig.json` file or by adding it in front of a source file. Below is 
 * an example showing how to include a front matter in a markdown file.
 * ```markdown
 * ---
 * { "useMath": true }
 * ---
 * ```
 * The properties that you can tweak can be found in the interface below.
 */
export interface FrontMatter {
    /**
     * ## Import JS/TS Modules
     * 
     * To create interactive documentation pages you need to be able to call 
     * your code dynamically and show the results on the page. The `modules`
     * setting contains the name of your root code file that is included in
     * the generated HTML pages. The file path is relative to the project base 
     * directory.
     */
    modules: string[]
    /**
     * ## Import CSS Files
     * 
     * You can also import CSS files to your page(s). The list of CSS files
     * included is defined in the `styles` property. Both modules and styles
     * are bundled under the `dist` directory under the `outDir`.
     */
    styles: string[]
    /**
     * ### Page Template
     * 
     * Name of the template used for rendering the HTML page. This maps to a 
     * module in the `<baseDir>/site/pages` folder.
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
     * project. If you use relative paths, remember to add the `/` character at 
     * the front. The forward slash character points to the root of the 
     * generated web site.
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
     * Link to the logo image or inline SVG used in the navigation bar. This 
     * should be an icon, a small bitmap, or a SVG file.
     */
    logo: string
    /**
     * ### Themes
     * 
     * The available themes and customizations to the appearance. The default
     * theme can be changed with the `theme` setting. See 
     * [theming guide](../../site/styles/theme.html) for more information.
     */
    themes: { [name: string]: string }
    theme: string,
    /**
     * ### Syntax Highlighting
     * 
     * There are multiple syntax highlight schemes to choose from. These should 
     * be familiar from popular text editors.
     */
    syntaxHighlightThemes: { [name: string]: string }
    syntaxHighlight: string
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
    styles: [],
    pageTemplate: "normal",
    projectName: "Project",
    repository: "",
    download: "",
    license: "",
    logo: "",
    themes: {
        "beige": "Beige",
        "book-cover": "Book Cover",
        "chocolate": "Chocolate",
        "ice-age": "Ice Age",
        "peachy": "Peachy",
        "purple-rain": "Purple Rain",
        "red-alert": "Red Alert",
        "vintage": "Vintage",
    },
    theme: "ice-age",
    syntaxHighlightThemes: {
        "coding-horror": "Coding Horror",
        "monokai": "Monokai",
        "solarized-light": "Solarized Light", 
        "son-of-obsidian": "Son of Obsidian"
    },
    syntaxHighlight: "monokai",
    useMath: false,
    katexCdn: "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css",
    tocMenuHeader: "Table of Contents",
    pageMenuHeader: "On This Page",
    footer: "Copyright © 2023"
}