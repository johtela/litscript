/**
 * # TOC Menu
 * 
 * Component that takes the Toc tree structure and outputs a navigatable tree.
 */
import { html, css } from 'templates/html'
import { Toc, TocEntry, relLink } from 'templates/toc'
import { TemplateContext } from 'templates/template'
/**
 * Output a `span` or plain text for the page title. If the page has a description,
 * it's shown in the tooltip.
 */
const tocTitle = (entry: TocEntry) =>
    entry.desc ? 
        html`<span data-toggle="tooltip" data-title="${entry.desc}">${entry.page}</span>` :
        entry.page
/**
 * Output a TOC entry as a list item.
 */
const tocEntry = (entry: TocEntry, relFileName: string) => html`
    <li>
        ${entry.subs ? html`<div class="accordion">` : ''}
        ${entry.file ? 
            html`<a href="${relLink(relFileName, entry.file)}"${
                relFileName == entry.file ? ' class="highlight"' : ''
                }>${tocTitle(entry)}</a>` :
            entry.page}
        ${entry.subs ? 
            html`</div>
            ${tocSection(entry.subs, relFileName)}` : 
            ''}
    </li>`
/**
 * Output a TOC section.
 */
const tocSection = (pages: Toc, relFileName: string) => html`
    <ul>
        ${pages.map(page => tocEntry(page, relFileName))}
    </ul>`
/**
 * ## Styles
 */
const styles = css`
.tocmenu {
    --highlight-bar-width: 3px;
    --highlight-margin: 10px;
    
    margin: 10px;
    color: var(--toc-text-color);
    font-size: var(--toc-font-size);
}
.tocmenu h3 {
    font-size: var(--toc-header-font-size);
    margin: var(--toc-header-font-size) 0 10px 0;
    --divider-color: var(--toc-header-ruler-color);
}
.tocmenu ul {
    list-style-type: none;
    overflow: hidden;
    margin-left: calc(var(--toc-font-size) / 2);
}
.tocmenu ul ul {
    margin-left: var(--toc-font-size);
}
.tocmenu li {
    margin: calc(var(--toc-font-size) * 0.2) 0;
}
.tocmenu a {
    text-decoration: none;
    color: var(--toc-text-color);
    display: inline-block;
    width: 90%;
    padding-left: var(--highlight-margin);
}
.tocmenu a.highlight {
    border-left: var(--highlight-bar-width) solid var(--col-prim-dark);
    padding-left: var(--highlight-margin) - var(--highlight-bar-width);
    font-weight: bold;
}
.tocmenu a:active {
    color: var(--toc-link-hover-color);
}
.tocmenu .accordion {
    background-color: transparent;
    color: var(--toc-text-color);
    border-bottom: 2px solid var(--toc-sub-ruler-color);    
    cursor: pointer;
    padding: 2px 0;
    margin-left: var(--highlight-margin);
    width: 100%;
}
.tocmenu .accordion:after {
    content: '\25B4';
    color: var(--toc-sub-ruler-color);
    font-weight: bold;
    float: right;
    margin: 0 var(--highlight-margin) 0 5px;
}
.tocmenu .accordion.collapsed:after {
    content: "\25BE";
}`
/**
 * ## TOC Menu Component
 */
export default (ctx: TemplateContext) => {
    ctx.require('./tocmenu')
    ctx.style(styles)
    return html`
    <div class="tocmenu">
        <h3>${ctx.frontMatter.tocMenuHeader}</h3>
        ${tocSection(ctx.toc, ctx.relFilePath)}
    </div>`
}