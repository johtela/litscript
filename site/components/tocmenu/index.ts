/**
 * # TOC Menu
 * 
 * Component that takes the Toc tree structure and outputs a navigatable tree.
 */
import { html } from '../../../src/templates/html'
import { Toc, TocEntry } from '../../../src/templates/toc'
import { TemplateContext, relLink } from '../../../src/templates/template'
import icons from '../icons'
/**
 * Output a `span` or plain text for the page title. If the page has a 
 * description, it's shown in the tooltip.
 */
const tocTitle = (entry: TocEntry) =>
    entry.desc ? 
        html`<span data-toggle="tooltip" data-title="${entry.desc}">
            ${entry.page}
        </span>` :
        entry.page
/**
 * Title for the TOC entry.
 */
const tocLink = (entry: TocEntry, relFileName: string) => 
    entry.file ? 
        html`<a href="${relLink(relFileName, entry.file)}"${
            relFileName == entry.file ? ' class="highlight"' : ''
            }><span>${entry.bullet || "📔"}</span>${tocTitle(entry)}</a>` :
        tocTitle(entry)
/**
 * Create an open tag for accordion div.
 */
const accordion = (entry: TocEntry, relFileName: string) => html`
    <div class="accordion">
        ${tocLink(entry, relFileName)}
        ${icons.chevron_up}
    </div>
    ${tocSection(entry.subs, relFileName)}`
/**
 * Output a TOC entry as a list item.
 */
const tocEntry = (entry: TocEntry, relFileName: string) => html`
    <li>
        ${entry.subs ? 
            accordion(entry, relFileName) : 
            tocLink(entry, relFileName)}
    </li>`
/**
 * Output a TOC section.
 */
const tocSection = (pages: Toc, relFileName: string) => html`
    <ul>
        ${pages.map(page => tocEntry(page, relFileName))}
    </ul>`
/**
 * ## TOC Menu Component
 */
export default (ctx: TemplateContext) => {
    ctx.require(__dirname, './tocmenu')
    ctx.require(__dirname, './tocmenu.css')
    return html`
        <div class="tocmenu">
            <h3>${ctx.frontMatter.tocMenuHeader}</h3>
            ${tocSection(ctx.toc, ctx.relFilePath)}
        </div>`
}