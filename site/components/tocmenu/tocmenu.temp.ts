import { html, css } from 'templates/html'
import { Toc, TocEntry, relLink } from 'templates/toc'
import { TemplateContext } from 'templates/template'

const tocTitle = (entry: TocEntry) =>
    entry.desc ? 
        `<span data-toggle="tooltip" data-title="${entry.desc}">${entry.page}</span>` :
        entry.page

const tocEntry = (entry: TocEntry, relFileName: string) => html`
    <li>
        ${entry.subs ? '<div class="accordion">' : ''}
        ${entry.file ? 
            `<a href="${relLink(relFileName, entry.file)}"${
                relFileName == entry.file ? 
                    ' class="highlight"' : ''
                }>${tocTitle(entry)}</a>` :
            entry.page}
        ${entry.subs ? 
            html`</button>
            ${tocSection(entry.subs, relFileName)}` : 
            ''}
    </li>`

const tocSection = (pages: Toc, relFileName: string) => html`
    <ul>
        ${pages.map(page => tocEntry(page, relFileName))}
    </ul>`

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

export default (ctx: TemplateContext) => {
    ctx.require('./tocmenu')
    ctx.style(styles)
    return html`
    <div class="tocmenu">
        <h3>${ctx.frontMatter.tocMenuHeader}</h3>
        ${tocSection(ctx.toc, ctx.relFilePath)}
    </div>`
}