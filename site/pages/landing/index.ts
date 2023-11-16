/**
 * # Landing Page
 * 
 * The landing page template is suitable for presenting sections of texts.
 */
//#region -c landing imports
import { html } from '../../../src/templates/html'
import { TemplateContext, relLink } from '../../../src/templates/template'
import { pageTitle } from '../../../src/templates/toc'
//#endregion
/**
 * ## Page Template
 * 
 * The HTML template for the page is below. It imports required style and JS
 * files and returns the HTML for the given context.
 */
export default (ctx: TemplateContext) => {
    ctx.require(ctx.baseDir, "site/styles/theme.css")
    ctx.require(ctx.baseDir, "site/styles/syntax.css")
    ctx.require(__dirname, "./landing.css")
    ctx.require(__dirname, "./landing")
    return html`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>
            ${ctx.frontMatter.projectName}${pageTitle(ctx.toc, ctx.relFilePath)}
        </title>
        <link rel="icon" type="image/icon" href="${relLink(ctx.relFilePath, 
            "images/favicon.svg")}" />
        ${ctx.styles}
        ${ctx.frontMatter.useMath ? 
            `<link rel="stylesheet" href="${ctx.frontMatter.katexCdn}">` : ''}
    </head>
    <body data-syntax-highlight="${ctx.frontMatter.syntaxHighlight}"
        data-theme="${ctx.frontMatter.theme}">
        ${ctx.contents}
        ${ctx.scripts}
    </body>
    </html>`
}