import { html } from 'templates/html'
import { Toc, TocEntry, relLink } from 'templates/toc'
import { TemplateContext } from 'templates/template'

const tocTitle = (entry: TocEntry) =>
    entry.desc ? 
        `<span data-toggle="tooltip" data-title="${entry.desc}">${entry.page}</span>` :
        entry.page

const tocEntry = (entry: TocEntry, relFileName: string) => html`
    <li>
        ${entry.subs ? '<button class="accordion">' : ''}
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

export default (ctx: TemplateContext) => html`
    <div class="tocmenu">
        <h3>${ctx.frontMatter.tocMenuHeader}</h3>
        ${tocSection(ctx.toc, ctx.relFilePath)}
    </div>`