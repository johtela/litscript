/**
 * # TOC Menu
 * 
 * Component that takes the Toc tree structure and outputs a navigatable tree.
 */
import { html } from '../../../src/templates/html'
import { Toc, TocEntry, findPreviousAndNextTocEntries } from '../../../src/templates/toc'
import { TemplateContext, relLink } from '../../../src/templates/template'
/**
 * Output a `span` or plain text for the page title. If the page has a 
 * description, it's shown in the tooltip.
 */
const footerButton = (relFileName: string, entry: TocEntry) =>
    html`<a class="footer-button" href="${relLink(relFileName, entry.file)}">
        ${entry.page}
    </a>`

export default (ctx: TemplateContext) => {
    let [prev, next] = findPreviousAndNextTocEntries(ctx.toc, ctx.relFilePath)
    return html`
        <div class="footer">
            ${footerButton(ctx.relFilePath, prev)}
            <div class="footer-text">
                ${ctx.frontMatter.footer}
            </div>
            ${footerButton(ctx.relFilePath,next)}
        </div>
    `
}