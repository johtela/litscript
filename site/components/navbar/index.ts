import { html, css, HtmlTemplate } from '../../../src/templates/html'
import { TemplateContext } from '../../../src/templates/template'
import hamburger from '../../components/hamburger'

export interface NavBarItem {
    link?: string
    caption: string
    icon: HtmlTemplate | string
    title?: boolean
}

function getClasses(ni: NavBarItem): string {
    let res = []
    if (ni.title)
        res.push('title')
    if (ni.link)
        res.push('enabled')
    return res.length == 0 ? '' : `class="${res.join(' ')}"`
}

function getHref(ni: NavBarItem): string {
    return ni.link ? `href="${ni.link}"` : ''
}

const navItem = (ni: NavBarItem) => html`
    <a ${getClasses(ni)} ${getHref(ni)}>
        ${ni.icon ? 
            (ni.icon instanceof HtmlTemplate ?
                ni.icon :
                `<img src="${ni.icon}" />`
            ) : ""}
        <span>${ni.caption}</span>
    </a>`

export default (ctx: TemplateContext, ...items: NavBarItem[]) => {
    ctx.require(__dirname, './navbar')
    ctx.require(__dirname, './navbar.css')
    return html`
        <div id="navbar">
            <div class="navmenu">
                ${items.map(navItem)}
            </div>
            ${hamburger(ctx)}
        </div>`
}